import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/data/siteConfig";
import type { Dictionary } from "@/dictionaries";
import { localePath, type Locale } from "@/lib/locale";

// Her badge recoloured per theme for light mode; the original gold on black in dark mode.
const LOGOS = [
  { className: "logo-dark", src: "/logo.png" },
  { className: "logo-pop", src: "/logos/original-blush.png" },
  { className: "logo-purple", src: "/logos/original-lilac.png" },
  { className: "logo-gold", src: "/logos/original-cream.png" },
];

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
      className={`inline-flex items-center gap-2.5 font-display text-[22.5px] font-extrabold min-[900px]:text-[24px] tracking-[-0.04em] text-ink ${className ?? ""}`}
    >
      {/* Sized in em so the footer's larger text scales it. The name is inside the logo, so it is spoken, not shown. */}
      {/* One logo per theme and mode; globals.css (.logo-*) shows the one that matches <html>. Hidden ones never load. */}
      {LOGOS.map((logo) => (
        <Image
          key={logo.className}
          src={logo.src}
          alt=""
          width={96}
          height={96}
          className={`logo-img ${logo.className} size-[3em] shrink-0 rounded-full border-2 border-[color:var(--brand-ink)] shadow-[3px_3px_0_var(--shadow)] min-[900px]:size-[4em]`}
        />
      ))}
      <span className="sr-only">
        {siteConfig.business.name}, {t.a11y.homeSuffix}
      </span>
    </Link>
  );
}
