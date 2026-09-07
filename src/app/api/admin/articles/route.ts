import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-api";

const articleSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(3)
    .max(150)
    .regex(/^[a-z0-9-]+$/, "Слаг может содержать только латиницу, цифры и дефис"),
  title: z.string().trim().min(3).max(200),
  description: z.string().trim().min(3).max(500),
  content: z.string().trim().max(20000).default(""),
  imageUrl: z.string().trim().url().optional().or(z.literal("")),
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
    const article = await prisma.article.create({ data: parsed.data });
    return NextResponse.json({ article }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Статья с таким слагом уже существует" },
      { status: 409 }
    );
  }
}
