/**
 * Every business fact the site renders. A component never hardcodes one.
 *
 * The template test: a second beauty business stands up by editing this file
 * and the theme, touching no component. If a string naming this business turns
 * up in `components/`, that is a bug and not a preference.
 *
 * Nothing here is keyed by locale, and nothing here is prose. Prices,
 * durations, phone, email, hours and coordinates are shared facts; anything a
 * visitor reads as a sentence lives in `dictionaries/`. Feature 2 moved the
 * nav labels and the blurb out of this file for that reason - what is left is
 * the parts that do not translate.
 */

/**
 * Type-only import, so this never pulls a dictionary into a bundle. Client
 * components import siteConfig, and a value import here would ship both
 * languages to every visitor.
 */
import type { Dictionary } from "@/dictionaries/en";

/**
 * Keys are typed against the dictionary rather than being plain strings, so a
 * key with no matching label is a compile error.
 *
 * This is not theoretical: with `key: string` and an `as keyof` cast at the
 * lookup, three footer links shipped to production rendering as empty
 * anchors. The cast silenced the one error that would have caught it.
 */
export type NavKey = keyof Dictionary["nav"];
export type CtaKey = keyof Dictionary["cta"];
export type FooterKey = keyof Dictionary["footer"]["links"];

type Route = {
  /**
   * The route without a locale prefix. Never render this directly: pass it
   * through `localePath` so /es is owned in one place.
   *
   * Provisional English slugs. Whether the Spanish side translates
   * (`/es/unas`) or mirrors (`/es/nails`) is still open; deciding it changes
   * `lib/locale.ts` and nothing else.
   */
  href: string;
};

export type NavItem = Route & { key: NavKey };
export type CtaItem = Route & { key: CtaKey };
export type FooterItem = Route & { key: FooterKey };

export const siteConfig = {
  business: {
    /**
     * The legal name, used in the footer and in LocalBusiness structured data.
     * This must match the Google Business Profile character for character, or
     * Google reads the two as separate businesses.
     */
    name: "Dani Moreno",
    /** The tight header mark. Deliberately not derived from `name`. */
    wordmark: "dani",
    /** Rendered in the nails accent. Colour is navigation, never decoration. */
    wordmarkAccent: ".",
    city: "Calgary",
    region: "Alberta",
  },

  social: {
    /**
     * Not yet known. The footer renders the Instagram link only when this is
     * set, so an unknown handle cannot ship as a dead link. Needed before
     * feature 8 deploys, since the bio link is the site's main entry point.
     */
    instagram: null as { handle: string; url: string } | null,
  },

  /**
   * The words in the gradient marquee. The same in both languages, which is
   * why they are here and not in the dictionaries: four identical strings
   * duplicated per locale would be pretending to be a decision.
   */
  marquee: ["Nails", "Lashes", "Makeup", "Calgary"],

  nav: [
    { key: "nails", href: "/nails" },
    { key: "lashes", href: "/lashes" },
    { key: "makeup", href: "/makeup" },
    { key: "gallery", href: "/gallery" },
    { key: "about", href: "/about" },
  ] satisfies NavItem[],

  cta: { key: "book", href: "/contact" } satisfies CtaItem,

  footer: {
    services: [
      { key: "nails", href: "/nails" },
      { key: "lashes", href: "/lashes" },
      { key: "makeup", href: "/makeup" },
      { key: "gallery", href: "/gallery" },
    ] satisfies FooterItem[],
    contact: [
      { key: "bookAppointment", href: "/contact" },
      { key: "about", href: "/about" },
      { key: "faq", href: "/#faq" },
    ] satisfies FooterItem[],
  },
} as const;

export type SiteConfig = typeof siteConfig;
