import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { ArticleCard } from "@/components/ArticleCard";
import { Pagination } from "@/components/Pagination";
import { getArticlesPage } from "@/lib/articles-db";

export const metadata: Metadata = {
  title: "Статьи о медикаментозном прерывании беременности",
  description:
    "Статьи о мифепристоне и мизопростоле: механизм действия, подготовка, противопоказания, побочные эффекты, восстановление и ответы на частые вопросы.",
  alternates: { canonical: "/stati" },
};

// Статьи редактируются из админ-панели, поэтому страница рендерится на
// каждый запрос и сразу отражает изменения.
export const dynamic = "force-dynamic";

interface StatiPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function StatiPage({ searchParams }: StatiPageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const { items, currentPage, totalPages } = await getArticlesPage(page);

  return (
    <Section animate={false} className="pt-14 sm:pt-20">
      <SectionHeading
        as="h1"
        eyebrow="Статьи"
        title="Статьи о медикаментозном прерывании беременности"
        description="Общая информация о мифепристоне и мизопростоле: механизм действия, подготовка, побочные эффекты и восстановление."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </Section>
  );
}
