import type { CollectionConfig } from "payload";
import { HeadingFeature, lexicalEditor } from "@payloadcms/richtext-lexical";

/**
 * Коллекция Articles — статьи блога (СТРАНИЦА /stati/<slug>).
 *
 * SEO-поля (metaTitle, metaDescription, keywords) заполняются отдельно от
 * отображаемых title/excerpt, чтобы не завязывать выдачу в поиске на
 * редакционные заголовки.
 */
export const Articles: CollectionConfig = {
  slug: "articles",
  admin: {
    group: "Контент",
    useAsTitle: "title",
    defaultColumns: ["title", "isPublished", "publishedAt", "category"],
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
        description: "Используется в адресе /stati/<slug>",
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
        {
          name: "keywords",
          type: "text",
          label: "Ключевые слова",
          admin: {
            description: "Через запятую — для внутренней SEO-разметки.",
          },
        },
      ],
    },

    {
      name: "excerpt",
      type: "textarea",
      label: "Краткое описание (анонс)",
    },

    {
      name: "content",
      type: "richText",
      required: true,
      label: "Содержание",
      // Берём стандартный набор фич лексического редактора (bold, italic,
      // link, blockquote, списки, загрузка изображений upload, toolbar и
      // т.д.) и переопределяем только заголовки — ограничиваем H1-H3,
      // как требует структура контента статей.
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
      label: "Главное изображение",
    },
    {
      name: "imageAlt",
      type: "text",
      label: "Alt-текст главного изображения",
    },

    {
      name: "isPublished",
      type: "checkbox",
      label: "Опубликовано",
      defaultValue: false,
      admin: {
        description: "Выключено — черновик, включено — опубликовано на сайте.",
      },
    },
    {
      name: "publishedAt",
      type: "date",
      label: "Дата публикации",
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },

    {
      name: "category",
      type: "text",
      label: "Категория",
    },
    {
      name: "tags",
      type: "array",
      label: "Теги",
      labels: {
        singular: "Тег",
        plural: "Теги",
      },
      fields: [
        {
          name: "tag",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "author",
      type: "text",
      label: "Автор",
    },
  ],
}
