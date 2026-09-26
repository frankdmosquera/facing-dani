import Link from "next/link";

import { Band, BandHead, Hot } from "@/components/site/Band";
import type { Dictionary } from "@/dictionaries";
import { localePath, type Locale } from "@/lib/locale";

// The home page's long-form block: general nail knowledge, no claims about her. It is what keeps home from being thin.
export function CareGuide({ locale, t }: { locale: Locale; t: Dictionary }) {
  const c = t.home.guide;

  return (
    <Band glow={false}>
      <BandHead
        eyebrow={c.eyebrow}
        heading={
          <>
            {c.headingLead} <Hot>{c.headingAccent}</Hot>
          </>
        }
        lede={c.lede}
      />

      <div className="grid gap-4 min-[900px]:grid-cols-3 min-[900px]:gap-5">
        {Object.entries(c.columns).map(([key, column]) => (
          <div
            key={key}
            className="flex flex-col rounded-xl border border-line bg-surface p-5"
          >
            <h3 className="mb-4 text-[20px]">{column.heading}</h3>
            <dl className="flex flex-col gap-3.5">
              {Object.entries(column.items).map(([itemKey, item]) => (
                <div key={itemKey}>
                  <dt className="text-[15px] font-semibold text-ink">{item.term}</dt>
                  <dd className="mt-0.5 text-[14px] text-ink-muted">{item.text}</dd>
                </div>
              ))}
            </dl>

            {key === "care" ? (
              <Link
                href={localePath(locale, "/store")}
                className="mt-5 inline-flex items-center gap-2 text-[14px] font-bold text-nails focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                {c.storeLink}
                <span aria-hidden="true">&rarr;</span>
              </Link>
            ) : null}
          </div>
        ))}
      </div>
    </Band>
  );
}
