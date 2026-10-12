import localFont from "next/font/local";

/**
 * Локальные самохостящиеся шрифты (без Google Fonts CDN).
 * Manrope — основной текст, Lora — заголовки (спокойный гуманистический сериф).
 *
 * Сайт полностью русскоязычный, поэтому latin-подсеты (Fontsource) НЕ
 * подключаются — они не используются ни в одном видимом тексте, но ранее
 * грузились как отдельные @font-face (9 файлов, ~156 КБ), увеличивая
 * initial payload и бьющий по порогу ТСПУ на российских маршрутах.
 * Латинские буквы (редкие аббревиатуры и т.п.) рендерятся через системный
 * fallback-шрифт в конце font-stack (см. --font-sans/--font-serif в globals.css).
 *
 * Вес 800 (extrabold) у Manrope не используется ни в Tailwind-классах,
 * ни в CSS — исключён, чтобы не грузить лишний файл.
 */

const manropeCyrillic = localFont({
  src: [
    { path: "../../public/fonts/manrope-cyrillic-400.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/manrope-cyrillic-500.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/manrope-cyrillic-600.woff2", weight: "600", style: "normal" },
    { path: "../../public/fonts/manrope-cyrillic-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-manrope-cyr",
  display: "swap",
  // preload:true на массиве из 4 файлов преload-ит ВСЕ 4 веса сразу —
  // это конкурирует за полосу пропускания с LCP-ресурсом. Отключено намеренно.
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
  loraCyrillic.variable,
  loraCyrillic600Preload.variable,
].join(" ");
