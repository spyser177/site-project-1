import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { Card } from "@/components/Card";
import Link from "next/link";
import { Icon, type IconName } from "@/components/Icon";
import { getPayloadClient } from "@/lib/payload";
import { phoneHref, siteConfig } from "@/lib/config";
import {
  getMediaAlt,
  getMediaSrcSet,
  getMediaUrl,
  RESPONSIVE_SIZES_ATTR,
  type MediaLike,
} from "@/lib/media";

// Контакты и текст страницы редактируются из админ-панели (Payload:
// global site-settings + коллекция Pages, slug "kontakty"), поэтому
// страница рендерится динамически на каждый запрос.
export const dynamic = "force-dynamic";

interface SiteSettingsGlobal {
  phone?: string | null;
  email?: string | null;
  telegram?: string | null;
  whatsapp?: string | null;
  address?: string | null;
}

interface PageDoc {
  title?: string | null;
  subtitle?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
}

const DEFAULTS = {
  title: "Свяжитесь с нами",
  subtitle:
    "Ответим на общие вопросы о медикаментозном прерывании беременности, мифепристоне и мизопростоле. Для медицинской консультации рекомендуем очный приём специалиста.",
  metaTitle: "Контакты",
  metaDescription:
    "Свяжитесь с нами по телефону, email, Telegram или WhatsApp. Контактная форма для общих вопросов о медикаментозном прерывании беременности.",
};

async function getData() {
  const payload = await getPayloadClient();
  const [settings, pageResult, mediaResult] = await Promise.all([
    payload.findGlobal({ slug: "site-settings" }) as Promise<SiteSettingsGlobal>,
    payload.find({ collection: "pages", where: { slug: { equals: "kontakty" } }, limit: 1 }),
    payload.find({ collection: "media", where: { filename: { equals: "kontakty.webp" } }, limit: 1 }),
  ]);
  const page = (pageResult.docs[0] as PageDoc) ?? null;
  const heroImage = (mediaResult.docs[0] as MediaLike) ?? null;
  return { settings, page, heroImage };
}

export async function generateMetadata(): Promise<Metadata> {
  const { page } = await getData();
  return {
    title: page?.metaTitle ?? DEFAULTS.metaTitle,
    description: page?.metaDescription ?? DEFAULTS.metaDescription,
    alternates: { canonical: "/kontakty" },
  };
}

export default async function KontaktyPage() {
  const { settings, page, heroImage } = await getData();
  const heroUrl = getMediaUrl(heroImage);
  const heroSrcSet = getMediaSrcSet(heroImage);
  const heroAlt = getMediaAlt(heroImage, DEFAULTS.metaTitle);

  const phone = settings.phone || siteConfig.phone;
  const email = settings.email || siteConfig.email;
  const telegram = settings.telegram || siteConfig.telegram;
  const whatsapp = settings.whatsapp || siteConfig.whatsapp;
  const address = settings.address || siteConfig.address;

  const contactItems: { icon: IconName; label: string; value: string; href: string; goal: string }[] = [
    { icon: "mapPin", label: "Адрес", value: address, href: "#", goal: "address_view" },
    { icon: "phone", label: "Телефон", value: phone, href: phoneHref(phone), goal: "phone_click" },
    { icon: "mail", label: "Email", value: email, href: `mailto:${email}`, goal: "email_click" },
    { icon: "telegram", label: "Telegram", value: "Написать в Telegram", href: telegram, goal: "telegram_click" },
    { icon: "whatsapp", label: "WhatsApp", value: "Написать в WhatsApp", href: whatsapp, goal: "whatsapp_click" },
  ];

  const helpItems: { emoji: string; title: string; description: string; href: string; goal: string }[] = [
    {
      emoji: "📞",
      title: "Позвоните",
      description: "если нужна быстрая консультация",
      href: phoneHref(phone),
      goal: "phone_click",
    },
    {
      emoji: "✈️",
      title: "Напишите в Telegram",
      description: "если удобно в мессенджере",
      href: telegram,
      goal: "telegram_click",
    },
    {
      emoji: "💬",
      title: "Напишите в WhatsApp",
      description: "если предпочитаете его",
      href: whatsapp,
      goal: "whatsapp_click",
    },
    {
      emoji: "✉️",
      title: "Отправьте email",
      description: "если нужен развёрнутый ответ",
      href: `mailto:${email}`,
      goal: "email_click",
    },
  ];

  return (
    <Section animate={false} className="pt-14 sm:pt-20">
      <SectionHeading
        as="h1"
        eyebrow="Контакты"
        title={page?.title ?? DEFAULTS.title}
        description={page?.subtitle ?? DEFAULTS.subtitle}
      />

      {heroUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={heroUrl}
          srcSet={heroSrcSet}
          sizes={RESPONSIVE_SIZES_ATTR}
          alt={heroAlt}
          width={1200}
          height={800}
          className="mb-10 w-full rounded-2xl object-cover max-h-[420px]"
        />
      )}

      <div className="grid md:grid-cols-2 gap-10">
        <div>
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

          <p className="mt-4 text-xs text-[var(--color-muted)]">
            Нажимая на кнопку, вы соглашаетесь с{" "}
            <Link href="/privacy-policy" className="underline hover:text-[var(--color-primary)]">
              политикой обработки персональных данных
            </Link>
            .
          </p>
        </div>

        <Card>
          <h2 className="text-xl font-semibold text-[var(--color-primary)] mb-5">
            Как мы можем помочь
          </h2>
          <div className="space-y-4">
            {helpItems.map((item) => (
              <a
                key={item.title}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-start gap-4 group"
                data-ym-goal={item.goal}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 text-xl"
                  style={{ backgroundColor: "var(--color-surface-muted)" }}
                >
                  <span aria-hidden="true">{item.emoji}</span>
                </div>
                <div>
                  <p className="font-medium text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors">
                    {item.title}
                  </p>
                  <p className="text-sm text-[var(--color-muted)]">{item.description}</p>
                </div>
              </a>
            ))}
          </div>
        </Card>
      </div>
    </Section>
  );
}
