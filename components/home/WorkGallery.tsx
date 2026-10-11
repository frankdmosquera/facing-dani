import { GalleryFigure } from "@/components/gallery/GalleryFigure";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { Band } from "@/components/site/Band";
import { orderedGallery } from "@/data/gallery";
import type { Dictionary } from "@/dictionaries";

// The /gallery page body: every nail set she has, with the photo viewer. Nails only: a makeup photo of a face may be her.
export function WorkGallery({ t }: { t: Dictionary }) {
  const c = t.home.work;
  const g = t.gallery;
  const images = orderedGallery().filter((image) => image.serviceId === "nails");

  if (images.length === 0) return null;

  return (
    <Band id="work" className="pt-[26px]!">
      <span className="eyebrow mb-5">{c.eyebrow}</span>
      <h1 className="mb-10 text-[clamp(52px,9vw,120px)] leading-[0.9]">{c.heading}</h1>

      {/* No chips: one service, so the grid hides its filter. */}
      <GalleryGrid
        chips={[]}
        total={images.length}
        allLabel={g.filters.all}
        filterLabel={g.filters.label}
        countOne={g.count.one}
        countOther={g.count.other}
        /* Must stay in the same order as the children: clicks open by index. */
        photos={images.map((image) => ({
          imagekitPath: image.imagekitPath,
          serviceId: image.serviceId,
          alt: g.images[image.key],
          width: image.width,
          height: image.height,
        }))}
        lightboxLabels={g.lightbox}
        gridClassName="columns-2 gap-2.5 min-[620px]:columns-3 min-[620px]:gap-3 min-[1000px]:columns-4 min-[1000px]:gap-3.5"
      >
        {images.map((image, index) => (
          <GalleryFigure
            key={image.key}
            image={image}
            alt={g.images[image.key]}
            serviceName={t.services.nails.name}
            index={index}
            openLabel={g.lightbox.open.replace("{photo}", g.images[image.key])}
          />
        ))}
      </GalleryGrid>
    </Band>
  );
}
