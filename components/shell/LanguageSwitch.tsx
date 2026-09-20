"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { Dictionary } from "@/dictionaries";
import {
  localePath,
  locales,
  stripLocale,
  type Locale,
} from "@/lib/locale";

/**
 * Swaps language on the current page, not back to the home page. From
 * /es/nails it goes to /nails and back, which is the difference between a
 * language switch and a link to the other homepage.
 *
 * Client only because it needs the current path. It is a real link, not a
 * button that pushes, so it is crawlable, middle-clickable, and works with
 * JavaScript off.
 *
 * The current locale comes in as a prop rather than being parsed out of the
 * pathname: under the root rewrite the browser shows "/" while the rendered
 * route is "/en", and the prop is the one that is always right.
 */
export function LanguageSwitch({
  locale,
  t,
  className,
}: {
  locale: Locale;
  t: Dictionary;
  className?: string;
}) {
  const pathname = usePathname();
  const other = locales.find((candidate) => candidate !== locale) ?? locale;
  const href = localePath(other, stripLocale(pathname ?? "/"));

  return (
    <Link
      href={href}
      hrefLang={other}
      lang={other}
      aria-label={t.languageSwitch.label}
      className={`text-[14.5px] font-medium text-ink-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${className ?? ""}`}
    >
      {t.languageSwitch.to}
    </Link>
  );
}
