# Feature: Inspiration grids on the service pages

**From build-plan:** feature 17

**Branch:** `feature/inspiration-grids-on-the-service-pages`

**Status:** verified

## Goal

Give each service page a grid of licensed stock photos headed "Inspiration"
in both languages: 12 on nails, 13 on lashes, 10 on makeup. Frank picked them
from a Pexels contact sheet on 2026-09-23. The grid shows styles a client can
bring as a reference. It never claims to be Dani's work, and the heading plus
one short line under it are what make that clear. The lash image from item 16
(the mapping-tape close-up, candidate L1) comes off the page, and one of
Frank's picks replaces it.

## In scope

- Download Frank's picks from Pexels, check every one by eye for an
  identifiable face, and crop to meet the rule where needed.
- Upload the final files to ImageKit under `facing-dani/decorative/`.
- Records for the grid in `data/decorativeImages.ts`, next to item 16's.
- Swap the lash opening image from L1 to L2.
- A new `InspirationGrid` component on all three service pages, in both
  locales, with the heading and note in both dictionaries.

## Out of scope

- **The home hero and a nails hero** (punch list items 1 and 2). They wait on
  Frank's choice between her photos and stock. This item leaves the home page
  untouched.
- The gallery, the home work teaser and every work strip. Stock never goes
  there.
- A lightbox for the grid. The images are decoration, not work to inspect.
- Deleting anything from ImageKit. The L1 file stays in the library, unused.

## Build loop

`workflow.stepReview` is `feature`: build the steps in order without stopping
between them. Stop for Frank's review once, at the end. `checkpointCommits` is
`disabled`, so there are no commits during the build. `/complete` creates the
one feature commit.

Approving this spec also approves the two external actions in 17.1 and 17.2:
downloading 37 photos from `images.pexels.com` into the session scratchpad, and
uploading the final files to the project's ImageKit library. Nothing else leaves
the machine.

## Build steps

- [x] **17.1 Source and crop.** Download the original of each pick below into the
  session scratchpad, never the repo. Look at every file. Where a face is
  identifiable (both eyes together with the nose or mouth), crop to a single
  eye, lips alone, or hands and tools, the same way item 16's two were
  cropped. Resize so the long edge is at most 2400px. Give each file a
  descriptive kebab-case name. A pick that cannot be cropped without losing
  what made it worth picking is **dropped, not forced**, and named in the
  handoff. Use the .NET image library from PowerShell, as item 16 did, so
  nothing is installed.
  **Done when:** every final file has been looked at, passes the face rule, and
  appears on a contact sheet in the scratchpad for the final review, with any
  dropped picks listed.
- [x] **17.2 Upload.** Run `scripts/uploadImagesToImageKit.mjs` with `--dry-run`
  first, then for real, into `decorative/lashes/`,
  `decorative/lashes/inspiration/`, `decorative/makeup/inspiration/` and
  `decorative/nails/inspiration/`. These are new paths, so `MEDIA_VERSION`
  stays as it is.
  **Done when:** every uploaded file's ImageKit URL returns 200.
- [x] **17.3 Records.** In `data/decorativeImages.ts`:
  - Point the `lashes` opening record at the L2 file.
  - Add `inspirationImages: Partial<Record<ServiceId, DecorativeImage[]>>` in
    Frank's pick order.
  - Add `inspirationFor(serviceId)`. It returns that list minus any image
    already shown at the top of the page, so the same photo is never shown
    twice.
  - Rewrite the header rules to cover the grid. It is the one stock that stays
    once her photos exist, and it is never rendered without its heading.

  **Done when:** `npm run lint` and `npm run build` pass, and
  `inspirationFor` gives 12, 13 and 10 for nails, lashes and makeup.
- [x] **17.4 The grid.** Add `components/service/InspirationGrid.tsx` and
  render it in `app/[locale]/[service]/page.tsx`. It goes in its own
  untinted, no-glow `Band`, after the work strip and before `BookingBand`.
  The band renders only when the list is non-empty, the same rule the work
  strip follows. Add the heading and note to `en.ts` and `es.ts`.
  **Done when:** lint and build pass, and all of the following were observed
  in a browser:
  - `/nails`, `/lashes`, `/makeup`, `/es/nails` and `/es/lashes` show the
    heading, the note and the right number of images.
  - At 375px there is no horizontal overflow.
  - At 1280px the grid sits inside the page column.
  - The lash opening image is L2.
  - In the built HTML, `decorative/` appears only on the six service pages.
    It never appears on the gallery, the home page, in any JSON-LD block or
    in the sitemap.

## Files / areas

- `data/decorativeImages.ts`: new records, new helper, rewritten header
- `components/service/InspirationGrid.tsx`: new
- `app/[locale]/[service]/page.tsx`: one new band
- `dictionaries/en.ts`, `dictionaries/es.ts`: heading and note
- Not touched: `data/gallery.ts`, `components/service/WorkStrip.tsx`,
  `lib/schema.ts`, `app/sitemap.ts`, the home page

## Data / contracts

The picks, in order. The Pexels photo ID is the provenance, stored in `source`
as `https://www.pexels.com/photo/<id>/`, and every one is under the Pexels
License.

| Service | Opening image | Grid, in order |
|---|---|---|
| Lashes | L2 36930354 (replaces L1 35013077) | L3 8554941, L5 7755525, L6 5128234, L10 5128267, L11 5128220, L14 6135662, L16 21412169, L17 38194468, L18 33637609, L20 33723106, L21 7755531, L22 38194465, L23 29391092 |
| Makeup | M1 4006692 (unchanged) | M2 35341712, M4 7290740, M6 33965317, M7 7588617, M8 4978937, M10 16017832, M11 3762768, M12 7514850, M13 15579987, M14 6713323 |
| Nails | none (she has work) | N1 4965824, N3 34997574, N4 7066298, N9 34835304, N11 3997392, N12 34871556, N14 3557600, N15 34835305, N16 34885844, N17 4677845, N19 20758448, N23 34871553 |

- **Record shape:** the existing `DecorativeImage` type, unchanged:
  `imagekitPath`, `width` and `height` (the final file's real pixels),
  `source`, `photographer`, `licence: "pexels"`. The photographer's name is
  read from each photo's Pexels page during 17.1.
- **`inspirationFor(serviceId): DecorativeImage[]`:** returns the service's
  list with any entry whose `imagekitPath` equals the opening image's path
  removed. Returns `[]` for a service with no list. Unlike
  `decorativeImageFor`, it ignores `serviceHasWork`, because the plan says the
  grid stays.
- **Copy, in the first person like the rest of the page:**
  - EN heading "Inspiration", note "Looks to bring in as a reference. These are
    stock photos, not my work."
  - ES heading "Inspiración", note "Ideas para traer como referencia. Son fotos
    de stock, no mi trabajo."
  - One shared `inspiration` block, not one per service. The words are the same
    on all three pages, and a missing Spanish key already fails the build.
- **Rendering:** each image goes through `Photo` with `alt=""` inside an
  `aria-hidden` wrapper, like `DecorativeImage`. The heading and note are
  visible text and are not hidden. Masonry columns match the work strip:
  `columns-2`, then `columns-3` from 620px. Images lazy-load: no `priority`,
  because the opening image or the menu is already the page's LCP. `sizes`
  matches the column width.

## Testing

There is no unit test runner and no Browser tests command, so nothing new is
added. The gates are:

- `npm run lint` and `npm run build`, after every step that changes code
- A grep of the built HTML for `decorative/` on every route
- Observing the five pages in the in-app browser at 375px and 1280px, as 17.4
  lists

## Implementation notes

- No pick was dropped. All 36 new files passed the face rule after cropping.
  Nails needed no crop. Most lash and makeup shots were cut down to one eye,
  lips (M6), or hands and tools (L22, L23).
- The L2 opening image was cropped twice. The first crop
  (`lash-tweezers-pink-nails.jpg`, 2400x1844) was mostly blurred hands at
  640px. The shipped one is `lash-line-pink-nails.jpg`, 2400x1500. It went up
  under a new name rather than overwriting, so no `MEDIA_VERSION` bump was
  needed. Both the first crop and item 16's L1 file are still in ImageKit,
  unused.
- The ImageKit endpoint in `.env.local` already ends in `/facing-dani`, so
  file URLs are `<endpoint>/decorative/...`.
- The opening images are named constants (`lashOpening`, `makeupOpening`)
  shared by both exports, so the grid list needs no non-null assertion.

## Notes for the AI

- Every file here is CRLF. Edit with the Edit tool or a Node script, never
  `sed -i`, and measure line endings after each write.
- The face rule is judged by looking at the picture, not from the Pexels alt
  text. Several makeup picks (M2, M6, M8, M10, M11, M12, M13, M14) are close
  portraits and will probably need the single-eye crop.
- Never add alt text, a caption, a dictionary key or a structured-data entry
  describing an individual stock image. Any such words would imply the work is
  hers.
- `Photo` already hides an `alt=""` placeholder when no ImageKit endpoint is
  set. Nothing new is needed for the no-env case.
- The downloads and crops are staging files. They stay in the scratchpad and
  are never committed.

## Implementation walkthrough

### Where this item came from

Frank reviewed the site on 2026-09-23 and asked for more images: eight to
twelve per service, like the one lash and one makeup photo item 16 had
shipped, and "nice images from the internet" for nails too. He first asked
for the gallery and "our work" to be filled with them. That was declined,
because a gallery row is a claim of authorship and a client would find out in
the chair. What was agreed instead is the plan change in section 7: a grid on
every service page, nails included, under a heading and a line that say the
photos are stock. He picked from a numbered Pexels contact sheet over three
rounds, cutting 25 of 62 candidates.

### Sourcing and cropping

The 36 new originals came straight from `images.pexels.com` into the session
scratchpad, about 71 MB. They were never in the repo. Each one was looked at
on a contact sheet, and a crop was planned by eye against the face rule. The
crops were made with the .NET image library from PowerShell, capped at 2400px
on the long edge, and saved at JPEG quality 88. Nothing was installed.

- **Nails needed no crop.** Every pick was hands only.
- **Lashes:** L6, L10 and L16 were already one eye. The rest were cut to keep
  the working eye and lose the nose, mouth or second eye. L22 and L23 came
  down to hands and tweezers, because that was the only safe frame.
- **Makeup:** most of the picks were full-face portraits. Each was cut to a
  single eye, except M6, which became lips and a ringed hand. M6 is the
  weakest crop in the set.
- **What bit:** the crop script's `[math]::Min(1, 2400 / n)` resolved to the
  integer overload. Every scale factor was rounded, to 1 (no resize) or to 0
  (a zero-size bitmap, reported by GDI+ as "Parameter is not valid"). It was
  caught on the first run and fixed with explicit doubles, and every file was
  regenerated.
- **L2, the new lash opening image, was cropped twice.** The first crop was
  mostly blurred hands at the 640px it renders. The second keeps the lash
  line, tweezers and pink nails, and went up under a new name
  (`lash-line-pink-nails.jpg`), so no `MEDIA_VERSION` bump was needed.

Photographer names were read from each photo's Pexels page and stored as
provenance. They are never rendered.

### Upload

`scripts/uploadImagesToImageKit.mjs` ran with `--dry-run` first, then for
real: 36 files, then the one recrop. **What bit:** the first 200 check built
URLs as `<endpoint>/facing-dani/...` and got 36 404s. The endpoint in
`.env.local` already ends in `/facing-dani`, which is what `lib/imagekit.ts`
accounts for. Rechecked against the right base, all 37 return 200.

### `data/decorativeImages.ts` - one file, two uses

The grid records sit beside item 16's opening records rather than in a second
file. Both use the same type and obey the same rules, and the header now
states both uses and the one difference: the opening image comes off when
her photos arrive, and the grid stays. The two opening images became named
constants (`lashOpening`, `makeupOpening`) shared by `decorativeImages` and
`inspirationImages`, because they were among Frank's picks. That avoids both
a duplicated record and a non-null assertion. `inspirationFor` removes
whatever the opening image already shows, which is why lashes and makeup
show 13 and 10 in the grid rather than 14 and 11. If lashes ever gets her own
photo, the opening image turns off and L2 simply appears in the grid instead.

### `components/service/InspirationGrid.tsx`

Same masonry columns and figure classes as `GalleryFigure`, so on nails the
work strip and the grid read as one family. There is deliberately no hover
scrim, no service tag and no lightbox: those are what make a gallery tile
look like a portfolio piece. The images get `alt=""` inside an `aria-hidden`
wrapper. The heading and note are plain visible text and are never hidden,
because they carry the whole claim. None of the images are `priority`.

### `app/[locale]/[service]/page.tsx` and the dictionaries

The grid gets its own untinted, no-glow band after the work strip and before
the booking band, drawn only when `inspirationFor` returns something: the
same no-empty-band rule item 16 set. On nails that puts her real sets first.
The copy is one shared `inspiration` block in `en.ts` and `es.ts` rather than
one per service, so the Spanish-completeness type check covers it once.

### Evidence

- `npm run lint` and `npm run build` passed after the last code change.
- Built HTML: the grid paths appear on the six service pages only, with 12,
  13 and 10 per page in both locales. The opening paths are
  `lash-line-pink-nails.jpg` and `smoky-eye-blend.jpg`. `decorative/` is
  absent from both gallery pages, both home pages, the sitemap, robots and
  every JSON-LD block.
- Browser, against the dev server already running on port 3003:
  - `/nails`, `/lashes`, `/makeup`, `/es/nails` and `/es/lashes` at 375px,
    each showing the heading, the note and the right count, with no
    horizontal overflow and no console errors.
  - `/lashes` at 1280px, with the grid inside the page column (52px to
    1212px of a 32px to 1232px band).

### Left open

- **M6** (lips and hand) is weaker than the rest. **N9 and N15** are the same
  hand from one shoot on two backgrounds. Frank can cut either by deleting a
  record.
- Two files sit unused in ImageKit: item 16's L1 lash image and the first L2
  crop. Nothing was deleted, as asked.
- The home hero and a nails hero (punch list items 1 and 2) are still waiting
  on Frank's choice between her photos and stock.
