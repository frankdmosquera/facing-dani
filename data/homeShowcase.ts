import type { GalleryKey } from "./gallery";

// The home "work" section, in display order. All three services: her photos, plus stock tagged "Inspiration".
export type ShowcaseItem =
  | { work: GalleryKey }
  | { inspiration: string };

export const HOME_SHOWCASE: ShowcaseItem[] = [
  { work: "blueFrenchFloral" },
  { work: "blueGraphicEyeProfile" },
  { work: "lilacSquare" },
  { inspiration: "/decorative/lashes/inspiration/volume-lash-set-close-up.jpg" },
  { work: "whiteGlitterSquare" },
  { inspiration: "/decorative/makeup/inspiration/orange-pink-graphic-shadow.jpg" },
  { work: "pastelFrenchTips" },
  { work: "softNaturalLookFront" },
  { work: "pinkFloralArt" },
  { inspiration: "/decorative/makeup/inspiration/pink-graphic-liner.jpg" },
  { work: "heartsFrench" },
  { work: "blueGraphicEyeTurned" },
  { work: "pinkFrenchCrystals" },
  { inspiration: "/decorative/lashes/inspiration/lash-spoolie-brush.jpg" },
  { work: "softNaturalLookSide" },
  { inspiration: "/decorative/makeup/inspiration/brown-cut-crease.jpg" },
  { work: "colourSwatchArm" },
  { inspiration: "/decorative/makeup/inspiration/coral-shadow-brush.jpg" },
];
