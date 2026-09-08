import { NextResponse } from "next/server";

/** Простой health-check для Docker healthcheck / балансировщика */
export async function GET() {
  return NextResponse.json({ status: "ok" });
}
