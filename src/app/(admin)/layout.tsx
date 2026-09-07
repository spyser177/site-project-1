import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import "../globals.css";

export const metadata: Metadata = {
  title: "Админ-панель",
  robots: { index: false, follow: false },
};

/** Отдельный root layout для админ-панели — без публичного Header/Footer */
export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={fontVariables}>
      <body className="min-h-screen bg-[var(--color-surface-muted)] text-[var(--color-text)] antialiased">
        {children}
      </body>
    </html>
  );
}
