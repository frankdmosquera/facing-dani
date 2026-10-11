import Link from "next/link";

import { Band, BandHead, Hot } from "@/components/site/Band";
import type { Dictionary } from "@/dictionaries";
import { localePath, type Locale } from "@/lib/locale";

// Sends anyone who wants a set that lasts to the nails menu.
export function PressOnCompare({
  locale,
  t,
  backdrop,
}: {
  locale: Locale;
  t: Dictionary;
  backdrop?: React.ReactNode;
}) {
  const c = t.store.compare;

  return (
    <Band tinted backdrop={backdrop}>
      <BandHead
        eyebrow={c.eyebrow}
        heading={
          <>
            {c.headingLead} <Hot>{c.headingAccent}</Hot>
          </>
        }
      />

      {/* Two cards facing off, a round "vs" seal on the seam between them. */}
      <div className="relative mb-8">
        <ul className="grid gap-4 min-[760px]:grid-cols-2 min-[760px]:gap-6">
          {Object.entries(c.options).map(([key, option], index) => (
            <li
              key={key}
              className={`card-hot rounded-2xl border border-line bg-surface p-7 min-[760px]:p-10 ${index === 0 ? "min-[760px]:-rotate-1" : "min-[760px]:rotate-1"}`}
            >
              <span className="mb-3 block text-[11px] font-semibold tracking-[0.14em] text-nails uppercase">
                {option.best}
              </span>
              <h3 className="mb-3 text-[clamp(28px,3.4vw,40px)]">{option.name}</h3>
              <p className="text-[15.5px] text-ink-muted">{option.body}</p>
            </li>
          ))}
        </ul>
        <span
          aria-hidden="true"
          className="font-display absolute top-1/2 left-1/2 grid size-20 -translate-1/2 place-items-center rounded-full bg-[image:var(--hot)] text-[26px] font-extrabold text-on-hot shadow-[0_20px_40px_-14px_rgba(255,61,143,0.7)] max-[760px]:hidden"
        >
          vs
        </span>
      </div>

      <Link
        href={`${localePath(locale, "/")}#menu`}
        className="hover-fill inline-block rounded-pill border border-line px-7 py-4 text-center text-[15px] font-bold text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        {c.menu}
      </Link>
    </Band>
  );
}
