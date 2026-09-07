"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { IconName } from "./Icon";
import { Icon } from "./Icon";

const tabs: { href: string; label: string; icon: IconName }[] = [
  { href: "/glavnaya", label: "Главная", icon: "molecule" },
  { href: "/stati", label: "Статьи", icon: "list" },
  { href: "/kontakty", label: "Контакты", icon: "mail" },
];

/** Нижний таб-бар для мобильных устройств (заменяет гамбургер-меню) */
export function MobileTabBar() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--color-surface)] border-t border-[var(--color-border)] md:hidden"
      aria-label="Основная навигация"
    >
      <div className="flex justify-around">
        {tabs.map((tab) => {
          const active =
            pathname === tab.href || pathname.startsWith(`${tab.href}/`);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors ${
                active
                  ? "text-[var(--color-accent-dark)]"
                  : "text-[var(--color-muted)]"
              }`}
            >
              <Icon name={tab.icon} className="w-5 h-5" />
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
