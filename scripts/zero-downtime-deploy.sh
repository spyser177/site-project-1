#!/usr/bin/env bash
# Blue-green zero-downtime деплой для feminform.com.
#
# Проблема, которую решает скрипт:
#   При `docker compose up -d --build` старый контейнер останавливается и
#   удаляется ДО того, как новый полностью готов. Любой пользователь, у
#   которого в браузере/CDN уже загружен старый HTML, после этого момента
#   запрашивает старые JS-чанки (/_next/static/<buildId>/...) — а отдавать
#   их уже некому (старый контейнер мёртв, новый знает только о новых
#   чанках) → 404 / ERR_CONNECTION_RESET / "Application error".
#
# Решение (вариант Б + немного А):
#   1. Новый контейнер запускается РЯДОМ со старым на отдельном порту.
#   2. Трафик переключается на него в Nginx только после healthcheck.
#   3. Статика (.next/static) каждого билда копируется в общую directory
#      static-cache/<buildId> на хосте. Nginx отдаёт /_next/static/* прямо
#      с диска (alias), независимо от того, жив ли контейнер, который её
#      собрал. Старые директории чистятся только через 24 часа.
#   4. HTML всегда отдаётся с Cache-Control: no-cache (см. nginx-конфиг),
#      поэтому браузер/CDN не держит зависшую версию страницы надолго.
#
# Использование: bash scripts/zero-downtime-deploy.sh
# Требует: Docker, nginx (с подключаемым upstream-файлом), curl, git.

set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_DIR"

# shellcheck disable=SC1091
set -a; source .env; set +a

NETWORK="feminformcom_default"
IMAGE_NAME="${IMAGE_NAME:-feminform-app}"
HEALTH_PATH="/api/health"
STATE_FILE="$PROJECT_DIR/.deploy_active_port"
STATIC_CACHE_DIR="$PROJECT_DIR/static-cache"
NGINX_UPSTREAM_FILE="/etc/nginx/conf.d/feminform_upstream.conf"
HEALTH_TIMEOUT_SEC=60
DRAIN_SEC=15
STATIC_RETENTION_MIN=1440 # 24 часа

mkdir -p "$STATIC_CACHE_DIR"

echo "==> [1/9] Применяем миграции БД (идемпотентно, перед переключением трафика)"
docker compose run --rm migrate

echo "==> [2/9] Собираем образ приложения"
GIT_SHA="$(git rev-parse --short HEAD)"
docker compose build app
docker tag "${IMAGE_NAME}:latest" "${IMAGE_NAME}:${GIT_SHA}"

echo "==> [3/9] Определяем активный/резервный порт (blue=3001 / green=3002)"
ACTIVE_PORT="$(cat "$STATE_FILE" 2>/dev/null || echo 3001)"
if [ "$ACTIVE_PORT" = "3001" ]; then NEW_PORT=3002; else NEW_PORT=3001; fi
OLD_NAME="feminform-app-${ACTIVE_PORT}"
NEW_NAME="feminform-app-${NEW_PORT}"
echo "    активный: ${OLD_NAME} (:${ACTIVE_PORT})  ->  новый: ${NEW_NAME} (:${NEW_PORT})"

echo "==> [4/9] Запускаем новый контейнер рядом со старым"
docker rm -f "$NEW_NAME" >/dev/null 2>&1 || true
docker run -d \
  --name "$NEW_NAME" \
  --network "$NETWORK" \
  --env-file .env \
  -e NODE_ENV=production \
  -v "$PROJECT_DIR/public/media:/app/public/media" \
  -p "127.0.0.1:${NEW_PORT}:3000" \
  --restart unless-stopped \
  --label "feminform.deploy=blue-green" \
  "${IMAGE_NAME}:${GIT_SHA}" >/dev/null

echo "==> [5/9] Ждём healthcheck на порту ${NEW_PORT} (до ${HEALTH_TIMEOUT_SEC}s)"
healthy=0
for i in $(seq 1 "$HEALTH_TIMEOUT_SEC"); do
  if curl -fs "http://127.0.0.1:${NEW_PORT}${HEALTH_PATH}" >/dev/null 2>&1; then
    echo "    OK после ${i}s"
    healthy=1
    break
  fi
  sleep 1
done
if [ "$healthy" -ne 1 ]; then
  echo "!! Новый контейнер не прошёл healthcheck — откатываем деплой, старый контейнер не трогаем"
  docker logs --tail 100 "$NEW_NAME" || true
  docker rm -f "$NEW_NAME" || true
  exit 1
fi

echo "==> [6/9] Копируем статику билда в static-cache (чтобы старые чанки жили 24ч+)"
BUILD_ID="$(docker exec "$NEW_NAME" cat .next/BUILD_ID 2>/dev/null || echo "$GIT_SHA")"
rm -rf "${STATIC_CACHE_DIR}/${BUILD_ID}"
docker cp "${NEW_NAME}:/app/.next/static" "${STATIC_CACHE_DIR}/${BUILD_ID}"
echo "    BUILD_ID=${BUILD_ID}"

echo "==> [7/9] Переключаем Nginx upstream на новый порт (graceful reload, без простоя)"
cat > "$NGINX_UPSTREAM_FILE" <<EOF
# Автогенерируется scripts/zero-downtime-deploy.sh — не редактировать руками.
upstream feminform_app {
    server 127.0.0.1:${NEW_PORT};
}
EOF
nginx -t
systemctl reload nginx
echo "$NEW_PORT" > "$STATE_FILE"

echo "==> [8/9] Даём время старым запросам завершиться (${DRAIN_SEC}s), затем останавливаем старый контейнер"
sleep "$DRAIN_SEC"
if docker ps --format '{{.Names}}' | grep -qx "$OLD_NAME"; then
  docker stop "$OLD_NAME" >/dev/null || true
  docker rm "$OLD_NAME" >/dev/null || true
  echo "    ${OLD_NAME} остановлен и удалён (статика в static-cache сохранена на 24ч)"
fi

echo "==> [9/9] Чистим static-cache старше 24ч и неиспользуемые docker-образы"
find "$STATIC_CACHE_DIR" -maxdepth 1 -mindepth 1 -type d -mmin "+${STATIC_RETENTION_MIN}" -exec rm -rf {} + 2>/dev/null || true
docker image prune -f >/dev/null || true

echo "==> Деплой завершён без простоя. Активный порт: ${NEW_PORT} (контейнер ${NEW_NAME})"
