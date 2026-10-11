import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Band, BandHead, Hot, Split } from "@/components/site/Band";
import { BookingBand } from "@/components/site/BookingBand";
import { FaqList } from "@/components/site/FaqList";
import { siteWideFaq } from "@/data/faq";
import { getDictionary } from "@/dictionaries";
import { defaultLocale, isLocale, localePath } from "@/lib/locale";
import { jsonLd, questionsSchema } from "@/lib/schema";

export async function generateMetadata({ params }: PageProps<"/[locale]/faq">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return {
    title: t.faqPage.meta.title,
    description: t.faqPage.meta.description,
    // Required: without it this page inherits the home page's canonical.
    alternates: {
      canonical: localePath(locale, "/faq"),
      languages: {
        en: localePath("en", "/faq"),
        es: localePath("es", "/faq"),
        "x-default": localePath(defaultLocale, "/faq"),
      },
    },
  };
}

// Every question on the site in one place (2026-10-11): nails, booking, parties. One FAQPage for the whole page.
export default async function Faq({ params }: PageProps<"/[locale]/faq">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  const c = t.faqPage;

  const groups = [
    {
      key: "nails",
      eyebrow: t.services.nails.faq.eyebrow,
      heading: (
        <>
          {t.services.nails.faq.headingLead} <Hot>{t.services.nails.faq.headingAccent}</Hot>
        </>
      ),
      items: Object.entries(t.services.nails.faq.items).map(([key, item]) => ({ key, ...item })),
    },
    {
      key: "booking",
      eyebrow: t.home.faq.eyebrow,
      heading: t.home.faq.heading,
      items: siteWideFaq().map((item) => ({ key: item.key, ...t.faq[item.key] })),
    },
    {
      key: "parties",
      eyebrow: t.partiesPage.faq.eyebrow,
      heading: t.partiesPage.faq.heading,
      items: Object.entries(t.partiesPage.faq.items).map(([key, item]) => ({ key, ...item })),
    },
  ];

  return (
    <main id="main">
      <Band className="pt-[26px]!">
        <span className="eyebrow mb-5">{c.eyebrow}</span>
        <h1 className="mb-5 text-[clamp(52px,9vw,120px)] leading-[0.9]">
          {c.headingLead} <Hot>{c.headingAccent}</Hot>
        </h1>
        <p className="max-w-[54ch] text-[17px] leading-[1.55] text-ink-muted">{c.lede}</p>
      </Band>

      {groups.map((group, index) => (
        <Band key={group.key} id={group.key} tone={index === 1 ? "blush" : "base"}>
          <Split head={<BandHead eyebrow={group.eyebrow} heading={group.heading} />}>
            <FaqList items={group.items} schema={false} />
          </Split>
        </Band>
      ))}

      <BookingBand copy={t.home.booking} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(questionsSchema(groups.flatMap((group) => group.items))) }}
      />
    </main>
  );
}
