"use client";

import { useId, useState } from "react";

import { NAIL_PATHS, NailShape, type NailShapeKind } from "@/components/home/NailShape";
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
};

/* Each finish painted like the nail guide's swatch (globals.css). */
const PAINT: Record<string, string> = {
  chrome: "swatch-chrome",
  french: "swatch-french",
  catEye: "swatch-cat-eye",
  sparkle: "swatch-sparkle",
  art: "swatch-art",
};

/* Five fingers, thumb to little finger: each nail's width, length and lift. */
const HAND = [
  { w: 92, h: 128, y: 60, r: -14 },
  { w: 80, h: 160, y: 12, r: -6 },
  { w: 82, h: 176, y: 0, r: 0 },
  { w: 78, h: 162, y: 10, r: 6 },
  { w: 64, h: 132, y: 44, r: 13 },
];

function Nail({
  shape,
  finish,
  index,
  w,
  h,
}: {
  shape: NailShapeKind;
  finish: string;
  index: number;
  w: number;
  h: number;
}) {
  const id = useId();
  return (
    <svg viewBox="0 0 40 66" width={w} height={h} preserveAspectRatio="none" className="overflow-visible">
      <defs>
        <clipPath id={id}>
          <path d={NAIL_PATHS[shape]} />
        </clipPath>
      </defs>
      <foreignObject x="0" y="0" width="40" height="66" clipPath={`url(#${id})`}>
        <div className={`h-full w-full ${PAINT[finish] ?? "bg-[image:var(--hot)]"}`} />
      </foreignObject>
      {/* The gel's shine, then a fine edge. */}
      <path
        d="M11 52V26c0-7 2-12 5-15"
        fill="none"
        stroke="white"
        strokeOpacity={0.55}
        strokeWidth={2.4}
        strokeLinecap="round"
        style={{ opacity: index === 2 ? 1 : 0.8 }}
      />
      <path d={NAIL_PATHS[shape]} fill="none" stroke="white" strokeOpacity={0.3} strokeWidth={0.8} />
    </svg>
  );
}

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
      <legend className="eyebrow font-body mb-3 text-[11px] font-semibold tracking-[0.18em] text-ink-faint uppercase">
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
              className={`flex items-center gap-2.5 rounded-pill border px-4 py-2.5 text-[14px] font-semibold transition-[background-color,border-color,color,translate] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${on ? "border-transparent bg-[image:var(--hot)] text-on-hot" : "border-line text-ink hover:border-ink-muted"}`}
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
 * Build your set: pick a base, a shape and a finish, and a hand of five nails
 * redraws in them while the starting price adds up from the nails menu. The
 * picture is decorative; the chosen options and the price are text.
 */
export function SetBuilder({
  bases,
  shapes,
  finishes,
  addOnFor,
  copy,
  bookLinks,
}: {
  bases: BuilderOption[];
  shapes: BuilderOption[];
  finishes: BuilderOption[];
  // The add-on each finish is booked as, by finish key, with its price.
  addOnFor: Record<string, BuilderOption>;
  copy: BuilderCopy;
  // Per base: the booking URL and the attributes that open Cal's popup.
  bookLinks: Record<string, { href: string; attrs: Record<string, string> }>;
}) {
  const [base, setBase] = useState(bases[1]?.key ?? bases[0].key);
  const [shape, setShape] = useState(shapes[0].key as NailShapeKind);
  const [finish, setFinish] = useState(finishes[1]?.key ?? finishes[0].key);

  const baseOption = bases.find((option) => option.key === base) ?? bases[0];
  const addOn = addOnFor[finish];
  const total = (baseOption.price ?? 0) + (addOn?.price ?? 0);
  const from = Boolean(baseOption.from || addOn?.from);
  const link = bookLinks[base];

  return (
    <div className="grid items-center gap-10 min-[960px]:grid-cols-[1.05fr_1fr] min-[960px]:gap-16">
      {/* The hand: remounted on every pick so the nails pop in again. */}
      <div
        aria-hidden="true"
        className="relative grid min-h-[440px] place-items-center overflow-hidden rounded-[32px] bg-[radial-gradient(circle_at_50%_85%,#ffc2dc,#fbe6ef_55%,#f6dce8)] px-4 pt-14 pb-16 shadow-[0_40px_80px_-40px_rgba(255,61,143,0.5)] max-[560px]:min-h-[320px]"
      >
        <div key={`${shape}-${finish}`} className="flex items-end justify-center gap-4 drop-shadow-[0_18px_18px_rgba(120,30,80,0.3)] max-[560px]:[zoom:0.6]">
          {HAND.map((finger, index) => (
            <div
              key={index}
              style={{ translate: `0 ${finger.y}px`, rotate: `${finger.r}deg` }}
            >
              {/* Its own box: lift-rise animates translate, which would undo the finger's. */}
              <div className="lift-rise" style={{ "--i": index } as React.CSSProperties}>
                <Nail shape={shape} finish={finish} index={index} w={finger.w} h={finger.h} />
              </div>
            </div>
          ))}
        </div>
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
              className={`size-4 rounded-full ring-1 ring-white/30 ${PAINT[key] ?? ""}`}
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
