# Glammed Beauty Studio - Project Overview

<!-- blueprint:source-hash 5b408e13d71c97c5836ddbbd8cd2494a20018ca2eef61ddbb90099e8b6f15f26 -->

> A bilingual, SEO-first marketing site for Dani, a nail artist in Calgary who
> also works kids' and teen parties, and the first build of a reusable template
> for beauty businesses.

## Problem

Instagram shows her work but cannot hold a price list, cannot be found on
Google, and is a poor gallery for judging one set closely. The site is what her
bio link points at, with a narrow job: look like a real business, show the work
at a size where quality is visible, answer what/how much/how long without a DM,
and take the booking.

**The angle is craft, not price.** Trained in Colombia, she was taught shape,
structure and cuticle work, the parts that decide whether a set still looks good
in week three. That is true, hard to copy, and survives a price rise. Price is
never the angle.

**Bilingual is a service, not a setting.** The whole appointment can happen in
Spanish, and the site says so out loud rather than leaving it implied by `/es`.

**What it is not:** a booking engine, an online shop, a blog, or client accounts.

**Direction since 2026-09-25:** she is strong at nails and still learning lashes
and makeup, so **nails is the one professional service** and **parties** (a
station at a party someone else hosts) is the second side. Lashes and makeup keep
their pages, reached from the phone menu and footer only.

## Users

- **The client, 15 to 25.** From an Instagram bio link, on a phone, at night,
  choosing between artists she follows. Scrolling, not reading. **Mobile is the
  product; desktop must not break.**
- **Her mother, paying for a grad set.** Needs legitimacy in four seconds:
  prices, location, a human name, no dead links. Will not DM a teenager, which
  is why the contact form exists.
- **The Spanish-speaking client.** Finds nothing local in Spanish; the reason
  the site is bilingual from day one.
- **A parent hosting a party.** Asks through the contact form; parties are
  never instantly bookable.
- **Dani.** One link that answers everything, so DMs stop being a price list.

No accounts. Every page is public.

## Features

Build-plan order. Numbers are stable IDs, not sequence. Done for every content
item means: both languages, its own metadata/JSON-LD/hreflang, real copy.

1. **Site shell and theme** - theme in `globals.css` `@theme`, header, mobile
   nav, footer. Done.
2. **Locale routing** - `[locale]` segment, dictionary per locale, language
   switch, missing-string build error. Hand-rolled. Done.
3. **Home page** - first version. Done; rebuilt by 14 and 19a.
4. **Gallery** - the full set of work, filterable by service. Done.
5. **Service pages** - one page per service with treatments, prices and
   durations. 5a routes and SEO, 5b menu and booking policies. Done.
6. **Who she is** - training and trust; 6a the page, 6b her story. Done, folded
   into home by 14, back on `/about` by 19c.
7. **Contact and booking** - form with "how did you find me", zod both sides,
   Resend delivery, thank-you page. Done.
8. **Deploy** - Vercel, env vars, production build. Done at item 1.
9. **Site-wide SEO pass** - sitemap, robots, LocalBusiness data, per-page audit.
   Done.
10. **Gallery lightbox** - large view, next/previous, thumbnails, keyboard and
    swipe. Done.
14. **Home page rebuild** - hero photograph, work teaser, process and FAQ. Done.
16. **Decorative imagery for lashes and makeup** - licensed stock, no faces,
    never a claim of her work. Done.
17. **Inspiration grids** - licensed stock on every service page under an
    "Inspiration" heading. Done.
18. **Her Drive photos in the gallery** - her originals converted, cut, added
    in both languages. Done.
19. **Nails and events** - nails first, parties second. Done.
    - 19a home in the new order, 19b `/parties` and a two-way contact form,
      19c `/about` returns, 19d lashes and makeup made light.
20. **Store** - press-ons and nail care, category tabs, prices, no cart. Done.
15. **Domain, indexing and production email** - **the one open MVP item.**

Post-MVP, not scheduled: **11 Reviews on site**, **12 Real booking**
(availability and deposits), **13 Second client from this template**.

**Headline feature: the gallery.** It is the proof the craft claim rests on.

Out of scope for the MVP: online payment, deposits, real-time availability,
client accounts, on-site reviews, a blog.

## Data model

**No database, on purpose.** Every fact is a typed file in `data/`, reviewable
in a diff. Images are records (an ImageKit path), never files in the repo. The
only thing that leaves the machine is a contact form email, not retained.

### siteConfig (`data/siteConfig.ts`)

- `business` - `name` "Glammed Beauty Studio", `ownerName` "Dani", `city`,
  `region`, `website`, `email`, `wordmarkAccent`
- `social.instagram` - `{ handle, url } | null`, currently `null`; every
  Instagram link hides while it is null
- `nav` - `{ key, href, mobileOnly? }[]`; `mobileOnly` keeps lashes and makeup
  out of the desktop header
- `cta`, `footer.services`, `footer.contact`

> Locked: every business fact comes from here. No component contains the word
> Dani; the test is whether a second business could launch by editing `data/`
> and the theme only.

### Service (`data/services.ts`)

- `id` - `"nails" | "lashes" | "makeup"`, also the dictionary key
- `order` (number), `href` (string, no locale prefix)

> The `[service]` route builds its static params from these, so slug and link
> cannot disagree.

### TreatmentRow (`data/treatments.ts`)

- `key` - constrained to that service's own treatment labels
- `priceCad` (number, whole dollars), `from?` (renders "From $5")
- `durationMinutes` (number), `order` (number)
- `addOn?: true` - done inside another appointment: no Book button, no Cal.com
  event

> 9 nail, 5 lash, 4 makeup rows; 4 are add-ons. Prices set by Frank from
> Calgary research, for Dani to confirm. A price lives here only.

### Booking (`lib/bookingConfig.ts`)

- `CALCOM_USERNAME` - a constant, never an env var
- `eventSlug(service, treatmentKey)` - `nails` + `gelXFill` -> `nails-gel-x-fill`
- One Cal.com event per bookable treatment; every Book link is a real
  `cal.com` URL with the popup layered on top

### GalleryImage (`data/gallery.ts`)

- `key` - typed against the dictionary, so a photo without alt text will not
  compile
- `imagekitPath`, `serviceId`, `order`, `width`, `height` (real cropped pixels)
- `HOME_HERO` and `SERVICE_HERO` - which record sits beside a headline; a
  service's work strip skips its hero

> 23 records: 18 nails, 5 makeup. Her originals carry GPS; every upload is
> re-encoded without metadata.

> Locked: **stock is never a GalleryImage.** A gallery row claims authorship.

### DecorativeImage (`data/decorativeImages.ts`)

- `imagekitPath`, `width`, `height`, `source`, `photographer`,
  `licence` (`"unsplash" | "pexels"`) - the last three are never rendered
- `decorativeImages` - one opening image per service without her photos;
  `inspirationImages` - the Inspiration grid per service

### StoreProduct (`data/store.ts`)

- `key`, `category` (`"pressOns" | "nailCare"`), `priceCad`, `from?`, `order`
- `image` - stock record like DecorativeImage, or `null`

> 6 products. Stock photos tagged "Stock photo"; **no Product structured data**
> until she shoots her own.

### FaqItem (`data/faq.ts`) and page FAQs

- `key`, `order`, `serviceId | null` - 10 site-wide questions on home
- Nails and parties carry their own question lists in the dictionary
- One `FaqList` component renders any list and emits its own `FAQPage` data
  from the same items

### Portrait (`data/portrait.ts`)

- `{ imagekitPath, width, height } | null` - stays `null`: the site shows no
  photo of her (she is 17)

### Dictionaries (`dictionaries/en.ts`, `es.ts`)

`es` is typed as the `en` shape, so **a missing Spanish string is a build
error**, never a fallback.

| Locale-keyed | Shared |
|---|---|
| Names, descriptions, treatment labels | Price, duration |
| Alt text, FAQ text, metadata, JSON-LD text | ImageKit paths, service tags, order |

## Tech stack

- **Next.js 16 / React 19, App Router** - one deployable unit, no backend
- **shadcn on Base UI, lucide** - UI
- **Tailwind v4** - theme as CSS variables in `globals.css`
- **react-hook-form + zod** - forms, validated both sides
- **Resend** - contact email from a Server Action
- **ImageKit** - every photo, transformed on delivery
- **Cal.com** - booking, one event per treatment, popup over real links
- **i18n hand-rolled** - `[locale]` segment and two dictionaries, no package
- **No database, auth, object storage or motion library**; animation is CSS

## Monetization

The site makes no money; the chair does. Success is bookings traceable to the
site, measured by the form's "how did you find me" field plus Search Console. No
analytics script, no cookie banner.

**The real return is the template:** almost no Calgary beauty business has a
bilingual site. Every business fact in `data/`, the look in the theme, both
languages structural, services as data.

## UI/UX

**After Party: loud, dark, confident, never spa-calm.** Ground `#261F36` (plum),
photo panels near `#1B1426`, Unbounded 800 headlines over Inter. Sketches in
`blueprint/reference/`.

| Token | Fill | Text on light | Means |
|---|---|---|---|
| nails | `#FF3D8F` | `#D4176B` | nails |
| lashes | `#A97BFF` | `#7B45E0` | lashes |
| makeup | `#FF8A3D` | `#BF5710` | makeup |
| confirm | `#3DE8B0` | `#0E8F63` | success |

> Locked: every accent has a darker twin for small text and light grounds.
> Colour is navigation: pink is always nails.

> Locked: **dark is the brand.** A light twin (`#FAF6FC`) exists; the plan
> leans against a toggle (see Open questions).

> Locked: **stock is decoration, not a claim.** No identifiable faces, never in
> the gallery or a work strip, never captioned or marked up as hers. The
> Inspiration grid never renders without its heading.

**Mobile is the product.** Motion in CSS only. Parties copy is "Hosting a
party? I can come with...", never "book me for your party".

Routes, each also under `/es`:

- `/` - home: nails first, then parties, story, FAQ
- `/nails` - the professional service: prices, Book per treatment, guide,
  steps, work, Inspiration, questions
- `/parties` - her part at someone else's party; requests via the form
- `/about` - her training and story
- `/store` - press-ons and nail care, no cart
- `/gallery` - the full set, filterable, with the lightbox
- `/contact` - questions and party requests; `?topic=` preselects
- `/thank-you` - a submitted form is unambiguous
- `/lashes`, `/makeup` - kept, reached from the phone menu and footer only
- `/logos` - temporary noindex preview for Dani to pick a logo and theme

## Deployment

**Vercel**, building from `main` at `github.com/frankdmosquera/facing-dani`,
previews per pushed branch.

| | |
|---|---|
| App type | Next.js 16 App Router, standard output |
| Build | `npm run build`; start handled by the platform |
| Database / storage / workers / health check | none |
| Local env file | `.env.local`; no committed `.env.example` |

Env vars by name: `NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT`, `IMAGE_KIT_PRIVATE_KEY`
(upload scripts only), `RESEND_API_KEY`, `RESEND_FROM`, `CONTACT_INBOX`.
`CALCOM_API_KEY` is read only by `scripts/createCalcomEventTypes.mjs`, run by
hand, and never belongs in a file.

**Domain:** the plan (section 8) still reads "not registered" (see Open
questions). The site URL lives in `siteConfig.business.website`, not an env var.

**Locale routing:** English at `/`, Spanish at `/es`, `hreflang` for both plus
`x-default` on every page.

**Before launch, not a feature:** a Google Business Profile, with name, address
and phone matching the site character for character, and Search Console.

### What it has to rank for

**Nails in Calgary**, then **nails at kids' and teen parties.** Lashes and
makeup are no longer targets.

- One page per service; each owns its terms (nails: gel, acrylic, Gel-X,
  chrome, nail art).
- Calgary in title, H1, copy and schema, without keyword soup.
- Spanish is not an SEO target; `hreflang` only protects the English ranking.
- The long tail comes first; the Business Profile carries head terms.

## Open questions

Contradictions between the plans, or between the plans and what shipped.
Resolve them in the plans, then re-run `/overview`.

1. **The business name.** Section 4 says `siteConfig` holds "Dani Moreno"; the
   site was renamed Glammed Beauty Studio on 2026-09-25.
2. **The domain.** Section 8 and the `[confirm]` table say "not registered";
   build-plan 15 says "blocked until the domain exists". The domain
   `glammedbeautystudio.com` is bought and live; what remains of 15 is the
   `vercel.app` redirect, Search Console and one live form test.
3. **Booking.** Section 3 puts real-time availability out of scope and
   build-plan 12 is unchecked, but Cal.com booking per treatment is live. Only
   deposits are still parked. Section 5 does not list Cal.com.
4. **The theme toggle.** Section 7 "leans no"; a header light-mode button
   shipped on 2026-09-26 with dark as the default and a lilac logo in light.
5. **Navigation.** Section 7 reads "Home · Nails · Parties · About · The work";
   the site has Home · Nails · Parties · About · Store · Gallery · Contact, plus
   a temporary Logos link. Build-plan 19 still says "Events" in its title and
   menu, and the store is not in section 3's feature list.
6. **Party scope.** Section 3 says she "does the guests' nails"; the shipped
   parties copy (Frank's call) is nails, face painting and makeup, with lashes
   for teens on request.
7. **Punch-list work has no build-plan items.** The nails hero, the thin-pages
   round (nails, gallery, parties, store) and light mode shipped 2026-09-26
   without specs or build-plan lines.
8. **Lashes and makeup.** Frank decided on 2026-09-26 to freeze both pages and
   hide them later; neither plan says so.
9. **Env vars in section 8** name `IMAGEKIT_PRIVATE_KEY` (real:
   `IMAGE_KIT_PRIVATE_KEY`), omit `RESEND_FROM` and `CONTACT_INBOX`, and claim
   a `.env.example` that does not exist.
10. **"Spanish is written by Dani"** (section 3, build-plan definition of
    done). In practice it is drafted during each feature for her to read.
11. **The `[confirm]` table is stale:** a logo exists (her original, plus
    redraws on `/logos`), and booking is Cal.com rather than the form alone.
12. **Still with Dani:** why she got into nails, her About answers, party
    details (what she brings, time per guest), custom press-on sizing, and
    confirming every price.
