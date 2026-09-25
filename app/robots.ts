import type { MetadataRoute } from "next";

import { siteConfig } from "@/data/siteConfig";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Also noindex and out of the sitemap.
      disallow: ["/thank-you", "/es/thank-you"],
    },
    sitemap: `${siteConfig.business.website}/sitemap.xml`,
  };
}
