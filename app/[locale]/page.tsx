import { notFound } from "next/navigation";

import { Bilingual } from "@/components/home/Bilingual";
import { Expect } from "@/components/home/Expect";
import { Faq } from "@/components/home/Faq";
import { Hero } from "@/components/home/Hero";
import { ServiceCards } from "@/components/home/ServiceCards";
import { Story } from "@/components/home/Story";
import { WorkTeaser } from "@/components/home/WorkTeaser";
import { BookingBand } from "@/components/site/BookingBand";
import { getDictionary } from "@/dictionaries";
import { isLocale } from "@/lib/locale";
import { jsonLd, localBusinessSchema, personSchema } from "@/lib/schema";

/**
 * No `generateMetadata` here on purpose. Home is the root of its locale, so
 * the layout's default title and description are already its own, and adding
 * a second copy would be two places to keep in step.
 *
 * The order is what a visitor arriving from an Instagram bio link needs, in
 * the order they need it: what she does, proof that she can, who she is, that
 * it can happen in Spanish, what the appointment involves, the questions, and
 * then the booking. The three middle sections came off `/about`, which feature
 * 14 deleted - they were always home page content sitting one page away from
 * anyone reading them.
 */
export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return (
    <main id="main">
      <Hero locale={locale} t={t} />
      <ServiceCards locale={locale} t={t} />
      <WorkTeaser locale={locale} t={t} />
      <Story t={t} />
      <Bilingual t={t} />
      <Expect t={t} />
      <Faq t={t} />
      <BookingBand locale={locale} copy={t.home.booking} />

      {/* The business itself, once for the whole site. Repeating it on every
          page does not strengthen it and gives Google several entities to
          reconcile. The FAQ block on this page comes from `Faq`. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(localBusinessSchema(t)) }}
      />

      {/* The person, which used to sit on `/about`. It moved here rather than
          being dropped with that page: it is the only place the site says who
          is doing the work, and her story is now on this page. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(personSchema(t)) }}
      />
    </main>
  );
}
