"use client";

import { useState } from "react";

import { NailShape, type NailShapeKind } from "@/components/home/NailShape";
import { Photo } from "@/components/media/Photo";
import { formatPrice } from "@/lib/format";

export type BuilderOption = { key: string; label: string; price?: number; from?: boolean };

export type BuilderCopy = {
  base: string;
  shape: string;
  finish: string;
  total: string;
  book: string;
  note: string;
  from: string;
  closest: string;
};

// One of her real sets, tagged with the finish it shows and its shape.
export type BuilderPhoto = { key: string; finish: string; shape: string; path: string; width: number; height: number };

/* Each finish painted like the nail guide's swatch (globals.css). */
const PAINT: Record<string, string> = {
  chrome: "swatch-chrome",
  french: "swatch-french",
  catEye: "swatch-cat-eye",
  sparkle: "swatch-sparkle",
  art: "swatch-art",
};

function Chips({
  label,
  options,
  value,
  onChange,
  marker,
}: {
  label: string;
  options: BuilderOption[];
  value: string;
  onChange: (key: string) => void;
  marker?: (key: string) => React.ReactNode;
}) {
  return (
    <fieldset className="mb-7">
      <legend className="eyebrow mb-5">
        {label}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const on = option.key === value;
          return (
            <button
              key={option.key}
              type="button"
              aria-pressed={on}
              onClick={() => onChange(option.key)}
              className={`flex items-center gap-2.5 rounded-pill px-4 py-2.5 text-[14px] font-semibold transition-[background-color,border-color,color,translate] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring border-2 border-line ${on ? "bg-[image:var(--hot)] text-on-hot shadow-[3px_3px_0_var(--shadow)]" : "text-ink hover:bg-surface-2"}`}
            >
              {marker ? marker(option.key) : null}
              {option.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

/**
 * Build your set: pick a base, a shape and a finish, and her real set closest
 * to it shows while the starting price adds up from the nails menu. The
 * picture is decorative; the chosen options and the price are text.
 */
export function SetBuilder({
  bases,
  shapes,
  finishes,
  addOnFor,
  copy,
  bookLinks,
  photos,
}: {
  bases: BuilderOption[];
  shapes: BuilderOption[];
  finishes: BuilderOption[];
  // The add-on each finish is booked as, by finish key, with its price.
  addOnFor: Record<string, BuilderOption>;
  copy: BuilderCopy;
  // Per base: the booking URL and the attributes that open Cal's popup.
  bookLinks: Record<string, { href: string; attrs: Record<string, string> }>;
  photos: BuilderPhoto[];
}) {
  const [base, setBase] = useState(bases[1]?.key ?? bases[0].key);
  const [shape, setShape] = useState(shapes[0].key as NailShapeKind);
  const [finish, setFinish] = useState(finishes[1]?.key ?? finishes[0].key);

  const baseOption = bases.find((option) => option.key === base) ?? bases[0];
  const addOn = addOnFor[finish];
  const total = (baseOption.price ?? 0) + (addOn?.price ?? 0);
  const from = Boolean(baseOption.from || addOn?.from);
  const link = bookLinks[base];
  const photo =
    photos.find((p) => p.finish === finish && p.shape === shape) ?? photos.find((p) => p.finish === finish);

  return (
    <div className="grid items-center gap-10 min-[960px]:grid-cols-[1.05fr_1fr] min-[960px]:gap-16">
      {/* Her real set closest to the picks: remounted on every change so it settles in again. */}
      <div
        aria-hidden="true"
        className="relative aspect-[4/5] overflow-hidden rounded-[28px] border-2 border-line bg-shot shadow-[10px_10px_0_var(--shadow)] max-[960px]:mx-auto max-[960px]:w-full max-[960px]:max-w-[420px]"
      >
        {photo ? (
          <div key={photo.key} className="lift-rise absolute inset-0">
            <Photo
              path={photo.path}
              alt=""
              width={photo.width}
              height={photo.height}
              sizes="(min-width: 960px) 560px, 420px"
              className="block h-full w-full object-cover"
            />
          </div>
        ) : null}
        <span className="absolute top-4 left-4 -rotate-6 rounded-pill border-2 border-[color:var(--brand-ink)] bg-[color:var(--brand-sticker)] px-4 py-2 text-[13px] font-bold text-[color:var(--brand-ink)] shadow-[3px_3px_0_var(--brand-ink)]">
          {copy.closest}
        </span>
        <span className="absolute right-4 bottom-4 flex items-center gap-2 rounded-pill border-2 border-[color:var(--brand-ink)] bg-white px-4 py-2 text-[14px] font-bold text-[color:var(--brand-ink)] shadow-[3px_3px_0_var(--brand-ink)]">
          <span className="-my-2 scale-75">
            <NailShape kind={shape} />
          </span>
          {shapes.find((option) => option.key === shape)?.label} · {finishes.find((option) => option.key === finish)?.label}
        </span>
      </div>

      <div>
        <Chips label={copy.base} options={bases} value={base} onChange={setBase} />
        <Chips
          label={copy.shape}
          options={shapes}
          value={shape}
          onChange={(key) => setShape(key as NailShapeKind)}
          marker={(key) => (
            <span className="-my-2 scale-75">
              <NailShape kind={key as NailShapeKind} />
            </span>
          )}
        />
        <Chips
          label={copy.finish}
          options={finishes}
          value={finish}
          onChange={setFinish}
          marker={(key) => (
            <span
              aria-hidden="true"
              className={`size-4 rounded-full border border-[color:var(--brand-ink)] ${PAINT[key] ?? ""}`}
            />
          )}
        />

        <div className="flex flex-wrap items-end justify-between gap-5 border-t border-line pt-6">
          <p aria-live="polite">
            <span className="block text-[13px] font-semibold text-ink-muted">{copy.total}</span>
            <span className="font-display text-[56px] leading-none font-extrabold tracking-[-0.04em]">
              {from ? (
                <>
                  <span className="font-body text-[15px] font-semibold text-ink-faint">{copy.from}</span>{" "}
                </>
              ) : null}
              <span className="bg-[image:var(--hot-text)] bg-clip-text text-transparent">
                {formatPrice(total)}
              </span>
            </span>
            <span className="mt-1 block text-[13px] text-ink-faint">
              {baseOption.label}
              {addOn ? ` + ${addOn.label}` : ""}
            </span>
          </p>
          {link ? (
            <a
              href={link.href}
              {...link.attrs}
              className="hover-glow rounded-pill bg-[image:var(--hot)] px-7 py-4 text-center text-[15px] font-bold text-on-hot focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {copy.book}
            </a>
          ) : null}
        </div>
        <p className="mt-4 text-[13px] text-ink-faint">{copy.note}</p>
      </div>
    </div>
  );
}
