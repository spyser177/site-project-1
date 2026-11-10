#!/usr/bin/env bash
#
# deploy_nginx_protection.sh
#
# Применяет защитную конфигурацию Nginx на российском VPS (reverse proxy):
#   - server_tokens off
#   - limit_req_zone (general, api) + limit_req в нужных location
#   - фильтрация ботов по User-Agent (с исключениями для Googlebot/YandexBot/Bingbot)
#   - proxy_hide_header Server
#
# Идемпотентно: повторный запуск не дублирует уже добавленные строки/блоки.
# Безопасно: nginx -t ОБЯЗАТЕЛЬНО перед reload; при ошибке — выход с кодом 1 без reload.
#
# Запуск:
#   ssh root@168.113.170.100 'bash -s' < deploy_nginx_protection.sh
#
set -uo pipefail

NGINX_CONF="/etc/nginx/nginx.conf"
SITE_CONF="/etc/nginx/sites-available/feminform.com"
TS="$(date +%Y%m%d_%H%M%S)"
BACKUP_DIR="/root/nginx_backup_${TS}"
DOMAIN="feminform.com"

STEPS_DONE=()
STEPS_SKIPPED=()
FAILED=0

log()  { echo "[*] $*"; }
ok()   { echo "[OK] $*"; STEPS_DONE+=("$*"); }
skip() { echo "[SKIP] $* (уже применено)"; STEPS_SKIPPED+=("$*"); }
fail() { echo "[FAIL] $*"; FAILED=1; }

# -----------------------------------------------------------------------------
# 0. Предварительные проверки
# -----------------------------------------------------------------------------
if [[ $EUID -ne 0 ]]; then
    echo "ERROR: скрипт должен выполняться от root." >&2
    exit 1
fi

if [[ ! -f "$NGINX_CONF" ]]; then
    echo "ERROR: $NGINX_CONF не найден." >&2
    exit 1
fi

if [[ ! -f "$SITE_CONF" ]]; then
    echo "ERROR: $SITE_CONF не найден." >&2
    exit 1
fi

# -----------------------------------------------------------------------------
# 1. Бэкап
# -----------------------------------------------------------------------------
mkdir -p "$BACKUP_DIR"
cp "$NGINX_CONF" "$BACKUP_DIR/nginx.conf.bak"
cp "$SITE_CONF" "$BACKUP_DIR/feminform.com.bak"
ok "Бэкап создан: $BACKUP_DIR"

# -----------------------------------------------------------------------------
# 2. nginx.conf: server_tokens off; + limit_req_zone (general, api)
# -----------------------------------------------------------------------------

# 2.1 server_tokens off
if grep -qE '^\s*server_tokens\s+off\s*;' "$NGINX_CONF"; then
    skip "server_tokens off; в nginx.conf"
else
    awk '
        BEGIN { inserted=0 }
        {
            print $0
            if (!inserted && $0 ~ /^\s*http\s*\{/) {
                print "    server_tokens off;"
                inserted=1
            }
        }
    ' "$NGINX_CONF" > "$NGINX_CONF.tmp" && mv "$NGINX_CONF.tmp" "$NGINX_CONF"
    if grep -qE '^\s*server_tokens\s+off\s*;' "$NGINX_CONF"; then
        ok "server_tokens off; добавлен в nginx.conf"
    else
        fail "не удалось добавить server_tokens off; (не найден блок http {)"
    fi
fi

# 2.2 limit_req_zone general
if grep -q 'zone=general:10m' "$NGINX_CONF"; then
    skip "limit_req_zone zone=general в nginx.conf"
else
    awk '
        BEGIN { inserted=0 }
        {
            print $0
            if (!inserted && $0 ~ /^\s*http\s*\{/) {
                print "    limit_req_zone $binary_remote_addr zone=general:10m rate=10r/s;"
                inserted=1
            }
        }
    ' "$NGINX_CONF" > "$NGINX_CONF.tmp" && mv "$NGINX_CONF.tmp" "$NGINX_CONF"
    if grep -q 'zone=general:10m' "$NGINX_CONF"; then
        ok "limit_req_zone zone=general добавлен в nginx.conf"
    else
        fail "не удалось добавить limit_req_zone zone=general"
    fi
fi

# 2.3 limit_req_zone api
if grep -q 'zone=api:10m' "$NGINX_CONF"; then
    skip "limit_req_zone zone=api в nginx.conf"
else
    awk '
        BEGIN { inserted=0 }
        {
            print $0
            if (!inserted && $0 ~ /^\s*http\s*\{/) {
                print "    limit_req_zone $binary_remote_addr zone=api:10m rate=2r/s;"
                inserted=1
            }
        }
    ' "$NGINX_CONF" > "$NGINX_CONF.tmp" && mv "$NGINX_CONF.tmp" "$NGINX_CONF"
    if grep -q 'zone=api:10m' "$NGINX_CONF"; then
        ok "limit_req_zone zone=api добавлен в nginx.conf"
    else
        fail "не удалось добавить limit_req_zone zone=api"
    fi
fi

# -----------------------------------------------------------------------------
# 3. feminform.com: фильтрация UA + proxy_hide_header Server
#    (вставляются одним блоком непосредственно перед первым встреченным
#     "location" внутри server{} — т.е. гарантированно внутри server{})
# -----------------------------------------------------------------------------
if grep -q 'blocked_bot' "$SITE_CONF"; then
    skip "блок фильтрации User-Agent (blocked_bot) в $SITE_CONF"
else
    awk '
        BEGIN { inserted=0 }
        {
            if (!inserted && $0 ~ /^\s*location[ \t]/) {
                print "    # --- BEGIN bot-filter (deploy_nginx_protection.sh) ---"
                print "    proxy_hide_header Server;"
                print ""
                print "    set $blocked_bot 0;"
                print ""
                print "    if ($http_user_agent ~* (curl|wget|python-requests|python-urllib|go-http-client|java/|libwww-perl|ruby|scrapy|phantomjs|headlesschrome|puppeteer|httpclient|okhttp|axios|node-fetch)) {"
                print "        set $blocked_bot 1;"
                print "    }"
                print ""
                print "    if ($http_user_agent ~* (Googlebot|Google-InspectionTool|AdsBot-Google|YandexBot|YandexImages|YandexDirect|Bingbot|DuckDuckBot|Mail\\.RU_Bot)) {"
                print "        set $blocked_bot 0;"
                print "    }"
                print ""
                print "    if ($blocked_bot = 1) {"
                print "        return 403;"
                print "    }"
                print "    # --- END bot-filter ---"
                print ""
                inserted=1
            }
            print $0
        }
    ' "$SITE_CONF" > "$SITE_CONF.tmp" && mv "$SITE_CONF.tmp" "$SITE_CONF"

    if grep -q 'blocked_bot' "$SITE_CONF"; then
        ok "блок фильтрации User-Agent и proxy_hide_header Server добавлены в $SITE_CONF"
    else
        fail "не удалось вставить блок фильтрации UA (не найден location в $SITE_CONF)"
    fi
fi

# -----------------------------------------------------------------------------
# 4. limit_req в location / (zone=general, burst=50)
# -----------------------------------------------------------------------------
if grep -q 'zone=general burst=50' "$SITE_CONF"; then
    skip "limit_req zone=general burst=50 в location /"
else
    awk '
        BEGIN { inserted=0 }
        {
            print $0
            # Точное совпадение "location /" (не "location /api" и не "location ~")
            if (!inserted && $0 ~ /^\s*location[ \t]+\/[ \t]*\{[ \t]*$/) {
                print "        limit_req zone=general burst=50 nodelay;"
                inserted=1
            }
        }
    ' "$SITE_CONF" > "$SITE_CONF.tmp" && mv "$SITE_CONF.tmp" "$SITE_CONF"

    if grep -q 'zone=general burst=50' "$SITE_CONF"; then
        ok "limit_req zone=general burst=50 добавлен в location /"
    else
        fail "не найден блок 'location / {' в $SITE_CONF — limit_req (general) НЕ добавлен"
    fi
fi

# -----------------------------------------------------------------------------
# 5. limit_req в location ~ ^/(api|admin) (zone=api, burst=5)
# -----------------------------------------------------------------------------
if grep -q 'zone=api burst=5' "$SITE_CONF"; then
    skip "limit_req zone=api burst=5 в location ~ ^/(api|admin)"
else
    awk '
        BEGIN { inserted=0 }
        {
            print $0
            if (!inserted && $0 ~ /location[ \t]+~[ \t]+\^\/\(api\|admin\)/) {
                print "        limit_req zone=api burst=5 nodelay;"
                inserted=1
            }
        }
    ' "$SITE_CONF" > "$SITE_CONF.tmp" && mv "$SITE_CONF.tmp" "$SITE_CONF"

    if grep -q 'zone=api burst=5' "$SITE_CONF"; then
        ok "limit_req zone=api burst=5 добавлен в location ~ ^/(api|admin)"
    else
        fail "не найден блок 'location ~ ^/(api|admin)' в $SITE_CONF — limit_req (api) НЕ добавлен"
    fi
fi

# -----------------------------------------------------------------------------
# 6. nginx -t — ОБЯЗАТЕЛЬНЫЙ гейт перед reload
# -----------------------------------------------------------------------------
echo ""
echo "=== nginx -t ==="
NGINX_T_OUTPUT="$(nginx -t 2>&1)"
NGINX_T_CODE=$?
echo "$NGINX_T_OUTPUT"
echo "================"

if [[ $NGINX_T_CODE -ne 0 ]]; then
    echo ""
    echo "##########################################################"
    echo "# ОШИБКА: nginx -t провалился. Reload НЕ выполнен."
    echo "# Конфиги изменены на диске, но НЕ применены (reload не запущен)."
    echo "##########################################################"
    echo ""
    echo "ОТКАТ (выполнить вручную, если нужно вернуть файлы как было):"
    echo "  cp $BACKUP_DIR/nginx.conf.bak $NGINX_CONF"
    echo "  cp $BACKUP_DIR/feminform.com.bak $SITE_CONF"
    echo "  nginx -t && systemctl reload nginx"
    exit 1
fi

ok "nginx -t: синтаксис корректен"

# -----------------------------------------------------------------------------
# 7. Reload
# -----------------------------------------------------------------------------
if systemctl reload nginx; then
    ok "systemctl reload nginx выполнен"
else
    fail "systemctl reload nginx завершился с ошибкой"
    echo ""
    echo "ОТКАТ:"
    echo "  cp $BACKUP_DIR/nginx.conf.bak $NGINX_CONF"
    echo "  cp $BACKUP_DIR/feminform.com.bak $SITE_CONF"
    echo "  nginx -t && systemctl reload nginx"
    exit 1
fi

# -----------------------------------------------------------------------------
# 8. Проверочные запросы
# -----------------------------------------------------------------------------
echo ""
echo "=== Проверка ==="

UA_BROWSER="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"
UA_CURL="curl/8.0"
UA_GOOGLEBOT="Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
UA_YANDEXBOT="Mozilla/5.0 (compatible; YandexBot/3.0; +http://yandex.com/bots)"
UA_BINGBOT="Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)"

check_status() {
    local label="$1" ua="$2" expected="$3"
    local code
    code=$(curl -s -o /dev/null -w '%{http_code}' -A "$ua" "https://${DOMAIN}/" --max-time 10)
    if [[ "$code" == "$expected" ]]; then
        echo "  [OK]   $label -> $code (ожидалось $expected)"
    else
        echo "  [FAIL] $label -> $code (ожидалось $expected)"
        FAILED=1
    fi
}

check_status "Обычный браузер (Chrome)" "$UA_BROWSER" "200"
check_status "curl без спец. UA"        "$UA_CURL"    "403"
check_status "Googlebot"                "$UA_GOOGLEBOT" "200"
check_status "YandexBot"                "$UA_YANDEXBOT" "200"
check_status "Bingbot"                  "$UA_BINGBOT" "200"

SERVER_HEADER=$(curl -sI "https://${DOMAIN}/" -A "$UA_BROWSER" --max-time 10 | grep -i '^server:')
echo "  Server header: ${SERVER_HEADER:-<отсутствует>}"
if echo "$SERVER_HEADER" | grep -qiE '[0-9]+\.[0-9]+\.[0-9]+'; then
    echo "  [FAIL] Server header содержит версию Nginx"
    FAILED=1
else
    echo "  [OK]   Server header не содержит версию"
fi

# -----------------------------------------------------------------------------
# 9. Итог
# -----------------------------------------------------------------------------
echo ""
echo "================= ИТОГ ================="
echo "Бэкап:            $BACKUP_DIR"
echo ""
echo "Применено сейчас:"
if [[ ${#STEPS_DONE[@]} -eq 0 ]]; then
    echo "  (ничего нового — всё уже было применено ранее)"
else
    for s in "${STEPS_DONE[@]}"; do echo "  - $s"; done
fi
echo ""
echo "Пропущено (уже было):"
if [[ ${#STEPS_SKIPPED[@]} -eq 0 ]]; then
    echo "  (нет)"
else
    for s in "${STEPS_SKIPPED[@]}"; do echo "  - $s"; done
fi
echo "=========================================="

if [[ $FAILED -eq 1 ]]; then
    echo ""
    echo "СТАТУС: ЕСТЬ ПРОБЛЕМЫ (см. [FAIL] выше)."
    echo ""
    echo "ОТКАТ (если нужно вернуть всё как было):"
    echo "  cp $BACKUP_DIR/nginx.conf.bak $NGINX_CONF"
    echo "  cp $BACKUP_DIR/feminform.com.bak $SITE_CONF"
    echo "  nginx -t && systemctl reload nginx"
    exit 1
else
    echo ""
    echo "СТАТУС: ВСЁ УСПЕШНО."
    echo ""
    echo "Откат на всякий случай (если позже что-то сломается):"
    echo "  cp $BACKUP_DIR/nginx.conf.bak $NGINX_CONF"
    echo "  cp $BACKUP_DIR/feminform.com.bak $SITE_CONF"
    echo "  nginx -t && systemctl reload nginx"
    exit 0
fi
