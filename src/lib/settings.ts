import { prisma } from "./prisma";

/**
 * Настройки сайта, редактируемые из админ-панели (SiteSetting).
 * При недоступности БД возвращается значение по умолчанию — публичные
 * страницы не должны падать из-за отсутствия соединения с базой.
 */
export async function getSetting(key: string, fallback: string): Promise<string> {
  try {
    const row = await prisma.siteSetting.findUnique({ where: { key } });
    return row?.value ?? fallback;
  } catch (error) {
    console.warn(`[settings] Не удалось получить "${key}", используется значение по умолчанию`, error);
    return fallback;
  }
}

export async function setSetting(key: string, value: string): Promise<void> {
  await prisma.siteSetting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });
}

export async function getAllSettings(): Promise<Record<string, string>> {
  try {
    const rows = await prisma.siteSetting.findMany();
    return Object.fromEntries(rows.map((r) => [r.key, r.value]));
  } catch (error) {
    console.warn("[settings] Не удалось получить список настроек", error);
    return {};
  }
}
