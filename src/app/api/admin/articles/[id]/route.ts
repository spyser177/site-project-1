import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-api";

const ICONS = [
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
] as const;

const updateSchema = z.object({
  title: z.string().trim().min(3).max(200).optional(),
  metaTitle: z.string().trim().max(200).optional().or(z.literal("")),
  metaDescription: z.string().trim().max(500).optional().or(z.literal("")),
  description: z.string().trim().min(3).max(500).optional(),
  content: z.string().trim().max(20000).optional(),
  imageUrl: z.string().trim().url().optional().or(z.literal("")),
  icon: z.enum(ICONS).optional(),
  keywords: z.array(z.string().trim().min(1)).optional(),
  published: z.boolean().optional(),
});

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const check = await requireAdmin(request, "articles");
  if ("response" in check) return check.response;

  const { id } = await params;

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

  try {
    const { metaTitle, metaDescription, ...rest } = parsed.data;
    const article = await prisma.article.update({
      where: { id },
      data: {
        ...rest,
        ...(metaTitle !== undefined ? { metaTitle: metaTitle || null } : {}),
        ...(metaDescription !== undefined ? { metaDescription: metaDescription || null } : {}),
      },
    });
    return NextResponse.json({ article });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json({ error: "Статья не найдена" }, { status: 404 });
    }
    console.error("Failed to update article", error);
    return NextResponse.json(
      { error: "Не удалось сохранить статью. Попробуйте позже." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const check = await requireAdmin(request, "articles");
  if ("response" in check) return check.response;

  const { id } = await params;

  try {
    await prisma.article.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json({ error: "Статья не найдена" }, { status: 404 });
    }
    console.error("Failed to delete article", error);
    return NextResponse.json(
      { error: "Не удалось удалить статью. Попробуйте позже." },
      { status: 500 }
    );
  }
}
