import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

export { SESSION_COOKIE, sessionCookieOptions, createSessionToken, verifySessionToken } from "./session";
export type { SessionPayload } from "./session";

const LOCKOUT_THRESHOLD = 5;
const LOCKOUT_WINDOW_MS = 15 * 60 * 1000; // 15 минут

/**
 * Проверяет, не заблокирован ли IP из-за превышения попыток входа.
 * Если БД недоступна, "fail-open" — не блокируем вход из-за инфраструктурной
 * проблемы (сама попытка входа при этом всё равно валидируется по паролю).
 */
export async function isIpLockedOut(ip: string): Promise<boolean> {
  try {
    const since = new Date(Date.now() - LOCKOUT_WINDOW_MS);
    const recentFailures = await prisma.loginAttempt.count({
      where: { ip, success: false, createdAt: { gte: since } },
    });
    return recentFailures >= LOCKOUT_THRESHOLD;
  } catch (error) {
    console.warn("[auth] БД недоступна, проверка блокировки IP пропущена:", error);
    return false;
  }
}

/** Сохраняет попытку входа. Ошибка БД не должна прерывать вход администратора. */
export async function recordLoginAttempt(ip: string, success: boolean): Promise<void> {
  try {
    await prisma.loginAttempt.create({ data: { ip, success } });
  } catch (error) {
    console.warn("[auth] Не удалось сохранить попытку входа (БД недоступна):", error);
  }
}

/**
 * Проверяет логин/пароль.
 * Приоритет — запись в таблице Admin (bcrypt-хэш).
 * Если в БД ещё нет ни одного администратора (первый запуск/сид не выполнен)
 * ИЛИ база данных сейчас недоступна, используется резервная проверка по
 * ADMIN_USERNAME/ADMIN_PASSWORD из env — это только для первичного бутстрапа,
 * рекомендуется как можно скорее создать запись в Admin и убрать пароль из env.
 */
export async function verifyAdminCredentials(
  username: string,
  password: string
): Promise<boolean> {
  function checkEnvFallback(): boolean {
    const envUser = process.env.ADMIN_USERNAME;
    const envPass = process.env.ADMIN_PASSWORD;
    return Boolean(envUser && envPass && username === envUser && password === envPass);
  }

  try {
    const admin = await prisma.admin.findUnique({ where: { username } });
    if (admin) {
      return bcrypt.compare(password, admin.passwordHash);
    }

    const adminCount = await prisma.admin.count();
    if (adminCount === 0) {
      return checkEnvFallback();
    }

    return false;
  } catch (error) {
    console.warn(
      "[auth] БД недоступна при проверке логина, используется запасная проверка по env:",
      error
    );
    return checkEnvFallback();
  }
}
