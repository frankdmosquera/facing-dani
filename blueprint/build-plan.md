# Build Plan

The features that make up this project, in build order, one line each. The depth
for each one lives in its `/feature` spec, not here.

## How this file is used

- `/feature` with no number specs the **next unchecked** item. `/feature 3` or
  `/feature "gallery"` picks a specific one.
- Completed items get checked off here, so this doubles as the progress tracker.
- A big item gets split into sub-items (2a, 2b) when it is spec'd, not before.
- **Do not renumber completed items.** Their archived specs refer back to those
  numbers. Continue with the next unused number.
- This is a living roadmap. Append new unchecked items as the project grows
  rather than starting a second list.
- If a new feature materially changes the product direction, users, data, stack,
  monetization, UI/UX or deployment, update `project-plan.md` too and re-run
  `/overview` before spec'ing it.

Scaffolding the app and locking the look were pre-build steps and are
deliberately absent below. The theme they produced is ported by item 1.

---

## What "done" means for every content item

Three things apply to items 3 onward and are not separate items, because a thing
that touches every page cannot be a finishing pass. They are the definition of
done, not extra work bolted on:

1. **Both languages.** The page exists at `/` and `/es`. Not done in one.
2. **Its own SEO.** Metadata, JSON-LD and hreflang land in the same commit as
   the page they describe.
3. **Real copy.** No placeholder strings. English drafted and corrected, Spanish
   written by Dani.

Item 9 is what genuinely needs every page to exist first. Everything else is
already done by then.

## MVP

Order matters. The shell carries the theme and the locale routing, so it goes
first and everything after inherits both. The gallery is the page that sells the
work, so it comes before the pages that describe it.

- [ ] 1. **Site shell and theme** - port `prototypes/theme.css` into `globals.css`
  `@theme`, then build the header, mobile nav and footer against it
- [ ] 2. **Locale routing** - the `[locale]` segment, a dictionary per locale, the
  language switch, and the missing-string build error. Hand-rolled, no package
- [ ] 3. **Home page** - hero, the three services, gallery teaser, her story,
  FAQ and the booking call to action
- [ ] 4. **Gallery** - the full set of work, filterable by service, at a size
  where the quality is actually visible
- [ ] 5. **Service pages** - nails, lashes and makeup, one page each, with
  treatments, prices and durations
- [ ] 6. **About** - her training and the trust a new business has not earned yet
- [ ] 7. **Contact and booking** - the form with the "how did you find me" field,
  validation, Resend delivery, the direct booking route and a thank-you page
- [ ] 8. **Deploy** - Vercel, env vars, a verified production build and a preview
  URL Dani can open. Early on purpose, so corrections arrive while they are cheap
- [ ] 9. **Site-wide SEO pass** - sitemap and robots across both locales,
  LocalBusiness data, and an audit that every page carries its own metadata and
  hreflang. The only SEO work that genuinely needs all pages to exist

## Post-MVP

Not scheduled. Listed so they stop being re-proposed as if they were new.

- [ ] 10. **Reviews on site** - waits until there are reviews worth showing
- [ ] 11. **Real booking** - availability and deposits, only if DMs stop coping
- [ ] 12. **Second client from this template** - the real test of section 4's
  rule that a component never contains the word Dani
