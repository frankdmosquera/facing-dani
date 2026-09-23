import { Photo } from "@/components/media/Photo";
import { Band, BandHead, Hot } from "@/components/site/Band";
import { portrait } from "@/data/portrait";
import { siteConfig } from "@/data/siteConfig";
import type { Dictionary } from "@/dictionaries";

/**
 * The craft angle, in her own voice. This is the page's strongest card: it is
 * true, hard for a competitor to copy, and it survives a price rise.
 *
 * Signed with the wordmark from siteConfig rather than a literal, like every
 * other business fact.
 *
 * It absorbed the opening of the old `/about` page in feature 14 - the lede
 * about a new business having no reviews to point at, and the portrait slot.
 * Both were saying the same thing this section says, one page further from
 * anyone reading it.
 *
 * `feeling` is hers rather than drafted: asked what a client should get out
 * of a session, she said they should leave feeling beautiful and sure of
 * themselves. It renders unmuted and last because it is the only line here
 * about the person in the chair rather than the person doing the work.
 *
 * **The English says "sure of yourself", never "secure".** The Spanish
 * `segura` means confident; English "secure" means safe from harm, which is a
 * different and much stranger promise for a nail page to make.
 *
 * The portrait is still `null` in `data/portrait.ts` and the page renders
 * without one on purpose: two frames from the set she sent are almost
 * certainly her, but nobody has confirmed it or asked whether she wants her
 * face on the site. A missing photograph is a content decision, not a broken
 * build, so there is no placeholder box either.
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
        lede={c.lede}
      />

      <div className="flex flex-col gap-10 min-[860px]:flex-row min-[860px]:items-start min-[860px]:gap-14">
        <div className="min-w-0 flex-1">
          <div className="flex max-w-[58ch] flex-col gap-4 text-[15.5px] text-ink-muted">
            <p>{c.training}</p>
            <p>{c.building}</p>
          </div>

          <p className="mt-5 max-w-[58ch] text-[16.5px] font-medium text-ink">
            {c.feeling}
          </p>

          <p className="font-display mt-6 text-[19px] font-extrabold tracking-[-0.04em] text-ink">
            {siteConfig.business.wordmark}
            <span className="text-nails">
              {siteConfig.business.wordmarkAccent}
            </span>
          </p>
        </div>

        {portrait ? (
          <div className="overflow-hidden rounded-xl border border-line-soft bg-shot min-[860px]:w-[340px] min-[860px]:shrink-0">
            <Photo
              path={portrait.imagekitPath}
              alt={t.home.portraitAlt}
              width={portrait.width}
              height={portrait.height}
              sizes="(min-width: 860px) 340px, 100vw"
              className="block h-auto w-full"
            />
          </div>
        ) : null}
      </div>
    </Band>
  );
}
