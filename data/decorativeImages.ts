import { serviceHasWork } from "./gallery";
import type { ServiceId } from "./services";

/**
 * Licensed stock for a service page that has none of her photographs yet.
 *
 * Decoration, not a claim. A gallery row says "this is my work"; this file
 * says nothing of the kind, and every rule below exists to keep it that way:
 *
 * - Never in the gallery or a work strip, never in structured data, never in
 *   the sitemap. Nothing outside the service page's opening band reads this
 *   file.
 * - Never captioned. There is no alt text and no dictionary key: the image
 *   carries nothing a visitor needs, and any words describing it would be words
 *   implying it is hers.
 * - No identifiable face. Dani is 17 and the site shows no portrait of her, so
 *   a stock face on her page would be read as her. A single eye or lash line,
 *   lips alone, or no person at all. Never both eyes with the nose or mouth.
 * - It comes off by itself. `decorativeImageFor` returns `null` the moment the
 *   service has any record in `data/gallery.ts`, so adding her first lash
 *   photo removes the lash stock on the next build. Delete the record here in
 *   the same change; nothing breaks if it is forgotten.
 *
 * Keyed by service rather than naming lashes and makeup, so the next client
 * from this template needs no code change. Which pages get stock is decided by
 * which records exist.
 *
 * Only the free Unsplash License or the Pexels License. Unsplash+ images turn
 * up in Unsplash search and are paid: they do not belong here.
 */
export type DecorativeImage = {
  /** Path inside the ImageKit library, leading slash, no endpoint. */
  imagekitPath: string;
  /** The cropped master's real pixels, so the space is reserved before it loads. */
  width: number;
  height: number;
  /** Provenance, never rendered. It is what proves the licence if anyone asks. */
  source: string;
  photographer: string;
  licence: "unsplash" | "pexels";
};

/**
 * Both cropped to 3:2 on 2026-09-23 from the Pexels originals, so that only one
 * eye is in frame: the lash original shows the client's other eye in a corner,
 * and the makeup original shows the second eye and the nose.
 */
export const decorativeImages: Partial<Record<ServiceId, DecorativeImage>> = {
  lashes: {
    imagekitPath: "/decorative/lashes/lash-mapping-close-up.jpg",
    width: 3130,
    height: 2087,
    source:
      "https://www.pexels.com/photo/close-up-of-eyelash-extension-application-process-35013077/",
    photographer: "Ekaterina Bogdanova",
    licence: "pexels",
  },
  makeup: {
    imagekitPath: "/decorative/makeup/smoky-eye-blend.jpg",
    width: 2214,
    height: 1476,
    source: "https://www.pexels.com/photo/brown-eyeshadow-makeup-4006692/",
    photographer: "Laura Garcia",
    licence: "pexels",
  },
};

/** The stock for a service, or `null` when it has her work or has no record. */
export function decorativeImageFor(serviceId: ServiceId): DecorativeImage | null {
  if (serviceHasWork(serviceId)) return null;
  return decorativeImages[serviceId] ?? null;
}
