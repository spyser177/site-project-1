import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-api";
import { EDITABLE_PAGE_SLUGS } from "@/lib/pages";

export async function GET(request: NextRequest) {
  const check = await requireAdmin(request, "pages");
  if ("response" in check) return check.response;

  const rows = await prisma.page.findMany();
  const bySlug = new Map(rows.map((r) => [r.slug, r]));

  // Всегда возвращаем все известные слаги страниц, даже если записи в БД
  // ещё нет (до первого сохранения) — админка должна показывать форму.
  const pages = EDITABLE_PAGE_SLUGS.map((slug) => {
    const row = bySlug.get(slug);
    return (
      row ?? {
        id: null,
        slug,
        title: null,
        description: null,
        metaTitle: null,
        metaDescription: null,
        content: "",
        updatedAt: null,
      }
    );
  });

  return NextResponse.json({ pages });
}
