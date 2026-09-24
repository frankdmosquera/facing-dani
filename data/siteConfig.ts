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

export type NavItem = Route & { key: NavKey };
export type CtaItem = Route & { key: CtaKey };
export type FooterItem = Route & { key: FooterKey };

export const siteConfig = {
  business: {
    // Must match the Google Business Profile exactly, or Google treats them as two businesses.
    name: "Dani Moreno",
    wordmark: "dani",
    wordmarkAccent: ".",
    city: "Calgary",

    // Placeholder: the agency's inbox, not hers. Every enquiry lands here until this changes.
    email: "frankdmosquera@gmail.com",
    region: "Alberta",
  },

  social: {
    // Every Instagram link and line on the site stays hidden while this is null.
    instagram: null as { handle: string; url: string } | null,
  },

  // Same in both languages.
  marquee: ["Nails", "Lashes", "Makeup", "Calgary"],

  nav: [
    { key: "home", href: "/" },
    { key: "nails", href: "/nails" },
    { key: "lashes", href: "/lashes" },
    { key: "makeup", href: "/makeup" },
    { key: "gallery", href: "/gallery" },
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
        { key: "faq", href: "/#faq" },
    ] satisfies FooterItem[],
  },
} as const;

export type SiteConfig = typeof siteConfig;
