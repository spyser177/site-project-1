import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";

/**
 * S3-совместимое хранилище изображений (например, Timeweb Cloud S3).
 * Конфигурация полностью через env — при отсутствии переменных функции
 * бросают понятную ошибку, которую перехватывает вызывающий API-роут.
 */

function getS3Config() {
  const endpoint = process.env.S3_ENDPOINT;
  const bucket = process.env.S3_BUCKET;
  const accessKeyId = process.env.S3_ACCESS_KEY;
  const secretAccessKey = process.env.S3_SECRET_KEY;
  const region = process.env.S3_REGION || "ru-1";

  if (!endpoint || !bucket || !accessKeyId || !secretAccessKey) {
    throw new Error(
      "S3 не настроен: заполните S3_ENDPOINT, S3_BUCKET, S3_ACCESS_KEY, S3_SECRET_KEY в .env"
    );
  }

  return { endpoint, bucket, accessKeyId, secretAccessKey, region };
}

let cachedClient: S3Client | null = null;

function getS3Client(): S3Client {
  if (cachedClient) return cachedClient;
  const { endpoint, region, accessKeyId, secretAccessKey } = getS3Config();

  cachedClient = new S3Client({
    endpoint,
    region,
    credentials: { accessKeyId, secretAccessKey },
    forcePathStyle: true, // требуется для большинства S3-совместимых провайдеров (Timeweb, MinIO)
  });
  return cachedClient;
}

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
]);

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 МБ

export interface UploadResult {
  url: string;
  key: string;
}

/** Загружает файл изображения в S3-бакет и возвращает публичный URL */
export async function uploadImageToS3(
  file: Buffer,
  contentType: string,
  originalName: string
): Promise<UploadResult> {
  if (!ALLOWED_TYPES.has(contentType)) {
    throw new Error("Недопустимый тип файла. Разрешены: JPEG, PNG, WebP, AVIF");
  }
  if (file.byteLength > MAX_FILE_SIZE_BYTES) {
    throw new Error("Файл превышает максимальный размер 5 МБ");
  }

  const { bucket, endpoint } = getS3Config();
  const client = getS3Client();

  const ext = (originalName.split(".").pop() || "jpg").toLowerCase().slice(0, 10);
  const key = `articles/${Date.now()}-${randomUUID()}.${ext}`;

  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: file,
      ContentType: contentType,
      ACL: "public-read",
      CacheControl: "public, max-age=2592000", // 30 дней, как указано в требованиях
    })
  );

  const url = `${endpoint.replace(/\/$/, "")}/${bucket}/${key}`;
  return { url, key };
}

/** Удаляет объект из S3 по ключу (используется при удалении/замене изображения статьи) */
export async function deleteImageFromS3(key: string): Promise<void> {
  const { bucket } = getS3Config();
  const client = getS3Client();
  await client.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
}

/** Проверяет, настроено ли S3-хранилище (для UI-подсказок в админке) */
export function isS3Configured(): boolean {
  try {
    getS3Config();
    return true;
  } catch {
    return false;
  }
}
