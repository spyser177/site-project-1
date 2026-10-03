import type { ArticleBlock } from "./articles";

/**
 * Простая текстовая разметка для редактирования контента в админке
 * (без WYSIWYG и без markdown-зависимостей) и её конвертация в типизированные
 * блоки ArticleBlock, которые умеет рендерить <ArticleContent />.
 *
 * Конвенции:
 *  - "## текст"        → h2
 *  - "### текст"       → h3
 *  - "- пункт"         → элемент списка (несколько подряд формируют один list)
 *  - "> текст"         → цитата/callout; если первая строка "> **Заголовок**" —
 *                        она становится title блока callout
 *  - "Q: вопрос" / "A: ответ" → пара FAQ (несколько подряд формируют один faq)
 *  - "[Изображение: подпись]" → imagePlaceholder
 *  - любая другая строка   → обычный параграф (p)
 *
 * Блоки разделяются пустой строкой.
 */

export function blocksToText(blocks: ArticleBlock[]): string {
  const parts: string[] = [];
  let faqBuffer: string[] = [];

  function flushFaq() {
    if (faqBuffer.length) {
      parts.push(faqBuffer.join("\n\n"));
      faqBuffer = [];
    }
  }

  for (const block of blocks) {
    if (block.type === "faq") {
      for (const item of block.items) {
        faqBuffer.push(`Q: ${item.q}\nA: ${item.a}`);
      }
      continue;
    }
    flushFaq();

    switch (block.type) {
      case "p":
        parts.push(block.text);
        break;
      case "h2":
        parts.push(`## ${block.text}`);
        break;
      case "h3":
        parts.push(`### ${block.text}`);
        break;
      case "list":
        parts.push(block.items.map((item) => `- ${item}`).join("\n"));
        break;
      case "callout":
        parts.push(
          block.title
            ? `> **${block.title}**\n> ${block.text}`
            : `> ${block.text}`
        );
        break;
      case "imagePlaceholder":
        parts.push(`[Изображение: ${block.caption}]`);
        break;
    }
  }
  flushFaq();

  return parts.join("\n\n");
}

export function textToBlocks(text: string): ArticleBlock[] {
  const groups = text
    .split(/\n\s*\n/)
    .map((g) => g.trim())
    .filter(Boolean);

  type FaqItem = { type: "__faqItem"; q: string; a: string };
  const raw: (ArticleBlock | FaqItem)[] = [];

  for (const group of groups) {
    const lines = group
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
    if (lines.length === 0) continue;

    // Список: все строки группы начинаются с "- "
    if (lines.every((l) => l.startsWith("- "))) {
      raw.push({ type: "list", items: lines.map((l) => l.slice(2).trim()) });
      continue;
    }

    // FAQ-пара: "Q: ..." затем "A: ..."
    if (lines[0]?.startsWith("Q: ") && lines.find((l) => l.startsWith("A: "))) {
      const q = lines[0].slice(3).trim();
      const aIndex = lines.findIndex((l) => l.startsWith("A: "));
      const a = lines
        .slice(aIndex)
        .join(" ")
        .replace(/^A:\s*/, "")
        .trim();
      raw.push({ type: "__faqItem", q, a });
      continue;
    }

    // Цитата/callout: все строки начинаются с "> "
    if (lines.every((l) => l.startsWith("> "))) {
      let title: string | undefined;
      let contentLines = lines.map((l) => l.slice(2));
      const first = contentLines[0];
      if (first && first.startsWith("**") && first.endsWith("**") && first.length > 4) {
        title = first.slice(2, -2);
        contentLines = contentLines.slice(1);
      }
      raw.push({ type: "callout", title, text: contentLines.join(" ") });
      continue;
    }

    // Иначе — построчно: заголовки, плейсхолдеры изображений или параграфы
    for (const line of lines) {
      if (line.startsWith("## ")) {
        raw.push({ type: "h2", text: line.slice(3).trim() });
      } else if (line.startsWith("### ")) {
        raw.push({ type: "h3", text: line.slice(4).trim() });
      } else {
        const imageMatch = line.match(/^\[Изображение:\s*(.+)\]$/i);
        if (imageMatch) {
          raw.push({ type: "imagePlaceholder", caption: imageMatch[1].trim() });
        } else {
          raw.push({ type: "p", text: line });
        }
      }
    }
  }

  // Объединяем соседние FAQ-пары в один блок faq
  const blocks: ArticleBlock[] = [];
  let faqBuf: { q: string; a: string }[] = [];
  function flushFaq() {
    if (faqBuf.length) {
      blocks.push({ type: "faq", items: faqBuf });
      faqBuf = [];
    }
  }
  for (const r of raw) {
    if (r.type === "__faqItem") {
      faqBuf.push({ q: r.q, a: r.a });
    } else {
      flushFaq();
      blocks.push(r);
    }
  }
  flushFaq();

  return blocks;
}
