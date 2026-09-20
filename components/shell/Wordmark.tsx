import Link from "next/link";

import { siteConfig } from "@/data/siteConfig";
import type { Dictionary } from "@/dictionaries";
import { localePath, type Locale } from "@/lib/locale";

/**
 * The header and footer mark. Deliberately not the business name: the mark is
 * tight, the name is what has to match the Google Business Profile exactly.
 */
export function Wordmark({
  locale,
  t,
  className,
}: {
  locale: Locale;
  t: Dictionary;
  className?: string;
}) {
  return (
    <Link
      href={localePath(locale, "/")}
      className={`font-display text-[19px] font-extrabold tracking-[-0.04em] text-ink ${className ?? ""}`}
    >
      {siteConfig.business.wordmark}
      <span className="text-nails">{siteConfig.business.wordmarkAccent}</span>
      <span className="sr-only">
        {" "}
        - {siteConfig.business.name}, {t.a11y.homeSuffix}
      </span>
    </Link>
  );
}
