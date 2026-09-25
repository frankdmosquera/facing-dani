import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { GalleryFigure } from "@/components/gallery/GalleryFigure";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { Band, Hot } from "@/components/site/Band";
import { BookingBand } from "@/components/site/BookingBand";
import { galleryServiceCounts, orderedGallery } from "@/data/gallery";
import { getDictionary } from "@/dictionaries";
import { defaultLocale, isLocale, localePath } from "@/lib/locale";
import { imageGallerySchema, jsonLd } from "@/lib/schema";

// Photos loaded eagerly. The rest are lazy.
const EAGER = 4;

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/gallery">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return {
    title: t.gallery.meta.title,
    description: t.gallery.meta.description,
    // Required: without it this page inherits the home page's canonical.
    alternates: {
      canonical: localePath(locale, "/gallery"),
      languages: {
        en: localePath("en", "/gallery"),
        es: localePath("es", "/gallery"),
        "x-default": localePath(defaultLocale, "/gallery"),
      },
    },
  };
}

export default async function Gallery({
  params,
}: PageProps<"/[locale]/gallery">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = getDictionary(locale);
  const c = t.gallery;
  const images = orderedGallery();
  const schema = imageGallerySchema(t);

  return (
    <main id="main">
      {/* Not BandHead: that renders an h2, and this is the page's h1. */}
      <Band className="pt-[26px]!">
        <span className="font-body mb-3 block text-[11px] font-semibold tracking-[0.18em] text-ink-faint uppercase">
          {c.eyebrow}
        </span>

        <h1 className="mb-4 text-[clamp(36px,9vw,62px)]">
          {c.headingLead} <Hot>{c.headingAccent}</Hot>
        </h1>

        <p className="max-w-[52ch] text-base text-ink-muted">{c.lede}</p>
      </Band>

      {images.length === 0 ? (
        <Band tinted glow={false}>
          <div className="mx-auto max-w-[56ch] rounded-xl border border-line bg-surface p-7 text-center">
            <h2 className="mb-3 text-[clamp(22px,5vw,28px)]">
              {c.empty.heading}
            </h2>
            <p className="text-[15px] text-ink-muted">{c.empty.body}</p>
          </div>
        </Band>
      ) : (
        /* Figures render on the server; the client grid only owns the filter. */
        <div className="mx-auto w-full max-w-[var(--site)] px-[var(--gutter)]">
          <GalleryGrid
            chips={galleryServiceCounts().map((entry) => ({
              id: entry.id,
              label: t.services[entry.id].name,
              count: entry.count,
            }))}
            total={images.length}
            allLabel={c.filters.all}
            filterLabel={c.filters.label}
            countOne={c.count.one}
            countOther={c.count.other}
            /* Must stay in the same order as the children: clicks open by index. */
            photos={images.map((image) => ({
              imagekitPath: image.imagekitPath,
              serviceId: image.serviceId,
              alt: c.images[image.key],
              width: image.width,
              height: image.height,
            }))}
            lightboxLabels={c.lightbox}
          >
            {images.map((image, index) => (
              <GalleryFigure
                key={image.key}
                image={image}
                alt={c.images[image.key]}
                serviceName={t.services[image.serviceId].name}
                index={index}
                openLabel={c.lightbox.open.replace(
                  "{photo}",
                  c.images[image.key],
                )}
                priority={index < EAGER}
              />
            ))}
          </GalleryGrid>
        </div>
      )}

      <BookingBand copy={c.cta} />

      {schema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(schema) }}
        />
      ) : null}
    </main>
  );
}
