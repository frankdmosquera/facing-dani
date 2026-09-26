import { notFound } from "next/navigation";

import { Bilingual } from "@/components/home/Bilingual";
import { Expect } from "@/components/home/Expect";
import { Faq } from "@/components/home/Faq";
import { Hero } from "@/components/home/Hero";
import { NailsTeaser } from "@/components/home/NailsTeaser";
import { Parties } from "@/components/home/Parties";
import { Story } from "@/components/home/Story";
import { WorkTeaser } from "@/components/home/WorkTeaser";
import { BookingBand } from "@/components/site/BookingBand";
import { getDictionary } from "@/dictionaries";
import { isLocale } from "@/lib/locale";
import { jsonLd, localBusinessSchema, personSchema } from "@/lib/schema";

// No generateMetadata: the layout's defaults are the home page's own.
export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return (
    <main id="main">
      <Hero locale={locale} t={t} />
      <NailsTeaser locale={locale} t={t} />
      <WorkTeaser locale={locale} t={t} />
      <Parties locale={locale} t={t} />
      <Story locale={locale} t={t} />
      <Bilingual t={t} />
      <Expect t={t} />
      <Faq t={t} />
      <BookingBand copy={t.home.booking} />

      {/* Once for the whole site, not on every page. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(localBusinessSchema(t)) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(personSchema(t)) }}
      />
    </main>
  );
}
