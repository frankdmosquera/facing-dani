import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Photo } from "@/components/media/Photo";
import { DecorativeImage } from "@/components/service/DecorativeImage";
import { InspirationGrid } from "@/components/service/InspirationGrid";
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

// The locales come from the layout; this only lists the services. Nails is the home page, not a route here.
export function generateStaticParams() {
  return orderedServices().filter((service) => service.href !== "/").map((service) => ({ service: serviceSlug(service) }));
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
  if (!service || service.href === "/") notFound();

  const t = getDictionary(locale);
  const copy = t.services[service.id];
  const heroKey = SERVICE_HERO[service.id];
  const hero = heroKey ? galleryImage(heroKey) : undefined;

  return (
    <main id="main">
      <Band className="grain pt-[26px]!">
        <div className="flex flex-col gap-10 min-[860px]:flex-row min-[860px]:items-center min-[860px]:gap-14">
          <div className="min-w-0 min-[860px]:flex-1">
            <span className="eyebrow mb-5">
              {copy.eyebrow}
            </span>

            <h1 className="mb-4 text-[clamp(40px,8.6vw,78px)]">
              {copy.headingLead} <Hot>{copy.headingAccent}</Hot>
            </h1>

            <p className="max-w-[54ch] text-base text-ink-muted">{copy.lede}</p>

            {hero ? null : <DecorativeImage serviceId={service.id} />}
          </div>

          {hero ? (
            /* Her set framed as an almond nail: a polish rim and a gel shine. */
            <div className="mx-auto w-full max-w-[300px] rotate-6 drop-shadow-[6px_6px_0_var(--shadow)] transition-[rotate] duration-500 ease-out hover:rotate-2 min-[860px]:w-[360px] min-[860px]:max-w-none min-[860px]:shrink-0">
              <div className="nail-almond aspect-[100/150] bg-[image:var(--hot)] p-2">
                <div className="nail-almond gel-shine relative h-full overflow-hidden bg-shot">
                  <Photo
                    path={hero.imagekitPath}
                    alt={t.gallery.images[hero.key]}
                    width={hero.width}
                    height={hero.height}
                    sizes="(min-width: 860px) 360px, 300px"
                    priority // The LCP image on a phone.
                    className="block h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </Band>

      <Band tinted>
        {/* The menu as a printed card. */}
        <div className="rounded-2xl bg-surface p-6 border-2 border-line shadow-[6px_6px_0_var(--shadow)] min-[700px]:p-10">
          <h2 className="mb-[26px] text-[clamp(30px,5.6vw,52px)]">
            {copy.menuHeading}
          </h2>
          <TreatmentList serviceId={service.id} t={t} />
        </div>
      </Band>

      {/* Checked here too, or the empty band still draws its padding. */}
      {serviceHasWork(service.id) ? (
        <Band>
          <WorkStrip serviceId={service.id} t={t} />
        </Band>
      ) : null}

      {/* Stock photos, after her own work so the real sets come first. */}
      {inspirationFor(service.id).length > 0 ? (
        <Band tinted>
          <InspirationGrid serviceId={service.id} t={t} />
        </Band>
      ) : null}

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
