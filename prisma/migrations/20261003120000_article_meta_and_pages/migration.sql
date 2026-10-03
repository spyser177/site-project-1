-- AlterTable: расширяем Article полями метаданных, иконки, ключевых слов и даты публикации
ALTER TABLE "Article" ADD COLUMN "metaTitle" TEXT;
ALTER TABLE "Article" ADD COLUMN "metaDescription" TEXT;
ALTER TABLE "Article" ADD COLUMN "icon" TEXT NOT NULL DEFAULT 'molecule';
ALTER TABLE "Article" ADD COLUMN "keywords" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];
ALTER TABLE "Article" ADD COLUMN "publishedAt" TIMESTAMP(3);

-- CreateTable: редактируемый контент статичных страниц
CREATE TABLE "Page" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "content" TEXT NOT NULL DEFAULT '',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Page_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Page_slug_key" ON "Page"("slug");
