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

/**
 * How many photos load eagerly. The rest stay lazy, which is the whole point
 * of a long grid.
 */
const EAGER = 4;

/**
 * The `alternates` block is not optional and not a copy of the layout's.
 *
 * The layout sets `canonical` and all three `hreflang` values to "/", and a
 * child's `alternates` replaces the parent's rather than merging with it. A
 * page that leaves this out does not inherit something harmless - it tells
 * Google the home page is the canonical version of this one, which is the
 * quiet way a page stops being indexed at all.
 *
 * These stay relative because `metadataBase` is unset until the domain is
 * registered. That is item 9, not this page.
 */
export async function generateMetadata({
  params,
}: PageProps<"/[locale]/gallery">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return {
    title: t.gallery.meta.title,
    description: t.gallery.meta.description,
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
      {/* The page head follows Hero rather than BandHead: BandHead renders an
          h2, and this is the one heading on the page that has to be the h1. */}
      <Band className="pt-[26px]!">
        <span className="font-body mb-3 block text-[11px] font-semibold tracking-[0.18em] text-ink-faint uppercase">
          {c.eyebrow}
        </span>

        <h1 className="mb-4 text-[clamp(36px,9vw,62px)]">
          {c.headingLead} <Hot>{c.headingAccent}</Hot>
        </h1>

        <p className="max-w-[52ch] text-base text-ink-muted">{c.lede}</p>
      </Band>

      {/* Not a stub. With no records this is the whole page, and it is the
          state the site will genuinely deploy in until her photos are shot and
          uploaded. It says why the page is empty, because "no photos" on a
          nail artist's site reads as abandoned rather than as new. */}
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
        /* The figures are built here, on the server, and handed to the client
           shell as children. The shell owns the pressed chip and nothing
           else. */
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
            /* Same array, same order, same pass as the children below. The
               delegated click reads an index into this, so the two cannot be
               built separately without the risk of opening the wrong photo. */
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

      <BookingBand locale={locale} copy={c.cta} />

      {schema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(schema) }}
        />
      ) : null}
    </main>
  );
}
