# Feature: The menu and booking policies

**From build-plan:** feature 5b

**Status:** verified

**Branch:** `feature/the-menu-and-booking-policies`

## Goal

All three service pages still read "Prices are being set". The plan's job for
the site is to answer "what, how much, and how long, without a DM", and today
it answers none of the three. This feature fills the menu for nails, lashes and
makeup, and answers the four booking questions a first-time client asks before
she books: is there a deposit, how do I pay, can you take off what I have on,
and what should I know before a first visit.

Decided by Frank on 2026-09-23, on Dani's behalf:

- **Prices are set now**, from Calgary research and positioned mid-low, rather
  than waiting for Dani. She checks them before launch.
- **No deposit.** Payment is **cash or card**.
- **Removing an existing set costs something**; the amount is set here.
- **First-visit guidance** is written from research.
- **The build-plan line is widened** from the menu alone to the menu and booking
  policies, so "how much, and how does booking work" lands as one piece.

## In scope

- Rewording item 5b in `build-plan.md` to the approved scope.
- A treatment menu for all three services: labels in both dictionaries, rows in
  `data/treatments.ts`.
- `from` prices represented honestly in the `Service` structured data.
- Four new site-wide FAQ entries on the home page, in both languages.
- Regenerating the overview, which Frank runs.

## Out of scope

- **The booking FAQ's Instagram line** and the hero's "send a DM on Instagram".
  There is no business account yet. That is the `/fix` queued next, not this
  feature.
- **Photographs for lashes and makeup.** A separate build-plan item, queued
  after the fix, inside the stock-imagery boundary Frank approved.
- **Online payment, deposits, availability.** Out of scope for the MVP in the
  project plan, and "no deposit" makes the second moot.
- **A price for the bride herself.** See Open questions.
- **Removing the empty state.** `TreatmentList` keeps its "Prices are being set"
  branch and its dictionary strings. Nothing renders it once the rows exist, but
  it is template behaviour: the next client starts with no prices too.

## Build loop

`workflow.stepReview` is `feature`: work through every step and present one
review packet at the end. `workflow.checkpointCommits` is `disabled`, so make no
commits. `/complete` creates the single feature commit.

## Build steps

- [x] **1. Reword item 5b in the build plan.** Approved by Frank on 2026-09-23.
      Replace the two lines of 5b with:

      - [ ] 5b. **The menu and booking policies** - treatments, prices and
        durations in `data/treatments.ts`, plus the deposit, payment, removal
        and first-visit answers in the FAQ. Prices researched against Calgary,
        for Dani to confirm before launch

      Edit with a Node script that restores CRLF; `sed -i` rewrites the whole
      file as LF. Do not renumber anything.

      *Done when* 5b reads as above, nothing else in the file changed, and it is
      still pure CRLF.

- [x] **2. The nails menu.** Add these labels under `services.nails.treatments`
      in both dictionaries, and these rows to `treatments.nails`:

      | key | English | Spanish | Price | From | Minutes |
      |---|---|---|---|---|---|
      | `gelManicure` | Gel manicure | Manicure en gel | 40 | | 60 |
      | `acrylicFullSet` | Acrylic full set | Set completo en acrílico | 55 | yes | 120 |
      | `acrylicFill` | Acrylic fill | Relleno de acrílico | 40 | | 75 |
      | `gelXFullSet` | Gel-X extensions, full set | Extensiones Gel-X, set completo | 70 | yes | 120 |
      | `gelXFill` | Gel-X fill | Relleno de Gel-X | 55 | | 90 |
      | `french` | French tips, add-on | Puntas francesas, adicional | 10 | | 15 |
      | `chrome` | Chrome, add-on | Chrome, adicional | 15 | | 15 |
      | `nailArt` | Nail art, add-on | Arte en uñas, adicional | 5 | yes | 15 |
      | `removal` | Removal of a previous set | Retiro de un set anterior | 10 | yes | 30 |

      `order` follows the table. The two full sets are `from` because longer
      nails cost more on every Calgary menu read; nail art and removal because
      both scale with what is on the nail.

      *Done when* `/nails` and `/es/nails` render all nine rows with price and
      duration, the "From" / "Desde" prefix appears on exactly the four `from`
      rows, and `npm run build` passes.

- [x] **3. The lashes and makeup menus.** Same shape.

      | key | English | Spanish | Price | From | Minutes |
      |---|---|---|---|---|---|
      | `classicFullSet` | Classic full set | Set completo clásico | 110 | | 105 |
      | `hybridFullSet` | Hybrid full set | Set completo híbrido | 130 | | 120 |
      | `volumeFullSet` | Volume full set | Set completo de volumen | 150 | | 135 |
      | `fill` | Fill | Relleno | 65 | yes | 60 |
      | `removal` | Lash removal | Retiro de pestañas | 20 | | 30 |

      | key | English | Spanish | Price | From | Minutes |
      |---|---|---|---|---|---|
      | `softGlam` | Soft glam, events and photoshoots | Soft glam, eventos y sesiones de fotos | 75 | | 60 |
      | `fullGlam` | Full glam, grad and prom, lashes included | Full glam, graduación y prom, pestañas incluidas | 95 | | 75 |
      | `bridalParty` | Bridal party, per person | Cortejo nupcial, por persona | 85 | | 60 |
      | `stripLashes` | Strip lashes, add-on | Pestañas postizas, adicional | 10 | | 10 |

      Lash fills are `from` because a fill at four weeks is more work than one at
      two. The makeup labels carry the page's own search terms (grad, bridal,
      event, glam), which is where the plan says makeup must rank.

      *Done when* `/lashes`, `/makeup` and both Spanish twins render their rows,
      and the build passes.

- [x] **4. `from` prices in the `Service` structured data.** `serviceSchema` in
      `lib/schema.ts` currently emits `price: row.priceCad` for every row, so a
      "From $5" row tells Google the price *is* $5. For `from` rows emit a
      `PriceSpecification` instead:

      ```json
      { "@type": "Offer", "name": "Nail art, add-on",
        "priceSpecification": { "@type": "PriceSpecification",
          "minPrice": 5, "priceCurrency": "CAD" } }
      ```

      Exact rows keep `price` plus `priceCurrency`, unchanged.

      *Done when* the JSON-LD on `/nails` shows `minPrice` on the four `from`
      rows and `price` on the other five, and the build passes.

- [x] **5. Four booking answers in the FAQ.** New keys under `faq` in both
      dictionaries, and new rows in `data/faq.ts`, all `serviceId: null` so
      they appear on the home page and in its `FAQPage` data. New order:

      | order | key | Question |
      |---|---|---|
      | 1 | `booking` | (existing) |
      | 2 | `deposit` | Do I need to pay a deposit? |
      | 3 | `payment` | How can I pay? |
      | 4 | `duration` | (existing) |
      | 5 | `firstVisit` | It's my first time. What should I know? |
      | 6 | `removalAndFills` | Can you take off a set from another salon, and how often do I need a fill? |
      | 7 | `location` | (existing) |
      | 8 | `cancelling` | (existing) |
      | 9 | `hair` | (existing) |

      Answers, in her first person like the existing five:

      - **deposit** - No deposit. You book, you come in, and you pay at the end
        of the appointment.
      - **payment** - Cash or card, at the end of the appointment.
      - **firstVisit** - Come with bare nails, or tell me what is on them so I
        can plan time to take it off. For lashes, arrive with no eye makeup or
        mascara, skip the coffee beforehand so your eyes stay still, and tell me
        about any allergies, because lash glue can contain acrylic or latex.
        Bring a reference photo if you have one, and plan for the full
        appointment time.
      - **removalAndFills** - Yes. Removal is on the price list for each service;
        mention it when you book so the time is set aside. Nail fills are every
        two to three weeks, lash fills every two to four.

      **No price appears in any FAQ answer.** A price lives in exactly one
      place, `data/treatments.ts`; restating "$10" here would be the second copy
      that one day disagrees with the first.

      The Spanish is written for someone already reading in Spanish, the same
      standing rule as every other string.

      *Done when* the home page shows nine questions at `/` and `/es`, the
      `FAQPage` JSON-LD carries the same nine, and the build passes.

- [x] **6. Regenerate the overview. Frank runs `/overview`,** before `/complete`.
      Step 1 changes the build plan's text, and the overview's `TreatmentRow`
      note still says the menu is empty. `/complete` recomputes the fingerprint
      without regenerating the body, so skipping this leaves a stale overview
      that nothing flags.

      *Done when* the overview describes 5b as the menu and booking policies,
      no longer says the menu is empty, and its fingerprint matches a fresh
      recompute.

## Files / areas

| File | What |
|---|---|
| `blueprint/build-plan.md` | step 1, the 5b line only |
| `dictionaries/en.ts`, `dictionaries/es.ts` | treatment labels for three services; four FAQ entries |
| `data/treatments.ts` | the rows; the type and helpers are unchanged |
| `data/faq.ts` | four rows, re-ordered |
| `lib/schema.ts` | `serviceSchema`, the `from` branch |
| `blueprint/context/project-overview.md`, `project-log.html` | step 6, by `/overview` |

Not touched: `TreatmentList.tsx`, `lib/format.ts`, the service route, `Faq.tsx`.
Both components already render whatever the data holds.

## Data / contracts

- **`TreatmentRow` is unchanged.** `priceCad` is whole Canadian dollars,
  `durationMinutes` an integer, `from` optional and defaulting to false, `order`
  ascending. `key` is constrained to that service's own labels, so a label and
  its row must be added together or the build fails.
- **Every new dictionary key exists in both languages.** Feature 2's
  missing-string build error enforces it.
- **Durations must agree with the existing `duration` FAQ answer**, which says a
  gel manicure is about an hour, a full set with extensions and art two to three
  hours, lash sets around two hours and fills about an hour. The tables above
  were chosen to agree; do not change one without the other.
- **Fill cadence agrees with the lashes page**, which says fills every two to
  four weeks.
- **`Offer` shape.** Exact: `price` (number) and `priceCurrency: "CAD"`. From:
  `priceSpecification` with `minPrice` (number) and `priceCurrency: "CAD"`, and
  no top-level `price`.
- **Dictionaries are CRLF.** Edit with Node scripts that restore CRLF, re-measure
  endings after each write, and never use `sed -i`.

## Testing

No unit test runner is configured and there is no `Browser tests` command.
The gates are:

- `npm run lint` and `npm run build`. The build catches a missing Spanish label
  or FAQ string, and a treatment key with no label.
- **In a real browser**, at 412px and desktop: all three service pages in both
  languages, and the home FAQ in both languages. A nine-row price list on a
  phone is exactly the kind of layout a build cannot vouch for.
- Read the rendered JSON-LD on `/nails` for step 4, and on `/` for step 5.

## Notes for the AI

- **Research, 2026-09-23**, which the prices were set against. Nails: City Nails
  & Spa lists acrylic full set $50, Gel-X full set $75, chrome $20, nail art $8+,
  gel removal $5; Calgary Gel Nails lists tip removal $15 and up; Salon Society
  lists a gel manicure at $70+. Lashes: Lash Culture lists classic $120, hybrid
  $135, volume $195; The Beauty Block lists introductory full sets at $150 and
  fills at $90; the city-wide range is $100 to $250 for a set. Makeup: Glam and
  Beyond lists grad makeup and bridesmaid makeup at $150 each. The prices here
  sit below the middle of those ranges, which is the positioning the plan chose,
  and below established artists on makeup, because she is new.
- **These are Frank's numbers until Dani says otherwise.** Nothing on the page
  says so, and nothing should; but the review packet must say it, and a client
  will book against them. The site cannot be indexed until the domain exists,
  which is what makes setting them now low-risk.
- Keep the empty-state branch and strings. See Out of scope.

## Open questions

1. **The bride herself is not on the menu.** The makeup page promises bridal
   work, and the menu covers the bridal party per person. A bride's makeup is a
   bigger, higher-stakes booking (usually with a trial) and Calgary prices it at
   two to three times a guest look. Leaving it off means a bride messages for a
   quote. Add a row now, or leave it off until Dani says she wants brides? Not
   blocking: the feature can ship either way.

## Verification actually performed

| Check | Result |
|---|---|
| `npm run lint` | exit 0 |
| `npm run build` | exit 0, 19 pages, run after the code steps and again at completion |
| `/nails`, `/lashes`, `/makeup` and the three Spanish twins | every row, price and duration matches the tables above; "From" / "Desde" on exactly the `from` rows |
| `Service` JSON-LD on `/nails` | `minPrice` on the four `from` rows, `price` on the other five |
| Home FAQ, `/` and `/es` | nine questions; `FAQPage` JSON-LD carries the same nine in the same order; no answer contains a `$` amount |
| 412px phone width, `/es/makeup` | long labels wrap, prices stay in their column, no horizontal scroll |
| Console | no errors |
| Line endings | all six edited files pure CRLF |
| Overview (step 6) | 5b widened, "empty" note gone, fingerprint matches a fresh recompute |

## Not verified

- **Whether the prices are right.** They are Frank's, set from research, and
  Dani has not seen them. That is a business check, not a build check.
- **The desktop layout of the price lists** was read as text rather than
  looked at; only the phone width was screenshotted.

## Implementation walkthrough

### How the numbers were set

The overview had said since feature 5 that prices are "hers to set", and the
service pages had carried "Prices are being set" ever since. On 2026-09-23 Frank
decided to set them now rather than wait, from research, positioned mid-low,
for Dani to confirm before launch. The research was done inside `/feature`
rather than invented: live Calgary menus for nails (City Nails & Spa, Calgary
Gel Nails, Salon Society), lashes (Lash Culture, The Beauty Block, OutLash)
and makeup (Glam and Beyond). The sources and figures are in Notes for the AI
above, so the reasoning survives if a number is questioned later.

Makeup sits furthest below the market, about half of an established artist's
$150 for grad or bridesmaid makeup. That was deliberate: she is new, and the
page is priced for the client she can win now.

### `data/treatments.ts` and the dictionaries

Eighteen rows across three services, each label added in both languages in the
same script as its row. `TreatmentRow` constrains `key` to that service's own
labels, so a label without a row, or a row without a label, fails the build;
nothing about the type changed.

The dictionaries' three `treatments: {}` blocks were filled **by position**,
not by anchoring on nearby text. In `es.ts` the lashes block sits after a
closing brace with no unique neighbour, and both files list the services in the
same order, so replacing the first, second and third occurrence in turn was the
one approach that could not hit the wrong block. The script asserted exactly
three before touching anything.

The comment above `treatments` had said the arrays stay empty until Dani says
yes. It now says who set the prices, when, and why the empty-state branch is
kept even though nothing renders it: the next client from this template starts
with no prices too.

### Durations that had to agree with an existing answer

The FAQ already told visitors a gel manicure takes about an hour, a full set
with extensions and art two to three hours, a lash set around two hours and a
fill about one. The menu's minutes were chosen to agree with that, not the
other way round: 60 for a gel manicure, 120 for either full set, 105 to 135 for
lash sets, 60 for a lash fill. Two sources stating durations is only safe while
they agree, and the spec now says so where the next editor will see it.

### `lib/schema.ts` - what "From $5" means to a machine

`serviceSchema` gave every row `price: row.priceCad`, so a "From $5" row told
Google the charge is exactly $5, the one claim the prefix exists to deny. `from`
rows now carry a `PriceSpecification` with `minPrice`, and exact rows are
unchanged. Found in the critique before any code was written, not in the
browser.

### The FAQ, and the price that was taken back out

Four answers joined the existing five: no deposit, cash or card, what to know
before a first visit, and removals and fills. The first draft of the removal
answer said "from $10". The project's locked rule is that a price lives in
exactly one place, so the answer now points at the price list instead. It
would otherwise have been a second copy of the number, waiting to disagree
with the first the next time a price changes.

The first-visit answer is researched rather than invented: bare nails or a
warning about what is on them, no eye makeup or mascara for lashes, no caffeine
beforehand, and allergies, because lash adhesive commonly contains acrylic or
latex. The Spanish uses *pestañina*, the Colombian word for mascara, because
she is Colombian.

**One departure from the spec:** the question reads "It is my first time"
rather than "It's". The site's copy has no contractions anywhere, and the
spec's wording was the odd one out.

### Found, not fixed

On `/lashes` and `/makeup` a large empty band sits below the menu. The service
route wraps `WorkStrip` in a padded `Band` unconditionally, and `WorkStrip`
returns `null` when a service has no photographs, so the padding remains with
nothing inside it. It predates this feature. The queued stock-imagery item puts
images on exactly those two pages, which is the natural place to close it.

### What is still open

- **The bride's own makeup** is not on the menu; the bridal party is. Open
  question 1 above, not blocking.
- **The booking FAQ and the hero still say to DM on Instagram**, and there is no
  account. That is the `/fix` queued next.
