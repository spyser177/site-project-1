import type { CollectionConfig } from "payload";
import { HeadingFeature, lexicalEditor } from "@payloadcms/richtext-lexical";

/**
 * Коллекция Pages — произвольные статичные страницы сайта (главная,
 * информационные/лэндинговые страницы и т.д.), не подходящие под
 * узкоспециализированную модель Articles.
 */
export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    group: "Контент",
    useAsTitle: "title",
    defaultColumns: ["title", "slug"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "Заголовок (H1)",
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      label: "Slug (URL)",
      admin: {
        description: "Используется в адресе страницы",
      },
    },

    // --- SEO ---
    {
      type: "collapsible",
      label: "SEO",
      fields: [
        {
          name: "metaTitle",
          type: "text",
          label: "Meta Title",
          maxLength: 60,
          admin: {
            description: "До 60 символов, ключевое слово в начале.",
          },
        },
        {
          name: "metaDescription",
          type: "textarea",
          label: "Meta Description",
          maxLength: 160,
          admin: {
            description: "До 160 символов, с ключевым словом.",
          },
        },
      ],
    },

    {
      name: "subtitle",
      type: "text",
      label: "Подзаголовок",
    },

    {
      name: "content",
      type: "richText",
      label: "Содержание",
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures.filter((feature) => feature.key !== "heading"),
          HeadingFeature({ enabledHeadingSizes: ["h1", "h2", "h3"] }),
        ],
      }),
    },

    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: "Изображение",
    },
  ],
};
