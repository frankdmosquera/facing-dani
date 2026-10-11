// Every business fact the site renders. No component hardcodes one. Sentences live in dictionaries/.

// Type-only: client components import siteConfig, and a value import would ship both dictionaries.
import type { Dictionary } from "@/dictionaries/en";

// Typed against the dictionary, never plain strings: a cast here once shipped empty footer links.
export type NavKey = keyof Dictionary["nav"];
export type CtaKey = keyof Dictionary["cta"];
export type FooterKey = keyof Dictionary["footer"]["links"];

type Route = {
  // No locale prefix. Always render through localePath.
  href: string;
};

// mobileOnly: left out of the desktop header, still in the phone menu. inMore: in the header's "More" drawer, flat on phones.
export type NavItem = Route & { key: NavKey; mobileOnly?: true; inMore?: true };
// No href: every Book button goes through lib/bookingConfig.
export type CtaItem = { key: CtaKey };
export type FooterItem = Route & { key: FooterKey };

export const siteConfig = {
  business: {
    // Must match the Google Business Profile exactly, or Google treats them as two businesses.
    name: "Glammed Beauty Studio",
    // The person: Person data and her sign-off under the story. First name only: she is 17 and her full name is unconfirmed.
    ownerName: "Dani",
    wordmarkAccent: ".",
    city: "Calgary",
    // The canonical host. Bare glammedbeautystudio.com redirects here.
    website: "https://www.glammedbeautystudio.com",

    // Forwards to her Gmail through ImprovMX; the form sends here through Resend.
    email: "dani@glammedbeautystudio.com",
    region: "Alberta",
  },

  social: {
    // Every Instagram link and line on the site stays hidden while this is null.
    instagram: null as { handle: string; url: string } | null,
  },

  // Which colour scheme the site wears. The header button switches it between dark and light.
  theme: "pop" as "pop" | "purple" | "gold",

  // Which hero design each page wears (components/site/HeroVariants). The options panel overrides it in dev.
  hero: { home: "c", parties: "e" } as { home: "b" | "c" | "d"; parties: "e" | "f" },

  // Sections switched off (false) or decorations switched on (true), by Optional id. Unset means its default.
  sections: {} as Record<string, boolean>,

  // A band's background photo by BackdropChoice id: a gallery key, faded or dark, and how strong. Unset means no photo.
  backdrops: {} as Record<
    string,
    { photo: string; effect?: "faded" | "dark"; strength?: "faintest" | "faint" | "light" | "medium" | "stronger" }
  >,

  nav: [
    // Home is the nails page, so the link says Nails.
    { key: "nails", href: "/" },
    { key: "parties", href: "/parties" },
    { key: "store", href: "/store" },
    // Kept on phones until it is decided whether these pages stay. Never delete them uninvited.
    { key: "lashes", href: "/lashes", mobileOnly: true },
    { key: "makeup", href: "/makeup", mobileOnly: true },
    { key: "gallery", href: "/gallery", inMore: true },
    { key: "faq", href: "/faq", inMore: true },
    { key: "contact", href: "/contact", inMore: true },
  ] satisfies NavItem[],

  cta: { key: "book" } satisfies CtaItem,

  footer: {
    services: [
      { key: "nails", href: "/" },
      { key: "parties", href: "/parties" },
      { key: "store", href: "/store" },
      { key: "lashes", href: "/lashes" },
      { key: "makeup", href: "/makeup" },
    ] satisfies FooterItem[],
    contact: [
        { key: "contact", href: "/contact" },
      { key: "faq", href: "/faq" },
    ] satisfies FooterItem[],
  },
} as const;

export type SiteConfig = typeof siteConfig;
