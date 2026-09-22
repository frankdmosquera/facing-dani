# Feature: About - the page

**From build-plan:** feature 6a

**Branch:** `feature/about`

## Goal

`/about` and `/es/about`: the page that makes a stranger willing to hand over
two hours and a hundred dollars to someone with no reviews.

The overview names the audience this page is really for: her mother, paying for
a grad set, arriving from Google, needing the business to look legitimate in
four seconds - a human name, a face, a location, no dead links. She will not DM
a teenager. This is the page that answers her.

It is also one of the two places the bilingual promise gets said out loud rather
than left implied by a `/es` URL.

## In scope

- The `/about` route for both locales, with its own metadata, canonical and
  hreflang.
- A portrait of Dani, with the same missing-endpoint placeholder behaviour the
  gallery already has.
- Her story, in material the home page does not already carry.
- **The bilingual promise, stated explicitly.** A locked contract, see below.
- What actually happens at an appointment, so a first-timer knows what she is
  walking into.
- `Person` JSON-LD, including `knowsLanguage`.
- A `Photo` primitive extracted from `GalleryFigure`, so the endpoint check and
  the placeholder live in one place rather than three.

## Out of scope

- **Reviews or testimonials.** Item 10, post-MVP, and there are none. The whole
  point of this page is earning trust *without* them.
- **The contact form.** Item 7. The CTA links to `/contact` like every other page.
- **Sitemap and robots.** Item 9.
- **A second FAQ.** The home page owns the FAQ. Repeating it here is the
  duplicate-content mistake features 4 and 5 both avoided.
- **Changing the home page's Story section.** It stays exactly as it is; this
  page works around it. See Notes.
- **Her full legal name.** Unresolved and bigger than this page. See Open
  questions.

## Build loop

`blueprint/config.json` sets `workflow.stepReview: "feature"` and
`workflow.checkpointCommits: "disabled"`: steps in order, no commits during
implementation, one review at the end. `/complete` makes the single commit.

No declared Verify command. The gate is `npm run build` (TypeScript runs inside
it) and `npm run lint`, plus looking at the page. Baseline on `main` at spec
time: build passes, nine static routes.

**Step 3 is gated on biographical material that does not exist.** Steps 1, 2, 4
and 5 run today. Read Open questions before starting: unlike features 4 and 5,
shipping this one without its content is not harmless.

## Build steps

- [x] **1. Extract the `Photo` primitive.**
  `components/media/Photo.tsx`: an ImageKit image with the labelled placeholder
  when no endpoint is configured, and nothing else - no scrim, no tag, no
  filter classes. Rewrite `GalleryFigure` to use it for the image itself while
  keeping its own chrome.
  *Why now:* the endpoint check and placeholder currently exist in two branches
  of `GalleryFigure`, and this page needs a third. One copy is the point.
  **Done when:** `npm run build` and `npm run lint` pass, and `/gallery` renders
  byte-identically to before apart from whitespace - same ten images, same
  `sizes`, same `width`/`height`, same single preload.

- [x] **2. The route, page head and CTA.** *No portrait exists, so none renders.*
  `app/[locale]/about/page.tsx` with its own `alternates`, the eyebrow, H1 and
  lede, the portrait, and the lifted `BookingBand` with its own copy. No story
  body yet.
  **Done when:** the build route table lists `/en/about` and `/es/about` as
  prerendered; both render their own H1 and lede; `/en/about` 301s to `/about`;
  each page's canonical and three hreflang links point at `/about`, not at `/`;
  and the portrait renders, or renders its placeholder when the endpoint is
  unset.

- [ ] **3. The story body.** *Gated - see Open questions.*
  Her training, how she got here, and how she works, in both languages.
  **Done when:** the page carries her story in both locales, and **no sentence
  or distinctive phrase is shared with `home.story`** - checked by reading both,
  not by grep alone.

- [x] **4. The bilingual section and what to expect.**
  Two blocks. The first says plainly that the whole appointment can happen in
  Spanish, not just the website. The second walks a first-timer through an
  appointment without restating the FAQ's five answers.
  **Done when:** both render in both locales, the Spanish version of the
  bilingual block reads as written-for-Spanish rather than translated, and
  nothing in either block repeats a sentence from `t.faq`.

- [x] **5. `Person` JSON-LD and the closing pass.**
  `personSchema` in `lib/schema.ts`, with `knowsLanguage: ["en", "es"]`,
  `worksFor` the LocalBusiness, and `areaServed` Calgary.
  **Done when:** each locale emits exactly one `Person` block; the name comes
  from `siteConfig` rather than a literal; Calgary appears in the title, H1 and
  copy; `npm run build` and `npm run lint` pass clean.

## Files / areas

New:

- `app/[locale]/about/page.tsx`
- `components/media/Photo.tsx`
- `data/portrait.ts` - the portrait record

Changed:

- `components/gallery/GalleryFigure.tsx` - use `Photo` for the image
- `dictionaries/en.ts`, `dictionaries/es.ts` - an `about` block
- `lib/schema.ts` - `personSchema`

Unchanged: `lib/locale.ts` already lists `/about` in `routes`, so the rewrite and
the `/en` redirect exist. The header nav and the footer's contact column already
link to it. No routing or config change is needed.

## Data / contracts

**The portrait**, in `data/portrait.ts`, mirroring the `GalleryImage` split -
path and dimensions shared, alt text locale-keyed:

```ts
export type Portrait = {
  /** Path inside the ImageKit library, leading slash, no endpoint. */
  imagekitPath: string;
  width: number;
  height: number;
};
```

Its own file rather than a row in `data/gallery.ts`, because it is not work and
must never appear in the gallery grid or its `ImageGallery` schema. Alt text
lives at `about.portraitAlt`.

`null` is a legal value: if no portrait ships, the page renders without it rather
than with a placeholder box. A missing endpoint is a configuration problem and
gets the placeholder; a missing portrait is a content decision and gets nothing.

**`Photo`** takes `path`, `alt`, `width`, `height`, `sizes`, `priority` and
`className`, and owns exactly one behaviour beyond rendering: when
`imagekitEndpoint` is undefined it returns a labelled box at the right aspect
ratio instead. Everything decorative stays with the caller. `GalleryFigure` keeps
its scrim, tag and filter classes and delegates only the image.

**Dictionary shape**, a new `about` block in both locales:

```
about.meta.title / .description
about.eyebrow / .headingLead / .headingAccent / .lede
about.portraitAlt
about.story.*                 the paragraphs - shape settled in step 3
about.bilingual.heading / .body
about.expect.heading / .steps one short item per stage of an appointment
about.cta.*                   its own closing ask, per BookingBandCopy
```

**Metadata**, set explicitly for the reason the last two features both needed:
the layout points `canonical` and all three `hreflang` values at `/`, and a
child's `alternates` replaces rather than merges.

**`Person` JSON-LD**:

```
{ "@context", "@type": "Person", name, jobTitle, description,
  knowsLanguage: ["en", "es"],
  worksFor: { "@type": "LocalBusiness", name },
  areaServed: { "@type": "City", name: "Calgary" },
  image  // only when a portrait exists
}
```

`name` and `worksFor.name` both read `siteConfig.business.name` today, which is
the same string for both. That is a known simplification - see Open questions.
`image` is omitted rather than null when there is no portrait.

## Testing

No unit tests: no runner is configured and `/tests` has not been run. No browser
harness. The gate is `npm run build` and `npm run lint` plus the manual checks in
each step.

Step 1 is a refactor of shipped code, so it needs a before/after comparison of
the rendered `/gallery` markup rather than just a green build.

Check both locales. This page carries the bilingual promise, so a rough Spanish
version of it would undercut the exact claim it is making.

## Notes for the AI

**The home page already told this story, and you may not tell it again.**
`home.story` covers: trained in Colombia, the standard being higher than people
expect, shape/structure/cuticle deciding week three, and building the business
from the ground up. Those are spent. The About page needs material the home page
does not have, or it becomes a second page competing with the first for the same
words - which is the one thing the three-service-pages decision exists to avoid.

**Trust here is specificity, not adjectives.** "Passionate about beauty" is worth
nothing. Where she trained, how long, what she was drilled on, what she does
between clients, what happens if a nail breaks in week two - those are worth
something. A new business earns trust by being concrete, because a fraud is
vague.

**The bilingual promise is a locked contract**, quoted from the overview: *"A
translated site tells a visitor she can read it; a fluent artist tells her she
can have the whole appointment in Spanish. That gets said out loud on the home
and about pages."* The home page says it in `meta.description` ("Se habla
espanol"). This page must say it properly, in its own words, in both languages.

**No component contains the word Dani.** The name comes from `siteConfig`, on
this page as much as any other.

**Reuse, do not re-derive.** `Band`, `BandHead`, `Hot` and `BookingBand` are in
`components/site/`. `BookingBandCopy` is the shape a CTA block needs.

**Animation is CSS. Do not add a package.**

## Open questions

**1. There is no biographical material, and this page cannot be faked.**
Blocks step 3. What exists is what the home page already says. To write an About
page that is not a paraphrase of it, somebody needs to ask Dani:

- where she trained, what the programme was, and how long it took
- when she started doing nails, and when she came to Calgary
- what she does between clients - sterilisation, single-use files, how tools are
  handled. This is the single strongest trust signal available to a nail and lash
  artist, it costs nothing to state, and no competitor page in the references
  bothers to
- whether she works from home, a studio, or travels
- what she does if a set fails in week two

**This one is different from prices and photographs.** A gallery with no photos
and a price list with no prices were honest empty states. An About page with no
new material is not empty - it is a second copy of the home page's story, which
actively competes with it in search. Shipping steps 1, 2, 4 and 5 without step 3
is defensible; shipping step 3 with recycled copy is not.

**2. Is the portrait actually Dani, and is she happy for it to be public?**
Two frames from the 72 she sent, `IMG_7454` and `IMG_7455`, show a woman in a
salon. Almost certainly her, but nobody has confirmed it, and neither was
uploaded to ImageKit for that reason.

This is a much smaller question than the makeup pair: if it is her, the consent
is hers to give and the answer is probably just yes. Worth asking in the same
message as the biography.

The overview says this page needs a human face in four seconds. Without a
portrait the page still works, but it is doing its main job with one hand tied.

**3. Her name is still unresolved, and this is the page where it shows.**
`links.md` has recorded since 2026-09-21 that `siteConfig.business.name` is
"Dani Moreno" while her email suggests Daniela Hernandez Moreno. An About page is
exactly where a full name belongs, and the `Person` schema wants a real one.

Spec'd to read `siteConfig.business.name` for both the person and the business,
which is correct only while they are the same string. Deciding the real answer
also decides what goes on the Google Business Profile, and the overview is
explicit that the two must match character for character. Not blocking - the page
builds either way - but it is cheaper to settle before the profile exists than
after.

---

## Split at completion

**This archive covers 6a, not all of item 6.** Build step 3, her story, was not
built and item 6 stayed unchecked in the build plan. It was split at completion,
with approval, into:

- **6a** the page, the bilingual promise, what to expect, and `Person` data - this
- **6b** her story, which waits on material only Dani can give

The reason for splitting rather than checking item 6 off: its build-plan line
reads "her training and the trust a new business has not earned yet", and while
the trust half is substantially here, the training half is not written at all.
Checking it off would have recorded a page as finished when half its named
deliverable is missing.

Shipping 6a anyway is worth it because `/about` is linked from the header and the
footer and currently 404s. A real page missing a section beats a dead link, which
is the same call features 4 and 5 both made.

Build step 3 is left in this archive, unchecked, because its reasoning - what to
ask her, and why the home page's story cannot be reused - is what 6b's spec will
be written from.

## Status: verified against build output, not against a rendered page

`npm run build` exit 0, `npm run lint` exit 0. The route table gained
`/[locale]/about` with both paths prerendered.

Parsed out of the prerendered HTML with the RSC payload stripped first:

| | `/about` | `/es/about` |
|---|---|---|
| H1 carries Calgary | yes | yes |
| Calgary in body copy | yes | yes |
| Canonical | `/about` | `/es/about` |
| hreflang trio | own route | own route |
| Images | 0, no portrait exists | 0 |
| "What actually happens" items | 3 | 3 |
| `Person` JSON-LD | one | one |
| `knowsLanguage` | `["en","es"]` | same |
| `jobTitle` | Nail, lash and makeup artist | Artista de uñas, pestañas y maquillaje |
| `image` field | omitted | omitted |

**No body sentence is shared with the home page.** Both rendered documents were
stripped to text and compared sentence by sentence; the only overlap is the
header and footer chrome. `home.story` keeps its material.

**The `Photo` extraction is provably inert.** The rendered `/gallery` markup -
every `<img>` tag and every `as="image"` preload - was captured before the
refactor and compared after: **byte-identical**. Same ten images, same `sizes`,
same `width`/`height`, same four preloads.

## Departures from the spec

1. **`jobTitle` was initially the page title.** `personSchema` was written with
   `jobTitle: t.about.meta.title`, which put "About the Artist - Nails and
   Lashes in Calgary" into a field meant to hold an occupation. It now has its
   own dictionary string, schema-only and never rendered.
2. **Calgary was missing from the body copy.** The closing pass found it in the
   title, the H1 and the schema but not in the prose, which the overview also
   requires. Both ledes were extended.
3. **A Spanish agreement error was introduced and caught in the same pass** -
   "lo que realmente pasan dos horas" corrected to "lo que realmente pasa en dos
   horas".
4. **`Photo`'s placeholder carries no visible label.** The spec described a
   "labelled box", which in `GalleryFigure` meant printing the service name
   inside it. The figcaption already shows that name and is forced visible on
   touch devices, so printing it twice in the fallback would have duplicated it.
   The box keeps its `aria-label` and the caption does the visible labelling.
5. **The portrait renders nothing at all**, not a placeholder. That distinction
   is deliberate and is now written into `data/portrait.ts`: a missing endpoint
   is a configuration mistake and gets a box so the layout still reads, while a
   missing portrait is a content decision and gets silence.

## Not verified

- **Nothing was seen rendered in a browser.** No dev server was started. The
  numbered list, the band rhythm and the page at phone width are argued from
  markup and CSS.
- **`/en/about` redirecting to `/about`** is argued from the `next.config.ts`
  rule that already works for `/en`, `/en/gallery` and the service routes. Not
  observed.
- **The Spanish is draft.** Dani has not read it. That matters more here than
  anywhere else on the site, because the bilingual section is a claim about her
  fluency and stilted Spanish would disprove it in the act of making it.
- **There is no portrait**, so the page does its main job - a human face in four
  seconds - without a face.

---

## Implementation walkthrough

### Extracting `Photo`

`components/media/Photo.tsx` is the whole reason step 1 came first. The
missing-endpoint check and its fallback box lived in two branches of
`GalleryFigure`, and this page needed a third for the portrait. Three copies of a
conditional that decides whether a page can render at all is how one of them ends
up different from the other two.

`Photo` owns exactly one behaviour beyond drawing an image: when no endpoint is
configured it draws a box at the photograph's real aspect ratio instead, so the
layout still reads for someone who has not pulled the env file. Everything
decorative belongs to the caller.

That last part changed the gallery's fallback slightly. The old fallback printed
the service name inside the box; the new one does not, because `GalleryFigure`'s
figcaption already shows it and is forced visible on touch devices. Printing it
twice would have been a regression dressed as a refactor. With an endpoint
configured - which is every real environment - the rendered output is identical,
and that was verified byte for byte rather than assumed.

### The page

`app/[locale]/about/page.tsx` follows the shape the gallery and the service pages
established: explicit `alternates` because the layout's point at `/`, the
eyebrow/H1/lede band, then content bands, then `BookingBand` with its own copy.

The portrait is wrapped in a `portrait ? ... : null`, and `data/portrait.ts`
exports `null` today. It is its own file rather than a row in `data/gallery.ts`
because a portrait is not work: in the gallery it would be filtered, counted, and
listed in `ImageGallery` structured data as an example of what a client can book.

### What the page says, and what it deliberately does not

The hard constraint on this feature was that `home.story` already tells the story
an About page would naturally tell - trained in Colombia, the standard being
higher than people expect, week three, building from the ground up. Those are
spent. Repeating them would put two pages of this site in competition for the
same words, which is the failure the three separate service pages exist to avoid.

So the page says three things the home page does not.

The **bilingual promise**, which is a locked contract from the overview: a
translated site tells a visitor she can read it, a fluent artist tells her she
can have the whole appointment in Spanish. The Spanish version is written for
Spanish rather than translated from the English, because a promise about fluency
delivered in stilted Spanish disproves itself.

**What actually happens** in the chair, in three steps: she looks at your hands
before she looks at the photo, most of the time goes before any colour, and tell
her early if something lifts. Deliberately not a second FAQ - the home page owns
booking, duration, location and cancellation, and none of those five answers
appear here. The third step stops short of promising a remedy, because what she
does about a failed set is a money rule nobody has stated.

And the **lede**, which names the actual problem this page exists to solve: a new
business has no reviews and nothing to point at except the work and the person
doing it.

### `personSchema`

Follows the three helpers already in `lib/schema.ts`: same dictionary the page
renders, so the prose and the structured data cannot drift.

`knowsLanguage: ["en", "es"]` is the field doing real work. It is the
machine-readable half of the bilingual promise, and the only signal anywhere on
this site that tells a search engine a Spanish-speaking client can be served in
Spanish.

`image` is omitted rather than null when there is no portrait, and `name` reads
`siteConfig.business.name` rather than a literal - which is correct only while
the person and the business share a string. They do today, and whether that
survives is the name question still open in `blueprint/reference/links.md`.
