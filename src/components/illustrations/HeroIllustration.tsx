/**
 * Абстрактная схематичная иллюстрация для Hero-секции.
 * Без фотографий и людей — только геометрические формы на медицинскую тему
 * (капсулы, молекулярные связи), в цветах дизайн-системы.
 */
export function HeroIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 420"
      className={className}
      role="img"
      aria-label="Схематичная иллюстрация: капсулы препаратов и молекулярные связи"
    >
      <circle cx="240" cy="210" r="190" style={{ fill: "var(--color-surface-muted)" }} />

      {/* Капсула 1 */}
      <g transform="rotate(-25 170 150)">
        <rect
          x="110"
          y="120"
          width="140"
          height="60"
          rx="30"
          style={{ fill: "var(--color-surface)" }}
          stroke="var(--color-primary)"
          strokeWidth="3"
        />
        <path
          d="M180 120 v60"
          stroke="var(--color-primary)"
          strokeWidth="3"
        />
        <rect x="110" y="120" width="70" height="60" rx="30" style={{ fill: "var(--color-primary-light)", opacity: 0.35 }} />
      </g>

      {/* Капсула 2 */}
      <g transform="rotate(18 320 260)">
        <rect
          x="250"
          y="230"
          width="150"
          height="62"
          rx="31"
          style={{ fill: "var(--color-surface)" }}
          stroke="var(--color-accent)"
          strokeWidth="3"
        />
        <path d="M325 230 v62" stroke="var(--color-accent)" strokeWidth="3" />
        <rect x="325" y="230" width="75" height="62" rx="31" style={{ fill: "var(--color-accent-light)", opacity: 0.4 }} />
      </g>

      {/* Молекулярные связи */}
      <g stroke="var(--color-secondary-dark)" strokeWidth="2.5">
        <line x1="120" y1="300" x2="175" y2="330" />
        <line x1="175" y1="330" x2="150" y2="360" />
        <line x1="175" y1="330" x2="225" y2="345" />
      </g>
      <circle cx="120" cy="300" r="9" style={{ fill: "var(--color-secondary)" }} />
      <circle cx="175" cy="330" r="12" style={{ fill: "var(--color-secondary-dark)" }} />
      <circle cx="150" cy="360" r="7" style={{ fill: "var(--color-secondary)" }} />
      <circle cx="225" cy="345" r="7" style={{ fill: "var(--color-secondary)" }} />

      {/* Пунктирная орбита */}
      <circle
        cx="240"
        cy="210"
        r="150"
        fill="none"
        stroke="var(--color-primary-light)"
        strokeWidth="1.5"
        strokeDasharray="4 8"
        opacity="0.6"
      />
    </svg>
  );
}
