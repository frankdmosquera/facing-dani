import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LogoPicker, ThemePicker } from "@/components/logos/LogoPicker";
import { Band, Hot } from "@/components/site/Band";
import { isLocale, localePath } from "@/lib/locale";

// A working page for choosing the logo, not for visitors. English only, linked from nowhere, out of the sitemap.
export async function generateMetadata({ params }: PageProps<"/[locale]/logos">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return {
    title: "Logos and themes",
    robots: { index: false, follow: false },
    // Without its own canonical it would inherit home's from the layout.
    alternates: { canonical: localePath(locale, "/logos") },
  };
}

export default async function Logos({ params }: PageProps<"/[locale]/logos">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <main id="main">
      <Band className="pt-[26px]! pb-40!">
        <h1 className="mb-4 text-[clamp(36px,9vw,62px)]">
          Pick a <Hot>look</Hot>
        </h1>
        <p className="mb-10 max-w-[54ch] text-base text-ink-muted">
          Tap a theme and a logo, then browse the site to see them together.
          Both picks stay in this browser only, across every page, until you
          tap Purple and Current logo.
        </p>

        <h2 className="mb-4 text-[clamp(22px,5vw,28px)]">Theme</h2>
        <ThemePicker />

        <h2 className="mt-14 mb-4 text-[clamp(22px,5vw,28px)]">Logo</h2>
        <LogoPicker />
      </Band>
    </main>
  );
}
