import type { Dictionary } from "@/dictionaries/en";

import { services, type ServiceId } from "./services";

// Her own work only, never stock. Keys are typed against the dictionary, so a photo without alt text will not compile.
// Strip GPS from every new file: her phone writes it into the originals.
export type GalleryKey = keyof Dictionary["gallery"]["images"];

export type GalleryImage = {
  key: GalleryKey;
  imagekitPath: string;
  serviceId: ServiceId;
  order: number;
  // The real cropped pixels. The masonry grid cannot use `fill`, so these stop the layout jumping.
  width: number;
  height: number;
};

// Strongest first: the first four load eagerly. 10 to 18 are not ranked yet.
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

// The photo beside the home headline. Independent of the order above.
export const HOME_HERO: GalleryKey = "pinkBlackStars";

export function galleryImage(key: GalleryKey): GalleryImage | undefined {
  return gallery.find((image) => image.key === key);
}

export function orderedGallery(): GalleryImage[] {
  return [...gallery].sort((a, b) => a.order - b.order);
}

export function serviceHasWork(serviceId: ServiceId): boolean {
  return gallery.some((image) => image.serviceId === serviceId);
}

// Only services with photos, so the filter never shows a "0 photos" chip.
export function galleryServiceCounts(): { id: ServiceId; count: number }[] {
  return [...services]
    .sort((a, b) => a.order - b.order)
    .map((service) => ({
      id: service.id,
      count: gallery.filter((image) => image.serviceId === service.id).length,
    }))
    .filter((entry) => entry.count > 0);
}
