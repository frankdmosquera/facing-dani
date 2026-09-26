import type { GalleryKey } from "./gallery";

// The home "work" section, in display order. Her photos only: nails first, then her makeup. No stock on home.
export type ShowcaseItem =
  | { work: GalleryKey }
  | { inspiration: string };

// Leaves out the hero's and the nails teaser's photos, which sit just above.
export const HOME_SHOWCASE: ShowcaseItem[] = [
  { work: "blueFrenchFloral" },
  { work: "lilacSquare" },
  { work: "whiteGlitterSquare" },
  { work: "burgundyCatEye" },
  { work: "pastelFrenchTips" },
  { work: "pinkFloralArt" },
  { work: "heartsFrench" },
  { work: "peachFrenchGems" },
  { work: "pinkFrenchCrystals" },
  { work: "almondBowFrench" },
  { work: "clearCoffinLinework" },
  { work: "palePinkGloss" },
  { work: "blueGraphicEyeProfile" },
  { work: "softNaturalLookFront" },
  { work: "blueGraphicEyeTurned" },
  { work: "colourSwatchArm" },
];
