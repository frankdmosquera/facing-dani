import Link from "next/link";

import { GalleryFigure } from "@/components/gallery/GalleryFigure";
import { orderedGallery } from "@/data/gallery";
import type { ServiceId } from "@/data/services";
import type { Dictionary } from "@/dictionaries";
import { localePath, type Locale } from "@/lib/locale";

/** Enough to prove the work, not so many that this becomes the gallery. */
const MAX = 6;

/**
 * A few of that service's photographs, with a way through to the full set.
 *
 * Reuses `GalleryFigure` rather than a second figure component, so the hover
 * scrim, the service tag and the missing-endpoint placeholder all behave the
 * same here as on the gallery. The columns are fewer because this strip sits
 * inside a page rather than being the page.
 *
 * Renders nothing at all when the service has no photographs. That is not an
 * edge case: lashes has none, and an empty heading over an empty row would read
 * as a broken section rather than an absent one.
 */
export function WorkStrip({
  serviceId,
  locale,
  t,
}: {
  serviceId: ServiceId;
  locale: Locale;
  t: Dictionary;
}) {
  const images = orderedGallery()
    .filter((image) => image.serviceId === serviceId)
    .slice(0, MAX);

  if (images.length === 0) return null;

  const copy = t.services[serviceId];

  return (
    <>
      <div className="mb-[26px] flex flex-wrap items-baseline justify-between gap-4">
        <h2 className="text-[clamp(24px,5.5vw,34px)]">{copy.work.heading}</h2>
        <Link
          href={localePath(locale, "/gallery")}
          className="text-[13.5px] font-bold text-ink-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {copy.work.all}
          <span aria-hidden="true"> &rarr;</span>
        </Link>
      </div>

      <div className="columns-2 gap-2.5 min-[620px]:columns-3 min-[620px]:gap-3">
        {images.map((image, index) => (
          <GalleryFigure
            key={image.key}
            image={image}
            alt={t.gallery.images[image.key]}
            serviceName={t.services[image.serviceId].name}
            priority={index === 0}
          />
        ))}
      </div>
    </>
  );
}
