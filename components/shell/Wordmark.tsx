import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/data/siteConfig";
import type { Dictionary } from "@/dictionaries";
import { localePath, type Locale } from "@/lib/locale";

import { LogoPreview } from "@/components/logos/LogoPreview";

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
      <LogoPreview className="size-[3em] shrink-0 min-[900px]:size-[4em]">
        <Image
          src="/logo.png"
          alt=""
          width={96}
          height={96}
          priority
          className="size-[3em] shrink-0 rounded-full min-[900px]:size-[4em]"
        />
      </LogoPreview>
      <span className="sr-only">
        {siteConfig.business.name}, {t.a11y.homeSuffix}
      </span>
    </Link>
  );
}
