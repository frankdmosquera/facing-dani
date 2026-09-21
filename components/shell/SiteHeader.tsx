import Link from "next/link";

import { siteConfig } from "@/data/siteConfig";
import type { Dictionary } from "@/dictionaries";
import { localePath, type Locale } from "@/lib/locale";

import { LanguageSwitch } from "./LanguageSwitch";
import { MobileNav } from "./MobileNav";
import { Wordmark } from "./Wordmark";

/**
 * Sticky, translucent over the plum ground. Server-rendered apart from the
 * burger and the language switch, which are the only two pieces that need the
 * client.
 *
 * The 900px breakpoint is the mockup's, not a Tailwind default, so it is
 * written out rather than rounded to `lg`.
 */
export function SiteHeader({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <header className="sticky top-0 z-40 border-b border-line-soft">
      {/* The frosted ground is a layer inside the header, not the header
          itself. A backdrop-filter makes its element the containing block for
          every position:fixed descendant, and MobileNav's panel is one: on the
          header it resolved inset-0 against a 64px box instead of the viewport,
          so the menu opened invisibly. pointer-events-none because an
          invisible click-blocker over the wordmark and the CTA is a worse bug
          than the one being fixed. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[color-mix(in_srgb,var(--ground)_88%,transparent)] backdrop-blur-[12px]"
      />

      {/* relative so it paints above that layer. Safe for the panel: position
          alone never traps a fixed descendant, only transform, filter,
          backdrop-filter, perspective, contain and will-change do. */}
      <div className="relative mx-auto flex max-w-[var(--site)] items-center justify-between gap-6 px-[var(--gutter)] py-3.5">
        <Wordmark locale={locale} t={t} />

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

        <div className="flex items-center gap-5">
          {/* Visible at every width, and deliberately not inside the menu.
              It is a setting, not a destination, and on the English page it is
              the one thing that tells a Spanish-speaking visitor she can use
              this site in her own language. Behind a burger she has to go
              looking for it. */}
          {/* -mx-2 px-2 py-3 grows the tap target to roughly 44px without
              moving anything: it is a thumb target on a phone now, not a line
              of text at the bottom of a menu. */}
          <LanguageSwitch locale={locale} t={t} className="-mx-2 px-2 py-3" />

          <Link
            href={localePath(locale, siteConfig.cta.href)}
            className="hidden rounded-pill bg-[image:var(--hot)] px-[22px] py-[11px] text-[14px] font-bold text-on-hot focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring min-[900px]:inline-block"
          >
            {t.cta.book}
          </Link>

          <MobileNav locale={locale} t={t} />
        </div>
      </div>
    </header>
  );
}
