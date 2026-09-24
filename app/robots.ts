import type { MetadataRoute } from "next";

import { siteUrl, siteUrlConfigured } from "@/lib/siteUrl";

export default function robots(): MetadataRoute.Robots {
  // No domain yet: keep crawlers off the Vercel preview host.
  if (!siteUrlConfigured) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Also noindex and out of the sitemap.
      disallow: ["/thank-you", "/es/thank-you"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
