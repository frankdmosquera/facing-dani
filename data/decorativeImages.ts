import { serviceHasWork } from "./gallery";
import type { ServiceId } from "./services";

// Stock photos, never her work: never in the gallery, structured data or alt text.
// No identifiable face, since a face on her page reads as her. One eye, lips, hands or tools only.
// Free Unsplash or Pexels licence only. Unsplash+ shows up in search and is paid.
export type DecorativeImage = {
  imagekitPath: string;
  width: number;
  height: number;
  // Never rendered. Proves the licence if anyone asks.
  source: string;
  photographer: string;
  licence: "unsplash" | "pexels";
};

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

export const inspirationImages: Partial<Record<ServiceId, DecorativeImage[]>> = {
  nails: [
    {
      imagekitPath: "/decorative/nails/inspiration/geometric-nail-art.jpg",
      width: 2400,
      height: 1600,
      source: "https://www.pexels.com/photo/4965824/",
      photographer: "cottonbro studio",
      licence: "pexels",
    },
    {
      imagekitPath: "/decorative/nails/inspiration/french-tips-and-rings.jpg",
      width: 1600,
      height: 2400,
      source: "https://www.pexels.com/photo/34997574/",
      photographer: "Salim Da",
      licence: "pexels",
    },
    {
      imagekitPath: "/decorative/nails/inspiration/polka-dot-brights.jpg",
      width: 2400,
      height: 1600,
      source: "https://www.pexels.com/photo/7066298/",
      photographer: "locrifa",
      licence: "pexels",
    },
    {
      imagekitPath: "/decorative/nails/inspiration/leopard-and-black.jpg",
      width: 1600,
      height: 2400,
      source: "https://www.pexels.com/photo/34835304/",
      photographer: "Salim Da",
      licence: "pexels",
    },
    {
      imagekitPath: "/decorative/nails/inspiration/uv-lamp-cure.jpg",
      width: 1600,
      height: 2400,
      source: "https://www.pexels.com/photo/3997392/",
      photographer: "cottonbro studio",
      licence: "pexels",
    },
    {
      imagekitPath: "/decorative/nails/inspiration/red-swirl-on-fur.jpg",
      width: 1600,
      height: 2400,
      source: "https://www.pexels.com/photo/34871556/",
      photographer: "Salim Da",
      licence: "pexels",
    },
    {
      imagekitPath: "/decorative/nails/inspiration/nude-polka-dots-knit.jpg",
      width: 1600,
      height: 2400,
      source: "https://www.pexels.com/photo/3557600/",
      photographer: "Kristina Paukshtite",
      licence: "pexels",
    },
    {
      imagekitPath: "/decorative/nails/inspiration/leopard-and-black-on-blue.jpg",
      width: 1600,
      height: 2400,
      source: "https://www.pexels.com/photo/34835305/",
      photographer: "Salim Da",
      licence: "pexels",
    },
    {
      imagekitPath: "/decorative/nails/inspiration/coral-bow-accents.jpg",
      width: 1600,
      height: 2400,
      source: "https://www.pexels.com/photo/34885844/",
      photographer: "Salim Da",
      licence: "pexels",
    },
    {
      imagekitPath: "/decorative/nails/inspiration/polish-application.jpg",
      width: 1602,
      height: 2400,
      source: "https://www.pexels.com/photo/4677845/",
      photographer: "Leeloo The First",
      licence: "pexels",
    },
    {
      imagekitPath: "/decorative/nails/inspiration/pink-gel-with-flower.jpg",
      width: 2400,
      height: 1600,
      source: "https://www.pexels.com/photo/20758448/",
      photographer: "mehrab zahedbeigi",
      licence: "pexels",
    },
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
    lashOpening,
    {
      imagekitPath: "/decorative/lashes/inspiration/lash-isolation-under-eye-pad.jpg",
      width: 2400,
      height: 1700,
      source: "https://www.pexels.com/photo/8554941/",
      photographer: "Екатерина Мясоед",
      licence: "pexels",
    },
    {
      imagekitPath: "/decorative/lashes/inspiration/lash-fan-tray.jpg",
      width: 2400,
      height: 1463,
      source: "https://www.pexels.com/photo/7755525/",
      photographer: "RDNE Stock project",
      licence: "pexels",
    },
    {
      imagekitPath: "/decorative/lashes/inspiration/lash-application-black-gloves.jpg",
      width: 1600,
      height: 2400,
      source: "https://www.pexels.com/photo/5128234/",
      photographer: "Nataliya Vaitkevich",
      licence: "pexels",
    },
    {
      imagekitPath: "/decorative/lashes/inspiration/lash-spoolie-brush.jpg",
      width: 2400,
      height: 1601,
      source: "https://www.pexels.com/photo/5128267/",
      photographer: "Nataliya Vaitkevich",
      licence: "pexels",
    },
    {
      imagekitPath: "/decorative/lashes/inspiration/lash-application-gloves-side.jpg",
      width: 2031,
      height: 2400,
      source: "https://www.pexels.com/photo/5128220/",
      photographer: "Nataliya Vaitkevich",
      licence: "pexels",
    },
    {
      imagekitPath: "/decorative/lashes/inspiration/lash-application-from-above.jpg",
      width: 2400,
      height: 1800,
      source: "https://www.pexels.com/photo/6135662/",
      photographer: "Gabriel Puyén",
      licence: "pexels",
    },
    {
      imagekitPath: "/decorative/lashes/inspiration/volume-lash-set-close-up.jpg",
      width: 1800,
      height: 2400,
      source: "https://www.pexels.com/photo/21412169/",
      photographer: "Milangel Melendez",
      licence: "pexels",
    },
    {
      imagekitPath: "/decorative/lashes/inspiration/lash-spoolie-blue-nails.jpg",
      width: 2400,
      height: 1812,
      source: "https://www.pexels.com/photo/38194468/",
      photographer: "Visen Group",
      licence: "pexels",
    },
    {
      imagekitPath: "/decorative/lashes/inspiration/lash-mapping-tape.jpg",
      width: 2179,
      height: 2400,
      source: "https://www.pexels.com/photo/33637609/",
      photographer: "Louix Hunter",
      licence: "pexels",
    },
    {
      imagekitPath: "/decorative/lashes/inspiration/lash-application-silver-nails.jpg",
      width: 1466,
      height: 2400,
      source: "https://www.pexels.com/photo/33723106/",
      photographer: "Layla Luany",
      licence: "pexels",
    },
    {
      imagekitPath: "/decorative/lashes/inspiration/lash-pad-and-tweezers.jpg",
      width: 2052,
      height: 2400,
      source: "https://www.pexels.com/photo/7755531/",
      photographer: "RDNE Stock project",
      licence: "pexels",
    },
    {
      imagekitPath: "/decorative/lashes/inspiration/lash-tweezers-blue-nails.jpg",
      width: 2400,
      height: 1063,
      source: "https://www.pexels.com/photo/38194465/",
      photographer: "Visen Group",
      licence: "pexels",
    },
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
    makeupOpening,
    {
      imagekitPath: "/decorative/makeup/inspiration/liner-with-gloved-brush.jpg",
      width: 2400,
      height: 1800,
      source: "https://www.pexels.com/photo/35341712/",
      photographer: "khezez | خزاز",
      licence: "pexels",
    },
    {
      imagekitPath: "/decorative/makeup/inspiration/coral-shadow-brush.jpg",
      width: 1740,
      height: 1407,
      source: "https://www.pexels.com/photo/7290740/",
      photographer: "MART PRODUCTION",
      licence: "pexels",
    },
    {
      imagekitPath: "/decorative/makeup/inspiration/lip-liner.jpg",
      width: 1639,
      height: 819,
      source: "https://www.pexels.com/photo/33965317/",
      photographer: "Fahad Puthawala",
      licence: "pexels",
    },
    {
      imagekitPath: "/decorative/makeup/inspiration/brown-cut-crease.jpg",
      width: 2400,
      height: 2051,
      source: "https://www.pexels.com/photo/7588617/",
      photographer: "Kaboompics.com",
      licence: "pexels",
    },
    {
      imagekitPath: "/decorative/makeup/inspiration/orange-pink-graphic-shadow.jpg",
      width: 1840,
      height: 1500,
      source: "https://www.pexels.com/photo/4978937/",
      photographer: "Keith Lobo",
      licence: "pexels",
    },
    {
      imagekitPath: "/decorative/makeup/inspiration/bronze-shimmer-eye.jpg",
      width: 2400,
      height: 1887,
      source: "https://www.pexels.com/photo/16017832/",
      photographer: "Alexander Krivitskiy",
      licence: "pexels",
    },
    {
      imagekitPath: "/decorative/makeup/inspiration/mascara-close-up.jpg",
      width: 2400,
      height: 1618,
      source: "https://www.pexels.com/photo/3762768/",
      photographer: "Shiny Diamond",
      licence: "pexels",
    },
    {
      imagekitPath: "/decorative/makeup/inspiration/shadow-on-closed-lid.jpg",
      width: 1486,
      height: 1263,
      source: "https://www.pexels.com/photo/7514850/",
      photographer: "Kampus Production",
      licence: "pexels",
    },
    {
      imagekitPath: "/decorative/makeup/inspiration/pink-graphic-liner.jpg",
      width: 2051,
      height: 2400,
      source: "https://www.pexels.com/photo/15579987/",
      photographer: "Mohammadreza Babaei",
      licence: "pexels",
    },
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

export function inspirationImage(
  imagekitPath: string,
): { image: DecorativeImage; serviceId: ServiceId } | undefined {
  for (const [serviceId, images] of Object.entries(inspirationImages) as [ServiceId, DecorativeImage[]][]) {
    const image = images.find((candidate) => candidate.imagekitPath === imagekitPath);
    if (image) return { image, serviceId };
  }
  return undefined;
}

// Null as soon as the service has any of her own photos.
export function decorativeImageFor(serviceId: ServiceId): DecorativeImage | null {
  if (serviceHasWork(serviceId)) return null;
  return decorativeImages[serviceId] ?? null;
}

// Stays after her photos arrive. Skips the opening image so nothing shows twice.
export function inspirationFor(serviceId: ServiceId): DecorativeImage[] {
  const opening = decorativeImageFor(serviceId);
  return (inspirationImages[serviceId] ?? []).filter(
    (image) => image.imagekitPath !== opening?.imagekitPath,
  );
}
