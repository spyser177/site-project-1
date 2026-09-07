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
  preload: true,
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
  preload: true,
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

/** Класс для <html>, подключающий все переменные шрифтов */
export const fontVariables = [
  manropeCyrillic.variable,
  manropeLatin.variable,
  loraCyrillic.variable,
  loraLatin.variable,
].join(" ");
