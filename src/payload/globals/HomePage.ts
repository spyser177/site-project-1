import type { GlobalConfig } from "payload";

/**
 * Global HomePage — контент главной страницы (hero-блок, преимущества,
 * FAQ, отзывы, финальный призыв к действию).
 */
export const HomePage: GlobalConfig = {
  slug: "home-page",
  admin: {
    group: "Контент",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: "collapsible",
      label: "Hero",
      fields: [
        {
          name: "hero_title",
          type: "text",
          label: "Заголовок (H1)",
        },
        {
          name: "hero_subtitle",
          type: "textarea",
          label: "Подзаголовок",
        },
        {
          name: "hero_button_text",
          type: "text",
          label: "Текст кнопки",
        },
        {
          name: "hero_button_link",
          type: "text",
          label: "Ссылка кнопки",
        },
      ],
    },
    {
      name: "advantages",
      type: "array",
      label: "Преимущества",
      labels: {
        singular: "Преимущество",
        plural: "Преимущества",
      },
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          label: "Заголовок",
        },
        {
          name: "description",
          type: "textarea",
          label: "Описание",
        },
        {
          name: "icon",
          type: "text",
          label: "Иконка",
        },
      ],
    },
    {
      name: "faq",
      type: "array",
      label: "Вопросы и ответы",
      labels: {
        singular: "Вопрос",
        plural: "Вопросы",
      },
      fields: [
        {
          name: "question",
          type: "text",
          required: true,
          label: "Вопрос",
        },
        {
          name: "answer",
          type: "textarea",
          required: true,
          label: "Ответ",
        },
      ],
    },
    {
      name: "reviews",
      type: "array",
      label: "Отзывы",
      labels: {
        singular: "Отзыв",
        plural: "Отзывы",
      },
      fields: [
        {
          name: "author",
          type: "text",
          label: "Автор",
        },
        {
          name: "text",
          type: "textarea",
          required: true,
          label: "Текст отзыва",
        },
        {
          name: "rating",
          type: "number",
          label: "Оценка",
          min: 1,
          max: 5,
        },
      ],
    },
    {
      name: "cta",
      type: "group",
      label: "Призыв к действию",
      fields: [
        {
          name: "title",
          type: "text",
          label: "Заголовок",
        },
        {
          name: "subtitle",
          type: "textarea",
          label: "Подзаголовок",
        },
        {
          name: "button_text",
          type: "text",
          label: "Текст кнопки",
        },
        {
          name: "button_link",
          type: "text",
          label: "Ссылка кнопки",
        },
      ],
    },
  ],
};
