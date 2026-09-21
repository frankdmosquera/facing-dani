# Feature: Home page

**From build-plan:** feature 3

**Branch:** `feature/home-page`

## Goal

Replace the placeholder with the real home page: the thing the Instagram bio
link actually lands on. Hero, the three services, her story, FAQ and the booking
call to action, in both languages, with its own structured data.

First content item. Everything before this was frame.

## Design reference

- `prototypes/home.html` - the full mockup, sections `.hero`, `.band`,
  `.band.story`, `.band.final`. Its copy is the English draft for this feature.
- `prototypes/theme.css` - already ported; use the tokens in `globals.css`, not
  this file.

## In scope

- **Hero** - eyebrow, headline, the selling paragraph, two calls to action, and
  the "or send a DM" line.
- **Three service cards** - name and one-line description each, colour-coded,
  linking to their service pages.
- **Her story** - the training paragraph and the building-from-scratch paragraph.
- **FAQ** - the five questions from the mockup, as native `<details>`.
- **Final booking band** - the closing call to action.
- **Service and FAQ data**, typed so a key with no label fails the build.
- **`FAQPage` JSON-LD**, per locale, generated from the same FAQ data.
- Spanish for all of the above.

## Out of scope

- **Prices.** The mockup carries twelve figures from `$5` to `$110`. **Every one
  was invented during prototyping; Dani has never been asked.** Publishing them
  is not placeholder text, it is wrong information a visitor could book against.
  The build plan assigns prices to item 5, which is where they belong.
- **The gallery teaser.** It is photographs, and there are none. ImageKit is not
  configured and no work photos exist in the repo. Item 4.
- **The hero photograph.** Same reason - see Open questions, because it changes
  how this page looks.
- **`LocalBusiness` JSON-LD**, sitemap, robots. Item 9.
- **The contact form.** The CTA links to `/contact`; item 7 builds it.

## Build loop

`workflow.stepReview` is `feature`: build all four steps, then one review.
`workflow.checkpointCommits` is `disabled`. `/complete` makes the commit.

No `Verify` script. Gate each step on `npm run lint` then `npm run build`, and
run both once more at the end.

## Build steps

- [x] **1. Service and FAQ data, typed**

  `data/services.ts`: three entries with `id` (`nails` | `lashes` | `makeup`),
  `order` and `href`. Shared facts only - no prices, no treatments. Item 5 adds
  those.

  `data/faq.ts`: five entries with `key`, `order`, and `serviceId` of `null`
  (all five are site-wide). The shape carries `serviceId` now because item 5 may
  add per-service FAQs and the structured data should not need reshaping then.

  Dictionary gains `services` (name and blurb per service) and `faq` (question
  and answer per key). **Keyed objects, not arrays.** An array of FAQs would
  slip past the missing-string build error, because array length is not
  type-checked.

  **No `as keyof` anywhere.** Derive `ServiceKey` and `FaqKey` from the
  dictionary exactly as `NavKey` and `FooterKey` are derived. The last fix
  exists because a cast in a lookup shipped three empty links; do not add a
  fourth lookup that can do the same.

  Done when: `npm run lint` and `npm run build` exit 0; no new `as keyof` in
  `components/` or `app/`; and renaming one service or FAQ key to a name with no
  dictionary entry fails the build naming it. Restore the key afterwards.

- [x] **2. Hero and the three service cards**

  Replace the placeholder in `app/[locale]/page.tsx`. The page stays a server
  component; nothing here needs the client.

  Hero: eyebrow, `h1` with the gradient span, the selling paragraph, a primary
  CTA to `/contact` and a secondary to `/gallery`, then the Instagram line as
  plain prose - **not a link**, because the handle is still unknown and a dead
  link is worse than a sentence.

  Service cards: colour-coded per the locked accent tokens. **Colour is not the
  only cue** - each card carries its name as text, so the page works in
  greyscale and for a colourblind visitor.

  Done when: build passes; `/` and `/es` both render hero and three cards with
  real copy in the right language; exactly one `h1` per page; the three cards
  link to `/nails`, `/lashes`, `/makeup` and their `/es` equivalents.

- [x] **3. Her story, the FAQ, and FAQPage JSON-LD**

  Story band: the two paragraphs, in her first person.

  FAQ: native `<details>`/`<summary>`. No JavaScript, no client component, and
  it works with JS off.

  Emit `FAQPage` JSON-LD from the same `data/faq.ts` and dictionary, so the
  markup and the structured data cannot disagree. The Spanish page emits the
  Spanish questions and answers.

  Done when: build passes; both locales show five questions that open and close
  without JavaScript; the JSON-LD in each page's source contains five
  `Question` entries whose text matches the rendered text in that locale.

- [x] **4. Final booking band and section rhythm**

  The closing CTA band, plus the section spacing and glow treatment from the
  mockup so the page reads as one piece rather than five stacked blocks.

  Glows use the `--glow-*` tokens already in `globals.css`. Any animation is CSS
  and must stop under `prefers-reduced-motion: reduce`; the ticker is the
  existing example.

  Done when: build passes; the page reads top to bottom at 375px and 1280px with
  no horizontal scroll; and with reduced motion on, nothing moves.

## Files / areas

| Path | Change |
|---|---|
| `app/[locale]/page.tsx` | The real page, replacing the placeholder |
| `components/home/*.tsx` | New: `Hero`, `ServiceCards`, `Story`, `Faq`, `BookingBand` |
| `data/services.ts` | New |
| `data/faq.ts` | New |
| `dictionaries/en.ts`, `es.ts` | `services`, `faq`, hero and story copy |
| `lib/schema.ts` | New: the `FAQPage` JSON-LD builder |

Per the standards, components live in `components/[feature]/`, so `home/` rather
than adding to `shell/`.

## Data / contracts

Two contracts later items inherit:

1. **`data/services.ts` is the service list.** Item 5 extends each entry with
   `treatments`; it does not create a second list. `id` doubles as the accent
   token key, which is what keeps colour meaning the same thing on every page.
2. **FAQ lives in one place and renders twice** - visible markup and JSON-LD -
   from the same data. They cannot drift.

Both follow the established split: `data/` holds ids, order and hrefs;
`dictionaries/` holds every word a visitor reads.

## Testing

No test runner is configured; this item adds none. `lib/schema.ts` is the one
piece with real logic and would be a reasonable first unit test if you run
`/tests` first.

Verification is `npm run lint` and `npm run build`, plus each `Done when`. The
rendered checks in steps 2, 3 and 4 need the deployed preview or `npm run dev`.

**Check the rendered page, not just the build.** Both bugs that reached
production so far - the invisible mobile menu and three empty footer links -
passed lint, build and output greps. Someone opened the page and saw them.

## Notes for the AI

- Server components throughout. Nothing on this page needs the client;
  `<details>` is native.
- Read `node_modules/next/dist/docs/01-app/` before writing metadata or
  structured data rather than recalling the API.
- The mockup is raw CSS. Port the intent into Tailwind against the existing
  tokens; do not copy its stylesheet.
- A component never contains a business fact. The dictionary may - it is
  per-project data, same as `siteConfig`.
- The four accents keep their meanings: pink nails, violet lashes, orange makeup.
- Every visitor-facing string comes from a dictionary, in both locales, or the
  build fails. That guarantee is the point of item 2; do not add a fallback.

## Open questions

1. **The hero ships without its photograph, and that changes how the page
   looks.** The mockup's hero is a 380px image block, and "photography carries
   it" is a locked decision in section 7. There are two photos in
   `prototypes/img/` but no ImageKit configuration, and the standards say images
   go through ImageKit rather than `public/`. So the hero will be type-led until
   item 4. Worth seeing before deciding whether item 4 should move sooner.
2. **The Spanish copy is a draft again.** The English comes from the mockup,
   whose own footer calls it "placeholder content, nothing here is final", and
   the Spanish will be my translation of it. Both need Dani. Recorded so that
   "real copy" in the definition of done is not read as "approved copy".
3. **"Book with Dani" carries her name into the dictionary.** That is allowed -
   dictionaries are per-project data, like `siteConfig` - but a second client
   would edit it. Noting it so the template rule is not misread as broken.

---

## Status: verified against build output, not against a rendered page

`npm run lint` exit 0, `npm run build` exit 0.

| Check | Result |
|---|---|
| New `as keyof` | **zero** in `app/`, `components/`, `lib/`, `data/` (one match is a comment explaining why not to) |
| `h1` per page | exactly 1, both locales |
| FAQ entries | 5 `<details>`, both locales |
| FAQPage JSON-LD | 5 `Question` entries, both locales |
| Schema vs rendered | every schema question appears as a rendered `<summary>`, every answer appears in the page text, in that locale |
| Copy volume | ~411 words English, ~421 Spanish, all from the dictionaries |
| New animation | none, so nothing new to stop under reduced motion |

**Both new key spaces are guarded.** Renaming a service to `lashez` and an FAQ
key to `cancelation` failed the build:

```
TS2820: Type '"lashez"' is not assignable to '"nails" | "lashes" | "makeup"'
TS2322: Type '"cancelation"' is not assignable to
        '"booking" | "duration" | "location" | "cancelling" | "hair"'
```

Both restored.

## Departures from the spec

1. **The service card no longer carries a coloured tagline above its name.**
   The mockup has one, and reproducing it meant printing the service name
   twice in the same card. The accent is now a rule across the top of the card
   instead: colour still present, name once.
2. **The card link reads "See more" rather than "See the work".** It points at
   the service page, not the gallery, and the mockup's label would have sent
   the wrong signal.
3. **The final band's Instagram button renders only when the handle is set**,
   the same conditional the footer uses. The markup is in place, so it appears
   the day the handle lands rather than needing a code change.

## Not verified

The three rendered done-whens: the page at 375px and 1280px, no horizontal
scroll, and the `<details>` opening without JavaScript. All need a running
server or the deployed preview.

**This matters more than usual here.** Both bugs that reached production so far
passed lint, build and output greps, and were found by opening the page. This
is the first item that is mostly layout and copy.

---

## Implementation walkthrough

### `data/services.ts` and `data/faq.ts` - ids, not words

Both follow the split the earlier items settled: `data/` holds ids, order and
hrefs; `dictionaries/` holds every word a visitor reads. Both key types are
derived from the dictionary, so a service or question with no label is a
compile error.

`faq` is a keyed object rather than an array of strings, and that was a
deliberate choice rather than a stylistic one. An array would have slipped past
the missing-translation guarantee from feature 2: array *length* is not
type-checked, so a Spanish list with four entries where English has five would
compile and ship a page that silently drops a question.

`FaqItem.serviceId` is `null` on all five. It exists now because item 5 may add
per-service questions, and the structured data should not need reshaping then.

### `components/home/Band.tsx` - the section chrome

One `Band` wrapper carrying padding, the optional tinted background and the
glow. The glow is three blurred blobs positioned absolutely, coloured and
blurred entirely from the `--glow-*` tokens.

Keeping the blur radius in a token rather than the markup is what makes light
mode work: section 7's rule is "glow becomes tint", and `.light` already sets
`--glow-blur: 0` with pale fills. Hardcoding `blur(90px)` in a component would
have quietly broken that the day someone switches the theme on.

`BandHead` and `Hot` exist so the eyebrow/heading/lede rhythm and the gradient
text treatment are written once.

### `components/home/ServiceCards.tsx` - colour as navigation

The accent is keyed off `service.id`, so pink cannot drift away from nails.

**Colour is never the only cue.** Each card carries its name as text, so the
page still works in greyscale and for a colourblind visitor - the accent
reinforces, it does not carry the meaning.

The mockup puts a coloured tagline above the card heading. Reproducing it meant
printing the service name twice in the same card, so the accent became a rule
across the top of the card instead. Colour still present, name once.

The card's link says "See more" rather than the mockup's "See the work",
because it goes to the service page and not the gallery.

### `components/home/Faq.tsx` and `lib/schema.ts` - one source, two outputs

Native `<details>`/`<summary>`. No JavaScript, no client component, and the
browser supplies the keyboard and screen-reader behaviour.

The `FAQPage` JSON-LD is generated from the same `data/faq.ts` and the same
dictionary the visible list renders from. That is the point: structured data
usually goes stale because it is a second copy of the page's content, and here
there is no second copy to fall behind.

`jsonLd()` escapes `<` before serialising. Nothing in these dictionaries
contains `</script>` today, but that is the one stray character that ends the
tag early and dumps the rest of the page into the document rather than just
rendering oddly.

### `components/home/Hero.tsx` - what is missing, and why

The mockup's hero has a 380px photograph beside the type. There is none:
ImageKit is not configured and no work photos are in the repo. The hero is
type-led until item 4.

That is a visible compromise, not an oversight, and it is the single biggest
argument for moving item 4 sooner. "Photography carries it" is a locked
decision in section 7, and this page is currently carrying itself.

The "or send a DM on Instagram" line is prose rather than a link, because the
handle is still unknown. The final band's Instagram button uses the same
conditional the footer does: the markup is in place and renders the day the
handle lands in `siteConfig`.

### What was verified, and what was not

Build-level everything: lint and build clean, zero new `as keyof`, one `h1` per
page, five `<details>` per locale, five `Question` entries in the JSON-LD per
locale, and every schema question and answer present verbatim in that locale's
rendered text. Both new key spaces were broken on purpose - `lashez` and
`cancelation` - and both failed the build by name.

**The page itself was never rendered.** Layout at 375px and 1280px, horizontal
overflow, and `<details>` opening without JavaScript are all unobserved. No
server was running and this branch had no preview at the time of completion.

That is worth reading alongside the two bugs already in
`blueprint/history/fixes/`: the invisible mobile menu and three empty footer
links both passed lint, build and output greps, and both were found by opening
the page. This item is mostly layout and copy, which is the category where that
gap bites hardest.
