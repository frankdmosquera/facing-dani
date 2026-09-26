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
    <Band glow={false}>
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
            className="rounded-xl border border-line bg-surface p-5"
          >
            <span
              aria-hidden="true"
              className="font-display mb-2 block text-[19px] font-extrabold text-nails"
            >
              {index + 1}
            </span>
            <h3 className="mb-2 text-[18px]">{step.title}</h3>
            <p className="text-[14.5px] text-ink-muted">{step.body}</p>
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
