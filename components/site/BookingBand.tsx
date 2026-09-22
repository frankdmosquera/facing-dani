import Link from "next/link";

import { siteConfig } from "@/data/siteConfig";
import { localePath, type Locale } from "@/lib/locale";

import { Band, BandHead, Hot } from "./Band";

/**
 * The closing ask. Last thing on the page, because a visitor who read this far
 * should not have to scroll back up to book.
 *
 * Every page gets one, and each one says something different: the home page
 * closes on "let's do your set", the gallery on "seen one you want". So the
 * copy arrives as a prop rather than being read from `t.home.booking` in here.
 * Reading one page's copy inside a component every page uses is how the same
 * band ends up copy-pasted four times, once per page that needed different
 * words.
 */
export type BookingBandCopy = {
  eyebrow: string;
  headingLead: string;
  headingAccent: string;
  lede: string;
  book: string;
  instagram: string;
};

export function BookingBand({
  locale,
  copy,
}: {
  locale: Locale;
  copy: BookingBandCopy;
}) {
  return (
    <Band>
      <BandHead
        eyebrow={copy.eyebrow}
        heading={
          <>
            {copy.headingLead} <Hot>{copy.headingAccent}</Hot>
          </>
        }
        lede={copy.lede}
      />

      <div className="flex flex-col gap-3 min-[560px]:flex-row">
        <Link
          href={localePath(locale, siteConfig.cta.href)}
          className="rounded-pill bg-[image:var(--hot)] px-7 py-4 text-center text-[15px] font-bold text-on-hot focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {copy.book}
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
            {copy.instagram}
          </a>
        ) : null}
      </div>
    </Band>
  );
}
