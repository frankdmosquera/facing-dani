import Link from "next/link";

import { Band, BandHead, Hot } from "@/components/site/Band";
import type { Dictionary } from "@/dictionaries";
import { localePath, type Locale } from "@/lib/locale";

export function GalleryPhotoSteps({
  locale,
  t,
}: {
  locale: Locale;
  t: Dictionary;
}) {
  const c = t.gallery.photo;

  return (
    <Band tone="ink">
      <BandHead
        eyebrow={c.eyebrow}
        heading={
          <>
            {c.headingLead} <Hot>{c.headingAccent}</Hot>
          </>
        }
      />

      <ol className="mb-8 grid gap-4 min-[860px]:grid-cols-3 min-[860px]:gap-5">
        {Object.entries(c.steps).map(([key, step], index) => (
          <li
            key={key}
            className="card-hot reveal rounded-2xl border border-line bg-surface p-6 pt-28"
          >
            {/* A giant outlined numeral filling the card's top corner. */}
            <span
              aria-hidden="true"
              className="font-display pointer-events-none absolute top-4 right-5 text-[120px] leading-none font-extrabold tracking-[-0.06em] text-transparent select-none [-webkit-text-stroke:1.5px_var(--nails)]"
            >
              {index + 1}
            </span>
            <h3 className="relative mb-2 text-[22px]">{step.title}</h3>
            <p className="relative text-[15px] text-ink-muted">{step.body}</p>
          </li>
        ))}
      </ol>

      <Link
        href={localePath(locale, "/nails")}
        className="hover-fill inline-block rounded-pill border border-line px-7 py-4 text-center text-[15px] font-bold text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        {c.menu}
      </Link>
    </Band>
  );
}
