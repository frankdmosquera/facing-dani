import { Image } from "@imagekit/next";

import type { GalleryImage } from "@/data/gallery";
import type { ServiceId } from "@/data/services";
import { MEDIA_VERSION, imagekitEndpoint } from "@/lib/imagekit";

/**
 * One photograph in the grid.
 *
 * `Image` has to come from `@imagekit/next`, which opens with `'use client'`,
 * so the image itself is a client boundary. There is no server-rendered
 * alternative: `@imagekit/next/server` exports `getUploadAuthParams` and
 * nothing else. A `dist/server/types/index.d.ts` inside the package does list
 * an `Image`, but the package's own exports map does not point at that file and
 * the built module does not contain it, so importing from there is a type error
 * and, if it resolved, would be a runtime one.
 *
 * Everything around the image - this figure, the scrim, the caption - still
 * renders on the server, which is why the grid passes figures to its filter
 * shell as `children` rather than letting the shell build them.
 *
 * `data-service` is what the filter hides against. It stays on the figure
 * rather than on a wrapper so the CSS rule has one thing to match.
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
  /**
   * No endpoint configured: a labelled box that holds the photo's real shape,
   * so the masonry still lays out and the page is reviewable before anyone has
   * pulled the env file.
   */
  if (!imagekitEndpoint) {
    return (
      <figure
        data-service={image.serviceId}
        className={`${FIGURE} ${hideWhenOtherFiltered[image.serviceId]}`}
      >
        <div
          role="img"
          aria-label={alt}
          style={{ aspectRatio: `${image.width} / ${image.height}` }}
          className="grid w-full place-items-center p-3 text-center text-[10px] font-semibold tracking-[0.14em] text-ink-faint uppercase"
        >
          {serviceName}
        </div>
      </figure>
    );
  }

  return (
    <figure
      data-service={image.serviceId}
      className={`${FIGURE} ${hideWhenOtherFiltered[image.serviceId]}`}
    >
      <Image
        urlEndpoint={imagekitEndpoint}
        src={image.imagekitPath}
        alt={alt}
        width={image.width}
        height={image.height}
        queryParameters={{ v: MEDIA_VERSION }}
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
