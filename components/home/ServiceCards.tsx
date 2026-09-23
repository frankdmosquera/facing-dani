import Link from "next/link";

import { Photo } from "@/components/media/Photo";
import { Band, BandHead } from "@/components/site/Band";
import { orderedGallery } from "@/data/gallery";
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

  const ordered = [...services].sort((a, b) => a.order - b.order);

  /**
   * One cover per service, or none.
   *
   * **All three or none at all**, and this was measured rather than assumed.
   * Built per-card first, as the spec asked. The grid stretches every card to
   * the tallest, so at 1440px all three came out 431px: nails carried a 278px
   * photograph, and lashes and makeup carried **294px of empty background**
   * between the blurb and the link. That does not read as "no photo yet", it
   * reads as two images that failed to load.
   *
   * So the row is the unit and the row degrades together - the same judgement
   * `WorkStrip` already makes about an empty strip, applied one level up.
   *
   * This lights up on its own the day lash and makeup photographs land in
   * `data/gallery.ts`. No code changes with them.
   */
  const covers = ordered.map((service) =>
    orderedGallery().find((image) => image.serviceId === service.id),
  );
  const everyServiceHasOne = covers.every((cover) => cover !== undefined);

  return (
    <Band tinted glow={false}>
      <BandHead eyebrow={c.eyebrow} heading={c.heading} lede={c.lede} />

      <ul className="grid gap-4 min-[860px]:grid-cols-3 min-[860px]:gap-5">
        {ordered.map((service, index) => {
          const cover = everyServiceHasOne ? covers[index] : undefined;

          return (
            <li
              key={service.id}
              className="flex flex-col overflow-hidden rounded-xl border border-line bg-surface"
            >
              {cover ? (
                <div className="aspect-[4/3] overflow-hidden bg-shot">
                  <Photo
                    path={cover.imagekitPath}
                    alt={t.gallery.images[cover.key]}
                    width={cover.width}
                    height={cover.height}
                    sizes="(min-width: 860px) 380px, 100vw"
                    className="size-full object-cover"
                  />
                </div>
              ) : null}

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
          );
        })}
      </ul>
    </Band>
  );
}
