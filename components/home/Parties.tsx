import Link from "next/link";

import { Band, BandHead, Hot } from "@/components/site/Band";
import type { Dictionary } from "@/dictionaries";
import { localePath, type Locale } from "@/lib/locale";

// She is a station at someone else's party, never the organiser: copy must not promise more.
export function Parties({ locale, t }: { locale: Locale; t: Dictionary }) {
  const c = t.home.parties;

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

      <ul className="mb-8 grid gap-4 min-[860px]:grid-cols-3 min-[860px]:gap-5">
        {Object.entries(c.points).map(([key, point]) => (
          <li
            key={key}
            className="rounded-xl border border-line bg-surface p-5"
          >
            <h3 className="mb-2 text-[18px]">{point.title}</h3>
            <p className="text-[14.5px] text-ink-muted">{point.body}</p>
          </li>
        ))}
      </ul>

      {/* To /contact until the events page (19b) exists. */}
      <Link
        href={localePath(locale, "/contact")}
        className="hover-glow inline-block rounded-pill bg-[image:var(--hot)] px-7 py-4 text-center text-[15px] font-bold text-on-hot focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        {c.ask}
      </Link>
    </Band>
  );
}
