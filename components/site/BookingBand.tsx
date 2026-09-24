import Link from "next/link";

import { siteConfig } from "@/data/siteConfig";
import { localePath, type Locale } from "@/lib/locale";

import { Band, BandHead, Hot } from "./Band";

// Copy comes as a prop: each page closes with its own words.
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
