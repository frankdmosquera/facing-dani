import { Photo } from "@/components/media/Photo";
import type { GalleryImage } from "@/data/gallery";
import type { ServiceId } from "@/data/services";

/**
 * One photograph in the grid: the image, its scrim and its service tag.
 *
 * The image itself and the missing-endpoint fallback belong to `Photo`. What
 * stays here is the chrome - the figure, the reveal, the tag, and the classes
 * that take a photo out of the grid when another service is filtered.
 *
 * `data-service` is what the filter hides against. It stays on the figure rather
 * than on a wrapper so the CSS rule has one thing to match.
 *
 * Only the first photograph gets `priority`. Everything else takes Next's
 * default, which is `loading="lazy"`, and that is correct here.
 *
 * This looked wrong and was measured twice. The grid is CSS multi-column, so
 * items flow *down each column*: at 1280px the four photographs in the top row
 * are records 1, 4, 7 and 10, not 1 to 4. Preloading the first four therefore
 * spends two of its four hints below the fold, and two images a visitor sees
 * immediately are marked lazy.
 *
 * It does not matter. On the deployed page in a real foreground tab, all ten
 * images finished between 255ms and 260ms - the lazy ones within 5ms of the
 * preloaded ones. Chrome requests in-viewport lazy images during the initial
 * load; `lazy` only defers what is well below the fold, and a ten-photo grid
 * sits inside that threshold.
 *
 * `loading="eager"` on the rest was tried and reverted. In Next 16 an eager
 * image also emits a `<link rel="preload" as="image">`, each carrying a full
 * ten-entry srcset: ten of them added 12.3KB to the document to win nothing.
 * Ten competing preloads is not a priority hint.
 */

/** Must match the grid's column counts, or Next picks the wrong source width. */
const SIZES = "(min-width: 1000px) 25vw, (min-width: 620px) 33vw, 50vw";

/**
 * Colour is navigation: pink is nails, violet lashes, orange makeup, keyed off
 * the service id so the tag and the filter chip cannot drift apart. The name is
 * always there as text, so the colour is reinforcement and never the message.
 */
const accentText: Record<ServiceId, string> = {
  nails: "text-nails",
  lashes: "text-lashes",
  makeup: "text-makeup",
};

const FIGURE =
  "group relative mb-2.5 break-inside-avoid overflow-hidden rounded-lg border border-line-soft bg-shot min-[620px]:mb-3 min-[1000px]:mb-3.5";

/**
 * How a photo takes itself out of the grid when another service is filtered.
 *
 * The filter is a `data-filter` attribute the client shell sets on the grid
 * container; these are the matching variants, so the hiding is CSS and no
 * figure re-renders. Written out as three literal strings because Tailwind
 * scans source text: a class name assembled at runtime is a class name it
 * never generates.
 */
const hideWhenOtherFiltered: Record<ServiceId, string> = {
  nails:
    "group-data-[filter=lashes]/grid:hidden group-data-[filter=makeup]/grid:hidden",
  lashes:
    "group-data-[filter=nails]/grid:hidden group-data-[filter=makeup]/grid:hidden",
  makeup:
    "group-data-[filter=nails]/grid:hidden group-data-[filter=lashes]/grid:hidden",
};

/**
 * Hover does not exist on a phone, and the phone is the product. The scrim and
 * the tag are a reveal only where the device can actually hover; everywhere
 * else they are simply on.
 *
 * The tag also does the labelling work when no endpoint is configured and
 * `Photo` has drawn a plain box, which is why it is no longer duplicated inside
 * the fallback.
 */
const REVEAL =
  "opacity-0 transition-opacity duration-200 group-hover:opacity-100 [@media(hover:none)]:opacity-100";

export function GalleryFigure({
  image,
  alt,
  serviceName,
  priority = false,
}: {
  image: GalleryImage;
  alt: string;
  serviceName: string;
  priority?: boolean;
}) {
  return (
    <figure
      data-service={image.serviceId}
      className={`${FIGURE} ${hideWhenOtherFiltered[image.serviceId]}`}
    >
      <Photo
        path={image.imagekitPath}
        alt={alt}
        width={image.width}
        height={image.height}
        sizes={SIZES}
        priority={priority}
        className="block h-auto w-full"
      />

      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(20,15,28,.66),rgba(20,15,28,0)_46%)] ${REVEAL}`}
      />

      <figcaption
        className={`absolute bottom-2.5 left-2.5 z-[2] rounded-pill border border-white/15 bg-[rgba(20,15,28,.75)] px-2.5 py-[5px] text-[9.5px] font-semibold tracking-[0.13em] uppercase ${accentText[image.serviceId]} ${REVEAL}`}
      >
        {serviceName}
      </figcaption>
    </figure>
  );
}
