# syntax=docker/dockerfile:1

# ---------- 1. Установка зависимостей ----------
FROM node:20-alpine AS deps
WORKDIR /app

# libc6-compat нужен для некоторых нативных зависимостей на Alpine
RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json ./
# prisma/schema.prisma нужен уже на этом шаге: `npm ci` запускает
# postinstall-хук `prisma generate`, которому требуется файл схемы.
COPY prisma ./prisma
RUN npm ci

# ---------- 2. Сборка приложения ----------
# Этот стейдж также используется как самостоятельный образ для
# одноразового job'а миграций/сида (см. docker-compose.yml, target: builder) —
# в нём полностью доступны prisma CLI, tsx и все devDependencies.
FROM node:20-alpine AS builder
WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# DATABASE_URL нужен только для валидации схемы при `prisma generate`,
# реальное подключение к БД во время сборки не требуется.
ENV DATABASE_URL="postgresql://user:password@localhost:5432/db?schema=public"
ENV NEXT_TELEMETRY_DISABLED=1

# NEXT_PUBLIC_*-переменные инлайнятся в JS-бандл на этапе `next build` и не
# читаются заново в runtime — поэтому их нужно передать именно как build-args
# (см. docker-compose.yml → build.args), а не только через .env/env_file.
ARG NEXT_PUBLIC_SITE_URL="https://example.com"
ARG NEXT_PUBLIC_SITE_PHONE
ARG NEXT_PUBLIC_SITE_EMAIL
ARG NEXT_PUBLIC_SITE_TELEGRAM
ARG NEXT_PUBLIC_SITE_WHATSAPP
ARG NEXT_PUBLIC_SITE_ADDRESS
ARG NEXT_PUBLIC_SITE_INN
ARG NEXT_PUBLIC_SITE_OGRN
ARG NEXT_PUBLIC_SITE_LEGAL_NAME
ARG NEXT_PUBLIC_YANDEX_METRIKA_ID
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
ENV NEXT_PUBLIC_SITE_PHONE=${NEXT_PUBLIC_SITE_PHONE}
ENV NEXT_PUBLIC_SITE_EMAIL=${NEXT_PUBLIC_SITE_EMAIL}
ENV NEXT_PUBLIC_SITE_TELEGRAM=${NEXT_PUBLIC_SITE_TELEGRAM}
ENV NEXT_PUBLIC_SITE_WHATSAPP=${NEXT_PUBLIC_SITE_WHATSAPP}
ENV NEXT_PUBLIC_SITE_ADDRESS=${NEXT_PUBLIC_SITE_ADDRESS}
ENV NEXT_PUBLIC_SITE_INN=${NEXT_PUBLIC_SITE_INN}
ENV NEXT_PUBLIC_SITE_OGRN=${NEXT_PUBLIC_SITE_OGRN}
ENV NEXT_PUBLIC_SITE_LEGAL_NAME=${NEXT_PUBLIC_SITE_LEGAL_NAME}
ENV NEXT_PUBLIC_YANDEX_METRIKA_ID=${NEXT_PUBLIC_YANDEX_METRIKA_ID}

RUN npx prisma generate
RUN npm run build

# ---------- 3. Финальный минимальный образ приложения ----------
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

# output: "standalone" уже трассирует и включает минимально необходимые
# node_modules (включая сгенерированный Prisma Client) — копировать
# зависимости вручную не требуется.
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
