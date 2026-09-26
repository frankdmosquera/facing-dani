import Link from "next/link";

import { Band, BandHead, Hot } from "@/components/site/Band";
import type { Dictionary } from "@/dictionaries";
import { localePath, type Locale } from "@/lib/locale";

// Nails page only. Explains the three bases so a visitor knows which row of the menu to book.
export function NailGuide({ locale, t }: { locale: Locale; t: Dictionary }) {
  const c = t.services.nails.guide;

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

      <ul className="mb-8 grid gap-4 min-[860px]:grid-cols-3 min-[860px]:gap-5">
        {Object.entries(c.kinds).map(([key, kind]) => (
          <li
            key={key}
            className="flex flex-col rounded-xl border border-line bg-surface p-5"
          >
            <span className="mb-2 text-[10.5px] font-semibold tracking-[0.14em] text-nails uppercase">
              {kind.tag}
            </span>
            <h3 className="mb-2 text-[20px]">{kind.name}</h3>
            <p className="mb-4 text-[14.5px] text-ink-muted">{kind.body}</p>
            <p className="mt-auto text-[13.5px] font-medium text-ink">
              {kind.lasts}
            </p>
          </li>
        ))}
      </ul>

      <Link
        href={localePath(locale, "/contact")}
        className="hover-fill inline-block rounded-pill border border-line px-7 py-4 text-center text-[15px] font-bold text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        {c.ask}
      </Link>
    </Band>
  );
}
