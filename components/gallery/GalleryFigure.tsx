import { Photo } from "@/components/media/Photo";
import type { GalleryImage } from "@/data/gallery";
import type { ServiceId } from "@/data/services";

// Must match the grid's column counts, or Next picks the wrong source width.
const SIZES = "(min-width: 1000px) 25vw, (min-width: 620px) 33vw, 50vw";

const accentText: Record<ServiceId, string> = {
  nails: "text-nails",
  lashes: "text-lashes",
  makeup: "text-makeup",
};

const FIGURE =
  "group relative mb-2.5 break-inside-avoid overflow-hidden rounded-lg border border-line-soft bg-shot min-[620px]:mb-3 min-[1000px]:mb-3.5";

// The filter is pure CSS off the grid's data-filter. Literal strings, because Tailwind cannot see runtime-built classes.
const hideWhenOtherFiltered: Record<ServiceId, string> = {
  nails:
    "group-data-[filter=lashes]/grid:hidden group-data-[filter=makeup]/grid:hidden",
  lashes:
    "group-data-[filter=nails]/grid:hidden group-data-[filter=makeup]/grid:hidden",
  makeup:
    "group-data-[filter=nails]/grid:hidden group-data-[filter=lashes]/grid:hidden",
};

// Hover-only reveal; always visible on touch screens.
const REVEAL =
  "opacity-0 transition-opacity duration-200 group-hover:opacity-100 [@media(hover:none)]:opacity-100";

export function GalleryFigure({
  image,
  alt,
  serviceName,
  index,
  openLabel,
  priority = false,
}: {
  image: GalleryImage;
  alt: string;
  serviceName: string;
  // Omitted on the service pages, which have no lightbox: no button is rendered.
  index?: number;
  openLabel?: string;
  priority?: boolean;
}) {
  const photo = (
    <Photo
      path={image.imagekitPath}
      alt={alt}
      width={image.width}
      height={image.height}
      sizes={SIZES}
      priority={priority}
      className="block h-auto w-full"
    />
  );

  return (
    <figure
      data-service={image.serviceId}
      className={`${FIGURE} ${hideWhenOtherFiltered[image.serviceId]}`}
    >
      {/* No onClick: the grid listens once on its container, which keeps this a server component. */}
      {index === undefined ? (
        photo
      ) : (
        <button
          type="button"
          data-photo-index={index}
          aria-label={openLabel}
          className="block w-full cursor-zoom-in focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
        >
          {photo}
        </button>
      )}

      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(20,15,28,.66),rgba(20,15,28,0)_46%)] ${REVEAL}`}
      />

      {/* pointer-events-none so a tap on the tag still opens the photo. */}
      <figcaption
        className={`pointer-events-none absolute bottom-2.5 left-2.5 z-[2] rounded-pill border border-white/15 bg-[rgba(20,15,28,.75)] px-2.5 py-[5px] text-[9.5px] font-semibold tracking-[0.13em] uppercase ${accentText[image.serviceId]} ${REVEAL}`}
      >
        {serviceName}
      </figcaption>
    </figure>
  );
}
