import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { ArticleContent } from "@/components/ArticleContent";
import { textToBlocks } from "@/lib/content-blocks";
import { getPage } from "@/lib/pages";
import { PAGE_DEFAULTS } from "@/lib/page-defaults";

// Текст страницы редактируется из админ-панели, поэтому рендерится
// динамически на каждый запрос.
export const dynamic = "force-dynamic";

const DEFAULTS = PAGE_DEFAULTS["privacy-policy"];

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage("privacy-policy", DEFAULTS);
  return {
    title: page.metaTitle ?? DEFAULTS.metaTitle,
    description: page.metaDescription ?? DEFAULTS.metaDescription,
    alternates: { canonical: "/privacy-policy" },
    robots: { index: true, follow: true },
  };
}

export default async function PrivacyPolicyPage() {
  const page = await getPage("privacy-policy", DEFAULTS);

  return (
    <>
      <Section animate={false} className="pt-14 sm:pt-20">
        <SectionHeading as="h1" eyebrow="Правовая информация" title={page.title ?? DEFAULTS.title ?? ""} />
      </Section>

      <Section animate={false}>
        <div className="max-w-3xl">
          <ArticleContent blocks={textToBlocks(page.content || DEFAULTS.content || "")} />
        </div>
      </Section>
    </>
  );
}
