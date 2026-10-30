import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { PregnancyTestCalculator } from "@/components/PregnancyTestCalculator";

export const metadata: Metadata = {
  title: "Когда делать тест на беременность — калькулятор оптимального дня | МедИнформ",
  description:
    "Рассчитайте оптимальный день для теста на беременность по дате последней менструации и длине цикла, чтобы результат был максимально достоверным.",
  alternates: { canonical: "/test-na-beremennost" },
};

// SSR на каждый запрос — см. комментарий в kalculator-beremennosti/page.tsx.
export const dynamic = "force-dynamic";

export default function PregnancyTestPage() {
  return (
    <Section animate={false} className="pt-14 sm:pt-20">
      <SectionHeading
        as="h1"
        eyebrow="Калькулятор"
        title="Когда делать тест на беременность"
        description="Рассчитайте оптимальный день для теста, чтобы результат был достоверным."
      />

      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div className="order-1 md:order-2">
          <Image
            src="/images/pregnancy-test.jpg"
            alt="Тест на беременность"
            width={1280}
            height={1920}
            className="w-full h-auto rounded-2xl object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div className="order-2 md:order-1">
          <PregnancyTestCalculator />
        </div>
      </div>

      <div className="mt-10 max-w-3xl mx-auto text-center text-sm text-[var(--color-muted)]">
        <p>
          Смотрите также:{" "}
          <Link
            href="/kalculator-beremennosti"
            className="underline text-[var(--color-primary)] hover:text-[var(--color-accent-dark)]"
          >
            Калькулятор беременности →
          </Link>
        </p>
      </div>

      <p className="mt-8 max-w-3xl mx-auto text-xs text-[var(--color-muted)] text-center">
        Тест носит информационный характер и не является медицинской консультацией. Для
        точных расчётов и оценки состояния здоровья обратитесь к врачу.
      </p>
    </Section>
  );
}
