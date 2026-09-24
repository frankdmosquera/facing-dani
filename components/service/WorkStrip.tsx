import Link from "next/link";

import { PhotoGrid } from "@/components/gallery/PhotoGrid";
import { orderedGallery } from "@/data/gallery";
import type { ServiceId } from "@/data/services";
import type { Dictionary } from "@/dictionaries";
import { localePath, type Locale } from "@/lib/locale";

const MAX = 6;

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

      <PhotoGrid items={images.map((image) => ({ kind: "work", image }))} t={t} />
    </>
  );
}
