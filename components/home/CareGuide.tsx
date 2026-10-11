import { Ban, CalendarClock, Droplet, Hand, TriangleAlert, type LucideIcon } from "lucide-react";
import Link from "next/link";

import { NailShape, isNailShape } from "@/components/home/NailShape";

import { Band, BandHead, Hot } from "@/components/site/Band";
import type { Dictionary } from "@/dictionaries";
import { localePath, type Locale } from "@/lib/locale";

// The home page's long-form block: general nail knowledge, no claims about her. It is what keeps home from being thin.
/* What sits beside each term: a silhouette for a shape, a painted swatch for a
   finish, an icon for an aftercare rule. Keyed by the dictionary's item keys. */
const SWATCH: Record<string, string> = {
  chrome: "swatch-chrome",
  french: "swatch-french",
  catEye: "swatch-cat-eye",
  sparkle: "swatch-sparkle",
  art: "swatch-art",
};
const CARE_ICON: Record<string, LucideIcon> = {
  oil: Droplet,
  gloves: Hand,
  tools: Ban,
  lifting: TriangleAlert,
  fills: CalendarClock,
};

function Marker({ itemKey }: { itemKey: string }) {
  if (isNailShape(itemKey)) return <NailShape kind={itemKey} />;
  const swatch = SWATCH[itemKey];
  if (swatch) {
    return (
      <span
        aria-hidden="true"
        className={`h-12 w-8 shrink-0 rounded-t-full rounded-b-md ring-1 ring-white/20 ${swatch}`}
      />
    );
  }
  const Icon = CARE_ICON[itemKey];
  if (Icon) {
    return (
      <span
        aria-hidden="true"
        className="grid size-10 shrink-0 place-items-center rounded-full bg-surface-2 text-nails"
      >
        <Icon className="size-[18px]" strokeWidth={2} />
      </span>
    );
  }
  return null;
}

export function CareGuide({ locale, t }: { locale: Locale; t: Dictionary }) {
  const c = t.home.guide;

  return (
    <Band glow={false}>
      <BandHead
        eyebrow={c.eyebrow}
        heading={
          <>
            {c.headingLead} <Hot>{c.headingAccent}</Hot>
          </>
        }
        lede={c.lede}
      />

      <div className="reveal grid gap-4 min-[900px]:grid-cols-3 min-[900px]:gap-5">
        {Object.entries(c.columns).map(([key, column]) => (
          <div
            key={key}
            className="flex flex-col card-hot rounded-xl border border-line bg-surface p-5"
          >
            <h3 className="mb-4 text-[20px]">{column.heading}</h3>
            <dl className="flex flex-col gap-4">
              {Object.entries(column.items).map(([itemKey, item]) => (
                <div key={itemKey} className="flex items-start gap-4">
                  <Marker itemKey={itemKey} />
                  <div>
                    <dt className="text-[15px] font-semibold text-ink">{item.term}</dt>
                    <dd className="mt-0.5 text-[14px] text-ink-muted">{item.text}</dd>
                  </div>
                </div>
              ))}
            </dl>

            {key === "care" ? (
              <Link
                href={localePath(locale, "/store")}
                className="mt-5 inline-flex items-center gap-2 text-[14px] font-bold text-nails focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                {c.storeLink}
                <span aria-hidden="true">&rarr;</span>
              </Link>
            ) : null}
          </div>
        ))}
      </div>
    </Band>
  );
}
