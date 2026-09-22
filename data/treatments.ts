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
 * Empty until Dani sets her prices. Market research on 2026-09-21 produced a
 * proposed list positioned mid-low against Calgary rates, but a price is a
 * promise to a customer and hers are hers to set, so nothing goes in here until
 * she has said yes to it. A service with no rows renders its empty state.
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
  nails: [],
  lashes: [],
  makeup: [],
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
