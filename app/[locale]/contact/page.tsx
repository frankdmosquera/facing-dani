import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContactForm } from "@/components/contact/ContactForm";
import { Band, Hot } from "@/components/site/Band";
import { siteConfig } from "@/data/siteConfig";
import { getDictionary } from "@/dictionaries";
import { defaultLocale, isLocale, localePath } from "@/lib/locale";
import { contactPageSchema, jsonLd } from "@/lib/schema";

/**
 * Two routes into a booking on one page: the form, and the DM.
 *
 * The project plan calls the form load-bearing because it is the route for
 * anyone who will not message a teenager on Instagram - the overview's second
 * audience, a mother paying for a grad set - and because the "how did you find
 * me" field is the only attribution this site has.
 */
export async function generateMetadata({
  params,
}: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return {
    title: t.contact.meta.title,
    description: t.contact.meta.description,
    alternates: {
      canonical: localePath(locale, "/contact"),
      languages: {
        en: localePath("en", "/contact"),
        es: localePath("es", "/contact"),
        "x-default": localePath(defaultLocale, "/contact"),
      },
    },
  };
}

export default async function Contact({
  params,
}: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = getDictionary(locale);
  const c = t.contact;
  const instagram = siteConfig.social.instagram;

  return (
    <main id="main">
      <Band className="pt-[26px]!">
        <span className="font-body mb-3 block text-[11px] font-semibold tracking-[0.18em] text-ink-faint uppercase">
          {c.eyebrow}
        </span>

        <h1 className="mb-4 text-[clamp(36px,9vw,62px)]">
          {c.headingLead} <Hot>{c.headingAccent}</Hot>
        </h1>

        <p className="max-w-[54ch] text-base text-ink-muted">{c.lede}</p>
      </Band>

      <Band tinted glow={false}>
        <ContactForm locale={locale} t={t} />
      </Band>

      {/* The direct booking route: the other half of the build-plan line. */}
      <Band glow={false}>
        <div className="max-w-[54ch]">
          <h2 className="mb-3 text-[clamp(22px,5vw,30px)]">
            {c.direct.heading}
          </h2>
          <p className="mb-4 text-[15.5px] text-ink-muted">{c.direct.body}</p>

          {/* A link only once the handle is known, the same rule the footer and
              every BookingBand follow. A dead link is worse than a sentence. */}
          {instagram ? (
            <a
              href={instagram.url}
              rel="me noopener noreferrer"
              target="_blank"
              className="inline-block rounded-pill border border-line px-7 py-4 text-[15px] font-bold text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {c.direct.link}
            </a>
          ) : (
            <p className="text-[14px] text-ink-faint">{c.direct.pending}</p>
          )}
        </div>
      </Band>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(contactPageSchema(t)) }}
      />
    </main>
  );
}
