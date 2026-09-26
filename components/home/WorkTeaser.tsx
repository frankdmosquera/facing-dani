import Link from "next/link";

import { PhotoGrid, type PhotoGridItem } from "@/components/gallery/PhotoGrid";
import { Band, BandHead } from "@/components/site/Band";
import { inspirationImage } from "@/data/decorativeImages";
import { galleryImage } from "@/data/gallery";
import { HOME_SHOWCASE } from "@/data/homeShowcase";
import type { Dictionary } from "@/dictionaries";
import { localePath, type Locale } from "@/lib/locale";

export function WorkTeaser({ locale, t }: { locale: Locale; t: Dictionary }) {
  const c = t.home.work;

  const items = HOME_SHOWCASE.flatMap((entry): PhotoGridItem[] => {
    if ("work" in entry) {
      const image = galleryImage(entry.work);
      return image ? [{ kind: "work", image }] : [];
    }
    const found = inspirationImage(entry.inspiration);
    return found ? [{ kind: "inspiration", ...found }] : [];
  });

  return (
    <Band glow={false}>
      <BandHead eyebrow={c.eyebrow} heading={c.heading} />

      {/* Eight small squares, not the full wall: the gallery page has every photo. */}
      <PhotoGrid
        items={items}
        t={t}
        square
        gridClassName="grid grid-cols-4 gap-2 min-[620px]:gap-3 min-[900px]:grid-cols-8"
      />

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
