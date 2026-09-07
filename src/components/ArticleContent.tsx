import { Icon } from "./Icon";
import type { ArticleBlock } from "@/lib/articles";

/** Рендер типизированных блоков статьи в семантическую разметку */
export function ArticleContent({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "p":
            return (
              <p key={i} className="text-[var(--color-text)] leading-relaxed">
                {block.text}
              </p>
            );
          case "h2":
            return (
              <h2
                key={i}
                className="text-2xl font-semibold text-[var(--color-primary)] pt-4"
              >
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={i}
                className="text-xl font-semibold text-[var(--color-primary)] pt-2"
              >
                {block.text}
              </h3>
            );
          case "list":
            return (
              <ul key={i} className="space-y-2">
                {block.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2.5">
                    <Icon
                      name="check"
                      className="w-4 h-4 mt-1 shrink-0 text-[var(--color-secondary-dark)]"
                    />
                    <span className="text-[var(--color-text)] leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            );
          case "callout":
            return (
              <div
                key={i}
                className="rounded-2xl border-l-4 p-5"
                style={{
                  backgroundColor: "var(--color-surface-muted)",
                  borderColor: "var(--color-accent)",
                }}
              >
                {block.title && (
                  <p className="font-semibold text-[var(--color-primary)] mb-1.5">
                    {block.title}
                  </p>
                )}
                <p className="text-sm text-[var(--color-text)] leading-relaxed">
                  {block.text}
                </p>
              </div>
            );
          case "imagePlaceholder":
            return (
              <div
                key={i}
                className="rounded-2xl border border-dashed border-[var(--color-border)] p-10 flex flex-col items-center justify-center text-center gap-2"
              >
                <Icon name="pill" className="w-8 h-8 text-[var(--color-muted)]" />
                <p className="text-xs text-[var(--color-muted)]">
                  Изображение будет добавлено позже: {block.caption}
                </p>
              </div>
            );
          case "faq":
            return (
              <div key={i} className="space-y-4">
                {block.items.map((item, j) => (
                  <div
                    key={j}
                    className="rounded-2xl border border-[var(--color-border)] p-5"
                  >
                    <h3 className="font-semibold text-[var(--color-primary)] mb-2 flex items-start gap-2">
                      <Icon
                        name="help"
                        className="w-5 h-5 shrink-0 mt-0.5 text-[var(--color-accent-dark)]"
                      />
                      {item.q}
                    </h3>
                    <p className="text-sm text-[var(--color-muted)] leading-relaxed pl-7">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
