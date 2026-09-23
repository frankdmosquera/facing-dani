# Feature: Her story

**From build-plan:** feature 6b

**Status:** verified

**Branch:** `feature/her-story`

## Goal

Item 6b has been the last unblocked MVP item and has sat waiting on material
only Dani could give. That material arrived on 2026-09-22, and it does not match
what the site currently says.

`dictionaries/en.ts` has her claiming she was **"drilled on"** shape, structure
and cuticle work. The training was a single course in Colombia of three to four
months, taken at seventeen. "Drilled on" reads as years. The project plan
carries the same sentence, so the overclaim exists in two places.

Three true things replace it, all of them stronger than the claim they retire:

1. She trained in Colombia, and the standard there really is higher than people
   here expect. That part survives untouched.
2. She has been doing sets for family and friends constantly ever since. This is
   the answer to "what she does between clients" that `en.ts` itself names as
   *"the strongest trust signal a nail and lash artist has and the one no
   competitor page bothers to make."*
3. **In her own words, a client should leave feeling beautiful and sure of
   herself.** Nothing on the site currently says what a client *leaves* with.

## In scope

- Rewriting `home.story` in both dictionaries so it is true.
- A third paragraph carrying the "beautiful and sure of yourself" promise, and
  the one-line `Story.tsx` change to render it.
- Deleting the orphaned About comment block feature 14 left in `en.ts`.
- Both locales, as always.

## Out of scope

- **Her age.** Decided 2026-09-22: the copy never states a number, neither the
  seventeen nor the three-to-four months. Everything written stays true whether
  or not a reader knows either, so nothing here needs correcting later.
- **The portrait.** `data/portrait.ts` stays `null`. Decided the same day:
  nobody has asked her or her parents, and a minor's face on a public booking
  page is their call. `Story.tsx` already renders correctly without one and that
  stays true. `personSchema` already degrades to no `image`.
- **Why she got into nails.** Not known, so the story does not answer it. Listed
  under Open questions so it is not mistaken for an oversight.
- **Naming the school.** She cannot remember it. A school nobody can name is
  weaker than no school, and the training itself is not in doubt.
- **Prices, lash and makeup photographs, the four unanswered FAQ questions, her
  Instagram handle.** All still outstanding, none of them this feature.
- **The domain.** Item 15, parked by Frank on 2026-09-22.

## Build loop

`workflow.stepReview` is `feature`: work through every step and present one
review packet at the end. `workflow.checkpointCommits` is `disabled`, so make no
commits. `/complete` creates the single feature commit.

## Build steps

- [x] **1. Retire the overclaim, in both dictionaries.**
      In `dictionaries/en.ts` and `dictionaries/es.ts`, under `home.story`:

      `training` - replace "and they are the parts I was drilled on" with
      language that claims being taught rather than drilled. Keep the first
      sentence about the Colombian standard and the week-three sentence exactly
      as they are; both are true and both are the plan's actual angle.

      **The same claim appears a second time, outside `home.story`.** Found
      during implementation: `services.nails.lede` carries "the parts I was
      drilled on" at `en.ts:109`, with `es.ts:82` saying "me entrenaron". Both
      are covered by this step's Done when and both change here. The spec
      originally named only `home.story`.

      `building` - keep "Bring a photo from Pinterest, or sit down with no idea
      and we will work it out" verbatim. It is good, it is about the
      appointment, and losing it in a rewrite would be a silent downgrade. Add
      the family-and-friends practice to the same paragraph: it is the answer
      6b was waiting for.

      `lede` - tighten only the trailing clause. It currently promises "what two
      hours in my chair in Calgary actually involves", which `Expect.tsx` has
      owned since feature 14; this section no longer delivers it. Keep the
      opening about a new business having no reviews, which is the trust work
      the lede exists to do. **See Data / contracts: this string is
      `personSchema`'s `description`.**

      *Done when* no string on the site claims more training than she has,
      `npm run build` passes, and the home page reads correctly at `/` and
      `/es`.

- [x] **2. Add the promise, and render it.**
      A new `feeling` key under `home.story` in **both** dictionaries, carrying
      her own line: a client leaves feeling beautiful and sure of herself.

      Render it in `components/home/Story.tsx` as a third paragraph, last in the
      stack and directly above the wordmark signature, at `text-ink` rather than
      the `text-ink-muted` the other two use. It is the emotional payoff of the
      section and the closing beat before her name; muted grey next to two
      identical paragraphs buries it.

      **English must say "sure of yourself" or "confident", never "secure".**
      Spanish `segura` means confident; English "secure" means safe from harm.
      Translated literally the line promises physical safety, which is a
      different and much stranger claim for a nail page to make.

      *Done when* the third paragraph renders at `/` and `/es`, it is visibly
      the strongest line in the section, and the build passes.

- [x] **3. Delete the orphaned About comment.**
      `dictionaries/en.ts` carries a ~19-line comment opening "The About page"
      and stating that `story` is "deliberately absent". Feature 14 deleted the
      `about` block underneath it but left the comment, which now sits directly
      above `treatmentList` and describes a route that no longer exists. It is
      also the record of this very feature being pending, which step 2 closes.

      Delete the whole block. Leave the `treatmentList` comment that follows it
      untouched.

      *Done when* `en.ts` has no comment describing a deleted page, `npm run lint`
      and `npm run build` both pass, and no string changed in that step.

- [x] **4. Correct the same claim in the plans. Approved by Frank on
      2026-09-23, so this step is in scope.**
      `blueprint/project-plan.md` line 29 carries "that is what she was drilled
      on". Shipping honest copy over a plan that still overclaims leaves the two
      contradicting each other.

      **`project-overview.md` does not carry it.** Checked during
      implementation: its angle passage ends "That claim is true, hard to copy,
      and survives a price rise" and never claims drilling, so it needs no edit.
      The spec named it in error.

      `blueprint/history/features/06a-about-the-page.md` also contains the
      phrase and is deliberately left alone. History records what was true when
      it was written.

      The angle itself does not change and no re-`/overview` is needed: "craft,
      not price" and "she trained in Colombia, where the standard is higher"
      are both still true. Only the depth claim is wrong.

      *Done when* neither planning document claims more training than she has,
      or Frank has said no and this step is struck with that recorded.

## Files / areas

| File | What |
|---|---|
| `dictionaries/en.ts` | `home.story` rewritten; `services.nails.lede` de-overclaimed; `feeling` added; orphaned About comment deleted |
| `dictionaries/es.ts` | the same four string changes, plus `feeling` |
| `components/home/Story.tsx` | one added paragraph |
| `blueprint/project-plan.md` | step 4, line 29 |

Not touched: `data/portrait.ts`, `lib/schema.ts`, `components/home/Expect.tsx`,
`components/home/Bilingual.tsx`, every route file.

## Data / contracts

- **`t.home.story.lede` is `personSchema`'s `description`**
  (`lib/schema.ts:137`). Editing it edits the `Person` structured data on the
  home page. Keep it a self-contained sentence about who she is; it is read by a
  machine with no surrounding paragraph for context.
- **Every key added to `en.ts` must exist in `es.ts`.** Feature 2's
  missing-string build error is the enforcement, so a one-sided `feeling` fails
  the build rather than rendering blank. Both dictionaries change in the same
  step for that reason.
- **Both dictionaries are CRLF in the working tree.** Edit in place and preserve
  the endings. Feature 14 used a script that normalized to LF and restored CRLF
  on write precisely because a rewrite that changes endings churns the entire
  file in the diff and hides the four lines that actually changed.
- `portrait` stays `null`, so `personSchema` continues to return its base object
  with no `image` and `Story.tsx` continues to render no portrait column.

## Testing

No unit test runner is configured and there is no `Browser tests` command, so
there is nothing to add tests to and none are invented here. The gates are:

- `npm run build` - catches a missing Spanish key, which is the one failure mode
  these edits can actually produce.
- `npm run lint`.
- **Both locales in a real browser.** `/` and `/es`, at 412px and 1440px. This
  project has been bitten three times by things a green build did not show, and
  step 2 changes layout.

## Notes for the AI

- **Do not invent biography.** The material is: trained in Colombia, a short
  course, cannot remember the school, does a lot of nails for family and
  friends, wants to start the business, and a client should leave feeling
  beautiful and sure of herself. Everything written must trace to one of those.
  No mentor, no salon name, no hours-per-week figure, no origin story.
- The Spanish is drafted for Dani to correct, which is the same standing
  arrangement the rest of the site's Spanish is under. Write it as someone
  already reading in Spanish, not as a translation of the English.
- She is seventeen and this is a public page that invites strangers to book an
  appointment. That is why no number is stated and no face is shown. Do not
  quietly reintroduce either.

## Open questions

1. **Why she got into nails is still unknown**, and it is the one question that
   would make this section genuinely hers rather than accurate. Worth asking her
   alongside the four FAQ questions feature 14 could not answer - deposits,
   removals and fills, first-timers, and payment methods - which its archive
   calls "the cheapest content win left on the site."

## Implementation walkthrough

### How the material finally arrived

Item 6b sat unbuilt from feature 6a onward, and `dictionaries/en.ts` carried its
own note explaining why: *"`story` is deliberately absent. It arrives once Dani
has answered where she trained, for how long, and what she does between
clients."* Feature 14 moved the About content onto the home page but did not
answer any of that, so the note stayed true and the checkbox stayed empty.

The answers came through Frank on 2026-09-22, and they reframed the section
rather than filling a gap. She is seventeen. The training was a single course in
Colombia of three to four months, and she cannot remember the school. She does a
lot of nails for family and friends. She wants to start a business.

Two decisions followed, both Frank's and both recorded in Out of scope: state no
number, and show no portrait. The second is a safeguarding call rather than a
design one - nobody had asked her or her parents whether a minor's face goes on
a public page that invites strangers to book.

### The overclaim, and where it actually lived

The spec named two strings. There were four.

| Where | Was | Now |
|---|---|---|
| `home.story.training` (en) | "the parts I was drilled on" | "the parts I was taught to get right" |
| `services.nails.lede` (en) | "the parts I was drilled on" | "the parts I was taught to get right" |
| `home.story.training` (es) | "en lo que me entrenaron" | "lo que me enseñaron a hacer bien" |
| `services.nails.lede` (es) | "en las que me entrenaron" | "las que me enseñaron a hacer bien" |

The nails service page was found by grepping for the phrase rather than by
reading the spec, which had only looked at `home.story`. Step 1's own Done when
covered it - *"no string on the site claims more training than she has"* - so it
was fixed here rather than deferred, and the spec was corrected to say so.

The same grep found the phrase in `blueprint/history/features/06a-about-the-page.md`
and left it there. History records what was true when it was written.

It also showed `project-overview.md` does **not** carry the claim, contrary to
what the spec said. Its angle passage ends "That claim is true, hard to copy,
and survives a price rise" and never claims drilling. Step 4 edited one file,
not two.

### `dictionaries/en.ts` and `es.ts`

Four strings changed and one was added, in both languages.

`building` was the interesting one. A wholesale rewrite would have been simpler
and would have silently deleted *"Bring a photo from Pinterest, or sit down with
no idea and we will work it out"* - a line that is good, specific, and about the
appointment rather than about her. The spec called this out in advance and the
sentence survives verbatim in both languages. The family-and-friends practice
was added in front of it, which is the actual answer to "what she does between
clients" that `en.ts` itself had named as the strongest available trust signal.

`lede` was tightened only at the tail. It had promised "what two hours in my
chair in Calgary actually involves", which `Expect.tsx` has owned since feature
14, so the section was advertising something it no longer delivered. **This
string is `personSchema`'s `description`**, so the edit changes the home page's
`Person` structured data - confirmed in the browser afterwards rather than
assumed.

`feeling` is new and is the only line on the site in her own words:

> What I care about most is how you feel when you leave. Not just that the set
> looks good, but that you walk out feeling beautiful and sure of yourself.

**The English says "sure of yourself", never "secure".** Frank relayed it as
"beautiful and secure", which is `segura` read straight across. In Spanish that
means confident; in English "secure" means safe from harm, which is a different
and much stranger promise for a nail page to make. The Spanish keeps `segura de
ti misma` and the English does not translate it literally. The rule is written
into the component's comment so it does not get "corrected" back later.

### `components/home/Story.tsx`

One paragraph, deliberately not styled like its neighbours: `16.5px` / weight
500 / `text-ink`, against the other two at `15.5px` / 400 / `text-ink-muted`.
Measured in the browser rather than eyeballed. It sits last, directly above the
wordmark signature, because it is the only line in the section about the person
in the chair rather than the person doing the work, and a third identical grey
paragraph would have buried it.

### The orphaned comment feature 14 left behind

`en.ts` carried a nineteen-line comment opening "The About page" whose `about`
block feature 14 had deleted. It sat directly above `treatmentList`, describing
a route that no longer existed, and it was also the record of this feature being
pending. Deleted here, which is the honest close: the note said the story
arrives once Dani answers, and she has.

### The CRLF trap, hit and recovered

Every file touched is pure CRLF in the working tree, with `core.autocrlf=true`
and no `.gitattributes`. The dictionary edits were done with a Node script that
normalizes to LF for the surgery and restores CRLF on write, the same approach
feature 14 used and for the same reason.

Then `sed -i` was used for the comment deletion and the plan edit, and **`sed -i`
rewrites the whole file with LF endings.** `en.ts` came back as 467 bare LF and
zero CRLF - the entire-file churn the script exists to prevent. Caught by
re-measuring endings after every write rather than by reading the diff, and
restored before the diff was ever generated. Final state: all touched files pure
CRLF, and the code diff is 58 lines.

**`sed -i` is not safe on this repository.** Use a Node script.

### What the browser caught that the build could not

The rewritten `lede` read *"So here is the person, and where the way **she**
works comes from."* Third person, in a section written entirely in her voice -
"I did my training", "What I care about most". Lint passed, the build passed and
all nineteen pages generated. Only reading the rendered page showed it. Fixed to
"where the way I work comes from"; the Spanish had been written in first person
already and needed nothing.

That is the fourth time on this project a green build has hidden something a
single look at the page exposed.

A large gap below the signature was also investigated and dismissed: measuring
every band on the home page showed all eight carry identical `96px` top and
bottom padding, so the space is the site's normal rhythm and not a regression
from the added paragraph.

### `blueprint/project-plan.md`

One sentence, approved by Frank before it was touched. The angle itself did not
change - "craft, not price" and "she trained in Colombia, where the standard is
higher" are both still true - so no re-`/overview` was needed. Only the depth
claim was wrong. The paragraph was re-wrapped to the file's existing width after
the substitution lengthened it.

### What was deliberately not done

- **The portrait.** `data/portrait.ts` stays `null` and `personSchema` still
  returns no `image`, verified in the rendered JSON-LD.
- **Her age, and the length of the course.** No number appears anywhere.
- **Why she got into nails.** Still unknown, so the section does not answer it.
  It is the one question that would make this copy genuinely hers rather than
  merely accurate, and it is recorded in Open questions rather than invented.
- **Rewording item 6's parent line**, which still reads as "About" although
  feature 14 deleted that page. A pre-existing plan-hygiene item, already logged
  as open question 3 in the overview, and not this feature's to decide.
