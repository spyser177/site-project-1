"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Icon, type IconName } from "@/components/Icon";

const navItems: { href: string; label: string; icon: IconName }[] = [
  { href: "", label: "Дашборд", icon: "chart" },
  { href: "/submissions", label: "Заявки", icon: "mail" },
  { href: "/articles", label: "Статьи", icon: "list" },
  { href: "/pages", label: "Страницы", icon: "clipboard" },
  { href: "/settings", label: "Настройки", icon: "clipboard" },
];

interface AdminSidebarProps {
  username: string;
  panelPath: string;
}

/** Боковая навигация админ-панели */
export function AdminSidebar({ username, panelPath }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push(`${panelPath}/login`);
    router.refresh();
  }

  return (
    <aside className="w-64 shrink-0 bg-[var(--color-primary-dark)] text-white p-6 hidden sm:flex flex-col">
      <p className="font-serif text-lg font-semibold mb-1">Админ-панель</p>
      <p className="text-xs text-white/50 mb-8">{username}</p>

      <nav className="space-y-1 flex-1">
        {navItems.map((item) => {
          const href = `${panelPath}${item.href}`;
          const active = pathname === href || (item.href !== "" && pathname.startsWith(href));
          return (
            <Link
              key={item.href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                active ? "bg-white/15" : "hover:bg-white/10 text-white/80"
              }`}
            >
              <Icon name={item.icon} className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={handleLogout}
        className="mt-6 text-sm text-white/60 hover:text-white text-left"
      >
        Выйти
      </button>
    </aside>
  );
}
