import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";

const PAGE_TITLE = "Можно ли купить таблетки для аборта без рецепта";
const LAST_REVIEWED = "2026-10-27";

export const metadata: Metadata = {
  title: "Можно ли купить мифепристон без рецепта — прямой ответ",
  description:
    "Нет, мифепристон и мизопростол рецептурные. Разбираем, что лежит в аптеках, чем 10 мг отличаются от абортивной дозы и что отпускают свободно.",
  alternates: { canonical: "/medikamentoznyj-abort/bez-recepta" },
};

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

export default function MedikamentozniyAbortBezReceptaPage() {
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
            Нет. Мифепристон и мизопростол — рецептурные препараты. Их не продадут ни в аптеке у
            дома, ни в интернет-аптеке: рецептурный статус не меняется от способа заказа и от
            того, забронирована упаковка через сайт или нет.
          </p>
          <p className="mt-4 text-base text-[var(--color-text)] leading-relaxed">
            Ниже — прямые ответы на то, что спрашивают чаще всего: «мифепристон купить без
            рецепта» — можно ли, есть ли препарат в аптеках на самом деле и почему доза 10 мг не
            решает проблему. Отдельно разберём риски самостоятельного приёма и то, как попасть на
            процедуру по ОМС.
          </p>
          <p className="mt-4 text-sm text-[var(--color-muted)] leading-relaxed">
            <span className="font-medium text-[var(--color-text)]">Дисклеймер.</span> Материал
            носит информационный характер и не заменяет консультацию врача.
          </p>

          <div className="mt-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-5">
            <p className="text-sm text-[var(--color-text)] font-medium">
              Материал проверен с опорой на клинические рекомендации МЗ РФ. Последняя проверка:
              27.10.2026.
            </p>
          </div>
        </div>
      </Section>

      {/* Можно ли купить мифепристон без рецепта — НЕ сворачивать, главный ответ */}
      <Section animate={false} muted>
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--color-primary)] mb-5">
            Можно ли купить мифепристон без рецепта
          </h2>
          <p className="text-base text-[var(--color-text)] leading-relaxed">
            Нет, нельзя. Дозировки 200 и 600 мг, которые применяют для прерывания беременности,
            отпускаются только по рецепту — в карточках аптек стоит прямое указание «отпускается
            по рецепту». Бланк оформляет врач после осмотра и УЗИ, при подтверждённой маточной
            беременности.
          </p>
          <p className="mt-4 text-base text-[var(--color-text)] leading-relaxed">
            Формулировка «мифепристон купить без рецептов можно» встречается в поиске 268 раз в
            месяц, и почти всегда по ней открываются страницы сомнительного содержания. За ней
            стоит убеждение: раз препарат лежит в аптеке, вопрос только в цене. Дело не в цене.
            Провизор обязан забрать рецепт, оформить отпуск и отчитаться по нему. Без бланка
            упаковка остаётся в витрине — «мифепристон продают ли без рецепта» имеет один ответ:
            не продают.
          </p>
          <p className="mt-4 text-base text-[var(--color-text)] leading-relaxed">
            С рецептом или без — вопрос, который снимается на входе. С рецептом.
          </p>

          <div className="mt-6 space-y-3">
            <details className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <summary className="cursor-pointer font-medium text-[var(--color-text)] list-none flex items-center justify-between">
                Есть ли он вообще в аптеках
                <span className="text-[var(--color-primary)] group-open:rotate-180 transition-transform shrink-0 ml-3">
                  ▾
                </span>
              </summary>
              <div className="mt-3 space-y-3">
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  Да, есть. И это деталь, которую многие обзоры темы упускают: отрицать наличие
                  препарата бессмысленно, читательница видела его на полке своими глазами.
                </p>
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  Я проверила карточки аптечных сетей и агрегаторов — мифепристон представлен в
                  трёх дозировках. 10 мг: Женале, Внеплания, Гинепристон, это экстренная
                  контрацепция. 200 мг и 600 мг: Миропристон, Мифепрекс и другие торговые формы
                  для применения в клинике. Цены различаются в разы. Упаковка Миропристона 200 мг
                  №3 — около 2 598 ₽, Женале 10 мг — порядка 400 ₽, Внеплания 10 мг — около 297 ₽.
                </p>
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  Поэтому у вопроса «мифепристон можно купить в аптеке» два разных ответа.
                  Физически купить — да, он в наличии. Получить без рецепта — нет. «Можно ли
                  купить мифепристон в аптеке» без бланка — тоже нет, наличие товара ничего не
                  меняет.
                </p>
              </div>
            </details>

            <details className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <summary className="cursor-pointer font-medium text-[var(--color-text)] list-none flex items-center justify-between">
                Что значит пометка «по рецепту, остаётся в аптеке»
                <span className="text-[var(--color-primary)] group-open:rotate-180 transition-transform shrink-0 ml-3">
                  ▾
                </span>
              </summary>
              <div className="mt-3 space-y-3">
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  Она означает, что рецептурный бланк провизор оставляет у себя. Это документ об
                  отпуске, по которому аптека отчитывается. Пометка стоит, например, на карточках
                  Женале — и она же объясняет, почему разговор «рецепт есть, но дома»
                  заканчивается ничем.
                </p>
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  Отдельно про маркетплейсы. Категория с названием вроде «таблетки для прерывания
                  ранней беременности без рецептов» действительно существует, но карточка товара —
                  не выдача рецепта. Заказ отменят на этапе подтверждения.
                </p>
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  «Мифепристон цена в аптеке без рецепта» — запрос без практического смысла: пока
                  нет бланка, цена не имеет значения.
                </p>
              </div>
            </details>
          </div>
        </div>
      </Section>

      {/* Можно ли купить мизопростол без рецепта — НЕ сворачивать */}
      <Section animate={false}>
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--color-primary)] mb-5">
            Можно ли купить мизопростол без рецепта
          </h2>
          <p className="text-base text-[var(--color-text)] leading-relaxed">
            Нет. Мизопростол рецептурный, входит в перечень ЖНВЛП, и в инструкции указано, что
            отпускается по рецепту.
          </p>
          <p className="mt-4 text-base text-[var(--color-text)] leading-relaxed">
            Роль у него вторая, не самостоятельная. Схема медикаментозного аборта двухэтапная:
            сначала мифепристон, затем мизопростол, и всё под наблюдением врача. Мизопростол без
            мифепристона для прерывания беременности не применяют. Поэтому запрос «мизопростол
            купить без рецепта» упирается не в одну аптеку — одного препарата из двух всё равно
            недостаточно.
          </p>
        </div>
      </Section>

      {/* Существуют ли безрецептурные таблетки — НЕ сворачивать, главный ответ */}
      <Section animate={false} muted>
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--color-primary)] mb-5">
            Существуют ли безрецептурные таблетки для прерывания беременности
          </h2>
          <p className="text-base text-[var(--color-text)] leading-relaxed">
            Нет. Таких таблеток не существует — ни в России, ни в странах, где эта схема
            разрешена. Любой препарат, способный прервать уже наступившую беременность,
            отпускается по рецепту.
          </p>
          <p className="mt-4 text-base text-[var(--color-text)] leading-relaxed">
            Путаница возникает по конкретной причине, и её надо разобрать отдельно.
          </p>
          <p className="mt-4 text-base text-[var(--color-text)] leading-relaxed">
            Без рецепта продаётся левоноргестрел 1,5 мг — Эскапел и его аналоги. В карточке
            аптеки так и написано: «без рецепта». Это экстренная контрацепция. Она работает до
            имплантации: тормозит овуляцию или мешает прикреплению оплодотворённой яйцеклетки.
            Если беременность уже наступила и имплантация произошла, левоноргестрел её не
            прервёт.
          </p>

          <div className="mt-6 space-y-3">
            <details className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <summary className="cursor-pointer font-medium text-[var(--color-text)] list-none flex items-center justify-between">
                А мифепристон 10 мг — это не то же самое?
                <span className="text-[var(--color-primary)] group-open:rotate-180 transition-transform shrink-0 ml-3">
                  ▾
                </span>
              </summary>
              <div className="mt-3 space-y-3">
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  Нет, не то же самое. Разница в дозе: 10 мг предназначены для экстренной
                  контрацепции, и для прерывания беременности такой дозы недостаточно.
                  Производитель Внеплании пишет об этом прямо в описании: доза 10 мг недостаточна,
                  чтобы вызвать аборт.
                </p>
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  Раньше малые дозы отпускались свободно, и это подпитывает устойчивый миф.
                  Сейчас и они переведены на рецептурный отпуск — на карточках Женале уже стоит
                  «по рецепту, остаётся в аптеке». Человек, который покупал эти таблетки без бланка
                  несколько лет назад, уверен, что ничего не изменилось. Изменилось.
                </p>
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  И про популярный совет с форумов — «набери побольше таблеток по 10 мг». На
                  практике это не работает: инструкции не предусматривают такого применения,
                  эффективность не подтверждена, а риск остаётся.
                </p>
              </div>
            </details>
          </div>
        </div>
      </Section>

      {/* Есть ли аналоги мифепристона без рецепта — аккордеон */}
      <Section animate={false}>
        <div className="max-w-3xl">
          <details className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <summary className="cursor-pointer list-none flex items-center justify-between">
              <span className="text-2xl sm:text-3xl font-semibold text-[var(--color-primary)]">
                Есть ли аналоги мифепристона без рецепта
              </span>
              <span className="text-[var(--color-primary)] group-open:rotate-180 transition-transform shrink-0 ml-3">
                ▾
              </span>
            </summary>
            <div className="mt-4 space-y-3">
              <p className="text-base text-[var(--color-text)] leading-relaxed">
                Нет. Безрецептурных аналогов мифепристона не существует, рецептурная вся группа.
                Действующих веществ здесь два: мифепристон и мизопростол. Торговые наименования —
                Мифепрекс, Миропристон, Миролют, малые дозы для экстренной контрацепции — Женале,
                Внеплания, Гинепристон. Все отпускаются по рецепту.
              </p>
              <p className="text-base text-[var(--color-text)] leading-relaxed">
                Запрос «мифепристон аналоги без рецепта» описывает то, чего нет. Перебирать
                бренды бессмысленно: статус определяется действующим веществом и дозировкой, а не
                названием на упаковке.
              </p>
            </div>
          </details>
        </div>
      </Section>

      {/* Почему препараты для аборта рецептурные — аккордеон */}
      <Section animate={false} muted>
        <div className="max-w-3xl">
          <details className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <summary className="cursor-pointer list-none flex items-center justify-between">
              <span className="text-2xl sm:text-3xl font-semibold text-[var(--color-primary)]">
                Почему препараты для аборта рецептурные
              </span>
              <span className="text-[var(--color-primary)] group-open:rotate-180 transition-transform shrink-0 ml-3">
                ▾
              </span>
            </summary>
            <div className="mt-4 space-y-3">
              <p className="text-base text-[var(--color-text)] leading-relaxed">
                Причина не в бюрократии. Медикаментозный аборт — процедура с обязательными
                этапами, и пропуск любого из них делает её опасной.
              </p>
              <p className="text-base text-[var(--color-text)] leading-relaxed">
                Сначала нужно подтвердить маточную беременность по УЗИ. Это не формальность: при
                внематочной беременности таблетки не помогут, а время уйдёт. Дальше врач
                исключает противопоказания и подбирает схему. Затем наблюдает приём. И наконец —
                контрольный осмотр с УЗИ через 10–14 дней, чтобы убедиться, что аборт завершён.
              </p>
              <p className="text-base text-[var(--color-text)] leading-relaxed">
                Рецепт привязывает препарат к этим этапам. Без него остаются таблетки и надежда,
                что всё пройдёт само.
              </p>
            </div>
          </details>
        </div>
      </Section>

      {/* Что будет, если принять препарат самостоятельно — аккордеон */}
      <Section animate={false}>
        <div className="max-w-3xl">
          <details className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <summary className="cursor-pointer list-none flex items-center justify-between">
              <span className="text-2xl sm:text-3xl font-semibold text-[var(--color-primary)]">
                Что будет, если принять препарат самостоятельно, без врача
              </span>
              <span className="text-[var(--color-primary)] group-open:rotate-180 transition-transform shrink-0 ml-3">
                ▾
              </span>
            </summary>
            <div className="mt-4 space-y-3">
              <p className="text-base text-[var(--color-text)] leading-relaxed">
                Разберём честно, без запугивания и без утешений.
              </p>
              <p className="text-base text-[var(--color-text)] leading-relaxed">
                <span className="font-medium">Внематочная беременность.</span> Медикаментозный
                метод рассчитан на маточную и внематочную не прерывает. Симптомы смазанные,
                женщина трактует их как «обычные боли после таблеток», а труба продолжает
                растягиваться.
              </p>
              <p className="text-base text-[var(--color-text)] leading-relaxed">
                <span className="font-medium">Неполный аборт.</span> Часть плодного яйца остаётся
                в полости матки, кровотечение не останавливается, присоединяется воспаление. Это
                самая частая причина, по которой после самостоятельного приёма попадают в
                стационар.
              </p>
              <p className="text-base text-[var(--color-text)] leading-relaxed">
                <span className="font-medium">Кровотечение, которое нечем оценить.</span> Дома нет
                способа измерить объём кровопотери, а граница между «сильно» и «опасно» размыта. В
                клинике её видят по УЗИ и осмотру.
              </p>
              <p className="text-base text-[var(--color-text)] leading-relaxed">
                <span className="font-medium">
                  Влияние на плод, если беременность сохранилась.
                </span>{" "}
                Мифепристон и мизопростол способны повлиять на развитие плода, риск пороков
                развития в такой ситуации реален. Дальнейшее ведение беременности обсуждают с
                врачом, а не на форуме.
              </p>
              <p className="text-base text-[var(--color-text)] leading-relaxed">
                Здесь я не соглашусь с распространённым советом. Пишут: «главное — не пить
                таблетки, если подозреваешь внематочную, тогда всё пройдёт нормально». Подозрение
                без УЗИ не проверяется. Именно поэтому безопасного самостоятельного сценария нет —
                не потому, что кто-то решил ограничить доступ.
              </p>
            </div>
          </details>
        </div>
      </Section>

      {/* Можно ли сделать аборт бесплатно или по ОМС — аккордеон */}
      <Section animate={false} muted>
        <div className="max-w-3xl">
          <details className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <summary className="cursor-pointer list-none flex items-center justify-between">
              <span className="text-2xl sm:text-3xl font-semibold text-[var(--color-primary)]">
                Можно ли сделать медикаментозный аборт бесплатно или по ОМС
              </span>
              <span className="text-[var(--color-primary)] group-open:rotate-180 transition-transform shrink-0 ml-3">
                ▾
              </span>
            </summary>
            <div className="mt-4 space-y-3">
              <p className="text-base text-[var(--color-text)] leading-relaxed">
                Да, можно. Процедура входит в ОМС: искусственное прерывание беременности по
                желанию женщины проводят в медицинских организациях с лицензией в рамках программы
                государственных гарантий.
              </p>
              <p className="text-base text-[var(--color-text)] leading-relaxed">
                Порядок отличается от клиники к клинике. Частная назовёт сумму, государственная
                направит по программе. Запрос «можно ли сделать медикаментозный аборт по ОМС»
                стоит закрывать не общими словами, а конкретным советом: уточните в организации, к
                которой вы прикреплены, какие препараты входят в процедуру, а какие оплачиваются
                отдельно. Разница в ответах бывает неожиданной — и лучше узнать о ней до приёма, а
                не в день процедуры.
              </p>
            </div>
          </details>
        </div>
      </Section>

      {/* Источники и дисклеймер */}
      <Section animate={false}>
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--color-primary)] mb-5">
            Источники
          </h2>
          <ul className="space-y-2 list-disc list-inside">
            <li className="text-base text-[var(--color-text)]">
              Федеральный закон № 323-ФЗ, статья 56 «Искусственное прерывание беременности».
            </li>
            <li className="text-base text-[var(--color-text)]">
              Клинические рекомендации МЗ РФ по искусственному прерыванию беременности
              (медикаментозный метод). Рубрикатор:{" "}
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
              Инструкции препаратов мифепристон и мизопростол в Государственном реестре
              лекарственных средств:{" "}
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
              Перечень жизненно необходимых и важнейших лекарственных препаратов (ЖНВЛП).
            </li>
          </ul>

          <p className="mt-5 text-sm text-[var(--color-muted)] leading-relaxed">
            <span className="font-medium text-[var(--color-text)]">Дисклеймер.</span> Материал
            носит информационный характер. Он не заменяет консультацию врача и не содержит
            рекомендаций по самостоятельному приёму препаратов. Решение о методе и сроках
            принимает врач после обследования.
          </p>

          <p className="mt-6 text-base text-[var(--color-text)] leading-relaxed">
            Другие темы раздела: препараты —{" "}
            <Link
              href="/medikamentoznyj-abort/preparaty/"
              className="underline text-[var(--color-primary)] hover:text-[var(--color-accent-dark)]"
            >
              мифепристон и мизопростол
            </Link>
            , сроки —{" "}
            <Link
              href="/medikamentoznyj-abort/sroki/"
              className="underline text-[var(--color-primary)] hover:text-[var(--color-accent-dark)]"
            >
              до какого срока делают медикаментозный аборт
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
