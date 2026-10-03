import { prisma } from "./prisma";

/** Фиксированный набор редактируемых страниц сайта */
export const EDITABLE_PAGE_SLUGS = ["home", "o-nas", "kontakty", "privacy-policy"] as const;

export interface PageContent {
  title: string | null;
  description: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  content: string;
}

export interface PageDefaults {
  title?: string;
  description?: string;
  metaTitle?: string;
  metaDescription?: string;
  content?: string;
}

/**
 * Редактируемый контент статичных страниц (О нас, Контакты, Политика,
 * доп. блок на Главной), хранится в таблице Page. При недоступности БД
 * или отсутствии записи возвращаются значения по умолчанию — публичные
 * страницы не должны падать из-за отсутствия соединения с базой.
 */
export async function getPage(slug: string, defaults: PageDefaults = {}): Promise<PageContent> {
  try {
    const row = await prisma.page.findUnique({ where: { slug } });
    return {
      title: row?.title ?? defaults.title ?? null,
      description: row?.description ?? defaults.description ?? null,
      metaTitle: row?.metaTitle ?? defaults.metaTitle ?? null,
      metaDescription: row?.metaDescription ?? defaults.metaDescription ?? null,
      content: row?.content ?? defaults.content ?? "",
    };
  } catch (error) {
    console.warn(`[pages] Не удалось получить страницу "${slug}", используются значения по умолчанию`, error);
    return {
      title: defaults.title ?? null,
      description: defaults.description ?? null,
      metaTitle: defaults.metaTitle ?? null,
      metaDescription: defaults.metaDescription ?? null,
      content: defaults.content ?? "",
    };
  }
}

export async function setPage(
  slug: string,
  data: { title?: string; description?: string; metaTitle?: string; metaDescription?: string; content?: string }
): Promise<void> {
  await prisma.page.upsert({
    where: { slug },
    update: data,
    create: { slug, ...data },
  });
}

export async function getAllPages() {
  try {
    return await prisma.page.findMany({ orderBy: { slug: "asc" } });
  } catch (error) {
    console.warn("[pages] Не удалось получить список страниц", error);
    return [];
  }
}
