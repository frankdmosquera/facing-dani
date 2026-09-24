import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DecorativeImage } from "@/components/service/DecorativeImage";
import { InspirationGrid } from "@/components/service/InspirationGrid";
import { TreatmentList } from "@/components/service/TreatmentList";
import { WorkStrip } from "@/components/service/WorkStrip";
import { Band, Hot } from "@/components/site/Band";
import { BookingBand } from "@/components/site/BookingBand";
import { inspirationFor } from "@/data/decorativeImages";
import { serviceHasWork } from "@/data/gallery";
import { orderedServices, serviceBySlug, serviceSlug } from "@/data/services";
import { getDictionary } from "@/dictionaries";
import { defaultLocale, isLocale, localePath } from "@/lib/locale";
import { jsonLd, serviceSchema } from "@/lib/schema";

// The locales come from the layout; this only lists the services.
export function generateStaticParams() {
  return orderedServices().map((service) => ({ service: serviceSlug(service) }));
}

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
    // Required: without it this page inherits the home page's canonical.
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

        <DecorativeImage serviceId={service.id} />
      </Band>

      <Band tinted glow={false}>
        <TreatmentList serviceId={service.id} t={t} />
      </Band>

      {/* Checked here too, or the empty band still draws its padding. */}
      {serviceHasWork(service.id) ? (
        <Band glow={false}>
          <WorkStrip serviceId={service.id} locale={locale} t={t} />
        </Band>
      ) : null}

      {/* Stock photos, after her own work so the real sets come first. */}
      {inspirationFor(service.id).length > 0 ? (
        <Band glow={false}>
          <InspirationGrid serviceId={service.id} t={t} />
        </Band>
      ) : null}

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
