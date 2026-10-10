import type { GlobalConfig } from "payload";

/**
 * Global FooterSettings — содержимое подвала сайта (контакты и
 * юридическая информация).
 */
export const FooterSettings: GlobalConfig = {
  slug: "footer-settings",
  admin: {
    group: "Настройки",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "phone",
      type: "text",
      label: "Телефон",
    },
    {
      name: "telegram_url",
      type: "text",
      label: "Ссылка на Telegram",
    },
    {
      name: "whatsapp_url",
      type: "text",
      label: "Ссылка на WhatsApp",
    },
    {
      name: "email",
      type: "text",
      label: "E-mail",
    },
    {
      name: "legal_name",
      type: "text",
      label: "Юридическое наименование",
    },
    {
      name: "inn",
      type: "text",
      label: "ИНН",
    },
    {
      name: "ogrn",
      type: "text",
      label: "ОГРН",
    },
    {
      name: "copyright",
      type: "text",
      label: "Текст копирайта",
    },
  ],
};
