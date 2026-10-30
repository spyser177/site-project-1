import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";

const PAGE_TITLE = "До какого срока делают медикаментозный аборт";
const LAST_REVIEWED = "2026-10-27";

export const metadata: Metadata = {
  title: "До какого срока делают медикаментозный аборт: 42 дня",
  description:
    "До 42 дней аменореи — это 6 недель от первого дня месячных. Разница акушерского срока и срока от зачатия, таблица пересчёта.",
  alternates: { canonical: "/medikamentoznyj-abort/sroki" },
};

const recalcTable: { weeks: number; days: number; fromConception: string }[] = [
  { weeks: 4, days: 28, fromConception: "2 недели" },
  { weeks: 5, days: 35, fromConception: "3 недели" },
  { weeks: 6, days: 42, fromConception: "4 недели" },
  { weeks: 7, days: 49, fromConception: "5 недель" },
  { weeks: 8, days: 56, fromConception: "6 недель" },
  { weeks: 9, days: 63, fromConception: "7 недель" },
  { weeks: 10, days: 70, fromConception: "8 недель" },
  { weeks: 12, days: 84, fromConception: "10 недель" },
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

export default function MedikamentozniyAbortSrokiPage() {
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
            До 42 дней аменореи. Это 6 недель от первого дня последней менструации — не от
            зачатия, а именно от начала последних месячных, и отсюда растёт половина сомнений в
            интернете. Дальше разберём, как этот срок считают врачи, почему в одних клиниках на
            сайте написано «до 6 недель», в других «до 7», и что делать, если ваш срок уже
            больше.
          </p>
          <p className="mt-4 text-base text-[var(--color-text)] leading-relaxed">
            Ниже — пересчёт в недели и дни, разница акушерского срока и срока от зачатия,
            ориентиры по методам на более поздних сроках и способы проверить дату точно.
          </p>
          <p className="mt-4 text-sm text-[var(--color-muted)] leading-relaxed">
            <span className="font-medium text-[var(--color-text)]">Дисклеймер.</span> Материал
            носит информационный характер и не заменяет консультацию врача. Срок беременности и
            допустимость любого метода прерывания определяет только врач на очном приёме, после
            осмотра и УЗИ.
          </p>

          <div className="mt-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-5">
            <p className="text-sm text-[var(--color-text)] font-medium">
              Материал проверен с опорой на клинические рекомендации МЗ РФ. Последняя проверка:
              27.10.2026.
            </p>
          </div>
        </div>
      </Section>

      {/* До какого срока: короткий ответ — НЕ сворачивать */}
      <Section animate={false} muted>
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--color-primary)] mb-5">
            До какого срока: короткий ответ
          </h2>
          <blockquote className="border-l-4 border-[var(--color-primary)] bg-[var(--color-surface)] rounded-r-xl p-5">
            <p className="text-base text-[var(--color-text)] leading-relaxed font-medium">
              42 дня аменореи = 6 недель 0 дней от первого дня последней менструации.
            </p>
            <p className="mt-3 text-base text-[var(--color-text)] leading-relaxed">
              Это верхняя граница, зарегистрированная в инструкции к препаратам для
              медикаментозного прерывания беременности — мифепристону и мизопростолу.
              Формулировка в инструкции дословная: «длительность аменореи не более 42 дней».
            </p>
          </blockquote>

          <p className="mt-5 text-base text-[var(--color-text)] leading-relaxed">
            Что это значит на практике:
          </p>
          <ul className="mt-3 space-y-2 list-disc list-inside">
            <li className="text-base text-[var(--color-text)] leading-relaxed">
              42 дня — это ровно шесть полных недель, то есть конец шестой недели акушерского
              срока;
            </li>
            <li className="text-base text-[var(--color-text)] leading-relaxed">
              от предполагаемой даты зачатия в этот момент проходит около 4 недель;
            </li>
            <li className="text-base text-[var(--color-text)] leading-relaxed">
              если сегодня у вас 6 недель и 3 дня — вы ещё внутри границы, но запас измеряется
              днями;
            </li>
            <li className="text-base text-[var(--color-text)] leading-relaxed">
              точную цифру ставит врач по УЗИ: дата последних месячных — ориентир, а не диагноз.
            </li>
          </ul>

          <p className="mt-5 text-base text-[var(--color-text)] leading-relaxed">
            Решение о методе и допуске к процедуре принимает врач. При сроке, близком к 42 дням,
            УЗИ делают обязательно — иначе можно «не попасть» в метод и приехать в клинику
            напрасно.
          </p>
        </div>
      </Section>

      {/* Акушерский срок и срок от зачатия + таблица — НЕ сворачивать */}
      <Section animate={false}>
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--color-primary)] mb-5">
            Акушерский срок и срок от зачатия: в чём разница
          </h2>
          <p className="text-base text-[var(--color-text)] leading-relaxed">
            Акушерский срок считают от первого дня последней менструации. Не от полового акта, не
            от овуляции, не от задержки. Врачу нужна точка, которую женщина может назвать сама и
            которая не зависит от памяти о конкретном дне, — и такая точка есть только у месячных.
          </p>
          <p className="mt-4 text-base text-[var(--color-text)] leading-relaxed">
            Срок от зачатия (его ещё называют эмбриональным) короче примерно на две недели. Логика
            простая: менструация, затем созревание фолликула и овуляция — в среднем 14 дней, — и
            только потом оплодотворение.
          </p>
          <p className="mt-4 text-base text-[var(--color-text)] leading-relaxed">
            Пересчёт по неделям, разница стабильная — около 14 дней:
          </p>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[var(--color-surface-muted)]">
                  <th className="border border-[var(--color-border)] px-4 py-3 text-left font-semibold text-[var(--color-primary)]">
                    Акушерских недель
                  </th>
                  <th className="border border-[var(--color-border)] px-4 py-3 text-left font-semibold text-[var(--color-primary)]">
                    Дней аменореи
                  </th>
                  <th className="border border-[var(--color-border)] px-4 py-3 text-left font-semibold text-[var(--color-primary)]">
                    От зачатия (примерно)
                  </th>
                </tr>
              </thead>
              <tbody>
                {recalcTable.map((row) => (
                  <tr
                    key={row.weeks}
                    className={
                      row.weeks === 6
                        ? "bg-[var(--color-accent-dark)]/10 font-semibold"
                        : "bg-[var(--color-surface)]"
                    }
                  >
                    <td className="border border-[var(--color-border)] px-4 py-3 text-[var(--color-text)]">
                      {row.weeks}
                    </td>
                    <td className="border border-[var(--color-border)] px-4 py-3 text-[var(--color-text)]">
                      {row.days}
                    </td>
                    <td className="border border-[var(--color-border)] px-4 py-3 text-[var(--color-text)]">
                      {row.fromConception}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-sm text-[var(--color-muted)] leading-relaxed">
            Строку про 6 недель стоит выделить визуально — это единственная цифра, которую
            читатель должен запомнить.
          </p>
        </div>
      </Section>

      {/* Почему в разных источниках 6 и 7 недель — не аккордеон */}
      <Section animate={false} muted>
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--color-primary)] mb-5">
            Почему в разных источниках 6 недель и 7 недель
          </h2>
          <p className="text-base text-[var(--color-text)] leading-relaxed">
            Три разных источника дают три разных числа, и все три при этом не выдуманы.
          </p>
          <p className="mt-4 text-base text-[var(--color-text)] leading-relaxed">
            <span className="font-medium">Первый — инструкция препарата.</span> Там написано «не
            более 42 дней аменореи». Это ровно 6 недель.
          </p>
          <p className="mt-4 text-base text-[var(--color-text)] leading-relaxed">
            <span className="font-medium">Второй — округление до «идёт седьмая неделя».</span>{" "}
            Клиника, принимающая пациенток «до 7 недель», часто имеет в виду не 49 дней, а текущую
            неделю: 6 недель 4 дня для неё — это седьмая неделя беременности.
          </p>
          <p className="mt-4 text-base text-[var(--color-text)] leading-relaxed">
            <span className="font-medium">
              Третий — клинические рекомендации и случаи, когда метод применяют шире.
            </span>{" "}
            При неразвивающейся беременности и по медицинским показаниям медикаментозное
            завершение допускается в более поздние сроки, вплоть до 63 дней аменореи (9 недель), —
            но это уже не «аборт по желанию», а решение врачебной комиссии по показаниям.
          </p>
        </div>
      </Section>

      {/* Что считается ранним сроком + аккордеоны H3 */}
      <Section animate={false}>
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--color-primary)] mb-5">
            Что считается ранним сроком
          </h2>
          <p className="text-base text-[var(--color-text)] leading-relaxed mb-6">
            Ранний срок в обиходе — это первый триместр, до 12 недель. Для медикаментозного метода
            граница жёстче и она одна: 42 дня аменореи.
          </p>

          <div className="space-y-3">
            <details className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <summary className="cursor-pointer font-medium text-[var(--color-text)] list-none flex items-center justify-between">
                Прерывание беременности на ранних сроках — это до какого
                <span className="text-[var(--color-primary)] group-open:rotate-180 transition-transform shrink-0 ml-3">
                  ▾
                </span>
              </summary>
              <p className="mt-3 text-base text-[var(--color-text)] leading-relaxed">
                Если речь о таблетках, то до 6 недель акушерского срока. Для вакуумной аспирации —
                «до 12 недель». Это два разных ответа на один и тот же вопрос.
              </p>
            </details>

            <details className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <summary className="cursor-pointer font-medium text-[var(--color-text)] list-none flex items-center justify-between">
                Чем раньше, тем безопаснее — правда ли это
                <span className="text-[var(--color-primary)] group-open:rotate-180 transition-transform shrink-0 ml-3">
                  ▾
                </span>
              </summary>
              <p className="mt-3 text-base text-[var(--color-text)] leading-relaxed">
                Правда, но с оговоркой. Эффективность препаратов при схеме мифепристон плюс
                мизопростол на малых сроках выше, чем на границе допустимого. Но слишком ранний
                приход — тоже ошибка: до появления плодного яйца в полости матки УЗИ может не
                увидеть беременность.
              </p>
            </details>
          </div>
        </div>
      </Section>

      {/* Что делать, если срок больше — НЕ сворачивать */}
      <Section animate={false} muted>
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--color-primary)] mb-5">
            Что делать, если срок больше
          </h2>
          <p className="text-base text-[var(--color-text)] leading-relaxed mb-5">
            Если по УЗИ срок вышел за 42 дня, медикаментозный метод не применяют. Дальше разговор
            идёт о других вариантах:
          </p>
          <ul className="space-y-3 list-disc list-inside">
            <li className="text-base text-[var(--color-text)] leading-relaxed">
              <span className="font-medium">вакуумная аспирация</span> (мини-аборт) — до 12
              недель, амбулаторно;
            </li>
            <li className="text-base text-[var(--color-text)] leading-relaxed">
              <span className="font-medium">хирургическое прерывание</span> в условиях стационара
              — тоже в пределах первого триместра;
            </li>
            <li className="text-base text-[var(--color-text)] leading-relaxed">
              <span className="font-medium">прерывание по медицинским показаниям</span> на сроке
              свыше 12 недель — только по решению врачебной комиссии.
            </li>
          </ul>
          <p className="mt-5 text-base text-[var(--color-text)] leading-relaxed">
            По закону (ст. 56 Федерального закона № 323-ФЗ) прерывание беременности по желанию
            женщины возможно до 12 недель.
          </p>
        </div>
      </Section>

      {/* Как точно определить срок + аккордеоны H3 */}
      <Section animate={false}>
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--color-primary)] mb-5">
            Как точно определить срок
          </h2>
          <p className="text-base text-[var(--color-text)] leading-relaxed mb-6">
            Три инструмента: дата первого дня последней менструации, УЗИ с измерением КТР, ХГЧ
            (вспомогательный).
          </p>

          <div className="space-y-3">
            <details className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <summary className="cursor-pointer font-medium text-[var(--color-text)] list-none flex items-center justify-between">
                Может ли УЗИ ошибаться
                <span className="text-[var(--color-primary)] group-open:rotate-180 transition-transform shrink-0 ml-3">
                  ▾
                </span>
              </summary>
              <p className="mt-3 text-base text-[var(--color-text)] leading-relaxed">
                Может, и на малых сроках чаще, чем хотелось бы. Если результат кажется спорным,
                УЗИ повторяют через 5–7 дней.
              </p>
            </details>

            <details className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <summary className="cursor-pointer font-medium text-[var(--color-text)] list-none flex items-center justify-between">
                Что делать, если сроки по УЗИ и по месячным расходятся
                <span className="text-[var(--color-primary)] group-open:rotate-180 transition-transform shrink-0 ml-3">
                  ▾
                </span>
              </summary>
              <p className="mt-3 text-base text-[var(--color-text)] leading-relaxed">
                Ориентируются на УЗИ, если расхождение больше недели. Если меньше — берут дату
                последней менструации.
              </p>
            </details>
          </div>
        </div>
      </Section>

      {/* Влияет ли срок на эффективность и риск */}
      <Section animate={false} muted>
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--color-primary)] mb-5">
            Влияет ли срок на эффективность и риск
          </h2>
          <p className="text-base text-[var(--color-text)] leading-relaxed">
            Влияет, и в одну сторону: чем ближе к 42 дням, тем больше вероятность, что процедуру
            придётся завершать инструментально.
          </p>
        </div>
      </Section>

      {/* Источники и дисклеймер */}
      <Section animate={false}>
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--color-primary)] mb-5">
            Источники и дисклеймер
          </h2>
          <ul className="space-y-2 list-disc list-inside">
            <li className="text-base text-[var(--color-text)]">
              Инструкция по медицинскому применению препарата мифепристон (торговые наименования
              Мифепрекс, Миропристон, Миролют) — раздел «Показания». Реестр:{" "}
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
              Клинические рекомендации МЗ РФ «Медицинский аборт». Рубрикатор:{" "}
              <a
                href="https://cr.minzdrav.gov.ru/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-[var(--color-primary)] hover:text-[var(--color-accent-dark)]"
              >
                cr.minzdrav.gov.ru
              </a>
            </li>
            <li className="text-base text-[var(--color-text)]">
              Федеральный закон № 323-ФЗ от 21.11.2011, статья 56.
            </li>
          </ul>

          <p className="mt-5 text-sm text-[var(--color-muted)] leading-relaxed">
            <span className="font-medium text-[var(--color-text)]">Дисклеймер.</span> Информация
            на странице не является медицинской рекомендацией. Ни один срок, указанный здесь, не
            может служить основанием для самостоятельного приёма препаратов.
          </p>

          <p className="mt-6 text-base text-[var(--color-text)] leading-relaxed">
            Другие темы раздела: препараты —{" "}
            <Link
              href="/medikamentoznyj-abort/preparaty/"
              className="underline text-[var(--color-primary)] hover:text-[var(--color-accent-dark)]"
            >
              мифепристон и мизопростол
            </Link>
            , ограничения —{" "}
            <Link
              href="/medikamentoznyj-abort/protivopokazaniya/"
              className="underline text-[var(--color-primary)] hover:text-[var(--color-accent-dark)]"
            >
              противопоказания и последствия
            </Link>
            , восстановление —{" "}
            <Link
              href="/medikamentoznyj-abort/posle/"
              className="underline text-[var(--color-primary)] hover:text-[var(--color-accent-dark)]"
            >
              после медикаментозного аборта
            </Link>
            , или вернитесь в{" "}
            <Link
              href="/medikamentoznyj-abort/"
              className="underline text-[var(--color-primary)] hover:text-[var(--color-accent-dark)]"
            >
              общий раздел о медикаментозном аборте
            </Link>
            .
          </p>
        </div>
      </Section>
    </>
  );
}
