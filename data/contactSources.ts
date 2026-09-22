import type { Dictionary } from "@/dictionaries/en";

/**
 * How did you find me.
 *
 * This is the whole measurement apparatus for the site. There is no analytics
 * script and no cookie banner, so what a visitor picks here plus Search Console
 * is the only evidence that any of this worked.
 *
 * Fixed keys rather than a text box, because the field exists to be counted and
 * text answers cannot be: "insta", "Instagram" and "my cousin showed me" are
 * three rows nobody can add up. The cost is the specific referral, which is why
 * `other` exists rather than a shrug.
 *
 * Keyed against the dictionary like `faq.ts` and `gallery.ts`, so an option with
 * no Spanish label is a compile error rather than a blank line in a select.
 */
export type ContactSourceKey = keyof Dictionary["contact"]["sources"];

export const contactSourceKeys = [
  "instagram",
  "google",
  "friend",
  "returning",
  "other",
] as const satisfies readonly ContactSourceKey[];
