import { notFound } from "next/navigation";

import { Faq } from "@/components/home/Faq";
import { Hero } from "@/components/home/Hero";
import { ServiceCards } from "@/components/home/ServiceCards";
import { Story } from "@/components/home/Story";
import { BookingBand } from "@/components/site/BookingBand";
import { getDictionary } from "@/dictionaries";
import { isLocale } from "@/lib/locale";
import { jsonLd, localBusinessSchema } from "@/lib/schema";

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
      <BookingBand locale={locale} copy={t.home.booking} />

      {/* The business itself, once for the whole site. Repeating it on every
          page does not strengthen it and gives Google several entities to
          reconcile. The FAQ block on this page comes from `Faq`. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(localBusinessSchema(t)) }}
      />
    </main>
  );
}
