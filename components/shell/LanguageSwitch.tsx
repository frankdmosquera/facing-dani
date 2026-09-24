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

// Same page in the other language: /es/nails <-> /nails.
// locale comes as a prop because the pathname cannot be trusted under the root rewrite.
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
