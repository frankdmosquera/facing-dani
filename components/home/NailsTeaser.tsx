import Link from "next/link";

import { Photo } from "@/components/media/Photo";
import { Band, BandHead, Hot } from "@/components/site/Band";
import { HOME_HERO, orderedGallery } from "@/data/gallery";
import { treatmentLabel, treatmentsFor, type TreatmentRow } from "@/data/treatments";
import type { Dictionary } from "@/dictionaries";
import { formatPrice } from "@/lib/format";
import { localePath, type Locale } from "@/lib/locale";

// A teaser, not the menu: booking lives on /nails, so no Book buttons here.
const SHOWN: TreatmentRow<"nails">["key"][] = [
  "gelManicure",
  "acrylicFullSet",
  "gelXFullSet",
];

export function NailsTeaser({ locale, t }: { locale: Locale; t: Dictionary }) {
  const c = t.home.nails;

  const rows = treatmentsFor("nails").filter((row) => SHOWN.includes(row.key));

  // Not the hero's photo, which is right above.
  const cover = orderedGallery().find(
    (image) => image.serviceId === "nails" && image.key !== HOME_HERO,
  );

  return (
    <Band tinted glow={false}>
      <div className="flex flex-col gap-10 min-[860px]:flex-row min-[860px]:items-center min-[860px]:gap-14">
        {cover ? (
          <div className="overflow-hidden rounded-xl border border-line-soft bg-shot min-[860px]:w-[380px] min-[860px]:shrink-0">
            <Photo
              path={cover.imagekitPath}
              alt={t.gallery.images[cover.key]}
              width={cover.width}
              height={cover.height}
              sizes="(min-width: 860px) 380px, 100vw"
              className="block h-auto w-full"
            />
          </div>
        ) : null}

        <div className="min-w-0 min-[860px]:flex-1">
          <BandHead
            eyebrow={c.eyebrow}
            heading={
              <>
                {c.headingLead} <Hot>{c.headingAccent}</Hot>
              </>
            }
            lede={c.lede}
          />

          <dl className="mb-5 max-w-[46ch]">
            {rows.map((row) => (
              <div
                key={row.key}
                className="flex items-baseline justify-between gap-6 border-b border-line-soft py-3"
              >
                <dt className="text-[16px] font-medium text-ink">
                  {treatmentLabel(t, "nails", row.key)}
                </dt>
                <dd className="shrink-0 font-display text-[16px] font-extrabold tracking-[-0.03em] text-ink">
                  {/* The {" "} is needed, or screen readers read "From$5". */}
                  {row.from ? (
                    <>
                      <span className="font-body text-[12.5px] font-semibold text-ink-faint">
                        {t.treatmentList.priceFrom}
                      </span>{" "}
                    </>
                  ) : null}
                  {formatPrice(row.priceCad)}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mb-6 text-[13.5px] text-ink-faint">{c.addOns}</p>

          <Link
            href={localePath(locale, "/nails")}
            className="inline-flex items-center gap-2 text-[15px] font-bold text-nails focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {c.more}
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </Band>
  );
}
