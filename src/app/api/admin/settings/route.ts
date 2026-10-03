import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin-api";
import { getAllSettings, setSetting } from "@/lib/settings";

const settingSchema = z.object({
  key: z.string().trim().min(1).max(100),
  value: z.string().trim().max(5000),
});

export async function GET(request: NextRequest) {
  const check = await requireAdmin(request, "settings");
  if ("response" in check) return check.response;

  const settings = await getAllSettings();
  return NextResponse.json({ settings });
}

export async function POST(request: NextRequest) {
  const check = await requireAdmin(request, "settings");
  if ("response" in check) return check.response;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });
  }

  const parsed = settingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Некорректные данные" }, { status: 400 });
  }

  try {
    await setSetting(parsed.data.key, parsed.data.value);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[settings] Не удалось сохранить настройку", error);
    return NextResponse.json(
      { error: "Не удалось сохранить настройку. Попробуйте позже." },
      { status: 500 }
    );
  }
}
