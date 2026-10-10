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
};

export default withPayload(nextConfig);
