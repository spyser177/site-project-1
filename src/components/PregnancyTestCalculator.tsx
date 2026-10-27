"use client";

import { useState } from "react";

interface CalculationResult {
  ovulationDate: string;
  testDate: string;
}

const ACCURACY_TABLE: { day: string; accuracy: string }[] = [
  { day: "1-й день задержки", accuracy: "80%" },
  { day: "3-й день задержки", accuracy: "95%" },
  { day: "5-й день задержки", accuracy: "99%" },
  { day: "7-й день задержки", accuracy: "99.9%" },
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
 * Клиентский компонент калькулятора оптимального дня теста на беременность.
 * Расчёт ведётся от даты последней менструации (ДПМ) и длины цикла:
 * овуляция = ДПМ + длина цикла - 14, оптимальный день теста = овуляция + 14.
 */
export function PregnancyTestCalculator() {
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

    const ovulationDate = addDays(lmp, cycleLength - 14);
    const testDate = addDays(ovulationDate, 14);

    setResult({
      ovulationDate: formatDate(ovulationDate),
      testDate: formatDate(testDate),
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
            <span className="font-medium">Предполагаемая дата овуляции:</span>{" "}
            {result.ovulationDate}
          </p>
          <p className="text-[var(--color-text)]">
            <span className="font-medium">Рекомендуемая дата теста:</span> {result.testDate}
          </p>
        </div>
      )}

      <div className="mt-10">
        <h2 className="text-xl font-semibold text-[var(--color-primary)] mb-4">
          Точность теста в зависимости от дня задержки
        </h2>
        <div className="overflow-hidden rounded-xl border border-[var(--color-border)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--color-surface-muted)] text-left">
                <th className="px-4 py-3 font-semibold text-[var(--color-text)]">
                  День задержки
                </th>
                <th className="px-4 py-3 font-semibold text-[var(--color-text)]">
                  Точность
                </th>
              </tr>
            </thead>
            <tbody>
              {ACCURACY_TABLE.map((row, i) => (
                <tr
                  key={row.day}
                  className={i % 2 === 1 ? "bg-[var(--color-surface-muted)]/50" : ""}
                >
                  <td className="px-4 py-3 text-[var(--color-text)] border-t border-[var(--color-border)]">
                    {row.day}
                  </td>
                  <td className="px-4 py-3 text-[var(--color-text)] border-t border-[var(--color-border)] font-medium">
                    {row.accuracy}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
