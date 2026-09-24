# Fix: Swap the home hero image

**Type:** Fix

**Status:** verified

**Branch:** `fix/swap-the-home-hero-image`

## The problem

Frank does not like the photo beside the headline on the home page. It is the
first thing a visitor from the Instagram bio link sees.

The hero does not choose a photo of its own. `components/home/Hero.tsx` takes
`orderedGallery()[0]`, the first photo in `data/gallery.ts`, which today is
`frenchGlitterGems` (2560x2389, near square).

That same first slot also drives three other places:

| Place | Uses |
|---|---|
| Gallery page | order 1 is the first tile and loads eagerly |
| Home "work" teaser | the first six in order |
| Nails page work strip | the first six nail photos in order |

So changing the hero by reordering the gallery would also move those.

## The fix

Give the hero its own pick instead of borrowing the gallery's first slot:

- Add one exported constant in `data/gallery.ts`, `HOME_HERO: GalleryKey`,
  set to the photo Frank chooses.
- `Hero.tsx` looks that record up by key instead of taking `[0]`.
- The gallery order does not change, so the gallery page, the teaser and the
  nails strip stay exactly as they are.

Typed as `GalleryKey`, so a key that does not exist fails the build.

**Must not break:** the hero's `priority` loading (it is the LCP image on a
phone), its alt text, and the layout at 375px and 860px+. The photo must be one
of her own sets, never stock.

## Build steps

- [x] 1. **Frank picks the photo.** Picked #18, `pinkBlackStars`. Show him the 18 nail sets as one contact
  sheet, numbered, at the hero's real size and shape. Record his pick. Do not
  rebuild the sheet mid-round.
  Done when: one gallery key is chosen.
- [x] 2. **Point the hero at it.** Add `HOME_HERO` and switch `Hero.tsx` to it.
  Done when: the home page in both languages shows the chosen photo beside the
  headline, and the gallery, teaser and nails strip are unchanged.

## Verify

- Open `/` and `/es` at 375px and at desktop width: the chosen photo is beside
  (or below, on a phone) the headline, with no layout shift as it loads.
- Open `/gallery` and `/nails`: same first photos as before this fix.
- `npm run lint`, `npm run build` and `node scripts/auditSeo.mjs` pass.

## Verification actually performed

| Check | Result |
|---|---|
| `/` at 375px (browser pane) | #18 full width under the buttons, no layout shift |
| `/` at desktop width | checked by Frank, approved |
| `/es` | same photo, Spanish alt text, `lang="es"` |
| `/gallery`, `/nails` | still open on `french-glitter-gems`, `burgundy-cat-eye` |
| Console | no errors |
| `tsc --noEmit`, `npm run lint` | clean |
| `npm run build` | 19 static pages |
| `node scripts/auditSeo.mjs` | PASSED - 14 routes |

## Implementation walkthrough

### How the photo was chosen

All 18 nail sets went on one contact sheet at the hero's real desktop width,
380px, each in its own shape, since the hero never crops. Frank picked #18,
`pinkBlackStars`: young hands, several designs in one frame (stars, leopard,
stripes), and hot pink and black that sits with the brand accent. The trade-off
he named himself: the nails are about a third of the frame, so it shows the
range rather than the detail. A hero-only crop through the ImageKit URL is the
cheap follow-up if that ever bothers him.

### `data/gallery.ts`

`HOME_HERO: GalleryKey` names the hero photo, and `galleryImage(key)` looks a
record up. Typed as `GalleryKey`, so a key that does not exist fails the build.
The gallery's `order` field is untouched: reordering to change the hero would
also have moved the first gallery tile, the home teaser and the nails strip.
The comment on the array no longer says order 1 is the hero.

### `components/home/Hero.tsx`

One line: `galleryImage(HOME_HERO)` instead of `orderedGallery()[0]`. The
`priority` flag, alt text, `sizes` and the 380px panel are unchanged. No layout
change was needed: the photo is slightly wider than tall (2560x2219), so the
panel comes out about 330px tall at desktop and the buttons sit a little higher
on a phone.
