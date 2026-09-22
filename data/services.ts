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

/**
 * The URL slug for a service, derived from `href` rather than written twice.
 * The `[service]` route builds its static params from these, so the slug and
 * the link a visitor clicks can never disagree.
 */
export function serviceSlug(service: Service): string {
  return service.href.replace(/^\//, "");
}

/** Narrow an arbitrary route segment to a service. Anything else is not a page. */
export function serviceBySlug(slug: string): Service | undefined {
  return services.find((service) => serviceSlug(service) === slug);
}

/** Services in display order. */
export function orderedServices(): Service[] {
  return [...services].sort((a, b) => a.order - b.order);
}
