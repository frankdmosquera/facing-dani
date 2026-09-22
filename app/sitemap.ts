import type { MetadataRoute } from "next";

import { defaultLocale, localePath, locales, routes } from "@/lib/locale";
import { siteUrl } from "@/lib/siteUrl";

/**
 * Every page, in both languages, generated from the one route manifest.
 *
 * `routes` in `lib/locale.ts` already drives `generateStaticParams` and the
 * rewrites in `next.config.ts`. Generating from it again here means adding a
 * page is still one line in one file - a sitemap with its own hand-written list
 * is a sitemap that goes stale the first time somebody forgets it.
 *
 * Returns nothing at all when no site URL is configured. The sitemap protocol
 * requires absolute URLs, and the only absolute URL available without a domain
 * would be a preview host - which is exactly what `robots.ts` is refusing to
 * let anyone index. An empty sitemap is honest; one full of temporary URLs is a
 * request to index the wrong site.
 */

/** Pages that tell crawlers not to index them do not belong in a sitemap. */
const NOINDEX: readonly string[] = ["/thank-you"];

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return [];

  const indexable = routes.filter((route) => !NOINDEX.includes(route));

  return indexable.flatMap((route) =>
    locales.map((locale) => ({
      url: `${siteUrl}${localePath(locale, route)}`,
      /**
       * The same three links each page already carries in its head. Repeating
       * them here is what tells Google the two locales are one page in two
       * languages rather than two pages competing.
       */
      alternates: {
        languages: {
          en: `${siteUrl}${localePath("en", route)}`,
          es: `${siteUrl}${localePath("es", route)}`,
          "x-default": `${siteUrl}${localePath(defaultLocale, route)}`,
        },
      },
      /**
       * `lastModified`, `changeFrequency` and `priority` are all deliberately
       * absent. Google has said for years that it ignores the last two, and a
       * `lastModified` that really means "whenever the build ran" is a lie told
       * to a crawler on every deploy - it trains Google to distrust the field
       * on a site that might one day need it.
       */
    })),
  );
}
