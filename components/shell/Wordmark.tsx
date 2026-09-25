import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/data/siteConfig";
import type { Dictionary } from "@/dictionaries";
import { localePath, type Locale } from "@/lib/locale";

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
      className={`inline-flex items-center gap-2.5 font-display text-[19px] font-extrabold tracking-[-0.04em] text-ink ${className ?? ""}`}
    >
      {/* Sized in em so the footer's larger text scales the logo with it. */}
      <Image
        src="/logo.png"
        alt=""
        width={96}
        height={96}
        priority
        className="size-[2.1em] shrink-0 rounded-full"
      />
      <span>
        {siteConfig.business.wordmark}
        <span className="text-nails">{siteConfig.business.wordmarkAccent}</span>
      </span>
      <span className="sr-only">
        {" "}
        - {siteConfig.business.name}, {t.a11y.homeSuffix}
      </span>
    </Link>
  );
}
