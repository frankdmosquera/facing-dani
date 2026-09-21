import type { Dictionary } from "@/dictionaries/en";

import type { ServiceId } from "./services";

/**
 * The FAQ, as keys and ordering. The questions and answers live in the
 * dictionaries, because they are prose.
 *
 * Keyed rather than an array of strings on purpose: an array would slip past
 * the missing-translation build error, since array length is not type-checked.
 * A Spanish list with four entries instead of five would compile and ship.
 *
 * `serviceId` is `null` for all five today. It exists now because item 5 may
 * add per-service questions, and the structured data should not need
 * reshaping when it does.
 */
export type FaqKey = keyof Dictionary["faq"];

export type FaqItem = {
  key: FaqKey;
  order: number;
  serviceId: ServiceId | null;
};

export const faq: FaqItem[] = [
  { key: "booking", order: 1, serviceId: null },
  { key: "duration", order: 2, serviceId: null },
  { key: "location", order: 3, serviceId: null },
  { key: "cancelling", order: 4, serviceId: null },
  { key: "hair", order: 5, serviceId: null },
];

/** Site-wide questions, in order. Item 5 will filter by `serviceId`. */
export function siteWideFaq(): FaqItem[] {
  return faq
    .filter((item) => item.serviceId === null)
    .sort((a, b) => a.order - b.order);
}
