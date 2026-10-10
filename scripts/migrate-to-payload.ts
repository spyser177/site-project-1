/**
 * Миграция данных из Prisma-таблиц (Article, Page, SiteSetting) в коллекции/глобалы Payload CMS
 * (Articles, Pages, SiteSettings) через Local API.
 *
 * Запуск (внутри контейнера app):
 *   docker compose exec app npx tsx scripts/migrate-to-payload.ts
 *
 * Скрипт идемпотентен: если документ с таким slug уже существует в Payload — он будет
 * обновлён (upsert), а не задублирован. Можно запускать повторно.
 */

import { PrismaClient } from "@prisma/client";
import { getPayload } from "payload";

import configPromise from "../src/payload.config";

const prisma = new PrismaClient();

// ---------------------------------------------------------------------------
// Конвертация простого текста статей/страниц (см. src/lib/content-blocks.ts)
// в Lexical JSON, который ожидает richText-поле Payload.
//
// Поддерживаемые конструкции (как и в content-blocks.ts):
//   "## текст"   -> heading h2
//   "### текст"  -> heading h3
//   "- пункт"    -> элемент списка (несколько подряд формируют один list)
//   "> текст"    -> quote
//   "Q: .../A: ..." -> оставляем как обычные параграфы (без спец. блока FAQ в Lexical)
//   всё остальное -> обычный параграф (p)
// ---------------------------------------------------------------------------

type LexicalNode = Record<string, unknown>;

function textNode(text: string): LexicalNode {
  return {
    type: "text",
    detail: 0,
    format: 0,
    mode: "normal",
    style: "",
    text,
    version: 1,
  };
}

function paragraphNode(text: string): LexicalNode {
  return {
    type: "paragraph",
    direction: "ltr",
    format: "",
    indent: 0,
    version: 1,
    textFormat: 0,
    children: text ? [textNode(text)] : [],
  };
}

function headingNode(tag: "h2" | "h3", text: string): LexicalNode {
  return {
    type: "heading",
    tag,
    direction: "ltr",
    format: "",
    indent: 0,
    version: 1,
    children: [textNode(text)],
  };
}

function quoteNode(text: string): LexicalNode {
  return {
    type: "quote",
    direction: "ltr",
    format: "",
    indent: 0,
    version: 1,
    children: [textNode(text)],
  };
}

function listNode(items: string[]): LexicalNode {
  return {
    type: "list",
    tag: "ul",
    listType: "bullet",
    start: 1,
    direction: "ltr",
    format: "",
    indent: 0,
    version: 1,
    children: items.map((item, index) => ({
      type: "listitem",
      value: index + 1,
      direction: "ltr",
      format: "",
      indent: 0,
      version: 1,
      children: [textNode(item)],
    })),
  };
}

/** Преобразует плоский текст (см. формат в content-blocks.ts) в корневой Lexical-документ. */
function textToLexical(raw: string | null | undefined): LexicalNode {
  const lines = (raw ?? "").split("\n").map((line) => line.trim());
  const children: LexicalNode[] = [];
  let listBuffer: string[] = [];

  function flushList() {
    if (listBuffer.length) {
      children.push(listNode(listBuffer));
      listBuffer = [];
    }
  }

  for (const line of lines) {
    if (!line) {
      flushList();
      continue;
    }

    if (line.startsWith("### ")) {
      flushList();
      children.push(headingNode("h3", line.slice(4)));
    } else if (line.startsWith("## ")) {
      flushList();
      children.push(headingNode("h2", line.slice(3)));
    } else if (line.startsWith("- ")) {
      listBuffer.push(line.slice(2));
    } else if (line.startsWith("> ")) {
      flushList();
      children.push(quoteNode(line.slice(2)));
    } else {
      flushList();
      children.push(paragraphNode(line));
    }
  }
  flushList();

  if (children.length === 0) {
    children.push(paragraphNode(""));
  }

  return {
    root: {
      type: "root",
      direction: "ltr",
      format: "",
      indent: 0,
      version: 1,
      children,
    },
  };
}

// ---------------------------------------------------------------------------
// Миграция статей
// ---------------------------------------------------------------------------

async function migrateArticles(payload: Awaited<ReturnType<typeof getPayload>>) {
  const articles = await prisma.article.findMany({ orderBy: { createdAt: "asc" } });
  console.log(`\n→ Найдено статей в Prisma: ${articles.length}`);

  let created = 0;
  let updated = 0;

  for (const article of articles) {
    const data = {
      title: article.title,
      slug: article.slug,
      excerpt: article.description || undefined,
      content: textToLexical(article.content),
      metaTitle: article.metaTitle || undefined,
      metaDescription: article.metaDescription || undefined,
      isPublished: article.published,
      publishedAt: article.publishedAt ? article.publishedAt.toISOString() : undefined,
      imageAlt: undefined,
    };

    const existing = await payload.find({
      collection: "articles",
      where: { slug: { equals: article.slug } },
      limit: 1,
    });

    if (existing.docs.length > 0) {
      await payload.update({
        collection: "articles",
        id: existing.docs[0].id,
        data,
      });
      updated += 1;
      console.log(`  ↻ Обновлена статья: ${article.slug}`);
    } else {
      await payload.create({
        collection: "articles",
        data,
      });
      created += 1;
      console.log(`  ✔ Создана статья: ${article.slug}`);
    }
  }

  console.log(`→ Статьи: создано ${created}, обновлено ${updated}`);
}

// ---------------------------------------------------------------------------
// Миграция страниц
// ---------------------------------------------------------------------------

async function migratePages(payload: Awaited<ReturnType<typeof getPayload>>) {
  const pages = await prisma.page.findMany();
  console.log(`\n→ Найдено страниц в Prisma: ${pages.length}`);

  let created = 0;
  let updated = 0;

  for (const page of pages) {
    const data = {
      title: page.title || page.slug,
      slug: page.slug,
      subtitle: page.description || undefined,
      content: textToLexical(page.content),
      metaTitle: page.metaTitle || undefined,
      metaDescription: page.metaDescription || undefined,
    };

    const existing = await payload.find({
      collection: "pages",
      where: { slug: { equals: page.slug } },
      limit: 1,
    });

    if (existing.docs.length > 0) {
      await payload.update({
        collection: "pages",
        id: existing.docs[0].id,
        data,
      });
      updated += 1;
      console.log(`  ↻ Обновлена страница: ${page.slug}`);
    } else {
      await payload.create({
        collection: "pages",
        data,
      });
      created += 1;
      console.log(`  ✔ Создана страница: ${page.slug}`);
    }
  }

  console.log(`→ Страницы: создано ${created}, обновлено ${updated}`);
}

// ---------------------------------------------------------------------------
// Миграция настроек сайта (SiteSetting key/value + ENV-реквизиты -> глобалы)
// ---------------------------------------------------------------------------

/**
 * Снимает обёрточные двойные кавычки со значения ENV-переменной.
 * Нужно, т.к. `docker run --env-file` (в отличие от docker compose) не парсит
 * кавычки из .env и передаёт их в process.env как есть.
 */
function unquoteEnv(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (trimmed.length >= 2 && trimmed.startsWith('"') && trimmed.endsWith('"')) {
    return trimmed.slice(1, -1);
  }
  return trimmed || undefined;
}

async function migrateSiteSettings(payload: Awaited<ReturnType<typeof getPayload>>) {
  const settings = await prisma.siteSetting.findMany();
  console.log(`\n→ Найдено записей SiteSetting в Prisma: ${settings.length}`);

  const byKey = new Map(settings.map((s) => [s.key, s.value]));

  // --- Global: home-page (hero_title / hero_subtitle из таблицы SiteSetting) ---
  const heroTitle = byKey.get("hero_title");
  const heroSubtitle = byKey.get("hero_subtitle");

  if (heroTitle || heroSubtitle) {
    const current = await payload.findGlobal({ slug: "home-page" });
    await payload.updateGlobal({
      slug: "home-page",
      data: {
        ...current,
        hero_title: heroTitle ?? current.hero_title,
        hero_subtitle: heroSubtitle ?? current.hero_subtitle,
      },
    });
    console.log("  ✔ Обновлён global home-page (hero_title, hero_subtitle)");
  }

  // --- Global: site-settings (контакты и реквизиты) ---
  // В Prisma таблице SiteSetting нет записей для телефона/почты/реквизитов —
  // эти значения на сайте сейчас берутся из src/lib/config.ts (ENV-переменные
  // NEXT_PUBLIC_SITE_*). Переносим их в Payload, чтобы они стали редактируемыми
  // через админку, как и требуется.
  const contactData = {
    phone: unquoteEnv(process.env.NEXT_PUBLIC_SITE_PHONE),
    email: unquoteEnv(process.env.NEXT_PUBLIC_SITE_EMAIL),
    telegram: unquoteEnv(process.env.NEXT_PUBLIC_SITE_TELEGRAM),
    whatsapp: unquoteEnv(process.env.NEXT_PUBLIC_SITE_WHATSAPP),
    address: unquoteEnv(process.env.NEXT_PUBLIC_SITE_ADDRESS),
    legal_name: unquoteEnv(process.env.NEXT_PUBLIC_SITE_LEGAL_NAME),
    inn: unquoteEnv(process.env.NEXT_PUBLIC_SITE_INN),
    ogrn: unquoteEnv(process.env.NEXT_PUBLIC_SITE_OGRN),
  };

  await payload.updateGlobal({
    slug: "site-settings",
    data: contactData,
  });
  console.log("  ✔ Обновлён global site-settings (телефон, email, реквизиты из ENV)");

  // --- Global: footer-settings (дублируем контакты/реквизиты для футера) ---
  await payload.updateGlobal({
    slug: "footer-settings",
    data: {
      phone: contactData.phone,
      telegram_url: contactData.telegram,
      whatsapp_url: contactData.whatsapp,
      email: contactData.email,
      legal_name: contactData.legal_name,
      inn: contactData.inn,
      ogrn: contactData.ogrn,
    },
  });
  console.log("  ✔ Обновлён global footer-settings");

  // --- Global: header-settings (контакты для шапки) ---
  await payload.updateGlobal({
    slug: "header-settings",
    data: {
      phone: contactData.phone,
      telegram_url: contactData.telegram,
      whatsapp_url: contactData.whatsapp,
      email: contactData.email,
    },
  });
  console.log("  ✔ Обновлён global header-settings");
}

// ---------------------------------------------------------------------------

async function main() {
  console.log("=== Миграция данных Prisma -> Payload CMS ===");

  const payload = await getPayload({ config: configPromise });

  await migrateArticles(payload);
  await migratePages(payload);
  await migrateSiteSettings(payload);

  console.log("\n=== Миграция завершена успешно ===");
}

main()
  .catch((error) => {
    console.error("✖ Ошибка миграции:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(process.exitCode ?? 0);
  });
