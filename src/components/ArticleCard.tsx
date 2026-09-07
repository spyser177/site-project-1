import Link from "next/link";
import { Card } from "./Card";
import { Icon } from "./Icon";
import { formatArticleDate, type ArticleData } from "@/lib/articles";

/** Карточка статьи в списке /stati */
export function ArticleCard({ article }: { article: ArticleData }) {
  return (
    <Link href={`/stati/${article.slug}`} className="block h-full group">
      <Card className="h-full flex flex-col transition-transform duration-200 group-hover:-translate-y-1">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
          style={{ backgroundColor: "var(--color-surface-muted)" }}
        >
          <Icon name={article.icon} className="w-6 h-6 text-[var(--color-primary)]" />
        </div>
        <h2 className="text-lg font-semibold text-[var(--color-primary)] mb-2 line-clamp-2">
          {article.title}
        </h2>
        <p className="text-sm text-[var(--color-muted)] line-clamp-3 flex-grow">
          {article.description}
        </p>
        <div className="mt-4 flex items-center justify-between text-xs text-[var(--color-muted)]">
          <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
          <span className="inline-flex items-center gap-1 text-[var(--color-accent-dark)] font-medium">
            Читать <Icon name="arrowRight" className="w-3.5 h-3.5" />
          </span>
        </div>
      </Card>
    </Link>
  );
}
