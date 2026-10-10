import {
  convertLexicalToHTML,
  defaultHTMLConverters,
  type HTMLConverters,
} from "@payloadcms/richtext-lexical/html";
import type { SerializedEditorState } from "lexical";
import type { MediaLike } from "@/lib/media";
import { getMediaSrcSet, RESPONSIVE_SIZES_ATTR } from "@/lib/media";

/**
 * Рендер richText-поля Payload (Lexical) в стилизованный HTML.
 *
 * Используется вместо старого `ArticleContent + textToBlocks`, который был
 * заточен под Prisma-поле `content: string` с самодельной markdown-подобной
 * разметкой. Контент в Payload хранится как сериализованное состояние
 * Lexical-редактора, поэтому конвертируется штатным конвертером пакета
 * `@payloadcms/richtext-lexical/html`.
 *
 * Классы для h2/h3/p/ul/blockquote и т.д. заданы в globals.css в блоке
 * `.payload-richtext …`, чтобы визуально совпадать со старым ArticleContent.
 *
 * Конвертер для узла `upload` переопределён: вместо стандартного
 * <picture>/<source media="..."> (который перечисляет изображения как
 * breakpoints, а не варианты плотности) рендерим обычный <img> с
 * srcset/sizes по ширине (480/768/1200w) — так браузер сам выбирает
 * подходящий по ширине вьюпорта файл (mobile/tablet/desktop) без лишней
 * загрузки «десктопной» картинки на телефоне.
 */
function escapeAttr(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

const responsiveUploadConverter: HTMLConverters = {
  upload: ({ node }) => {
    const uploadNode = node as unknown as {
      value?: MediaLike | number | string;
      fields?: { alt?: string };
    };
    const media = uploadNode.value;
    if (!media || typeof media === "number" || typeof media === "string") {
      return "";
    }

    const alt = escapeAttr(uploadNode.fields?.alt || media.alt || "");
    const url = escapeAttr(media.url ?? "");
    const width = media.width ?? "";
    const height = media.height ?? "";
    const srcSet = getMediaSrcSet(media);

    return `<img
      class="payload-richtext-image"
      alt="${alt}"
      src="${url}"
      width="${escapeAttr(String(width))}"
      height="${escapeAttr(String(height))}"
      loading="lazy"
      ${srcSet ? `srcset="${escapeAttr(srcSet)}" sizes="${escapeAttr(RESPONSIVE_SIZES_ATTR)}"` : ""}
    />`;
  },
};

export function RichText({
  data,
  className = "payload-richtext",
}: {
  data: SerializedEditorState | null | undefined;
  className?: string;
}) {
  if (!data) return null;

  let html = "";
  try {
    html = convertLexicalToHTML({
      data,
      converters: {
        ...defaultHTMLConverters,
        ...responsiveUploadConverter,
      },
      disableContainer: true,
    });
  } catch (error) {
    console.warn("[RichText] Не удалось преобразовать richText в HTML", error);
    return null;
  }

  if (!html) return null;

  return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
