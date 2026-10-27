import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { Card } from "@/components/Card";

const calculators = [
  {
    title: "Тест на беременность",
    href: "/test-na-beremennost",
    description: "Узнайте, когда делать тест, чтобы результат был достоверным.",
  },
  {
    title: "Калькулятор беременности",
    href: "/kalculator-beremennosti",
    description: "Рассчитайте срок беременности и предполагаемую дату родов.",
  },
];

export const metadata: Metadata = {
  title: "Калькуляторы — тест на беременность и срок беременности | МедИнформ",
  description:
    "Полезные инструменты для определения оптимального дня теста и расчёта срока беременности: калькулятор теста на беременность и калькулятор срока беременности.",
  alternates: { canonical: "/calculators" },
};

export default function CalculatorsHubPage() {
  return (
    <Section animate={false} className="pt-14 sm:pt-20">
      <SectionHeading
        as="h1"
        eyebrow="Инструменты"
        title="Калькуляторы"
        description="Полезные инструменты для определения оптимального дня теста и расчёта срока беременности."
      />

      <div className="grid sm:grid-cols-2 gap-5">
        {calculators.map((calc) => (
          <Link key={calc.href} href={calc.href} className="group block h-full">
            <Card className="h-full transition-transform group-hover:-translate-y-1">
              <h2 className="text-xl font-semibold text-[var(--color-primary)] mb-2">
                {calc.title}
              </h2>
              <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                {calc.description}
              </p>
              <span className="mt-4 inline-block text-sm font-medium text-[var(--color-accent-dark)]">
                Перейти →
              </span>
            </Card>
          </Link>
        ))}
      </div>
    </Section>
  );
}
