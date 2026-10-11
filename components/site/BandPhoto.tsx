import { Photo } from "@/components/media/Photo";
import { galleryImage, type GalleryKey } from "@/data/gallery";

/**
 * One of her photos behind a band, under a shade whose look and strength
 * come from the data-fx and data-strength around it (BackdropChoice, and
 * .band-shade in globals.css). Goes in Band's backdrop.
 * Decorative: every photo is in the gallery with its alt text.
 */
export function BandPhoto({ imageKey }: { imageKey: GalleryKey }) {
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
      <div className="band-shade absolute inset-0" />
    </div>
  );
}
