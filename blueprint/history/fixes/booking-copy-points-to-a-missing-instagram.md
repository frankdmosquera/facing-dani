# Fix: Booking copy points to a missing Instagram

**Type:** Fix

**Status:** verified

**Branch:** `fix/booking-copy-points-to-a-missing-instagram`

## The problem

There is no Instagram account. Frank decided on 2026-09-23 that a business
account (not her personal one) waits until Dani is ready for it, so
`siteConfig.social.instagram` stays `null` for the foreseeable future.

Every *link* to Instagram already hides itself when the handle is `null` - the
footer, each `BookingBand`, the contact page button. The *prose* does not, and
four places still send a visitor to an account that does not exist:

| Where | What it says today | Why it is wrong |
|---|---|---|
| Home hero, under the buttons (`home.hero.dmNote`) | "Or send a DM on Instagram, whatever is easier" | The first alternative a visitor is offered is one she cannot use |
| FAQ, "How do I book?" (`faq.booking.a`) | "Send a DM on Instagram or use the form on the contact page" | Names the missing route first |
| Contact page, second band (`contact.direct`) | "Would rather just message me?" then "My Instagram goes here the moment it is set up." | A heading that offers a route, over a sentence admitting there is none. The second line is placeholder text a visitor reads |
| Contact form failure (`contact.failed`) | "Try again in a moment, or send me a DM instead." | Shown exactly when the form has failed, and points at the one route that also fails |

The failure message matters most. Until item 15 gives Resend a production
sender, a real submission on the live site can fail, and that message is what
the visitor then reads.

Both languages carry all four.

## The fix

Make the prose follow the same rule the links already follow: **nothing
mentions Instagram while `siteConfig.social.instagram` is `null`**. Where a
string is only about Instagram, the component hides it; where a string is about
booking in general, the copy changes to the route that works.

- **Hero** - render the `dmNote` line only when a handle exists. The string
  stays in the dictionaries for the day it does.
- **Contact page** - render the whole `direct` band only when a handle exists.
  Its heading, body and link are all about messaging her, so there is nothing to
  show without one. `contact.direct.pending` is then unused; delete it from both
  dictionaries rather than leave a placeholder string in the repo.
- **FAQ booking answer** - rewrite without Instagram: use the form on the
  contact page, tell her the service, roughly when suits you, and a reference
  photo if you have one.
- **Form failure** - drop "or send me a DM instead". See the open question.

**Must not break:**

- **The day the account exists, one edit brings everything back.** Setting
  `siteConfig.social.instagram` must restore the hero line, the contact band and
  every link with no further code change. Only the FAQ answer would need
  rewording, and the spec says so where the next editor will see it: a comment
  on `faq.booking`.
- **The contact page's `contactPageSchema`** is unaffected; it describes the
  page, not the band.
- **CRLF.** Dictionaries and components are CRLF in the working tree. Edit with
  a Node script that restores CRLF; never `sed -i`.

## Build steps

- [x] **1. Hide the Instagram-only prose when there is no handle.**
      `components/home/Hero.tsx`: wrap the `dmNote` paragraph in the same
      `siteConfig.social.instagram ?` check the other links use, and update its
      comment. `app/[locale]/contact/page.tsx`: render the `direct` `<Band>`
      only when `instagram` is set, and drop the `pending` branch. Delete
      `contact.direct.pending` from `en.ts` and `es.ts`.

      *Done when* neither `/` nor `/contact` (or their `/es` twins) contains the
      word "Instagram" in visible text while the handle is `null`, the build
      passes, and a missing key in only one dictionary would still fail it.

- [x] **2. Rewrite the two booking strings.**
      `faq.booking.a` and `contact.failed`, in both languages, with no mention
      of Instagram or DMs. Add a one-line comment above `faq.booking` saying the
      answer names only the form because there is no account yet, and should
      mention Instagram again when `siteConfig.social.instagram` is set.

      *Done when* no page in either language mentions a DM or Instagram in its
      text or its `FAQPage` data, and the build passes.

- [x] **3. Correct the plan's booking assumption.** `project-plan.md` records
      "Instagram DM primary, form to Resend as the route for everyone else" as a
      `[confirm]` assumption in section 8's table. Reword that row to: contact
      form only until a business Instagram exists, then DMs alongside it. Then
      Frank runs `/overview`, before `/complete`, so the overview's open
      question 2 and its `[confirm]` list stop describing a contradiction that
      no longer exists.

      *Done when* the plan's row reads as above and the regenerated overview
      no longer lists the Instagram contradiction.

## Verify

- `npm run lint` and `npm run build` pass.
- In a browser, at `/`, `/es`, `/contact` and `/es/contact`: no visible
  "Instagram" or "DM"; the hero reads cleanly without the line under its
  buttons; the contact page ends at the form without an empty band.
- The home page `FAQPage` JSON-LD has the new booking answer in both languages.
- Temporarily setting a fake handle in `siteConfig` locally brings the hero line
  and the contact band back. Revert it before `/complete`.

## Open question

1. **When the form fails, there is no second way to reach her.** The failure
   message used to offer DMs. With no Instagram, and no public email or phone on
   the site, it can only say "try again". `siteConfig.business.email` is
   Frank's personal Gmail, which is not something to publish without asking.
   Options: say "try again" only (this fix's default), publish a business email
   once one exists, or accept it until item 15 makes the form reliable. Not
   blocking.

## Verification performed

| Check | Result |
|---|---|
| `npm run lint` | exit 0 |
| `npm run build` | exit 0, 19 pages, after the code steps and again at completion |
| `/` and `/es` | no visible "Instagram" or "DM"; the `FAQPage` JSON-LD carries the new booking answer in both languages and mentions neither |
| `/contact` and `/es/contact` | the page ends at the form; no "message me" band, no "goes here" line |
| Reversibility | a fake handle set in `siteConfig` brought back the hero line and the contact band with its "Message on Instagram" link; `siteConfig.ts` restored and confirmed identical to `HEAD` |
| 412px, home | the hero reads cleanly, buttons straight into the photograph |
| Overview (step 3) | the Instagram contradiction is gone, the `[confirm]` list reads the new booking assumption, fingerprint matches a fresh recompute |

## Departure from the spec

Step 1's done-when said `/contact` should contain no visible "Instagram". It
still contains one: the option in the "How did you find me?" select. That is a
source a visitor can pick, not a route the site offers her, and someone can
find Dani through Instagram whether or not she has an account. It stays.

## Implementation walkthrough

### The rule that already existed

The site had one rule for Instagram: a *link* renders only when
`siteConfig.social.instagram` is set. The footer, every `BookingBand` and the
contact page button all followed it, which is why no dead link ever shipped.
What did not follow it was prose. Four strings talked about DMs as if the
account existed. This fix extends the same rule from links to words, rather
than inventing a second mechanism.

### `components/home/Hero.tsx` and `app/[locale]/contact/page.tsx`

Where a string was only about Instagram, the component now hides it. The hero's
"Or send a DM on Instagram" line and the whole contact-page band ("Would rather
just message me?") are gated on the handle, exactly like the links beside them.

The contact band was hidden whole, not trimmed. Its heading offers a route, its
body describes the route, and its button is the route. With the button gone the
first two would offer something and then fail to deliver it. The old fallback,
"My Instagram goes here the moment it is set up", was placeholder text a
visitor could read, and it is deleted from both dictionaries rather than left
unused in the repo.

### `dictionaries/en.ts` and `es.ts`

Where a string was about booking in general, the words changed. The FAQ's "How
do I book?" now names only the form, with a comment saying to mention DMs again
once the account exists; that is the one string the future account does not
restore by itself. The form's failure message lost "or send me a DM instead",
and its comment now says why there is no second route to name.

The failure message was the one that mattered most. It shows exactly when the
form has failed, and until item 15 gives Resend a production sender a real
submission on the live site can fail. It was pointing a stuck visitor at the one
other route that also did not exist.

### `blueprint/project-plan.md`

Section 8's `[confirm]` table had assumed "Instagram DM primary". Frank's
2026-09-23 decision made that false, so the row now reads contact form only
until a business Instagram exists. The overview was regenerated from it before
completion; `/complete` was first run without that step, stopped at the safety
pass, and resumed after `/overview`.

### How reversibility was proved

Not argued, demonstrated: a fake handle was written into `siteConfig`, both
hidden pieces came back in the browser with no other change, and the file was
restored from a copy and diffed against `HEAD` before anything was committed.

### Found, not fixed

- **Every page ships its locale's entire dictionary to the browser.** The
  header passes the full dictionary to the client-side language switch, so the
  React payload on every page carries every string on the site, gallery alt text
  included. It predates this fix and deserves its own.
- **One 500 on the first request after the dev server started**, a JSON parse
  error on `/en`, with every later request returning 200 and the production
  build clean. Most likely two dev servers sharing `.next`, since port 3000 was
  still held by an earlier one.

### Still open

When the form fails there is no second way to reach her. It closes with a
business email, an Instagram account, or item 15. It is recorded as open
question 9 in the overview.
