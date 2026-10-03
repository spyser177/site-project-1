import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-api";
import { EDITABLE_PAGE_SLUGS } from "@/lib/pages";

const updateSchema = z.object({
  title: z.string().trim().max(200).optional().or(z.literal("")),
  description: z.string().trim().max(1000).optional().or(z.literal("")),
  metaTitle: z.string().trim().max(200).optional().or(z.literal("")),
  metaDescription: z.string().trim().max(500).optional().or(z.literal("")),
  content: z.string().trim().max(50000).optional().or(z.literal("")),
});

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const check = await requireAdmin(request, "pages");
  if ("response" in check) return check.response;

  const { slug } = await params;
  if (!EDITABLE_PAGE_SLUGS.includes(slug as (typeof EDITABLE_PAGE_SLUGS)[number])) {
    return NextResponse.json({ error: "Неизвестная страница" }, { status: 404 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });
  }

  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Некорректные данные" },
      { status: 400 }
    );
  }

  const data = {
    title: parsed.data.title || null,
    description: parsed.data.description || null,
    metaTitle: parsed.data.metaTitle || null,
    metaDescription: parsed.data.metaDescription || null,
    content: parsed.data.content ?? "",
  };

  try {
    const page = await prisma.page.upsert({
      where: { slug },
      update: data,
      create: { slug, ...data },
    });
    return NextResponse.json({ page });
  } catch (error) {
    console.error("Failed to save page", error);
    return NextResponse.json(
      { error: "Не удалось сохранить страницу. Попробуйте позже." },
      { status: 500 }
    );
  }
}
