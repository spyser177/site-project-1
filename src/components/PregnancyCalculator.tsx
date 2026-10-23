"use client";

import { useState } from "react";

interface CalculationResult {
  weeks: number;
  days: number;
  dueDate: string;
  maternityLeaveDate: string;
  daysUntilDue: number;
}

const WEEK_INFO: { range: string; description: string }[] = [
  {
    range: "1–4 недели",
    description:
      "Происходит оплодотворение и имплантация. Внешних признаков беременности обычно ещё нет.",
  },
  {
    range: "5–8 недель",
    description:
      "Закладываются основные органы и системы будущего ребёнка. Возможны первые признаки токсикоза.",
  },
  {
    range: "9–12 недель",
    description:
      "Завершается эмбриональный период, начинается плодный. Обычно проводится первый плановый приём у врача.",
  },
  {
    range: "13–27 недель",
    description:
      "Второй триместр: самочувствие обычно улучшается, начинаются регулярные шевеления плода.",
  },
  {
    range: "28–40 недель",
    description:
      "Третий триместр: организм готовится к родам. Около 30 недели оформляется декретный отпуск.",
  },
];

/** Форматирует дату в формат ДД.ММ.ГГГГ */
function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Клиентский компонент калькулятора беременности.
 * Расчёт срока ведётся от даты последней менструации (ДПМ) чистыми
 * вычислениями на Date, без внешних зависимостей (date-fns не используется,
 * т.к. его нет в зависимостях проекта).
 */
export function PregnancyCalculator() {
  const [lastPeriodDate, setLastPeriodDate] = useState("");
  const [cycleLength, setCycleLength] = useState(28);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleCalculate(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!lastPeriodDate) {
      setError("Укажите дату последней менструации");
      setResult(null);
      return;
    }

    const lmp = new Date(lastPeriodDate);
    if (Number.isNaN(lmp.getTime())) {
      setError("Некорректная дата");
      setResult(null);
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    lmp.setHours(0, 0, 0, 0);

    if (lmp.getTime() > today.getTime()) {
      setError("Дата последней менструации не может быть в будущем");
      setResult(null);
      return;
    }

    // Коррекция на длину цикла (стандартная формула рассчитана на 28 дней)
    const cycleAdjustment = cycleLength - 28;

    // Текущий срок беременности (от ДПМ до сегодня)
    const diffMs = today.getTime() - lmp.getTime();
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24)) + cycleAdjustment;
    const weeks = Math.max(0, Math.floor(totalDays / 7));
    const days = Math.max(0, totalDays % 7);

    // ПДР по формуле Негеле: ДПМ + 280 дней (40 недель), с поправкой на цикл
    const dueDate = addDays(lmp, 280 + cycleAdjustment);

    // Декретный отпуск — 30 недель (210 дней) от ДПМ
    const maternityLeaveDate = addDays(lmp, 210 + cycleAdjustment);

    // Обратный отсчёт до ПДР
    const daysUntilDue = Math.max(
      0,
      Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    );

    setResult({
      weeks,
      days,
      dueDate: formatDate(dueDate),
      maternityLeaveDate: formatDate(maternityLeaveDate),
      daysUntilDue,
    });
  }

  return (
    <div>
      <form
        onSubmit={handleCalculate}
        className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] shadow-sm p-6 space-y-5"
      >
        <div>
          <label
            htmlFor="lastPeriodDate"
            className="block text-sm font-medium text-[var(--color-text)] mb-2"
          >
            Дата последней менструации
          </label>
          <input
            id="lastPeriodDate"
            type="date"
            value={lastPeriodDate}
            onChange={(e) => setLastPeriodDate(e.target.value)}
            max={new Date().toISOString().split("T")[0]}
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            required
          />
        </div>

        <div>
          <label
            htmlFor="cycleLength"
            className="block text-sm font-medium text-[var(--color-text)] mb-2"
          >
            Длина цикла (дней)
          </label>
          <select
            id="cycleLength"
            value={cycleLength}
            onChange={(e) => setCycleLength(Number(e.target.value))}
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          >
            {Array.from({ length: 16 }, (_, i) => i + 21).map((value) => (
              <option key={value} value={value}>
                {value} {value === 28 ? "(стандартный)" : ""}
              </option>
            ))}
          </select>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          className="w-full rounded-xl bg-[var(--color-primary)] text-white font-semibold py-3 hover:bg-[var(--color-accent-dark)] transition-colors"
        >
          Рассчитать
        </button>
      </form>

      {result && (
        <div className="mt-6 bg-[var(--color-surface-muted)] rounded-2xl p-6 space-y-3">
          <h2 className="text-lg font-semibold text-[var(--color-primary)] mb-2">
            Результат расчёта
          </h2>
          <p className="text-[var(--color-text)]">
            <span className="font-medium">Текущий срок:</span> {result.weeks} недель{" "}
            {result.days} дней
          </p>
          <p className="text-[var(--color-text)]">
            <span className="font-medium">Предполагаемая дата родов:</span> {result.dueDate}
          </p>
          <p className="text-[var(--color-text)]">
            <span className="font-medium">Дата выхода в декретный отпуск:</span>{" "}
            {result.maternityLeaveDate}
          </p>
          <p className="text-[var(--color-text)]">
            <span className="font-medium">До родов осталось:</span> {result.daysUntilDue} дней
          </p>
        </div>
      )}

      <div className="mt-10">
        <h2 className="text-xl font-semibold text-[var(--color-primary)] mb-4">
          Информация по неделям
        </h2>
        <div className="space-y-3">
          {WEEK_INFO.map((item) => (
            <details
              key={item.range}
              className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4"
            >
              <summary className="cursor-pointer font-medium text-[var(--color-text)] list-none flex items-center justify-between">
                {item.range}
                <span className="text-[var(--color-primary)] group-open:rotate-180 transition-transform">
                  ▾
                </span>
              </summary>
              <p className="mt-2 text-sm text-[var(--color-muted)] leading-relaxed">
                {item.description}
              </p>
            </details>
          ))}
        </div>
      </div>

      <p className="mt-8 text-xs text-[var(--color-muted)]">
        Калькулятор носит информационный характер и не является медицинской
        консультацией. Для точных расчётов и оценки состояния здоровья обратитесь к врачу.
      </p>
    </div>
  );
}
