import type { GlobalConfig } from "payload";

/**
 * Global HeaderSettings — содержимое шапки сайта (логотип, меню,
 * контакты для быстрого доступа).
 */
export const HeaderSettings: GlobalConfig = {
  slug: "header-settings",
  admin: {
    group: "Настройки",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
      label: "Логотип",
    },
    {
      name: "menu",
      type: "array",
      label: "Меню",
      labels: {
        singular: "Пункт меню",
        plural: "Пункты меню",
      },
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
          label: "Текст",
        },
        {
          name: "link",
          type: "text",
          required: true,
          label: "Ссылка",
        },
      ],
    },
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
  ],
};
