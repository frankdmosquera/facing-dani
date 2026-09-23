import Link from "next/link";

import { GalleryFigure } from "@/components/gallery/GalleryFigure";
import { Band, BandHead } from "@/components/site/Band";
import { orderedGallery } from "@/data/gallery";
import type { Dictionary } from "@/dictionaries";
import { localePath, type Locale } from "@/lib/locale";

/** Enough to prove the work, not so many that home becomes the gallery. */
const MAX = 6;

/**
 * The shop window: a few photographs on the page the bio link lands on, with a
 * way through to the full set.
 *
 * This is the section item 3 deferred to item 4 and nobody returned for. It is
 * also the single biggest reason the home page read as a text menu pointing at
 * other pages rather than as somewhere worth looking.
 *
 * `WorkStrip` does the same job on a service page and is deliberately not
 * reused: that one filters to one service and takes its copy from
 * `t.services[id].work`, which is the wrong heading here. What both share is
 * `GalleryFigure`, so the scrim, the tag and the missing-endpoint placeholder
 * behave identically in all three places they appear.
 *
 * Rendered **without** an `index`, so each figure draws no button and offers no
 * interaction. The lightbox belongs to the gallery page; giving home a second
 * surface for it would double the review and turn these figures into client
 * components.
 *
 * Renders nothing when there are no photographs at all - the same rule
 * `WorkStrip` applies, because an empty heading over an empty row reads as a
 * broken section rather than an absent one.
 */
export function WorkTeaser({ locale, t }: { locale: Locale; t: Dictionary }) {
  const images = orderedGallery().slice(0, MAX);
  if (images.length === 0) return null;

  const c = t.home.work;

  return (
    <Band glow={false}>
      <BandHead eyebrow={c.eyebrow} heading={c.heading} />

      {/* Two columns on a phone, three from 620px. The same ladder the gallery
          and the service strips use, so a tile is a familiar size everywhere. */}
      <div className="columns-2 gap-2.5 min-[620px]:columns-3 min-[620px]:gap-3">
        {images.map((image) => (
          <GalleryFigure
            key={image.key}
            image={image}
            alt={t.gallery.images[image.key]}
            serviceName={t.services[image.serviceId].name}
          />
        ))}
      </div>

      <Link
        href={localePath(locale, "/gallery")}
        className="mt-8 inline-block text-[13.5px] font-bold text-ink-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        {c.all}
        <span aria-hidden="true"> &rarr;</span>
      </Link>
    </Band>
  );
}
