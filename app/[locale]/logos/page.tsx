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
        {/* Picks stay in this browser only, across every page, until Purple and Current logo are tapped again. */}
        <h1 className="mb-8 text-[clamp(36px,9vw,62px)]">
          Pick a <Hot>look</Hot>
        </h1>

        <div className="mb-10 flex flex-wrap items-center gap-x-5 gap-y-3">
          <h2 className="text-[clamp(22px,5vw,28px)]">Theme</h2>
          <ThemePicker />
        </div>

        <LogoPicker />
      </Band>
    </main>
  );
}
