import { siteConfig } from "@/data/siteConfig";
import { bookingHref, bookingTrigger } from "@/lib/bookingConfig";

import { Band, Hot } from "./Band";
import { WorkWall } from "./WorkWall";

// Copy comes as a prop: each page closes with its own words.
export type BookingBandCopy = {
  eyebrow: string;
  headingLead: string;
  headingAccent: string;
  lede: string;
  book: string;
  instagram: string;
};

export function BookingBand({ copy }: { copy: BookingBandCopy }) {
  return (
    <Band tone="hot" className="py-36!">
      <WorkWall />
      <div className="reveal relative mx-auto max-w-[720px] text-center">
        <span className="eyebrow mb-5">{copy.eyebrow}</span>
        <h2 className="mb-5 text-[clamp(56px,12vw,150px)] leading-[0.86]">
          {copy.headingLead} <Hot>{copy.headingAccent}</Hot>
        </h2>
        <p className="mx-auto mb-9 max-w-[48ch] text-[17px] text-ink">
          {copy.lede}
        </p>

        <div className="flex flex-col justify-center gap-3 min-[560px]:flex-row">
          <a
            href={bookingHref()}
            {...bookingTrigger()}
            className="hover-glow rounded-pill bg-[image:var(--hot)] px-7 py-4 text-center text-[15px] font-bold text-on-hot focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {copy.book}
          </a>

          {siteConfig.social.instagram ? (
            <a
              href={siteConfig.social.instagram.url}
              rel="me noopener noreferrer"
              target="_blank"
              className="hover-fill rounded-pill border border-line px-7 py-4 text-center text-[15px] font-bold text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {copy.instagram}
            </a>
          ) : null}
        </div>
      </div>
    </Band>
  );
}
