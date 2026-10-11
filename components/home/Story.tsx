import Link from "next/link";

import { Photo } from "@/components/media/Photo";
import { Band, BandHead, Hot } from "@/components/site/Band";
import { WorkFan } from "@/components/site/WorkFan";
import { portrait } from "@/data/portrait";
import { siteConfig } from "@/data/siteConfig";
import type { Dictionary } from "@/dictionaries";
import { localePath, type Locale } from "@/lib/locale";

export function Story({ locale, t }: { locale: Locale; t: Dictionary }) {
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

      <div className="flex flex-col gap-10 min-[860px]:flex-row min-[860px]:items-start min-[860px]:gap-14">
        <div className="min-w-0 flex-1">
          <p className="max-w-[52ch] text-[16.5px] text-ink-muted">
            {c.intro}
          </p>

          <p className="font-display mt-8 bg-[image:var(--hot-text)] bg-clip-text text-[clamp(72px,16vw,140px)] leading-[0.9] font-extrabold tracking-[-0.06em] text-transparent">
            {siteConfig.business.ownerName.toLowerCase()}
            {siteConfig.business.wordmarkAccent}
          </p>

          <Link
            href={localePath(locale, "/about")}
            className="mt-6 inline-flex items-center gap-2 text-[15px] font-bold text-nails focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {c.more}
            <span aria-hidden="true">&rarr;</span>
          </Link>
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
        ) : (
          // No photo of her, ever (portrait.ts). Her work stands in.
          <WorkFan
            keys={["heartsFrench", "blueGraphicEyeProfile", "almondBowFrench"]}
            className="min-[860px]:w-[420px] min-[860px]:max-w-none min-[860px]:shrink-0"
          />
        )}
      </div>
    </Band>
  );
}
