import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Photo } from "@/components/media/Photo";
import { DecorativeImage } from "@/components/service/DecorativeImage";
import { InspirationGrid } from "@/components/service/InspirationGrid";
import { NailFaq } from "@/components/service/NailFaq";
import { NailGuide } from "@/components/service/NailGuide";
import { NailSteps } from "@/components/service/NailSteps";
import { TreatmentList } from "@/components/service/TreatmentList";
import { WorkStrip } from "@/components/service/WorkStrip";
import { Band, Hot } from "@/components/site/Band";
import { BookingBand } from "@/components/site/BookingBand";
import { inspirationFor } from "@/data/decorativeImages";
import { SERVICE_HERO, galleryImage, serviceHasWork } from "@/data/gallery";
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
  const heroKey = SERVICE_HERO[service.id];
  const hero = heroKey ? galleryImage(heroKey) : undefined;

  return (
    <main id="main">
      <Band className="pt-[26px]!">
        <div className="flex flex-col gap-10 min-[860px]:flex-row min-[860px]:items-center min-[860px]:gap-14">
          <div className="min-w-0 min-[860px]:flex-1">
            <span className="font-body mb-3 block text-[11px] font-semibold tracking-[0.18em] text-ink-faint uppercase">
              {copy.eyebrow}
            </span>

            <h1 className="mb-4 text-[clamp(36px,9vw,62px)]">
              {copy.headingLead} <Hot>{copy.headingAccent}</Hot>
            </h1>

            <p className="max-w-[54ch] text-base text-ink-muted">{copy.lede}</p>

            {hero ? null : <DecorativeImage serviceId={service.id} />}
          </div>

          {hero ? (
            <div className="overflow-hidden rounded-xl border border-line-soft bg-shot min-[860px]:w-[380px] min-[860px]:shrink-0">
              <Photo
                path={hero.imagekitPath}
                alt={t.gallery.images[hero.key]}
                width={hero.width}
                height={hero.height}
                sizes="(min-width: 860px) 380px, 100vw"
                priority // The LCP image on a phone.
                className="block h-auto w-full"
              />
            </div>
          ) : null}
        </div>
      </Band>

      <Band tinted glow={false}>
        <h2 className="mb-[26px] text-[clamp(24px,5.5vw,34px)]">
          {copy.menuHeading}
        </h2>
        <TreatmentList serviceId={service.id} t={t} />
      </Band>

      {service.id === "nails" ? <NailGuide locale={locale} t={t} /> : null}

      {service.id === "nails" ? <NailSteps t={t} /> : null}

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

      {service.id === "nails" ? <NailFaq t={t} /> : null}

      <BookingBand copy={copy.cta} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(serviceSchema(service.id, t)),
        }}
      />
    </main>
  );
}
