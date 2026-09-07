import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

export { SESSION_COOKIE, sessionCookieOptions, createSessionToken, verifySessionToken } from "./session";
export type { SessionPayload } from "./session";

const LOCKOUT_THRESHOLD = 5;
const LOCKOUT_WINDOW_MS = 15 * 60 * 1000; // 15 минут

/** Проверяет, не заблокирован ли IP из-за превышения попыток входа */
export async function isIpLockedOut(ip: string): Promise<boolean> {
  const since = new Date(Date.now() - LOCKOUT_WINDOW_MS);
  const recentFailures = await prisma.loginAttempt.count({
    where: { ip, success: false, createdAt: { gte: since } },
  });
  return recentFailures >= LOCKOUT_THRESHOLD;
}

export async function recordLoginAttempt(ip: string, success: boolean): Promise<void> {
  await prisma.loginAttempt.create({ data: { ip, success } });
}

/**
 * Проверяет логин/пароль.
 * Приоритет — запись в таблице Admin (bcrypt-хэш).
 * Если в БД ещё нет ни одного администратора (первый запуск/сид не выполнен),
 * используется резервная проверка по ADMIN_USERNAME/ADMIN_PASSWORD из env —
 * это только для первичного бутстрапа, рекомендуется как можно скорее
 * создать запись в Admin и убрать пароль из env.
 */
export async function verifyAdminCredentials(
  username: string,
  password: string
): Promise<boolean> {
  const admin = await prisma.admin.findUnique({ where: { username } });
  if (admin) {
    return bcrypt.compare(password, admin.passwordHash);
  }

  const adminCount = await prisma.admin.count();
  if (adminCount === 0) {
    const envUser = process.env.ADMIN_USERNAME;
    const envPass = process.env.ADMIN_PASSWORD;
    return Boolean(envUser && envPass && username === envUser && password === envPass);
  }

  return false;
}
