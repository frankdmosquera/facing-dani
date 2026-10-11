import { notFound } from "next/navigation";

import { SetBuilderBand } from "@/components/builder/SetBuilderBand";
import { Bilingual } from "@/components/home/Bilingual";
import { Expect } from "@/components/home/Expect";
import { Faq } from "@/components/home/Faq";
import { Hero } from "@/components/home/Hero";
import { NailMenu } from "@/components/home/NailMenu";
import { Story } from "@/components/home/Story";
import { ThreeThings } from "@/components/home/ThreeThings";
import { NailGuide } from "@/components/service/NailGuide";
import { BookingBand } from "@/components/site/BookingBand";
import { FinishRibbon } from "@/components/site/FinishRibbon";
import { Optional } from "@/components/site/Optional";
import { getDictionary } from "@/dictionaries";
import { isLocale } from "@/lib/locale";
import { jsonLd, localBusinessSchema, personSchema, serviceSchema } from "@/lib/schema";

// Home is the nails page: the menu, the builder and booking. Parties and the store get a door each (ThreeThings); her work has its own page, /gallery.
// No generateMetadata: the layout's defaults are the home page's own.
export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return (
    <main id="main">
      <Hero locale={locale} t={t} />
      {/* Each section can be switched off from siteConfig.sections (or the options panel in dev). */}
      <Optional id="home-ribbon" label="Finish ribbon">
        <FinishRibbon t={t} />
      </Optional>
      <NailMenu t={t} />
      <Optional id="home-builder" label="Build your set">
        <SetBuilderBand t={t} />
      </Optional>
      <Optional id="home-story" label="Who is doing your nails">
        <Story locale={locale} t={t} />
      </Optional>
      <Optional id="home-guide" label="Gel, acrylic or Gel-X">
        <NailGuide locale={locale} t={t} />
      </Optional>
      <Optional id="home-expect" label="In the chair">
        <Expect t={t} />
      </Optional>
      <Optional id="home-spanish" label="Spanish band">
        <Bilingual t={t} />
      </Optional>
      <Optional id="home-faq" label="Questions">
        <Faq t={t} />
      </Optional>
      <Optional id="home-three" label="Nails · parties · store">
        <ThreeThings locale={locale} t={t} />
      </Optional>
      <Optional id="home-closing" label="Closing photo band">
        <BookingBand copy={t.home.booking} />
      </Optional>

      {/* Once for the whole site, not on every page. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(localBusinessSchema(t)) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(personSchema(t)) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(serviceSchema("nails", t)) }}
      />
    </main>
  );
}
