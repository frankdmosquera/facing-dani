import Link from "next/link";

import { Sparkle } from "lucide-react";

import { WorkColumns } from "@/components/home/WorkColumns";
import { Band, Hot } from "@/components/site/Band";
import { siteConfig } from "@/data/siteConfig";
import type { Dictionary } from "@/dictionaries";
import { localePath, type Locale } from "@/lib/locale";

export function Hero({ locale, t }: { locale: Locale; t: Dictionary }) {
  const c = t.home.hero;

  return (
    <Band className="pt-[26px]!">
      <div className="flex flex-col gap-10 min-[860px]:flex-row min-[860px]:items-center min-[860px]:gap-14">
        <div className="min-w-0 min-[860px]:flex-1">
          <span className="lift-rise font-body mb-3 block text-[11px] font-semibold tracking-[0.18em] text-ink-faint uppercase">
            {c.eyebrow}
          </span>

          <h1 className="relative mb-5 text-[clamp(44px,12vw,92px)] min-[860px]:text-[clamp(56px,6.2vw,92px)]">
            <span className="lift-rise inline-block [--i:1]">
              {c.headingLead}
            </span>{" "}
            <span className="lift-rise inline-block pr-[0.08em] [--i:2]">
              <Hot>{c.headingAccent}</Hot>
            </span>
            {/* Three sparkles around the headline, twinkling out of step. */}
            <span aria-hidden="true">
              <Sparkle className="lift-twinkle absolute -top-4 right-[8%] size-7 fill-nails text-nails" />
              <Sparkle className="lift-twinkle absolute top-[38%] -left-7 size-4 fill-makeup text-makeup [--d:0.9s] max-[560px]:hidden" />
              <Sparkle className="lift-twinkle absolute -bottom-2 right-[30%] size-5 fill-lashes text-lashes [--d:1.7s]" />
            </span>
          </h1>

          <p className="lift-rise mb-[26px] max-w-[46ch] text-base text-ink-muted [--i:3]">
            {c.sell}
          </p>

          <div className="lift-rise flex flex-col gap-3 [--i:4] min-[560px]:flex-row">
            <Link
              href={localePath(locale, "/nails")}
              className="hover-glow rounded-pill bg-[image:var(--hot)] px-7 py-4 text-center text-[15px] font-bold text-on-hot focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {c.nails}
            </Link>
            <Link
              href={localePath(locale, "/parties")}
              className="hover-fill rounded-pill border border-line px-7 py-4 text-center text-[15px] font-bold text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {c.party}
            </Link>
          </div>

          {siteConfig.social.instagram ? (
            <p className="mt-4 text-[13.5px] text-ink-faint">{c.dmNote}</p>
          ) : null}
        </div>

        <WorkColumns />
      </div>
    </Band>
  );
}
