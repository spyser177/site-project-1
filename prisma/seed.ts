import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { ARTICLES } from "../src/lib/articles";
import { blocksToText } from "../src/lib/content-blocks";
import { PAGE_DEFAULTS } from "../src/lib/page-defaults";

const prisma = new PrismaClient();

async function seedAdmin() {
  const adminUsername = process.env.ADMIN_USERNAME || "admin";
  const adminPassword = process.env.ADMIN_PASSWORD || "ChangeMe123456!";

  const existingAdmin = await prisma.admin.findUnique({ where: { username: adminUsername } });
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(adminPassword, 12);
    await prisma.admin.create({ data: { username: adminUsername, passwordHash } });
    console.log(`✔ Создан администратор "${adminUsername}"`);
  } else {
    console.log(`ℹ Администратор "${adminUsername}" уже существует`);
  }
}

async function seedSettings() {
  const defaultSettings: Record<string, string> = {
    hero_title: "Медикаментозное прерывание беременности",
    hero_subtitle:
      "Мифепристон и мизопростол — препараты для прерывания беременности на ранних сроках. Рассказываем, как действует медикаментозный аборт, какова его эффективность и что важно знать перед началом процесса.",
  };

  for (const [key, value] of Object.entries(defaultSettings)) {
    await prisma.siteSetting.upsert({
      where: { key },
      update: {},
      create: { key, value },
    });
  }
  console.log("✔ Настройки по умолчанию проверены/созданы");
}

async function seedArticles() {
  let created = 0;
  let skipped = 0;

  for (const article of ARTICLES) {
    const existing = await prisma.article.findUnique({ where: { slug: article.slug } });
    if (existing) {
      skipped++;
      continue;
    }

    await prisma.article.create({
      data: {
        slug: article.slug,
        title: article.title,
        metaTitle: article.metaTitle,
        metaDescription: article.metaDescription,
        description: article.description,
        content: blocksToText(article.blocks),
        icon: article.icon,
        keywords: article.keywords,
        publishedAt: new Date(article.date),
        published: true,
      },
    });
    created++;
  }

  console.log(`✔ Статьи: создано ${created}, уже существовало ${skipped}`);
}

async function seedPages() {
  let created = 0;
  let skipped = 0;

  for (const [slug, data] of Object.entries(PAGE_DEFAULTS)) {
    const existing = await prisma.page.findUnique({ where: { slug } });
    if (existing) {
      skipped++;
      continue;
    }
    await prisma.page.create({ data: { slug, ...data } });
    created++;
  }

  console.log(`✔ Страницы: создано ${created}, уже существовало ${skipped}`);
}

async function main() {
  await seedAdmin();
  await seedSettings();
  await seedArticles();
  await seedPages();
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
