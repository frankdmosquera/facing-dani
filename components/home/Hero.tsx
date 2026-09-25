import Link from "next/link";

import { Photo } from "@/components/media/Photo";
import { Band, Hot } from "@/components/site/Band";
import { HOME_HERO, galleryImage } from "@/data/gallery";
import { siteConfig } from "@/data/siteConfig";
import type { Dictionary } from "@/dictionaries";
import { bookingHref, bookingTrigger } from "@/lib/bookingConfig";
import { localePath, type Locale } from "@/lib/locale";

export function Hero({ locale, t }: { locale: Locale; t: Dictionary }) {
  const c = t.home.hero;

  const lead = galleryImage(HOME_HERO);

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
            <a
              href={bookingHref()}
              {...bookingTrigger()}
              className="hover-glow rounded-pill bg-[image:var(--hot)] px-7 py-4 text-center text-[15px] font-bold text-on-hot focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {c.book}
            </a>
            <Link
              href={localePath(locale, "/gallery")}
              className="hover-fill rounded-pill border border-line px-7 py-4 text-center text-[15px] font-bold text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {c.seeWork}
            </Link>
          </div>

          {siteConfig.social.instagram ? (
            <p className="mt-4 text-[13.5px] text-ink-faint">{c.dmNote}</p>
          ) : null}
        </div>

        {lead ? (
          <div className="overflow-hidden rounded-xl border border-line-soft bg-shot min-[860px]:w-[380px] min-[860px]:shrink-0">
            <Photo
              path={lead.imagekitPath}
              alt={t.gallery.images[lead.key]}
              width={lead.width}
              height={lead.height}
              sizes="(min-width: 860px) 380px, 100vw"
              priority // The LCP image on a phone.
              className="block h-auto w-full"
            />
          </div>
        ) : null}
      </div>
    </Band>
  );
}
