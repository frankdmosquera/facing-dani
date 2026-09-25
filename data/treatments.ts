import type { Dictionary } from "@/dictionaries/en";

import type { ServiceId } from "./services";

// Prices set 2026-09-23 from Calgary research, for Dani to confirm before launch. Reasoning in the feature 5b archive.
export type TreatmentRow<S extends ServiceId> = {
  // One array per service, so a row can only use that service's own labels.
  key: keyof Dictionary["services"][S]["treatments"];
  // Whole dollars.
  priceCad: number;
  // Renders "From $5".
  from?: boolean;
  durationMinutes: number;
  order: number;
  // Done inside another appointment, so it has no Book button and no Cal.com event of its own.
  addOn?: true;
};

export type Treatments = { [S in ServiceId]: TreatmentRow<S>[] };

export const treatments: Treatments = {
  nails: [
    { key: "gelManicure", priceCad: 40, durationMinutes: 60, order: 1 },
    { key: "acrylicFullSet", priceCad: 55, from: true, durationMinutes: 120, order: 2 },
    { key: "acrylicFill", priceCad: 40, durationMinutes: 75, order: 3 },
    { key: "gelXFullSet", priceCad: 70, from: true, durationMinutes: 120, order: 4 },
    { key: "gelXFill", priceCad: 55, durationMinutes: 90, order: 5 },
    { key: "french", priceCad: 10, durationMinutes: 15, order: 6, addOn: true },
    { key: "chrome", priceCad: 15, durationMinutes: 15, order: 7, addOn: true },
    { key: "nailArt", priceCad: 5, from: true, durationMinutes: 15, order: 8, addOn: true },
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
    { key: "stripLashes", priceCad: 10, durationMinutes: 15, order: 4, addOn: true },
  ],
};

export function treatmentsFor<S extends ServiceId>(
  serviceId: S,
): TreatmentRow<S>[] {
  return [...treatments[serviceId]].sort((a, b) => a.order - b.order);
}

// The one cast: TypeScript cannot index the treatments while S is generic. TreatmentRow already checked the key.
export function treatmentLabel<S extends ServiceId>(
  t: Dictionary,
  serviceId: S,
  key: TreatmentRow<S>["key"],
): string {
  const labels = t.services[serviceId].treatments as Record<string, string>;
  return labels[key as string];
}
