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
  // Null until a stock photo is picked; the card shows an empty well, never a made-up picture.
  image: { imagekitPath: string; width: number; height: number } | null;
};

// Prices set by Frank on 2026-09-25 from Calgary norms, for Dani to confirm. Sold in person, no cart.
export const storeProducts: StoreProduct[] = [
  { key: "readyPressOns", category: "pressOns", priceCad: 25, order: 1, image: null },
  { key: "customPressOns", category: "pressOns", priceCad: 40, from: true, order: 2, image: null },
  { key: "cuticleOilPen", category: "nailCare", priceCad: 10, order: 3, image: null },
  { key: "cuticleOilBottle", category: "nailCare", priceCad: 14, order: 4, image: null },
  { key: "glassFile", category: "nailCare", priceCad: 10, order: 5, image: null },
  { key: "careKit", category: "nailCare", priceCad: 28, order: 6, image: null },
];

export function orderedStoreProducts(): StoreProduct[] {
  return [...storeProducts].sort((a, b) => a.order - b.order);
}
