import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";

const PAGE_TITLE = "Мифепристон и мизопростол: как действуют таблетки для медикаментозного аборта";
const LAST_REVIEWED = "2026-10-27";

export const metadata: Metadata = {
  title: "Мифепристон и мизопростол: как действуют при аборте",
  description:
    "Мифепристон и мизопростол при медикаментозном аборте: механизм действия, через сколько действуют, зачем нужны два препарата. Рецептурный статус.",
  alternates: { canonical: "/medikamentoznyj-abort/preparaty" },
};

const stagesTable: { stage: string; what: string; timing: string }[] = [
  {
    stage: "Приём мифепристона",
    what: "Блокада рецепторов прогестерона, наблюдение в клинике",
    timing: "Не менее 2 часов под наблюдением",
  },
  {
    stage: "Ожидание",
    what: "Гормональная перестройка, потеря поддержки плодного яйца",
    timing: "36–48 часов до второй таблетки",
  },
  {
    stage: "Приём мизопростола",
    what: "Сокращения миометрия, раскрытие шейки, выделения",
    timing: "Эффект в первые час-полтора",
  },
  {
    stage: "Контроль",
    what: "УЗИ, оценка завершённости, при необходимости — дообследование",
    timing: "Через 10–14 дней",
  },
];

const namesTable: { substance: string; brands: string; task: string }[] = [
  {
    substance: "Мифепристон",
    brands: "Мифепрекс, Миропристон, Мифегин",
    task: "Первый этап, блокада рецепторов прогестерона",
  },
  {
    substance: "Мизопростол",
    brands: "Миролют, Сайтотек, Топогин",
    task: "Второй этап, сокращения матки",
  },
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

export default function MedikamentozniyAbortPreparatyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Section animate={false} className="pt-14 sm:pt-20">
        <SectionHeading as="h1" title={PAGE_TITLE} />

        <div className="max-w-3xl">
          <p className="text-base text-[var(--color-text)] leading-relaxed italic">
            Материал носит информационный характер и не заменяет консультацию врача. Препараты
            рецептурные, схему и необходимость приёма определяет только врач после обследования.
          </p>

          <p className="mt-4 text-base text-[var(--color-text)] leading-relaxed">
            В схеме медикаментозного прерывания беременности участвуют два препарата, и задачи у
            них принципиально разные. Мифепристон убирает гормональную поддержку беременности: без
            неё плодное яйцо перестаёт удерживаться в матке. Мизопростол заставляет матку
            сокращаться и выталкивает то, что уже потеряло связь со стенкой.
          </p>
          <p className="mt-4 text-base text-[var(--color-text)] leading-relaxed">
            Ни один из них не рассчитан на самостоятельное применение. Оба рецептурные, оба
            принимаются по назначению врача, а первая таблетка — в медицинском учреждении, под
            наблюдением. Ниже разбираем механизм действия, сроки и то, что происходит с
            организмом на каждом этапе. Дозировки не приводим сознательно: подбирает их врач, а не
            статья в интернете.
          </p>

          <div className="mt-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-5">
            <p className="text-sm text-[var(--color-text)] font-medium">
              Материал проверен с опорой на клинические рекомендации МЗ РФ. Последняя проверка:
              27.10.2026.
            </p>
          </div>
        </div>
      </Section>

      {/* Мифепристон: что это и как работает + аккордеоны H3 */}
      <Section animate={false} muted>
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--color-primary)] mb-5">
            Мифепристон: что это и как работает
          </h2>
          <p className="text-base text-[var(--color-text)] leading-relaxed">
            Мифепристон относят к антигестагенам. Говоря проще, он блокирует рецепторы
            прогестерона — гормона, который в первые недели беременности буквально держит всё на
            месте. Пока прогестерон связывается со своими рецепторами в эндометрии и миометрии,
            слизистая матки остаётся готовой питать плодное яйцо, а мышца матки ведёт себя
            спокойно.
          </p>
          <p className="mt-4 text-base text-[var(--color-text)] leading-relaxed">
            Мифепристон занимает эти рецепторы и не даёт прогестерону работать. Развивается три
            следствия. Эндометрий перестаёт поддерживать прикрепившееся плодное яйцо. Миометрий
            теряет гормональный «тормоз» и повышает тонус. Одновременно растёт чувствительность
            матки к простагландинам — и это второй препарат схемы делает особенно важным.
          </p>
          <p className="mt-4 text-base text-[var(--color-text)] leading-relaxed mb-6">
            Отдельно стоит сказать про форму выпуска. Мифепристон таблетки — единственная форма,
            которая используется в этой схеме; никаких инъекций и свечей в инструкции нет.
            Принимают внутрь, однократно, в присутствии врача.
          </p>

          <div className="space-y-3">
            <details className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <summary className="cursor-pointer font-medium text-[var(--color-text)] list-none flex items-center justify-between">
                Через сколько действует мифепристон
                <span className="text-[var(--color-primary)] group-open:rotate-180 transition-transform shrink-0 ml-3">
                  ▾
                </span>
              </summary>
              <div className="mt-3 space-y-3">
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  Мгновенного эффекта нет, и ждать его через пятнадцать минут бессмысленно.
                  Инструкция описывает однократный приём и обязательное наблюдение в клинике не
                  менее двух часов: этот интервал нужен, чтобы врач убедился, что нет острой
                  реакции на препарат. Дальше гормональная перестройка разворачивается в течение
                  первых суток. Окончательный результат оценивают не по ощущениям, а по второй
                  таблетке и контрольному УЗИ через 10–14 дней.
                </p>
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  Часть запросов «мифепристон через сколько действует» подразумевает «когда всё
                  закончится». Тут ответ честнее: сама по себе первая таблетка не завершает
                  процесс, она готовит почву.
                </p>
              </div>
            </details>

            <details className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <summary className="cursor-pointer font-medium text-[var(--color-text)] list-none flex items-center justify-between">
                Сколько действует мифепристон
                <span className="text-[var(--color-primary)] group-open:rotate-180 transition-transform shrink-0 ml-3">
                  ▾
                </span>
              </summary>
              <div className="mt-3 space-y-3">
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  Препарат принимают один раз, и повторять таблетку самостоятельно нельзя ни при
                  каких обстоятельствах. Действие не прекращается через час по часам: изменения
                  рецепторов и эндометрия запускают цепочку, которая продолжается, пока схема не
                  завершена. Уровень гормонов и состояние слизистой возвращаются к исходным не
                  сразу — на это уходит цикл, иногда два.
                </p>
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  Именно поэтому контрольное УЗИ через 10–14 дней не формальность. Оно показывает,
                  завершился ли процесс, и это единственный надёжный критерий.
                </p>
              </div>
            </details>

            <details className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <summary className="cursor-pointer font-medium text-[var(--color-text)] list-none flex items-center justify-between">
                Почему его принимают в присутствии врача
                <span className="text-[var(--color-primary)] group-open:rotate-180 transition-transform shrink-0 ml-3">
                  ▾
                </span>
              </summary>
              <div className="mt-3 space-y-3">
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  Требование наблюдения не менее двух часов прописано в инструкции, и причины у
                  него практические. Возможна индивидуальная реакция на препарат. Возможно
                  кровотечение, интенсивность которого в первые часы предсказать трудно. Нужен
                  осмотр, чтобы понять, что всё идёт по ожидаемому сценарию.
                </p>
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  Есть и второй слой: до приёма врач подтверждает по УЗИ срок и локализацию
                  беременности. При внематочной беременности схема не работает и требует совсем
                  другой тактики, а принять таблетку «вслепую» значит потерять время.
                </p>
              </div>
            </details>
          </div>
        </div>
      </Section>

      {/* Мизопростол: зачем нужен второй препарат + аккордеоны H3 */}
      <Section animate={false}>
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--color-primary)] mb-5">
            Мизопростол: зачем нужен второй препарат
          </h2>
          <p className="text-base text-[var(--color-text)] leading-relaxed">
            Мизопростол — синтетический аналог простагландина Е1. Простагландины в организме
            отвечают за сокращения гладкой мускулатуры, и в матке у них своя работа. Мизопростол
            усиливает тонус и амплитуду сокращений миометрия, размягчает и раскрывает шейку матки.
          </p>
          <p className="mt-4 text-base text-[var(--color-text)] leading-relaxed mb-6">
            Применение мизопростола в этой схеме подчинено первому этапу: матка должна быть уже
            лишена гормональной поддержки, иначе сокращения не дадут нужного результата. Интервал
            между таблетками в инструкции обозначен как 36–48 часов.
          </p>

          <div className="space-y-3">
            <details className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <summary className="cursor-pointer font-medium text-[var(--color-text)] list-none flex items-center justify-between">
                Через сколько начинает действовать мизопростол
                <span className="text-[var(--color-primary)] group-open:rotate-180 transition-transform shrink-0 ml-3">
                  ▾
                </span>
              </summary>
              <div className="mt-3 space-y-3">
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  Быстрее, чем мифепристон. По инструкции и клиническим описаниям эффект
                  развивается в первые час-полтора после приёма внутрь: появляются схваткообразные
                  ощущения, начинаются кровянистые выделения. Точные минуты у разных женщин
                  расходятся, и это нормально.
                </p>
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  Запрос «мизопростол через сколько начинается» часто задают те, кто уже принял
                  таблетку дома и ждёт. Если прошло больше двух часов, а ничего не меняется,
                  звонить врачу нужно всё равно: тишина после второй таблетки — тоже повод для
                  осмотра, а не для ожидания до утра.
                </p>
              </div>
            </details>

            <details className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <summary className="cursor-pointer font-medium text-[var(--color-text)] list-none flex items-center justify-between">
                Сколько длится действие
                <span className="text-[var(--color-primary)] group-open:rotate-180 transition-transform shrink-0 ml-3">
                  ▾
                </span>
              </summary>
              <div className="mt-3 space-y-3">
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  Сокращения и кровянистые выделения обычно держатся несколько часов, у кого-то
                  дольше. Матка продолжает сокращаться и в следующие сутки, но уже слабее.
                  Оценивать завершённость по тому, как долго тянуло живот, нельзя.
                </p>
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  Тошнота, озноб, подъём температуры после второй таблетки — типичная реакция на
                  простагландин, а не признак осложнения. В инструкции эти эффекты описаны прямо.
                  Тревожный сигнал другой: кровотечение, при котором прокладка меняется каждый
                  час, или температура выше обозначенной врачом границы.
                </p>
              </div>
            </details>

            <details className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <summary className="cursor-pointer font-medium text-[var(--color-text)] list-none flex items-center justify-between">
                Что чувствует женщина после второй таблетки
                <span className="text-[var(--color-primary)] group-open:rotate-180 transition-transform shrink-0 ml-3">
                  ▾
                </span>
              </summary>
              <div className="mt-3 space-y-3">
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  Схваткообразная боль внизу живота, похожая на менструальную, только сильнее.
                  Кровянистые выделения, иногда со сгустками. Тошнота, головокружение, ощущение
                  озноба, подъём температуры тела.
                </p>
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  Обезболивающее в этот момент не универсально: нестероидные противовоспалительные
                  средства могут ослабить действие препаратов, поэтому их приём согласуют с врачом
                  заранее, а не ищут в аптечке по факту.
                </p>
              </div>
            </details>
          </div>
        </div>
      </Section>

      {/* Почему эти препараты применяют только вместе + таблица — НЕ сворачивать */}
      <Section animate={false} muted>
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--color-primary)] mb-5">
            Почему эти препараты применяют только вместе
          </h2>
          <p className="text-base text-[var(--color-text)] leading-relaxed">
            Схема из двух этапов описывает не удобство, а механику. Мифепристон снимает
            гормональную защиту беременности, но сам по себе не обеспечивает достаточных
            сокращений. Мизопростол вызывает сокращения, однако без первого этапа они не приводят
            к прерыванию.
          </p>
          <p className="mt-4 text-base text-[var(--color-text)] leading-relaxed font-medium">
            Мизопростол без мифепристона для этой цели не применяется. Точка.
          </p>
          <p className="mt-4 text-base text-[var(--color-text)] leading-relaxed">
            Распространённое заблуждение: вторая таблетка считается главной, а первая —
            подготовкой, которую можно проскочить или заменить. На практике всё наоборот по
            значимости последовательности, и интервал 36–48 часов не сокращают ради «ускорения».
            Инструкция даёт именно такой разрыв, и он связан с тем, насколько успели измениться
            рецепторы и тонус матки.
          </p>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[var(--color-surface-muted)]">
                  <th className="border border-[var(--color-border)] px-4 py-3 text-left font-semibold text-[var(--color-primary)]">
                    Этап
                  </th>
                  <th className="border border-[var(--color-border)] px-4 py-3 text-left font-semibold text-[var(--color-primary)]">
                    Что происходит
                  </th>
                  <th className="border border-[var(--color-border)] px-4 py-3 text-left font-semibold text-[var(--color-primary)]">
                    Ориентир по времени
                  </th>
                </tr>
              </thead>
              <tbody>
                {stagesTable.map((row) => (
                  <tr key={row.stage} className="bg-[var(--color-surface)]">
                    <td className="border border-[var(--color-border)] px-4 py-3 text-[var(--color-text)] font-medium">
                      {row.stage}
                    </td>
                    <td className="border border-[var(--color-border)] px-4 py-3 text-[var(--color-text)]">
                      {row.what}
                    </td>
                    <td className="border border-[var(--color-border)] px-4 py-3 text-[var(--color-text)]">
                      {row.timing}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      {/* Названия и торговые формы + таблица — НЕ сворачивать + аккордеон */}
      <Section animate={false}>
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--color-primary)] mb-5">
            Названия и торговые формы
          </h2>
          <p className="text-base text-[var(--color-text)] leading-relaxed">
            Действующих веществ в схеме два, а торговых наименований больше. Разбираться в них
            полезно хотя бы для того, чтобы понимать, о чём говорит врач и что написано в
            назначении.
          </p>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[var(--color-surface-muted)]">
                  <th className="border border-[var(--color-border)] px-4 py-3 text-left font-semibold text-[var(--color-primary)]">
                    Действующее вещество
                  </th>
                  <th className="border border-[var(--color-border)] px-4 py-3 text-left font-semibold text-[var(--color-primary)]">
                    Торговые наименования
                  </th>
                  <th className="border border-[var(--color-border)] px-4 py-3 text-left font-semibold text-[var(--color-primary)]">
                    Задача в схеме
                  </th>
                </tr>
              </thead>
              <tbody>
                {namesTable.map((row) => (
                  <tr key={row.substance} className="bg-[var(--color-surface)]">
                    <td className="border border-[var(--color-border)] px-4 py-3 text-[var(--color-text)] font-medium">
                      {row.substance}
                    </td>
                    <td className="border border-[var(--color-border)] px-4 py-3 text-[var(--color-text)]">
                      {row.brands}
                    </td>
                    <td className="border border-[var(--color-border)] px-4 py-3 text-[var(--color-text)]">
                      {row.task}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-base text-[var(--color-text)] leading-relaxed mb-6">
            Показания у торговых форм одного вещества могут различаться, и это ещё одна причина,
            по которой схему назначает врач, а не поисковая выдача. Никаких рекомендаций «что
            лучше» здесь нет и быть не может.
          </p>

          <div className="space-y-3">
            <details className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <summary className="cursor-pointer font-medium text-[var(--color-text)] list-none flex items-center justify-between">
                Мифепристон в дозе 10 мг — это не для аборта
                <span className="text-[var(--color-primary)] group-open:rotate-180 transition-transform shrink-0 ml-3">
                  ▾
                </span>
              </summary>
              <div className="mt-3 space-y-3">
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  Самое частое смешение в этой теме. В аптеках встречаются препараты мифепристона в
                  дозе 10 мг — Женале, Внеплания, Гинепристон. Их назначение — экстренная
                  контрацепция, то есть предотвращение беременности в первые часы и сутки после
                  незащищённого контакта, до имплантации.
                </p>
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  Доза 10 мг недостаточна, чтобы прервать уже наступившую беременность, и
                  инструкции этих препаратов такой задачи не содержат. Механизм тот же — блокада
                  рецепторов прогестерона, — но количества действующего вещества не хватает для
                  нужного эффекта на матку и плодное яйцо.
                </p>
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  Отсюда типичная ошибка: «я видела мифепристон в аптеке, значит можно обойтись без
                  клиники». Видеть можно, обойтись нельзя. Рецептурный статус у малых доз такой же
                  рецептурный, а результат приёма вместо схемы предсказать невозможно.
                </p>
              </div>
            </details>
          </div>
        </div>
      </Section>

      {/* Рецептурный статус — НЕ сворачивать */}
      <Section animate={false} muted>
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--color-primary)] mb-5">
            Рецептурный статус
          </h2>
          <p className="text-base text-[var(--color-text)] leading-relaxed">
            Мифепристон и мизопростол рецептурные. Отпускаются по рецепту врача, применяются в
            медицинской организации с лицензией, самостоятельно не назначаются и не
            корректируются. Мизопростол дополнительно входит в перечень ЖНВЛП.
          </p>
          <p className="mt-4 text-base text-[var(--color-text)] leading-relaxed">
            Об этом всё. Подробности покупки, цен и наличия в аптеках остаются за рамками этой
            страницы: тема не про приобретение, а про понимание того, что происходит с
            организмом.
          </p>
        </div>
      </Section>

      {/* Побочные эффекты препаратов + аккордеон */}
      <Section animate={false}>
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--color-primary)] mb-5">
            Побочные эффекты препаратов
          </h2>
          <p className="text-base text-[var(--color-text)] leading-relaxed">
            Инструкции описывают сходный набор реакций у обоих препаратов: тошнота, рвота,
            головная боль, головокружение, слабость, дискомфорт внизу живота, подъём температуры
            тела. У мизопростола к этому добавляются диарея и озноб, что связано с его природой
            простагландина.
          </p>
          <p className="mt-4 text-base text-[var(--color-text)] leading-relaxed mb-6">
            Большая часть реакций проходит в течение суток. Повод связаться с врачом — не сам
            факт тошноты, а нарастающая слабость, обильное кровотечение, высокая температура.
          </p>

          <div className="space-y-3">
            <details className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <summary className="cursor-pointer font-medium text-[var(--color-text)] list-none flex items-center justify-between">
                Чем отличаются побочные эффекты мифепристона и мизопростола
                <span className="text-[var(--color-primary)] group-open:rotate-180 transition-transform shrink-0 ml-3">
                  ▾
                </span>
              </summary>
              <div className="mt-3 space-y-3">
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  Мифепристон чаще даёт общие реакции: тошноту, головную боль, слабость,
                  головокружение. Они развиваются в первые часы после приёма, пока препарат
                  всасывается.
                </p>
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  Мизопростол бьёт по кишечнику и терморегуляции заметнее: диарея и озноб после
                  второй таблетки встречаются закономерно, потому что простагландин действует на
                  гладкую мускулатуру не только матки. Схваткообразные боли тоже его «почерк».
                </p>
              </div>
            </details>
          </div>
        </div>
      </Section>

      {/* Чего нельзя делать при приёме — НЕ сворачивать */}
      <Section animate={false} muted>
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--color-primary)] mb-5">
            Чего нельзя делать при приёме
          </h2>
          <p className="text-base text-[var(--color-text)] leading-relaxed">
            Нестероидные противовоспалительные средства способны снижать эффективность
            мифепристона — это прямо указано в инструкции. Аспирин, индометацин и прочие препараты
            этой группы не принимают в период схемы без согласования с врачом. Обезболивающее
            нужно обсудить заранее, до первой таблетки, а не искать на полке в момент боли.
          </p>
          <p className="mt-4 text-base text-[var(--color-text)] leading-relaxed">
            Алкоголь в дни схемы исключают. Он усиливает головокружение и слабость, мешает
            оценивать собственное состояние.
          </p>
          <p className="mt-4 text-base text-[var(--color-text)] leading-relaxed">
            Самостоятельная корректировка схемы — самая дорогая ошибка. Повторный приём таблетки
            «потому что не сработало», сокращение интервала, отказ от второй таблетки, пропуск
            контрольного УЗИ: каждый из этих шагов ломает либо результат, либо безопасность.
            Пропущенный контроль опаснее всех побочных эффектов вместе: неполное опорожнение
            полости матки долго не даёт ярких симптомов, а обнаруживается позже и лечится сложнее.
          </p>
          <p className="mt-4 text-base text-[var(--color-text)] leading-relaxed">
            Если после схемы вы не пришли на УЗИ через 10–14 дней, назначьте его сами. Это
            единственное действие, которое в этой теме стоит проявить без напоминания врача.
          </p>
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
              Инструкции по медицинскому применению препаратов мифепристона и мизопростола (ГРЛС
              Минздрава России):{" "}
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
              Клинические рекомендации по медикаментозному прерыванию беременности:{" "}
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

          <h2 className="mt-10 text-2xl sm:text-3xl font-semibold text-[var(--color-primary)] mb-5">
            Дисклеймер
          </h2>
          <p className="text-sm text-[var(--color-muted)] leading-relaxed">
            Материал носит информационный характер и не заменяет консультацию врача. Препараты
            рецептурные, схему и необходимость приёма определяет только врач после обследования.
          </p>

          <p className="mt-6 text-base text-[var(--color-text)] leading-relaxed">
            Другие темы раздела: без рецепта —{" "}
            <Link
              href="/medikamentoznyj-abort/bez-recepta/"
              className="underline text-[var(--color-primary)] hover:text-[var(--color-accent-dark)]"
            >
              почему нельзя купить препараты самостоятельно
            </Link>
            , ограничения —{" "}
            <Link
              href="/medikamentoznyj-abort/protivopokazaniya/"
              className="underline text-[var(--color-primary)] hover:text-[var(--color-accent-dark)]"
            >
              противопоказания и последствия
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
