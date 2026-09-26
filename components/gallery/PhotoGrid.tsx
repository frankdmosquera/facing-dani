import type { DecorativeImage } from "@/data/decorativeImages";
import type { GalleryImage } from "@/data/gallery";
import type { ServiceId } from "@/data/services";
import type { Dictionary } from "@/dictionaries";

import { GalleryFigure } from "./GalleryFigure";
import { GalleryGrid } from "./GalleryGrid";
import { InspirationFigure } from "./InspirationFigure";

export type PhotoGridItem =
  | { kind: "work"; image: GalleryImage }
  | { kind: "inspiration"; image: DecorativeImage; serviceId: ServiceId };

// A masonry grid where every photo opens the lightbox. No filter chips: the gallery page has its own grid for those.
export function PhotoGrid({
  items,
  t,
  gridClassName = "columns-2 gap-2.5 min-[620px]:columns-3 min-[620px]:gap-3",
  square = false,
}: {
  items: PhotoGridItem[];
  t: Dictionary;
  gridClassName?: string;
  // Her work as square tiles. Inspiration stock keeps its own shape.
  square?: boolean;
}) {
  if (items.length === 0) return null;

  const c = t.gallery;
  const openLabel = (text: string) => c.lightbox.open.replace("{photo}", text);

  // Built in the same pass as the children: clicks open by index.
  const photos = items.map((item) =>
    item.kind === "work"
      ? {
          imagekitPath: item.image.imagekitPath,
          serviceId: item.image.serviceId,
          alt: c.images[item.image.key],
          width: item.image.width,
          height: item.image.height,
        }
      : {
          imagekitPath: item.image.imagekitPath,
          serviceId: item.serviceId,
          alt: t.inspiration.tag,
          width: item.image.width,
          height: item.image.height,
          tag: t.inspiration.tag,
        },
  );

  return (
    <GalleryGrid
      chips={[]}
      total={items.length}
      allLabel={c.filters.all}
      filterLabel={c.filters.label}
      countOne={c.count.one}
      countOther={c.count.other}
      photos={photos}
      lightboxLabels={c.lightbox}
      gridClassName={gridClassName}
    >
      {items.map((item, index) =>
        item.kind === "work" ? (
          <GalleryFigure
            key={item.image.key}
            image={item.image}
            alt={c.images[item.image.key]}
            serviceName={t.services[item.image.serviceId].name}
            index={index}
            openLabel={openLabel(c.images[item.image.key])}
            square={square}
          />
        ) : (
          <InspirationFigure
            key={item.image.imagekitPath}
            image={item.image}
            tag={t.inspiration.tag}
            index={index}
            openLabel={openLabel(t.inspiration.tag)}
          />
        ),
      )}
    </GalleryGrid>
  );
}
