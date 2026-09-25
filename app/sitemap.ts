import type { MetadataRoute } from "next";

import { defaultLocale, localePath, locales, routes } from "@/lib/locale";
import { siteConfig } from "@/data/siteConfig";

const NOINDEX: readonly string[] = ["/thank-you", "/logos"];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteConfig.business.website;

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
