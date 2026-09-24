# Feature: Her Drive photos in the gallery

**From build-plan:** feature 18

**Branch:** `feature/her-drive-photos-in-the-gallery`

**Status:** verified

## Goal

Add nine more of Dani's own nail sets to the gallery, taking it from 9 to 18.
Frank picked them on 2026-09-23 from the full contents of her Drive folder and
called the crops himself on a 10% grid. It is her work, so it goes in as
ordinary `GalleryImage` records with alt text in both languages. No new UI.

## In scope

- Upload the nine prepared files to ImageKit under `facing-dani/nails/`.
- Nine records in `data/gallery.ts`, appended after the current nine.
- Alt text for each one in `dictionaries/en.ts` and `dictionaries/es.ts`.
- Update the `data/gallery.ts` header, which currently says "Nine nail sets and
  nothing else" and cites only the 72-photo batch.

## Out of scope

- **Which photo leads the home page and a nails hero.** That is the next item.
  New records go in at orders 10 to 18, so the home hero, the first four eager
  tiles, the home teaser and the nails work strip look exactly as they do now.
- Makeup and lash photos. Every makeup shot in her folder shows a client's
  whole face and stays out until the clients are asked. There are no lash
  photos.
- Any UI change. The gallery, filters, lightbox, JSON-LD and service strips
  already read `data/gallery.ts`.

## Build loop

`workflow.stepReview` is `feature`: build the steps in order and stop for
Frank's review once, at the end. `checkpointCommits` is `disabled`, so there
are no commits during the build. `/complete` creates the feature commit.

Approving this spec also approves the upload in step 18.1: nine files to the
project's ImageKit library. The crops are already made. They were cut on
2026-09-23 in the session scratchpad from her originals, and the re-encode
removed all EXIF, including the GPS her phone writes.

## Build steps

- [x] **18.1 Upload.** Rename the nine files in the scratchpad `her/cut/` to
  the slugs below, into a staging folder `nails/`. P26 goes in as the
  brightened version. Run `scripts/uploadImagesToImageKit.mjs` with
  `--dry-run`, then for real, into `nails`. These are new paths, so
  `MEDIA_VERSION` stays as it is.
  **Done when:** all nine URLs return 200 from `<endpoint>/nails/<slug>.jpg`,
  and none of the uploaded files carries EXIF or a GPS tag.
- [x] **18.2 Records and alt text.** Add the nine alt strings to
  `gallery.images` in `en.ts` first, then `es.ts`. Append the nine records to
  `data/gallery.ts` at orders 10 to 18, with the real pixel sizes below, and
  update the header comment.
  **Done when:**
  - `npm run lint` and `npm run build` pass.
  - The built `/gallery` and `/es/gallery` each carry 18 nail images, with the
    nails chip reading 18.
  - The built home page's first image is still `french-glitter-gems`.
- [x] **18.3 Look at it.** Open the pages on the dev server.
  **Done when:** all of the following were observed in a browser:
  - `/gallery` at 375px and 1280px shows 18 tiles with no horizontal overflow.
  - The lightbox steps through all 18.
  - `/es/gallery` shows the Spanish alt text in the lightbox.
  - `/nails` and `/` look unchanged.

## Files / areas

- `data/gallery.ts`: nine records, rewritten header
- `dictionaries/en.ts`, `dictionaries/es.ts`: nine alt strings each, under
  `gallery.images`
- Not touched: every component, `lib/schema.ts` (its gallery JSON-LD picks the
  new records up by itself), `lib/imagekit.ts`

## Data / contracts

| Sheet code | Key | ImageKit path | Width x height |
|---|---|---|---|
| P11 | `christmasShortSet` | `/nails/christmas-short-set.jpg` | 864 x 1536 |
| P18 | `whiteFlowerGoldFrench` | `/nails/white-flower-gold-french.jpg` | 605 x 986 |
| P26 (brightened) | `spiderAccentFrench` | `/nails/spider-accent-french.jpg` | 807 x 1104 |
| P40 | `heartsFrench` | `/nails/hearts-french.jpg` | 1461 x 2560 |
| P45 | `almondBowFrench` | `/nails/almond-bow-french.jpg` | 2194 x 2560 |
| P48 | `pinkFrenchCrystals` | `/nails/pink-french-crystals.jpg` | 1968 x 2560 |
| P54 | `goldLeafFrench` | `/nails/gold-leaf-french.jpg` | 1361 x 645 |
| P57 | `clearCoffinLinework` | `/nails/clear-coffin-linework.jpg` | 1920 x 2560 |
| P62 | `pinkBlackStars` | `/nails/pink-black-stars.jpg` | 2560 x 2219 |

- All nine records are `serviceId: "nails"`, at orders 10 to 18 in the table's
  order. Frank reorders when the heroes are chosen.
- **Alt text** describes the nails, never the person, in the style of the
  existing strings. The English is drafted from the crops:
  - P11: "Short nails with a red french tip, a hand-painted gift bow, a snowflake
    and a candy-cane stripe"
  - P18: "Square nails with a white french tip edged in gold, a raised white
    flower on one nail and a small gold charm on another"
  - P26: "Square nails with a white french tip, an orange accent nail with a
    painted black spider and a gold script letter on the next"
  - P40: "Short square nails with a white french tip, outlined hearts, a crystal
    cluster and an iridescent accent nail"
  - P45: "Almond nails with a white french tip, small pearls and a raised pink bow
    on one nail"
  - P48: "Square nails with a bright pink french tip, a line of crystals on one
    nail and a pink pearl-chrome accent"
  - P54: "Close-up of square nails with gold flakes, a white french tip,
    hand-painted white stars and a white leaf pattern"
  - P57: "Long clear coffin nails with fine white linework and gold swirl
    details"
  - P62: "Pink and black nails with hand-painted stars, a leopard-spot nail and
    thin french lines"
- The Spanish follows the existing vocabulary: "francesa", "almendradas",
  "cuadradas", "pintadas a mano", "cristales".

## Testing

There is no unit test runner and no Browser tests command. The gates are:

- `npm run lint` and `npm run build`
- Counts in the built HTML
- The browser pass in 18.3

## Implementation notes

- All nine uploaded under `nails/` and return 200. None carries EXIF or GPS.
- **There is no nails chip to read 18.** The spec assumed one, but
  `GalleryGrid` shows the filter row only when two or more services have
  photos, and nails is still the only one. The count was confirmed as 18
  tiles and "Photo 1 of 18" in the lightbox instead.
- The lightbox was stepped through all 18 by its Next button, in `/es`. Arrow
  keys sent from the test browser did not reach the dialog. That is a
  limitation of the harness, not a known bug, and was not investigated.
- The `data/gallery.ts` header now says orders 10 to 18 are unranked, so the
  hero item knows to rank all eighteen.

## Notes for the AI

- Every file here is CRLF. Edit with the Edit tool or a Node script, and
  measure line endings after each write.
- Adding a key to `en.ts` makes `es.ts` fail the build until it has the same
  key. That is the intended order.
- **P18, P26 and P54 come from small originals**, 605 to 1,361px wide. They
  look fine in the grid, but P18 will look soft opened full-screen in the
  lightbox. Say so in the handoff; do not upscale.
- **P11 was stored sideways by the phone** (EXIF orientation 6). The prepared
  file is already rotated upright, and Frank's crop was taken before rotating,
  so the content matches what he marked.
- Never add a makeup or lash record here without a recorded yes from the
  person in it.

## Implementation walkthrough

### Why the gallery had nine

Frank asked for "the rest of her images" several times before the cause was
found. Her Drive folder holds 106 files: 101 stills and 5 videos. The copy
that item 4 worked from, `Downloads/drive-download-20260922T004203Z-1-001`, is
only the first of the two zips Google Drive splits a large folder into. It
held 72 stills, so 29 photos were never seen. They were fetched one at a time
through the Drive connector, which saves each file as base64 JSON, and decoded
locally. Nothing was installed.

### Triage and picking

All 101 were decoded, HEIC included, through the Windows HEIF codec. Each was
looked at on numbered review sheets before Frank saw them. What the set holds:

- About 68 nail photos in about 25 distinct sets, most shot two or three
  times.
- No lash photos at all.
- Twenty-seven makeup photos, every one showing a client's whole face. One
  arm swatch has no face.
- Two elevator selfies.
- One composite that includes another artist's watermarked photo.

Frank went through several rounds of sheets, filtering out sets already live,
repeats, faces and dark or blurry shots. He kept nine and called every crop
himself on a 10% grid. **What bit:** rebuilding the sheet after each comment
confused which sheet was current. The working rule since then is to note his
picks and rebuild once, at the end of the round.

### Cropping

The crops were cut from the full-size originals with WPF's `CroppedBitmap` and
re-encoded as JPEG at quality 88, with the long edge capped at 2560. The
re-encode matters: her phone writes GPS into every original, and none survives
in the uploaded files.

- **What bit, twice:** PowerShell variables are case-insensitive, so `$W` and
  `$w` in the crop script were the same variable. The crops themselves were
  right, because each value was computed before the overwrite, but the logged
  sizes were wrong until the files were measured directly.
- **P11 was stored sideways** (EXIF orientation 6). WPF does not apply EXIF
  rotation, so the sheet Frank cropped from showed it sideways too. It was
  cropped as marked, then rotated upright.
- **P26 was dark.** It shipped brightened with a gamma lift and slight gain;
  the as-taken version was shown beside it and rejected.

### `data/gallery.ts` and the dictionaries

Nine records were appended at orders 10 to 18. That keeps the home hero, the
first four eager tiles, the home teaser and the nails work strip exactly as
they were. Choosing and ranking belongs to the hero item. The header now
records where the photos came from, why makeup stays out, and that GPS must be
stripped from any future upload. Each key has alt text in English, then
Spanish; the dictionary type makes the missing Spanish a build error in
between.

### Evidence

- `npm run lint` and `npm run build` passed after the last code change.
- In the built HTML, `/gallery` and `/es/gallery` carry 18 nail paths each.
  The home page still leads with `french-glitter-gems`.
- Browser, against the dev server on port 3003:
  - `/gallery` has 18 tiles at 375px and 1280px, with no horizontal overflow
    and no console errors.
  - The `/es` lightbox stepped from "Foto 1 de 18" to 18 using its Next
    button, and showed the Spanish alt text.
  - `/` and `/nails` load the same photos as before.

### Left open

- **P18 is 605px wide.** It looks fine in the grid and soft full-screen.
- **Orders 10 to 18 are unranked.** The hero item should rank all eighteen.
- **No filter row appears** while nails is the only service with photos. That
  is by design (`showFilters` needs two services), but the spec had expected a
  chip.
- **A single-eye crop of her makeup work**, such as the blue graphic eye, is
  possible without showing a face. Frank has not asked for it.
