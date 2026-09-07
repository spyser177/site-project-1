/**
 * Централизованная конфигурация сайта из переменных окружения.
 * Значения-заглушки используются, если env не задан (для локальной разработки).
 *
 * Важно: эти поля читаются и в клиентских компонентах (Header и т.д.),
 * поэтому используются только NEXT_PUBLIC_-переменные — иначе на клиенте
 * они превратятся в undefined и вызовут расхождение при гидратации.
 * UUID админ-панели НЕ входит в этот публичный конфиг (см. adminPanelUuid ниже).
 */
export const siteConfig = {
  name: "МедИнформ",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",

  phone: process.env.NEXT_PUBLIC_SITE_PHONE || "+78001234567",
  email: process.env.NEXT_PUBLIC_SITE_EMAIL || "info@example.com",
  telegram: process.env.NEXT_PUBLIC_SITE_TELEGRAM || "https://t.me/example",
  whatsapp: process.env.NEXT_PUBLIC_SITE_WHATSAPP || "https://wa.me/78001234567",
  address: process.env.NEXT_PUBLIC_SITE_ADDRESS || "Адрес будет указан позднее",

  inn: process.env.NEXT_PUBLIC_SITE_INN || "0000000000",
  ogrn: process.env.NEXT_PUBLIC_SITE_OGRN || "0000000000000",
  legalName: process.env.NEXT_PUBLIC_SITE_LEGAL_NAME || 'ООО «МедИнформ» (заглушка)',

  yandexMetrikaId: process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID || "",
} as const;

/** Телефон в формате для tel: ссылок (без пробелов/скобок) */
export function phoneHref(phone: string = siteConfig.phone) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

/**
 * UUID и путь скрытой админ-панели — только для использования на сервере
 * (middleware, серверные компоненты). Не импортировать из клиентских
 * компонентов напрямую, чтобы значение не попало в клиентский бандл.
 */
export const adminPanelUuid =
  process.env.ADMIN_PANEL_UUID || "a7f3b2c1-d4e5-6789-abcd-ef0123456789";

export const adminPanelPath = `/panel-${adminPanelUuid}/admin`;
