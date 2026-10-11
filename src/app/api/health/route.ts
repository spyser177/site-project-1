import { NextResponse } from "next/server";

/**
 * Простой health-check для Docker healthcheck / мониторинга.
 * Используется также blue-green деплоем (scripts/zero-downtime-deploy.sh)
 * для проверки готовности нового контейнера перед переключением трафика.
 */
export async function GET() {
  return NextResponse.json({ status: "ok" });
}
