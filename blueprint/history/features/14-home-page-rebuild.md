# Feature: Home page rebuild

**From build-plan:** feature 14

**Status:** verified

**Branch:** `feature/home-page-rebuild`

## Goal

The home page is what the Instagram bio link lands on, and it currently has
**zero photographs** on a site whose locked direction says "photography carries
it". Measured on the running page: five sections, 510 words, no images.

Item 3 did not forget them. Its spec deliberately left out the hero photograph
and the gallery teaser, with the reason recorded: *"It is photographs, and there
are none. ImageKit is not configured and no work photos exist in the repo. Item
4."* Item 4 then shipped nine photographs and nobody returned to item 3.

This feature collects that debt, and folds the About page into home so its
content stops being a page nobody reaches.

## In scope

- A photograph in the hero.
- A gallery teaser on home, with a way through to `/gallery`.
- Service cards carrying an image where that service has one.
- The About page's content moved onto home: her lede, the bilingual promise,
  the portrait slot, and the numbered "what happens at an appointment" steps.
- `/about` deleted, with its nav entry, route entry and redirect handled.
- A `Home` link in the nav.
- The FAQ extended, **only with questions answerable from facts already
  recorded**. See Open questions.
- Both locales, as always.

## Out of scope

- **The lightbox on home.** `GalleryFigure` renders no button without an
  `index`, and that stays true here: the lightbox is the gallery's, and giving
  home a second surface doubles the review. It also keeps these figures server
  components.
- **Reviews and a before/after slider.** Item 11, and neither has material.
- **Lash and makeup photographs.** None exist. Their cards and any teaser slots
  degrade rather than waiting on them.
- **New prices.** `data/treatments.ts` stays empty; prices are Dani's to set.
- **The domain, indexing and production email.** Item 15.
- **A store or a `/book` page.** Neither is a build-plan item yet.

## Build loop

`workflow.stepReview` is `feature`: work through the steps and present one
review packet at the end. `workflow.checkpointCommits` is `disabled`, so make no
commits. `/complete` creates the single feature commit.

## Build steps

- [x] **1. Put a photograph in the hero.**
      `components/home/Hero.tsx` carries a comment saying the mockup places a
      380px photograph beside the type and there is none yet. There is now.
      Use `orderedGallery()[0]`, because `data/gallery.ts` states the set is
      "ordered strongest first" - so the choice follows existing data rather
      than a new opinion, and changing it is a one-line edit.
      Render through `components/media/Photo.tsx` so the missing-endpoint
      fallback is inherited. Alt text comes from `t.gallery.images[key]`.
      **If `orderedGallery()` is empty, render exactly today's type-led hero.**
      *Done when* the hero shows a photograph at 412px and 1440px in both
      locales, the type-led layout still reads if the photo is removed, and
      `npm run build` passes.

- [x] **2. Add the gallery teaser.**
      A new `components/home/WorkTeaser.tsx`, modelled on
      `components/service/WorkStrip.tsx`: up to **6** photographs from
      `orderedGallery()` across all services, a heading, and a link to
      `/gallery`. Reuse `GalleryFigure` **without** an `index`.
      **Renders `null` when there are no photographs at all**, the same rule
      WorkStrip already applies - an empty heading over an empty row reads as
      broken rather than absent.
      New strings go in both dictionaries.
      *Done when* home shows six photographs linking through to `/gallery`, the
      component returns nothing when the gallery is empty, and the build passes.

- [x] **3. Give the service cards an image where one exists.**
      `components/home/ServiceCards.tsx`. Nails has nine photographs; lashes and
      makeup have none.
      **A card with no photograph keeps exactly today's text-only treatment.**
      Do not draw a placeholder box: a missing photo here is a content decision,
      not a broken build, and the same judgement is already recorded in
      `data/portrait.ts`.
      Colour stays navigation - the accent is still keyed off the service id and
      the name is still there as text.
      *Done when* the nails card carries a photograph, the lashes and makeup
      cards render as they do today, and no card looks half-built.

- [x] **4. Move About's content onto home.**
      Four pieces, from `app/[locale]/about/page.tsx`:
      - the **bilingual promise** band. This is a locked contract in
        `project-plan.md`: it belongs on the home page as a claim, not implied
        by a `/es` URL. It must not be lost.
      - the **numbered "what to expect" steps** (`about.expect`).
      - her **lede**, merged with the existing `Story` section rather than
        duplicated beside it.
      - the **portrait slot**, which stays `null`-tolerant exactly as it is.
      Also move the `personSchema` JSON-LD onto home, beside the existing
      `localBusinessSchema`. Leave `/about` working at this point.
      *Done when* home renders all four, `/about` still renders, both pages
      build, and no copy is duplicated between the two sections on home.

- [x] **5. Delete `/about`, fix the nav, add `Home`.**
      Remove `app/[locale]/about/page.tsx`, the `"/about"` entry in
      `lib/locale.ts` `routes` (which feeds `generateStaticParams`, the root
      rewrites and the sitemap), and both `{ key: "about" }` entries in
      `data/siteConfig.ts` - one in `nav`, one in `footer`.
      **Add a `Home` nav entry.** Frank asked for this directly: the wordmark
      links home and carries "Dani Moreno, home" for screen readers, but a
      sighted visitor gets no Home link at all. Primo Painters, the site that
      ranks, has one.
      **Add a redirect** from `/about` to `/` and `/es/about` to `/es` in
      `next.config.ts`, so a held link does not 404.
      Then rename the `about` dictionary namespace to sit under `home`.
      **`lib/schema.ts:136` reads `t.about.jobTitle` and must be repointed** - a
      missed key is a type error, so the build is the check.
      *Done when* `/about` redirects in both locales, no nav or footer link
      points at it, the sitemap no longer lists it, `Home` appears in the nav,
      and the build passes.

- [x] **6. Extend the FAQ, within what is known.**
      `data/faq.ts` holds five site-wide questions: booking, duration,
      location, cancelling, hair. Add only questions whose answers exist in
      `project-plan.md`, `siteConfig` or the dictionaries today - the bilingual
      one is the clear case, since "the whole appointment in Spanish" is
      recorded in section 1.
      **Do not invent answers.** Deposits, removals, aftercare and
      first-timer policy are Dani's to state, and `project-plan.md` section 3
      says nothing ships with placeholder text. List anything you cannot answer
      in the review packet instead of writing it.
      The `FAQPage` structured data is generated from the same source as the
      visible list, so both move together.
      *Done when* every added question has a real answer in both locales, the
      structured data matches the rendered text word for word, and the build
      passes.

- [x] **7. Prove it in a browser.**
      A green build has hidden three real bugs on this project, each found only
      by running the page: an inverted honeypot, a canonical pointing at the
      wrong URL, and an invisible mobile nav panel.
      *Done when*, on the running dev server: home renders at **412px and
      1440px** in **both locales**; every photograph loads with no
      missing-endpoint boxes; the teaser link reaches `/gallery`; `/about` and
      `/es/about` redirect; `Home` is in the nav; the FAQ opens without
      JavaScript; there is no horizontal overflow; and the console is clean.
      Record the measured word count and image count, so the "510 words, zero
      images" number this feature exists to fix has an after.

## Files / areas

| Path | Change |
|---|---|
| `components/home/Hero.tsx` | photograph beside the type |
| `components/home/WorkTeaser.tsx` | new, the gallery teaser |
| `components/home/ServiceCards.tsx` | image per card where one exists |
| `components/home/Story.tsx` | absorbs About's lede and portrait |
| `components/home/Faq.tsx` | more questions, same shape |
| `app/[locale]/page.tsx` | new sections, `personSchema` added |
| `app/[locale]/about/page.tsx` | **deleted** |
| `data/faq.ts` | new rows |
| `data/siteConfig.ts` | `about` out of `nav` and `footer`, `home` in |
| `lib/locale.ts` | `"/about"` out of `routes` |
| `lib/schema.ts` | `t.about.jobTitle` repointed |
| `next.config.ts` | `/about` redirect, both locales |
| `dictionaries/en.ts`, `es.ts` | `about` namespace folded into `home`, new strings |

## Data / contracts

- **`GalleryFigure` without `index` stays non-interactive.** No button, nothing
  focusable, no offer the page cannot honour. This is the existing contract with
  `WorkStrip` and it is what keeps these figures server components.
- **`Photo` owns the missing-endpoint fallback.** Every new image goes through
  it; nothing re-implements that check.
- **`sizes` must match the real rendered width, not a guess.** The gallery pass
  recorded the cost of getting this wrong: a tile declared `25vw` while
  measuring 278px. Measure on the running page.
- **Alt text stays resolved on the server** from `t.gallery.images[key]`.
  Passing the dictionary to a client component would put both languages in the
  bundle.
- **No component contains the word Dani.** Business facts come from
  `siteConfig`.
- **Colour is navigation.** Pink nails, violet lashes, orange makeup, and never
  the only cue.
- **Photo panels sit nearer `#1B1426`** than the page ground, so images keep
  their punch.
- **A missing Spanish string is a build error.** Every new key lands in both
  dictionaries or the build fails, by design.

## Testing

No test runner is configured - `package.json` has `dev`, `build`, `start` and
`lint` only - and `verification.logicTests` is `when-configured`, so no unit
tests are required. Do not install one inside this feature; `/tests` exists for
that and it is a separate decision.

`verification.uiEvidence` is `when-available` and a dev server runs here, so
step 7 is not optional and its checks are observed in a browser, not inferred
from build output.

There is no declared `Verify` command, so the gate is `npm run build` and
`npm run lint`, both of which must pass.

## Notes for the AI

- **This page is the product.** Her clients meet it as an Instagram bio link, on
  a phone, at night. Check 412px before 1440px, not after.
- **The comparison that set the target:** Primo Painters ranks on 605 words and
  **132 images**. This home page has 510 words and **zero**. The gap was never
  text.
- **Do not fill any gap with stock photography.** A photo on this site is a
  claim the work is hers. Atmosphere imagery is a separate, later decision and
  is not in this feature.
- **`data/gallery.ts` is CRLF in the working tree**, as are several files under
  `blueprint/`. A rewrite must preserve the line endings or the whole file
  churns.
- **The `<!-- BEGIN:nextjs-agent-rules -->` block in `AGENTS.md` is written by
  `next dev`.** Leave it alone.
- `/about` currently returns 200 in production but nothing is indexed, because
  `robots.txt` serves `Disallow: /` until item 15. The redirect is cheap
  insurance for a held link, not an SEO migration.

## Open questions

Neither blocks implementation. Both are recorded so the choice is visible rather
than silent.

1. **Which photograph leads the hero.** Taken as `orderedGallery()[0]`
   (`french-glitter-gems`), because the data file states the set is ordered
   strongest first. Reversible in one line. Say so if you want a different one.
2. **Which FAQ questions can actually be answered.** Deposits, removals,
   aftercare and first-timer policy are the obvious additions and **all four
   need Dani**, because they are promises to a customer. Step 6 adds only what
   is already recorded and reports the rest rather than inventing it.

## Departures during the build

**Step 3 shipped row-level, not per-card, and the change was measured.** The
spec said a card with no photograph keeps today's text-only treatment. Built
that way first and rendered at 1440px: the grid stretches every card to the
tallest, so all three came out 431px, nails carrying a 278px photograph while
lashes and makeup carried **294px of empty background** between the blurb and
the link. That reads as two images that failed to load, not as "no photo yet".
The row is now the unit and degrades together, the same judgement `WorkStrip`
already makes about an empty strip.

**Net effect today: the service cards are unchanged.** The code is in place and
lights up on its own the day lash and makeup photographs land in
`data/gallery.ts`. Nothing changes with them.

**Step 6 added no questions, which the spec anticipated.** The five existing
ones already cover booking, duration, location, cancellation and scope ("Do you
do hair?"). The bilingual promise now has its own band on this page, so an FAQ
entry for it would repeat an answer on a single page - the convention the old
`about.expect` comment set out. Everything else a visitor asks - deposits,
removals and fills, first-timers, payment methods - is a promise to a customer
and is recorded nowhere. Section 3 of the project plan forbids shipping
placeholder text, so nothing was written.

**Those four questions need Dani**, and they are the cheapest content win left
on the site.

## Verification actually performed

| Check | Result |
|---|---|
| `npm run build` | exit 0, `/about` gone from the route table |
| `npm run lint` | exit 0 |
| Home, `/en` and `/es` | 8 sections, 7 images, both locales rendered |
| Word and image count | **543 words, 7 images** (was 510 words, **0** images) |
| Service card row | all three uniform, 16px gap, no dead space |
| `Home` in the nav | present, both locales (`Home` / `Inicio`) |
| `/about`, `/es/about` | redirect to `/` and `/es` |
| Sitemap | no longer lists `/about` |
| Structured data | `FAQPage`, `HealthAndBeautyBusiness`, **`Person`** - the Person schema survived the page deletion |
| FAQ | 5 native `<details>`, no JavaScript |
| Horizontal overflow | none at 412px or 1440px |
| Console, fresh tab | clean - React DevTools notice and HMR only |

## Not verified

**The teaser's lazy images could not be proved to load on scroll in the browser
pane.** Five of six never start, despite being in the viewport for 8 seconds;
forcing one to `loading="eager"` loads it instantly, so the markup, URLs and
network are all correct.

A control settles it: the **gallery page** - already shipped, and confirmed on
Frank's phone, iPad and 27 inch monitor - behaves identically here, with 5 of 9
lazy images never starting. So this is the pane's emulated scrolling and not
`WorkTeaser`. It is recorded rather than dismissed because it is exactly the
class of thing this project has been bitten by before, and one look on a real
phone closes it.

## Implementation walkthrough

### How this feature got found

Not from the plan. Frank opened the site, said the home page was "very lame,
that's the landing page, there's nothing there", and then compared it against
Primo Painters, which is live and ranking.

That comparison is what turned a vague complaint into a number. Primo's home
page: **605 words, 132 images**. This one: **510 words, zero**. The word counts
are within 100 of each other, so the gap was never text - it was that there was
nothing to look at on a beauty site whose own locked direction says
"photography carries it".

Reading item 3's archive then explained why. Its spec had deliberately dropped
the hero photograph and the gallery teaser, with the reason written down: *"It
is photographs, and there are none. ImageKit is not configured and no work
photos exist in the repo. Item 4."* Item 4 shipped nine photographs. Nobody
came back.

So the failure was not a bad plan. It was a deferral that nothing tracked, and
the build plan kept reporting near-complete for four more features.

### `components/home/Hero.tsx`

The photograph the mockup always wanted, finally there. It reads
`orderedGallery()[0]` rather than a hand-picked path, because `data/gallery.ts`
already states the set is ordered strongest first - that keeps the choice in the
data, so changing which photograph leads is a reorder there rather than an edit
here.

Stacked on a phone with the type first, side by side only from 860px, the same
breakpoint the service cards use. `priority` is set because on a phone this is
the largest thing above the fold, and lazily loading the LCP element is the one
case Next's default gets wrong.

The panel sits on `bg-shot` rather than the band's own ground, which is the
locked rule that photo panels stay nearer `#1B1426` so the work keeps its punch
without darkening the whole page.

### `components/home/WorkTeaser.tsx`

New, and the single biggest change on the page. Six photographs and a link
through to `/gallery`.

`WorkStrip` does the same job on a service page and was deliberately not reused:
it filters to one service and takes its copy from `t.services[id].work`, which
is the wrong heading here. What both share is `GalleryFigure`, so the scrim, the
service tag and the missing-endpoint placeholder behave identically in all three
places a photograph now appears.

Rendered **without** an `index`, so each figure draws no button. The lightbox
stays the gallery's: giving home a second surface would double the review and
turn these figures into client components, undoing the reason the photographs
are passed as children in the first place.

### `components/home/ServiceCards.tsx` - the one that changed shape

The spec said a card with no photograph keeps today's text-only treatment.
Built that way first, then measured on the running page at 1440px, and the
measurement overturned it.

The grid stretches every card to the tallest, so all three came out **431px**.
Nails carried a 278px photograph and a 16px gap before its link; lashes and
makeup carried **294px of empty background** between the blurb and the link.
That does not read as "no photo yet", it reads as two images that failed to
load.

So the row became the unit and degrades together - the same judgement
`WorkStrip` already makes about an empty strip, applied one level up. All three
or none.

**The visible effect today is therefore nothing**, which is worth saying plainly
rather than burying: only nails has photographs, so the row stays text-only. The
code lights up on its own the day lash and makeup photographs land in
`data/gallery.ts`, with nothing to change.

### `components/home/Bilingual.tsx` and `Expect.tsx`

Both lifted off `/about`. The bilingual promise is a locked contract in
`project-plan.md` - it belongs on the home page as a claim, not implied by the
existence of a `/es` URL - and it had been sitting on a page almost nobody
reached. Its eyebrow reuses `languageSwitch.to`, which is the other language's
own name in its own language, so a Spanish reader meets "Español" on the English
page and vice versa.

`Expect` is the three numbered steps for the visitor the plan calls "her mother,
paying for a grad set". The numbers are `aria-hidden` because `<ol>` already
conveys sequence and reading "one" twice is noise.

### `components/home/Story.tsx`

Absorbed About's opening lede and its portrait slot. Both were saying what this
section already said, one page further from anyone reading it.

The portrait is still `null` in `data/portrait.ts` and the page renders without
one on purpose. Two frames from the set she sent are almost certainly her, but
nobody has confirmed it or asked whether she wants her face on the site. A
missing photograph is a content decision rather than a broken build, so there is
no placeholder box either.

### Deleting `/about`

Five consumers, and the type system caught the ones that mattered:

| Where | What |
|---|---|
| `app/[locale]/about/page.tsx` | deleted |
| `lib/locale.ts` | `"/about"` out of `routes`, which feeds `generateStaticParams`, the root rewrites **and** the sitemap - three consumers off one line |
| `data/siteConfig.ts` | out of `nav` and `footer.contact`; `home` added to `nav` |
| `lib/schema.ts` | `t.about.jobTitle` and `t.about.lede` repointed, or `personSchema` would have broken |
| `next.config.ts` | redirects for `/about` and `/es/about`, listed per locale because the root rewrite only covers English |

`personSchema` moved onto the home page rather than being dropped with the
route. It is the only place the site says who is doing the work, and her story
now lives on that page anyway.

The dictionaries were migrated with a script rather than by hand, because both
are CRLF in the working tree and a rewrite that changes the endings churns the
whole file in the diff. The script normalizes to LF for the surgery and restores
CRLF on write.

`Home` in the nav came from Frank directly: the wordmark links home and carries
"Dani Moreno, home" for screen readers, but a sighted visitor had no Home link
at all. Primo, the site that ranks, has one.

### The FAQ that did not grow

Step 6 added nothing, and that is the correct outcome rather than a shortfall.

The five existing questions already cover booking, duration, location,
cancellation and scope. The bilingual promise now has its own band on the same
page, so an FAQ entry for it would repeat an answer on a single page - the
convention the old `about.expect` comment set out. Everything else a visitor
actually asks - deposits, removals and fills, first-timers, payment methods - is
a promise to a customer and is recorded nowhere in the repo or the plans.
Section 3 of the project plan forbids shipping placeholder text, so nothing was
written.

Those four questions need Dani, and they are the cheapest content win left on
the site.

### What the browser caught that the build could not

Two things, and one of them was a false alarm worth recording.

**The service card measurement**, above. A green build would have shipped 294px
of dead space in two of three cards.

**The teaser's lazy images never start in the browser pane.** Five of six, with
all six in the viewport for eight seconds. Forcing one to `loading="eager"`
loaded it instantly, so the markup, URLs and network were all fine.

The control settled it: the **gallery page** - already shipped, and confirmed on
Frank's phone, iPad and 27 inch monitor the same day - behaves identically here,
with 5 of 9 lazy images never starting. So it is the pane's emulated scrolling
and not `WorkTeaser`. Recorded rather than dismissed, because this project has
been bitten three times by things only a real browser shows, and one look on a
real phone closes it.

### The numbers, before and after

| | Before | After |
|---|---|---|
| Sections | 5 | 8 |
| Words | 510 | 543 |
| **Images** | **0** | **7** |
| Structured data | `FAQPage`, `HealthAndBeautyBusiness` | plus `Person` |
| Routes | 8 | 7 |
