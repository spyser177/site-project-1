import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { Card } from "@/components/Card";
import { Icon, type IconName } from "@/components/Icon";
import { Button } from "@/components/Button";
import { ArticleContent } from "@/components/ArticleContent";
import { textToBlocks } from "@/lib/content-blocks";
import { getPage } from "@/lib/pages";
import { PAGE_DEFAULTS } from "@/lib/page-defaults";

// Текст страницы редактируется из админ-панели, поэтому рендерится
// динамически на каждый запрос.
export const dynamic = "force-dynamic";

const DEFAULTS = PAGE_DEFAULTS["o-nas"];

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage("o-nas", DEFAULTS);
  return {
    title: page.metaTitle ?? DEFAULTS.metaTitle,
    description: page.metaDescription ?? DEFAULTS.metaDescription,
    alternates: { canonical: "/o-nas" },
  };
}

const principles: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "flask",
    title: "Точность формулировок",
    text: "Мы описываем механизм действия мифепристона и мизопростола на основе общих медицинских представлений, избегая упрощений и мифов.",
  },
  {
    icon: "shield",
    title: "Общеинформационный характер",
    text: "Материалы портала не заменяют очную консультацию специалиста и не являются медицинским назначением.",
  },
  {
    icon: "check",
    title: "Актуальность",
    text: "Мы регулярно пересматриваем содержание статей, чтобы отражать текущие представления о безопасности и эффективности метода.",
  },
  {
    icon: "heart",
    title: "Уважение к читателю",
    text: "Пишем спокойным, поддерживающим языком, понимая, что тема требует деликатности.",
  },
];

export default async function ONasPage() {
  const page = await getPage("o-nas", DEFAULTS);

  return (
    <>
      <Section animate={false} className="pt-14 sm:pt-20">
        <SectionHeading
          as="h1"
          eyebrow="О портале"
          title={page.title ?? DEFAULTS.title ?? ""}
          description={page.description ?? DEFAULTS.description}
        />
      </Section>

      <Section muted>
        <SectionHeading eyebrow="Наши принципы" title="Почему нам можно доверять" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {principles.map((item) => (
            <Card key={item.title}>
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: "var(--color-surface-muted)" }}
              >
                <Icon name={item.icon} className="w-5 h-5 text-[var(--color-primary)]" />
              </div>
              <h3 className="font-semibold text-[var(--color-primary)] mb-2">{item.title}</h3>
              <p className="text-sm text-[var(--color-muted)] leading-relaxed">{item.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <div className="max-w-3xl">
          <ArticleContent blocks={textToBlocks(page.content || DEFAULTS.content || "")} />
        </div>
      </Section>

      <Section muted animate={false}>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-semibold text-[var(--color-primary)]">
            Есть вопросы о материалах портала?
          </h2>
          <p className="mt-4 text-[var(--color-muted)]">
            Напишите нам — ответим на общие вопросы и поможем найти нужную статью.
          </p>
          <div className="mt-8">
            <Button href="/kontakty" size="lg" variant="accent">
              Связаться с нами
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
