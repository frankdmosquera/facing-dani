import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Photo } from "@/components/media/Photo";
import { TapedPrint } from "@/components/parties/PartyBoard";
import { DecorativeImage } from "@/components/service/DecorativeImage";
import { InspirationGrid } from "@/components/service/InspirationGrid";
import { NailFaq } from "@/components/service/NailFaq";
import { NailGuide } from "@/components/service/NailGuide";
import { NailSteps } from "@/components/service/NailSteps";
import { TreatmentList } from "@/components/service/TreatmentList";
import { WorkStrip } from "@/components/service/WorkStrip";
import { Band, Hot } from "@/components/site/Band";
import { BookingBand } from "@/components/site/BookingBand";
import { FinishRibbon } from "@/components/site/FinishRibbon";
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
      <Band className="grain pt-[26px]!">
        <div className="flex flex-col gap-10 min-[860px]:flex-row min-[860px]:items-center min-[860px]:gap-14">
          <div className="min-w-0 min-[860px]:flex-1">
            <span className="eyebrow font-body mb-3 text-[11px] font-semibold tracking-[0.18em] text-ink-faint uppercase">
              {copy.eyebrow}
            </span>

            <h1 className="mb-4 text-[clamp(40px,8.6vw,78px)]">
              {copy.headingLead} <Hot>{copy.headingAccent}</Hot>
            </h1>

            <p className="max-w-[54ch] text-base text-ink-muted">{copy.lede}</p>

            {hero ? null : <DecorativeImage serviceId={service.id} />}
          </div>

          {hero ? (
            <div className="rotate-2 overflow-hidden rounded-xl border-4 border-surface bg-shot shadow-[0_30px_60px_-24px_rgba(0,0,0,0.6)] transition-[rotate] duration-500 ease-out hover:rotate-0 min-[860px]:w-[400px] min-[860px]:shrink-0">
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

      {service.id === "nails" ? <FinishRibbon t={t} /> : null}

      <Band tinted>
        {/* The menu as a printed card, her set taped beside it. */}
        <div className="grid items-start gap-12 min-[1000px]:grid-cols-[1fr_300px] min-[1000px]:gap-16">
          <div className="rounded-2xl bg-surface p-6 shadow-[0_40px_80px_-40px_rgba(120,30,80,0.35)] min-[700px]:p-10">
            <h2 className="mb-[26px] text-[clamp(30px,5.6vw,52px)]">
              {copy.menuHeading}
            </h2>
            <TreatmentList serviceId={service.id} t={t} />
          </div>
          {service.id === "nails" ? (
            <TapedPrint
              imageKey="pinkFrenchCrystals"
              className="sticky top-28 mx-auto w-full max-w-[280px] -rotate-3 max-[1000px]:hidden"
            />
          ) : null}
        </div>
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
        <Band tinted glow={false}>
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
