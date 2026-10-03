import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/articles-db";
import { siteConfig } from "@/lib/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ["/", "/stati", "/kontakty", "/o-nas"].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.7,
  }));

  const slugs = await getAllSlugs();
  const articleRoutes = slugs.map((slug) => ({
    url: `${siteConfig.url}/stati/${slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...articleRoutes];
}
