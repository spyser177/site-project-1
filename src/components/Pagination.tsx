import Link from "next/link";
import { Icon } from "./Icon";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string;
}

/** Пагинация списка статей */
export function Pagination({
  currentPage,
  totalPages,
  basePath = "/stati",
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      className="flex justify-center items-center gap-2 mt-10"
      aria-label="Пагинация статей"
    >
      {currentPage > 1 && (
        <Link
          href={currentPage - 1 === 1 ? basePath : `${basePath}?page=${currentPage - 1}`}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-[var(--color-border)] hover:bg-[var(--color-surface-muted)]"
          aria-label="Предыдущая страница"
        >
          <Icon name="arrowRight" className="w-4 h-4 rotate-180" />
        </Link>
      )}
      {pages.map((page) => (
        <Link
          key={page}
          href={page === 1 ? basePath : `${basePath}?page=${page}`}
          className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition-colors ${
            page === currentPage
              ? "bg-[var(--color-primary)] text-white"
              : "border border-[var(--color-border)] hover:bg-[var(--color-surface-muted)]"
          }`}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </Link>
      ))}
      {currentPage < totalPages && (
        <Link
          href={`${basePath}?page=${currentPage + 1}`}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-[var(--color-border)] hover:bg-[var(--color-surface-muted)]"
          aria-label="Следующая страница"
        >
          <Icon name="arrowRight" className="w-4 h-4" />
        </Link>
      )}
    </nav>
  );
}
