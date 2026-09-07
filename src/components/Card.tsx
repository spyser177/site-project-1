interface CardProps {
  children: React.ReactNode;
  className?: string;
}

/** Карточка с тенью в стиле дизайн-системы */
export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] shadow-sm p-6 ${className}`}
    >
      {children}
    </div>
  );
}
