import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Section } from "@/components/Section";
import { ArticleContent } from "@/components/ArticleContent";
import { Icon } from "@/components/Icon";
import { Button } from "@/components/Button";
import {
  ARTICLES,
  getArticleBySlug,
  getAllSlugs,
  formatArticleDate,
} from "@/lib/articles";
import { siteConfig } from "@/lib/config";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.metaTitle,
    description: article.metaDescription,
    alternates: { canonical: `/stati/${article.slug}` },
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      type: "article",
      publishedTime: article.date,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const faqBlock = article.blocks.find((b) => b.type === "faq");
  const jsonLd: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.metaDescription,
      datePublished: article.date,
      dateModified: article.date,
      author: { "@type": "Organization", name: siteConfig.legalName },
      publisher: { "@type": "Organization", name: siteConfig.legalName },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: `${siteConfig.url}/glavnaya` },
        { "@type": "ListItem", position: 2, name: "Статьи", item: `${siteConfig.url}/stati` },
        { "@type": "ListItem", position: 3, name: article.title },
      ],
    },
  ];

  if (faqBlock && faqBlock.type === "faq") {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqBlock.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    });
  }

  const related = ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3);

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
          <Link href="/glavnaya" className="hover:text-[var(--color-primary)]">Главная</Link>
          <span>/</span>
          <Link href="/stati" className="hover:text-[var(--color-primary)]">Статьи</Link>
        </nav>
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "var(--color-surface-muted)" }}
            >
              <Icon name={article.icon} className="w-5 h-5 text-[var(--color-primary)]" />
            </div>
            <time dateTime={article.date} className="text-sm text-[var(--color-muted)]">
              {formatArticleDate(article.date)}
            </time>
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold text-[var(--color-primary)] leading-tight">
            {article.title}
          </h1>
          <p className="mt-4 text-lg text-[var(--color-muted)] leading-relaxed">
            {article.description}
          </p>
        </div>
      </Section>

      <Section animate={false} className="pt-0">
        <div className="max-w-3xl">
          <ArticleContent blocks={article.blocks} />
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
              <Icon name={a.icon} className="w-5 h-5 text-[var(--color-primary)] mb-3" />
              <h3 className="font-semibold text-sm text-[var(--color-primary)] line-clamp-2">
                {a.title}
              </h3>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
