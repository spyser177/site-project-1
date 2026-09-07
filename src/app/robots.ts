import type { MetadataRoute } from "next";
import { siteConfig, adminPanelPath } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/admin/", `${adminPanelPath}`, "/api/"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
