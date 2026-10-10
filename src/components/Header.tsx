import Link from "next/link";
import Image from "next/image";
import { Icon } from "./Icon";
import { NavLink } from "./NavLink";
import { getPayloadClient } from "@/lib/payload";
import { getMediaUrl, getMediaAlt } from "@/lib/media";
import { siteConfig, phoneHref } from "@/lib/config";

/** Пункты меню по умолчанию — используются, если в header-settings ничего не задано. */
const defaultMenu = [
  { label: "Главная", link: "/" },
  { label: "Статьи", link: "/stati" },
  { label: "О нас", link: "/o-nas" },
  { label: "Контакты", link: "/kontakty" },
];

interface HeaderSettingsDoc {
  logo?: { url?: string | null; alt?: string | null } | number | string | null;
  menu?: { label: string; link: string }[] | null;
  phone?: string | null;
  telegram_url?: string | null;
  whatsapp_url?: string | null;
  email?: string | null;
}

/**
 * Шапка сайта: логотип, меню, телефон и соцсети редактируются из
 * header-settings в Payload. Серверный компонент (RootLayout рендерит её
 * на каждый запрос), поэтому изменения из админки сразу видны на сайте.
 * Подсветка активного пункта меню вынесена в клиентский <NavLink/>.
 */
export async function Header() {
  let settings: HeaderSettingsDoc | null = null;
  try {
    const payload = await getPayloadClient();
    settings = (await payload.findGlobal({ slug: "header-settings" })) as HeaderSettingsDoc;
  } catch (error) {
    console.warn("[Header] Не удалось получить header-settings из Payload", error);
  }

  const menu =
    settings?.menu && settings.menu.length > 0
      ? settings.menu.map((item) => ({ label: item.label, link: item.link }))
      : defaultMenu;

  const phone = settings?.phone || siteConfig.phone;
  const telegram = settings?.telegram_url || siteConfig.telegram;
  const whatsapp = settings?.whatsapp_url || siteConfig.whatsapp;
  const email = settings?.email || siteConfig.email;
  const logoUrl = getMediaUrl(settings?.logo ?? null);
  const logoAlt = getMediaAlt(settings?.logo ?? null, siteConfig.name);

  return (
    <header className="sticky top-0 z-40 bg-[var(--color-bg)]/95 backdrop-blur border-b border-[var(--color-border)]">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={logoAlt}
              width={160}
              height={40}
              className="h-9 w-auto"
              priority
            />
          ) : (
            <span className="font-serif text-xl font-semibold text-[var(--color-primary)]">
              Мед<span className="text-[var(--color-accent)]">Информ</span>
            </span>
          )}
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {menu.map((link) => (
            <NavLink key={link.link} href={link.link}>
              {link.label}
            </NavLink>
          ))}

          <div className="flex items-center gap-2">
            <a
              href={telegram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className="flex items-center justify-center w-8 h-8 rounded-full bg-[#26A5E4] text-white transition-opacity hover:opacity-85"
              data-ym-goal="telegram_click"
            >
              <Icon name="telegram" className="w-4 h-4" />
            </a>
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex items-center justify-center w-8 h-8 rounded-full bg-[#25D366] text-white transition-opacity hover:opacity-85"
              data-ym-goal="whatsapp_click"
            >
              <Icon name="whatsapp" className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${email}`}
              aria-label="Email"
              className="flex items-center justify-center w-8 h-8 rounded-full bg-[#EA4335] text-white transition-opacity hover:opacity-85"
              data-ym-goal="email_click"
            >
              <Icon name="mail" className="w-4 h-4" />
            </a>
          </div>
        </nav>

        <a
          href={phoneHref(phone)}
          className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-accent-dark)]"
          data-ym-goal="phone_click"
        >
          <Icon name="phone" className="w-4 h-4" />
          {phone}
        </a>

        <div className="flex md:hidden items-center gap-1.5">
          <a
            href={telegram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram"
            className="flex items-center justify-center w-8 h-8 rounded-full bg-[#26A5E4] text-white transition-opacity hover:opacity-85"
            data-ym-goal="telegram_click"
          >
            <Icon name="telegram" className="w-4 h-4" />
          </a>
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="flex items-center justify-center w-8 h-8 rounded-full bg-[#25D366] text-white transition-opacity hover:opacity-85"
            data-ym-goal="whatsapp_click"
          >
            <Icon name="whatsapp" className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${email}`}
            aria-label="Email"
            className="flex items-center justify-center w-8 h-8 rounded-full bg-[#EA4335] text-white transition-opacity hover:opacity-85"
            data-ym-goal="email_click"
          >
            <Icon name="mail" className="w-4 h-4" />
          </a>
          <a
            href={phoneHref(phone)}
            className="p-2 text-[var(--color-primary)]"
            aria-label="Позвонить"
            data-ym-goal="phone_click"
          >
            <Icon name="phone" className="w-5 h-5" />
          </a>
        </div>
      </div>
    </header>
  );
}
