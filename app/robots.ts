import type { MetadataRoute } from "next";

import { siteUrl, siteUrlConfigured } from "@/lib/siteUrl";

/**
 * The indexing gate.
 *
 * Until a real domain is configured this site tells every crawler to stay out,
 * and that is the deliberate default rather than an oversight.
 *
 * The reasoning: without a domain the only host available is a Vercel preview.
 * If Google indexes that, the preview becomes the canonical version of this
 * business in its eyes, and moving to the real domain later costs redirects and
 * whatever ranking had accumulated on the wrong host. Nothing links here yet, so
 * waiting costs nothing and not waiting costs a canonical.
 *
 * Set `NEXT_PUBLIC_SITE_URL` and this flips to a normal allow-list in the same
 * deploy that makes the sitemap real.
 */
export default function robots(): MetadataRoute.Robots {
  if (!siteUrlConfigured) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      /**
       * `/thank-you` is `noindex` in its own metadata and absent from the
       * sitemap. Disallowing it here as well keeps the three consistent: a page
       * Google is told not to index should not be crawled to find that out.
       *
       * Both locales, because `/es/thank-you` is the same page in Spanish.
       */
      disallow: ["/thank-you", "/es/thank-you"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
