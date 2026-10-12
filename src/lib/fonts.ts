import localFont from "next/font/local";

/**
 * Локальные самохостящиеся шрифты (без Google Fonts CDN).
 * Manrope — основной текст, Lora — заголовки (спокойный гуманистический сериф).
 *
 * Кириллица и латиница поставляются как раздельные файлы (Fontsource),
 * поэтому каждый скрипт подключается отдельным вызовом localFont и
 * объединяется в общий font-stack через CSS-переменные (браузер сам
 * выбирает файл, в котором есть нужный глиф).
 */

const manropeCyrillic = localFont({
  src: [
    { path: "../../public/fonts/manrope-cyrillic-400.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/manrope-cyrillic-500.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/manrope-cyrillic-600.woff2", weight: "600", style: "normal" },
    { path: "../../public/fonts/manrope-cyrillic-700.woff2", weight: "700", style: "normal" },
    { path: "../../public/fonts/manrope-cyrillic-800.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-manrope-cyr",
  display: "swap",
  // preload:true на массиве из 5 файлов преload-ит ВСЕ 5 весов сразу —
  // это конкурирует за полосу пропускания с LCP-ресурсом. Отключено намеренно.
  preload: false,
});

const manropeLatin = localFont({
  src: [
    { path: "../../public/fonts/manrope-latin-400.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/manrope-latin-500.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/manrope-latin-600.woff2", weight: "600", style: "normal" },
    { path: "../../public/fonts/manrope-latin-700.woff2", weight: "700", style: "normal" },
    { path: "../../public/fonts/manrope-latin-800.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-manrope-lat",
  display: "swap",
  preload: false,
});

const loraCyrillic = localFont({
  src: [
    { path: "../../public/fonts/lora-cyrillic-400.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/lora-cyrillic-500.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/lora-cyrillic-600.woff2", weight: "600", style: "normal" },
    { path: "../../public/fonts/lora-cyrillic-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-lora-cyr",
  display: "swap",
  // Фактический @font-face для веса 600 всё равно рендерится отсюда (единая
  // CSS-переменная, браузер матчит файл по font-weight). Preload этой группы
  // отключён, чтобы не тянуть все 4 файла разом — точечный preload-hint для
  // LCP-файла (600) объявлен отдельно ниже.
  preload: false,
});

const loraLatin = localFont({
  src: [
    { path: "../../public/fonts/lora-latin-400.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/lora-latin-500.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/lora-latin-600.woff2", weight: "600", style: "normal" },
    { path: "../../public/fonts/lora-latin-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-lora-lat",
  display: "swap",
  preload: false,
});

/**
 * Точечный preload ТОЛЬКО для lora-cyrillic-600.woff2 — это шрифт LCP-элемента:
 * h1/h2/h3 рендерятся через var(--font-serif) с font-weight 600 (см. globals.css),
 * и именно h1 на главной (text-4xl/5xl font-semibold) является LCP-элементом.
 *
 * Файл подключён отдельным вызовом localFont исключительно ради preload-хинта
 * в <head> (Next.js генерирует <link rel="preload" as="font"> для каждого
 * localFont с preload:true). Сам текст по-прежнему рендерится через font-face
 * из loraCyrillic выше — переменная --font-lora-cyr-600-preload нигде не
 * используется в CSS, чтобы не задваивать @font-face объявления.
 */
const loraCyrillic600Preload = localFont({
  src: "../../public/fonts/lora-cyrillic-600.woff2",
  weight: "600",
  style: "normal",
  variable: "--font-lora-cyr-600-preload",
  display: "swap",
  preload: true,
});

/** Класс для <html>, подключающий все переменные шрифтов */
export const fontVariables = [
  manropeCyrillic.variable,
  manropeLatin.variable,
  loraCyrillic.variable,
  loraLatin.variable,
  loraCyrillic600Preload.variable,
].join(" ");
