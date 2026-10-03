import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { Icon, type IconName } from "@/components/Icon";
import { HeroIllustration } from "@/components/illustrations/HeroIllustration";
import { MechanismDiagram } from "@/components/illustrations/MechanismDiagram";
import { getSetting } from "@/lib/settings";

// Главная читает hero-заголовок/подзаголовок из SiteSetting (редактируется
// из админ-панели), поэтому рендерится динамически на каждый запрос.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Медикаментозное прерывание беременности: мифепристон, мизопростол",
  description:
    "Медикаментозное прерывание беременности: как действуют мифепристон и мизопростол, эффективность 95–98,9%, подготовка, восстановление и ответы на частые вопросы.",
  alternates: { canonical: "/" },
};

const advantages: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "chart",
    title: "Высокая эффективность",
    text: "Эффективность мизопростола в комбинации с мифепристоном достигает 95–98,9% на ранних сроках беременности.",
  },
  {
    icon: "shield",
    title: "Без инструментального вмешательства",
    text: "В отличие от вакуум-аспирации, медикаментозный аборт не требует хирургических манипуляций в полости матки.",
  },
  {
    icon: "clock",
    title: "Применение на ранних сроках",
    text: "Метод рассматривается на сроках беременности до 12 недель — чем раньше начато обследование, тем выше предсказуемость результата.",
  },
  {
    icon: "check",
    title: "Медицинское наблюдение",
    text: "Каждый этап — от обследования до контрольного осмотра — сопровождается специалистом, что повышает безопасность процесса.",
  },
];

const faqItems = [
  {
    q: "Насколько эффективна комбинация мифепристона и мизопростола?",
    a: "По данным клинических наблюдений, эффективность достигает 95–98,9% при применении на ранних сроках беременности при соблюдении рекомендаций специалиста.",
  },
  {
    q: "На каком сроке применяется медикаментозный метод?",
    a: "Как правило, метод рассматривается на ранних сроках беременности — до 12 недель. Точный срок определяется на предварительном ультразвуковом исследовании.",
  },
  {
    q: "Какие ощущения возникают после приёма мизопростола?",
    a: "После приёма мизопростола возможны спастические боли и кровянистые выделения — это ожидаемая физиологическая реакция, связанная с сокращением матки.",
  },
  {
    q: "Нужно ли контрольное наблюдение после процесса?",
    a: "Да, контрольный осмотр через 1–2 недели после приёма препаратов — обязательная часть процесса, подтверждающая, что всё завершилось полностью.",
  },
];

const testimonials = [
  {
    name: "Анна В.",
    date: "12 июля 2026",
    rating: 5,
    text: "Очень подробно объяснили каждый этап заранее — было спокойнее от того, что знала, чего ожидать после приёма препаратов.",
  },
  {
    name: "Мария К.",
    date: "28 июня 2026",
    rating: 5,
    text: "Специалист подробно рассказал о возможных ощущениях и на связи ответил на все вопросы во время процесса.",
  },
  {
    name: "Екатерина С.",
    date: "15 мая 2026",
    rating: 4,
    text: "Контрольный осмотр помог убедиться, что всё прошло как нужно. Спасибо за понятные объяснения на каждом шаге.",
  },
];

export default async function GlavnayaPage() {
  const heroTitle = await getSetting(
    "hero_title",
    "Медикаментозное прерывание беременности"
  );
  const heroSubtitle = await getSetting(
    "hero_subtitle",
    "Мифепристон и мизопростол — препараты для прерывания беременности на ранних сроках. Рассказываем, как действует медикаментозный аборт, какова его эффективность и что важно знать перед началом процесса."
  );

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

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
              <Button href="/stati" size="lg">
                Читать статьи
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
                <Icon name={item.icon} className="w-5 h-5 text-[var(--color-primary)]" />
              </div>
              <h3 className="font-semibold text-[var(--color-primary)] mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                {item.text}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      {/* КАК ДЕЙСТВУЮТ ПРЕПАРАТЫ */}
      <Section>
        <SectionHeading
          eyebrow="Механизм действия"
          title="Как действуют мифепристон и мизопростол"
          description="Комбинация мифепристон и мизопростол работает в два последовательных этапа, дополняющих друг друга."
        />
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div className="space-y-4 text-[var(--color-text)] leading-relaxed">
            <p>
              <strong>Мифепристон</strong> блокирует рецепторы прогестерона —
              гормона, поддерживающего беременность. Это нарушает гормональную
              поддержку и подготавливает шейку матки к следующему этапу.
            </p>
            <p>
              Спустя определённый интервал принимается{" "}
              <strong>мизопростол</strong> — он вызывает сокращения матки и
              расширение шейки, что приводит к завершению процесса. После
              приёма мизопростола возможны спастические боли и кровянистые
              выделения — это ожидаемая физиологическая реакция.
            </p>
            <p>
              При правильном применении на ранних сроках (до 12 недель) метод
              считается безопасным и эффективным: эффективность комбинации
              достигает 95–98,9%.
            </p>
          </div>
          <MechanismDiagram />
        </div>
      </Section>

      {/* FAQ */}
      <Section muted>
        <SectionHeading
          eyebrow="Вопросы и ответы"
          title="Часто задаваемые вопросы"
        />
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

      {/* ОТЗЫВЫ */}
      <Section>
        <SectionHeading eyebrow="Отзывы" title="Что говорят о нашем портале" />
        <div className="grid sm:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <Card key={t.name} className="flex flex-col">
              <Icon name="quote" className="w-6 h-6 text-[var(--color-accent-light)] mb-3" />
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon
                    key={i}
                    name="star"
                    className={`w-4 h-4 ${
                      i < t.rating ? "text-[var(--color-accent)]" : "text-[var(--color-border)]"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-[var(--color-text)] leading-relaxed flex-grow">
                {t.text}
              </p>
              <div className="mt-4 flex items-center justify-between text-xs text-[var(--color-muted)]">
                <span className="font-medium">{t.name}</span>
                <span>{t.date}</span>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section muted animate={false}>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-semibold text-[var(--color-primary)]">
            Остались вопросы о медикаментозном прерывании беременности?
          </h2>
          <p className="mt-4 text-[var(--color-muted)]">
            Свяжитесь с нами — ответим на общие вопросы и поможем разобраться,
            куда обратиться для очной консультации специалиста.
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
