import Link from "next/link";

import { Band, BandHead, Hot } from "@/components/site/Band";
import { treatmentLabel, treatmentsFor } from "@/data/treatments";
import type { Dictionary } from "@/dictionaries";
import { formatPrice } from "@/lib/format";
import { localePath, type Locale } from "@/lib/locale";

type StyleKey = keyof Dictionary["gallery"]["styles"]["groups"];
type NailKey = keyof Dictionary["services"]["nails"]["treatments"];

// The add-on each nail style is booked as. Makeup has none on purpose.
const ADD_ON: Partial<Record<StyleKey, NailKey>> = {
  french: "french",
  chrome: "chrome",
  art: "nailArt",
  sparkle: "nailArt",
};

// Words for a page that is otherwise all photos. Every style named here is in the grid above; keep it that way.
export function GalleryStyles({ locale, t }: { locale: Locale; t: Dictionary }) {
  const c = t.gallery.styles;
  const nails = treatmentsFor("nails");

  return (
    <Band tinted glow={false}>
      <BandHead
        eyebrow={c.eyebrow}
        heading={
          <>
            {c.headingLead} <Hot>{c.headingAccent}</Hot>
          </>
        }
        lede={c.lede}
      />

      <dl className="grid gap-x-10 gap-y-7 min-[760px]:grid-cols-2">
        {Object.entries(c.groups).map(([key, group]) => {
          const addOnKey = ADD_ON[key as StyleKey];
          const row = nails.find((r) => r.key === addOnKey);

          return (
            <div key={key}>
              <dt className="mb-1.5 text-[17px] font-semibold text-ink">{group.title}</dt>
              <dd className="max-w-[52ch] text-[15px] text-ink-muted">
                {group.body}
                {row ? (
                  <Link
                    href={localePath(locale, "/nails")}
                    className="mt-2.5 block w-fit text-[13.5px] font-semibold text-ink transition-colors hover:text-nails focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    {c.bookAs} {treatmentLabel(t, "nails", row.key)} &middot;{" "}
                    {row.from ? `${t.treatmentList.priceFrom} ` : ""}
                    {formatPrice(row.priceCad)}
                    <span aria-hidden="true"> &rarr;</span>
                  </Link>
                ) : null}
              </dd>
            </div>
          );
        })}
      </dl>
    </Band>
  );
}
