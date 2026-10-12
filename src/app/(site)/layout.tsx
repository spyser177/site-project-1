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
      {/*
       * Явный preload критичного шрифта для LCP-текста (H1 в hero-секции
       * использует font-serif → Lora Cyrillic, вес 600 — см. globals.css).
       * next/font с preload:true не генерирует автоматически <link rel="preload">,
       * потому что объект шрифта создаётся в src/lib/fonts.ts и используется
       * здесь только как CSS-переменная (fontVariables), а не напрямую в этом
       * файле — автоматическое отслеживание next/font работает только при
       * использовании font.className/font.variable в том же модуле, где вызван
       * localFont(). Поэтому приоритетный шрифт заголовка преолоадим вручную,
       * чтобы браузер начал грузить его сразу, не дожидаясь парсинга CSS.
       */}
      <link
        rel="preload"
        href="/_next/static/media/6df5f53114fbb9c4-s.p.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
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
