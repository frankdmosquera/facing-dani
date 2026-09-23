# Feature: Gallery lightbox

**From build-plan:** feature 10

**Branch:** `feature/gallery-lightbox`

## Goal

Item 4 promises the work "at a size where the quality is actually visible". A
grid tile renders at **278 CSS px**, measured on the running page at 1440 wide,
because the gallery sits inside a container capped at `--site: 1200px`. Tapping a
photo has to open it large, or that promise is not kept.

## In scope

- Tapping or keyboard-activating any gallery tile opens that photo large.
- Next and previous, by button, by arrow key, and by swipe.
- A thumbnail strip showing position, clickable to jump.
- Escape closes; focus returns to the tile that was opened.
- Navigation respects the active filter chip: with Nails pressed, next moves
  through nail photos only.
- Both locales. Every new string lands in `en.ts` and `es.ts` or the build fails.

## Out of scope

- The service pages' `WorkStrip`. Same figures, but a second surface doubles the
  review; it can adopt the same component later.
- Preloading the neighbouring photo.
- Pinch zoom or pan inside the lightbox.
- Fixing `sizes` on the grid. It declares `25vw` where the element is 278px, so
  the browser fetches a larger file than it needs. Real, one line, and **its own
  fix** - do not smuggle it in here.
- An `onError` state for a photo that fails to load. The grid has the same gap
  today; fixing one surface and not the other is worse than fixing neither.

## Build loop

`workflow.stepReview` is `feature`: work through the steps and present one review
packet at the end. `workflow.checkpointCommits` is `disabled`, so make no commits.
`/complete` creates the single feature commit.

## Build steps

- [x] **1. Put the Dialog primitive in place.**
      Add the shadcn dialog component. It is built on `@base-ui/react`, which
      this project already has, so it should cost no new package.
      **Hard stop:** if adding it would install any npm dependency, stop and ask.
      Installing without asking is forbidden by the workspace rules, and this
      feature's whole shape assumes it is free.
      *Done when* `components/ui/dialog.tsx` exists, `git diff package.json`
      shows no change, and `npm run build` passes.

- [x] **2. Add the lightbox strings to both dictionaries.**
      Under `gallery` in `dictionaries/en.ts`, then the same keys in `es.ts`:
      a per-tile trigger label, close, next, previous, and a position phrase
      carrying the current index and the total.
      *Done when* `npm run build` passes, which is what proves both locales have
      every key - a missing Spanish string is a type error here by design.

- [x] **3. Hand the photo data to the client and make each tile a trigger.**
      `app/[locale]/gallery/page.tsx` already resolves alt text and service names
      on the server; pass that same resolved list to `GalleryGrid` as a new
      `photos` prop, alongside the existing `children`.
      Each `GalleryFigure` renders its contents inside a
      `<button type="button">` carrying its index, and `GalleryGrid` listens on
      the grid container and reads the index from the event target.
      **Delegation rather than an `onClick` per figure is the point:** the
      figures are rendered on the server today, and the file says so. Giving each
      one a handler would make the whole grid a client component and undo that.
      *Done when* clicking or pressing Enter on tile N opens a dialog showing
      photo N, Escape closes it, and focus returns to that tile.

- [x] **4. Next and previous, filtered.**
      Buttons plus Left and Right arrow keys. The set being traversed is the
      photos matching the pressed chip, not all nine, and it wraps at both ends.
      *Done when* with a service chip pressed, next moves only through that
      service and wraps from last to first.

- [x] **5. Thumbnail strip.**
      A row of thumbnails under the main image, marking the current photo and
      scrolling it into view as navigation moves. Clicking one jumps to it.
      *Done when* the strip marks the current photo, clicking a thumbnail
      changes the main image, and arrow-key navigation moves the strip's mark.

- [ ] **6. Swipe.**
      Pointer events, hand-rolled. No `embla-carousel-react`.
      *Done when* Frank has tried it on his own phone and judged it no worse
      than Primo Painters'. **If it does not reach that bar, stop and say so**
      rather than shipping it - adding embla is then a separate decision with
      its own permission, not a silent fallback.

- [x] **7. Loading state, then verify.**
      The large image is a bigger file than the tile and will not be instant on a
      phone. Show something deliberate while it arrives rather than an empty box.
      *Done when* `npm run build` and `npm run lint` pass, and the browser shows:
      the dialog opening from a tile, arrow keys moving, Escape closing, focus
      restored, both locales, and no console errors.

## Files / areas

| Path | Change |
|---|---|
| `components/ui/dialog.tsx` | new, from shadcn |
| `components/gallery/GalleryLightbox.tsx` | new, client |
| `components/gallery/GalleryGrid.tsx` | new `photos` prop, delegated click, owns open state |
| `components/gallery/GalleryFigure.tsx` | contents wrapped in an indexed button |
| `app/[locale]/gallery/page.tsx` | pass the resolved photo list |
| `dictionaries/en.ts`, `dictionaries/es.ts` | new strings under `gallery` |

## Data / contracts

- **The `photos` prop is resolved data, not records.** Each entry carries the
  ImageKit path, the already-resolved alt string, width, height and `serviceId`.
  Alt text lives in the dictionaries and is resolved on the server today; moving
  that resolution into the client would pull both locales into the bundle, which
  item 2 explicitly avoided.
- **Index is position in `photos`, and that array is `orderedGallery()`.** The
  button's index and the array must come from one server render, or delegation
  opens the wrong photo. The children and the `photos` prop are built from the
  same `images` array in the same pass.
- **`width`/`height` stay the real cropped pixels.** They reserve layout in the
  grid; the lightbox reuses them for its own aspect ratio.
- **The lightbox declares its own `sizes`.** The grid's `25vw` is wrong for a
  near-full-screen image and would fetch a file far too small.

## Testing

No test runner is configured - `package.json` has `dev`, `build`, `start` and
`lint` only - and `verification.logicTests` is `when-configured`, so no unit
tests are required. Do not install one inside this feature; `/tests` exists for
that and it is a separate decision.

The logic worth testing is the filtered next/previous wrap. Exercise it in the
browser against a pressed chip, both directions, at both ends.

`verification.uiEvidence` is `when-available` and a dev server can run here, so
every done-when above that names a visible behaviour is checked in a browser and
not inferred from a green build.

## Notes for the AI

- **A green build has hidden three real bugs on this project**, each found only
  by running the page: an inverted honeypot, a canonical pointing at the wrong
  URL, and an audit that passed zero routes. A dialog is behaviour; build output
  proves nothing about it.
- **The grid's server-rendered children are deliberate.** `GalleryGrid`'s own
  comment explains that pressing a chip re-renders three buttons and a count,
  not the grid. Keep that true.
- **Filtering is CSS, not React.** The container carries `data-filter` and each
  figure hides itself with a `group-data-[filter=x]/grid:hidden` variant. The
  lightbox must derive its traversal set from the same pressed-chip state rather
  than from what is visually hidden.
- **No new dependency without asking.** Step 1 stops if the Dialog is not free.
- `data/gallery.ts` and several files under `blueprint/` are CRLF in the working
  tree. A rewrite must preserve the line endings or the whole file churns.

## Open questions

None blocking. Two choices are taken here rather than asked, both reversible and
neither constraining later work:

1. **The service tag is not repeated in the lightbox.** It sits on the tile as a
   caption; at full size the photograph is the subject.
2. **Navigation wraps rather than stopping at the ends.** With nine photos,
   stopping means a dead button on arrival, which reads as broken.
