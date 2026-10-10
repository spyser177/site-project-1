import Link from "next/link";
import { Card } from "./Card";
import { Icon } from "./Icon";
import { getMediaAlt, getMediaUrl } from "@/lib/media";

export interface ArticleCardData {
  slug: string;
  title: string;
  excerpt?: string | null;
  publishedAt?: string | null;
  createdAt?: string | null;
  image?: { url?: string | null; alt?: string | null } | number | string | null;
  imageAlt?: string | null;
}

/** Форматирует дату публикации статьи в читаемый русский формат. */
export function formatArticleDate(iso: string): string {
  return new Date(iso).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Карточка статьи в списке /stati (данные приходят из коллекции Payload Articles) */
export function ArticleCard({ article }: { article: ArticleCardData }) {
  const date = article.publishedAt || article.createdAt;
  const imageUrl = getMediaUrl(article.image ?? null);
  const imageAlt = article.imageAlt || getMediaAlt(article.image ?? null, article.title);

  return (
    <Link href={`/stati/${article.slug}`} className="block h-full group">
      <Card className="h-full flex flex-col transition-transform duration-200 group-hover:-translate-y-1">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={imageAlt}
            className="w-full h-32 object-cover rounded-xl mb-4"
          />
        ) : (
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
            style={{ backgroundColor: "var(--color-surface-muted)" }}
          >
            <Icon name="molecule" className="w-6 h-6 text-[var(--color-primary)]" />
          </div>
        )}
        <h2 className="text-lg font-semibold text-[var(--color-primary)] mb-2 line-clamp-2">
          {article.title}
        </h2>
        {article.excerpt && (
          <p className="text-sm text-[var(--color-muted)] line-clamp-3 flex-grow">
            {article.excerpt}
          </p>
        )}
        <div className="mt-4 flex items-center justify-between text-xs text-[var(--color-muted)]">
          {date ? <time dateTime={date}>{formatArticleDate(date)}</time> : <span />}
          <span className="inline-flex items-center gap-1 text-[var(--color-accent-dark)] font-medium">
            Читать <Icon name="arrowRight" className="w-3.5 h-3.5" />
          </span>
        </div>
      </Card>
    </Link>
  );
}
