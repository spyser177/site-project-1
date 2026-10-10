/**
 * Минимальная форма документа Media (коллекция Payload), которой достаточно
 * для рендера <img>/next-Image на сайте. Поле `image`/`logo` в глобалах и
 * коллекциях — relationTo: "media", которое Payload Local API возвращает
 * как populated-объект (при depth >= 1, включено по умолчанию у find/findGlobal).
 */
export interface MediaSize {
  url?: string | null;
  width?: number | null;
  height?: number | null;
}

export interface MediaLike {
  url?: string | null;
  alt?: string | null;
  width?: number | null;
  height?: number | null;
  sizes?: {
    mobile?: MediaSize | null;
    tablet?: MediaSize | null;
    desktop?: MediaSize | null;
    hero?: MediaSize | null;
    thumbnail?: MediaSize | null;
  } | null;
}

/** Ширины (px), под которые генерируются размеры в Media (imageSizes). */
export const RESPONSIVE_WIDTHS = {
  mobile: 480,
  tablet: 768,
  desktop: 1200,
} as const;

/** Стандартный атрибут sizes для адаптивных изображений статей/карточек. */
export const RESPONSIVE_SIZES_ATTR =
  "(max-width: 480px) 480px, (max-width: 768px) 768px, 1200px";

/** Строит атрибут srcset из mobile/tablet/desktop размеров media-документа.
 *  Если каких-то размеров нет (например, старые загрузки без sharp-ресайза),
 *  они просто пропускаются — браузер использует оставшиеся варианты. */
export function getMediaSrcSet(
  media: MediaLike | number | string | null | undefined
): string | undefined {
  if (!media || typeof media === "number" || typeof media === "string") {
    return undefined;
  }
  const sizes = media.sizes;
  if (!sizes) return undefined;

  const entries: string[] = [];
  if (sizes.mobile?.url) entries.push(`${sizes.mobile.url} ${RESPONSIVE_WIDTHS.mobile}w`);
  if (sizes.tablet?.url) entries.push(`${sizes.tablet.url} ${RESPONSIVE_WIDTHS.tablet}w`);
  if (sizes.desktop?.url) entries.push(`${sizes.desktop.url} ${RESPONSIVE_WIDTHS.desktop}w`);

  return entries.length ? entries.join(", ") : undefined;
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
