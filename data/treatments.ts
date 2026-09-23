import type { Dictionary } from "@/dictionaries/en";

import type { ServiceId } from "./services";

/**
 * What each service costs and how long it takes.
 *
 * Shaped as one array per service rather than one flat list with a `serviceId`
 * field, because that is what makes the label relation checkable: `key` is
 * constrained to the keys of *that* service's `treatments` block, so a lash
 * price physically cannot be written with a nails label. A flat list would let
 * the two drift and only show it on the page.
 *
 * Set by Frank on 2026-09-23 from Calgary research, positioned mid-low, for Dani
 * to confirm before launch. The sources and the reasoning are in the feature 5b
 * archive. A price is a promise to a customer: change one here and it changes
 * on the page and in the structured data together, which is the point of it
 * living in exactly one place.
 *
 * A service with no rows still renders its empty state. Nothing does today, but
 * the next client from this template starts with no prices too.
 */
export type TreatmentRow<S extends ServiceId> = {
  key: keyof Dictionary["services"][S]["treatments"];
  /**
   * Whole Canadian dollars. Never cents, never a range.
   *
   * Shared rather than locale-keyed: the number is the same fact in both
   * languages, and storing it twice guarantees the two disagree one day.
   */
  priceCad: number;
  /**
   * True when the price is a starting point rather than the whole charge, so it
   * renders as "From $5". Every real Calgary salon menu needs this somewhere -
   * nail art and extra length genuinely cost more on a bigger set - so it is
   * part of the shape rather than a later retrofit.
   */
  from?: boolean;
  durationMinutes: number;
  order: number;
};

export type Treatments = { [S in ServiceId]: TreatmentRow<S>[] };

export const treatments: Treatments = {
  nails: [
    { key: "gelManicure", priceCad: 40, durationMinutes: 60, order: 1 },
    { key: "acrylicFullSet", priceCad: 55, from: true, durationMinutes: 120, order: 2 },
    { key: "acrylicFill", priceCad: 40, durationMinutes: 75, order: 3 },
    { key: "gelXFullSet", priceCad: 70, from: true, durationMinutes: 120, order: 4 },
    { key: "gelXFill", priceCad: 55, durationMinutes: 90, order: 5 },
    { key: "french", priceCad: 10, durationMinutes: 15, order: 6 },
    { key: "chrome", priceCad: 15, durationMinutes: 15, order: 7 },
    { key: "nailArt", priceCad: 5, from: true, durationMinutes: 15, order: 8 },
    { key: "removal", priceCad: 10, from: true, durationMinutes: 30, order: 9 },
  ],
  lashes: [
    { key: "classicFullSet", priceCad: 110, durationMinutes: 105, order: 1 },
    { key: "hybridFullSet", priceCad: 130, durationMinutes: 120, order: 2 },
    { key: "volumeFullSet", priceCad: 150, durationMinutes: 135, order: 3 },
    { key: "fill", priceCad: 65, from: true, durationMinutes: 60, order: 4 },
    { key: "removal", priceCad: 20, durationMinutes: 30, order: 5 },
  ],
  makeup: [
    { key: "softGlam", priceCad: 75, durationMinutes: 60, order: 1 },
    { key: "fullGlam", priceCad: 95, durationMinutes: 75, order: 2 },
    { key: "bridalParty", priceCad: 85, durationMinutes: 60, order: 3 },
    { key: "stripLashes", priceCad: 10, durationMinutes: 10, order: 4 },
  ],
};

/** That service's rows, in display order. */
export function treatmentsFor<S extends ServiceId>(
  serviceId: S,
): TreatmentRow<S>[] {
  return [...treatments[serviceId]].sort((a, b) => a.order - b.order);
}

/**
 * The label for a row, in one place, because the lookup needs a cast and it
 * should need it exactly once.
 *
 * TypeScript cannot index `Dictionary["services"][S]["treatments"]` while `S`
 * is still generic - it reports `cannot be used to index type '{} | {} | {}'` -
 * even though every concrete call is provably safe.
 *
 * **This does not weaken the guarantee that matters.** That guarantee lives at
 * the authoring site: `TreatmentRow<S>` constrains `key` to that service's own
 * labels, so a nails row still cannot be written with a lashes key, and a row
 * whose label does not exist is still a compile error. This function only reads
 * back a value the type system already proved was there.
 */
export function treatmentLabel<S extends ServiceId>(
  t: Dictionary,
  serviceId: S,
  key: TreatmentRow<S>["key"],
): string {
  const labels = t.services[serviceId].treatments as Record<string, string>;
  return labels[key as string];
}
