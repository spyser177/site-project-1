"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "./Icon";
import { siteConfig, phoneHref } from "@/lib/config";

const navLinks = [
  { href: "/glavnaya", label: "Главная" },
  { href: "/stati", label: "Статьи" },
  { href: "/o-nas", label: "О нас" },
  { href: "/kontakty", label: "Контакты" },
];

/** Шапка сайта: логотип, навигация, телефон (иконка на мобилке) */
export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 bg-[var(--color-bg)]/95 backdrop-blur border-b border-[var(--color-border)]">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link
          href="/glavnaya"
          className="font-serif text-xl font-semibold text-[var(--color-primary)]"
        >
          Мед<span className="text-[var(--color-accent)]">Информ</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-[var(--color-accent-dark)] ${
                pathname === link.href
                  ? "text-[var(--color-accent-dark)]"
                  : "text-[var(--color-text)]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          href={phoneHref()}
          className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-accent-dark)]"
          data-ym-goal="phone_click"
        >
          <Icon name="phone" className="w-4 h-4" />
          {siteConfig.phone}
        </a>

        <a
          href={phoneHref()}
          className="md:hidden p-2 text-[var(--color-primary)]"
          aria-label="Позвонить"
          data-ym-goal="phone_click"
        >
          <Icon name="phone" className="w-5 h-5" />
        </a>
      </div>
    </header>
  );
}
