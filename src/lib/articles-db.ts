import { prisma } from "./prisma";
import { textToBlocks } from "./content-blocks";
import type { ArticleData, IconName } from "./articles";

const ICONS: readonly IconName[] = [
  "molecule",
  "calendar",
  "shield",
  "pulse",
  "check",
  "list",
  "chart",
  "chat",
  "clipboard",
  "help",
  "clock",
  "pill",
  "flask",
  "heart",
];

function toIconName(icon: string): IconName {
  return (ICONS as readonly string[]).includes(icon) ? (icon as IconName) : "molecule";
}

interface ArticleRow {
  slug: string;
  title: string;
  metaTitle: string | null;
  metaDescription: string | null;
  description: string;
  content: string;
  icon: string;
  keywords: string[];
  publishedAt: Date | null;
  createdAt: Date;
}

function mapRow(row: ArticleRow): ArticleData {
  return {
    slug: row.slug,
    title: row.title,
    metaTitle: row.metaTitle || row.title,
    metaDescription: row.metaDescription || row.description,
    description: row.description,
    date: (row.publishedAt ?? row.createdAt).toISOString(),
    icon: toIconName(row.icon),
    keywords: row.keywords,
    blocks: textToBlocks(row.content),
  };
}

/**
 * Статьи на сайте читаются из БД (таблица Article), а не из захардкоженного
 * массива — это позволяет редактировать их через админ-панель. При
 * недоступности БД возвращаем пустой список/undefined, чтобы страницы не
 * падали (аналогично src/lib/settings.ts).
 */
export async function getAllArticles(): Promise<ArticleData[]> {
  try {
    const rows = await prisma.article.findMany({
      where: { published: true },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    });
    return rows.map(mapRow);
  } catch (error) {
    console.warn("[articles-db] Не удалось получить список статей", error);
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<ArticleData | undefined> {
  try {
    const row = await prisma.article.findFirst({ where: { slug, published: true } });
    return row ? mapRow(row) : undefined;
  } catch (error) {
    console.warn(`[articles-db] Не удалось получить статью "${slug}"`, error);
    return undefined;
  }
}

export async function getAllSlugs(): Promise<string[]> {
  try {
    const rows = await prisma.article.findMany({
      where: { published: true },
      select: { slug: true },
    });
    return rows.map((r) => r.slug);
  } catch (error) {
    console.warn("[articles-db] Не удалось получить список слагов", error);
    return [];
  }
}

const ARTICLES_PER_PAGE = 6;

export async function getArticlesPage(page: number) {
  const all = await getAllArticles();
  const totalPages = Math.max(1, Math.ceil(all.length / ARTICLES_PER_PAGE));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * ARTICLES_PER_PAGE;
  const items = all.slice(start, start + ARTICLES_PER_PAGE);
  return { items, currentPage: safePage, totalPages };
}

export { formatArticleDate } from "./articles";
