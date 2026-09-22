/**
 * Price and duration rendering. Both are shared facts, so both format the same
 * way in either language.
 */

/**
 * Whole Canadian dollars, symbol first: `$65`.
 *
 * Deliberately not `Intl.NumberFormat` keyed to the page locale. Spanish
 * convention puts the symbol after the number - `65 $` - which is wrong on a
 * Canadian price list that a bilingual visitor will compare against the English
 * page. The overview locks price as shared rather than locale-keyed for exactly
 * that reason, and the rendering has to follow the data.
 *
 * No cents. Salon prices are whole dollars, and `priceCad` is typed as such.
 */
export function formatPrice(priceCad: number): string {
  return `$${Math.round(priceCad)}`;
}

/**
 * `45 min`, `1 h`, `1 h 30 min`.
 *
 * No locale strings needed: `h` and `min` are the same abbreviation in English
 * and Spanish, which is the whole reason this lives in one place instead of the
 * dictionaries.
 */
export function formatDuration(durationMinutes: number): string {
  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;

  if (hours === 0) return `${minutes} min`;
  if (minutes === 0) return `${hours} h`;
  return `${hours} h ${minutes} min`;
}
