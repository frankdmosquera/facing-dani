import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { TreatmentList } from "@/components/service/TreatmentList";
import { WorkStrip } from "@/components/service/WorkStrip";
import { Band, Hot } from "@/components/site/Band";
import { BookingBand } from "@/components/site/BookingBand";
import { orderedServices, serviceBySlug, serviceSlug } from "@/data/services";
import { getDictionary } from "@/dictionaries";
import { defaultLocale, isLocale, localePath } from "@/lib/locale";
import { jsonLd, serviceSchema } from "@/lib/schema";

/**
 * One template, three pages, three vocabularies.
 *
 * Three routes rather than a single services page, because one page listing
 * everything competes with itself and ranks for none of it. The template is
 * shared; every word on it comes from that service's own dictionary block.
 *
 * `[service]` sits beside the static `gallery` segment. Next resolves a static
 * segment first, so `/gallery` is still the gallery and only the three service
 * slugs reach this file.
 */

/**
 * Both locales come from the layout above; this only has to enumerate its own
 * segment. Slugs are derived from `href` so the URL and the link in the header
 * cannot drift apart.
 */
export function generateStaticParams() {
  return orderedServices().map((service) => ({ service: serviceSlug(service) }));
}

/** Anything that is not one of the three services is not a page. */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/[service]">): Promise<Metadata> {
  const { locale, service: slug } = await params;
  if (!isLocale(locale)) notFound();

  const service = serviceBySlug(slug);
  if (!service) notFound();

  const t = getDictionary(locale);
  const copy = t.services[service.id];

  return {
    title: copy.meta.title,
    description: copy.meta.description,
    /**
     * Set explicitly, for the same reason the gallery sets it: the layout
     * points `canonical` and all three `hreflang` values at "/", and a child's
     * `alternates` replaces the parent's rather than merging. Left out, each of
     * these three pages would declare the home page to be its canonical.
     */
    alternates: {
      canonical: localePath(locale, service.href),
      languages: {
        en: localePath("en", service.href),
        es: localePath("es", service.href),
        "x-default": localePath(defaultLocale, service.href),
      },
    },
  };
}

export default async function ServicePage({
  params,
}: PageProps<"/[locale]/[service]">) {
  const { locale, service: slug } = await params;
  if (!isLocale(locale)) notFound();

  const service = serviceBySlug(slug);
  if (!service) notFound();

  const t = getDictionary(locale);
  const copy = t.services[service.id];

  return (
    <main id="main">
      <Band className="pt-[26px]!">
        <span className="font-body mb-3 block text-[11px] font-semibold tracking-[0.18em] text-ink-faint uppercase">
          {copy.eyebrow}
        </span>

        <h1 className="mb-4 text-[clamp(36px,9vw,62px)]">
          {copy.headingLead} <Hot>{copy.headingAccent}</Hot>
        </h1>

        <p className="max-w-[54ch] text-base text-ink-muted">{copy.lede}</p>
      </Band>

      <Band tinted glow={false}>
        <TreatmentList serviceId={service.id} t={t} />
      </Band>

      {/* Renders nothing when this service has no photographs, which is the
          case for lashes today. */}
      <Band glow={false}>
        <WorkStrip serviceId={service.id} locale={locale} t={t} />
      </Band>

      {/* Its own closing ask, not the gallery's. Three pages sharing one CTA
          would be the same duplicate-content mistake the ledes avoid. */}
      <BookingBand locale={locale} copy={copy.cta} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(serviceSchema(service.id, t)),
        }}
      />
    </main>
  );
}
