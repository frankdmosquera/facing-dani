import type { Dictionary } from "@/dictionaries/en";

// `id` is also the accent colour key: pink is nails everywhere.
export type ServiceId = keyof Dictionary["services"];

export type Service = {
  id: ServiceId;
  order: number;
  href: string;
};

export const services: Service[] = [
  { id: "nails", order: 1, href: "/nails" },
  { id: "lashes", order: 2, href: "/lashes" },
  { id: "makeup", order: 3, href: "/makeup" },
];

// Derived from href, so the [service] route and the nav links cannot disagree.
export function serviceSlug(service: Service): string {
  return service.href.replace(/^\//, "");
}

export function serviceBySlug(slug: string): Service | undefined {
  return services.find((service) => serviceSlug(service) === slug);
}

export function orderedServices(): Service[] {
  return [...services].sort((a, b) => a.order - b.order);
}
