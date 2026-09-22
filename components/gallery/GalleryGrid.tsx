"use client";

import { useState } from "react";

import type { ServiceId } from "@/data/services";

/**
 * The filter, and nothing else.
 *
 * `"use client"` earns its place with one piece of state: which chip is
 * pressed. The photographs are passed in as `children`, already rendered on the
 * server, and the filtering happens in CSS off a `data-filter` attribute on the
 * grid. So pressing a chip re-renders three buttons and a count, not the grid.
 *
 * Without JavaScript the chips render and do nothing, and every photo stays
 * visible. That is the right no-JS state for a gallery: the filter is a
 * convenience, the photos are the page.
 */

type Filter = ServiceId | "all";

export type GalleryChip = {
  id: ServiceId;
  label: string;
  count: number;
};

/**
 * A pressed chip wears its service's colour, the same token the photo's tag
 * uses, so pink means nails everywhere on the site.
 *
 * "All" deliberately does not take pink. The mockup gave it the nails fill,
 * which would make one colour mean two things and break the rule that colour
 * is navigation here. It takes the brand gradient instead, which is what every
 * other primary control on the site already wears.
 */
const pressedChip: Record<Filter, string> = {
  all: "border-transparent bg-[image:var(--hot)] text-on-hot",
  nails: "border-nails bg-nails text-on-hot",
  lashes: "border-lashes bg-lashes text-on-hot",
  makeup: "border-makeup bg-makeup text-on-hot",
};

const CHIP =
  "rounded-pill border px-[17px] py-[9px] text-[12.5px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

const IDLE_CHIP = "border-line bg-transparent text-ink-muted hover:text-ink";

export function GalleryGrid({
  chips,
  total,
  allLabel,
  filterLabel,
  countOne,
  countOther,
  children,
}: {
  /** One per service that actually has photos, in service order. */
  chips: GalleryChip[];
  total: number;
  allLabel: string;
  filterLabel: string;
  countOne: string;
  /** Carries a literal `{n}`. */
  countOther: string;
  children: React.ReactNode;
}) {
  const [active, setActive] = useState<Filter>("all");

  const shown =
    active === "all"
      ? total
      : (chips.find((chip) => chip.id === active)?.count ?? 0);

  const countText =
    shown === 1 ? countOne : countOther.replace("{n}", String(shown));

  /**
   * One chip is not a filter, it is a label. With photos of only one service
   * the whole row goes, count included, rather than offering a control whose
   * two states look identical.
   */
  const showFilters = chips.length >= 2;

  return (
    <>
      {showFilters ? (
        <div className="flex flex-wrap items-center gap-2 pt-3.5 pb-6">
          <div
            role="group"
            aria-label={filterLabel}
            className="flex flex-wrap gap-2"
          >
            <button
              type="button"
              aria-pressed={active === "all"}
              onClick={() => setActive("all")}
              className={`${CHIP} ${active === "all" ? pressedChip.all : IDLE_CHIP}`}
            >
              {allLabel}
            </button>

            {chips.map((chip) => (
              <button
                key={chip.id}
                type="button"
                aria-pressed={active === chip.id}
                onClick={() => setActive(chip.id)}
                className={`${CHIP} ${active === chip.id ? pressedChip[chip.id] : IDLE_CHIP}`}
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Announced, because for a screen reader the only thing that changes
              when a chip is pressed is a number further down the page. */}
          <span
            role="status"
            aria-live="polite"
            className="ml-auto text-[12.5px] text-ink-faint"
          >
            {countText}
          </span>
        </div>
      ) : null}

      {/* Masonry by CSS columns. Real sets arrive at wildly different crops,
          and forcing one aspect ratio would crop away the thing being sold. */}
      <div
        data-filter={active}
        className="group/grid columns-2 gap-2.5 pb-16 min-[620px]:columns-3 min-[620px]:gap-3 min-[1000px]:columns-4 min-[1000px]:gap-3.5"
      >
        {children}
      </div>
    </>
  );
}
