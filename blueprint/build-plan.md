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

- [x] 1. **Site shell and theme** - port `prototypes/theme.css` into `globals.css`
  `@theme`, then build the header, mobile nav and footer against it
- [x] 2. **Locale routing** - the `[locale]` segment, a dictionary per locale, the
  language switch, and the missing-string build error. Hand-rolled, no package
- [x] 3. **Home page** - hero, the three services, gallery teaser, her story,
  FAQ and the booking call to action
- [x] 4. **Gallery** - the full set of work, filterable by service, at a size
  where the quality is actually visible
- [x] 5. **Service pages** - nails, lashes and makeup, one page each, with
  treatments, prices and durations
  - [x] 5a. **The pages** - the three routes in both languages, their SEO,
    and the empty state that renders until prices exist
  - [x] 5b. **The menu and booking policies** - treatments, prices and
    durations in `data/treatments.ts`, plus the deposit, payment, removal and
    first-visit answers in the FAQ. Prices researched against Calgary, for
    Dani to confirm before launch
- [x] 6. **Who she is** - her training and the trust a new business has
  not earned yet, carried on the home page since item 14 deleted `/about`
  - [x] 6a. **The page** - the `/about` route in both languages, the
    bilingual promise said out loud, what actually happens at an
    appointment, and Person data. Folded into home by item 14
  - [x] 6b. **Her story** - where she trained, what she does between
    clients, and how a client should feel leaving, in the home page's
    story section
- [x] 7. **Contact and booking** - the form with the "how did you find me" field,
  validation, Resend delivery, the direct booking route and a thank-you page
- [x] 8. **Deploy** - Vercel, env vars, a verified production build and a preview
  URL Dani can open. Done at item 1; the plan never reflected it. The domain and
  indexing work filed here moved to item 15
- [x] 9. **Site-wide SEO pass** - sitemap and robots across both locales,
  LocalBusiness data, and an audit that every page carries its own metadata and
  hreflang. The only SEO work that genuinely needs all pages to exist
- [x] 10. **Gallery lightbox** - tap a photo to open it large, with next and
  previous, a thumbnail strip, and keyboard and swipe control. What makes item
  4's "at a size where the quality is actually visible" actually true
- [x] 14. **Home page rebuild** - the hero photograph and gallery teaser item 3
  deferred to item 4 and nobody came back for, plus the process and expanded FAQ
  sections. Absorbs About, which is then deleted, so item 6b lands here
- [x] 16. **Decorative imagery for lashes and makeup** - licensed stock
  (Unsplash or Pexels) on those two service pages only, with no identifiable
  faces. Never in the gallery, a work strip or structured data, and never
  captioned as her work. Also closes the empty band left below those two menus
  when there are no photos
- [x] 17. **Inspiration grids on the service pages** - a grid of licensed stock
  on nails, lashes and makeup, 11 to 14 images each as Frank picked them,
  headed "Inspiration" in both languages. Same boundary as 16: no identifiable
  faces, never in the gallery, a work strip or structured data. The lash
  mapping photo from 16 comes out
- [x] 18. **Her Drive photos in the gallery** - convert the originals Dani put
  in her Drive folder (mostly iPhone HEIC), Frank cuts them to the strongest
  from a contact sheet, and they go into the gallery in both languages. Any lash
  or makeup shots of hers light up those pages' work strips. A recognisable
  face still stays out until she is asked. The nails and home heroes are picked
  from this set afterwards
- [x] 19. **Nails and events** - nails is the one professional service, parties
  the second side, where she is a station at someone else's party. Lashes and
  makeup are mentioned lightly. Menu becomes Home, Nails, Events, About, Contact
  - [x] 19a. **Home page in the new order** - head title and description lead
    with nails then parties; hero, nails menu with Book buttons in place of the
    three service cards, work, a new events section, shorter story, Spanish, in
    the chair, FAQ, closing band
  - [x] 19b. **Parties page and contact** - a `/parties` page that says what
    she does at someone else's party, and one contact page for party requests
    and questions, the party fields shown only for a party. The header link,
    the hero button and the home section's button move to it. Absorbs punch
    item 6
  - [x] 19c. **About returns** - its own page again, linked from the story
    ("More about me"). Starts from the story's "new business" lede and "building"
    paragraph, cut from home in 19a (git history has both languages). Remove
    the `/about` redirect in `next.config.ts`
  - [x] 19d. **Lashes and makeup made light** - off the desktop header, kept
    in the phone menu and footer, gone from home and the search copy. Their
    pages and Cal.com events stay until Frank decides whether they go
- [x] 20. **Store** - press-ons and nail care, face-and-body's pattern: category
  tabs, a card per product with its price, no cart, bought with an appointment
  or asked about through the contact form. Prices set by Frank on 2026-09-25
  for Dani to confirm. Stock photos, marked as stock, until she shoots her own
- [ ] 15. **Domain, indexing and production email** - buy the domain, set the
  site URL so robots stops disallowing everything, and give Resend a sender that
  can mail anyone. Blocked until the domain exists

## Post-MVP

Not scheduled. Listed so they stop being re-proposed as if they were new.

- [ ] 11. **Reviews on site** - waits until there are reviews worth showing
- [ ] 12. **Real booking** - availability and deposits, only if DMs stop coping
- [ ] 13. **Second client from this template** - the real test of section 4's
  rule that a component never contains the word Dani
