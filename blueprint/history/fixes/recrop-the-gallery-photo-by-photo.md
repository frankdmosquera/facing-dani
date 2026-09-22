# Fix: recrop the gallery photo by photo

**Type:** Fix
**Status:** verified
**Branch:** `fix/gallery-recrop-and-column-ladder`

## The problem

The first crop pass was cut to one rule applied by eye across all ten photos:
tighter on the nails, hand out of frame. It improved the gallery but it was one
person's judgement applied uniformly, and several frames were still wrong. Some
kept a whole knuckle, one clipped a nail at the edge, one left the wooden bench
behind the hand in shot.

The branch name mentions a column ladder. That change was considered and
rejected during the pass: a one-column breakpoint for small phones was proposed,
then dropped because a single column is a stack rather than a masonry. The
existing 2 / 3 / 4 breakpoints are unchanged.

## The fix

Nine photos, cut one at a time against a percentage grid, with Frank naming the
lines and approving each result before the next was started. Every crop comes
off the 12 MP original rather than the already-cropped master, so nothing is
resampled twice. The tenth photo, a plain glossy nude, stayed dropped.

Masters are capped at 2560 on the long edge rather than the previous 2000. The
cap only binds on two of the nine; it exists so that a later lightbox does not
require re-uploading the set.

Two crops were let through below the old sharpness floor, both deliberately:
`pastel-french-tips` at 960px because its original is only 1200px wide, and
`pink-floral-art` at 741px because Frank preferred that framing after the cost
was stated twice.

## What changed

| Photo | Kept | Result |
|---|---|---|
| french-glitter-gems | x 0-100, y 20-90 | 2560x2389 |
| burgundy-cat-eye | x 20-70, y 0-80 | 1391x1613 |
| blue-french-floral | x 0-100, y 0-85 | 1200x1360 |
| lilac-square | x 23-77.6, y 35.5-82.3 | 1651x1885 |
| white-glitter-square | x 10-70, y 10-85 | 1536x2560 |
| peach-french-gems | x 10-100, y 13-60 | 2560x1782 |
| pastel-french-tips | x 10-90, y 20-85 | 960x1040 |
| pink-floral-art | x 31-55.5, y 44.8-82 | 741x1500 |
| pale-pink-gloss | x 10-75, y 30-75 | 1966x1814 |

## Build steps

- [x] **1. Cut each photo against a grid, one at a time, with approval.**
      *Done when* all nine crop regions are recorded and each was approved by
      name before the next was cut.
- [x] **2. Produce the masters at a 2560 long-edge cap, quality 85.**
      *Done when* nine JPEGs exist at the approved crops with their real
      dimensions recorded.
- [x] **3. Upload over the live paths and update the records together.**
      *Done when* the ImageKit library holds the nine at their new dimensions,
      `MEDIA_VERSION` has moved, and every `width`/`height` in `data/gallery.ts`
      matches.
- [x] **4. Prove it in the browser.**
      *Done when* the live page shows nine figures whose declared aspect ratios
      all match their natural ones.

## Verification actually performed

| Check | Result |
|---|---|
| `npm run build` | compiled clean |
| ImageKit media API | nine masters at the new dimensions |
| Browser, `/gallery` at 1440 wide | 9 figures, **0 aspect-ratio mismatches** |
| Measured tile width | 278 CSS px, container 1160 px |

## What this pass corrected in the previous one

The first pass, and every size decision inside this one until near the end, used
a 1200 px sharpness floor derived from `sizes="25vw"` against a full 1920
viewport. That was wrong. The gallery sits inside a container capped at
`--site: 1200px`, so a desktop tile renders at **278 px**, not 480. Measured on
the running page.

The real floor is therefore around 560 px for a 2x display, not 1200. Both
photos that were accepted "below the floor" are in fact comfortably sharp, and
the objection raised against `pink-floral-art` was overcautious.

One genuine inefficiency remains and is **not** fixed here: `sizes` still
declares `25vw`, which on a 1920 screen asks for 480 px when the element is 278
px. The browser therefore fetches a larger variant than it needs. It is a
one-line change and belongs in its own fix rather than being smuggled into this
one.

## Notes for the AI

- `data/gallery.ts` is CRLF in the working tree. A regex spanning a whole line
  must account for the trailing `\r`, and a rewrite must preserve the endings or
  the whole file churns.
- `MEDIA_VERSION` had already been set to `2026-09-22` by the first pass on the
  same day. Re-uploading different bytes under an unchanged version would have
  left the CDN serving the old crops, which is why it reads `2026-09-22b`.

## Implementation walkthrough

### How the crops were actually chosen

Not by rule. Each photo was rendered on its own at 1200 px wide with a 10 %
percentage grid burned into it, sent over, and Frank named the lines - "cut at
20 horizontal, 60 horizontal, 10 vertical". Those percentages were applied to
the 12 MP original, the result was rendered back, and only then was the next
photo started. Nine rounds.

Three of the nine were cut twice, because the first attempt was judged against
the result rather than the plan. `lilac-square` was re-cut from inside its own
first crop, with the nested percentages composed back to the original in one
step so the pixels were only ever resampled once.

The grid overlay is the part worth keeping. Describing a crop in words does not
converge - "a bit tighter on the left" means different things to two people.
Numbers on a picture converge in one round.

### `data/gallery.ts`

Only the nine `width`/`height` pairs changed. They are no longer a 3:4
assumption and no longer even similar to each other: the set now runs from
741x1500 to 2560x2389. Those numbers reserve each tile's box before the bytes
arrive, so they had to land in the same commit as the upload.

The first attempt to edit them failed twice. A regex matching from the record's
key through to `width:` would not match, and the reason was that the file is
CRLF in the working tree while the repository stores LF - the line the regex was
anchored against ended in `\r`. The working version splits on `/\r?\n/`, edits
the matching line, and rejoins with whatever ending the file already had.

### `lib/imagekit.ts`

`MEDIA_VERSION` went to `2026-09-22b` rather than a date. The first crop pass
had already claimed `2026-09-22` earlier the same day, and the filenames are
deliberately stable, so a date alone would have left every CDN edge serving the
previous crops from an unchanged URL.

### The upload

Run twice, because the first invocation passed the parent directory and the
remote folder `nails`, and the script mirrors subfolders - so the files landed
at `facing-dani/nails/nails/`. Nine strays, deleted after confirming by
timestamp that they were from that call. `--dry-run` prints the exact
destination for every file and costs nothing; it should be the default habit
with this script rather than the recovery step.

### What was deliberately not built

A one-column breakpoint for small phones was proposed and rejected - one column
is a stack, not a masonry, and the masonry is the thing being sold. The
breakpoints are untouched.

An `embla-carousel-react` dependency was discussed for a future lightbox and
left out of this work entirely.

Cropping images to suit the layout was raised and argued against. A masonry
arrangement tuned to look right in four columns rearranges itself in three and
again in two, and every visitor's window is a different width, so there is
nothing stable to aim at. The layout is adjusted with order and column count;
the crops are chosen for the photograph.

### The measurement that corrected the whole exercise

Every sharpness decision in both crop passes rested on a 1200 px floor, derived
from reading `sizes="25vw"` as 25 % of a 1920 viewport. Reading the layout code
showed the gallery sits inside `--site: 1200px`, and measuring the running page
gave a tile width of 278 px against a 1160 px container.

So the floor was out by roughly four times, and two photos were argued over on
a false premise. The lesson is narrow and repeatable: `sizes` is a declaration
about intent, not a measurement of the element. The element's real width comes
from the container, and the only way to know it is to measure the rendered page.
