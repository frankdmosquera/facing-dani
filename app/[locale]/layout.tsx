import type { Metadata } from "next";
import { Inter, Unbounded } from "next/font/google";
import { notFound } from "next/navigation";

import { BookingPopup } from "@/components/booking/BookingPopup";
import { SiteFooter } from "@/components/shell/SiteFooter";
import { SiteHeader } from "@/components/shell/SiteHeader";
import { themeScript } from "@/components/shell/theme";
import { ThemeApplier } from "@/components/shell/ThemeApplier";
import { Ticker } from "@/components/shell/Ticker";
import { siteConfig } from "@/data/siteConfig";
import { getDictionary } from "@/dictionaries";
import {
  defaultLocale,
  isLocale,
  localePath,
  locales,
  type Locale,
} from "@/lib/locale";


import "../globals.css";

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

// Every page below inherits both locales from here, so the whole site is prebuilt.
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return {
    metadataBase: new URL(siteConfig.business.website),
    title: { default: t.meta.title, template: t.meta.template },
    description: t.meta.description,
    // Home's values. Every other page must set its own: a child's alternates replace these, not merge.
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
      // The theme script adds a class before React hydrates.
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <a
          href="#main"
          className="sr-only rounded-lg bg-surface px-4 py-2 text-ink focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-60 focus:outline-2 focus:outline-offset-2 focus:outline-ring"
        >
          {t.a11y.skipToContent}
        </a>
        <Ticker words={t.marquee} />
        <SiteHeader locale={activeLocale} t={t} />
        {children}
        <SiteFooter locale={activeLocale} t={t} />
        <ThemeApplier />
        <BookingPopup />
      </body>
    </html>
  );
}
