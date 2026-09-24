import Link from "next/link";

import { GalleryFigure } from "@/components/gallery/GalleryFigure";
import { Band, BandHead } from "@/components/site/Band";
import { orderedGallery } from "@/data/gallery";
import type { Dictionary } from "@/dictionaries";
import { localePath, type Locale } from "@/lib/locale";

const MAX = 6;

// No index on the figures, so no lightbox here. That lives on the gallery page.
export function WorkTeaser({ locale, t }: { locale: Locale; t: Dictionary }) {
  const images = orderedGallery().slice(0, MAX);
  if (images.length === 0) return null;

  const c = t.home.work;

  return (
    <Band glow={false}>
      <BandHead eyebrow={c.eyebrow} heading={c.heading} />

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
