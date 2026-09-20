import type { Metadata } from "next";
import { Inter, Unbounded } from "next/font/google";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/shell/SiteFooter";
import { SiteHeader } from "@/components/shell/SiteHeader";
import { Ticker } from "@/components/shell/Ticker";
import { getDictionary } from "@/dictionaries";
import {
  defaultLocale,
  isLocale,
  localePath,
  locales,
  type Locale,
} from "@/lib/locale";

import "../globals.css";

/**
 * Unbounded is geometric and wide, confident at size, round enough to stay
 * friendly. Anton read as a gym poster and Fredoka as a cereal box.
 */
const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/** Both locales are known at build time, so every page stays static. */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/** Anything outside the two locales is not a page. */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return {
    title: { default: t.meta.title, template: t.meta.template },
    description: t.meta.description,
    /**
     * Set once, here, so every page inherits it. Without hreflang Google reads
     * the two locales as duplicates and picks one for you, which throws away
     * the second set of rankings the Spanish pages exist to win.
     */
    alternates: {
      canonical: localePath(locale, "/"),
      languages: {
        en: localePath("en", "/"),
        es: localePath("es", "/"),
        "x-default": localePath(defaultLocale, "/"),
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = getDictionary(locale);
  const activeLocale: Locale = locale;

  return (
    <html
      lang={activeLocale}
      className={`${unbounded.variable} ${inter.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only rounded-lg bg-surface px-4 py-2 text-ink focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-60 focus:outline-2 focus:outline-offset-2 focus:outline-ring"
        >
          {t.a11y.skipToContent}
        </a>
        <Ticker />
        <SiteHeader locale={activeLocale} t={t} />
        {children}
        <SiteFooter locale={activeLocale} t={t} />
      </body>
    </html>
  );
}
