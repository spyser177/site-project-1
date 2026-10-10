import type { Metadata } from "next";
import type { SerializedEditorState } from "lexical";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { RichText } from "@/components/RichText";
import { getPayloadClient } from "@/lib/payload";

// Текст страницы редактируется из админ-панели (Payload, коллекция Pages,
// slug "privacy-policy"), поэтому страница рендерится динамически на каждый
// запрос.
export const dynamic = "force-dynamic";

interface PageDoc {
  title?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  content?: SerializedEditorState | null;
}

const DEFAULTS = {
  title: "Политика в отношении обработки персональных данных",
  metaTitle: "Политика обработки персональных данных",
  metaDescription:
    "Политика в отношении обработки персональных данных: какие данные собираются, цели и порядок их обработки в соответствии с ФЗ №152-ФЗ.",
};

async function getPrivacyPolicyPage(): Promise<PageDoc | null> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "pages",
    where: { slug: { equals: "privacy-policy" } },
    limit: 1,
  });
  return (result.docs[0] as PageDoc) ?? null;
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPrivacyPolicyPage();
  return {
    title: page?.metaTitle ?? DEFAULTS.metaTitle,
    description: page?.metaDescription ?? DEFAULTS.metaDescription,
    alternates: { canonical: "/privacy-policy" },
    robots: { index: true, follow: true },
  };
}

export default async function PrivacyPolicyPage() {
  const page = await getPrivacyPolicyPage();

  return (
    <>
      <Section animate={false} className="pt-14 sm:pt-20">
        <SectionHeading as="h1" eyebrow="Правовая информация" title={page?.title ?? DEFAULTS.title} />
      </Section>

      <Section animate={false}>
        <div className="max-w-3xl">
          <RichText data={page?.content} />
        </div>
      </Section>
    </>
  );
}
