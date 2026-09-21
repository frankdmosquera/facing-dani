import type { Dictionary } from "@/dictionaries/en";

/**
 * The three services, as ids. Item 5 extends each entry with treatments,
 * prices and durations; it does not start a second list.
 *
 * `id` doubles as the accent token key, which is what keeps pink meaning nails
 * on every page. Colour is navigation here, not decoration.
 *
 * Typed against the dictionary, so a service with no name and blurb is a
 * compile error rather than an empty card.
 */
export type ServiceId = keyof Dictionary["services"];

export type Service = {
  id: ServiceId;
  order: number;
  /** Without a locale prefix. Render through `localePath`. */
  href: string;
};

export const services: Service[] = [
  { id: "nails", order: 1, href: "/nails" },
  { id: "lashes", order: 2, href: "/lashes" },
  { id: "makeup", order: 3, href: "/makeup" },
];
