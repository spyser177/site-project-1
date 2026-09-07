/**
 * Простой in-memory rate limiting (fixed window) по IP.
 *
 * Ограничение: состояние хранится в памяти процесса, поэтому при
 * нескольких инстансах приложения (горизонтальное масштабирование)
 * лимиты не будут общими. Для одного VPS-контейнера (MVP) этого
 * достаточно. При масштабировании — заменить на Redis (см. заметку
 * в Engineering Guide, итерация 2).
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

// Периодическая очистка устаревших записей, чтобы Map не рос бесконечно
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;
let cleanupTimer: ReturnType<typeof setInterval> | null = null;

function ensureCleanupTimer() {
  if (cleanupTimer || typeof setInterval === "undefined") return;
  cleanupTimer = setInterval(() => {
    const now = Date.now();
    for (const [key, bucket] of buckets) {
      if (bucket.resetAt < now) buckets.delete(key);
    }
  }, CLEANUP_INTERVAL_MS);
  // Не держим процесс живым только из-за таймера очистки
  if (typeof cleanupTimer === "object" && "unref" in cleanupTimer) {
    (cleanupTimer as unknown as { unref: () => void }).unref();
  }
}

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetAt: number;
}

/**
 * Проверяет и увеличивает счётчик запросов для ключа (обычно IP + маршрут).
 * @param key уникальный идентификатор (например, `contact:203.0.113.1`)
 * @param limit максимум запросов за окно
 * @param windowMs длительность окна в миллисекундах
 */
export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number
): RateLimitResult {
  ensureCleanupTimer();
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || existing.resetAt < now) {
    const resetAt = now + windowMs;
    buckets.set(key, { count: 1, resetAt });
    return { success: true, remaining: limit - 1, resetAt };
  }

  if (existing.count >= limit) {
    return { success: false, remaining: 0, resetAt: existing.resetAt };
  }

  existing.count += 1;
  return { success: true, remaining: limit - existing.count, resetAt: existing.resetAt };
}

/** Публичные API-маршруты: 20 запросов/мин */
export function checkPublicRateLimit(ip: string, route: string) {
  return checkRateLimit(`public:${route}:${ip}`, 20, 60_000);
}

/** Админ-маршруты: 50 запросов/мин */
export function checkAdminRateLimit(ip: string, route: string) {
  return checkRateLimit(`admin:${route}:${ip}`, 50, 60_000);
}

/** Извлекает IP клиента из заголовков (учитывает proxy/nginx) */
export function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const realIp = headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "unknown";
}
