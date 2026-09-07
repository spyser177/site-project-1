interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
}

/** Заголовок секции: эйброу + H2/H1 + подпись, единый стиль для всех страниц */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as = "h2",
}: SectionHeadingProps) {
  const Tag = as;
  const alignCls = align === "center" ? "text-center mx-auto" : "";

  return (
    <div className={`max-w-2xl ${alignCls} mb-10`}>
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-wide text-[var(--color-accent-dark)] mb-3">
          {eyebrow}
        </p>
      )}
      <Tag className="text-3xl sm:text-4xl font-semibold text-[var(--color-primary)] leading-tight">
        {title}
      </Tag>
      {description && (
        <p className="mt-4 text-base text-[var(--color-muted)] leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
