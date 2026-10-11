import { MailQuestion, PartyPopper, Sparkles } from "lucide-react";
import Link from "next/link";

import { Photo } from "@/components/media/Photo";
import { Band, BandHead, Hot } from "@/components/site/Band";
import { galleryImage, type GalleryKey } from "@/data/gallery";
import type { Dictionary } from "@/dictionaries";
import { localePath, type Locale } from "@/lib/locale";

// She is a station at someone else's party, never the organiser: copy must not promise more.
// One icon per point, in the dictionary's order: host, age, ask.
const ICONS = [PartyPopper, Sparkles, MailQuestion];
// One of her festive sets behind each point. Nail work only.
const TILES: GalleryKey[] = ["christmasShortSet", "pinkFloralArt", "heartsFrench"];

export function Parties({ locale, t }: { locale: Locale; t: Dictionary }) {
  const c = t.home.parties;

  return (
    <Band id="parties" tone="ink">
      <BandHead
        eyebrow={c.eyebrow}
        heading={
          <>
            {c.headingLead} <Hot>{c.headingAccent}</Hot>
          </>
        }
        lede={c.lede}
      />

      {/* Photo tiles cut as coffin nails from 860px: her set fills the tile,
          the words sit on a dark fade at the foot, and hovering zooms the
          photo, sweeps the gel shine and stretches the rule. */}
      <ul className="reveal mb-10 grid gap-4 min-[860px]:grid-cols-3 min-[860px]:gap-5">
        {Object.entries(c.points).map(([key, point], index) => {
          const Icon = ICONS[index % ICONS.length];
          const image = galleryImage(TILES[index % TILES.length]);
          return (
            <li
              key={key}
              className="group/tile on-dark gel-shine relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-2xl bg-shot p-6 min-[860px]:nail-coffin min-[860px]:aspect-[100/130] min-[860px]:rounded-none min-[860px]:px-8 min-[860px]:pb-9"
            >
              {image ? (
                <div aria-hidden="true" className="absolute inset-0">
                  <Photo
                    path={image.imagekitPath}
                    alt=""
                    width={image.width}
                    height={image.height}
                    sizes="(min-width: 860px) 380px, 100vw"
                    className="block h-full w-full object-cover transition-[scale] duration-700 ease-out group-hover/tile:scale-105"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(16_11_22/0.94)_0%,rgb(16_11_22/0.6)_45%,rgb(16_11_22/0.05)_75%)]" />
                </div>
              ) : null}
              <div className="relative z-10">
                <span className="mb-4 grid size-11 place-items-center rounded-full bg-[image:var(--hot)] text-on-hot">
                  <Icon aria-hidden="true" className="size-5" strokeWidth={2} />
                </span>
                <h3 className="mb-2 text-[22px] text-ink">{point.title}</h3>
                <span aria-hidden="true" className="mb-3 block h-0.5 w-9 rounded-full bg-[image:var(--hot)] transition-[width] duration-500 group-hover/tile:w-20" />
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
