import { Photo } from "@/components/media/Photo";
import { galleryImage, type GalleryKey } from "@/data/gallery";

/* Where the wash is darkest, so the words always sit on the dark side. */
const WASH = {
  left: "bg-[linear-gradient(90deg,color-mix(in_oklab,var(--ground)_94%,transparent)_0%,color-mix(in_oklab,var(--ground)_80%,transparent)_45%,color-mix(in_oklab,var(--ground)_45%,transparent)_100%)]",
  center:
    "bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--ground)_88%,transparent)_0%,color-mix(in_oklab,var(--ground)_70%,transparent)_55%,color-mix(in_oklab,var(--ground)_50%,transparent)_100%)]",
};

/**
 * A full-bleed band on one of her photos, washed dark so the copy reads, the
 * photo settling from a slight zoom as the band scrolls through. Nail sets
 * only: a face is never blown up this big. Decorative photo; the same one is in
 * the gallery with its alt text.
 */
export function PhotoBand({
  imageKey,
  wash = "left",
  className = "",
  children,
}: {
  imageKey: GalleryKey;
  wash?: keyof typeof WASH;
  className?: string;
  children: React.ReactNode;
}) {
  const image = galleryImage(imageKey);

  return (
    <section
      className={`tone-ink grain relative overflow-hidden bg-ground py-32 text-ink ${className}`}
    >
      {image ? (
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
          <Photo
            path={image.imagekitPath}
            alt=""
            width={image.width}
            height={image.height}
            sizes="100vw"
            className="photo-settle absolute inset-0 size-full object-cover"
          />
          <div className={`absolute inset-0 ${WASH[wash]}`} />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(to_top,var(--ground),transparent)]" />
        </div>
      ) : null}

      <div className="relative mx-auto w-full max-w-[var(--site)] px-[var(--gutter)]">
        {children}
      </div>
    </section>
  );
}
