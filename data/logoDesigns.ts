// The six logo redraws from 2026-09-25, previewed on /logos. F is the one chosen for the site.

export type Foil = keyof typeof foils;

// Light bands between the colours give the printed-foil look of her original gold logo.
export const foils = {
  rose: ["#f6c7b9", "#fff1ea", "#d98c93", "#f5b9ab", "#a95a6b"],
  roseD: ["#d9848f", "#f7d3cb", "#a8506a", "#d8858f", "#7c3450"],
  hot: ["#ff8fbf", "#ffe3ee", "#ff3d8f", "#ffb07a", "#e0592a"],
  pink: ["#ff7fb3", "#ffe0ec", "#ff3d8f", "#ff9cc6", "#c41f69"],
  lilac: ["#cdb4ff", "#f6f0ff", "#a97bff", "#dccbff", "#6f43cf"],
  peach: ["#ffc79e", "#fff2e8", "#ff8a3d", "#ffc08c", "#c55a1c"],
  flatPink: ["#ff3d8f", "#ff9cc8"],
  flatLilac: ["#8a55f0", "#cdb4ff"],
  flatPeach: ["#ff7a2a", "#ffc18f"],
  blushRing: ["#ff3d8f", "#ff8a3d"],
  lavRing: ["#a97bff", "#ff3d8f"],
  lavGb: ["#8a55f0", "#ff3d8f"],
  pearlRing: ["#a97bff", "#ff8a3d"],
} as const;

export type LogoDesign = {
  id: string;
  name: string;
  note: string;
  bg: readonly [string, string];
  ring: Foil;
  gb: Foil;
  // A colour, or a foil drawn as a gradient.
  title: string | { foil: Foil };
  sub: string;
  body: string;
  star: string;
  trail?: string;
  wings: readonly [Foil, Foil, Foil];
  // Round 1 has rounder wings with a highlight; round 2 has pointed foil wings.
  wingStyle: "round" | "pointed";
};

export const logoDesigns: readonly LogoDesign[] = [
  {
    id: "d",
    name: "D - Rose gold on plum",
    note: "Closest to the original, in plum and rose gold",
    bg: ["#4d2c62", "#1d1128"],
    ring: "rose",
    gb: "rose",
    title: { foil: "rose" },
    sub: "#ecc9cc",
    body: "#f7d9d0",
    star: "#ffe3ea",
    trail: "#f6c7b9",
    wings: ["pink", "lilac", "peach"],
    wingStyle: "pointed",
  },
  {
    id: "e",
    name: "E - Champagne",
    note: "Light nude card, rose-gold foil, deep plum lettering",
    bg: ["#fcf3ee", "#ead0c6"],
    ring: "roseD",
    gb: "roseD",
    title: "#2e1a3a",
    sub: "#7a5a6e",
    body: "#3a2140",
    star: "#c57886",
    trail: "#c57886",
    wings: ["pink", "lilac", "peach"],
    wingStyle: "pointed",
  },
  {
    id: "f",
    name: "F - Night foil (chosen)",
    note: "The site's purple, with the Book button's pink-to-orange as foil",
    bg: ["#3d2f57", "#17111f"],
    ring: "hot",
    gb: "hot",
    title: "#f6f2fa",
    sub: "#d8cce6",
    body: "#ffe8f0",
    star: "#ffd6e6",
    trail: "#ff9cc6",
    wings: ["pink", "lilac", "peach"],
    wingStyle: "pointed",
  },
  {
    id: "a",
    name: "A - Blush",
    note: "Soft pink card, pink-to-orange ring and GB",
    bg: ["#fff6fa", "#f9d8ea"],
    ring: "blushRing",
    gb: "blushRing",
    title: "#2e2440",
    sub: "#6b5a80",
    body: "#2e2440",
    star: "#ff3d8f",
    wings: ["flatPink", "flatLilac", "flatPeach"],
    wingStyle: "round",
  },
  {
    id: "b",
    name: "B - Lavender",
    note: "Lilac card, purple-to-pink ring and GB",
    bg: ["#faf6ff", "#dccbff"],
    ring: "lavRing",
    gb: "lavGb",
    title: "#261f36",
    sub: "#5d4d78",
    body: "#261f36",
    star: "#a97bff",
    wings: ["flatPink", "flatLilac", "flatPeach"],
    wingStyle: "round",
  },
  {
    id: "c",
    name: "C - Pearl",
    note: "Warm cream card, ring through all three service colours",
    bg: ["#fffbf6", "#fbe6d8"],
    ring: "pearlRing",
    gb: "blushRing",
    title: "#261f36",
    sub: "#6b5a80",
    body: "#261f36",
    star: "#ff8a3d",
    wings: ["flatPink", "flatLilac", "flatPeach"],
    wingStyle: "round",
  },
];

// Her own logo, recoloured by hand from public/logo.png: the black swapped for a light ground, the gold shaded to suit it.
export type OriginalVariant = { id: string; name: string; note: string; src: string };

export const originalVariants: readonly OriginalVariant[] = [
  { id: "orig-cream", name: "Original - cream", note: "Her logo as it is, gold on cream", src: "/logos/original-cream.png" },
  { id: "orig-blush", name: "Original - blush", note: "Her logo in rose gold on blush", src: "/logos/original-blush.png" },
  { id: "orig-lilac", name: "Original - lilac", note: "Her logo in purple on lilac, to match the site", src: "/logos/original-lilac.png" },
];

export function findOriginalVariant(id: string | null): OriginalVariant | undefined {
  return originalVariants.find((variant) => variant.id === id);
}

export function findLogoDesign(id: string | null): LogoDesign | undefined {
  return logoDesigns.find((design) => design.id === id);
}
