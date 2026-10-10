import path from "path";
import { fileURLToPath } from "url";

import type { CollectionConfig } from "payload";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

/**
 * Коллекция Media — хранилище изображений (загрузки через Payload Upload).
 *
 * Файлы сохраняются локально на диске в директорию /public/media (видна по
 * URL /media/<filename>) с автогенерацией уменьшенных версий (thumbnail,
 * card, hero) средствами sharp. При необходимости переключения на S3
 * (переменные S3_* уже есть в .env) — заменить staticDir/disableLocalStorage
 * на @payloadcms/storage-s3.
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
    imageSizes: [
      {
        name: "thumbnail",
        width: 300,
        height: 300,
        position: "centre",
      },
      {
        name: "card",
        width: 600,
        height: 400,
        position: "centre",
      },
      {
        name: "hero",
        width: 1600,
        height: 900,
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
