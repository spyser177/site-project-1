import { SignJWT, jwtVerify } from "jose";

/**
 * Работа с JWT-сессией администратора — использует только Web Crypto API
 * (через jose), совместимо с Edge Runtime (используется в middleware.ts).
 * Не импортировать сюда bcryptjs или Prisma — это сломает Edge-бандл.
 */

export const SESSION_COOKIE = "admin_session";
const SESSION_TTL_SECONDS = 8 * 60 * 60; // 8 часов

function getSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET || "dev-insecure-secret-change-me-32-chars-min";
  return new TextEncoder().encode(secret);
}

export interface SessionPayload {
  username: string;
}

export async function createSessionToken(username: string): Promise<string> {
  return new SignJWT({ username })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(getSecret());
}

export async function verifySessionToken(
  token: string
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (typeof payload.username !== "string") return null;
    return { username: payload.username };
  } catch {
    return null;
  }
}

export const sessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: SESSION_TTL_SECONDS,
};
