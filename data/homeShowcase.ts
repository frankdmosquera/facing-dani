import type { GalleryKey } from "./gallery";

// The home "work" section, in display order: eight square tiles, six nail sets then two of her makeup. No stock on home.
export type ShowcaseItem =
  | { work: GalleryKey }
  | { inspiration: string };

// Leaves out the hero's and the nails teaser's photos, which sit just above.
export const HOME_SHOWCASE: ShowcaseItem[] = [
  { work: "blueFrenchFloral" },
  { work: "burgundyCatEye" },
  { work: "whiteGlitterSquare" },
  { work: "pinkFloralArt" },
  { work: "lilacSquare" },
  { work: "heartsFrench" },
  { work: "blueGraphicEyeProfile" },
  { work: "softNaturalLookFront" },
];
