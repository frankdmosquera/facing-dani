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

export type LightboxPhoto = {
  imagekitPath: string;
  serviceId: ServiceId;
  alt: string;
  width: number;
  height: number;
  // Set on stock photos, so they never read as her work at full size either.
  tag?: string;
};

export type LightboxLabels = {
  close: string;
  previous: string;
  next: string;
  // Contains literal {current} and {total}.
  position: string;
};

const SIZES = "(min-width: 1024px) 90vw, 100vw";

const THUMB_SIZES = "72px";

// translate-none and transform-none are both needed: Tailwind v4 puts translate in its own property.
// Sides are zeroed by name because tailwind-merge does not let inset-0 override the primitive's top/left.
const SURFACE =
  "on-dark top-0 right-0 bottom-0 left-0 flex h-auto max-h-none w-auto max-w-none translate-none transform-none flex-col gap-2 rounded-none border-0 bg-[rgba(14,9,20,0.94)] p-2 ring-0 duration-0 data-closed:animate-none data-open:animate-none sm:p-3 sm:max-w-none";

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
  // Indices into photos for the pressed filter, so next and previous skip hidden photos.
  sequence: number[];
  openAt: number | null;
  onOpenChange: (open: boolean) => void;
  onMove: (nextIndex: number) => void;
  labels: LightboxLabels;
}) {
  const photo = openAt === null ? undefined : photos[openAt];

  const position = openAt === null ? -1 : sequence.indexOf(openAt);
  const total = sequence.length;

  // Wraps at both ends.
  const step = useCallback(
    (delta: number) => {
      if (position < 0 || total === 0) return;
      const next = (position + delta + total) % total;
      onMove(sequence[next]);
    },
    [position, total, sequence, onMove],
  );

  // On the document, so the arrows work wherever focus is inside the dialog.
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

  const dragFrom = useRef<{ x: number; y: number } | null>(null);

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
            <DialogTitle className="sr-only">{photo.alt}</DialogTitle>

            {/* min-h-0 lets the photo shrink so the strip below stays on screen. */}
            <div className="relative flex min-h-0 w-full max-w-[1200px] flex-1 self-center">

              {/* Swipe: ignores mostly-vertical drags so scrolling still works. */}
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
                  // Swaps the element, so the old photo does not linger while the new one loads.
                  key={photo.imagekitPath}
                  path={photo.imagekitPath}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes={SIZES}
                  // Lazy loading never starts an image that mounts inside the dialog.
                  priority
                  // Absolute + object-contain so it grows to fit. max-h-full/w-auto only ever shrinks it.
                  className="absolute inset-0 size-full rounded-lg object-contain"
                />
              </div>

            </div>

            <div className="flex shrink-0 flex-col items-center gap-1.5">
              {photo.tag ? (
                <span className="rounded-pill border border-white/15 bg-[rgba(20,15,28,.78)] px-3 py-1 text-[11px] font-semibold tracking-[0.13em] text-ink-muted uppercase">
                  {photo.tag}
                </span>
              ) : null}
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

            {/* Focus via a callback ref through `render`. initialFocus and useRef both failed to land it. */}
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
