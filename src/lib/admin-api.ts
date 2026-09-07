import { NextResponse, type NextRequest } from "next/server";
import { verifySessionToken, SESSION_COOKIE, type SessionPayload } from "./auth";
import { checkAdminRateLimit, getClientIp } from "./rate-limit";

/**
 * Проверяет сессию администратора и лимит запросов для admin-маршрутов.
 * Возвращает { session } при успехе или { response } с готовым ответом
 * об ошибке (401/429), который следует немедленно вернуть из route-handler'а.
 */
export async function requireAdmin(
  request: NextRequest,
  routeName: string
): Promise<{ session: SessionPayload } | { response: NextResponse }> {
  const ip = getClientIp(request.headers);
  const { success } = checkAdminRateLimit(ip, routeName);
  if (!success) {
    return {
      response: NextResponse.json(
        { error: "Слишком много запросов. Попробуйте позже." },
        { status: 429 }
      ),
    };
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session = token ? await verifySessionToken(token) : null;

  if (!session) {
    return {
      response: NextResponse.json({ error: "Требуется авторизация" }, { status: 401 }),
    };
  }

  return { session };
}
