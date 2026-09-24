import type { MetadataRoute } from "next";

import { defaultLocale, localePath, locales, routes } from "@/lib/locale";
import { siteUrl } from "@/lib/siteUrl";

const NOINDEX: readonly string[] = ["/thank-you"];

export default function sitemap(): MetadataRoute.Sitemap {
  // Sitemaps need absolute URLs, and without a domain the only host is a preview.
  if (!siteUrl) return [];

  const indexable = routes.filter((route) => !NOINDEX.includes(route));

  // No lastModified, changeFrequency or priority: Google ignores the last two, and a build date is not a real edit date.
  return indexable.flatMap((route) =>
    locales.map((locale) => ({
      url: `${siteUrl}${localePath(locale, route)}`,
      alternates: {
        languages: {
          en: `${siteUrl}${localePath("en", route)}`,
          es: `${siteUrl}${localePath("es", route)}`,
          "x-default": `${siteUrl}${localePath(defaultLocale, route)}`,
        },
      },
    })),
  );
}
