interface Step {
  title: string;
  text: string;
}

const steps: Step[] = [
  { title: "Обследование", text: "УЗИ и осмотр, подтверждение срока" },
  { title: "Мифепристон", text: "Блокирует рецепторы прогестерона" },
  { title: "Мизопростол", text: "Вызывает сокращения матки" },
  { title: "Контроль", text: "Осмотр через 1–2 недели" },
];

/** Простая схема-инфографика этапов процесса (без фото людей) */
export function MechanismDiagram({ className = "" }: { className?: string }) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-4 gap-4 ${className}`}>
      {steps.map((step, i) => (
        <div key={step.title} className="relative flex flex-col items-center text-center">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-semibold text-white shrink-0"
            style={{
              backgroundColor:
                i % 2 === 0 ? "var(--color-primary)" : "var(--color-accent)",
            }}
          >
            {i + 1}
          </div>
          {i < steps.length - 1 && (
            <div
              className="hidden sm:block absolute top-7 left-[calc(50%+28px)] w-[calc(100%-56px)] h-0.5"
              style={{ backgroundColor: "var(--color-border)" }}
              aria-hidden="true"
            />
          )}
          <h3 className="mt-3 font-semibold text-[var(--color-primary)] text-sm">
            {step.title}
          </h3>
          <p className="mt-1 text-xs text-[var(--color-muted)] leading-relaxed">
            {step.text}
          </p>
        </div>
      ))}
    </div>
  );
}
