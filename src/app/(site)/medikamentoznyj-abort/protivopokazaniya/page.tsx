import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";

const PAGE_TITLE = "Медикаментозный аборт: противопоказания, риски и последствия";
const LAST_REVIEWED = "2026-10-27";

export const metadata: Metadata = {
  title: "Медикаментозный аборт: противопоказания, риски, последствия",
  description:
    "Противопоказания к медикаментозному аборту, осложнения и их причины, восстановление цикла и риски для фертильности. По инструкциям и клинрекомендациям.",
  alternates: { canonical: "/medikamentoznyj-abort/protivopokazaniya" },
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

export default function MedikamentozniyAbortProtivopokazaniyaPage() {
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
            Таблетки вместо инструментов звучит мягче, чем есть на самом деле. Медикаментозное
            прерывание беременности действительно менее травматично для матки, чем
            вакуум-аспирация или кюретаж: инструмент в полость матки не вводят, механическое
            повреждение эндометрия минимально. На этом щадящие свойства заканчиваются и начинается
            обычная медицина. Мифепристон блокирует прогестероновые рецепторы, мизопростол
            вызывает сокращение миометрия: оба препарата действуют на весь организм, и у каждого
            есть свой перечень состояний, при которых применять их нельзя.
          </p>
          <p className="mt-4 text-base text-[var(--color-text)] leading-relaxed">
            Осложнения после медикаментозного аборта почти всегда имеют объяснение. Пропущенное
            УЗИ до процедуры. Приём обезболивающего в дни схемы. Отсутствие контрольного осмотра
            через две недели. Позднее обращение, когда кровотечение идёт уже несколько дней и
            терпение заканчивается раньше, чем тревога. Разбор ниже построен так, чтобы вы
            понимали логику риска, а не запоминали список страшных слов.
          </p>
          <p className="mt-4 text-sm text-[var(--color-muted)] leading-relaxed">
            <span className="font-medium text-[var(--color-text)]">Дисклеймер.</span> Информация
            носит справочный характер и не заменяет консультацию врача. Мифепристон и мизопростол
            отпускаются по рецепту, схему и дозировки подбирает врач после обследования. Никаких
            процентов и статистики в тексте нет там, где источник их не приводит.
          </p>

          <div className="mt-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-5">
            <p className="text-sm text-[var(--color-text)] font-medium">
              Материал проверен с опорой на клинические рекомендации МЗ РФ. Последняя проверка:
              27.10.2026.
            </p>
          </div>
        </div>
      </Section>

      {/* Противопоказания — H2 раскрыт */}
      <Section animate={false} muted>
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--color-primary)] mb-5">
            Противопоказания к медикаментозному аборту
          </h2>

          {/* Абсолютные противопоказания — НЕ сворачивать, ключевой для безопасности список */}
          <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-4">
            Абсолютные противопоказания
          </h3>
          <p className="text-base text-[var(--color-text)] leading-relaxed mb-5">
            Это состояния, при которых метод не применяют. Не «лучше воздержаться», а именно не
            применяют.
          </p>
          <ul className="space-y-3 list-disc list-inside">
            <li className="text-base text-[var(--color-text)] leading-relaxed">
              <span className="font-medium">
                Подозрение на внематочную беременность или невозможность её исключить.
              </span>{" "}
              Мифепристон прерывает беременность в полости матки, на плодное яйцо в трубе он не
              действует нужным образом. Если локализацию не подтвердили, схему не назначают: риск
              разрыва трубы перевешивает любые удобства метода.
            </li>
            <li className="text-base text-[var(--color-text)] leading-relaxed">
              <span className="font-medium">Беременность без подтверждения по УЗИ.</span> Без
              снимка нельзя ни установить срок, ни увидеть, где прикрепилось плодное яйцо. Это не
              формальность, а единственный способ не пропустить внематочную.
            </li>
            <li className="text-base text-[var(--color-text)] leading-relaxed">
              <span className="font-medium">Срок больше 42 дней аменореи.</span> Ориентир
              российских клинических рекомендаций. ВОЗ допускает схемы до 63 дней, но конкретная
              клиника работает по своему протоколу, и уточнять нужно у неё, а не по статьям в
              интернете.
            </li>
            <li className="text-base text-[var(--color-text)] leading-relaxed">
              <span className="font-medium">
                Индивидуальная непереносимость мифепристона или мизопростола
              </span>
              , включая аллергию на простагландины.
            </li>
            <li className="text-base text-[var(--color-text)] leading-relaxed">
              <span className="font-medium">Острая почечная или печёночная недостаточность.</span>{" "}
              Оба препарата метаболизируются печенью и выводятся почками.
            </li>
            <li className="text-base text-[var(--color-text)] leading-relaxed">
              <span className="font-medium">
                Надпочечниковая недостаточность и длительный приём глюкокортикоидов.
              </span>{" "}
              Мифепристон обладает антиглюкокортикоидным действием, поэтому эти состояния прямо
              указаны в инструкции. Там же упомянута порфирия.
            </li>
            <li className="text-base text-[var(--color-text)] leading-relaxed">
              <span className="font-medium">
                Нарушения свёртываемости крови, приём антикоагулянтов.
              </span>{" "}
              Кровотечение входит в число ожидаемых эффектов схемы, и добавлять к нему
              разжиженную кровь опасно.
            </li>
            <li className="text-base text-[var(--color-text)] leading-relaxed">
              <span className="font-medium">
                Острые воспалительные процессы органов малого таза и острые инфекции.
              </span>{" "}
              Сначала лечение, потом прерывание.
            </li>
          </ul>

          {/* Относительные и спорные случаи — под аккордеон */}
          <h3 className="text-xl font-semibold text-[var(--color-primary)] mt-8 mb-4">
            Относительные и спорные случаи
          </h3>
          <p className="text-base text-[var(--color-text)] leading-relaxed mb-5">
            Здесь решение принимают по совокупности данных, а не по одному пункту из списка.
            Медикаментозный аборт противопоказания имеет и в этой группе, но они не отменяют
            метод автоматически.
          </p>

          <div className="space-y-3">
            <details className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <summary className="cursor-pointer font-medium text-[var(--color-text)] list-none flex items-center justify-between">
                Миома матки
                <span className="text-[var(--color-primary)] group-open:rotate-180 transition-transform shrink-0 ml-3">
                  ▾
                </span>
              </summary>
              <p className="mt-3 text-base text-[var(--color-text)] leading-relaxed">
                Крупные узлы, особенно с деформацией полости, ухудшают сократимость миометрия.
                Эффективность схемы падает, а риск неполного аборта растёт. Небольшие узлы
                обычно не мешают.
              </p>
            </details>

            <details className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <summary className="cursor-pointer font-medium text-[var(--color-text)] list-none flex items-center justify-between">
                Рубец на матке
                <span className="text-[var(--color-primary)] group-open:rotate-180 transition-transform shrink-0 ml-3">
                  ▾
                </span>
              </summary>
              <p className="mt-3 text-base text-[var(--color-text)] leading-relaxed">
                Распространённое мнение: при рубце медикаментозный метод выбирают как более
                щадящий. Логика верная лишь наполовину. Инструмент в матку не входит, это плюс.
                Но если аборт окажется неполным, понадобится вакуум-аспирация или выскабливание,
                а это уже вмешательство на матке с рубцом. Взвешивать нужно оба сценария, а не
                только первый.
              </p>
            </details>

            <details className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <summary className="cursor-pointer font-medium text-[var(--color-text)] list-none flex items-center justify-between">
                Анемия
                <span className="text-[var(--color-primary)] group-open:rotate-180 transition-transform shrink-0 ml-3">
                  ▾
                </span>
              </summary>
              <p className="mt-3 text-base text-[var(--color-text)] leading-relaxed">
                Мифепристон и мизопростол вызывают кровянистые выделения, иногда обильные. При
                исходно низком гемоглобине запас прочности меньше. Выраженная анемия требует
                коррекции до процедуры.
              </p>
            </details>

            <details className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <summary className="cursor-pointer font-medium text-[var(--color-text)] list-none flex items-center justify-between">
                Курение
                <span className="text-[var(--color-primary)] group-open:rotate-180 transition-transform shrink-0 ml-3">
                  ▾
                </span>
              </summary>
              <p className="mt-3 text-base text-[var(--color-text)] leading-relaxed">
                Влияет на тонус сосудов и заживление, входит в перечень факторов, которые врач
                уточняет на консультации. Само по себе не закрывает метод.
              </p>
            </details>

            <details className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <summary className="cursor-pointer font-medium text-[var(--color-text)] list-none flex items-center justify-between">
                Возраст
                <span className="text-[var(--color-primary)] group-open:rotate-180 transition-transform shrink-0 ml-3">
                  ▾
                </span>
              </summary>
              <p className="mt-3 text-base text-[var(--color-text)] leading-relaxed">
                Юный и поздний репродуктивный возраст учитывают при выборе метода, но границы
                здесь размытые. В инструкциях возраст не указан как абсолютное противопоказание.
              </p>
            </details>
          </div>

          {/* Когда метод просто не подходит — раскрыт */}
          <h3 className="text-xl font-semibold text-[var(--color-primary)] mt-8 mb-4">
            Когда метод просто не подходит
          </h3>
          <p className="text-base text-[var(--color-text)] leading-relaxed mb-5">
            Бывает, что противопоказаний нет, а метод всё равно не годится.
          </p>
          <ul className="space-y-3 list-disc list-inside">
            <li className="text-base text-[var(--color-text)] leading-relaxed">
              <span className="font-medium">Срок.</span> За пределами 42 дней аменореи схема
              теряет надёжность, и обсуждают другие варианты.
            </li>
            <li className="text-base text-[var(--color-text)] leading-relaxed">
              <span className="font-medium">Внутриматочная спираль в полости матки.</span> Её
              удаляют до процедуры: инородное тело мешает сокращению матки и повышает риск
              воспаления.
            </li>
            <li className="text-base text-[var(--color-text)] leading-relaxed">
              <span className="font-medium">Невозможность прийти на контрольный осмотр.</span>{" "}
              Схема требует УЗИ или осмотра через 10–14 дней. Если человек уезжает или не
              собирается возвращаться, лучше выбрать метод с одномоментным результатом, чем
              остаться без подтверждения, что всё завершилось.
            </li>
            <li className="text-base text-[var(--color-text)] leading-relaxed">
              <span className="font-medium">
                Отсутствие доступа к хирургии на случай неэффективности.
              </span>{" "}
              Редко, но препарат может не сработать, и тогда нужна клиника, где помогут в тот же
              день.
            </li>
          </ul>
        </div>
      </Section>

      {/* Возможные осложнения и их частота — H2 раскрыт, H3 под аккордеоны */}
      <Section animate={false}>
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--color-primary)] mb-5">
            Возможные осложнения и их частота
          </h2>
          <p className="text-base text-[var(--color-text)] leading-relaxed mb-6">
            Частоту в этом тексте я намеренно не указываю числом. Инструкции описывают осложнения
            качественно, без процентов, а разброс между исследованиями слишком велик, чтобы одна
            цифра что-то объясняла. Куда полезнее понимать механизм каждого осложнения и то, как
            его выявляют.
          </p>

          <div className="space-y-3">
            <details className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <summary className="cursor-pointer font-medium text-[var(--color-text)] list-none flex items-center justify-between">
                Неполный аборт
                <span className="text-[var(--color-primary)] group-open:rotate-180 transition-transform shrink-0 ml-3">
                  ▾
                </span>
              </summary>
              <div className="mt-3 space-y-3">
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  Часть плодного яйца остаётся в полости матки. Матка сокращается не полностью,
                  кровянистые выделения затягиваются, появляются тянущие боли и иногда повышение
                  температуры. Неполный аборт — главная причина, по которой контрольный осмотр не
                  отменяют ни при каких обстоятельствах: снаружи отличить завершившийся аборт от
                  неполного невозможно.
                </p>
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  Выявляют по УЗИ и уровню ХГЧ в динамике. Дальше тактика зависит от объёма
                  остатков: наблюдение, медикаментозная поддержка или вакуум-аспирация. Затягивать
                  не стоит, потому что остатки в матке — открытые ворота для инфекции.
                </p>
              </div>
            </details>

            <details className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <summary className="cursor-pointer font-medium text-[var(--color-text)] list-none flex items-center justify-between">
                Продолжающаяся беременность
                <span className="text-[var(--color-primary)] group-open:rotate-180 transition-transform shrink-0 ml-3">
                  ▾
                </span>
              </summary>
              <div className="mt-3 space-y-3">
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  Схема не сработала, беременность развивается дальше. Ситуация редкая, но именно
                  здесь в инструкции к мифепристону содержится важное указание: при отсутствии
                  эффекта на 10–14 день беременность необходимо прервать другим способом из-за
                  риска пороков развития плода. Препарат не должен остаться в организме «на
                  всякий случай».
                </p>
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  Отсюда практический вывод. Если после схемы тест положительный, а УЗИ не
                  подтвердило полное опорожнение, нельзя ждать ещё месяц и надеяться. Обсуждать с
                  врачом дальнейшие шаги нужно сразу.
                </p>
              </div>
            </details>

            <details className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <summary className="cursor-pointer font-medium text-[var(--color-text)] list-none flex items-center justify-between">
                Кровотечение
                <span className="text-[var(--color-primary)] group-open:rotate-180 transition-transform shrink-0 ml-3">
                  ▾
                </span>
              </summary>
              <div className="mt-3 space-y-3">
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  Кровянистые выделения после схемы ожидаемы, это часть механизма. Опасность
                  представляет объём, а не факт. Ориентир, при котором нужна помощь немедленно:
                  прокладка промокает за час в течение двух часов подряд, кровь идёт со сгустками
                  крупнее грецкого ореха, появляются слабость, головокружение, бледность, шум в
                  ушах. При кровотечении после аборта не ждут утра и не пьют кровоостанавливающее
                  из домашней аптечки. Едут в клинику или вызывают скорую.
                </p>
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  Отдельно про обезболивание. Аспирин и другие нестероидные противовоспалительные
                  средства ослабляют действие мифепристона, поэтому в дни схемы их не принимают.
                  Это указано в инструкции и это же чаще всего нарушают, когда боль усиливается и
                  человек тянется за привычной таблеткой.
                </p>
              </div>
            </details>

            <details className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <summary className="cursor-pointer font-medium text-[var(--color-text)] list-none flex items-center justify-between">
                Воспалительные осложнения
                <span className="text-[var(--color-primary)] group-open:rotate-180 transition-transform shrink-0 ml-3">
                  ▾
                </span>
              </summary>
              <p className="mt-3 text-base text-[var(--color-text)] leading-relaxed">
                Эндометрит после медикаментозного аборта развивается реже, чем после
                инструментального, но не исчезает совсем. Причины те же: остатки в полости матки,
                невылеченные инфекции до процедуры, несоблюдение ограничений после. Признаки —
                температура выше 37,5, боли внизу живота, неприятный запах выделений. Хронические
                инфекции мочеполовой системы лучше санировать до, а не после.
              </p>
            </details>

            <details className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <summary className="cursor-pointer font-medium text-[var(--color-text)] list-none flex items-center justify-between">
                Гормональный сбой и нарушения цикла
                <span className="text-[var(--color-primary)] group-open:rotate-180 transition-transform shrink-0 ml-3">
                  ▾
                </span>
              </summary>
              <p className="mt-3 text-base text-[var(--color-text)] leading-relaxed">
                Мифепристон вмешивается в работу рецепторов прогестерона, и это сказывается на
                гипоталамо-гипофизарно-яичниковой оси. Гормональный сбой после аборта проявляется
                задержкой менструации, изменением её обильности, межменструальными выделениями,
                перепадами настроения и нагрубанием молочных желез. Чаще всего это проходит в
                течение одного-двух циклов. Затянувшийся сбой, отсутствие менструации дольше
                шести недель, появление acne или резкое изменение веса — повод сдать гормоны и
                показаться врачу.
              </p>
            </details>
          </div>
        </div>
      </Section>

      {/* Последствия для организма в перспективе — H2 раскрыт, H3 под аккордеоны */}
      <Section animate={false} muted>
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--color-primary)] mb-5">
            Последствия для организма в перспективе
          </h2>

          <div className="space-y-3">
            <details className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <summary className="cursor-pointer font-medium text-[var(--color-text)] list-none flex items-center justify-between">
                Влияет ли на фертильность
                <span className="text-[var(--color-primary)] group-open:rotate-180 transition-transform shrink-0 ml-3">
                  ▾
                </span>
              </summary>
              <div className="mt-3 space-y-3">
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  При неосложнённом течении и соблюдённом протоколе данных о снижении фертильности
                  после медикаментозного аборта нет. Механизм восстановления понятен: после
                  снижения уровня гормонов ось возобновляет циклическую работу, эндометрий
                  отрастает заново.
                </p>
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  Разговор о последствиях медикаментозного прерывания беременности имеет смысл
                  вести не про сам метод, а про то, чем он закончился. Осложнения и повторные
                  вмешательства влияют на репродуктивную функцию куда ощутимее, чем две таблетки.
                </p>
              </div>
            </details>

            <details className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <summary className="cursor-pointer font-medium text-[var(--color-text)] list-none flex items-center justify-between">
                Есть ли риск бесплодия
                <span className="text-[var(--color-primary)] group-open:rotate-180 transition-transform shrink-0 ml-3">
                  ▾
                </span>
              </summary>
              <div className="mt-3 space-y-3">
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  Прямая причинно-следственная связь «медикаментозный аборт → бесплодие» не
                  доказана. Бесплодие после аборта связывают с другими механизмами:
                  воспалительными процессами и образованием спаек в маточной трубе, повреждением
                  эндометрия при многократных выскабливаниях. Медикаментозная схема эндометрий
                  механически не травмирует, и в этом её основное преимущество.
                </p>
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  Осторожность нужна в другом. Если неполный аборт осложнился эндометритом, а его
                  лечили позже, чем следовало, риск спаечного процесса в трубах возрастает.
                  Повторные прерывания подряд, без восстановления цикла, тоже не проходят
                  бесследно. Так что вопрос не в таблетках, а в том, сколько раз и в каких
                  условиях.
                </p>
              </div>
            </details>

            <details className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <summary className="cursor-pointer font-medium text-[var(--color-text)] list-none flex items-center justify-between">
                Как быстро восстанавливается цикл
                <span className="text-[var(--color-primary)] group-open:rotate-180 transition-transform shrink-0 ml-3">
                  ▾
                </span>
              </summary>
              <div className="mt-3 space-y-3">
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  Восстановление после аборта начинается сразу после завершения схемы. Первая
                  менструация обычно приходит в течение месяца-полутора после процедуры, иногда
                  позже. Задержка до шести недель укладывается в ожидания, но каждая неделя сверх
                  этого требует осмотра.
                </p>
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  Что помогает восстановлению: сон, нормальное питание с достатком железа, отказ
                  от интенсивных нагрузок в первые недели. Контрацепцию подбирают сразу после
                  аборта, потому что овуляция может произойти до первой менструации, и наступившая
                  беременность в первом же цикле — реальный сценарий, а не теоретический.
                </p>
              </div>
            </details>
          </div>
        </div>
      </Section>

      {/* Что повышает риск осложнений — раскрыт */}
      <Section animate={false}>
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--color-primary)] mb-5">
            Что повышает риск осложнений
          </h2>
          <ul className="space-y-3 list-disc list-inside">
            <li className="text-base text-[var(--color-text)] leading-relaxed">
              <span className="font-medium">Поздний срок обращения.</span> Чем ближе к границе 42
              дней, тем выше вероятность неполного аборта.
            </li>
            <li className="text-base text-[var(--color-text)] leading-relaxed">
              <span className="font-medium">Отсутствие УЗИ до процедуры.</span> Один пропущенный
              снимок закрывает путь к своевременному выявлению внематочной беременности.
            </li>
            <li className="text-base text-[var(--color-text)] leading-relaxed">
              <span className="font-medium">Самолечение и покупка препаратов вне клиники.</span>{" "}
              Рецептурный статус существует не для усложнения жизни.
            </li>
            <li className="text-base text-[var(--color-text)] leading-relaxed">
              <span className="font-medium">Несоблюдение протокола.</span> Пропущенная вторая
              часть схемы, самостоятельная отмена, приём НПВС.
            </li>
            <li className="text-base text-[var(--color-text)] leading-relaxed">
              <span className="font-medium">Повторные прерывания с коротким интервалом.</span>{" "}
              Организму нужен цикл на восстановление.
            </li>
            <li className="text-base text-[var(--color-text)] leading-relaxed">
              <span className="font-medium">Недолеченные хронические инфекции.</span> Воспаление в
              малом тазу до процедуры повышает риск эндометрита.
            </li>
            <li className="text-base text-[var(--color-text)] leading-relaxed">
              <span className="font-medium">Отсутствие контрольного осмотра.</span> Самая частая
              причина, по которой осложнение находят поздно.
            </li>
          </ul>
        </div>
      </Section>

      {/* Как снизить риски — раскрыт */}
      <Section animate={false} muted>
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--color-primary)] mb-5">
            Как снизить риски
          </h2>
          <p className="text-base text-[var(--color-text)] leading-relaxed">
            Обращаться в клинику с лицензией на прерывание беременности, а не искать «таблетки для
            аборта» в переписке. Звучит очевидно, но именно здесь проходит граница между
            медициной и лотереей.
          </p>
          <p className="mt-4 text-base text-[var(--color-text)] leading-relaxed">
            Пройти обследование до процедуры целиком: УЗИ с подтверждением локализации и срока,
            анализы, осмотр, сбор анамнеза по хроническим заболеваниям и принимаемым лекарствам.
            Отдельно сообщить врачу обо всех препаратах, включая безрецептурные и растительные.
          </p>
          <p className="mt-4 text-base text-[var(--color-text)] leading-relaxed">
            Принимать схему под наблюдением, в клинике или в согласованном с врачом режиме, с
            возможностью связаться в тот же день.
          </p>
          <p className="mt-4 text-base text-[var(--color-text)] leading-relaxed">
            Прийти на контрольное УЗИ через 10–14 дней. Не «если что-то беспокоит», а всегда.
          </p>
          <p className="mt-4 text-base text-[var(--color-text)] leading-relaxed">
            Обсудить контрацепцию до выписки, а не потом. И уточнить про резус-фактор: при
            отрицательном резусе после прерывания вводится анти-D иммуноглобулин, это отдельный
            пункт протокола, о котором часто забывают.
          </p>
          <p className="mt-4 text-base text-[var(--color-text)] leading-relaxed">
            Если тяжело эмоционально, об этом стоит сказать врачу. Психологическая помощь после
            аборта — не признак слабости, а часть восстановления, и в крупных клиниках она есть.
          </p>
        </div>
      </Section>

      {/* Мифы о медикаментозном аборте — H2 раскрыт, H3 под аккордеоны */}
      <Section animate={false}>
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--color-primary)] mb-5">
            Мифы о медикаментозном аборте
          </h2>

          <div className="space-y-3">
            <details className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <summary className="cursor-pointer font-medium text-[var(--color-text)] list-none flex items-center justify-between">
                «Это просто таблетка, всё безопасно»
                <span className="text-[var(--color-primary)] group-open:rotate-180 transition-transform shrink-0 ml-3">
                  ▾
                </span>
              </summary>
              <p className="mt-3 text-base text-[var(--color-text)] leading-relaxed">
                Таблетка системного действия, влияющая на рецепторы прогестерона во всём
                организме, с перечнем противопоказаний и обязательным контролем результата.
                Сравнение с обезболивающим здесь не работает. Безопасность метода существует, но
                она обеспечена протоколом: обследованием, схемой, наблюдением и повторным визитом.
              </p>
            </details>

            <details className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <summary className="cursor-pointer font-medium text-[var(--color-text)] list-none flex items-center justify-between">
                «Медикаментозный аборт всегда безболезненный»
                <span className="text-[var(--color-primary)] group-open:rotate-180 transition-transform shrink-0 ml-3">
                  ▾
                </span>
              </summary>
              <p className="mt-3 text-base text-[var(--color-text)] leading-relaxed">
                Схваткообразные боли внизу живота при отторжении плодного яйца — ожидаемая часть
                процесса, а не отклонение. Интенсивность сильно различается: кто-то обходится без
                обезболивания, кому-то оно необходимо. Обещать «совсем не больно» нечестно.
                Честнее сказать, что боль управляема и что врач подскажет, чем её снять с учётом
                запрета на НПВС в дни схемы.
              </p>
            </details>

            <details className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <summary className="cursor-pointer font-medium text-[var(--color-text)] list-none flex items-center justify-between">
                «После него нельзя забеременеть»
                <span className="text-[var(--color-primary)] group-open:rotate-180 transition-transform shrink-0 ml-3">
                  ▾
                </span>
              </summary>
              <p className="mt-3 text-base text-[var(--color-text)] leading-relaxed">
                Нет. Фертильность после неосложнённого медикаментозного аборта сохраняется, и
                овуляция может произойти в первом же цикле, до прихода менструации. Отсюда и
                требование начинать контрацепцию сразу.
              </p>
            </details>

            <details className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <summary className="cursor-pointer font-medium text-[var(--color-text)] list-none flex items-center justify-between">
                «Он не считается абортом»
                <span className="text-[var(--color-primary)] group-open:rotate-180 transition-transform shrink-0 ml-3">
                  ▾
                </span>
              </summary>
              <p className="mt-3 text-base text-[var(--color-text)] leading-relaxed">
                С юридической и медицинской точки зрения это прерывание беременности, которое
                учитывается в статистике и требует наблюдения. Ощущение «ничего серьёзного»
                возникает из-за отсутствия операционной и наркоза. Восстановление, ограничения и
                контроль результата при этом никуда не деваются.
              </p>
            </details>
          </div>
        </div>
      </Section>

      {/* Когда обратиться к врачу немедленно — НЕ сворачивать, красные флаги */}
      <Section animate={false} muted>
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--color-primary)] mb-5">
            Когда обратиться к врачу немедленно
          </h2>
          <blockquote className="border-l-4 border-[var(--color-primary)] bg-[var(--color-surface)] rounded-r-xl p-5">
            <ul className="space-y-2 list-disc list-inside">
              <li className="text-base text-[var(--color-text)] leading-relaxed font-medium">
                Кровотечение: одна прокладка за час в течение двух часов подряд или сгустки
                крупнее грецкого ореха
              </li>
              <li className="text-base text-[var(--color-text)] leading-relaxed font-medium">
                Резкая боль в животе, особенно односторонняя, с головокружением или обмороком
              </li>
              <li className="text-base text-[var(--color-text)] leading-relaxed font-medium">
                Температура выше 38 °C
              </li>
              <li className="text-base text-[var(--color-text)] leading-relaxed font-medium">
                Выделения с неприятным запахом
              </li>
              <li className="text-base text-[var(--color-text)] leading-relaxed font-medium">
                Положительный тест на беременность через две недели после схемы
              </li>
              <li className="text-base text-[var(--color-text)] leading-relaxed font-medium">
                Отсутствие менструации дольше шести недель
              </li>
              <li className="text-base text-[var(--color-text)] leading-relaxed font-medium">
                Рвота, из-за которой не удаётся пить воду
              </li>
            </ul>
          </blockquote>
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
              Инструкция по медицинскому применению препарата Мифепристон (Государственный реестр
              лекарственных средств):{" "}
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
              Инструкция по медицинскому применению препарата Мизопростол.
            </li>
            <li className="text-base text-[var(--color-text)]">
              Клинические рекомендации МЗ РФ по медикаментозному прерыванию беременности.
              Рубрикатор:{" "}
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
              Abortion care guideline, Всемирная организация здравоохранения (ВОЗ).
            </li>
            <li className="text-base text-[var(--color-text)]">
              Федеральный закон № 323-ФЗ от 21.11.2011 «Об основах охраны здоровья граждан в
              Российской Федерации».
            </li>
          </ul>

          <p className="mt-5 text-sm text-[var(--color-muted)] leading-relaxed">
            <span className="font-medium text-[var(--color-text)]">Дисклеймер.</span> Материал
            носит информационный характер. Он не заменяет консультацию врача, не содержит
            дозировок и схем приёма и не предназначен для самодиагностики. Препараты для
            медикаментозного прерывания беременности отпускаются по рецепту и применяются под
            наблюдением медицинского персонала.
          </p>

          <p className="mt-6 text-base text-[var(--color-text)] leading-relaxed">
            Другие темы раздела: допустимые сроки —{" "}
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
