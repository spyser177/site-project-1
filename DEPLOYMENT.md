# Деплой и инфраструктура

Документ описывает локальный запуск через Docker и продакшен-деплой на VPS.

## Быстрый старт (Docker Compose)

1. Скопируйте `.env.example` в `.env` и заполните значения (пароли, SMTP,
   S3-ключи и т.д.).
2. Соберите и запустите весь стек (Postgres + миграции/сид + приложение):

   ```bash
   npm run docker:up
   # эквивалент: docker compose up -d --build
   ```

3. Приложение будет доступно на `http://localhost:3000`.
4. Логи приложения: `npm run docker:logs`.
5. Остановить: `npm run docker:down`.

Сервис `migrate` выполняется один раз при каждом `up` — применяет
`prisma migrate deploy` и `prisma/seed.ts` (создаёт администратора и
дефолтные настройки), после чего завершается. Сервис `app` стартует только
после успешного завершения `migrate` и здорового `db` (см. `depends_on` с
`condition` в `docker-compose.yml`).

## Локальный S3 (MinIO) для разработки

Реальный S3 (Timeweb Cloud) не обязателен для локальной разработки — можно
поднять S3-совместимый MinIO из того же compose-файла:

```bash
docker compose --profile local-s3 up -d minio
```

- S3 API: `http://localhost:9000`
- Веб-консоль: `http://localhost:9001` (логин/пароль — значения
  `S3_ACCESS_KEY`/`S3_SECRET_KEY` из `.env`)

В `.env` для локального MinIO укажите:

```
S3_ENDPOINT="http://localhost:9000"
S3_BUCKET="med-abort-images"
```

Бакет с именем из `S3_BUCKET` нужно создать вручную через консоль MinIO
(Buckets → Create Bucket) и включить публичный доступ на чтение (Access
Policy → Public) — в продакшен-S3 это обычно настраивается один раз через
консоль провайдера.

## Продакшен-деплой на VPS

### 1. Подготовка сервера

- Установите Docker и Docker Compose plugin на VPS (Ubuntu).
- Склонируйте репозиторий в директорию, например `/opt/site-project-1`.
- Создайте `.env` на сервере (не коммитится в git) с реальными продакшен-
  значениями: пароль БД, `JWT_SECRET` (32+ символов), реальные SMTP/Telegram/
  S3-ключи, `NEXT_PUBLIC_SITE_URL` с вашим доменом и т.д.

### 2. Ручной первый деплой

```bash
cd /opt/site-project-1
docker compose run --rm migrate
docker compose up -d --build
```

> **Важно про `NEXT_PUBLIC_*` переменные.** Next.js вшивает значения
> `NEXT_PUBLIC_*` (телефон, email, домен, ID Метрики и т.д.) в JS-бандл **на
> этапе `next build`**, а не читает их заново в runtime. Поэтому эти
> переменные передаются в Docker как build-args (см. `build.args` в
> `docker-compose.yml`, значения подставляются из серверного `.env`).
> Рекомендуемый способ деплоя — именно `docker compose up -d --build`
> (сборка на самом сервере из актуального `.env`), а не `docker compose pull`
> готового образа из GHCR — иначе в образе останутся значения из момента
> сборки в CI (заглушки, если не заданы отдельные секреты в GitHub, см. ниже).

### 3. Автоматический деплой через GitHub Actions (опционально)

При каждом push в `main`:
1. Workflow `.github/workflows/ci.yml` — прогоняет lint + build.
2. Workflow `.github/workflows/docker-publish.yml`:
   - собирает Docker-образ (стейдж `runner`) и пушит в
     `ghcr.io/<owner>/<repo>` с тегами `latest`, `sha-<hash>`, `main`
     (полезно для истории версий/ручного rollback, даже если основной
     деплой идёт через пересборку на сервере);
   - при включённом деплое (см. ниже) подключается по SSH к серверу,
     обновляет код (`git pull`) и пересобирает контейнеры **локально на
     сервере** — так гарантированно используются актуальные значения из
     серверного `.env`, включая `NEXT_PUBLIC_*`.

Автодеплой **отключён по умолчанию** и требует явного включения:

1. **Settings → Secrets and variables → Actions → Variables** — добавьте
   переменную `DEPLOY_ENABLED` со значением `true`.
2. **Settings → Secrets and variables → Actions → Secrets** — добавьте:
   - `DEPLOY_SSH_HOST` — IP/домен сервера
   - `DEPLOY_SSH_USER` — пользователь SSH (например, `deploy`)
   - `DEPLOY_SSH_KEY` — приватный SSH-ключ (без пароля), публичную часть
     добавьте в `~/.ssh/authorized_keys` пользователя на сервере
   - `DEPLOY_SSH_PORT` — порт SSH, если не 22 (опционально)
   - `DEPLOY_PATH` — путь к проекту на сервере, например
     `/opt/site-project-1`

После этого каждый push в `main` будет автоматически выполнять на сервере:
`git pull` → `bash scripts/zero-downtime-deploy.sh` (см. раздел
«Zero-downtime деплой» ниже).

Если переменная `DEPLOY_ENABLED` не установлена в `true` — job `deploy`
пропускается, публикация образа в GHCR при этом всё равно происходит.

## Zero-downtime деплой (blue-green)

### Проблема

При наивном `docker compose up -d --build` старый контейнер `app`
останавливается и удаляется, а новый поднимается на его месте. Между этими
моментами есть окно, когда:

- сайт недоступен (контейнер пересоздаётся);
- у пользователей, чей браузер/CDN уже отдал старый HTML, браузер пытается
  догрузить старые JS-чанки `/_next/static/<buildId>/...` — а отдавать их
  уже нечему, потому что старый контейнер мёртв, а новый знает только о
  чанках нового билда → `404` / `ERR_CONNECTION_RESET` / React-ошибка
  "Application error: a client-side exception has occurred".

### Решение

Используется **blue-green деплой** (`scripts/zero-downtime-deploy.sh`):

1. Применяются миграции БД (`docker compose run --rm migrate`).
2. Собирается новый образ и запускается **второй, параллельный** контейнер
   `app` на свободном порту (3001/3002, попеременно) — старый контейнер при
   этом продолжает обслуживать трафик.
3. Новый контейнер проверяется через `/api/health` (до 60 секунд). Если
   health check не проходит — деплой прерывается, старый контейнер не
   трогается (нулевой риск падения прода из-за плохого билда).
4. Содержимое `.next/static` нового билда копируется на хост в
   `static-cache/<buildId>/` — именно оттуда Nginx отдаёт `/_next/static/*`
   напрямую с диска (`alias`), в обход контейнеров.
5. Nginx-upstream (`/etc/nginx/conf.d/feminform_upstream.conf`) переключается
   на порт нового контейнера, конфигурация применяется через
   `nginx -s reload` — это graceful-перечитывание, которое не рвёт уже
   открытые соединения и не создаёт простоя.
6. После паузы (15 секунд, чтобы отработали in-flight запросы) старый
   контейнер останавливается и удаляется. Его статика в `static-cache/`
   **не удаляется** — старые чанки остаются доступны.
7. Директории `static-cache/<buildId>/` старше 24 часов удаляются
   автоматически при следующем деплое (при необходимости можно дополнительно
   навесить cron: `find static-cache -maxdepth 1 -mmin +1440 -exec rm -rf {} +`).

### Кэширование HTML и статики

Чтобы раздел 4–7 имел смысл, важно, что отдаётся с каким `Cache-Control`
(настроено в `next.config.ts` → `headers()`):

- **HTML/страницы** — `Cache-Control: no-cache, must-revalidate`. Браузер и
  CDN (Gcore) обязаны ревалидировать на каждый запрос, поэтому не держат
  неделями HTML со ссылками на уже удалённые чанки.
- **`/_next/static/*`** — `Cache-Control: public, max-age=31536000,
  immutable`. Путь содержит хэш билда (`buildId`), поэтому файл по этому URL
  физически никогда не меняется — агрессивное кэширование безопасно, а
  старые версии продолжают быть доступны благодаря `static-cache/`.

На стороне Gcore CDN следует включить "Respect origin headers"/аналог для
`Cache-Control`, чтобы CDN не кэшировал HTML дольше, чем разрешает источник,
и чтобы purge кэша CDN для HTML не требовался вручную при каждом деплое
(статика с хэшем в пути и так safe to cache бессрочно).

### Требования к Nginx (один раз)

В конфиг сайта (`/etc/nginx/conf.d/domains/feminform.com.conf`) должны быть:

```nginx
include /etc/nginx/conf.d/feminform_upstream.conf;

server {
    ...
    location ^~ /_next/static/ {
        alias /var/www/feminform.com/static-cache/;
        access_log off;
        try_files $uri @app;
    }

    location @app {
        proxy_pass http://feminform_app;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }

    location / {
        proxy_pass http://feminform_app;
        ...
    }
}
```

Файл `feminform_upstream.conf` создаётся и обновляется автоматически
скриптом деплоя — вручную его трогать не нужно.

Если вместо пересборки на сервере вы предпочитаете разворачивать именно
готовый образ из GHCR (`docker compose pull app`) — дополнительно задайте в
GitHub Secrets все переменные `NEXT_PUBLIC_*` (см. `build-args` в
`docker-publish.yml`), иначе опубликованный образ будет содержать
значения-заглушки.

### 4. Применение новых миграций на проде вручную

Если деплой настроен на пересборку (`docker compose up -d --build`, как в
шаге 3), миграции уже применяются автоматически перед перезапуском
(`docker compose run --rm migrate`). Если вы используете альтернативный
сценарий с `docker compose pull app`, выполните на сервере отдельно:

```bash
docker compose run --rm migrate
```


## Nginx и HTTPS

Docker-образ приложения слушает порт 3000 внутри контейнера. Для домена и
SSL рекомендуется reverse-proxy (Nginx + Let's Encrypt/certbot) перед
контейнером — настройка Nginx, сертификатов и security-заголовков на уровне
веб-сервера выходит за рамки текущей итерации и должна быть добавлена при
подключении реального домена.

## Резервное копирование БД

Регулярный бэкап Postgres-volume не настроен в этой итерации. Простой вариант
для cron на сервере:

```bash
docker compose exec -T db pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB" | gzip > backup-$(date +%F).sql.gz
```
