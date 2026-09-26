import type { Dictionary } from "@/dictionaries/en";

export type StoreCategory = keyof Dictionary["store"]["categories"];
export type StoreProductKey = keyof Dictionary["store"]["products"];

export type StoreProduct = {
  key: StoreProductKey;
  category: StoreCategory;
  // Whole dollars.
  priceCad: number;
  // Renders "From $40".
  from?: true;
  order: number;
  // Stock until Dani shoots her own, and tagged as stock on the card. Null shows an empty well.
  image: {
    imagekitPath: string;
    width: number;
    height: number;
    // Never rendered. Proves the licence if anyone asks.
    source: string;
    photographer: string;
    licence: "pexels";
  } | null;
};

// Prices set by Frank on 2026-09-25 from Calgary norms, for Dani to confirm. Sold in person, no cart.
export const storeProducts: StoreProduct[] = [
  { key: "readyPressOns", category: "pressOns", priceCad: 25, order: 1, image: { imagekitPath: "/store/ready-made-press-on-set.jpg", width: 1600, height: 2401, source: "https://www.pexels.com/photo/8476207/", photographer: "Aug17th. studio", licence: "pexels" } },
  { key: "customPressOns", category: "pressOns", priceCad: 40, from: true, order: 2, image: { imagekitPath: "/store/custom-press-on-swatches.jpg", width: 1600, height: 2400, source: "https://www.pexels.com/photo/11842624/", photographer: "H&CO", licence: "pexels" } },
  { key: "cuticleOilPen", category: "nailCare", priceCad: 10, order: 3, image: { imagekitPath: "/store/cuticle-oil-pens.jpg", width: 1600, height: 1067, source: "https://www.pexels.com/photo/6707558/", photographer: "Mikhail Nilov", licence: "pexels" } },
  { key: "cuticleOilBottle", category: "nailCare", priceCad: 14, order: 4, image: { imagekitPath: "/store/cuticle-oil-bottle.jpg", width: 1600, height: 1067, source: "https://www.pexels.com/photo/12684643/", photographer: "Laurissa Booyse", licence: "pexels" } },
  { key: "glassFile", category: "nailCare", priceCad: 10, order: 5, image: { imagekitPath: "/store/glass-nail-file.jpg", width: 1600, height: 2400, source: "https://www.pexels.com/photo/5238088/", photographer: "Kaboompics", licence: "pexels" } },
  { key: "careKit", category: "nailCare", priceCad: 28, order: 6, image: { imagekitPath: "/store/nail-care-kit.jpg", width: 1600, height: 2400, source: "https://www.pexels.com/photo/11966580/", photographer: "Надежда Скорупич", licence: "pexels" } },
];

export function orderedStoreProducts(): StoreProduct[] {
  return [...storeProducts].sort((a, b) => a.order - b.order);
}
