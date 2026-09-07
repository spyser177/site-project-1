import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { Card } from "@/components/Card";
import { Icon, type IconName } from "@/components/Icon";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "О нас",
  description:
    "О информационном портале, посвящённом медикаментозному прерыванию беременности: мифепристону, мизопростолу и общим вопросам подготовки и восстановления.",
  alternates: { canonical: "/o-nas" },
};

const principles: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "flask",
    title: "Точность формулировок",
    text: "Мы описываем механизм действия мифепристона и мизопростола на основе общих медицинских представлений, избегая упрощений и мифов.",
  },
  {
    icon: "shield",
    title: "Общеинформационный характер",
    text: "Материалы портала не заменяют очную консультацию специалиста и не являются медицинским назначением.",
  },
  {
    icon: "check",
    title: "Актуальность",
    text: "Мы регулярно пересматриваем содержание статей, чтобы отражать текущие представления о безопасности и эффективности метода.",
  },
  {
    icon: "heart",
    title: "Уважение к читателю",
    text: "Пишем спокойным, поддерживающим языком, понимая, что тема требует деликатности.",
  },
];

export default function ONasPage() {
  return (
    <>
      <Section animate={false} className="pt-14 sm:pt-20">
        <SectionHeading
          as="h1"
          eyebrow="О портале"
          title="Информационный портал о медикаментозном прерывании беременности"
          description="Мы собираем и систематизируем общедоступную информацию о мифепристоне, мизопростоле и медикаментозном методе прерывания беременности, чтобы помочь читателям разобраться в теме перед обращением к специалисту."
        />
      </Section>

      <Section muted>
        <SectionHeading eyebrow="Наши принципы" title="Почему нам можно доверять" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {principles.map((item) => (
            <Card key={item.title}>
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: "var(--color-surface-muted)" }}
              >
                <Icon name={item.icon} className="w-5 h-5 text-[var(--color-primary)]" />
              </div>
              <h3 className="font-semibold text-[var(--color-primary)] mb-2">{item.title}</h3>
              <p className="text-sm text-[var(--color-muted)] leading-relaxed">{item.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <div className="max-w-3xl space-y-4 text-[var(--color-text)] leading-relaxed">
          <h2 className="text-2xl font-semibold text-[var(--color-primary)]">
            Как устроена работа с материалами
          </h2>
          <p>
            Каждая статья на портале готовится с опорой на общие данные об эффективности
            и безопасности медикаментозного метода, включая сведения о механизме действия
            мифепристона и мизопростола, типичных ощущениях и сроках восстановления.
          </p>
          <p>
            Мы не указываем способы приобретения препаратов и не даём индивидуальных
            медицинских назначений — все решения о конкретном лечении принимаются
            совместно с профильным специалистом после очного осмотра и обследования.
          </p>
        </div>
      </Section>

      <Section muted animate={false}>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-semibold text-[var(--color-primary)]">
            Есть вопросы о материалах портала?
          </h2>
          <p className="mt-4 text-[var(--color-muted)]">
            Напишите нам — ответим на общие вопросы и поможем найти нужную статью.
          </p>
          <div className="mt-8">
            <Button href="/kontakty" size="lg" variant="accent">
              Связаться с нами
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
