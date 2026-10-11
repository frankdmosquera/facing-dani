import { Photo } from "@/components/media/Photo";
import { galleryImage, type GalleryKey } from "@/data/gallery";

/**
 * One of her photos behind a band, washed in the band's own ground so its
 * text stays readable in any tone or theme. Goes in Band's backdrop.
 * Decorative: every photo is in the gallery with its alt text.
 */
export function BandPhoto({ imageKey, strength = 82 }: { imageKey: GalleryKey; strength?: number }) {
  const image = galleryImage(imageKey);
  if (!image) return null;
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <Photo
        path={image.imagekitPath}
        alt=""
        width={image.width}
        height={image.height}
        sizes="100vw"
        className="photo-settle block h-full w-full object-cover"
      />
      <div className="absolute inset-0" style={{ background: `color-mix(in oklab, var(--ground) ${strength}%, transparent)` }} />
    </div>
  );
}
