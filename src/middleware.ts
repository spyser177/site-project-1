import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySessionToken, SESSION_COOKIE } from "@/lib/session";
import { adminPanelPath } from "@/lib/config";

/**
 * Маршрутизация и защита скрытой админ-панели.
 *
 * - /admin и /admin/* — всегда 404 (публичный адрес заблокирован).
 * - /admin-internal и /admin-internal/* — прямой доступ недоступен (404),
 *   этот сегмент существует только как rewrite-цель для UUID-пути.
 * - /panel-{UUID}/admin/* — если UUID совпадает с настроенным, происходит
 *   rewrite на внутренний маршрут; неавторизованные пользователи
 *   перенаправляются на страницу входа; неверный UUID — 404.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return NextResponse.rewrite(new URL("/404", request.url));
  }

  if (pathname === "/admin-internal" || pathname.startsWith("/admin-internal/")) {
    return NextResponse.rewrite(new URL("/404", request.url));
  }

  if (pathname === adminPanelPath || pathname.startsWith(`${adminPanelPath}/`)) {
    const rest = pathname.slice(adminPanelPath.length); // "" | "/login" | "/articles" ...
    const internalPath = `/admin-internal${rest || ""}`;

    if (internalPath === "/admin-internal/login") {
      return NextResponse.rewrite(new URL(internalPath, request.url));
    }

    const token = request.cookies.get(SESSION_COOKIE)?.value;
    const session = token ? await verifySessionToken(token) : null;

    if (!session) {
      return NextResponse.redirect(new URL(`${adminPanelPath}/login`, request.url));
    }

    return NextResponse.rewrite(new URL(internalPath, request.url));
  }

  // Похоже на путь панели, но UUID не совпадает — скрываем существование
  if (/^\/panel-[^/]+\/admin(\/|$)/.test(pathname)) {
    return NextResponse.rewrite(new URL("/404", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
    "/admin-internal",
    "/admin-internal/:path*",
    "/panel-:uuid/admin",
    "/panel-:uuid/admin/:path*",
  ],
};
