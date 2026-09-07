import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { checkPublicRateLimit, getClientIp } from "@/lib/rate-limit";
import { sendContactEmail } from "@/lib/mailer";
import { sendContactTelegram } from "@/lib/telegram";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Укажите имя").max(100),
  phone: z.string().trim().min(5, "Укажите телефон").max(30),
  email: z.string().trim().email("Некорректный email").max(150),
  message: z.string().trim().min(5, "Сообщение слишком короткое").max(2000),
  // honeypot — обычные пользователи не видят и не заполняют это поле
  website: z.string().max(0).optional().or(z.literal("")),
});

export async function POST(request: NextRequest) {
  const ip = getClientIp(request.headers);

  const { success } = checkPublicRateLimit(ip, "contact");
  if (!success) {
    return NextResponse.json(
      { error: "Слишком много запросов. Попробуйте позже." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Некорректный формат запроса" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Некорректные данные" },
      { status: 400 }
    );
  }

  // Honeypot сработал — тихо "успешно" отвечаем, чтобы не подсказывать боту
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const { name, phone, email, message } = parsed.data;

  try {
    await prisma.contactSubmission.create({
      data: { name, phone, email, message, ip },
    });
  } catch (error) {
    console.error("[api/contact] Ошибка записи в БД:", error);
    return NextResponse.json(
      { error: "Не удалось сохранить заявку. Попробуйте позже." },
      { status: 500 }
    );
  }

  // Отправка email/Telegram не должна блокировать успешный ответ пользователю
  void sendContactEmail({ name, phone, email, message }).catch((error) =>
    console.error("[api/contact] Ошибка отправки email:", error)
  );
  void sendContactTelegram({ name, phone, email, message }).catch((error) =>
    console.error("[api/contact] Ошибка отправки в Telegram:", error)
  );

  return NextResponse.json({ ok: true });
}
