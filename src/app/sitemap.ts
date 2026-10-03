import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/articles";
import { siteConfig } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/", "/stati", "/kontakty", "/o-nas"].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.7,
  }));

  const articleRoutes = getAllSlugs().map((slug) => ({
    url: `${siteConfig.url}/stati/${slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...articleRoutes];
}
