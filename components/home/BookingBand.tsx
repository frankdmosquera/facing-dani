import Link from "next/link";

import { siteConfig } from "@/data/siteConfig";
import type { Dictionary } from "@/dictionaries";
import { localePath, type Locale } from "@/lib/locale";

import { Band, BandHead, Hot } from "./Band";

/**
 * The closing ask. Last thing on the page, because a visitor who read this far
 * should not have to scroll back up to book.
 */
export function BookingBand({
  locale,
  t,
}: {
  locale: Locale;
  t: Dictionary;
}) {
  const c = t.home.booking;

  return (
    <Band>
      <BandHead
        eyebrow={c.eyebrow}
        heading={
          <>
            {c.headingLead} <Hot>{c.headingAccent}</Hot>
          </>
        }
        lede={c.lede}
      />

      <div className="flex flex-col gap-3 min-[560px]:flex-row">
        <Link
          href={localePath(locale, siteConfig.cta.href)}
          className="rounded-pill bg-[image:var(--hot)] px-7 py-4 text-center text-[15px] font-bold text-on-hot focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {c.book}
        </Link>

        {/* Rendered only once the handle is known, the same rule the footer
            uses. The markup is here so it appears the day it lands, rather
            than shipping a button that goes nowhere. */}
        {siteConfig.social.instagram ? (
          <a
            href={siteConfig.social.instagram.url}
            rel="me noopener noreferrer"
            target="_blank"
            className="rounded-pill border border-line px-7 py-4 text-center text-[15px] font-bold text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {c.instagram}
          </a>
        ) : null}
      </div>
    </Band>
  );
}
