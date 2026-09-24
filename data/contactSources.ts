import type { Dictionary } from "@/dictionaries/en";

// "How did you find me". The site's only attribution, so fixed options that can be counted, not free text.
export type ContactSourceKey = keyof Dictionary["contact"]["sources"];

export const contactSourceKeys = [
  "instagram",
  "google",
  "friend",
  "returning",
  "other",
] as const satisfies readonly ContactSourceKey[];
