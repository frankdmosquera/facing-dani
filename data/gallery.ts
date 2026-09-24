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
 * Every record here is her own work, cut from the photographs she put in her
 * Drive folder on 2026-09-21. The one thing this file must never contain is
 * stock photography: a gallery on a nail artist's site is a claim that this is
 * her work, and a client who books on a borrowed photo finds out in the chair.
 * Stock lives in `data/decorativeImages.ts`, under a heading that says so.
 *
 * Eighteen nail sets and nothing else. The folder holds 101 stills, but the
 * first nine came from a download that only ever saved the first of two zips,
 * so 29 photos went unseen until 2026-09-23. Orders 10 to 18 are Frank's picks
 * from the full set, each cropped on a 10% grid he called by eye.
 *
 * Every makeup look in the folder shows the client's whole face, so none is
 * here until the person in it says yes. There are no lash photographs at all,
 * which is why `lashes` has no chip on the page - see the filter rule in
 * `galleryServiceCounts`. Her phone writes GPS into every original; the files
 * uploaded here were re-encoded without it, and any new one must be too.
 *
 * Every frame is cropped to the nails. The masters shipped uncropped at first,
 * which put a whole hand in every tile and made the grid read as hands rather
 * than as nail work. Recut from the originals on 2026-09-22. A tenth set, a
 * plain glossy nude, was dropped in the same pass: it duplicated
 * `palePinkGloss` and neither the colour nor the crop gave it a reason to stay.
 * Its file is still in the library, unreferenced.
 *
 * The dimensions below are therefore all different, and every one of them is
 * the real cropped file. Nothing here is a 3:4 assumption.
 *
 * Ordered strongest first: the first four load eagerly and are what a visitor
 * sees before scrolling, so the work with visible craft leads - painted flowers,
 * chrome, crystals - and the plain single colours follow. Orders 10 to 18 are
 * not ranked yet: they sit in pick order so the home page and the nails strip
 * did not move when they arrived. Ranking all eighteen comes with choosing the
 * home and nails heroes.
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
  { key: "frenchGlitterGems", imagekitPath: "/nails/french-glitter-gems.jpg", serviceId: "nails", order: 1, width: 2560, height: 2389 },
  { key: "burgundyCatEye", imagekitPath: "/nails/burgundy-cat-eye.jpg", serviceId: "nails", order: 2, width: 1391, height: 1613 },
  { key: "blueFrenchFloral", imagekitPath: "/nails/blue-french-floral.jpg", serviceId: "nails", order: 3, width: 1200, height: 1360 },
  { key: "lilacSquare", imagekitPath: "/nails/lilac-square.jpg", serviceId: "nails", order: 4, width: 1651, height: 1885 },
  { key: "whiteGlitterSquare", imagekitPath: "/nails/white-glitter-square.jpg", serviceId: "nails", order: 5, width: 1536, height: 2560 },
  { key: "peachFrenchGems", imagekitPath: "/nails/peach-french-gems.jpg", serviceId: "nails", order: 6, width: 2560, height: 1782 },
  { key: "pastelFrenchTips", imagekitPath: "/nails/pastel-french-tips.jpg", serviceId: "nails", order: 7, width: 960, height: 1040 },
  { key: "pinkFloralArt", imagekitPath: "/nails/pink-floral-art.jpg", serviceId: "nails", order: 8, width: 741, height: 1500 },
  { key: "palePinkGloss", imagekitPath: "/nails/pale-pink-gloss.jpg", serviceId: "nails", order: 9, width: 1966, height: 1814 },
  { key: "christmasShortSet", imagekitPath: "/nails/christmas-short-set.jpg", serviceId: "nails", order: 10, width: 864, height: 1536 },
  { key: "whiteFlowerGoldFrench", imagekitPath: "/nails/white-flower-gold-french.jpg", serviceId: "nails", order: 11, width: 605, height: 986 },
  { key: "spiderAccentFrench", imagekitPath: "/nails/spider-accent-french.jpg", serviceId: "nails", order: 12, width: 807, height: 1104 },
  { key: "heartsFrench", imagekitPath: "/nails/hearts-french.jpg", serviceId: "nails", order: 13, width: 1461, height: 2560 },
  { key: "almondBowFrench", imagekitPath: "/nails/almond-bow-french.jpg", serviceId: "nails", order: 14, width: 2194, height: 2560 },
  { key: "pinkFrenchCrystals", imagekitPath: "/nails/pink-french-crystals.jpg", serviceId: "nails", order: 15, width: 1968, height: 2560 },
  { key: "goldLeafFrench", imagekitPath: "/nails/gold-leaf-french.jpg", serviceId: "nails", order: 16, width: 1361, height: 645 },
  { key: "clearCoffinLinework", imagekitPath: "/nails/clear-coffin-linework.jpg", serviceId: "nails", order: 17, width: 1920, height: 2560 },
  { key: "pinkBlackStars", imagekitPath: "/nails/pink-black-stars.jpg", serviceId: "nails", order: 18, width: 2560, height: 2219 },
];

/** Photos in display order. */
export function orderedGallery(): GalleryImage[] {
  return [...gallery].sort((a, b) => a.order - b.order);
}

/**
 * Whether a service has any of her photographs at all.
 *
 * The service page asks this before drawing the band that holds the work
 * strip, because an empty band is still 192px of padding with nothing in it.
 * `data/decorativeImages.ts` asks it too: stock comes off a page the moment
 * her own work for that service exists.
 */
export function serviceHasWork(serviceId: ServiceId): boolean {
  return gallery.some((image) => image.serviceId === serviceId);
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
