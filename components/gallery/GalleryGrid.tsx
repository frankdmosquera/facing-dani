"use client";

import { useEffect, useRef, useState } from "react";

import type { ServiceId } from "@/data/services";

import {
  GalleryLightbox,
  type LightboxLabels,
  type LightboxPhoto,
} from "./GalleryLightbox";

// Client state is only the pressed chip and the open photo. The figures arrive as server-rendered children.

type Filter = ServiceId | "all";

export type GalleryChip = {
  id: ServiceId;
  label: string;
  count: number;
};

// "All" takes the brand gradient, not pink: pink means nails.
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
  photos,
  lightboxLabels,
  gridClassName = "columns-2 gap-2.5 pb-16 min-[620px]:columns-3 min-[620px]:gap-3 min-[1000px]:columns-4 min-[1000px]:gap-3.5",
  children,
}: {
  chips: GalleryChip[];
  total: number;
  allLabel: string;
  filterLabel: string;
  countOne: string;
  // Contains a literal {n}.
  countOther: string;
  // Same photos as children, same order. Alt text is resolved on the server so no dictionary ships to the client.
  photos: LightboxPhoto[];
  lightboxLabels: LightboxLabels;
  gridClassName?: string;
  children: React.ReactNode;
}) {
  const [active, setActive] = useState<Filter>("all");
  const [openAt, setOpenAt] = useState<number | null>(null);
  const openedFrom = useRef<HTMLElement | null>(null);

  // closest(), because the click lands on the img inside the button.
  function openFromGrid(event: React.MouseEvent<HTMLDivElement>) {
    const trigger = (event.target as HTMLElement).closest<HTMLElement>(
      "[data-photo-index]",
    );
    if (!trigger) return;

    const index = Number(trigger.dataset.photoIndex);
    if (Number.isInteger(index) && index >= 0 && index < photos.length) {
      openedFrom.current = trigger;
      // Same URL, nothing reloads. It only gives Back something to undo, so Back closes the viewer instead of leaving the page.
      window.history.pushState({ lightbox: true }, "");
      setOpenAt(index);
    }
  }

  // The dialog would restore focus to its own close button, which is gone by then, so focus ends up on body.
  function finishClosing() {
    setOpenAt(null);
    openedFrom.current?.focus();
  }

  // Back removed the entry added on open: treat that as closing.
  const isOpen = openAt !== null;
  useEffect(() => {
    if (!isOpen) return;
    window.addEventListener("popstate", finishClosing);
    return () => window.removeEventListener("popstate", finishClosing);
  }, [isOpen]);

  // Close and Escape go back too. Otherwise the entry outlives the viewer and the next Back does nothing visible.
  function closeLightbox() {
    if (window.history.state?.lightbox) {
      window.history.back(); // popstate then runs finishClosing.
    } else {
      finishClosing();
    }
  }

  // From state, not the DOM: the filter is CSS, so nothing in the DOM says which photos are visible.
  const sequence = photos
    .map((_, index) => index)
    .filter((index) => active === "all" || photos[index].serviceId === active);

  const shown =
    active === "all"
      ? total
      : (chips.find((chip) => chip.id === active)?.count ?? 0);

  const countText =
    shown === 1 ? countOne : countOther.replace("{n}", String(shown));

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

          <span
            role="status"
            aria-live="polite"
            className="ml-auto text-[12.5px] text-ink-faint"
          >
            {countText}
          </span>
        </div>
      ) : null}

      <div
        data-filter={active}
        onClick={openFromGrid}
        className={`group/grid ${gridClassName}`}
      >
        {children}
      </div>

      <GalleryLightbox
        photos={photos}
        sequence={sequence}
        openAt={openAt}
        onOpenChange={(open) => {
          if (!open) closeLightbox();
        }}
        onMove={setOpenAt}
        labels={lightboxLabels}
      />
    </>
  );
}
