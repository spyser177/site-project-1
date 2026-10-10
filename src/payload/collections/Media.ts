import path from "path";
import { fileURLToPath } from "url";

import type { CollectionConfig } from "payload";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

/**
 * Коллекция Media — хранилище изображений (загрузки через Payload Upload).
 *
 * Файлы сохраняются локально на диске в директорию /public/media (видна по
 * URL /media/<filename>) с автогенерацией уменьшенных версий (mobile,
 * tablet, desktop, hero, thumbnail) средствами sharp. Все версии
 * конвертируются в WebP с качеством 80% для оптимизации веса страниц. При
 * необходимости переключения на S3 (переменные S3_* уже есть в .env) —
 * заменить staticDir/disableLocalStorage на @payloadcms/storage-s3.
 */
export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    group: "Контент",
    useAsTitle: "alt",
  },
  access: {
    read: () => true,
  },
  upload: {
    staticDir: path.resolve(dirname, "../../../public/media"),
    mimeTypes: ["image/*"],
    // Конвертация оригинала и всех производных размеров в WebP с качеством 80%.
    formatOptions: {
      format: "webp",
      options: {
        quality: 80,
      },
    },
    imageSizes: [
      {
        name: "mobile",
        width: 480,
        height: 320,
        position: "centre",
      },
      {
        name: "tablet",
        width: 768,
        height: 512,
        position: "centre",
      },
      {
        name: "desktop",
        width: 1200,
        height: 800,
        position: "centre",
      },
      {
        name: "hero",
        width: 1600,
        height: 900,
        position: "centre",
      },
      {
        name: "thumbnail",
        width: 300,
        height: 300,
        position: "centre",
      },
    ],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      label: "Alt-текст",
      admin: {
        description:
          "Описание изображения для SEO и доступности (атрибут alt).",
      },
    },
  ],
}
