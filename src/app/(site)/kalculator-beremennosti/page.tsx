import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { PregnancyCalculator } from "@/components/PregnancyCalculator";

export const metadata: Metadata = {
  title: "Калькулятор беременности — рассчитать срок и дату родов | МедИнформ",
  description:
    "Бесплатный калькулятор беременности онлайн: рассчитайте текущий срок, предполагаемую дату родов (ПДР) и дату выхода в декретный отпуск по дате последней менструации.",
  alternates: { canonical: "/kalculator-beremennosti" },
};

export default function PregnancyCalculatorPage() {
  return (
    <Section animate={false} className="pt-14 sm:pt-20">
      <SectionHeading
        as="h1"
        eyebrow="Калькулятор"
        title="Калькулятор беременности"
        description="Рассчитайте срок беременности и предполагаемую дату родов. Все расчёты основаны на дате последней менструации."
      />

      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div className="order-1 md:order-2">
          <Image
            src="/images/doctor-documents.jpg"
            alt="Медицинский специалист изучает документы"
            width={640}
            height={480}
            className="w-full h-auto rounded-2xl object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div className="order-2 md:order-1">
          <PregnancyCalculator />
        </div>
      </div>

      <div className="mt-10 max-w-3xl mx-auto text-center text-sm text-[var(--color-muted)]">
        <p>
          Узнайте больше о медикаментозном прерывании беременности в разделе{" "}
          <Link href="/stati" className="underline text-[var(--color-primary)] hover:text-[var(--color-accent-dark)]">
            «Статьи»
          </Link>{" "}
          или уточните детали на странице{" "}
          <Link href="/kontakty" className="underline text-[var(--color-primary)] hover:text-[var(--color-accent-dark)]">
            «Контакты»
          </Link>
          .
        </p>
        <p className="mt-2">
          Смотрите также:{" "}
          <Link
            href="/test-na-beremennost"
            className="underline text-[var(--color-primary)] hover:text-[var(--color-accent-dark)]"
          >
            Тест на беременность →
          </Link>
        </p>
      </div>
    </Section>
  );
}
