"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Пункт навигации в шапке сайта с подсветкой активного раздела.
 * Вынесен в отдельный клиентский компонент, чтобы сам <Header/> мог
 * оставаться серверным (и напрямую читать header-settings через Payload
 * Local API) — usePathname работает только в клиентских компонентах.
 */
export function NavLink({ href, children }: { href: string; children: ReactNode }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`text-sm font-medium transition-colors hover:text-[var(--color-accent-dark)] ${
        isActive ? "text-[var(--color-accent-dark)]" : "text-[var(--color-text)]"
      }`}
    >
      {children}
    </Link>
  );
}
