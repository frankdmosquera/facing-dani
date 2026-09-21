import Link from "next/link";

import { siteConfig } from "@/data/siteConfig";
import type { Dictionary } from "@/dictionaries";
import { localePath, type Locale } from "@/lib/locale";

import { Band, Hot } from "./Band";

/**
 * The page the Instagram bio link lands on, above the fold.
 *
 * The mockup puts a 380px photograph beside this. There is none yet: ImageKit
 * is not configured and no work photos are in the repo, so the hero is
 * type-led until item 4. It will look thinner than the mockup, deliberately
 * rather than by omission.
 */
export function Hero({ locale, t }: { locale: Locale; t: Dictionary }) {
  const c = t.home.hero;

  return (
    <Band className="pt-[26px]!">
      <span className="font-body mb-3 block text-[11px] font-semibold tracking-[0.18em] text-ink-faint uppercase">
        {c.eyebrow}
      </span>

      <h1 className="mb-4 text-[clamp(40px,11vw,74px)]">
        {c.headingLead} <Hot>{c.headingAccent}</Hot>
      </h1>

      <p className="mb-[26px] max-w-[46ch] text-base text-ink-muted">{c.sell}</p>

      <div className="flex flex-col gap-3 min-[560px]:flex-row">
        <Link
          href={localePath(locale, siteConfig.cta.href)}
          className="rounded-pill bg-[image:var(--hot)] px-7 py-4 text-center text-[15px] font-bold text-on-hot focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {c.book}
        </Link>
        <Link
          href={localePath(locale, "/gallery")}
          className="rounded-pill border border-line px-7 py-4 text-center text-[15px] font-bold text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {c.seeWork}
        </Link>
      </div>

      {/* Prose, not a link: the Instagram handle is still unknown, and a dead
          link is worse than a sentence. It becomes a link when the handle
          lands in siteConfig. */}
      <p className="mt-4 text-[13.5px] text-ink-faint">{c.dmNote}</p>
    </Band>
  );
}
