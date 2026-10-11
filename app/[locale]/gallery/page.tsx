import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { WorkGallery } from "@/components/home/WorkGallery";
import { BookingBand } from "@/components/site/BookingBand";
import { getDictionary } from "@/dictionaries";
import { defaultLocale, isLocale, localePath } from "@/lib/locale";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/gallery">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return {
    title: t.gallery.meta.title,
    description: t.gallery.meta.description,
    // Required: without it this page inherits the home page's canonical.
    alternates: {
      canonical: localePath(locale, "/gallery"),
      languages: {
        en: localePath("en", "/gallery"),
        es: localePath("es", "/gallery"),
        "x-default": localePath(defaultLocale, "/gallery"),
      },
    },
  };
}

// Her work on its own page (back on 2026-10-11): too many photos for home, which stays about booking nails.
export default async function Gallery({ params }: PageProps<"/[locale]/gallery">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return (
    <main id="main">
      <WorkGallery t={t} />
      <BookingBand copy={t.home.booking} />
    </main>
  );
}
