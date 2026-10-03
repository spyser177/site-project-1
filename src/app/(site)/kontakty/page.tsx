import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { Card } from "@/components/Card";
import { Icon, type IconName } from "@/components/Icon";
import { ContactForm } from "@/components/ContactForm";
import { siteConfig, phoneHref } from "@/lib/config";
import { getPage } from "@/lib/pages";
import { PAGE_DEFAULTS } from "@/lib/page-defaults";

// Текст страницы редактируется из админ-панели, поэтому рендерится
// динамически на каждый запрос.
export const dynamic = "force-dynamic";

const DEFAULTS = PAGE_DEFAULTS.kontakty;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage("kontakty", DEFAULTS);
  return {
    title: page.metaTitle ?? DEFAULTS.metaTitle,
    description: page.metaDescription ?? DEFAULTS.metaDescription,
    alternates: { canonical: "/kontakty" },
  };
}

const contactItems: { icon: IconName; label: string; value: string; href: string; goal: string }[] = [
  {
    icon: "mapPin",
    label: "Адрес",
    value: siteConfig.address,
    href: "#",
    goal: "address_view",
  },
  {
    icon: "phone",
    label: "Телефон",
    value: siteConfig.phone,
    href: phoneHref(),
    goal: "phone_click",
  },
  {
    icon: "mail",
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    goal: "email_click",
  },
  {
    icon: "telegram",
    label: "Telegram",
    value: "Написать в Telegram",
    href: siteConfig.telegram,
    goal: "telegram_click",
  },
  {
    icon: "whatsapp",
    label: "WhatsApp",
    value: "Написать в WhatsApp",
    href: siteConfig.whatsapp,
    goal: "whatsapp_click",
  },
];

export default async function KontaktyPage() {
  const page = await getPage("kontakty", DEFAULTS);

  return (
    <Section animate={false} className="pt-14 sm:pt-20">
      <SectionHeading
        as="h1"
        eyebrow="Контакты"
        title={page.title ?? DEFAULTS.title ?? ""}
        description={page.description ?? DEFAULTS.description}
      />

      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-3">
          {contactItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="flex items-center gap-4 p-4 rounded-2xl border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-colors bg-[var(--color-surface)]"
              data-ym-goal={item.goal}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: "var(--color-surface-muted)" }}
              >
                <Icon name={item.icon} className="w-5 h-5 text-[var(--color-primary)]" />
              </div>
              <div>
                <p className="text-xs text-[var(--color-muted)]">{item.label}</p>
                <p className="font-medium text-[var(--color-text)]">{item.value}</p>
              </div>
            </a>
          ))}
        </div>

        <Card>
          <h2 className="text-xl font-semibold text-[var(--color-primary)] mb-5">
            Написать нам
          </h2>
          <ContactForm />
        </Card>
      </div>
    </Section>
  );
}
