/**
 * Every business fact the site renders. A component never hardcodes one.
 *
 * The template test: a second beauty business stands up by editing this file
 * and the theme, touching no component. If a string naming this business turns
 * up in `components/`, that is a bug and not a preference.
 *
 * Nothing here is keyed by locale. Prices, durations, phone, email, hours and
 * coordinates are shared; prose is what gets a dictionary, and that arrives
 * with the `[locale]` segment in feature 2. Nav items already carry a stable
 * `key` so feature 2 swaps `label` for a lookup without reopening a component.
 */

export type NavItem = {
  /** Stable across locales. Feature 2 keys the dictionary off this. */
  key: string;
  /** English for now. Feature 2 replaces this with a dictionary lookup. */
  label: string;
  /**
   * Provisional English route. The slugs are not settled, and whether the
   * Spanish side translates (`/es/unas`) or mirrors (`/es/nails`) is still
   * open - see `blueprint/context/current-feature.md`. They live here rather
   * than in components so deciding is a one-file change.
   */
  href: string;
};

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
    blurb:
      "Nails, lashes and makeup in Calgary. Trained in Colombia. By appointment.",
  },

  social: {
    /**
     * Not yet known. The footer renders the Instagram link only when this is
     * set, so an unknown handle cannot ship as a dead link. Needed before
     * feature 8 deploys, since the bio link is the site's main entry point.
     */
    instagram: null as { handle: string; url: string } | null,
  },

  /** The words in the gradient marquee above the header. */
  marquee: ["Nails", "Lashes", "Makeup", "Calgary"],

  meta: {
    titleDefault: "Dani Moreno - Nails, Lashes and Makeup in Calgary",
    titleTemplate: "%s - Dani Moreno",
    description:
      "Nail, lash and makeup artistry in Calgary, trained in Colombia. Shape, structure and cuticle work that still looks good in week three. Se habla espanol.",
  },

  nav: [
    { key: "nails", label: "Nails", href: "/nails" },
    { key: "lashes", label: "Lashes", href: "/lashes" },
    { key: "makeup", label: "Makeup", href: "/makeup" },
    { key: "gallery", label: "The work", href: "/gallery" },
    { key: "about", label: "About", href: "/about" },
  ] satisfies NavItem[],

  cta: { key: "book", label: "Book now", href: "/contact" } satisfies NavItem,

  footer: {
    services: [
      { key: "nails", label: "Nails", href: "/nails" },
      { key: "lashes", label: "Lashes", href: "/lashes" },
      { key: "makeup", label: "Makeup", href: "/makeup" },
      { key: "gallery", label: "The gallery", href: "/gallery" },
    ] satisfies NavItem[],
    contact: [
      { key: "book", label: "Book an appointment", href: "/contact" },
      { key: "about", label: "About", href: "/about" },
      { key: "faq", label: "FAQ", href: "/#faq" },
    ] satisfies NavItem[],
  },
} as const;

export type SiteConfig = typeof siteConfig;
