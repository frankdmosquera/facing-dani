import { Band, BandHead, Hot, type Tone } from "@/components/site/Band";
import { treatmentLabel, treatmentsFor } from "@/data/treatments";
import { galleryImage, type GalleryKey } from "@/data/gallery";
import type { Dictionary } from "@/dictionaries";
import { bookingHref, bookingTrigger, eventSlug } from "@/lib/bookingConfig";

import { SetBuilder, type BuilderOption, type BuilderPhoto } from "./SetBuilder";

/* Her real sets, each tagged with the finish it shows and its shape. The
   builder shows the one matching both picks, or the finish alone. */
const SETS: { key: GalleryKey; finish: string; shape: string }[] = [
  { key: "almondBowFrench", finish: "french", shape: "almond" },
  { key: "heartsFrench", finish: "french", shape: "square" },
  { key: "peachFrenchGems", finish: "french", shape: "oval" },
  { key: "lilacSquare", finish: "chrome", shape: "square" },
  { key: "burgundyCatEye", finish: "catEye", shape: "almond" },
  { key: "whiteGlitterSquare", finish: "sparkle", shape: "square" },
  { key: "frenchGlitterGems", finish: "sparkle", shape: "almond" },
  { key: "clearCoffinLinework", finish: "art", shape: "coffin" },
  { key: "pinkBlackStars", finish: "art", shape: "square" },
  { key: "pinkFloralArt", finish: "art", shape: "oval" },
];

// The full sets a look is built on, from the nails menu.
const BASES = ["gelManicure", "acrylicFullSet", "gelXFullSet"] as const;

/* The add-on each finish is booked as. The gallery's style notes say the
   same: cat-eye goes with chrome, glitter and crystals with nail art. */
const ADD_ON: Record<string, "french" | "chrome" | "nailArt"> = {
  french: "french",
  chrome: "chrome",
  catEye: "chrome",
  sparkle: "nailArt",
  art: "nailArt",
};

export function SetBuilderBand({ t, tone = "ink" }: { t: Dictionary; tone?: Tone }) {
  const c = t.home.builder;
  const guide = t.home.guide.columns;
  const rows = treatmentsFor("nails");
  const row = (key: string) => rows.find((r) => r.key === key);

  const option = (key: (typeof rows)[number]["key"]): BuilderOption => ({
    key,
    label: treatmentLabel(t, "nails", key),
    price: row(key)?.priceCad,
    from: row(key)?.from,
  });

  const bases = BASES.map(option);
  const shapes = Object.entries(guide.shapes.items).map(([key, item]) => ({ key, label: item.term }));
  const finishes = Object.entries(guide.finishes.items).map(([key, item]) => ({ key, label: item.term }));
  const addOnFor = Object.fromEntries(
    Object.entries(ADD_ON).map(([finish, key]) => [finish, option(key)]),
  );
  const bookLinks = Object.fromEntries(
    BASES.map((key) => {
      const slug = eventSlug("nails", key);
      return [key, { href: bookingHref(slug), attrs: bookingTrigger(slug) }];
    }),
  );

  const photos: BuilderPhoto[] = SETS.flatMap((set) => {
    const image = galleryImage(set.key);
    return image
      ? [{ ...set, path: image.imagekitPath, width: image.width, height: image.height }]
      : [];
  });

  return (
    <Band tone={tone}>
      <BandHead
        eyebrow={c.eyebrow}
        heading={
          <>
            {c.headingLead} <Hot>{c.headingAccent}</Hot>
          </>
        }
        lede={c.lede}
      />
      <SetBuilder
        bases={bases}
        shapes={shapes}
        finishes={finishes}
        addOnFor={addOnFor}
        bookLinks={bookLinks}
        photos={photos}
        copy={{
          base: c.base,
          shape: c.shape,
          finish: c.finish,
          total: c.total,
          book: c.book,
          note: c.note,
          closest: c.closest,
          from: t.treatmentList.priceFrom,
        }}
      />
    </Band>
  );
}
