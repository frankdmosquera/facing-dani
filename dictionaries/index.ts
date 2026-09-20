import type { Locale } from "@/lib/locale";

import { en, type Dictionary } from "./en";
import { es } from "./es";

const dictionaries: Record<Locale, Dictionary> = { en, es };

/**
 * Synchronous on purpose. Both dictionaries are small and static, so there is
 * nothing to await and no reason to make every caller a promise.
 */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
