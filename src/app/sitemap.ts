import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/articles";
import { siteConfig } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/glavnaya", "/stati", "/kontakty", "/o-nas"].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "/glavnaya" ? 1 : 0.7,
  }));

  const articleRoutes = getAllSlugs().map((slug) => ({
    url: `${siteConfig.url}/stati/${slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...articleRoutes];
}
