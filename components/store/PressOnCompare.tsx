import Link from "next/link";

import { Band, BandHead, Hot } from "@/components/site/Band";
import type { Dictionary } from "@/dictionaries";
import { localePath, type Locale } from "@/lib/locale";

// Sends anyone who wants a set that lasts to the nails page.
export function PressOnCompare({ locale, t }: { locale: Locale; t: Dictionary }) {
  const c = t.store.compare;

  return (
    <Band tinted glow={false}>
      <BandHead
        eyebrow={c.eyebrow}
        heading={
          <>
            {c.headingLead} <Hot>{c.headingAccent}</Hot>
          </>
        }
      />

      <ul className="mb-8 grid gap-4 min-[760px]:grid-cols-2 min-[760px]:gap-5">
        {Object.entries(c.options).map(([key, option]) => (
          <li key={key} className="rounded-xl border border-line bg-surface p-5">
            <span className="mb-2 block text-[10.5px] font-semibold tracking-[0.14em] text-nails uppercase">
              {option.best}
            </span>
            <h3 className="mb-2 text-[20px]">{option.name}</h3>
            <p className="text-[14.5px] text-ink-muted">{option.body}</p>
          </li>
        ))}
      </ul>

      <Link
        href={localePath(locale, "/nails")}
        className="hover-fill inline-block rounded-pill border border-line px-7 py-4 text-center text-[15px] font-bold text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        {c.menu}
      </Link>
    </Band>
  );
}
