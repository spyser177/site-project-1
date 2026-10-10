import {
  convertLexicalToHTML,
  defaultHTMLConverters,
} from "@payloadcms/richtext-lexical/html";
import type { SerializedEditorState } from "lexical";

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
 */
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
      converters: defaultHTMLConverters,
      disableContainer: true,
    });
  } catch (error) {
    console.warn("[RichText] Не удалось преобразовать richText в HTML", error);
    return null;
  }

  if (!html) return null;

  return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
