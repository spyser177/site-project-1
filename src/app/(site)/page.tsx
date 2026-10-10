import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { Icon, isIconName } from "@/components/Icon";
import { HeroIllustration } from "@/components/illustrations/HeroIllustration";
import { MechanismDiagram } from "@/components/illustrations/MechanismDiagram";
import { RichText } from "@/components/RichText";
import { getPayloadClient } from "@/lib/payload";
import type { SerializedEditorState } from "lexical";

// Главная целиком читается из Payload (global home-page + страница "home" в
// коллекции pages — используется для текстового блока о механизме действия),
// поэтому рендерится динамически на каждый запрос и сразу отражает изменения
// из админки.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Медикаментозное прерывание беременности: мифепристон, мизопростол",
  description:
    "Медикаментозное прерывание беременности: как действуют мифепристон и мизопростол, эффективность 95–98,9%, подготовка, восстановление и ответы на частые вопросы.",
  alternates: { canonical: "/" },
};

interface HomePageGlobal {
  hero_title?: string | null;
  hero_subtitle?: string | null;
  hero_button_text?: string | null;
  hero_button_link?: string | null;
  advantages?: { title: string; description?: string | null; icon?: string | null }[] | null;
  faq?: { question: string; answer: string }[] | null;
  reviews?: { author?: string | null; text: string; rating?: number | null }[] | null;
  cta?: {
    title?: string | null;
    subtitle?: string | null;
    button_text?: string | null;
    button_link?: string | null;
  } | null;
}

interface PageDoc {
  content?: SerializedEditorState | null;
}

export default async function GlavnayaPage() {
  const payload = await getPayloadClient();

  const [home, homeContentPage] = await Promise.all([
    payload.findGlobal({ slug: "home-page" }) as Promise<HomePageGlobal>,
    payload
      .find({ collection: "pages", where: { slug: { equals: "home" } }, limit: 1 })
      .then((res) => (res.docs[0] as PageDoc | undefined) ?? null),
  ]);

  const heroTitle = home.hero_title || "Медикаментозное прерывание беременности";
  const heroSubtitle =
    home.hero_subtitle ||
    "Мифепристон и мизопростол — препараты для прерывания беременности на ранних сроках. Рассказываем, как действует медикаментозный аборт, какова его эффективность и что важно знать перед началом процесса.";

  const advantages = home.advantages ?? [];
  const faqItems = (home.faq ?? []).map((item) => ({ q: item.question, a: item.answer }));
  const reviews = home.reviews ?? [];
  const cta = home.cta ?? {};

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      {faqItems.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/* HERO */}
      <section className="pt-12 sm:pt-20 pb-14 sm:pb-20 overflow-hidden">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-[var(--color-accent-dark)] mb-4">
              Общая информация
            </p>
            <h1 className="text-4xl sm:text-5xl font-semibold text-[var(--color-primary)] leading-tight">
              {heroTitle}
            </h1>
            <p className="mt-5 text-lg text-[var(--color-muted)] leading-relaxed">
              {heroSubtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href={home.hero_button_link || "/stati"} size="lg">
                {home.hero_button_text || "Читать статьи"}
              </Button>
              <Button href="/kontakty" variant="outline" size="lg">
                Задать вопрос
              </Button>
            </div>
          </div>
          <div className="justify-self-center w-full max-w-sm">
            <HeroIllustration className="w-full h-auto" />
          </div>
        </div>
      </section>

      {/* ПОЧЕМУ ЭТОТ МЕТОД */}
      {advantages.length > 0 && (
        <Section muted>
          <SectionHeading
            eyebrow="Преимущества"
            title="Почему выбирают медикаментозный метод"
            description="Безопасность медикаментозного аборта и его эффективность подтверждаются медицинскими наблюдениями при правильном применении и контроле специалиста."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {advantages.map((item) => (
              <Card key={item.title} className="h-full">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: "var(--color-surface-muted)" }}
                >
                  <Icon
                    name={isIconName(item.icon) ? item.icon : "check"}
                    className="w-5 h-5 text-[var(--color-primary)]"
                  />
                </div>
                <h3 className="font-semibold text-[var(--color-primary)] mb-2">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                    {item.description}
                  </p>
                )}
              </Card>
            ))}
          </div>
        </Section>
      )}

      {/* КАК ДЕЙСТВУЮТ ПРЕПАРАТЫ */}
      {homeContentPage?.content && (
        <Section>
          <SectionHeading
            eyebrow="Механизм действия"
            title="Как действуют мифепристон и мизопростол"
            description="Комбинация мифепристон и мизопростол работает в два последовательных этапа, дополняющих друг друга."
          />
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <RichText data={homeContentPage.content} />
            <MechanismDiagram />
          </div>
        </Section>
      )}

      {/* FAQ */}
      {faqItems.length > 0 && (
        <Section muted>
          <SectionHeading eyebrow="Вопросы и ответы" title="Часто задаваемые вопросы" />
          <div className="space-y-4">
            {faqItems.map((item) => (
              <Card key={item.q}>
                <h3 className="font-semibold text-[var(--color-primary)] mb-2 flex items-start gap-2">
                  <Icon name="help" className="w-5 h-5 shrink-0 mt-0.5 text-[var(--color-accent-dark)]" />
                  {item.q}
                </h3>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed pl-7">
                  {item.a}
                </p>
              </Card>
            ))}
          </div>
        </Section>
      )}

      {/* ОТЗЫВЫ */}
      {reviews.length > 0 && (
        <Section>
          <SectionHeading eyebrow="Отзывы" title="Что говорят о нашем портале" />
          <div className="grid sm:grid-cols-3 gap-5">
            {reviews.map((t, i) => (
              <Card key={`${t.author}-${i}`} className="flex flex-col">
                <Icon name="quote" className="w-6 h-6 text-[var(--color-accent-light)] mb-3" />
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Icon
                      key={j}
                      name="star"
                      className={`w-4 h-4 ${
                        j < (t.rating ?? 0)
                          ? "text-[var(--color-accent)]"
                          : "text-[var(--color-border)]"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-[var(--color-text)] leading-relaxed flex-grow">
                  {t.text}
                </p>
                {t.author && (
                  <div className="mt-4 flex items-center justify-between text-xs text-[var(--color-muted)]">
                    <span className="font-medium">{t.author}</span>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </Section>
      )}

      {/* CTA */}
      <Section muted animate={false}>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-semibold text-[var(--color-primary)]">
            {cta.title || "Остались вопросы о медикаментозном прерывании беременности?"}
          </h2>
          <p className="mt-4 text-[var(--color-muted)]">
            {cta.subtitle ||
              "Свяжитесь с нами — ответим на общие вопросы и поможем разобраться, куда обратиться для очной консультации специалиста."}
          </p>
          <div className="mt-8">
            <Button href={cta.button_link || "/kontakty"} size="lg" variant="accent">
              {cta.button_text || "Связаться с нами"}
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
