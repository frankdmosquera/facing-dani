import Link from "next/link";

import { Band, BandHead } from "@/components/site/Band";
import { services } from "@/data/services";
import type { Dictionary } from "@/dictionaries";
import { localePath, type Locale } from "@/lib/locale";

/**
 * Colour is navigation on this site: pink is nails, violet lashes, orange
 * makeup, on every page. The accent is keyed off the service id, so the two
 * cannot drift.
 *
 * Colour is never the only cue. Each card carries its name as text, so the
 * page works in greyscale and for a colourblind visitor - the accent is
 * reinforcement, not the message.
 */
const accentText: Record<(typeof services)[number]["id"], string> = {
  nails: "text-nails",
  lashes: "text-lashes",
  makeup: "text-makeup",
};

const accentBar: Record<(typeof services)[number]["id"], string> = {
  nails: "bg-nails",
  lashes: "bg-lashes",
  makeup: "bg-makeup",
};

export function ServiceCards({
  locale,
  t,
}: {
  locale: Locale;
  t: Dictionary;
}) {
  const c = t.home.services;

  return (
    <Band tinted glow={false}>
      <BandHead eyebrow={c.eyebrow} heading={c.heading} lede={c.lede} />

      <ul className="grid gap-4 min-[860px]:grid-cols-3 min-[860px]:gap-5">
        {[...services]
          .sort((a, b) => a.order - b.order)
          .map((service) => (
            <li
              key={service.id}
              className="flex flex-col overflow-hidden rounded-xl border border-line bg-surface"
            >
              {/* The accent as a rule rather than a coloured label: the name
                  should appear once, and the colour is reinforcement. */}
              <span
                aria-hidden="true"
                className={`block h-1 w-full ${accentBar[service.id]}`}
              />

              <div className="flex flex-1 flex-col p-5">
                <h3 className="mb-2 text-[21px]">
                  {t.services[service.id].name}
                </h3>

                <p className="mb-4 text-[13.5px] text-ink-muted">
                  {t.services[service.id].blurb}
                </p>

                <Link
                  href={localePath(locale, service.href)}
                  className={`mt-auto inline-flex items-center gap-2 text-[13.5px] font-bold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${accentText[service.id]}`}
                >
                  {c.more}
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </li>
          ))}
      </ul>
    </Band>
  );
}
