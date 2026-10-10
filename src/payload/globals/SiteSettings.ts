import type { GlobalConfig } from "payload";

/**
 * Global SiteSettings — общие реквизиты и контакты сайта, используемые
 * во множестве мест (хедер, футер, страницы контактов, юридическая
 * информация в SEO-разметке и т.д.).
 */
export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  admin: {
    group: "Настройки",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: "collapsible",
      label: "Контакты",
      fields: [
        {
          name: "phone",
          type: "text",
          label: "Телефон",
        },
        {
          name: "email",
          type: "text",
          label: "E-mail",
        },
        {
          name: "telegram",
          type: "text",
          label: "Telegram",
        },
        {
          name: "whatsapp",
          type: "text",
          label: "WhatsApp",
        },
        {
          name: "address",
          type: "text",
          label: "Адрес",
        },
      ],
    },
    {
      type: "collapsible",
      label: "Юридическая информация",
      fields: [
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
      ],
    },
  ],
};
