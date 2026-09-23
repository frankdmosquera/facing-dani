"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";

import { Photo } from "@/components/media/Photo";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ServiceId } from "@/data/services";

/**
 * One photograph, opened large, with the rest of the pressed filter behind it.
 *
 * The grid renders a tile at 278 CSS px - measured on the running page, because
 * the gallery sits inside a container capped at `--site: 1200px`, not at 25vw of
 * the viewport as its `sizes` attribute claims. At that size a cuticle line is
 * not judgeable, which is the one thing the gallery exists to let someone judge.
 *
 * The dialog comes from `@base-ui/react`, already a dependency, and it owns
 * Escape and the background scroll lock. Moving between photographs is
 * hand-rolled: a lightbox needs next, previous and a strip, not the loop
 * physics and variable widths a carousel library exists to solve.
 */

export type LightboxPhoto = {
  /** Path inside the ImageKit library, leading slash, no endpoint. */
  imagekitPath: string;
  /** Which chip this photo belongs to, so navigation can respect the filter. */
  serviceId: ServiceId;
  /** Already resolved on the server, so neither dictionary reaches the client. */
  alt: string;
  /** The real cropped pixels, so the frame reserves the right shape. */
  width: number;
  height: number;
};

export type LightboxLabels = {
  close: string;
  previous: string;
  next: string;
  /** Carries literal `{current}` and `{total}`. */
  position: string;
};

/**
 * Near enough to full width that the browser asks ImageKit for a genuinely
 * large file. The grid's own `25vw` would fetch a thumbnail and stretch it.
 */
const SIZES = "(min-width: 1024px) 90vw, 100vw";

/** Small, because a thumbnail is a thumbnail. */
const THUMB_SIZES = "72px";

/**
 * Full screen, and every piece of this string was earned by measuring.
 *
 * `translate-none` as well as `transform-none`, because they are different CSS
 * properties: Tailwind v4 compiles `-translate-x-1/2` to the standalone
 * `translate` property while `zoom-in-95` leaves a scale on `transform`.
 * Clearing only `transform` left the surface at -712,-500 with a computed
 * `top: 0px` - the right inset, shifted by half its own size.
 *
 * Each side is zeroed by name rather than with `inset-0`, because `inset` and
 * `top`/`left` are different groups to tailwind-merge, so the primitive's
 * `top-1/2 left-1/2` survived alongside it and won.
 *
 * The dimming is here rather than on the primitive's overlay, which is 10%
 * black: right for a settings dialog, far too light for a photograph.
 */
const SURFACE =
  "top-0 right-0 bottom-0 left-0 flex h-auto max-h-none w-auto max-w-none translate-none transform-none flex-col gap-2 rounded-none border-0 bg-[rgba(14,9,20,0.94)] p-2 ring-0 duration-0 data-closed:animate-none data-open:animate-none sm:p-3 sm:max-w-none";

/**
 * A centred cluster with the counter, rather than pinned to the left and
 * right edges of the frame.
 *
 * At the edges they were reachable with two thumbs on a phone and a stretch
 * on a tablet, where the same frame is twice as wide and usually held in one
 * hand. Centred, the distance stops growing with the screen. It also hands the
 * photograph back its full width, since nothing overlays it any more.
 */
const CONTROL =
  "grid size-10 shrink-0 place-items-center rounded-full border border-white/20 bg-[rgba(20,15,28,.72)] text-ink backdrop-blur-sm transition-colors hover:bg-[rgba(20,15,28,.95)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

const CLOSE =
  "absolute top-3 right-3 z-10 rounded-pill border border-white/20 bg-[rgba(20,15,28,.78)] px-3 py-1.5 text-[12px] font-semibold text-ink backdrop-blur-sm transition-colors hover:bg-[rgba(20,15,28,.92)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

export function GalleryLightbox({
  photos,
  sequence,
  openAt,
  onOpenChange,
  onMove,
  labels,
}: {
  photos: LightboxPhoto[];
  /**
   * Indices into `photos`, in display order, for the pressed chip only.
   *
   * The filter is CSS - the grid sets `data-filter` and each figure hides
   * itself - so there is nothing in the DOM to read a "visible set" from.
   * Deriving it from the same state the chips write is the only way next and
   * previous cannot walk into a photograph that is hidden on the page behind.
   */
  sequence: number[];
  /** Index into `photos`, or `null` when closed. */
  openAt: number | null;
  onOpenChange: (open: boolean) => void;
  onMove: (nextIndex: number) => void;
  labels: LightboxLabels;
}) {
  const photo = openAt === null ? undefined : photos[openAt];

  /** Where the open photo sits within the filtered run, not within all nine. */
  const position = openAt === null ? -1 : sequence.indexOf(openAt);
  const total = sequence.length;

  /**
   * Wraps at both ends. With nine photographs, stopping dead would mean a
   * visitor who opens the last one meets a button that does nothing.
   */
  const step = useCallback(
    (delta: number) => {
      if (position < 0 || total === 0) return;
      const next = (position + delta + total) % total;
      onMove(sequence[next]);
    },
    [position, total, sequence, onMove],
  );

  /**
   * Arrow keys on the whole document rather than on the dialog.
   *
   * Focus starts on the close button and a visitor may Tab it anywhere inside,
   * so binding to one element would make the arrows work in some places and not
   * others. The listener only exists while the lightbox is open.
   */
  const isOpen = openAt !== null;
  useEffect(() => {
    if (!isOpen) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        step(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        step(-1);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, step]);

  /** Where a drag started, or null when no pointer is down. */
  const dragFrom = useRef<{ x: number; y: number } | null>(null);

  /** Keeps the marked thumbnail in view as navigation moves past the edge. */
  const stripRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isOpen) return;
    stripRef.current
      ?.querySelector('[data-current="true"]')
      ?.scrollIntoView({ block: "nearest", inline: "center" });
  }, [isOpen, openAt]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className={SURFACE}>
        {photo ? (
          <>
            {/*
              A dialog needs a name. The photograph's own description is the
              truest one available, and it changes as you move, so a screen
              reader is told which photograph it is looking at now rather than
              just "gallery".
            */}
            <DialogTitle className="sr-only">{photo.alt}</DialogTitle>

            {/*
              The photograph takes whatever height is left, and the strip below
              is pinned. `min-h-0` is what makes that true: a flex child will
              not shrink below its content without it, so the image would push
              the strip off the bottom instead of fitting above it.

              This replaced a fixed 980x700 frame. That frame letterboxed every
              photo that was not 1.4:1 - 560px of empty bars on the tallest of
              the nine - and because the loading background sat on the image
              itself, those bars rendered as visible panels rather than as
              nothing. It also moved the strip up and down between photographs,
              because the frame's height varied with each one.
            */}
            <div className="relative flex min-h-0 w-full max-w-[1200px] flex-1 self-center">

              {/*
                The width is definite and comes from here, not from the image.
                Left to `w-auto` the image computed to 0x0 and took the dialog's
                height down with it: Tailwind's preflight sets `height: auto` on
                every img, and with both axes auto inside a popup that is itself
                sized by its content there is nothing to resolve against.
              */}
              {/*
                Swipe, hand-rolled on pointer events.

                Three rules, and the middle one is the whole reason this is not
                four lines: a drag that is mostly vertical is the visitor
                scrolling, not swiping, so it is ignored rather than swallowed.
                The threshold is a distance, not a velocity, because a slow
                deliberate drag should count and a twitch should not.

                `embla-carousel-react` would bring momentum and rubber-banding
                at the ends. If this ever feels cheap next to it on a real
                phone, that library is the answer and it is a separate decision
                with its own permission - not something to slip in here.
              */}
              {/*
                `relative`, with the photograph absolutely placed inside it.

                `max-h-full` on a flex child does not clamp: a percentage
                max-height resolves against a parent with a definite height, and
                a flex item's height is not that. The tallest photograph came out
                1037x1728 inside a 900px gap and simply overflowed. Against an
                absolutely positioned box with `inset-0` the percentage has
                something real to resolve against, and `m-auto` centres what is
                left over.
              */}
              <div
                className="relative min-h-0 min-w-0 flex-1 touch-pan-y"
                onPointerDown={(event) => {
                  dragFrom.current = { x: event.clientX, y: event.clientY };
                }}
                onPointerUp={(event) => {
                  const from = dragFrom.current;
                  dragFrom.current = null;
                  if (!from) return;
                  const dx = event.clientX - from.x;
                  const dy = event.clientY - from.y;
                  if (Math.abs(dx) < 45) return;
                  if (Math.abs(dy) > Math.abs(dx)) return;
                  step(dx < 0 ? 1 : -1);
                }}
                onPointerCancel={() => {
                  dragFrom.current = null;
                }}
              >
                <Photo
                  /*
                   * Keyed on the path so React swaps the element rather than
                   * mutating one in place. Without it the previous photograph
                   * stays on screen until the new file has downloaded, which
                   * reads as the control having done nothing.
                   */
                  key={photo.imagekitPath}
                  path={photo.imagekitPath}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes={SIZES}
                  /*
                   * Eager, because this is the one photograph the visitor has
                   * just asked for. It mounts already in the viewport, so the
                   * lazy default left it never starting at all: no
                   * `currentSrc`, nothing drawn, an empty frame behind the
                   * overlay.
                   */
                  priority
                  /*
                   * Both axes auto, bounded by the space available. The box
                   * then takes the photograph's own proportions, so there is no
                   * letterbox to fill and the image is as large as it can be in
                   * either direction.
                   *
                   * `bg-shot` was here as the loading state and had to go: with
                   * a fixed frame and `object-contain` it painted the letterbox
                   * bars rather than the photograph's own footprint, which was
                   * worse than the empty space it was meant to cover.
                   */
                  className="absolute inset-0 m-auto h-auto max-h-full w-auto max-w-full rounded-lg object-contain"
                />
              </div>

            </div>

            {/*
              Announced on its own, because for a screen reader moving between
              photographs changes the dialog's name and nothing else - there is
              no cue that this is three of nine rather than a different dialog.
            */}
            {/* Pinned below the photograph, so it stops moving between shots. */}
            <div className="flex shrink-0 flex-col items-center gap-1.5">
              <div className="flex items-center gap-4">
                {total > 1 ? (
                  <button
                    type="button"
                    aria-label={labels.previous}
                    onClick={() => step(-1)}
                    className={CONTROL}
                  >
                    <ChevronLeft aria-hidden="true" className="size-[18px]" />
                  </button>
                ) : null}

                <p
                  role="status"
                  aria-live="polite"
                  className="min-w-[88px] text-center text-[12px] text-ink-faint"
                >
                  {labels.position
                    .replace("{current}", String(position + 1))
                    .replace("{total}", String(total))}
                </p>

                {total > 1 ? (
                  <button
                    type="button"
                    aria-label={labels.next}
                    onClick={() => step(1)}
                    className={CONTROL}
                  >
                    <ChevronRight aria-hidden="true" className="size-[18px]" />
                  </button>
                ) : null}
              </div>

              {total > 1 ? (
                <div
                  ref={stripRef}
                  className="flex max-w-full gap-2 overflow-x-auto px-1 pb-1"
                >
                {sequence.map((photoIndex) => {
                  const thumb = photos[photoIndex];
                  const current = photoIndex === openAt;
                  return (
                    <button
                      key={thumb.imagekitPath}
                      type="button"
                      data-current={current}
                      aria-current={current ? "true" : undefined}
                      aria-label={thumb.alt}
                      onClick={() => onMove(photoIndex)}
                      className={`size-[58px] shrink-0 overflow-hidden rounded-md border-2 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
                        current
                          ? "border-white/80 opacity-100"
                          : "border-transparent opacity-55 hover:opacity-90"
                      }`}
                    >
                      <Photo
                        path={thumb.imagekitPath}
                        alt=""
                        width={thumb.width}
                        height={thumb.height}
                        sizes={THUMB_SIZES}
                        className="size-full object-cover"
                      />
                    </button>
                  );
                  })}
                </div>
              ) : null}
            </div>

            {/*
              Focus is moved by a callback ref on the button itself.

              Two other routes were tried and measured as doing nothing: the
              popup's `initialFocus`, and a `useRef` with an effect. In both,
              with the lightbox open on screen, `document.activeElement` was
              still the grid tile underneath - while focusing that same button
              by hand stuck for as long as it was left alone. So the ref was
              never reaching the node, and nothing was stealing focus back.

              `render` is what hands base-ui's own props to an element we own,
              which is the only way a ref of ours lands on a real button.

              This matters more than it looks: without it a keyboard visitor has
              the photograph in front of them while Tab is still walking the
              page behind it.
            */}
            <DialogClose
              render={
                <button
                  ref={(node) => node?.focus()}
                  type="button"
                  aria-label={labels.close}
                  className={CLOSE}
                />
              }
            >
              {labels.close}
            </DialogClose>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
