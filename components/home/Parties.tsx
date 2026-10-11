import { MailQuestion, PartyPopper, Sparkles } from "lucide-react";
import Link from "next/link";

import { Band, BandHead, Hot } from "@/components/site/Band";
import type { Dictionary } from "@/dictionaries";
import { localePath, type Locale } from "@/lib/locale";

// She is a station at someone else's party, never the organiser: copy must not promise more.
// One icon per point, in the dictionary's order: host, age, ask.
const ICONS = [PartyPopper, Sparkles, MailQuestion];

export function Parties({ locale, t }: { locale: Locale; t: Dictionary }) {
  const c = t.home.parties;

  return (
    <Band id="parties">
      <BandHead
        eyebrow={c.eyebrow}
        heading={
          <>
            {c.headingLead} <Hot>{c.headingAccent}</Hot>
          </>
        }
        lede={c.lede}
      />

      {/* The gradient is the card's edge: a 1px wrapper in the hot gradient
          with the card's own surface inside it. */}
      <ul className="reveal mb-10 grid gap-4 min-[860px]:grid-cols-3 min-[860px]:gap-5">
        {Object.entries(c.points).map(([key, point], index) => {
          const Icon = ICONS[index % ICONS.length];
          return (
            <li
              key={key}
              className="hover-glow rounded-xl bg-[image:var(--hot)] p-px"
            >
              <div className="h-full rounded-[calc(var(--radius-card)-1px)] bg-surface p-6">
                <span className="mb-5 grid size-12 place-items-center rounded-full bg-[image:var(--hot)] text-on-hot">
                  <Icon aria-hidden="true" className="size-[22px]" strokeWidth={2} />
                </span>
                <h3 className="mb-2 text-[19px]">{point.title}</h3>
                <p className="text-[14.5px] text-ink-muted">{point.body}</p>
              </div>
            </li>
          );
        })}
      </ul>

      {/* ?topic=party opens the form with the party fields showing. */}
      <Link
        href={`${localePath(locale, "/contact")}?topic=party`}
        className="hover-glow inline-block rounded-pill bg-[image:var(--hot)] px-7 py-4 text-center text-[15px] font-bold text-on-hot focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        {c.ask}
      </Link>
    </Band>
  );
}
