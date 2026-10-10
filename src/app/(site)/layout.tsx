import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileTabBar } from "@/components/MobileTabBar";
import { ScrollAnimations } from "@/components/ScrollAnimations";
import { YandexMetrika } from "@/components/YandexMetrika";
import { siteConfig } from "@/lib/config";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default:
      "Медикаментозное прерывание беременности: мифепристон и мизопростол",
    template: "%s | МедИнформ",
  },
  description:
    "Информационный портал о медикаментозном прерывании беременности: как действуют мифепристон и мизопростол, подготовка, восстановление, ответы на частые вопросы.",
  robots: { index: true, follow: true },
  verification: {
    yandex: "a830340fde9ba796",
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "МедИнформ",
    title: "Медикаментозное прерывание беременности: мифепристон и мизопростол",
    description:
      "Информационный портал о медикаментозном прерывании беременности: механизм действия препаратов, подготовка и восстановление.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.legalName,
    url: siteConfig.url,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    description:
      "Информационный портал о медикаментозном прерывании беременности.",
  };

  return (
    <html lang="ru" className={fontVariables}>
      <body className="min-h-screen flex flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileTabBar />
        <ScrollAnimations />
        <YandexMetrika />
      </body>
    </html>
  );
}
