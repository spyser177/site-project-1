/**
 * Минимальная форма документа Media (коллекция Payload), которой достаточно
 * для рендера <img>/next-Image на сайте. Поле `image`/`logo` в глобалах и
 * коллекциях — relationTo: "media", которое Payload Local API возвращает
 * как populated-объект (при depth >= 1, включено по умолчанию у find/findGlobal).
 */
export interface MediaLike {
  url?: string | null;
  alt?: string | null;
  width?: number | null;
  height?: number | null;
}

/** Достаёт URL изображения из поля upload независимо от того, пришёл ли
 *  populated-объект, просто id или null/undefined. */
export function getMediaUrl(
  media: MediaLike | number | string | null | undefined
): string | null {
  if (!media) return null;
  if (typeof media === "number" || typeof media === "string") return null;
  return media.url ?? null;
}

export function getMediaAlt(
  media: MediaLike | number | string | null | undefined,
  fallback = ""
): string {
  if (!media || typeof media === "number" || typeof media === "string") {
    return fallback;
  }
  return media.alt ?? fallback;
}
