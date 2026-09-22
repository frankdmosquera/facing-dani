import { Band, BandHead, Hot } from "@/components/site/Band";
import { siteConfig } from "@/data/siteConfig";
import type { Dictionary } from "@/dictionaries";

/**
 * The craft angle, in her own voice. This is the page's strongest card: it is
 * true, hard for a competitor to copy, and it survives a price rise.
 *
 * Signed with the wordmark from siteConfig rather than a literal, like every
 * other business fact.
 */
export function Story({ t }: { t: Dictionary }) {
  const c = t.home.story;

  return (
    <Band>
      <BandHead
        eyebrow={c.eyebrow}
        heading={
          <>
            {c.headingLead} <Hot>{c.headingAccent}</Hot>
          </>
        }
      />

      <div className="flex max-w-[58ch] flex-col gap-4 text-[15.5px] text-ink-muted">
        <p>{c.training}</p>
        <p>{c.building}</p>
      </div>

      <p className="font-display mt-6 text-[19px] font-extrabold tracking-[-0.04em] text-ink">
        {siteConfig.business.wordmark}
        <span className="text-nails">{siteConfig.business.wordmarkAccent}</span>
      </p>
    </Band>
  );
}
