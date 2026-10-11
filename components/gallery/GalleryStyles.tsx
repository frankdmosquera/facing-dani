import Link from "next/link";

import { Photo } from "@/components/media/Photo";
import { Band, BandHead, Hot } from "@/components/site/Band";
import { galleryImage, type GalleryKey } from "@/data/gallery";
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
// The photo each family's description is written about, beside it.
const PHOTO: Partial<Record<StyleKey, GalleryKey>> = {
  french: "blueFrenchFloral",
  chrome: "burgundyCatEye",
  art: "pinkBlackStars",
  sparkle: "pinkFrenchCrystals",
  makeup: "blueGraphicEyeProfile",
};

export function GalleryStyles({
  locale,
  t,
}: {
  locale: Locale;
  t: Dictionary;
}) {
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

      <dl className="reveal grid gap-5 min-[760px]:grid-cols-2">
        {Object.entries(c.groups).map(([key, group]) => {
          const addOnKey = ADD_ON[key as StyleKey];
          const row = nails.find((r) => r.key === addOnKey);

          const photoKey = PHOTO[key as StyleKey];
          const photo = photoKey ? galleryImage(photoKey) : undefined;

          return (
            <div
              key={key}
              className="card-hot flex gap-5 rounded-xl border border-line bg-surface p-5"
            >
              {photo ? (
                <div className="aspect-[4/5] w-24 shrink-0 overflow-hidden rounded-lg bg-shot min-[560px]:w-28">
                  <Photo
                    path={photo.imagekitPath}
                    alt=""
                    width={photo.width}
                    height={photo.height}
                    sizes="112px"
                    className="block h-full w-full object-cover"
                  />
                </div>
              ) : null}
              <div className="min-w-0">
                <dt className="mb-1.5 text-[18px] font-semibold text-ink">
                  {group.title}
                </dt>
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
            </div>
          );
        })}
      </dl>
    </Band>
  );
}
