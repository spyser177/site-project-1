import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { SerializedEditorState } from "lexical";
import { Section } from "@/components/Section";
import { RichText } from "@/components/RichText";
import { Icon } from "@/components/Icon";
import { Button } from "@/components/Button";
import { formatArticleDate, type ArticleCardData } from "@/components/ArticleCard";
import { getMediaAlt, getMediaUrl, getMediaSrcSet, RESPONSIVE_SIZES_ATTR } from "@/lib/media";
import { getPayloadClient } from "@/lib/payload";
import { siteConfig } from "@/lib/config";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

interface ArticleDoc extends ArticleCardData {
  metaTitle?: string | null;
  metaDescription?: string | null;
  content?: SerializedEditorState | null;
  keywords?: string | null;
  imageAlt?: string | null;
}

// Статьи редактируются из админ-панели (Payload), поэтому страница
// рендерится на каждый запрос и сразу отражает изменения.
export const dynamic = "force-dynamic";

async function findArticle(slug: string): Promise<ArticleDoc | null> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "articles",
    where: { slug: { equals: slug }, isPublished: { equals: true } },
    limit: 1,
    depth: 1,
  });
  return (result.docs[0] as unknown as ArticleDoc) ?? null;
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await findArticle(slug);
  if (!article) return {};

  const title = article.metaTitle || article.title;
  const description = article.metaDescription || article.excerpt || undefined;

  return {
    title,
    description,
    alternates: { canonical: `/stati/${article.slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: article.publishedAt || article.createdAt || undefined,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await findArticle(slug);
  if (!article) notFound();

  const payload = await getPayloadClient();
  const relatedResult = await payload.find({
    collection: "articles",
    where: {
      isPublished: { equals: true },
      slug: { not_equals: article.slug },
    },
    sort: "-publishedAt",
    limit: 3,
  });
  const related = relatedResult.docs as unknown as ArticleCardData[];

  const date = article.publishedAt || article.createdAt;
  const imageUrl = getMediaUrl(article.image ?? null);
  const imageAlt = article.imageAlt || getMediaAlt(article.image ?? null, article.title);
  // Адаптивные размеры изображения под заголовком: mobile/tablet/desktop из
  // Media.imageSizes — браузер сам выберет подходящий вариант по ширине
  // вьюпорта (srcset + sizes), без необходимости грузить десктопную версию
  // на телефоне.
  const imageSrcSet = getMediaSrcSet(article.image ?? null);

  const jsonLd: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.metaDescription || article.excerpt,
      datePublished: date,
      dateModified: date,
      author: { "@type": "Organization", name: siteConfig.legalName },
      publisher: { "@type": "Organization", name: siteConfig.legalName },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: `${siteConfig.url}/` },
        { "@type": "ListItem", position: 2, name: "Статьи", item: `${siteConfig.url}/stati` },
        { "@type": "ListItem", position: 3, name: article.title },
      ],
    },
  ];

  return (
    <>
      {jsonLd.map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}

      <Section animate={false} className="pt-10 sm:pt-16 pb-8">
        <nav className="text-xs text-[var(--color-muted)] mb-6 flex items-center gap-1.5">
          <Link href="/" className="hover:text-[var(--color-primary)]">Главная</Link>
          <span>/</span>
          <Link href="/stati" className="hover:text-[var(--color-primary)]">Статьи</Link>
        </nav>
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "var(--color-surface-muted)" }}
            >
              <Icon name="molecule" className="w-5 h-5 text-[var(--color-primary)]" />
            </div>
            {date && (
              <time dateTime={date} className="text-sm text-[var(--color-muted)]">
                {formatArticleDate(date)}
              </time>
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold text-[var(--color-primary)] leading-tight">
            {article.title}
          </h1>
          {article.excerpt && (
            <p className="mt-4 text-lg text-[var(--color-muted)] leading-relaxed">
              {article.excerpt}
            </p>
          )}
          {imageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              srcSet={imageSrcSet}
              sizes={imageSrcSet ? RESPONSIVE_SIZES_ATTR : undefined}
              alt={imageAlt}
              loading="eager"
              className="mt-6 w-full rounded-2xl object-cover max-h-96"
            />
          )}
        </div>
      </Section>

      <Section animate={false} className="pt-0">
        <div className="max-w-3xl">
          <RichText data={article.content} />
        </div>
      </Section>

      <Section muted animate={false}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-[var(--color-primary)]">
            Остались вопросы?
          </h2>
          <p className="mt-3 text-[var(--color-muted)]">
            Свяжитесь с нами — поможем разобраться в общих вопросах о медикаментозном
            прерывании беременности.
          </p>
          <div className="mt-6">
            <Button href="/kontakty" variant="accent">Связаться с нами</Button>
          </div>
        </div>
      </Section>

      {related.length > 0 && (
        <Section animate={false}>
          <h2 className="text-2xl font-semibold text-[var(--color-primary)] mb-6">
            Похожие статьи
          </h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {related.map((a) => (
              <Link
                key={a.slug}
                href={`/stati/${a.slug}`}
                className="block rounded-2xl border border-[var(--color-border)] p-5 hover:border-[var(--color-primary)] transition-colors"
              >
                <Icon name="molecule" className="w-5 h-5 text-[var(--color-primary)] mb-3" />
                <h3 className="font-semibold text-sm text-[var(--color-primary)] line-clamp-2">
                  {a.title}
                </h3>
              </Link>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
