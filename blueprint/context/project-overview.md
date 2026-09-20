# facing-dani - Project Overview

<!-- blueprint:source-hash e3d073692be0c764a70c2b7b655b7a7055dc61d169fc3f5abe069a65825b7fa8 -->

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

1. **Site shell and theme** - port `prototypes/theme.css` into `globals.css`
   `@theme`, then build header, mobile nav and footer against it. Everything after
   inherits the theme.
2. **Locale routing** - the `[locale]` segment, a dictionary per locale, the
   language switch, and the missing-string build error. Hand-rolled, no package.
3. **Home page** - hero, the three services, gallery teaser, her story, FAQ and the
   booking call to action.
4. **Gallery** - the full set of work, filterable by service, at a size where the
   quality is actually visible. **Headline feature.**
5. **Service pages** - nails, lashes and makeup, one page each, with treatments,
   prices and durations. Three pages and not one, because a single services page
   competes with itself and ranks for none of them.
6. **About** - her training, and the trust a new business has not earned yet.
7. **Contact and booking** - the form with the "how did you find me" field,
   validation, Resend delivery, the direct booking route, and a thank-you page.
8. **Deploy** - Vercel, env vars, a verified production build and a preview URL
   Dani can open. Early on purpose, so corrections arrive while they are cheap.
9. **Site-wide SEO pass** - sitemap and robots across both locales, LocalBusiness
   data, and an audit that every page carries its own metadata and hreflang. The
   only SEO work that genuinely needs all pages to exist.

Post-MVP, listed so they stop being re-proposed: **10.** reviews on site,
**11.** real booking with availability and deposits, **12.** a second client from
this template.

### Definition of done, items 3 onward

Not separate items, because a thing that touches every page cannot be a finishing
pass:

1. **Both languages.** The page exists at `/` and `/es`. Not done in one.
2. **Its own SEO.** Metadata, JSON-LD and hreflang land in the same commit as the
   page they describe.
3. **Real copy.** No placeholder strings. English drafted and corrected, Spanish
   written by Dani, who is a native speaker.

Out of scope for the MVP: online payment, deposits, real-time availability, client
accounts, reviews written on the site, a blog.

## Data model

**No database, and that is a decision rather than a gap.** Every piece of content is
a typed file in the repo: version controlled, reviewable in a diff, impossible to
lose. The only thing that leaves the machine is a contact form submission, sent as
email and not retained.

> **Locked, and the whole template rests on it.** A field is either locale-keyed or
> shared, never both. A price is a number and lives in one place; storing it twice
> guarantees that one day they disagree and the visitor believes the wrong one. A
> treatment label is prose and lives in two.

| Locale-keyed (`en` and `es`) | Shared across both |
|---|---|
| Service name and description | Price |
| Treatment labels | Duration |
| Image alt text | ImageKit path and service tag |
| FAQ question and answer | Ordering |
| Page metadata and JSON-LD text | Phone, email, hours, coordinates |

> **Locked: no component contains the word Dani.** A component reads
> `siteConfig.business.name`. The test is whether a second beauty business could be
> stood up by editing `data/` and the theme and touching nothing else. If the answer
> is no, that is a bug and not a preference.

> **Locked: a missing Spanish string is a build error**, never a silent fallback to
> English. Falling back quietly is how a site ends up half-translated without anyone
> noticing.

### siteConfig

One file, one source, no drift. Its name, address and phone must match the Google
Business Profile character for character, or Google treats them as two businesses.

- `business.name` (string) - **Dani Moreno**
- `business.city` / `region` / `country` (string) - Calgary, Alberta, CA
- `business.serviceArea` (string) - service-area business, no public street address
- `contact.email` (string), `contact.phone` (string)
- `social.instagram` (string) - the handle the bio link comes from
- `hours` (array of `{ day, open, close }`)
- `geo.lat` / `geo.lng` (number) - for LocalBusiness structured data
- `locales` (`["en", "es"]`), `defaultLocale` (`"en"`)

All shared. Nothing here is locale-keyed.

### Service

Three records, and the set is data because the next client may do brows and not
lashes.

- `id` (`"nails" | "lashes" | "makeup"`) - also the accent token key, which is what
  makes colour behave as navigation
- `order` (number) - shared
- `treatments` (Treatment[])
- locale-keyed: `name`, `description`, page `metadata`, JSON-LD text
- each service owns its own search terms: nails owns gel, acrylic, extensions,
  chrome, nail art; lashes owns classic, hybrid, volume, fills; makeup owns grad,
  bridal, event, glam. No page borrows another page's words

### Treatment

- `id` (string), `serviceId` -> `Service.id`
- `priceCad` (number) - shared, exists exactly once
- `durationMinutes` (number) - shared
- `order` (number) - shared
- locale-keyed: `label`

### GalleryImage

Images are records, not files. The repo stores a path, never the photograph.

- `id` (string)
- `imagekitPath` (string) - shared
- `serviceId` -> `Service.id` - shared, drives both the filter and the accent
- `order` (number) - shared
- locale-keyed: `alt`

### FaqItem

- `id` (string)
- `serviceId` (`Service.id | null`) - `null` means site-wide
- `order` (number) - shared
- locale-keyed: `question`, `answer`
- reused for FAQ structured data, so the text is written once and rendered twice

### Dictionary

One per locale, `en` and `es`. Keyed UI and page copy for everything not covered by
the records above. A key present in `en` and missing in `es` fails the build.

### ContactSubmission

Transient. Validated, emailed, never stored.

- `name`, `email`, `message` (string)
- `service` (`Service.id | null`)
- `source` (string) - the "how did you find me" field, and the only attribution the
  site has
- one zod schema shared by `react-hook-form` on the client and the Server Action on
  the server
- delivered by Resend, not retained. No accounts, no analytics, no cookie banner

## Tech stack

Next.js 16 with React 19, App Router, no separate backend. Static or server
rendered, deployed as one unit - a marketing site where page speed and SEO matter
more than live data, and a site with no database has nothing to run a backend for.

- **Next.js 16 / React 19, App Router** - the whole app, one deployable unit
- **shadcn on Base UI primitives, lucide** - components and icons
- **Tailwind v4** - theme as CSS variables in `globals.css` `@theme`, ported from
  `prototypes/theme.css`
- **react-hook-form + zod** - the contact form, validated on both sides. Not
  shadcn's `Form` wrapper, for the reason recorded in the coding standards
- **Resend** - contact email, called from a Server Action so the key stays server side
- **ImageKit** - doing real work here, given a photo-led gallery
- **i18n, hand-rolled** - a `[locale]` route segment and a dictionary per locale. No
  package; `next-intl` is more machinery than two languages and eight pages need,
  and the no-install rule applies
- **CSS animation** - glows, gradients and the ticker cost nothing. `motion` is not
  installed and is not being added

**No database, no auth, no object storage, no motion library.** All four were
offered by the scaffolder and declined.

## Monetization

The site does not make money. It is a sales asset for a service business, and the
money is made in a chair. Success is bookings traceable to the site, not traffic.

Measured by the "how did you find me" field on the contact form plus Search Console.
No analytics script, no cookie banner, no privacy policy needed to start. That makes
the contact form load-bearing: it is both the booking route for anyone who will not
DM, and the only attribution the site has.

**The real return is the template.** This is the first of a reusable template for
beauty businesses - nail studios, lash techs, brow and makeup artists. Calgary has
many, most are Latin-owned, and almost none have a bilingual site. What being a
template requires is not extra features, it is discipline applied while building
anyway: every business fact in `data/`, the whole look in the theme, both languages
structural rather than bolted on, services as data.

Whether Dani's own build is billed is a separate conversation and not a product
decision.

## UI/UX

**After Party. Vibrant and active, never spa-calm.** A massage studio sells calm;
nails sell energy, so the site is loud, dark and confident. Decided by looking at
rendered options, not adjectives - the sketches are in `blueprint/reference/`
(`direction-after-party.html`, `ground-check.html`, `light-and-dark.html`,
`design-directions.html`). **The direction is locked.**

**Ground `#261F36`** - a plum, not a black. Picked over darker options that had more
neon punch but read as severe. Plum lands warmer, which suits the clientele.

| Token | Fill | Text | Means |
|---|---|---|---|
| nails | `#FF3D8F` | `#D4176B` | nail services |
| lashes | `#A97BFF` | `#7B45E0` | lash services |
| makeup | `#FF8A3D` | `#BF5710` | makeup services |
| confirm | `#3DE8B0` | `#0E8F63` | success and confirmation |

Cards `#332747`, text `#F6F2FA`, muted `#B3A8C2`.

- **Every accent needs a darker twin.** The fills fail contrast under 18px, so small
  text and prices use the text column, never the fill.
- **Colour is navigation, not decoration.** Pink is always nails, violet always
  lashes, orange always makeup, on every page. A returning client stops reading menus
  and navigates by colour. The moment these become ornament it turns into a circus.
- **Type: Unbounded 800 for headlines, Inter for everything else.** Anton read as a
  gym poster, Fredoka as a cereal box.
- **Light and dark.** Dark is the brand. A light twin exists at `#FAF6FC`, and the
  translation rule is that glow becomes tint. The gradient CTA and ticker are
  identical in both, which is what keeps it one brand.
- **Mobile is the product.** Every mockup was drawn at phone width.
- **Photography carries it.** Her work is the brightest thing on every screen. Photo
  panels stay nearer `#1B1426` so images keep their punch without darkening the page,
  and she needs to hear that her photos want dark-friendly backgrounds before she
  shoots a hundred sets against a white desk.

### Routes

Eight pages, each in both locales. English at the root, Spanish under `/es`.

| Route | What's there |
|---|---|
| `/` | Home: hero, three services, gallery teaser, her story, FAQ, booking CTA |
| `/<gallery>` | The full set of work, filterable by service |
| `/<nails>`, `/<lashes>`, `/<makeup>` | One page per service: treatments, prices, durations |
| `/<about>` | Training, and the trust the business has not earned yet |
| `/<contact>` | Form with the "how did you find me" field, plus the direct booking route |
| `/<thank-you>` | So a submitted form is unambiguous |
| `/es/...` | The same eight, in Spanish |

> TODO: the exact slugs are not decided, including whether the Spanish slugs are
> translated (`/es/unas`) or mirrored (`/es/nails`). This is not cosmetic - it sets
> the hreflang pairing and the Spanish keyword targets. Decide at item 2.

## Deployment

**Vercel.** A Next.js marketing site with no backend, no database and no workers is
the case Vercel is built for, and the free tier covers this traffic.

| | |
|---|---|
| App type | Next.js 16 App Router, standard build output |
| Build | `npm run build` |
| Start | handled by the platform, no custom start command |
| Env vars | `NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT`, `IMAGEKIT_PRIVATE_KEY`, `RESEND_API_KEY` - already in `.env.example` |
| Database / storage | none |
| Workers / cron | none |
| Health check | not applicable |

**Deploy early, then keep deploying.** A preview URL from item 8, so Dani watches it
grow on her phone and corrections arrive while they are cheap. The alternative is
she sees it for the first time when it is finished and expensive to change.

**Locale routing.** English at the root, Spanish at `/es`. Not a subdomain and not a
separate domain, because both split the ranking signal and this site has none to
spare. Every page carries `hreflang` for both plus `x-default`, or Google treats
them as duplicates and picks one for you.

> TODO: **domain not registered.** It follows the business name, so `danimoreno.ca`
> or a studio name. Buy the `.ca` and the `.com` together.

### What this site has to rank for

The target is **nails and makeup in Calgary**, plus lashes, and it decides the page
structure rather than following from it.

- One page per service, not one services page - the reason item 5 exists in that shape
- Calgary in the title, H1, copy and schema on every page, without turning into
  keyword soup that reads badly to a human
- The Spanish pages are a second set of rankings, not duplicates. `hreflang` is what
  stops Google treating them as duplicates and choosing one
- **Be honest about the timeline.** A new domain with no links does not win "nail
  salon Calgary" quickly. The site wins the long tail first: service plus
  neighbourhood, service plus occasion, and Spanish. The Business Profile and reviews
  carry the head terms in the meantime

A Google Business Profile matters more than anything on this site for the first year
and is part of the engagement. The site supports it with consistent name, address and
phone and with LocalBusiness structured data; it does not replace it. Set up Search
Console for both locales at launch.

## Open questions

Resolve these in the plans, then re-run `/overview`.

1. **The light theme has no owner in the build plan.** `project-plan.md` section 7
   specifies the light twin in detail and there is a rendered sketch, but no build
   item builds it and the toggle question is left "leaning no". Three different
   answers - dark only, light via `prefers-color-scheme` inside item 1, or its own
   item - and only one of them is free. Decide before item 1.
2. **Route slugs, and whether the Spanish ones are translated.** See the Routes TODO
   above. Sets hreflang pairing and the Spanish keyword targets.
3. **Google Business Profile and Search Console are not in the build plan.** Section
   8 calls the profile more important than the site for the first year and part of
   the engagement, but nothing tracks it. Either it gets an item or it is explicitly
   outside the build plan.
4. **The business name is settled in one section and open in another.** Section 4
   states **Dani Moreno**; section 8's domain row still reads "follows the business
   name, so `danimoreno.ca` or a studio name". The name has to be final before the
   Business Profile, because the site and the profile must match character for
   character.
5. **Whether service pages carry their own FAQs.** `FaqItem.serviceId` allows it and
   section 8 wants each service page to own its own terms, but only item 3 surfaces
   FAQ. Cheap to decide at item 5, expensive to retrofit into the structured data.
6. **Four `[confirm]` assumptions**, all cheap to change, none blocking: no logo
   exists (cost: a palette swap), service-area business with no street address (one
   schema field), Instagram DM primary with the form as the route for everyone else
   (one component), domain not registered (a DNS change). The location one is worth
   actually thinking about rather than defaulting: someone young working from home
   should probably not publish a street address.

Two things that are **not** conflicts, recorded so they are not read as gaps:

- The thank-you page is its own bullet in section 3 and folded into build item 7.
- Item 8 (Deploy) is an operational step rather than a user-visible feature, placed
  mid-list on purpose so Dani sees the site before it is finished.
