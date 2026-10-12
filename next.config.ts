import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

/**
 * Хост S3-хранилища вычисляется из S3_ENDPOINT, чтобы next/image разрешал
 * загрузку только с реального бакета, а не с произвольных https-хостов.
 * Если S3_ENDPOINT не задан (например, при первой локальной сборке без
 * бэкенда) — используем безопасный пустой список вместо wildcard.
 */
function getS3RemotePattern() {
  const endpoint = process.env.S3_ENDPOINT;
  if (!endpoint) return [];
  try {
    const url = new URL(endpoint);
    return [
      {
        protocol: url.protocol.replace(":", "") as "http" | "https",
        hostname: url.hostname,
      },
    ];
  } catch {
    return [];
  }
}

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: getS3RemotePattern(),
  },
  async redirects() {
    return [
      {
        source: "/glavnaya",
        destination: "/",
        permanent: true,
      },
      {
        // Публичный /admin остаётся заблокирован — это НЕ путь к Payload.
        // Payload-админка намеренно смонтирована на отдельном непубличном
        // сегменте (см. PAYLOAD_ADMIN_SEGMENT в .env и src/payload.config.ts),
        // чтобы не обнажать существование CMS по предсказуемому адресу.
        source: "/admin",
        destination: "/404",
        permanent: false,
      },
      {
        source: "/admin/:path*",
        destination: "/404",
        permanent: false,
      },
      // Статьи, у которых slug был изменён после публикации, но Яндекс
      // уже успел проиндексировать старые URL. Эти редиректы сохраняют
      // ссылочный вес и устраняют 404 в Вебмастере Яндекса.
      {
        source: "/stati/podgotovka-k-priemu-mifepristona-osnovnye-rekomendatsii",
        destination: "/stati/podgotovka-k-priemu-mifepristona-rekomendacii",
        permanent: true,
      },
      {
        source: "/stati/mifepriston-i-mizoprostol-voprosy-effektivnosti-i-bezopasnosti",
        destination: "/stati/mifepriston-i-mizoprostol-effektivnost-i-bezopasnost",
        permanent: true,
      },
      {
        source: "/stati/chto-takoe-medikamentoznyy-metod-i-ego-otlichie-ot-drugih-podhodov",
        destination: "/stati/chto-takoe-medikamentoznyy-metod-i-otlichie-ot-drugih-podhodov",
        permanent: true,
      },
      {
        source: "/stati/mifepriston-i-mizoprostol-vozmozhnye-pobochnye-effekty",
        destination: "/stati/mifepriston-i-mizoprostol-pobochnye-effekty",
        permanent: true,
      },
      {
        source: "/stati/medikamentoznyy-metod-opyt-zhenshchin-i-mnenie-spetsialistov",
        destination: "/stati/medikamentoznyy-metod-opyt-zhenshchin-i-mnenie-specialistov",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
        ],
      },
      {
        // HTML/страницы: короткий max-age вместо жёсткого no-cache —
        // no-cache заставлял CDN (Gcore) ревалидировать на каждый запрос,
        // добавляя round-trip CDN→origin на каждый визит и регрессию LCP.
        // max-age=30 позволяет CDN/браузеру отдать HTML из кэша до 30с,
        // существенно меньше 24ч retention старых чанков в static-cache/ (см.
        // scripts/zero-downtime-deploy.sh), поэтому zero-downtime не нарушается: даже если
        // клиент/CDN отдаст старый HTML до 30 секунд после деплоя, ссылки на
        // старые чанки всё ещё будут отвечать с диска (гораздо дольше, чем 30с).
        // must-revalidate гарантирует, что после истечения max-age кэш не использует stale.
        source: "/((?!_next/static|_next/image|favicon.ico).*)",
        headers: [
          {
            key: "Cache-Control",
            value: "max-age=30, must-revalidate",
          },
        ],
      },
      {
        // Чанки с хэшем в пути — неизменяемы, кэшируем агрессивно и
        // надолго и на CDN, и в браузере. Старые чанки продолжают
        // отдаваться Nginx прямо с диска (static-cache/<buildId>) минимум
        // 24 часа после деплоя — см. scripts/zero-downtime-deploy.sh.
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  webpack: (config, { isServer, dev }) => {
    // ТСПУ (российская система блокировки) обрывает TLS-соединение, если
    // ОДИН HTTP-ответ превышает ~25-30 КБ (см. тест с Range-запросами к
    // CSS-чанку: два запроса <25 КБ каждый прошли полностью, тогда как
    // цельный файл 34881 байт рвался). Поэтому на проде режем клиентские
    // JS-чанки на куски <20 КБ (raw, до gzip), чтобы каждый HTTP-ответ
    // укладывался в порог ТСПУ. На dev и на сервере не трогаем —
    // не влияет на ТСПУ и усложнит отладку.
    if (!isServer && !dev) {
      config.optimization.splitChunks = {
        chunks: "all",
        maxSize: 20000,
        minSize: 5000,
        maxInitialRequests: 30,
        maxAsyncRequests: 30,
        cacheGroups: {
          default: false,
          vendors: false,
          framework: {
            chunks: "all",
            name: "framework",
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler|next)[\\/]/,
            priority: 40,
            enforce: true,
          },
          lib: {
            test(module: { size: () => number }) {
              return module.size() > 100000;
            },
            name(module: { identifier: () => string }) {
              const crypto = require("crypto");
              const hash = crypto
                .createHash("sha1")
                .update(module.identifier())
                .digest("hex");
              return hash.substring(0, 8);
            },
            priority: 30,
            minChunks: 1,
            reuseExistingChunk: true,
          },
          commons: {
            name: "commons",
            minChunks: 2,
            priority: 20,
          },
        },
      };
    }
    return config;
  },
};

export default withPayload(nextConfig);
