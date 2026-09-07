import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import {
  verifyAdminCredentials,
  createSessionToken,
  isIpLockedOut,
  recordLoginAttempt,
  sessionCookieOptions,
  SESSION_COOKIE,
} from "@/lib/auth";
import { checkAdminRateLimit, getClientIp } from "@/lib/rate-limit";

const loginSchema = z.object({
  username: z.string().trim().min(1).max(100),
  password: z.string().min(1).max(200),
});

export async function POST(request: NextRequest) {
  const ip = getClientIp(request.headers);

  const { success } = checkAdminRateLimit(ip, "login");
  if (!success) {
    return NextResponse.json(
      { error: "Слишком много запросов. Попробуйте позже." },
      { status: 429 }
    );
  }

  if (await isIpLockedOut(ip)) {
    return NextResponse.json(
      { error: "Слишком много неудачных попыток входа. Попробуйте через 15 минут." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });
  }

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Укажите логин и пароль" }, { status: 400 });
  }

  const { username, password } = parsed.data;
  const valid = await verifyAdminCredentials(username, password);

  await recordLoginAttempt(ip, valid);

  if (!valid) {
    return NextResponse.json({ error: "Неверный логин или пароль" }, { status: 401 });
  }

  const token = await createSessionToken(username);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, token, sessionCookieOptions);
  return response;
}
