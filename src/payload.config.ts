import path from "path";
import { fileURLToPath } from "url";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { buildConfig } from "payload";
import sharp from "sharp";

import { migrations } from "./migrations";
import { Articles } from "./payload/collections/Articles";
import { Media } from "./payload/collections/Media";
import { Pages } from "./payload/collections/Pages";
import { SiteSettings } from "./payload/globals/SiteSettings";
import { HomePage } from "./payload/globals/HomePage";
import { HeaderSettings } from "./payload/globals/HeaderSettings";
import { FooterSettings } from "./payload/globals/FooterSettings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

/**
 * Секретный префикс маршрутов Payload (задаётся через PAYLOAD_ADMIN_SEGMENT в .env).
 *
 * Payload-админка намеренно вынесена НЕ на публичный /admin (этот путь уже
 * занят — next.config.ts/middleware.ts превращают его в 404 для старой
 * скрытой админ-панели на Prisma). Вместо этого вся поверхность Payload
 * (UI + REST API) смонтирована под случайным непубличным сегментом, который
 * не фигурирует ни в сайтмапе, ни в ссылках, ни в robots.txt.
 */
const adminSegment = process.env.PAYLOAD_ADMIN_SEGMENT || "cms-admin";

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SITE_URL || undefined,

  // Секретный ключ для хэширования/шифрования (сессии, сброс пароля и т.д.)
  secret: process.env.PAYLOAD_SECRET || "",

  // Повторно используем DATABASE_URL проекта (та же Postgres-база, что и у
  // Prisma) — отдельная переменная DATABASE_URI не нужна, чтобы не держать
  // два источника правды для одной и той же строки подключения.
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
    // `payload migrate` (отдельный CLI-процесс) на связке payload@3.90 +
    // Node 20/22 ломается при динамическом импорте собственного же
    // сгенерированного .ts-файла миграции — похоже на баг апстрима
    // (ERR_UNKNOWN_FILE_EXTENSION на Node 20; конфликт native
    // type-stripping с миксом type/value-импортов в одной import-строке
    // на Node 22), а не на ошибку конфигурации проекта.
    //
    // Решение: передаём миграции напрямую через prodMigrations — этот
    // массив импортируется статически и попадает в бандл Next.js при
    // `next build`, поэтому применяется in-process при старте
    // контейнера (NODE_ENV=production), без обращения к сломанному
    // CLI-пути. Чтобы добавить новую миграцию в будущем:
    //   1) сгенерировать её (локально/в контейнере с рабочим CLI,
    //      либо дождаться фикса апстрима для `payload migrate:create`);
    //   2) добавить в src/migrations/index.ts;
    //   3) пересобрать и передеплоить — применится автоматически при
    //      старте.
    prodMigrations: migrations,
  }),

  sharp,

  collections: [
    {
      slug: "users",
      auth: true,
      admin: {
        useAsTitle: "email",
      },
      fields: [],
    },
    Media,
    Articles,
    Pages,
  ],

  globals: [SiteSettings, HomePage, HeaderSettings, FooterSettings],

  // Переносим корневые маршруты Payload под секретный префикс, подальше от
  // публичного /admin (см. комментарий к adminSegment выше).
  routes: {
    admin: `/${adminSegment}/admin`,
    api: `/${adminSegment}/api`,
  },

  admin: {
    importMap: {
      baseDir: path.resolve(dirname, `./app/${adminSegment}/(payload)`),
      importMapFile: path.resolve(
        dirname,
        `./app/${adminSegment}/(payload)/admin/importMap.js`,
      ),
    },
  },

  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
