import type { Metadata } from "next";
import type { SerializedEditorState } from "lexical";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { Card } from "@/components/Card";
import { Icon, type IconName } from "@/components/Icon";
import { Button } from "@/components/Button";
import { RichText } from "@/components/RichText";
import { getPayloadClient } from "@/lib/payload";
import {
  getMediaAlt,
  getMediaSrcSet,
  getMediaUrl,
  RESPONSIVE_SIZES_ATTR,
  type MediaLike,
} from "@/lib/media";

// Текст страницы редактируется из админ-панели (Payload, коллекция Pages,
// slug "o-nas"), поэтому страница рендерится динамически на каждый запрос.
export const dynamic = "force-dynamic";

interface PageDoc {
  title?: string | null;
  subtitle?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  content?: SerializedEditorState | null;
}

const DEFAULTS = {
  title: "Информационный портал о медикаментозном прерывании беременности",
  subtitle:
    "Мы собираем и систематизируем общедоступную информацию о мифепристоне, мизопростоле и медикаментозном методе прерывания беременности, чтобы помочь читателям разобраться в теме перед обращением к специалисту.",
  metaTitle: "О нас",
  metaDescription:
    "О информационном портале, посвящённом медикаментозному прерыванию беременности: мифепристону, мизопростолу и общим вопросам подготовки и восстановления.",
};

async function getONasPage(): Promise<PageDoc | null> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "pages",
    where: { slug: { equals: "o-nas" } },
    limit: 1,
  });
  return (result.docs[0] as PageDoc) ?? null;
}

async function getHeroImage(): Promise<MediaLike | null> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "media",
    where: { filename: { equals: "o-nas.webp" } },
    limit: 1,
  });
  return (result.docs[0] as MediaLike) ?? null;
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getONasPage();
  return {
    title: page?.metaTitle ?? DEFAULTS.metaTitle,
    description: page?.metaDescription ?? DEFAULTS.metaDescription,
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
  const [page, heroImage] = await Promise.all([getONasPage(), getHeroImage()]);
  const heroUrl = getMediaUrl(heroImage);
  const heroSrcSet = getMediaSrcSet(heroImage);
  const heroAlt = getMediaAlt(heroImage, DEFAULTS.metaTitle);

  return (
    <>
      <Section animate={false} className="pt-14 sm:pt-20">
        <SectionHeading
          as="h1"
          eyebrow="О портале"
          title={page?.title ?? DEFAULTS.title}
          description={page?.subtitle ?? DEFAULTS.subtitle}
        />

        {heroUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={heroUrl}
            srcSet={heroSrcSet}
            sizes={RESPONSIVE_SIZES_ATTR}
            alt={heroAlt}
            width={1200}
            height={800}
            className="mt-8 w-full rounded-2xl object-cover max-h-[420px]"
          />
        )}
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

      {page?.content && (
        <Section>
          <div className="max-w-3xl">
            <RichText data={page.content} />
          </div>
        </Section>
      )}

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
