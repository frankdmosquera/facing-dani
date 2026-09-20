/**
 * Locale routing, hand-rolled. Two languages and eight pages do not need a
 * package, and the no-install rule applies.
 *
 * English lives at the root and Spanish under /es. That is a ranking decision,
 * not a cosmetic one: a subdomain or a separate domain would split a signal
 * this site has none of to spare, and a redirect on / would sit between the
 * Instagram bio link and the page.
 */

export const locales = ["en", "es"] as const;

export type Locale = (typeof locales)[number];

/** The one that gets the bare root. */
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Every route the site serves, without a locale prefix.
 *
 * One list, three consumers: `generateStaticParams`, the root rewrites in
 * `next.config.ts`, and later the sitemap. Adding a page means adding one line
 * here, which is also the moment you notice it needs both languages.
 *
 * Only "/" exists today. The rest are the provisional English slugs recorded in
 * siteConfig, listed so the rewrite covers them the day their page lands.
 */
export const routes = [
  "/",
  "/nails",
  "/lashes",
  "/makeup",
  "/gallery",
  "/about",
  "/contact",
  "/thank-you",
] as const;

/**
 * Build a public href. The locale prefix is owned here and nowhere else, so
 * when the Spanish slugs are decided this is the single file that changes.
 *
 *   localePath("en", "/nails")  ->  "/nails"
 *   localePath("es", "/nails")  ->  "/es/nails"
 *   localePath("es", "/")       ->  "/es"
 */
export function localePath(locale: Locale, path: string): string {
  const clean = path === "/" ? "" : path;
  if (locale === defaultLocale) return clean || "/";
  return `/${locale}${clean}`;
}

/**
 * The reverse, for the language switch: drop any locale prefix and hand back
 * the bare route.
 *
 * It strips the default locale too. Under the root rewrite the browser URL is
 * "/" while the rendered route is "/en", and which one `usePathname` reports
 * is not worth depending on.
 */
export function stripLocale(pathname: string): string {
  for (const locale of locales) {
    if (pathname === `/${locale}`) return "/";
    if (pathname.startsWith(`/${locale}/`)) {
      return pathname.slice(locale.length + 1) || "/";
    }
  }
  return pathname || "/";
}
