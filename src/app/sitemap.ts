import type { MetadataRoute } from "next";
import { getPayloadClient } from "@/lib/payload";
import { siteConfig } from "@/lib/config";

/**
 * Автоматический sitemap.xml (встроенный API Next.js).
 *
 * Статьи берутся напрямую из коллекции Payload "articles" (а не из
 * устаревшей Prisma-таблицы Article, которая больше не используется
 * страницами /stati/<slug> — см. src/app/(site)/stati/[slug]/page.tsx).
 * Для дат используем publishedAt, при отсутствии — updatedAt.
 *
 * force-dynamic: на этапе `next build` БД недоступна (контейнер builder не
 * подключён к сети с Postgres), поэтому список статей читается в runtime
 * при каждом запросе /sitemap.xml, а не предрендеривается статически.
 */
export const dynamic = "force-dynamic";

async function getArticleRoutes() {
  try {
    const payload = await getPayloadClient();
    const { docs: articles } = await payload.find({
      collection: "articles",
      where: { isPublished: { equals: true } },
      limit: 0,
      depth: 0,
      select: { slug: true, publishedAt: true, updatedAt: true },
    });

    return (
      articles as unknown as {
        slug: string;
        publishedAt?: string | null;
        updatedAt?: string | null;
      }[]
    ).map((article) => ({
      url: `${siteConfig.url}/stati/${article.slug}`,
      lastModified: new Date(article.publishedAt || article.updatedAt || Date.now()),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.warn("[sitemap] Не удалось получить список статей", error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    { path: "/", priority: 1 },
    { path: "/stati", priority: 0.7 },
    { path: "/o-nas", priority: 0.7 },
    { path: "/kontakty", priority: 0.7 },
    { path: "/privacy-policy", priority: 0.3 },
  ].map(({ path, priority }) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority,
  }));

  const articleRoutes = await getArticleRoutes();

  return [...staticRoutes, ...articleRoutes];
}
