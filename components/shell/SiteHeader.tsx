import Link from "next/link";

import { siteConfig } from "@/data/siteConfig";

import { MobileNav } from "./MobileNav";
import { Wordmark } from "./Wordmark";

/**
 * Sticky, translucent over the plum ground. Server-rendered apart from the
 * burger, which owns the only state in the shell.
 *
 * The 900px breakpoint is the mockup's, not a Tailwind default, so it is
 * written out rather than rounded to `lg`.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line-soft bg-[color-mix(in_srgb,var(--ground)_88%,transparent)] backdrop-blur-[12px]">
      <div className="mx-auto flex max-w-[var(--site)] items-center justify-between gap-6 px-[var(--gutter)] py-3.5">
        <Wordmark />

        <nav
          aria-label="Main"
          className="hidden items-center gap-[30px] min-[900px]:flex"
        >
          {siteConfig.nav.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="text-[14.5px] font-medium text-ink-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href={siteConfig.cta.href}
          className="hidden rounded-pill bg-[image:var(--hot)] px-[22px] py-[11px] text-[14px] font-bold text-on-hot focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring min-[900px]:inline-block"
        >
          {siteConfig.cta.label}
        </Link>

        <MobileNav
          items={siteConfig.nav}
          cta={siteConfig.cta}
          label={siteConfig.business.name}
        />
      </div>
    </header>
  );
}
