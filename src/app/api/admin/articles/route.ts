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

const articleSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(3)
    .max(150)
    .regex(/^[a-z0-9-]+$/, "Слаг может содержать только латиницу, цифры и дефис"),
  title: z.string().trim().min(3).max(200),
  metaTitle: z.string().trim().max(200).optional().or(z.literal("")),
  metaDescription: z.string().trim().max(500).optional().or(z.literal("")),
  description: z.string().trim().min(3).max(500),
  content: z.string().trim().max(20000).default(""),
  imageUrl: z.string().trim().url().optional().or(z.literal("")),
  icon: z.enum(ICONS).default("molecule"),
  keywords: z.array(z.string().trim().min(1)).default([]),
  published: z.boolean().default(false),
});

export async function GET(request: NextRequest) {
  const check = await requireAdmin(request, "articles");
  if ("response" in check) return check.response;

  const articles = await prisma.article.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ articles });
}

export async function POST(request: NextRequest) {
  const check = await requireAdmin(request, "articles");
  if ("response" in check) return check.response;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });
  }

  const parsed = articleSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Некорректные данные" },
      { status: 400 }
    );
  }

  try {
    const { metaTitle, metaDescription, ...rest } = parsed.data;
    const article = await prisma.article.create({
      data: {
        ...rest,
        metaTitle: metaTitle || null,
        metaDescription: metaDescription || null,
      },
    });
    return NextResponse.json({ article }, { status: 201 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return NextResponse.json(
        { error: "Статья с таким слагом уже существует" },
        { status: 409 }
      );
    }
    console.error("Failed to create article", error);
    return NextResponse.json(
      { error: "Не удалось сохранить статью. Попробуйте позже." },
      { status: 500 }
    );
  }
}
