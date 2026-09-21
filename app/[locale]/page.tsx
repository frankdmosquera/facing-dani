import { notFound } from "next/navigation";

import { BookingBand } from "@/components/home/BookingBand";
import { Faq } from "@/components/home/Faq";
import { Hero } from "@/components/home/Hero";
import { ServiceCards } from "@/components/home/ServiceCards";
import { Story } from "@/components/home/Story";
import { getDictionary } from "@/dictionaries";
import { isLocale } from "@/lib/locale";

/**
 * No `generateMetadata` here on purpose. Home is the root of its locale, so
 * the layout's default title and description are already its own, and adding
 * a second copy would be two places to keep in step.
 */
export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return (
    <main id="main">
      <Hero locale={locale} t={t} />
      <ServiceCards locale={locale} t={t} />
      <Story t={t} />
      <Faq t={t} />
      <BookingBand locale={locale} t={t} />
    </main>
  );
}
