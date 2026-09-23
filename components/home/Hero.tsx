import Link from "next/link";

import { Photo } from "@/components/media/Photo";
import { Band, Hot } from "@/components/site/Band";
import { orderedGallery } from "@/data/gallery";
import { siteConfig } from "@/data/siteConfig";
import type { Dictionary } from "@/dictionaries";
import { localePath, type Locale } from "@/lib/locale";

/**
 * The page the Instagram bio link lands on, above the fold.
 *
 * The photograph the mockup puts beside this type was left out of item 3, with
 * the reason recorded in its spec: there were none in the repo and ImageKit was
 * not configured. Item 4 shipped nine and nobody came back, so the page spent
 * four features carrying itself on type alone on a site whose locked direction
 * says photography carries it.
 *
 * It leads with `orderedGallery()[0]` rather than a hand-picked path, because
 * `data/gallery.ts` states the set is ordered strongest first. That keeps the
 * choice in the data, and changing which photograph leads is a reorder there
 * rather than an edit here.
 *
 * Stacked on a phone with the type first, because the headline is what a
 * visitor arriving from a bio link is deciding on. Side by side only from
 * 860px, the same breakpoint the service cards use.
 */
export function Hero({ locale, t }: { locale: Locale; t: Dictionary }) {
  const c = t.home.hero;

  /** Undefined only if the gallery is empty, which leaves the type-led hero. */
  const lead = orderedGallery()[0];

  return (
    <Band className="pt-[26px]!">
      <div className="flex flex-col gap-10 min-[860px]:flex-row min-[860px]:items-center min-[860px]:gap-14">
        <div className="min-w-0 min-[860px]:flex-1">
          <span className="font-body mb-3 block text-[11px] font-semibold tracking-[0.18em] text-ink-faint uppercase">
            {c.eyebrow}
          </span>

          <h1 className="mb-4 text-[clamp(40px,11vw,74px)]">
            {c.headingLead} <Hot>{c.headingAccent}</Hot>
          </h1>

          <p className="mb-[26px] max-w-[46ch] text-base text-ink-muted">
            {c.sell}
          </p>

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

          {/* Only once there is an account to send her to: a line naming a
              route that does not exist is worse than no line at all. Setting
              the handle in siteConfig brings it back with no code change. */}
          {siteConfig.social.instagram ? (
            <p className="mt-4 text-[13.5px] text-ink-faint">{c.dmNote}</p>
          ) : null}
        </div>

        {/*
          `priority`, because on a phone this is the largest thing above the
          fold and lazy-loading the LCP element is the one case Next's default
          gets wrong.

          The panel sits on `bg-shot` rather than the band's own ground: photo
          panels stay nearer #1B1426 so the work keeps its punch without
          darkening the whole page. That is a locked decision in the plan.
        */}
        {lead ? (
          <div className="overflow-hidden rounded-xl border border-line-soft bg-shot min-[860px]:w-[380px] min-[860px]:shrink-0">
            <Photo
              path={lead.imagekitPath}
              alt={t.gallery.images[lead.key]}
              width={lead.width}
              height={lead.height}
              sizes="(min-width: 860px) 380px, 100vw"
              priority
              className="block h-auto w-full"
            />
          </div>
        ) : null}
      </div>
    </Band>
  );
}
