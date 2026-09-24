import type { Dictionary } from "@/dictionaries/en";

import type { ServiceId } from "./services";

// Keys, not an array of strings: a missing Spanish answer then fails the build.
export type FaqKey = keyof Dictionary["faq"];

export type FaqItem = {
  key: FaqKey;
  order: number;
  serviceId: ServiceId | null;
};

export const faq: FaqItem[] = [
  { key: "booking", order: 1, serviceId: null },
  { key: "deposit", order: 2, serviceId: null },
  { key: "payment", order: 3, serviceId: null },
  { key: "duration", order: 4, serviceId: null },
  { key: "firstVisit", order: 5, serviceId: null },
  { key: "removalAndFills", order: 6, serviceId: null },
  { key: "location", order: 7, serviceId: null },
  { key: "cancelling", order: 8, serviceId: null },
  { key: "hair", order: 9, serviceId: null },
];

export function siteWideFaq(): FaqItem[] {
  return faq
    .filter((item) => item.serviceId === null)
    .sort((a, b) => a.order - b.order);
}
