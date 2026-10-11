// English lives at the root and Spanish under /es. proxy.ts does the mapping.

export const locales = ["en", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

// Every route without its locale prefix. Feeds the sitemap; a page missing here is still served, just not listed.
export const routes = [
  "/",
  "/parties",
  "/store",
  "/lashes",
  "/makeup",
  "/gallery",
  "/faq",
  "/contact",
  "/thank-you",
] as const;

// localePath("en", "/parties") -> "/parties", localePath("es", "/parties") -> "/es/parties"
export function localePath(locale: Locale, path: string): string {
  const clean = path === "/" ? "" : path;
  if (locale === defaultLocale) return clean || "/";
  return `/${locale}${clean}`;
}

// Strips /en too: under the rewrite, usePathname may report either "/" or "/en".
export function stripLocale(pathname: string): string {
  for (const locale of locales) {
    if (pathname === `/${locale}`) return "/";
    if (pathname.startsWith(`/${locale}/`)) {
      return pathname.slice(locale.length + 1) || "/";
    }
  }
  return pathname || "/";
}
