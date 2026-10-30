import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";

const PAGE_TITLE = "После медикаментозного аборта: что происходит с организмом";
const LAST_REVIEWED = "2026-10-27";

export const metadata: Metadata = {
  title: "После медикаментозного аборта: что происходит с организмом",
  description:
    "Сколько идут выделения, когда приходят месячные, какие боли — норма, а когда звонить врачу немедленно. Разбор по клиническим протоколам.",
  alternates: { canonical: "/medikamentoznyj-abort/posle" },
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

export default function MedikamentozniyAbortPoslePage() {
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
            Первые дни после приёма препаратов идут по предсказуемому сценарию: матка
            сокращается, выходит её содержимое, гормональный фон резко меняется. Выделения,
            спазмы и сдвиг цикла в этом периоде ожидаемы. Дальше разберём каждый симптом отдельно:
            сколько он длится, какой вид считается нормой и в какой момент пора звонить врачу.
          </p>
          <p className="mt-4 text-base text-[var(--color-text)] leading-relaxed font-medium">
            Одна вещь важнее всех остальных. Контрольный визит назначают не раньше 14-го дня от
            приёма мифепристона. Прийти раньше можно, если что-то беспокоит, но оценивать, прошла
            ли процедура полностью, до этого срока врачи не берутся: слишком высока доля ложных
            выводов.
          </p>
          <p className="mt-4 text-sm text-[var(--color-muted)] leading-relaxed">
            Материал информационный и не заменяет консультацию. Дозировки и схемы здесь не
            приводятся намеренно.
          </p>

          <div className="mt-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-5">
            <p className="text-sm text-[var(--color-text)] font-medium">
              Материал проверен с опорой на клинические рекомендации МЗ РФ. Последняя проверка:
              27.10.2026.
            </p>
          </div>
        </div>
      </Section>

      {/* Сколько идут выделения — вступление + аккордеоны H3 */}
      <Section animate={false} muted>
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--color-primary)] mb-5">
            Сколько идут выделения после медикаментозного аборта
          </h2>
          <p className="text-base text-[var(--color-text)] leading-relaxed">
            Кровянистые выделения после медикаментозного аборта — самая частая причина для
            беспокойства и самый частый вопрос. Ориентир такой: в среднем около 9 дней, по
            клиническим протоколам допустимо до 14, у части женщин процесс растягивается дольше.
            Цифра «9 дней» взята из клинических протоколов по медицинскому аборту, а не из
            форумов, где можно встретить и «три дня», и «два месяца».
          </p>
          <p className="mt-4 text-base text-[var(--color-text)] leading-relaxed mb-6">
            Общая закономерность проста. День первый и второй самые обильные, потом объём идёт на
            спад. К концу первой недели обычно остаётся мазня, а к десятой-четырнадцатой всё
            сходит на нет.
          </p>

          <div className="space-y-3">
            <details className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <summary className="cursor-pointer font-medium text-[var(--color-text)] list-none flex items-center justify-between">
                Какими они должны быть в норме
                <span className="text-[var(--color-primary)] group-open:rotate-180 transition-transform shrink-0 ml-3">
                  ▾
                </span>
              </summary>
              <div className="mt-3 space-y-3">
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  Кровянистые, от алых в начале до коричневатых к концу. Объём сопоставим с
                  менструацией или чуть больше в первые сутки. Прокладку приходится менять
                  несколько раз в день, но не каждый час.
                </p>
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  Сгустки в первые дни — норма. Матка выводит то, что образовалось в полости, и
                  плотные фрагменты размером с небольшую монету на 1–3-й день не должны пугать.
                  Настораживает другое: сгустки крупные, их много и они продолжаются на второй
                  неделе.
                </p>
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  Запах. Обычный кровяной запах есть всегда. Резкий, гнилостный или рыбный запах —
                  повод для визита вне графика, он чаще всего говорит о задержке содержимого или
                  воспалении.
                </p>
              </div>
            </details>

            <details className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <summary className="cursor-pointer font-medium text-[var(--color-text)] list-none flex items-center justify-between">
                Когда выделения становятся тревожным сигналом
                <span className="text-[var(--color-primary)] group-open:rotate-180 transition-transform shrink-0 ml-3">
                  ▾
                </span>
              </summary>
              <div className="mt-3 space-y-3">
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  Три ситуации, в которых не ждут контрольного визита:
                </p>
                <ul className="space-y-2 list-disc list-inside">
                  <li className="text-base text-[var(--color-text)] leading-relaxed">
                    прокладка промокает насквозь быстрее чем за час, и так несколько часов подряд;
                  </li>
                  <li className="text-base text-[var(--color-text)] leading-relaxed">
                    выделения усилились после того, как уже почти прекратились;
                  </li>
                  <li className="text-base text-[var(--color-text)] leading-relaxed">
                    выделений нет вовсе через сутки после приёма мизопростола, при этом сохраняются
                    признаки беременности.
                  </li>
                </ul>
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  Последний пункт разберу отдельно, потому что его часто пропускают. Отсутствие
                  кровянистых выделений после второй таблетки означает, что изгнание плодного яйца
                  могло не произойти. Это не «повезло, ничего не болит», а незавершённая процедура,
                  и тактику определяет врач, повторяя схему или направляя на вакуум-аспирацию.
                </p>
              </div>
            </details>

            <details className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <summary className="cursor-pointer font-medium text-[var(--color-text)] list-none flex items-center justify-between">
                Коричневые выделения — это нормально?
                <span className="text-[var(--color-primary)] group-open:rotate-180 transition-transform shrink-0 ml-3">
                  ▾
                </span>
              </summary>
              <div className="mt-3 space-y-3">
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  Да, на спаде кровотечения коричневый цвет ожидаем. Это окисленная кровь, которая
                  выходит медленно.
                </p>
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  Ненормально другое: коричневая мазня без динамики на протяжении трёх недель и
                  дольше. Такая картина бывает при неполном удалении тканей, при воспалении
                  эндометрия, иногда на фоне приёма контрацептивов, начатых сразу после процедуры.
                  Различить это на глаз невозможно, нужен осмотр и УЗИ.
                </p>
              </div>
            </details>
          </div>
        </div>
      </Section>

      {/* Когда приходят месячные — вступление + аккордеоны H3, таблица НЕ сворачивать */}
      <Section animate={false}>
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--color-primary)] mb-5">
            Когда приходят месячные после медикаментозного аборта
          </h2>
          <p className="text-base text-[var(--color-text)] leading-relaxed mb-6">
            Месячные после медикаментозного аборта ждут в среднем через 30–40 дней. Формальный
            отсчёт ведут не от дня, когда закончились выделения, а от дня приёма мифепристона: его
            считают первым днём нового цикла.
          </p>

          <div className="space-y-3">
            <details className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <summary className="cursor-pointer font-medium text-[var(--color-text)] list-none flex items-center justify-between">
                Через сколько после процедуры ждать менструацию
                <span className="text-[var(--color-primary)] group-open:rotate-180 transition-transform shrink-0 ml-3">
                  ▾
                </span>
              </summary>
              <p className="mt-3 text-base text-[var(--color-text)] leading-relaxed">
                Нормальный разброс — от 4 до 6 недель. Если менструация пришла на 28-й день, это
                тоже норма, и на 45-й тоже. Первая менструация часто отличается от привычной:
                бывает обильнее, со сгустками, с более выраженными спазмами. Второй цикл обычно
                выравнивается.
              </p>
            </details>

            <details className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <summary className="cursor-pointer font-medium text-[var(--color-text)] list-none flex items-center justify-between">
                Почему цикл сбился
                <span className="text-[var(--color-primary)] group-open:rotate-180 transition-transform shrink-0 ml-3">
                  ▾
                </span>
              </summary>
              <div className="mt-3 space-y-3">
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  Причин несколько, и они складываются. Резкое падение прогестерона и ХГЧ ломает
                  привычный ритм. Овуляция в первом цикле может наступить позже, чем обычно, или не
                  наступить совсем. Стресс и недосып в эти недели добавляют своё.
                </p>
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  Отдельно про гормональные контрацептивы. Если вы начали принимать комбинированные
                  таблетки сразу после процедуры, первая менструация может быть скуднее обычного,
                  это ожидаемый эффект препарата, а не признак осложнения.
                </p>
              </div>
            </details>

            <details className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <summary className="cursor-pointer font-medium text-[var(--color-text)] list-none flex items-center justify-between">
                Задержка после медикаментозного аборта — когда идти к врачу
                <span className="text-[var(--color-primary)] group-open:rotate-180 transition-transform shrink-0 ml-3">
                  ▾
                </span>
              </summary>
              <div className="mt-3 space-y-4">
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  Есть три срока, на которых пора к врачу:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-[var(--color-surface-muted)]">
                        <th className="border border-[var(--color-border)] px-4 py-3 text-left font-semibold text-[var(--color-primary)]">
                          Сколько прошло
                        </th>
                        <th className="border border-[var(--color-border)] px-4 py-3 text-left font-semibold text-[var(--color-primary)]">
                          Что это значит
                        </th>
                        <th className="border border-[var(--color-border)] px-4 py-3 text-left font-semibold text-[var(--color-primary)]">
                          Что делать
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-[var(--color-surface)]">
                        <td className="border border-[var(--color-border)] px-4 py-3 text-[var(--color-text)]">
                          До 6 недель
                        </td>
                        <td className="border border-[var(--color-border)] px-4 py-3 text-[var(--color-text)]">
                          Ожидаемый разброс
                        </td>
                        <td className="border border-[var(--color-border)] px-4 py-3 text-[var(--color-text)]">
                          Наблюдать, вести календарь
                        </td>
                      </tr>
                      <tr className="bg-[var(--color-surface)]">
                        <td className="border border-[var(--color-border)] px-4 py-3 text-[var(--color-text)]">
                          Больше 6–7 недель
                        </td>
                        <td className="border border-[var(--color-border)] px-4 py-3 text-[var(--color-text)]">
                          Задержка требует объяснения
                        </td>
                        <td className="border border-[var(--color-border)] px-4 py-3 text-[var(--color-text)]">
                          Записаться к гинекологу, сделать УЗИ
                        </td>
                      </tr>
                      <tr className="bg-[var(--color-surface)]">
                        <td className="border border-[var(--color-border)] px-4 py-3 text-[var(--color-text)]">
                          Любой срок + тест положительный
                        </td>
                        <td className="border border-[var(--color-border)] px-4 py-3 text-[var(--color-text)]">
                          Возможна продолжающаяся беременность
                        </td>
                        <td className="border border-[var(--color-border)] px-4 py-3 text-[var(--color-text)]">
                          Приём в течение нескольких дней, не недель
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  Задержка после медикаментозного аборта на фоне положительного теста — не «гормоны
                  ещё не вышли». К третьей неделе тест должен быть отрицательным. Если он
                  положительный на 4–5-й неделе, вероятность неудачной процедуры высокая, и это
                  решается не выжиданием.
                </p>
              </div>
            </details>
          </div>
        </div>
      </Section>

      {/* Боли — вступление + аккордеоны H3 */}
      <Section animate={false} muted>
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--color-primary)] mb-5">
            Боли после медикаментозного аборта
          </h2>
          <p className="text-base text-[var(--color-text)] leading-relaxed mb-6">
            Боли после медикаментозного аборта — вторая по частоте тема обращений. Спазмы
            возникают из-за сокращений матки, которая освобождается от содержимого и возвращается
            к обычному размеру.
          </p>

          <div className="space-y-3">
            <details className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <summary className="cursor-pointer font-medium text-[var(--color-text)] list-none flex items-center justify-between">
                Что считается нормой
                <span className="text-[var(--color-primary)] group-open:rotate-180 transition-transform shrink-0 ml-3">
                  ▾
                </span>
              </summary>
              <div className="mt-3 space-y-3">
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  Схваткообразная боль внизу живота, похожая на менструальную, но сильнее.
                  Появляется через несколько часов после приёма мизопростола и держится в среднем
                  до суток. По данным исследований по обезболиванию при медикаментозном аборте, у
                  большинства женщин интенсивная боль не продолжается дольше 24 часов после приёма
                  мизопростола.
                </p>
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  Дальше остаются тянущие ощущения в течение двух-трёх дней, иногда до недели.
                  Поясница может тянуть, это тоже вариант нормы.
                </p>
              </div>
            </details>

            <details className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <summary className="cursor-pointer font-medium text-[var(--color-text)] list-none flex items-center justify-between">
                Как долго болят живот
                <span className="text-[var(--color-primary)] group-open:rotate-180 transition-transform shrink-0 ml-3">
                  ▾
                </span>
              </summary>
              <p className="mt-3 text-base text-[var(--color-text)] leading-relaxed">
                Ориентир: сутки выраженной боли и до недели остаточного дискомфорта. Боль, которая
                нарастает на 5–7-й день, в норму не вписывается. Тянущая боль на фоне повышенной
                температуры или дурно пахнущих выделений тоже требует осмотра.
              </p>
            </details>

            <details className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <summary className="cursor-pointer font-medium text-[var(--color-text)] list-none flex items-center justify-between">
                Какие обезболивающие можно
                <span className="text-[var(--color-primary)] group-open:rotate-180 transition-transform shrink-0 ml-3">
                  ▾
                </span>
              </summary>
              <div className="mt-3 space-y-3">
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  Здесь надо аккуратно, потому что в этой теме противоречат друг другу даже
                  инструкции и клинические протоколы.
                </p>
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  В инструкции к мифепристону прямо написано: не рекомендуется одновременный приём
                  нестероидных противовоспалительных препаратов в течение 8–12 дней после его
                  применения. В инструкции к мизопростолу формулировка мягче: снижение
                  эффективности теоретически возможно из-за антипростагландиновых свойств НПВС,
                  включая ацетилсалициловую кислоту.
                </p>
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  При этом современные клинические протоколы предписывают предлагать НПВС всем
                  пациенткам при медикаментозном аборте, а исследования ибупрофена не показали
                  снижения успешности процедуры. То есть запрет в инструкции во многом
                  перестраховочный, но он есть, и игнорировать его молча нельзя.
                </p>
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  Практический вывод: обезболивающее согласуйте с врачом, который ведёт вас после
                  процедуры. Он знает срок, схему и то, на каком дне вы находитесь. Терпеть сутки
                  схваткообразной боли не нужно и не полезно, но и глотать ибупрофен «на всякий
                  случай» в первые 24 часа без согласования не стоит. Парацетамол в этой ситуации
                  обсуждают отдельно, он не относится к НПВС, однако решение всё равно за врачом.
                </p>
              </div>
            </details>
          </div>
        </div>
      </Section>

      {/* Кровотечение: где граница нормы — НЕ сворачивать, весь раздел целиком */}
      <Section animate={false}>
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--color-primary)] mb-5">
            Кровотечение после медикаментозного аборта: где граница нормы
          </h2>
          <p className="text-base text-[var(--color-text)] leading-relaxed mb-5">
            Этот раздел читайте сразу, не откладывая. Кровотечение после медикаментозного аборта в
            части случаев становится опасным быстро, и здесь лучше перестраховаться, чем дотерпеть
            до утра.
          </p>

          <blockquote className="border-l-4 border-[var(--color-primary)] bg-[var(--color-surface-muted)] rounded-r-xl p-5">
            <p className="text-base text-[var(--color-text)] leading-relaxed font-semibold mb-3">
              Красные флаги. При любом из них — не ждать, звонить врачу или в скорую:
            </p>
            <ul className="space-y-2 list-disc list-inside">
              <li className="text-base text-[var(--color-text)] leading-relaxed">
                прокладка или впитывающая пелёнка промокает полностью за час и быстрее, и так
                продолжается 2–3 часа;
              </li>
              <li className="text-base text-[var(--color-text)] leading-relaxed">
                выходят сгустки размером крупнее куриного яйца;
              </li>
              <li className="text-base text-[var(--color-text)] leading-relaxed">
                резкая слабость, головокружение, потемнение в глазах, шум в ушах;
              </li>
              <li className="text-base text-[var(--color-text)] leading-relaxed">
                бледная кожа, холодный пот, обморок или предобморочное состояние;
              </li>
              <li className="text-base text-[var(--color-text)] leading-relaxed">
                температура тела 38 °C и выше;
              </li>
              <li className="text-base text-[var(--color-text)] leading-relaxed">
                боль, которая не снимается назначенным обезболивающим;
              </li>
              <li className="text-base text-[var(--color-text)] leading-relaxed">
                дурно пахнущие выделения.
              </li>
            </ul>
          </blockquote>

          <p className="mt-5 text-base text-[var(--color-text)] leading-relaxed">
            Комбинация «обильно + слабость + головокружение» означает возможную кровопотерю, и
            считать прокладки в этот момент уже поздно. Такси до приёмного отделения быстрее и
            безопаснее, чем ожидание записи.
          </p>

          <h3 className="mt-8 text-xl font-semibold text-[var(--color-primary)] mb-4">
            Что делать, если кровотечение сильное
          </h3>
          <p className="text-base text-[var(--color-text)] leading-relaxed">
            Лечь, приподнять ноги, вызвать скорую. Не ехать за рулём самостоятельно. Не принимать
            кровоостанавливающие препараты без назначения: транексамовая кислота и этамзилат
            применяются в этой ситуации, но дозу и необходимость определяет врач, а бесконтрольный
            приём маскирует объём кровопотери.
          </p>
          <p className="mt-4 text-base text-[var(--color-text)] leading-relaxed">
            Что взять с собой: выписку с названием препаратов и датой их приёма, прокладку или
            фото выделений. Врачу приёмного отделения это сэкономит время, а вам нервы.
          </p>
        </div>
      </Section>

      {/* Беременность после аборта — вступление + аккордеоны H3 */}
      <Section animate={false} muted>
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--color-primary)] mb-5">
            Когда можно забеременеть после медикаментозного аборта
          </h2>
          <p className="text-base text-[var(--color-text)] leading-relaxed mb-6">
            Беременность после медикаментозного аборта может наступить в первом же цикле. Об этом
            редко предупреждают внятно, а зря: именно на эти недели приходится пик незапланированных
            повторных беременностей.
          </p>

          <div className="space-y-3">
            <details className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <summary className="cursor-pointer font-medium text-[var(--color-text)] list-none flex items-center justify-between">
                Можно ли забеременеть сразу
                <span className="text-[var(--color-primary)] group-open:rotate-180 transition-transform shrink-0 ml-3">
                  ▾
                </span>
              </summary>
              <div className="mt-3 space-y-3">
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  Да. Гормональный фон восстанавливается быстро, и уже примерно через две недели
                  после приёма препаратов в яичнике начинает созревать фолликул. Овуляция в первом
                  цикле возможна, а предсказать её день сложно, потому что цикл сбит.
                </p>
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  Отсюда простое следствие: если беременность не планируется, контрацепцию
                  обсуждают на приёме сразу после процедуры, а не «когда всё заживёт». Барьерный
                  метод подходит с первого дня, комбинированные контрацептивы врач может назначить
                  со дня процедуры или с первого дня менструации, зависит от препарата.
                </p>
              </div>
            </details>

            <details className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <summary className="cursor-pointer font-medium text-[var(--color-text)] list-none flex items-center justify-between">
                Через сколько планировать следующую беременность
                <span className="text-[var(--color-primary)] group-open:rotate-180 transition-transform shrink-0 ml-3">
                  ▾
                </span>
              </summary>
              <div className="mt-3 space-y-3">
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  Здесь цифры в источниках расходятся, и честнее сказать об этом прямо. Чаще всего
                  называют ориентир в 3–5 месяцев для медикаментозного аборта без осложнений. Часть
                  рекомендаций говорит об интервале от 3 месяцев, отдельные источники упоминают
                  более длительные сроки. Универсальной нормы, подтверждённой крупными
                  исследованиями, нет.
                </p>
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  Практический смысл интервала не в «отлежаться», а в том, чтобы к моменту зачатия
                  восстановился эндометрий и вы успели закрыть вопросы со здоровьем, которые
                  привели к процедуре. Конкретный срок обсуждают с врачом, и он зависит от того, как
                  прошёл этот цикл.
                </p>
              </div>
            </details>

            <details className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <summary className="cursor-pointer font-medium text-[var(--color-text)] list-none flex items-center justify-between">
                Влияет ли аборт на фертильность
                <span className="text-[var(--color-primary)] group-open:rotate-180 transition-transform shrink-0 ml-3">
                  ▾
                </span>
              </summary>
              <div className="mt-3 space-y-3">
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  Сам по себе неосложнённый медикаментозный аборт фертильность не снижает. По
                  данным клиник, репродуктивная функция полностью восстанавливается у большинства
                  женщин в течение шести месяцев.
                </p>
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  Риски связаны не с процедурой как таковой, а с осложнениями: неполное изгнание,
                  воспаление, спаечный процесс после длительного воспаления. Именно поэтому
                  контрольный визит и УЗИ важны, а не являются формальностью для отчёта.
                </p>
              </div>
            </details>
          </div>
        </div>
      </Section>

      {/* Ограничения — вступление + таблица (НЕ сворачивать) + аккордеоны H3 */}
      <Section animate={false}>
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--color-primary)] mb-5">
            Что нельзя после медикаментозного аборта
          </h2>
          <p className="text-base text-[var(--color-text)] leading-relaxed mb-5">
            Ограничения короткие по времени и касаются в основном первых двух недель. Смысл у них
            один: не создавать дополнительную нагрузку на матку и не заносить инфекцию, пока
            цервикальный канал приоткрыт, а эндометрий восстанавливается.
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[var(--color-surface-muted)]">
                  <th className="border border-[var(--color-border)] px-4 py-3 text-left font-semibold text-[var(--color-primary)]">
                    Что
                  </th>
                  <th className="border border-[var(--color-border)] px-4 py-3 text-left font-semibold text-[var(--color-primary)]">
                    Сколько нельзя
                  </th>
                  <th className="border border-[var(--color-border)] px-4 py-3 text-left font-semibold text-[var(--color-primary)]">
                    Почему
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-[var(--color-surface)]">
                  <td className="border border-[var(--color-border)] px-4 py-3 text-[var(--color-text)]">
                    Тампоны, менструальные чаши
                  </td>
                  <td className="border border-[var(--color-border)] px-4 py-3 text-[var(--color-text)]">
                    До прекращения выделений
                  </td>
                  <td className="border border-[var(--color-border)] px-4 py-3 text-[var(--color-text)]">
                    Риск инфекции, чаша создаёт давление
                  </td>
                </tr>
                <tr className="bg-[var(--color-surface)]">
                  <td className="border border-[var(--color-border)] px-4 py-3 text-[var(--color-text)]">
                    Секс
                  </td>
                  <td className="border border-[var(--color-border)] px-4 py-3 text-[var(--color-text)]">
                    2–4 недели, ориентир — до конца выделений
                  </td>
                  <td className="border border-[var(--color-border)] px-4 py-3 text-[var(--color-text)]">
                    Инфекция, дополнительная травматизация
                  </td>
                </tr>
                <tr className="bg-[var(--color-surface)]">
                  <td className="border border-[var(--color-border)] px-4 py-3 text-[var(--color-text)]">
                    Спорт, подъём тяжестей
                  </td>
                  <td className="border border-[var(--color-border)] px-4 py-3 text-[var(--color-text)]">
                    2–3 недели, тяжести — дольше
                  </td>
                  <td className="border border-[var(--color-border)] px-4 py-3 text-[var(--color-text)]">
                    Провоцирует кровотечение
                  </td>
                </tr>
                <tr className="bg-[var(--color-surface)]">
                  <td className="border border-[var(--color-border)] px-4 py-3 text-[var(--color-text)]">
                    Сауна, баня, бассейн, купание в открытых водоёмах
                  </td>
                  <td className="border border-[var(--color-border)] px-4 py-3 text-[var(--color-text)]">
                    2 недели
                  </td>
                  <td className="border border-[var(--color-border)] px-4 py-3 text-[var(--color-text)]">
                    Инфекция, перегрев
                  </td>
                </tr>
                <tr className="bg-[var(--color-surface)]">
                  <td className="border border-[var(--color-border)] px-4 py-3 text-[var(--color-text)]">
                    Алкоголь
                  </td>
                  <td className="border border-[var(--color-border)] px-4 py-3 text-[var(--color-text)]">
                    До прекращения выделений
                  </td>
                  <td className="border border-[var(--color-border)] px-4 py-3 text-[var(--color-text)]">
                    Усиливает кровотечение, несовместим с обезболивающими
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="space-y-3">
            <details className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <summary className="cursor-pointer font-medium text-[var(--color-text)] list-none flex items-center justify-between">
                Секс после медикаментозного аборта
                <span className="text-[var(--color-primary)] group-open:rotate-180 transition-transform shrink-0 ml-3">
                  ▾
                </span>
              </summary>
              <div className="mt-3 space-y-3">
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  Секс после медикаментозного аборта возобновляют не по календарю, а по состоянию:
                  обычно через 2–4 недели, после того как выделения прекратились. Раньше — риск
                  занести инфекцию в полость матки, где ещё есть открытые сосуды.
                </p>
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  И ещё одно, о чём говорят реже. Первый половой контакт после процедуры может быть
                  болезненным или сопровождаться небольшим кровомазанием. Это не патология, но
                  спешить не нужно.
                </p>
              </div>
            </details>

            <details className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <summary className="cursor-pointer font-medium text-[var(--color-text)] list-none flex items-center justify-between">
                Алкоголь после
                <span className="text-[var(--color-primary)] group-open:rotate-180 transition-transform shrink-0 ml-3">
                  ▾
                </span>
              </summary>
              <p className="mt-3 text-base text-[var(--color-text)] leading-relaxed">
                Алкоголь после медикаментозного аборта не запрещён пожизненно, но в первые недели
                он нежелателен. Спиртное расширяет сосуды и может усилить кровотечение, а вместе с
                обезболивающими даёт лишнюю нагрузку на печень. Ориентир тот же: пока идут
                выделения, лучше без него.
              </p>
            </details>

            <details className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <summary className="cursor-pointer font-medium text-[var(--color-text)] list-none flex items-center justify-between">
                Спорт и физические нагрузки
                <span className="text-[var(--color-primary)] group-open:rotate-180 transition-transform shrink-0 ml-3">
                  ▾
                </span>
              </summary>
              <div className="mt-3 space-y-3">
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  Спорт и физические нагрузки откладывают на 2–3 недели. Подъём тяжестей — на более
                  долгий срок, обычно его обсуждают отдельно, если работа связана с физическим
                  трудом.
                </p>
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  Ходьба и обычная бытовая активность разрешены и даже полезны: они помогают матке
                  сокращаться и выходить содержимому. Запрет касается интенсивных нагрузок,
                  силовых упражнений, бега и всего, что повышает внутрибрюшное давление.
                </p>
              </div>
            </details>
          </div>
        </div>
      </Section>

      {/* Контрольный визит и УЗИ — не аккордеон */}
      <Section animate={false} muted>
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--color-primary)] mb-5">
            Контрольный визит и УЗИ после процедуры
          </h2>
          <p className="text-base text-[var(--color-text)] leading-relaxed">
            УЗИ после медикаментозного аборта делают не раньше 14-го дня от приёма мифепристона,
            если нет жалоб. Более раннее исследование часто показывает остатки и ложную картину
            несостоявшегося аборта, после чего назначают ненужное вмешательство.
          </p>
          <p className="mt-4 text-base text-[var(--color-text)] leading-relaxed">
            Что смотрят на визите: толщину и структуру эндометрия, наличие содержимого в полости
            матки, состояние яичников. Плюс разговор, который важнее снимка: как прошли эти две
            недели, сколько длились выделения, была ли температура, как вы себя чувствуете.
          </p>
          <p className="mt-4 text-base text-[var(--color-text)] leading-relaxed">
            Если на УЗИ видят остатки, это не всегда означает повторную процедуру. Небольшой объём
            при отсутствии жалоб и признаков воспаления иногда ведут выжидательно, с контролем.
            Объём, признаки воспаления или положительный тест — тогда тактику меняют.
          </p>
        </div>
      </Section>

      {/* Тест на беременность — вступление + аккордеоны H3 */}
      <Section animate={false}>
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--color-primary)] mb-5">
            Тест на беременность после аборта
          </h2>

          <div className="space-y-3">
            <details className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <summary className="cursor-pointer font-medium text-[var(--color-text)] list-none flex items-center justify-between">
                Почему тест может быть положительным
                <span className="text-[var(--color-primary)] group-open:rotate-180 transition-transform shrink-0 ml-3">
                  ▾
                </span>
              </summary>
              <div className="mt-3 space-y-3">
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  ХГЧ вырабатывала плацента, и после её удаления гормон не исчезает мгновенно.
                  Уровень падает постепенно, поэтому две полоски на 5–10-й день после процедуры
                  ничего не значат: тест реагирует на остатки гормона, а не на беременность.
                </p>
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  Сроки такие: у большинства женщин тест становится отрицательным в течение двух
                  недель, у части — к третьей. Дольше трёх недель положительный результат — уже не
                  «гормон не вышел», а повод для обследования.
                </p>
              </div>
            </details>

            <details className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <summary className="cursor-pointer font-medium text-[var(--color-text)] list-none flex items-center justify-between">
                Через сколько ХГЧ выводится
                <span className="text-[var(--color-primary)] group-open:rotate-180 transition-transform shrink-0 ml-3">
                  ▾
                </span>
              </summary>
              <div className="mt-3 space-y-3">
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  По лабораторным данным, уровень ХГЧ снижается примерно вдвое за 24–48 часов после
                  приёма препаратов и продолжает падать в течение нескольких недель. При небольшом
                  сроке беременности исходный уровень был невысоким, поэтому и падение заметнее.
                </p>
                <p className="text-base text-[var(--color-text)] leading-relaxed">
                  Точнее показывает анализ крови на ХГЧ в динамике, а не аптечный тест. Если через
                  48 часов уровень не снижается, а растёт, это может быть новая беременность, и
                  врач разбирается, какая из ситуаций перед ним. Сдавать анализ «на всякий случай»
                  в первые дни смысла нет, информативнее сделать его на 14-й день или при сомнениях
                  после контрольного визита.
                </p>
              </div>
            </details>
          </div>
        </div>
      </Section>

      {/* Когда звонить врачу немедленно — НЕ сворачивать, финальный список целиком */}
      <Section animate={false} muted>
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--color-primary)] mb-5">
            Когда звонить врачу немедленно
          </h2>
          <p className="text-base text-[var(--color-text)] leading-relaxed mb-5">
            Список короткий, выучить его стоит заранее:
          </p>
          <ul className="space-y-2 list-disc list-inside">
            <li className="text-base text-[var(--color-text)] leading-relaxed">
              <span className="font-semibold">Кровотечение:</span> прокладка промокает за час и
              чаще, несколько часов подряд.
            </li>
            <li className="text-base text-[var(--color-text)] leading-relaxed">
              <span className="font-semibold">Сгустки:</span> крупные, обильные, продолжаются
              после третьего дня.
            </li>
            <li className="text-base text-[var(--color-text)] leading-relaxed">
              <span className="font-semibold">Слабость и головокружение:</span> потемнение в
              глазах, холодный пот, обморок.
            </li>
            <li className="text-base text-[var(--color-text)] leading-relaxed">
              <span className="font-semibold">Температура:</span> 38 °C и выше, особенно с
              ознобом.
            </li>
            <li className="text-base text-[var(--color-text)] leading-relaxed">
              <span className="font-semibold">Боль:</span> сильная, не снимается назначенным
              препаратом, или нарастает на второй неделе.
            </li>
            <li className="text-base text-[var(--color-text)] leading-relaxed">
              <span className="font-semibold">Запах:</span> резкий, гнилостный, рыбный.
            </li>
            <li className="text-base text-[var(--color-text)] leading-relaxed">
              <span className="font-semibold">Нет выделений:</span> после приёма второй таблетки не
              началось кровотечение.
            </li>
            <li className="text-base text-[var(--color-text)] leading-relaxed">
              <span className="font-semibold">Тест:</span> положительный спустя три недели после
              процедуры.
            </li>
            <li className="text-base text-[var(--color-text)] leading-relaxed">
              <span className="font-semibold">Задержка:</span> больше 6–7 недель без менструации.
            </li>
          </ul>
          <p className="mt-5 text-base text-[var(--color-text)] leading-relaxed">
            Позвонить и спросить нормально. Врачи принимают такие звонки каждый день, и в
            большинстве случаев опасения не подтверждаются. Проблема в другом: те, у кого
            осложнение действительно развивается, тянут до последнего, потому что боятся выглядеть
            паникёршами. Осложнение, замеченное на раннем этапе, лечится амбулаторно и быстро.
            Запущенное — в стационаре.
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
              Инструкция по медицинскому применению препарата мифепристон (раздел о взаимодействии
              с НПВП, раздел о рецептурном отпуске).
            </li>
            <li className="text-base text-[var(--color-text)]">
              Инструкция по медицинскому применению препарата мизопростол (раздел о снижении
              эффективности на фоне НПВС).
            </li>
            <li className="text-base text-[var(--color-text)]">
              Клинические рекомендации МЗ РФ «Медикаментозное прерывание беременности»: сроки
              контроля эффективности, длительность кровянистых выделений.
            </li>
            <li className="text-base text-[var(--color-text)]">
              Клинический протокол «Медицинский аборт» (2022): средняя длительность кровотечения,
              рекомендация НПВС для обезболивания.
            </li>
            <li className="text-base text-[var(--color-text)]">
              Гайдлайн ВОЗ по абортам (2022): объём наблюдения после неосложнённого аборта.
            </li>
            <li className="text-base text-[var(--color-text)]">
              Данные лабораторий по динамике ХГЧ после прерывания беременности.
            </li>
          </ul>

          <p className="mt-5 text-sm text-[var(--color-muted)] leading-relaxed">
            <span className="font-medium text-[var(--color-text)]">Дисклеймер.</span> Материал
            носит информационный характер и не заменяет консультацию врача. Схему, дозировки и
            обезболивание определяет медицинский специалист с учётом срока беременности, анамнеза
            и противопоказаний. При признаках из списка «Когда звонить врачу немедленно»
            обращайтесь за медицинской помощью незамедлительно.
          </p>

          <p className="mt-6 text-base text-[var(--color-text)] leading-relaxed">
            Другие темы раздела: сроки —{" "}
            <Link
              href="/medikamentoznyj-abort/sroki/"
              className="underline text-[var(--color-primary)] hover:text-[var(--color-accent-dark)]"
            >
              до какого срока делают медикаментозный аборт
            </Link>
            , препараты —{" "}
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
