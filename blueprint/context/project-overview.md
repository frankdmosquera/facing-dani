# facing-dani - Project Overview

<!-- blueprint:source-hash 0902f950604c71f69a43e7211a4429d3ffad86e1e10e9592aaed0adb8af886f8 -->

> A bilingual marketing site for a Calgary nail, lash and makeup artist, built as
> the first instance of a reusable template for beauty businesses.

## Problem

A new nail, lash and makeup artist in Calgary has no presence beyond an Instagram
feed. Instagram shows work well but cannot hold a price list, cannot be found on
Google, buries the answer to "what do you actually do", and is a poor gallery when
someone wants to inspect one set closely. The site is what her bio link points at,
and its job stays narrow: look like a real business, show the work at a size where
quality is visible, answer what/how much/how long without a DM, and take the
booking or hand it off cleanly.

**What she sells is craft, not price.** She trained in Colombia, where the standard
for shape, structure and cuticle work is higher than most people here expect - the
things that decide whether a set still looks good in week three. That is the angle
everywhere, because it is true, hard to copy, and survives a price rise. Price is
deliberately not the angle: it is the one advantage that disappears the moment she
raises her rates.

**Bilingual is a service, not a setting.** A translated site tells a visitor she can
read it; a fluent artist tells her she can have the whole appointment in Spanish.
That gets said out loud on the home and about pages, not left implied by a `/es`
URL. A competitor can run a page through a translator in an afternoon; they cannot
become bilingual.

**Not** a booking engine, a shop, a blog, or a client account system.

## Users

| User | Arrives from | Needs |
|---|---|---|
| **The client, ~15-25** | Instagram bio link, on a phone, at night | See the work, learn whether it is in budget, book without composing a message |
| **Her mother, paying for a grad set** | Google, or her daughter | The business to look legitimate in four seconds: prices, location, a human name, no dead links. She will not DM a teenager, so she is why the form exists |
| **The Spanish-speaking client** | Spanish search, currently finds nothing local | A site and an appointment in her own language |
| **The artist** | - | One link that answers everything, so her DMs stop being a price list |

The first row decides nearly everything in UI/UX. **Mobile is not a consideration,
it is the product.** Desktop exists and must not be broken, but it is the
afterthought.

No accounts, no tiers, no sign-in. Every visitor is anonymous.

## Features

MVP, in `build-plan.md` order. The headline is **4. Gallery** - it is the page that
sells the work, which is why it lands before the pages that describe it.

1. ~~**Site shell and theme**~~ - **done.** After Party theme in `globals.css`,
   sticky header, full-screen mobile panel, footer, gradient ticker.
2. ~~**Locale routing**~~ - **done.** `[locale]` segment, a dictionary per locale,
   the language switch, and a build that fails on a missing Spanish string.
3. **Home page** - hero, the three services, gallery teaser, her story, FAQ and the
   booking call to action. **Next.**
4. **Gallery** - the full set of work, filterable by service, at a size where the
   quality is actually visible. **Headline feature.**
5. **Service pages** - nails, lashes and makeup, one page each, with treatments,
   prices and durations. Three pages and not one, because a single services page
   competes with itself and ranks for none of them.
6. **About** - her training, and the trust a new business has not earned yet.
7. **Contact and booking** - the form with the "how did you find me" field,
   validation, Resend delivery, the direct booking route, and a thank-you page.
8. **Deploy** - Vercel, env vars, a verified production build and a preview URL.
   **Already done, out of order** - see Open questions.
9. **Site-wide SEO pass** - sitemap and robots across both locales, LocalBusiness
   data, and an audit that every page carries its own metadata and hreflang.

Post-MVP, listed so they stop being re-proposed: **10.** reviews on site,
**11.** real booking with availability and deposits, **12.** a second client from
this template.

### Definition of done, items 3 onward

Not separate items, because a thing that touches every page cannot be a finishing
pass:

1. **Both languages.** The page exists at `/` and `/es`. Item 2 made this
   structural: a missing Spanish string fails the build.
2. **Its own SEO.** Metadata and JSON-LD land in the same commit as the page they
   describe. `hreflang` is already inherited from the locale layout.
3. **Real copy.** No placeholder strings. English drafted and corrected, Spanish
   written by Dani.

Out of scope for the MVP: online payment, deposits, real-time availability, client
accounts, reviews written on the site, a blog.

## Data model

**No database, and that is a decision rather than a gap.** Every piece of content is
a typed file in the repo: version controlled, reviewable in a diff, impossible to
lose. The only thing that leaves the machine is a contact form submission, sent as
email and not retained.

> **Locked.** A field is either locale-keyed or shared, never both. A price is a
> number and lives in one place; storing it twice guarantees that one day they
> disagree and the visitor believes the wrong one.

| Locale-keyed (`dictionaries/`) | Shared (`data/siteConfig.ts`) |
|---|---|
| Service name and description | Price |
| Treatment labels | Duration |
| Image alt text | ImageKit path and service tag |
| FAQ question and answer | Ordering |
| Page metadata and JSON-LD text | Name, phone, email, hours, coordinates |

> **Locked: no component contains the word Dani.** A component reads
> `siteConfig.business.name`. The test is whether a second beauty business could be
> stood up by editing `data/`, `dictionaries/` and the theme. If the answer is no,
> that is a bug and not a preference.

> **Locked and now enforced: a missing Spanish string is a build error.** `en` is
> the type source, `es` is annotated with it, and `next build` runs TypeScript.
> There is no fallback to English, by design.

### siteConfig - built in item 1, revised in item 2

Shared facts only. Anything a visitor reads as a sentence moved to `dictionaries/`.

- `business.name` (string) - **Dani Moreno**. Must match the Google Business
  Profile character for character
- `business.wordmark` / `wordmarkAccent` (string) - the header mark, deliberately
  not derived from `name`
- `business.city` / `region` (string) - Calgary, Alberta
- `social.instagram` (`{ handle, url } | null`) - **null.** The footer link renders
  only when set, so an unknown handle cannot ship as a dead link
- `marquee` (string[]) - the ticker words, identical in both languages
- `nav`, `cta`, `footer.services`, `footer.contact` - `NavItem[]`

### NavItem - built in item 2

- `key` (string) - stable across locales; the dictionary is keyed off it
- `href` (string) - the route **without** a locale prefix. Never rendered directly;
  always through `localePath`

### Dictionary - built in item 2

One per locale in `dictionaries/`. `en.ts` is the shape source and is deliberately
not `as const`, so Spanish supplies its own strings rather than repeating English
literals. Currently holds `meta`, `blurb`, `nav`, `cta`, `footer`, `a11y` and
`languageSwitch`. Page copy joins it from item 3.

### Service - item 5

- `id` (`"nails" | "lashes" | "makeup"`) - also the accent token key
- `order` (number), `treatments` (Treatment[]) - shared
- locale-keyed: `name`, `description`, page metadata
- each service owns its own search terms: nails owns gel, acrylic, extensions,
  chrome, nail art; lashes owns classic, hybrid, volume, fills; makeup owns grad,
  bridal, event, glam

### Treatment - item 5

- `id` (string), `serviceId` -> `Service.id`
- `priceCad` (number), `durationMinutes` (number), `order` (number) - shared
- locale-keyed: `label`

### GalleryImage - item 4

Images are records, not files. The repo stores a path, never the photograph.

- `id`, `imagekitPath` (string), `serviceId` -> `Service.id`, `order` - shared
- locale-keyed: `alt`

### FaqItem - item 3

- `id`, `serviceId` (`Service.id | null`), `order` - shared
- locale-keyed: `question`, `answer`
- reused for FAQ structured data

### ContactSubmission - item 7

Transient. Validated, emailed, never stored.

- `name`, `email`, `message` (string), `service` (`Service.id | null`)
- `source` (string) - the "how did you find me" field, the only attribution the
  site has
- one zod schema shared by `react-hook-form` and the Server Action
- delivered by Resend. No accounts, no analytics, no cookie banner

## Tech stack

Next.js 16 with React 19, App Router, no separate backend. Static or server
rendered, deployed as one unit.

- **Next.js 16 / React 19, App Router** - the whole app, one deployable unit
- **shadcn on Base UI primitives, lucide** - components and icons
- **Tailwind v4** - theme as CSS variables in `globals.css` `@theme`
- **react-hook-form + zod** - the contact form, validated on both sides. Not
  shadcn's `Form` wrapper, for the reason in the coding standards
- **Resend** - contact email from a Server Action
- **ImageKit** - a photo-led gallery
- **i18n, hand-rolled** - `[locale]` segment plus a dictionary per locale. No
  package
- **CSS animation** - `motion` is not installed and is not being added

**No database, no auth, no object storage, no motion library.**

## Monetization

The site does not make money. It is a sales asset for a service business, and the
money is made in a chair. Success is bookings traceable to the site, measured by the
"how did you find me" field plus Search Console. No analytics script, no cookie
banner.

**The real return is the template.** The first of a reusable template for beauty
businesses. What that requires is discipline applied while building anyway: every
business fact in `data/`, prose in `dictionaries/`, the whole look in the theme,
both languages structural.

## UI/UX

**After Party. Vibrant and active, never spa-calm.** Decided by looking at rendered
options, not adjectives - the sketches are in `blueprint/reference/`. **Locked, and
shipped in item 1.**

**Ground `#261F36`** - a plum, not a black. Warmer than the darker candidates, which
read as severe.

| Token | Fill | Text | Means |
|---|---|---|---|
| nails | `#FF3D8F` | `#D4176B` | nail services |
| lashes | `#A97BFF` | `#7B45E0` | lash services |
| makeup | `#FF8A3D` | `#BF5710` | makeup services |
| confirm | `#3DE8B0` | `#0E8F63` | success and confirmation |

- **Every accent needs a darker twin.** The fills fail contrast under 18px, so small
  text and prices use the text column on light surfaces, never the fill.
- **Colour is navigation, not decoration**, and it does not translate.
- **Type: Unbounded 800 for headlines, Inter for everything else.**
- **Light and dark.** Dark is the brand and lives in `:root`; the light twin is in
  `.light` and nothing activates it. See Open questions.
- **Mobile is the product.** Every mockup was drawn at phone width.
- **Photography carries it.** Photo panels stay nearer `#1B1426`, and her photos want
  dark-friendly backgrounds - she needs to hear that before she shoots.

### Routes - decided and built in item 2

English at the root, Spanish under `/es`. Both prerendered static HTML. `/en`
redirects to `/` so no page has two URLs.

| Route | Status |
|---|---|
| `/` and `/es` | Home. Built; placeholder content until item 3 |
| `/gallery`, `/es/gallery` | Item 4 |
| `/nails`, `/lashes`, `/makeup` and `/es/...` | Item 5 |
| `/about`, `/es/about` | Item 6 |
| `/contact`, `/thank-you` and `/es/...` | Item 7 |

Slugs live in `siteConfig.nav`; the `/es` prefix is owned by `localePath` in
`lib/locale.ts`. Whether the Spanish slugs translate is still open.

## Deployment

**Vercel, live.** Repo at `github.com/frankdmosquera/facing-dani`, production
building from `main`, previews per pushed branch.

| | |
|---|---|
| App type | Next.js 16 App Router, standard build output |
| Build | `npm run build` |
| Env vars | none needed yet. ImageKit at item 4, Resend at item 7 |
| Database / storage / workers | none |
| Local env file | `.env.local`. There is no committed `.env.example` |

> TODO: **domain not registered.** It follows the business name, so `danimoreno.ca`
> or a studio name. Buy the `.ca` and the `.com` together. Until it exists,
> `metadataBase` is unset and the `hreflang` URLs are relative, which Google often
> ignores - item 9.

**Deploy early, then keep deploying.** A preview URL so Dani watches it grow on her
phone and corrections arrive while they are cheap.

### What this site has to rank for

The target is **nails and makeup in Calgary**, plus lashes.

- One page per service, not one services page - the reason item 5 exists in that shape
- Each service page owns its terms; no page borrows another's words
- Calgary in the title, H1, copy and schema on every page, without keyword soup
- **Spanish is not an SEO target.** English is what this site is trying to rank. The
  Spanish pages exist so a visitor who reads Spanish more comfortably can use the
  site. `hreflang` stops Google reading the two as duplicates and dropping one,
  which protects the English ranking. No Spanish keyword work
- **Be honest about the timeline.** A new domain wins the long tail first: service
  plus neighbourhood, service plus occasion. The Business Profile and reviews carry
  the head terms meanwhile

A Google Business Profile matters more than anything on this site for the first year
and is part of the engagement. Set up Search Console at launch.

## Open questions

1. **Item 8 says "Deploy" but the site is already live.** Deployment happened at
   item 1 because §8 asks for a preview URL from the first item, which the build
   plan never reflected. The roadmap now misreports six items' worth of progress.
   Either retire item 8 or rewrite it as what is genuinely left: the domain,
   `metadataBase`, and env vars at items 4 and 7.
2. **Her Instagram handle is not recorded anywhere.** The plans call the bio link
   the site's main entry point, but no document holds it.
   `siteConfig.social.instagram` is `null` and the footer link does not render, so
   nothing false ships. Needed before launch. This one needs Dani, not code.
3. **The light theme has no owner.** Section 7 specifies it and `.light` is ported
   and complete, but nothing activates it - no toggle, no media query. Unreachable
   until the decision is made. Costs nothing to leave.
4. **Spanish slugs are mirrored English** (`/es/nails`, not `/es/unas`). One helper
   owns the prefix, so deciding is a one-file change.
5. **`hreflang` URLs are relative.** Google generally wants absolute. Needs the
   domain and `metadataBase`. Item 9.
6. **The Spanish chrome copy is a draft** written during item 2, not by Dani. Marked
   as such in `dictionaries/es.ts`. Hers to correct before launch.
7. **Three `[confirm]` assumptions remain:** no logo exists (cost: a palette swap),
   service-area business with no public street address (one schema field),
   Instagram DM primary with the form as the route for everyone else (one
   component). The location one is worth thinking about rather than defaulting.
