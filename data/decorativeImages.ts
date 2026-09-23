import { serviceHasWork } from "./gallery";
import type { ServiceId } from "./services";

/**
 * Licensed stock for the service pages. Two uses, one set of rules.
 *
 * - **The opening image** (`decorativeImages`): one photo at the top of a
 *   service page that has none of her photographs yet. It comes off by itself:
 *   `decorativeImageFor` returns `null` the moment the service has any record
 *   in `data/gallery.ts`.
 * - **The Inspiration grid** (`inspirationImages`): styles a client can bring
 *   in as a reference. It stays after her photos arrive, because it shows
 *   styles, not her work. It never renders without its heading and the line
 *   saying these are stock photos: the heading is what keeps it honest.
 *
 * Decoration, not a claim. A gallery row says "this is my work"; this file
 * says nothing of the kind, and every rule below exists to keep it that way:
 *
 * - Never in the gallery or a work strip, never in structured data, never in
 *   the sitemap. Only the service page reads this file.
 * - Never captioned. There is no alt text and no dictionary key per image: the
 *   images carry nothing a visitor needs, and any words describing one would
 *   be words implying it is hers.
 * - No identifiable face. Dani is 17 and the site shows no portrait of her, so
 *   a stock face on her page would be read as her. A single eye or lash line,
 *   lips alone, hands and tools, or no person at all. Never both eyes with the
 *   nose or mouth. Judged by looking at the crop, never from the stock site's
 *   description.
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
 * Cropped from the Pexels originals so that no face is in frame. The lash
 * image replaced the mapping-tape close-up from item 16 on 2026-09-23, at
 * Frank's request; that file is still in the library, unused, as is a first,
 * looser crop of this one (`lash-tweezers-pink-nails.jpg`).
 */
const lashOpening: DecorativeImage = {
  imagekitPath: "/decorative/lashes/lash-line-pink-nails.jpg",
  width: 2400,
  height: 1500,
  source: "https://www.pexels.com/photo/36930354/",
  photographer: "Kerim Eveyik",
  licence: "pexels",
};

const makeupOpening: DecorativeImage = {
  imagekitPath: "/decorative/makeup/smoky-eye-blend.jpg",
  width: 2214,
  height: 1476,
  source: "https://www.pexels.com/photo/brown-eyeshadow-makeup-4006692/",
  photographer: "Laura Garcia",
  licence: "pexels",
};

export const decorativeImages: Partial<Record<ServiceId, DecorativeImage>> = {
  lashes: lashOpening,
  makeup: makeupOpening,
};

/**
 * Frank's picks from a contact sheet on 2026-09-23, in the order he left them.
 * The comment on each record is its code on that sheet. Lashes and makeup
 * list their opening image too, because it was one of the picks;
 * `inspirationFor` leaves it out so no photo shows twice on one page.
 *
 * Crops were made from the originals and checked by eye. Nails needed none;
 * most of the lash and makeup shots were cut down to one eye, lips, or hands.
 */
export const inspirationImages: Partial<Record<ServiceId, DecorativeImage[]>> = {
  nails: [
    // N1
    {
      imagekitPath: "/decorative/nails/inspiration/geometric-nail-art.jpg",
      width: 2400,
      height: 1600,
      source: "https://www.pexels.com/photo/4965824/",
      photographer: "cottonbro studio",
      licence: "pexels",
    },
    // N3
    {
      imagekitPath: "/decorative/nails/inspiration/french-tips-and-rings.jpg",
      width: 1600,
      height: 2400,
      source: "https://www.pexels.com/photo/34997574/",
      photographer: "Salim Da",
      licence: "pexels",
    },
    // N4
    {
      imagekitPath: "/decorative/nails/inspiration/polka-dot-brights.jpg",
      width: 2400,
      height: 1600,
      source: "https://www.pexels.com/photo/7066298/",
      photographer: "locrifa",
      licence: "pexels",
    },
    // N9
    {
      imagekitPath: "/decorative/nails/inspiration/leopard-and-black.jpg",
      width: 1600,
      height: 2400,
      source: "https://www.pexels.com/photo/34835304/",
      photographer: "Salim Da",
      licence: "pexels",
    },
    // N11
    {
      imagekitPath: "/decorative/nails/inspiration/uv-lamp-cure.jpg",
      width: 1600,
      height: 2400,
      source: "https://www.pexels.com/photo/3997392/",
      photographer: "cottonbro studio",
      licence: "pexels",
    },
    // N12
    {
      imagekitPath: "/decorative/nails/inspiration/red-swirl-on-fur.jpg",
      width: 1600,
      height: 2400,
      source: "https://www.pexels.com/photo/34871556/",
      photographer: "Salim Da",
      licence: "pexels",
    },
    // N14
    {
      imagekitPath: "/decorative/nails/inspiration/nude-polka-dots-knit.jpg",
      width: 1600,
      height: 2400,
      source: "https://www.pexels.com/photo/3557600/",
      photographer: "Kristina Paukshtite",
      licence: "pexels",
    },
    // N15
    {
      imagekitPath: "/decorative/nails/inspiration/leopard-and-black-on-blue.jpg",
      width: 1600,
      height: 2400,
      source: "https://www.pexels.com/photo/34835305/",
      photographer: "Salim Da",
      licence: "pexels",
    },
    // N16
    {
      imagekitPath: "/decorative/nails/inspiration/coral-bow-accents.jpg",
      width: 1600,
      height: 2400,
      source: "https://www.pexels.com/photo/34885844/",
      photographer: "Salim Da",
      licence: "pexels",
    },
    // N17
    {
      imagekitPath: "/decorative/nails/inspiration/polish-application.jpg",
      width: 1602,
      height: 2400,
      source: "https://www.pexels.com/photo/4677845/",
      photographer: "Leeloo The First",
      licence: "pexels",
    },
    // N19
    {
      imagekitPath: "/decorative/nails/inspiration/pink-gel-with-flower.jpg",
      width: 2400,
      height: 1600,
      source: "https://www.pexels.com/photo/20758448/",
      photographer: "mehrab zahedbeigi",
      licence: "pexels",
    },
    // N23
    {
      imagekitPath: "/decorative/nails/inspiration/red-swirl-in-the-dark.jpg",
      width: 1600,
      height: 2400,
      source: "https://www.pexels.com/photo/34871553/",
      photographer: "Salim Da",
      licence: "pexels",
    },
  ],
  lashes: [
    // L2, the opening image
    lashOpening,
    // L3
    {
      imagekitPath: "/decorative/lashes/inspiration/lash-isolation-under-eye-pad.jpg",
      width: 2400,
      height: 1700,
      source: "https://www.pexels.com/photo/8554941/",
      photographer: "Екатерина Мясоед",
      licence: "pexels",
    },
    // L5
    {
      imagekitPath: "/decorative/lashes/inspiration/lash-fan-tray.jpg",
      width: 2400,
      height: 1463,
      source: "https://www.pexels.com/photo/7755525/",
      photographer: "RDNE Stock project",
      licence: "pexels",
    },
    // L6
    {
      imagekitPath: "/decorative/lashes/inspiration/lash-application-black-gloves.jpg",
      width: 1600,
      height: 2400,
      source: "https://www.pexels.com/photo/5128234/",
      photographer: "Nataliya Vaitkevich",
      licence: "pexels",
    },
    // L10
    {
      imagekitPath: "/decorative/lashes/inspiration/lash-spoolie-brush.jpg",
      width: 2400,
      height: 1601,
      source: "https://www.pexels.com/photo/5128267/",
      photographer: "Nataliya Vaitkevich",
      licence: "pexels",
    },
    // L11
    {
      imagekitPath: "/decorative/lashes/inspiration/lash-application-gloves-side.jpg",
      width: 2031,
      height: 2400,
      source: "https://www.pexels.com/photo/5128220/",
      photographer: "Nataliya Vaitkevich",
      licence: "pexels",
    },
    // L14
    {
      imagekitPath: "/decorative/lashes/inspiration/lash-application-from-above.jpg",
      width: 2400,
      height: 1800,
      source: "https://www.pexels.com/photo/6135662/",
      photographer: "Gabriel Puyén",
      licence: "pexels",
    },
    // L16
    {
      imagekitPath: "/decorative/lashes/inspiration/volume-lash-set-close-up.jpg",
      width: 1800,
      height: 2400,
      source: "https://www.pexels.com/photo/21412169/",
      photographer: "Milangel Melendez",
      licence: "pexels",
    },
    // L17
    {
      imagekitPath: "/decorative/lashes/inspiration/lash-spoolie-blue-nails.jpg",
      width: 2400,
      height: 1812,
      source: "https://www.pexels.com/photo/38194468/",
      photographer: "Visen Group",
      licence: "pexels",
    },
    // L18
    {
      imagekitPath: "/decorative/lashes/inspiration/lash-mapping-tape.jpg",
      width: 2179,
      height: 2400,
      source: "https://www.pexels.com/photo/33637609/",
      photographer: "Louix Hunter",
      licence: "pexels",
    },
    // L20
    {
      imagekitPath: "/decorative/lashes/inspiration/lash-application-silver-nails.jpg",
      width: 1466,
      height: 2400,
      source: "https://www.pexels.com/photo/33723106/",
      photographer: "Layla Luany",
      licence: "pexels",
    },
    // L21
    {
      imagekitPath: "/decorative/lashes/inspiration/lash-pad-and-tweezers.jpg",
      width: 2052,
      height: 2400,
      source: "https://www.pexels.com/photo/7755531/",
      photographer: "RDNE Stock project",
      licence: "pexels",
    },
    // L22
    {
      imagekitPath: "/decorative/lashes/inspiration/lash-tweezers-blue-nails.jpg",
      width: 2400,
      height: 1063,
      source: "https://www.pexels.com/photo/38194465/",
      photographer: "Visen Group",
      licence: "pexels",
    },
    // L23
    {
      imagekitPath: "/decorative/lashes/inspiration/lash-artist-at-work.jpg",
      width: 2371,
      height: 1313,
      source: "https://www.pexels.com/photo/29391092/",
      photographer: "Banda é o Gera",
      licence: "pexels",
    },
  ],
  makeup: [
    // M1, the opening image
    makeupOpening,
    // M2
    {
      imagekitPath: "/decorative/makeup/inspiration/liner-with-gloved-brush.jpg",
      width: 2400,
      height: 1800,
      source: "https://www.pexels.com/photo/35341712/",
      photographer: "khezez | خزاز",
      licence: "pexels",
    },
    // M4
    {
      imagekitPath: "/decorative/makeup/inspiration/coral-shadow-brush.jpg",
      width: 1740,
      height: 1407,
      source: "https://www.pexels.com/photo/7290740/",
      photographer: "MART PRODUCTION",
      licence: "pexels",
    },
    // M6
    {
      imagekitPath: "/decorative/makeup/inspiration/lip-liner.jpg",
      width: 1639,
      height: 819,
      source: "https://www.pexels.com/photo/33965317/",
      photographer: "Fahad Puthawala",
      licence: "pexels",
    },
    // M7
    {
      imagekitPath: "/decorative/makeup/inspiration/brown-cut-crease.jpg",
      width: 2400,
      height: 2051,
      source: "https://www.pexels.com/photo/7588617/",
      photographer: "Kaboompics.com",
      licence: "pexels",
    },
    // M8
    {
      imagekitPath: "/decorative/makeup/inspiration/orange-pink-graphic-shadow.jpg",
      width: 1840,
      height: 1500,
      source: "https://www.pexels.com/photo/4978937/",
      photographer: "Keith Lobo",
      licence: "pexels",
    },
    // M10
    {
      imagekitPath: "/decorative/makeup/inspiration/bronze-shimmer-eye.jpg",
      width: 2400,
      height: 1887,
      source: "https://www.pexels.com/photo/16017832/",
      photographer: "Alexander Krivitskiy",
      licence: "pexels",
    },
    // M11
    {
      imagekitPath: "/decorative/makeup/inspiration/mascara-close-up.jpg",
      width: 2400,
      height: 1618,
      source: "https://www.pexels.com/photo/3762768/",
      photographer: "Shiny Diamond",
      licence: "pexels",
    },
    // M12
    {
      imagekitPath: "/decorative/makeup/inspiration/shadow-on-closed-lid.jpg",
      width: 1486,
      height: 1263,
      source: "https://www.pexels.com/photo/7514850/",
      photographer: "Kampus Production",
      licence: "pexels",
    },
    // M13
    {
      imagekitPath: "/decorative/makeup/inspiration/pink-graphic-liner.jpg",
      width: 2051,
      height: 2400,
      source: "https://www.pexels.com/photo/15579987/",
      photographer: "Mohammadreza Babaei",
      licence: "pexels",
    },
    // M14
    {
      imagekitPath: "/decorative/makeup/inspiration/pencil-winged-liner.jpg",
      width: 2223,
      height: 1900,
      source: "https://www.pexels.com/photo/6713323/",
      photographer: "Alex Reedson",
      licence: "pexels",
    },
  ],
};

/** The stock for a service, or `null` when it has her work or has no record. */
export function decorativeImageFor(serviceId: ServiceId): DecorativeImage | null {
  if (serviceHasWork(serviceId)) return null;
  return decorativeImages[serviceId] ?? null;
}

/**
 * The Inspiration grid for a service, minus whatever the opening image already
 * shows. Ignores `serviceHasWork` on purpose: the grid stays when her photos
 * arrive. An empty list means no grid.
 */
export function inspirationFor(serviceId: ServiceId): DecorativeImage[] {
  const opening = decorativeImageFor(serviceId);
  return (inspirationImages[serviceId] ?? []).filter(
    (image) => image.imagekitPath !== opening?.imagekitPath,
  );
}
