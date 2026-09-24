# Dani Moreno - Project Overview

<!-- blueprint:source-hash 6d67569a5b614c0eee3a14413c38a2cafa62fcb8f4ea06c4fa1d26484e83344a -->

> A bilingual, SEO-first marketing site for a nail, lash and makeup artist in
> Calgary, and the first build of a reusable template for beauty businesses.

## Problem

A new nail, lash and makeup artist in Calgary has no presence beyond Instagram.
Instagram shows work well but cannot hold a price list, cannot answer "what do
you actually do", cannot be found on Google, and a grid of squares is a poor
gallery when someone wants to inspect one set closely.

The site is what her bio link points at, and its job stays narrow: make her look
like a real business, show the work at a size where quality is visible, answer
what/how much/how long without a DM, and take the booking or hand it cleanly to
wherever bookings live.

**The angle is craft, not price.** She trained in Colombia, where the standard
for nail work is higher than most people here expect, and shape, structure and
cuticle work are what decide whether a set still looks good in week three -
which is what she was taught to get right. That claim is true, hard to copy, and
survives a price rise. Price is deliberately not the angle, because it is the
one advantage that disappears the moment she raises her rates.

**She is fully bilingual, and that is a service rather than a setting.** A
translated site says she can read it; a fluent artist means the whole
appointment can happen in Spanish. It is said out loud on the home page as a
claim, not left implied by the existence of a `/es` URL. A competitor can run a
page through a translator in an afternoon; they cannot become bilingual.

**What it is not:** a booking engine, a shop, a blog, or a client account
system.

## Users

- **The client, roughly 15 to 25.** Arrives from an Instagram bio link, on a
  phone, often at night, deciding between two or three artists she already
  follows. Scrolling and judging, not reading. **This sets nearly every UI
  decision: mobile is not a consideration, it is the product.**
- **Her mother, paying for a grad set.** Arrives from Google. Needs the business
  to look legitimate in about four seconds: prices visible, location clear, a
  human name, no dead links. She is why the contact form exists, because she
  will not DM a teenager on Instagram.
- **The Spanish-speaking client.** Searches in Spanish, finds nothing local.
  Underserved by every competitor in this market, and the reason the site is
  bilingual rather than translated later.
- **The artist herself.** Needs one link that answers everything, so her DMs
  stop being a price list.

No accounts and no access tiers. Every page is public.

## Features

In build-plan order. Numbers are stable identifiers, not sequence: 11 to 13 are
post-MVP and 14 to 18 were added later, so the MVP runs 1-10, 14, 16-18, then 15.

Every content item is done only when it exists in both languages, carries its
own metadata, JSON-LD and hreflang, and has real copy rather than placeholders.

1. **Site shell and theme** - the theme ported into `globals.css` `@theme`, plus
   header, mobile nav and footer. Done.
2. **Locale routing** - the `[locale]` segment, a dictionary per locale, the
   language switch, and the missing-string build error. Hand-rolled. Done.
3. **Home page** - hero, the three services, gallery teaser, her story, FAQ and
   the booking CTA. Done; its hero photograph and teaser landed in 14.
4. **Gallery** - the full set of work, filterable by service. Done.
5. **Service pages** - nails, lashes and makeup, one page each, with treatments,
   prices and durations. Done.
   - 5a. **The pages** - the three routes in both languages, their SEO, and the
     empty state that renders until prices exist. Done.
   - 5b. **The menu and booking policies** - treatments, prices and durations
     in `data/treatments.ts`, plus the deposit, payment, removal and
     first-visit answers in the FAQ. Prices researched against Calgary, for
     Dani to confirm before launch. Done.
6. **Who she is** - her training and the trust a new business has not earned
   yet, carried on the home page. Done.
   - 6a. **The page** - the `/about` route, the bilingual promise, what happens
     at an appointment, and Person data. Done, then folded into home by 14.
   - 6b. **Her story** - where she trained, what she does between clients, and
     how a client should feel leaving, in the home story section. Done.
7. **Contact and booking** - the form with the "how did you find me" field,
   validation, Resend delivery, the direct booking route and a thank-you page.
   Done.
8. **Deploy** - Vercel, env vars, a verified production build and a preview URL.
   Done at item 1; the domain and indexing work moved to 15.
9. **Site-wide SEO pass** - sitemap and robots across both locales,
   `LocalBusiness` data, and a per-page metadata audit. Done.
10. **Gallery lightbox** - tap a photo to open it large, with next, previous, a
    thumbnail strip, keyboard and swipe. Done.
14. **Home page rebuild** - the hero photograph and gallery teaser, the process
    and expanded FAQ sections, and About absorbed onto home. Done.
16. **Decorative imagery for lashes and makeup** - licensed stock (Unsplash or
    Pexels) on those two service pages only, with no identifiable faces. Never
    in the gallery, a work strip or structured data, never captioned as her
    work. Also closes the empty band left below those two menus with no photos.
    Done.
17. **Inspiration grids on the service pages** - licensed stock on nails, lashes
    and makeup, 11 to 14 images each as Frank picked them, headed "Inspiration"
    in both languages, under 16's boundary. The lash mapping photo from 16
    comes out. Done.
18. **Her Drive photos in the gallery** - her HEIC originals converted, cut to
    the strongest by Frank, and added to the gallery in both languages. A
    recognisable face stays out until she is asked. **Next.**
15. **Domain, indexing and production email** - buy the domain, set the site URL
    so robots stops disallowing everything, and give Resend a sender that can
    mail anyone. **Blocked until the domain exists, and it gates launch.**

Post-MVP, not scheduled: **11 Reviews on site** (waits for reviews worth
showing), **12 Real booking** (only if DMs stop coping), **13 Second client from
this template**.

**The headline feature is the gallery.** It is the proof the craft claim rests
on, and it is why items 4 and 10 exist in that shape.

Explicitly out of scope for the MVP: online payment, deposits, real-time
availability, client accounts, reviews written on the site, and a blog.

## Data model

**Nothing in a database, and that is a decision rather than a gap.** Every piece
of content is a typed file in the repo: version controlled, reviewable in a
diff, impossible to lose. Images are records, not files - the repo stores an
ImageKit path, never the photograph.

### siteConfig

- `business` - name (**Dani Moreno**), Calgary, Alberta, contact details, hours,
  service area
- `social` - handles; `instagram` is currently `null`, so the footer link does
  not render
- `nav`, `cta`, `footer`, `marquee` - chrome, all locale-neutral structure

> Locked: every business fact comes from here. A component reads
> `siteConfig.business.name`; it never contains the word Dani.

### Service

- `id` (`"nails" | "lashes" | "makeup"`) - also the dictionary key
- `order` (number)
- `href` (string) - no locale prefix; render through `localePath`. The
  `[service]` route builds its static params from these, so the slug and the
  link can never disagree.

### TreatmentRow

- `key` - constrained to that service's own treatment labels, so a lash price
  cannot be written with a nails label
- `priceCad` (number) - whole Canadian dollars, never cents, never a range
- `from` (boolean, optional) - renders "From $5"
- `durationMinutes` (number)
- `order` (number)

> **Item 5b fills it:** nine nail rows, five lash, four makeup, set by Frank on
> 2026-09-23 from Calgary research and positioned mid-low, for Dani to confirm
> before launch. A service with no rows still renders its empty state, because
> the next client from this template starts with none.

### GalleryImage

- `key` - keyed against the dictionary, so a photo with no alt text is a compile
  error
- `imagekitPath` (string), `serviceId`, `order`
- `width`, `height` (number) - the real cropped pixels, which reserve each tile
  before the bytes arrive

> **Nine records, all `nails`.** No lash photographs exist and two makeup frames
> are held back because the model's face is recognisable and nobody has asked
> her. This is why the filter row hides a chip for a service with no photos.

> Locked: **decorative stock is never a `GalleryImage`.** A gallery row is a
> claim of authorship, so stock lives outside this model, in
> `data/decorativeImages.ts` (item 16) and the item 17 grid records.

### Portrait

- `imagekitPath`, `width`, `height`, or **`null`**, which is the current value

> A portrait is not work, so it is its own file rather than a gallery row -
> otherwise it would appear in the filtered grid and in `ImageGallery`
> structured data as something a client can book. The home story section is
> wired to render one and reads correctly without it.

### FaqItem

- `key`, `order`, `serviceId` (`ServiceId | null`) - null means site-wide.
  Reused for FAQ structured data.

> Nine items, all site-wide, on the home page. No answer states a price; prices
> live only in `TreatmentRow`.

### Dictionaries

One per locale, `en` and `es`, keyed so **a missing Spanish string is a build
error, not a silent fallback**.

| Locale-keyed | Shared across both |
|---|---|
| Service name and description | Price |
| Treatment labels | Duration |
| Image alt text | ImageKit path and service tag |
| FAQ question and answer | Ordering |
| Page metadata and JSON-LD text | Phone, email, hours, coordinates |

> Locked: a price is a number and belongs in one place; a treatment label is
> prose and belongs in two. Storing a price twice guarantees they disagree one
> day, and the visitor believes whichever is wrong.

The only thing that leaves the machine is a contact form submission, sent as
email and not retained. No accounts, no analytics, no cookie banner.

## Tech stack

- **Next.js 16 / React 19, App Router** - the whole app, one deployable unit,
  static or server rendered. No separate backend, because a site with no
  database has nothing to run one for.
- **shadcn on Base UI primitives, lucide icons** - UI
- **Tailwind v4** - theme as CSS variables in `globals.css` `@theme`
- **react-hook-form with zod** - forms, validated both sides. Not shadcn's
  `Form` wrapper, for the reason in the coding standards.
- **Resend** - email, called from a Server Action so the key stays server side
- **ImageKit** - images, doing real work here given a photo-led gallery
- **i18n, hand-rolled** - a `[locale]` segment and a dictionary per locale. No
  package; `next-intl` is more machinery than two languages need.
- **No database, no auth, no object storage, no motion library.** All four were
  offered by the scaffolder and declined. Animation is CSS.

## Monetization

The site does not make money. It is a sales asset for a service business and the
money is made in a chair. Success is bookings traceable to the site, not
traffic.

Measured by a "how did you find me" field on the contact form plus Search
Console. No analytics script, no cookie banner, no privacy policy needed to
start. **That makes the contact form load-bearing:** it is both the booking
route for anyone who will not DM, and the only attribution the site has.

**The real return is the template.** Calgary has many beauty businesses, most
Latin-owned, almost none with a bilingual site. Being a template requires: every
business fact in `data/`, the whole look in `theme.css`, both languages
structural, and services as data because the next client may do brows and not
lashes. The test is whether a second business could be stood up by editing
`data/` and `theme.css` and touching nothing else.

## UI/UX

**After Party. Vibrant and active, never spa-calm.** A massage studio sells
calm; nails sell energy, so the site is loud, dark and confident. Sketches are
in `blueprint/reference/`.

**Ground `#261F36`,** a plum rather than a black, picked over darker options
that read as severe.

| Token | Fill | Text | Means |
|---|---|---|---|
| nails | `#FF3D8F` | `#D4176B` | nail services |
| lashes | `#A97BFF` | `#7B45E0` | lash services |
| makeup | `#FF8A3D` | `#BF5710` | makeup services |
| confirm | `#3DE8B0` | `#0E8F63` | success |

Cards `#332747`, text `#F6F2FA`, muted `#B3A8C2`.

> Locked: **every accent needs its darker twin.** The fills fail contrast under
> 18px, so small text and prices use the text column, never the fill.

> Locked: **colour is navigation, not decoration.** Pink is always nails, violet
> always lashes, orange always makeup, on every page.

**Type: Unbounded 800 for headlines, Inter for everything else.** Dark is the
brand; a light twin exists at `#FAF6FC` where glow becomes tint. **Mobile is not
a consideration, it is the product** - every mockup was drawn at phone width.
**Photography carries it,** which means her photos need dark-friendly
backgrounds; photo panels stay nearer `#1B1426`. **Motion in CSS only.**

> Locked: **stock is decoration, not a claim.** Until she has photos for them,
> lashes and makeup carry licensed decorative stock with no identifiable faces:
> never in the gallery or a work strip, never captioned or marked up as hers,
> and each image comes out when her own photo for that service arrives. Every
> service page, nails included, also carries a stock grid headed "Inspiration"
> in both languages under the same rules. It never renders without the heading,
> and it stays when her photos arrive, because it shows styles, not her work.

Routes, each also at `/es`:

- `/` - home: hero photograph, the three services, a work teaser, her story, the
  bilingual promise, what happens in the chair, FAQ, booking band
- `/nails`, `/lashes`, `/makeup` - one page per service
- `/gallery` - the full set, filterable, with the lightbox
- `/contact` - the form and the direct booking route
- `/thank-you` - so a submitted form is unambiguous

`/about` and `/es/about` permanently redirect to `/` and `/es`.

## Deployment

**Vercel, live.** Repo at `github.com/frankdmosquera/facing-dani`, production
building from `main`, previews per pushed branch. Currently serving at
`facing-dani.vercel.app`.

| | |
|---|---|
| App type | Next.js 16 App Router, standard build output |
| Build | `npm run build` |
| Start | handled by the platform, no custom command |
| Database / storage / workers / health check | none |
| Local env file | `.env.local`. **There is no committed `.env.example`** |

Env vars by name:

- `NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT` - set in production, gallery confirmed working
- `IMAGE_KIT_PRIVATE_KEY` - upload script only, never shipped to the browser
- `RESEND_API_KEY`
- `RESEND_FROM` - **local only, and must not be set in production.** Resend's
  shared sender delivers only to the account owner and returns 403 for everyone
  else; the account's two verified domains belong to other clients.
- `NEXT_PUBLIC_SITE_URL` - **unset**, which is why robots serves `Disallow: /`
  and the sitemap is empty.

> **The domain is the single blocker.** Not registered. It follows the business
> name, so `danimoreno.ca` or a studio name; buy the `.ca` and the `.com`
> together. Until it exists: nothing is indexable, `hreflang` URLs stay
> relative, and **the contact form cannot deliver mail in production.** This is
> item 15.

**Locale routing:** English at the root, Spanish at `/es`. Not a subdomain and
not a separate domain, because both split a ranking signal this site has none to
spare. Every page carries `hreflang` for both plus `x-default`.

**Before launch, and not as a feature:** a Google Business Profile matters more
than anything on this site for the first year. Name, address and phone must
match character for character between site and profile, which is why every
business fact comes from `siteConfig`. Set up Search Console for both locales.

### What this site has to rank for

Target: **nails and makeup in Calgary**, plus lashes.

- **One page per service, not one services page.** A single page listing three
  services competes with itself and ranks for none. This is why item 5 exists in
  that shape, and why collapsing the service pages was considered and rejected.
- **Each service page owns its terms.** Nails owns gel, acrylic, extensions,
  chrome, nail art. Makeup owns grad, bridal, event, glam. Lashes owns classic,
  hybrid, volume, fills. No page borrows another's words.
- **Calgary in the title, H1, copy and schema** on every page, without keyword
  soup.
- **Spanish is not an SEO target.** English is what this site is trying to rank;
  `hreflang` exists to stop Google reading the two as duplicates.
- **Be honest about the timeline.** A new domain wins the long tail first. The
  Business Profile and reviews carry the head terms meanwhile.

## Open questions

1. **Still open with Dani:** permission for the two makeup frames, and why she
   got into nails.
2. **Section 8 says env vars are "Already in `.env.example`". There is no
   committed `.env.example`.** It also names `IMAGEKIT_PRIVATE_KEY` while the
   real variable is `IMAGE_KIT_PRIVATE_KEY`, and omits `RESEND_FROM` and
   `NEXT_PUBLIC_SITE_URL` entirely.
3. **"Spanish is written by Dani" is not what happens.** Section 3 and the build
   plan's definition of done both say so; in practice the Spanish is drafted
   during each feature. Frank reviewed it on 2026-09-23 and called it fine as it
   stands. Either the rule or the practice should change.
4. **A store is being considered, and section 1 explicitly rules one out**
   ("What it is not: a booking engine, a shop..."). Parked, to be planned from
   the backend. If it proceeds, section 1 must change.
5. **A dedicated `/book` page is being considered**, on the Face and Body
   pattern: one page, service passed in the query string, an inline provider
   iframe, `noindex`. Not yet a build-plan item.
6. **The light theme has no owner.** Section 7 specifies it and `.light` is
   ported and complete, but nothing activates it. Unreachable until decided.
   Costs nothing to leave.
7. **Spanish slugs are mirrored English** (`/es/nails`, not `/es/unas`). One
   helper owns the prefix, so deciding is a one-file change.
8. **Four `[confirm]` assumptions remain:** no logo exists (cost: a palette
   swap), service-area business with no public street address (one schema
   field), the contact form as the only booking route until a business
   Instagram exists (one component), and the domain (item 15). The location one
   is worth thinking about rather than defaulting - a seventeen-year-old
   working from home should probably not publish a street address.
9. **If the contact form fails there is no second route.** No Instagram, and no
   public email or phone. The only email in `siteConfig` is Frank's personal
   address and is not published. Closes with a business email, an Instagram
   account, or item 15 making the form reliable.
