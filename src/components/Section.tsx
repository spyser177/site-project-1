import { Container } from "./Container";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
  animate?: boolean;
  muted?: boolean;
}

/** Секция страницы с единым вертикальным отступом; animate подключает GSAP scroll-анимацию (desktop-only) */
export function Section({
  children,
  className = "",
  containerClassName = "",
  id,
  animate = true,
  muted = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`py-14 sm:py-20 ${muted ? "bg-[var(--color-surface-muted)]" : ""} ${className}`}
    >
      <Container className={`${animate ? "animate-section" : ""} ${containerClassName}`}>
        {children}
      </Container>
    </section>
  );
}
