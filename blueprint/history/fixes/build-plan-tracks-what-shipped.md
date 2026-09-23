# Fix: Build plan tracks what shipped

**Type:** Fix

**Status:** verified

**Branch:** `fix/build-plan-tracks-what-shipped`

## The problem

`blueprint/build-plan.md` no longer describes the project it tracks, in two
places.

**Item 5 is checked but not done.** It promises service pages "with
treatments, prices and durations". All three pages render none of them, only
"Prices are being set", because `data/treatments.ts` is three empty arrays
waiting on Dani. `project-plan.md` line 105 says "Every visitor-facing string is
real before a page is called done", so the plan contradicts itself. The overview
has carried this as open question 2.

**Item 6 still reads as an About page.** Its title is "About", 6a describes
"the route in both languages", and 6b still says "Waits on material only Dani
can give". Item 14 deleted `/about` and moved its content onto home, and 6b
shipped on 2026-09-23. `project-plan.md` lines 87-88 already say the content is
"carried on the home page rather than a separate about page", so only the build
plan is stale. The overview has carried this as open question 3.

**The overview is stale as a consequence.** `project-overview.md` line 69 says
6b "is unbuilt and now lands in 14", and line 80 calls 14 "Next, and
unblocked". Both were already stale before this fix; editing the build plan
makes the overview's fingerprint disagree too.

## The fix

Decided by Frank on 2026-09-23: split item 5 the way 6a and 6b were split, so
the plan records what shipped and what did not. Reword item 6 so it says where
its content now lives. Then regenerate the overview from the corrected plans.

**Must not break:**

- **No renumbering.** Archived specs refer to 5, 6, 6a and 6b by number.
- **No other items touched.** Only lines 54-60 of the build plan change.
- **CRLF preserved.** `build-plan.md` is CRLF in the working tree. Edit with a
  Node script that restores `\r\n`; `sed -i` rewrites the whole file as LF.

## Build steps

- [x] **1. Split item 5.** Replace lines 54-55 with:

      - [ ] 5. **Service pages** - nails, lashes and makeup, one page each, with
        treatments, prices and durations
        - [x] 5a. **The pages** - the three routes in both languages, their SEO,
          and the empty state that renders until prices exist
        - [ ] 5b. **The menu** - treatments, prices and durations in
          `data/treatments.ts`. Waits on Dani's prices

      The parent is unchecked because a sub-item is, the rule `/complete`
      already follows.

      *Done when* item 5 reads as above, and the first unchecked leaf in the
      whole plan is 5b, so `/feature` with no argument would pick it.

- [x] **2. Reword item 6.** Replace lines 56-60 with:

      - [x] 6. **Who she is** - her training and the trust a new business has
        not earned yet, carried on the home page since item 14 deleted `/about`
        - [x] 6a. **The page** - the `/about` route in both languages, the
          bilingual promise said out loud, what actually happens at an
          appointment, and Person data. Folded into home by item 14
        - [x] 6b. **Her story** - where she trained, what she does between
          clients, and how a client should feel leaving, in the home page's
          story section

      *Done when* no line in item 6 describes a page that does not exist or
      material that has already arrived, and all three checkboxes stay checked.

- [x] **3. Regenerate the overview. Frank runs `/overview`.** It cannot be run
      from inside `/implement`, because the skill only starts when invoked
      directly. It rewrites `project-overview.md` from both plans and writes a
      new fingerprint.

      This must happen **before** `/complete`, and must not be skipped.
      `/complete` recomputes the fingerprint from whatever the plans say, so it
      would silently accept the new build plan against an overview that was
      never updated. That is the exact drift the fingerprint exists to catch.

      *Done when* the overview's feature list shows 5 as split with 5b pending,
      6 and 14 as done, no feature as "Next, and unblocked" that is already
      checked, and open questions 2 and 3 are gone.

## Verify

- `git diff blueprint/build-plan.md` shows only lines 54-60 changing, with no
  line-ending churn.
- The first unchecked leaf in `build-plan.md` is 5b.
- The overview's `blueprint:source-hash` matches a fresh recompute over both
  plans in their checked-out CRLF form.
- No code changed, so `npm run build` is expected to pass unchanged; run it once
  anyway as the declared fallback gate.

## Notes

- **No code, no copy on the site changes.** This fix only touches planning
  documents.
- **`project-plan.md` is not edited.** It already says the right thing about
  the About content. Its line 105 rule stays as written; the split is what
  makes the tracker honest against it, rather than relaxing the rule.
- **One contradiction deliberately left alone.** `project-plan.md` line 107
  says "Spanish is written by Dani". In practice it is drafted and waiting for
  her corrections. That is a separate plan decision, not this fix.

## Verification performed

| Check | Result |
|---|---|
| `git diff blueprint/build-plan.md` | 13 insertions, 6 deletions, all inside the original lines 54-60; file still pure CRLF (93 CRLF, 0 bare LF) |
| First unchecked leaf | `5b.`, from a script that parses the checklist rather than from reading it |
| Overview fingerprint | matches a fresh recompute over both plans in their checked-out CRLF form |
| Overview done-when | 5b shown pending, 6 and 14 shown done, no "Next, and unblocked" left, open questions on items 5 and 6 gone |
| Overview size | 17,897 bytes, under the 20,000 limit |
| `npm run build` | exit 0, 19 pages, run after the plan edit and again at completion |

No code or site copy changed, so there was nothing to check in a browser.

## Implementation walkthrough

### `blueprint/build-plan.md` - item 5 reopened

Item 5 had been checked since feature 5 shipped the three service pages, while
every one of them still read "Prices are being set" and `data/treatments.ts`
held three empty arrays. The plan's own rule, "Every visitor-facing string is
real before a page is called done", said it was not done, and the overview had
been carrying that contradiction as an open question.

Frank chose the split over the two alternatives: unchecking item 5 whole would
have lost the record that the pages themselves shipped, and relaxing the rule
would have left the tracker saying done while the pages show no prices. 5a
records what shipped; 5b records what is missing and who it waits on. The parent
is unchecked because a sub-item is, the same rule `/complete` already follows
for 6a and 6b.

The practical effect is that `/feature` with no argument now picks 5b. That is
correct rather than inconvenient: the next thing the plan needs genuinely is
Dani's prices.

### `blueprint/build-plan.md` - item 6 retitled

Item 6 still read "About" after item 14 deleted `/about`, and 6b still said
"Waits on material only Dani can give" after 6b shipped. Nothing was
renumbered and all three boxes stay checked. 6a keeps its record of the route
it shipped, with a note that item 14 folded it into home, because rewriting it
to pretend the route never existed would falsify the archive it points to.

`project-plan.md` was not touched. It already said the About content lives on
the home page, so only the tracker was stale.

### The CRLF form, again

`build-plan.md` is CRLF in the working tree. The edit was a Node script that
normalizes to LF, replaces two exact blocks, asserts each matched once, and
restores CRLF on write. `cat -A` in Git Bash showed no `^M` on those lines,
which looked like LF until the endings were counted directly: Git Bash's text
mode hides the carriage returns. Counting is the check; eyeballing is not.

### Step 3 and why it had to run before `/complete`

The overview is generated from both plans and fingerprinted against them.
Editing the build plan's text, not just its checkboxes, made the overview
genuinely stale: it still called 14 "Next, and unblocked" and 6b unbuilt.
`/complete` recomputes the fingerprint over whatever the plans say for a
feature, which would have quietly blessed a stale overview. So the spec made
`/overview` a required step before completion, and Frank ran it.

That regeneration also refreshed the published build log to the same state,
and replaced the page's "drilled on" line, which had outlived the copy fix in
feature 6b.

### A commit-type call

This is a Blueprint fix, and the skill's example message is `fix:`. The
workspace convention is `feat` for new behaviour, `fix` for a bug, and `chore`
for anything that is neither. A planning-document correction changes no
behaviour, so the commit is `chore:`.
