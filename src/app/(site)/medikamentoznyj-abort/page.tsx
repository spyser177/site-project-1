import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { Card } from "@/components/Card";

const PAGE_TITLE = "Медикаментозный аборт: ответы на вопросы";
const LAST_REVIEWED = "2026-10-27";

export const metadata: Metadata = {
  title: "Медикаментозный аборт: сроки, препараты, последствия",
  description:
    "Медикаментозный аборт: до какого срока делают, как проходит процедура, эффективность, боль, когда срочно к врачу. Материал проверен по клинрекомендациям МЗ РФ.",
  alternates: { canonical: "/medikamentoznyj-abort" },
};

const sections: { href: string; title: string; description: string }[] = [
  {
    href: "/medikamentoznyj-abort/sroki/",
    title: "До какого срока делают медикаментозный аборт",
    description:
      "Акушерский срок и срок от зачатия с таблицей пересчёта, почему в разных источниках пишут то 6, то 7 недель, и что делать, если срок уже больше.",
  },
  {
    href: "/medikamentoznyj-abort/posle/",
    title: "После медикаментозного аборта",
    description:
      "Выделения, месячные после процедуры, боли и кровотечение: где граница нормы, когда возвращается цикл и через сколько можно планировать беременность.",
  },
  {
    href: "/medikamentoznyj-abort/preparaty/",
    title: "Мифепристон и мизопростол",
    description:
      "Как действуют оба препарата, зачем нужны две таблетки с перерывом и почему доза мифепристона 10 мг для прерывания беременности не подходит.",
  },
  {
    href: "/medikamentoznyj-abort/bez-recepta/",
    title: "Можно ли купить без рецепта",
    description:
      "Препарат в аптеках есть, но рецептурный статус не обойти: что реально отпускают свободно и чем экстренная контрацепция отличается от аборта.",
  },
  {
    href: "/medikamentoznyj-abort/protivopokazaniya/",
    title: "Противопоказания и последствия",
    description:
      "Кому метод не подходит, какие осложнения бывают и что повышает риск — с разбором четырёх частых мифов.",
  },
];

const steps: { title: string; description: string }[] = [
  {
    title: "Первый визит",
    description:
      "Осмотр, УЗИ для подтверждения маточной беременности, анализы, исключение противопоказаний.",
  },
  {
    title: "Мифепристон в клинике",
    description: "Приём в присутствии врача и наблюдение не менее 2 часов.",
  },
  {
    title: "Мизопростол через 36–48 часов",
    description:
      "Второй визит: препарат запускает сокращения матки, в ближайшие часы появляются спазмы и кровянистые выделения.",
  },
  {
    title: "Контрольное УЗИ через 10–14 дней",
    description: "Только оно показывает, завершился ли аборт полностью.",
  },
];

const urgentSigns: string[] = [
  "Кровотечение, при котором прокладка промокает чаще чем раз в час, и так повторяется подряд.",
  "Температура выше 38 °C.",
  "Выделения с неприятным, зловонным запахом.",
  "Боль, которая усиливается, не проходит после обезболивающего и мешает двигаться.",
  "Обморок, резкая слабость, головокружение, потемнение в глазах.",
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: PAGE_TITLE,
  lastReviewed: LAST_REVIEWED,
  reviewedBy: {
    "@type": "Organization",
    name: "Редакция сайта feminform.com",
  },
};

export default function MedikamentozniyAbortHubPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Section animate={false} className="pt-14 sm:pt-20">
        <SectionHeading as="h1" title={PAGE_TITLE} />

        <div className="max-w-3xl">
          <p className="text-base text-[var(--color-text)] leading-relaxed">
            Медикаментозный аборт — прерывание беременности таблетками, без операции и наркоза. В
            обиходе его называют абортом таблетками или фармабортом, в медицинских документах —
            медикаментозным прерыванием беременности. Эта страница — вход в раздел: здесь коротко о
            методе и ссылки на подробные разборы. Всё ниже носит справочный характер и не заменяет
            назначение врача: метод и схему определяет гинеколог после осмотра и УЗИ.
          </p>

          <div className="mt-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-5">
            <p className="text-sm text-[var(--color-text)] font-medium">
              Материал проверен с опорой на клинические рекомендации МЗ РФ. Последняя проверка:
              27.10.2026.
            </p>
          </div>
        </div>
      </Section>

      <Section animate={false}>
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--color-primary)] mb-5">
            Коротко о сроке: 42 дня аменореи
          </h2>
          <p className="text-base text-[var(--color-text)] leading-relaxed">
            Метод зарегистрирован до 42 дней аменореи — это 6 недель от первого дня последней
            менструации, а не от предполагаемого зачатия. Точно назвать срок по дате задержки
            нельзя, его подтверждает врач по УЗИ. Позже 42 дней таблетки не применяют: падает
            эффективность и растёт риск неполного аборта, обсуждают другие методы.
          </p>
          <p className="mt-4 text-base text-[var(--color-text)] leading-relaxed">
            Подробнее:{" "}
            <Link
              href="/medikamentoznyj-abort/sroki/"
              className="underline text-[var(--color-primary)] hover:text-[var(--color-accent-dark)]"
            >
              до какого срока делают медикаментозный аборт, разница акушерского срока и срока от
              зачатия
            </Link>
            .
          </p>
        </div>
      </Section>

      <Section animate={false} muted>
        <SectionHeading title="Разделы с подробными ответами" />
        <p className="max-w-3xl -mt-6 mb-8 text-base text-[var(--color-muted)]">
          Пять страниц закрывают то, что чаще всего спрашивают. Выбирайте по своему вопросу — на
          каждой ответ начинается с первого предложения, без предисловий.
        </p>

        <div className="grid sm:grid-cols-2 gap-5">
          {sections.map((item) => (
            <Link key={item.href} href={item.href} className="block group">
              <Card className="h-full transition-colors group-hover:border-[var(--color-primary)]">
                <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-2 group-hover:text-[var(--color-accent-dark)]">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                  {item.description}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <Section animate={false}>
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--color-primary)] mb-5">
            Как проходит медикаментозный аборт
          </h2>
          <p className="text-base text-[var(--color-text)] leading-relaxed mb-6">
            Схема укладывается в три визита, но самих шагов четыре — второй и третий разделены
            перерывом дома.
          </p>
          <ol className="space-y-4">
            {steps.map((step, index) => (
              <li key={step.title} className="flex gap-4">
                <span className="shrink-0 w-8 h-8 rounded-full bg-[var(--color-surface-muted)] text-[var(--color-primary)] font-semibold flex items-center justify-center text-sm">
                  {index + 1}
                </span>
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  <span className="font-medium">{step.title}.</span> {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section animate={false} muted>
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--color-primary)] mb-5">
            Эффективность и контроль результата
          </h2>
          <p className="text-base text-[var(--color-text)] leading-relaxed">
            На ранних сроках эффективность высокая, но не абсолютная, и снижается с увеличением
            срока. Отсюда и жёсткая граница в 42 дня вместо «примерно неделя-полторы».
          </p>
          <p className="mt-4 text-base text-[var(--color-text)] leading-relaxed">
            Решает не самочувствие, а УЗИ через 10–14 дней. Ощущения обманывают в обе стороны: при
            хорошем самочувствии на снимке иногда видны остатки плодного яйца, а сильные спазмы
            случаются при полностью завершённом аборте. Тест на беременность сразу после процедуры
            бессмысленен — ХГЧ падает постепенно, полоска остаётся слабой до двух-трёх недель. Что
            считать нормой в первые дни и когда идти на контроль, разобрано отдельно:{" "}
            <Link
              href="/medikamentoznyj-abort/posle/"
              className="underline text-[var(--color-primary)] hover:text-[var(--color-accent-dark)]"
            >
              после медикаментозного аборта
            </Link>
            .
          </p>
        </div>
      </Section>

      <Section animate={false}>
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--color-primary)] mb-5">
            Больно ли это
          </h2>
          <p className="text-base text-[var(--color-text)] leading-relaxed">
            Обычно терпимо и похоже на менструальные спазмы: тянет низ живота, иногда отдаёт в
            поясницу или крестец. Пик приходится на первые часы после мизопростола. Обезболивание
            подбирает врач — терпеть молча не нужно, и «перетерплю» здесь плохая стратегия: из-за
            сильной боли женщина пропускает момент, когда пора звонить в клинику.
          </p>
        </div>
      </Section>

      <Section animate={false} muted>
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--color-primary)] mb-5">
            Когда нужно срочно обратиться к врачу
          </h2>
          <p className="text-base text-[var(--color-text)] leading-relaxed mb-5">
            Любой из этих признаков — повод звонить в клинику сразу, в любое время суток. Не
            «понаблюдать до утра».
          </p>
          <ul className="space-y-3 list-disc list-inside">
            {urgentSigns.map((sign) => (
              <li key={sign} className="text-base text-[var(--color-text)] leading-relaxed">
                {sign}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-base text-[var(--color-text)] leading-relaxed">
            Одного признака достаточно. Замалчивание симптомов — самая частая причина поздней
            помощи, а в этой теме промедление и даёт тяжёлые осложнения.
          </p>
        </div>
      </Section>

      <Section animate={false}>
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--color-primary)] mb-5">
            Источники и дисклеймер
          </h2>
          <p className="text-base text-[var(--color-text)] leading-relaxed">
            Материал опирается на инструкции к препаратам и клинические рекомендации МЗ РФ.
            Актуальные версии документов:
          </p>
          <ul className="mt-3 space-y-2 list-disc list-inside">
            <li className="text-base text-[var(--color-text)]">
              Государственный реестр лекарственных средств — инструкции к мифепристону и
              мизопростолу:{" "}
              <a
                href="https://grls.rosminzdrav.ru/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-[var(--color-primary)] hover:text-[var(--color-accent-dark)]"
              >
                grls.rosminzdrav.ru
              </a>
            </li>
            <li className="text-base text-[var(--color-text)]">
              Рубрикатор клинических рекомендаций МЗ РФ:{" "}
              <a
                href="https://cr.minzdrav.gov.ru/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-[var(--color-primary)] hover:text-[var(--color-accent-dark)]"
              >
                cr.minzdrav.gov.ru
              </a>
            </li>
          </ul>
          <p className="mt-5 text-sm text-[var(--color-muted)] leading-relaxed">
            Информация на странице не является медицинской рекомендацией и не заменяет
            консультацию врача. Мы не публикуем дозировки и не описываем схемы самостоятельного
            приёма препаратов. Решение о методе прерывания беременности принимает врач.
          </p>
        </div>
      </Section>
    </>
  );
}
