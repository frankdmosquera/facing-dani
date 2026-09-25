import Link from "next/link";

import { siteConfig } from "@/data/siteConfig";
import type { Dictionary } from "@/dictionaries";
import { bookingHref, bookingTrigger } from "@/lib/bookingConfig";
import { localePath, type Locale } from "@/lib/locale";

import { HeaderScrollHider } from "./HeaderScrollHider";
import { LanguageSwitch } from "./LanguageSwitch";
import { MobileNav } from "./MobileNav";
import { Wordmark } from "./Wordmark";

export function SiteHeader({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <HeaderScrollHider>
      {/* Blur on a separate layer, never on the header: backdrop-filter traps MobileNav's fixed panel inside it. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[color-mix(in_srgb,var(--ground)_88%,transparent)] backdrop-blur-[12px]"
      />

      {/* Three columns, not justify-between: the logo and the right group differ in width, which pushed the links 45px off centre. */}
      <div className="relative mx-auto grid max-w-[81rem] grid-cols-[1fr_auto_1fr] items-center gap-6 px-[var(--gutter)] py-3.5">
        <Wordmark locale={locale} t={t} className="justify-self-start" />

        <nav
          aria-label={t.a11y.mainNav}
          className="hidden items-center gap-[30px] min-[900px]:flex"
        >
          {siteConfig.nav.map((item) => (
            <Link
              key={item.key}
              href={localePath(locale, item.href)}
              className="text-[14.5px] font-medium text-ink-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {t.nav[item.key]}
            </Link>
          ))}
        </nav>

        <div className="col-start-3 flex items-center gap-5 justify-self-end">
          {/* Padding grows the tap target to about 44px without moving anything. */}
          <LanguageSwitch locale={locale} t={t} className="-mx-2 px-2 py-3" />

          <a
            href={bookingHref()}
            {...bookingTrigger()}
            className="hidden hover-glow rounded-pill bg-[image:var(--hot)] px-[22px] py-[11px] text-[14px] font-bold text-on-hot focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring min-[900px]:inline-block"
          >
            {t.cta.book}
          </a>

          <MobileNav locale={locale} t={t} />
        </div>
      </div>
    </HeaderScrollHider>
  );
}
