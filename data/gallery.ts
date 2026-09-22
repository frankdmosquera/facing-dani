import type { Dictionary } from "@/dictionaries/en";

import { services, type ServiceId } from "./services";

/**
 * Her work, as records. The repo stores a path, never a photograph.
 *
 * Keyed against the dictionary the same way `data/faq.ts` is, so a photo with
 * no alt text is a compile error rather than an `alt=""` that nobody notices.
 * Adding a record means adding its English alt first, which makes the build
 * demand the Spanish one.
 *
 * Every record here is her own work, cut from the 72 photographs she sent on
 * 2026-09-21. The one thing this file must never contain is stock photography:
 * a gallery on a nail artist's site is a claim that this is her work, and a
 * client who books on a borrowed photo finds out in the chair.
 *
 * Ten nail sets and nothing else. Two shots of a makeup look exist and are held
 * back because the model's face is recognisable and nobody has asked her. There
 * are no lash photographs at all, which is why `lashes` has no chip on the
 * page - see the filter rule in `galleryServiceCounts`.
 *
 * Ordered strongest first: the first four load eagerly and are what a visitor
 * sees before scrolling, so the tight close-ups and the dark backgrounds go at
 * the top and the softer, paler sets follow.
 */
export type GalleryKey = keyof Dictionary["gallery"]["images"];

export type GalleryImage = {
  key: GalleryKey;
  /** Path inside the ImageKit library, leading slash, no endpoint. */
  imagekitPath: string;
  serviceId: ServiceId;
  order: number;
  /**
   * The source file's intrinsic pixels, and not optional.
   *
   * `@imagekit/next`'s Image wraps `next/image`, which needs real dimensions
   * unless it is `fill` - and `fill` needs a parent of fixed aspect, which is
   * the one thing a mixed-crop masonry grid cannot have. Without these every
   * photo pops in and shoves its whole column down the page.
   *
   * Shared rather than locale-keyed, because a dimension does not translate.
   */
  width: number;
  height: number;
};

export const gallery: GalleryImage[] = [
  { key: "frenchGlitterGems", imagekitPath: "/nails/french-glitter-gems.jpg", serviceId: "nails", order: 1, width: 1500, height: 2000 },
  { key: "nudeOvalGloss", imagekitPath: "/nails/nude-oval-gloss.jpg", serviceId: "nails", order: 2, width: 1500, height: 2000 },
  { key: "burgundyCatEye", imagekitPath: "/nails/burgundy-cat-eye.jpg", serviceId: "nails", order: 3, width: 1500, height: 2000 },
  { key: "palePinkGloss", imagekitPath: "/nails/pale-pink-gloss.jpg", serviceId: "nails", order: 4, width: 1500, height: 2000 },
  { key: "peachFrenchGems", imagekitPath: "/nails/peach-french-gems.jpg", serviceId: "nails", order: 5, width: 1500, height: 2000 },
  { key: "whiteGlitterSquare", imagekitPath: "/nails/white-glitter-square.jpg", serviceId: "nails", order: 6, width: 1500, height: 2000 },
  { key: "blueFrenchFloral", imagekitPath: "/nails/blue-french-floral.jpg", serviceId: "nails", order: 7, width: 1200, height: 1600 },
  { key: "pinkFloralArt", imagekitPath: "/nails/pink-floral-art.jpg", serviceId: "nails", order: 8, width: 1500, height: 2000 },
  { key: "pastelFrenchTips", imagekitPath: "/nails/pastel-french-tips.jpg", serviceId: "nails", order: 9, width: 1200, height: 1600 },
  { key: "lilacSquare", imagekitPath: "/nails/lilac-square.jpg", serviceId: "nails", order: 10, width: 1500, height: 2000 },
];

/** Photos in display order. */
export function orderedGallery(): GalleryImage[] {
  return [...gallery].sort((a, b) => a.order - b.order);
}

/**
 * How many photos each service has, in service order, and only for the ones
 * that have any.
 *
 * The filter row is built from this rather than from `services`: a chip for a
 * service with no photos is a dead end that reports "0 photos", and with a
 * small set that is the normal case rather than the edge case.
 */
export function galleryServiceCounts(): { id: ServiceId; count: number }[] {
  return [...services]
    .sort((a, b) => a.order - b.order)
    .map((service) => ({
      id: service.id,
      count: gallery.filter((image) => image.serviceId === service.id).length,
    }))
    .filter((entry) => entry.count > 0);
}
