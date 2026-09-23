# Dani Moreno - Project Overview

<!-- blueprint:source-hash 6da87042c10c82c0d5652416059bb2b7a16ee6744581f69b4489e460753bd0ff -->

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
cuticle work are what decide whether a set still looks good in week three. That
claim is true, hard to copy, and survives a price rise. Price is deliberately
not the angle, because it is the one advantage that disappears the moment she
raises her rates.

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
post-MVP and 14 to 15 were added later, so the MVP runs 1-10 then 14-15.

1. **Site shell and theme** - the theme ported into `globals.css` `@theme`, plus
   header, mobile nav and footer. Done.
2. **Locale routing** - the `[locale]` segment, a dictionary per locale, the
   language switch, and the missing-string build error. Hand-rolled. Done.
3. **Home page** - hero, the three services, her story, FAQ and the booking CTA.
   Done, but shipped without its hero photograph or gallery teaser; see 14.
4. **Gallery** - the full set of work, filterable by service. Done.
5. **Service pages** - nails, lashes and makeup, one page each, with treatments,
   prices and durations. Built, but every one renders the empty-price state.
6. **About** - **being absorbed into the home page by 14.** 6a (the page) shipped;
   6b (her story) is unbuilt and now lands in 14.
7. **Contact and booking** - the form with the "how did you find me" field,
   validation, Resend delivery, and a thank-you page. Done.
8. **Deploy** - Vercel, env vars, a verified production build. Done at item 1;
   the domain and indexing work once filed here moved to 15.
9. **Site-wide SEO pass** - sitemap and robots across both locales,
   `LocalBusiness` data, and a per-page metadata audit. Done.
10. **Gallery lightbox** - tap a photo to open it large, with next, previous, a
    thumbnail strip, keyboard and swipe. Done.
14. **Home page rebuild** - the hero photograph and gallery teaser item 3
    deferred to item 4 and nobody returned for, plus process and an expanded
    FAQ. Absorbs About, which is then deleted. **Next, and unblocked.**
15. **Domain, indexing and production email** - buy the domain, set the site URL
    so robots stops disallowing everything, and give Resend a sender that can
    mail anyone. **Blocked until the domain exists, and it gates launch.**

Post-MVP, not scheduled: **11 Reviews on site**, **12 Real booking**,
**13 Second client from this template**.

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

> **Currently empty for all three services**, deliberately. Market research on
> 2026-09-21 produced a proposed list, but a price is a promise to a customer
> and hers are hers to set. Every service page renders its empty state.

### GalleryImage

- `key` - keyed against the dictionary, so a photo with no alt text is a compile
  error
- `imagekitPath` (string), `serviceId`, `order`
- `width`, `height` (number) - the real cropped pixels, which reserve each tile
  before the bytes arrive

> **Nine records, all `nails`.** No lash photographs exist and two makeup frames
> are held back because the model's face is recognisable and nobody has asked
> her. This is why the filter row hides a chip for a service with no photos.

### Portrait

- `imagekitPath`, `width`, `height`, or **`null`**, which is the current value

> A portrait is not work, so it is its own file rather than a gallery row -
> otherwise it would appear in the filtered grid and in `ImageGallery`
> structured data as something a client can book. The About page is already
> wired to render one.

### FaqItem

- `key`, `order`, `serviceId` (`ServiceId | null`) - null means site-wide.
  Reused for FAQ structured data.

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

Routes, each also at `/es`:

- `/` - home: hero, three services, her story, FAQ, booking band
- `/nails`, `/lashes`, `/makeup` - one page per service
- `/gallery` - the full set, filterable, with the lightbox
- `/about` - **to be deleted by item 14**, its content moving to `/`
- `/contact` - the form and the direct booking route
- `/thank-you` - so a submitted form is unambiguous

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

1. **The site is code-complete and content-empty, and the plan does not track
   that.** All three services render "Prices are being set", lashes and makeup
   have zero photographs, and the home page has none. The build plan has no item
   for acquiring content, so it will keep reporting near-complete. Six things
   are needed from Dani: prices, lash photos, makeup permission, her story, her
   Instagram handle, and her corrections to the Spanish chrome copy.
2. **Item 5 was checked off against a bar the plan forbids.** Section 3 says
   "Nothing ships with placeholder text", and the service pages shipped with
   the price placeholder. Either uncheck item 5 or record that the rule was
   relaxed; right now the plan contradicts itself.
3. **Item 6 still reads as an About page** while item 14 deletes that page. 6a
   is archived as shipped, so deleting the route is partly a reversal of
   completed work. Worth rewording item 6 to name where its content now lives.
4. **Section 8 says env vars are "Already in `.env.example`". There is no
   committed `.env.example`.** It also names `IMAGEKIT_PRIVATE_KEY` while the
   real variable is `IMAGE_KIT_PRIVATE_KEY`, and omits `RESEND_FROM` and
   `NEXT_PUBLIC_SITE_URL` entirely.
5. **A store is being considered, and section 1 explicitly rules one out**
   ("What it is not: a booking engine, a shop..."). Parked for now, to be
   planned from the backend. If it proceeds, section 1 must change.
6. **A dedicated `/book` page is being considered**, on the Face and Body
   pattern: one page, service passed in the query string, an inline
   provider iframe, `noindex`. Not yet a build-plan item.
7. **Her Instagram handle is not recorded anywhere.** The plan calls the bio
   link the site's main entry point. `siteConfig.social.instagram` is `null`, so
   nothing false ships. Needs Dani, not code.
8. **The light theme has no owner.** Section 7 specifies it and `.light` is
   ported and complete, but nothing activates it. Unreachable until decided.
   Costs nothing to leave.
9. **Spanish slugs are mirrored English** (`/es/nails`, not `/es/unas`). One
   helper owns the prefix, so deciding is a one-file change.
10. **The Spanish chrome copy is a draft** written during item 2, not by Dani.
    Marked as such in `dictionaries/es.ts`. Hers to correct before launch.
11. **Three `[confirm]` assumptions remain:** no logo exists (cost: a palette
    swap), service-area business with no public street address (one schema
    field), Instagram DM primary with the form for everyone else (one
    component). The location one is worth thinking about rather than
    defaulting - a seventeen-year-old working from home should probably not
    publish a street address.
