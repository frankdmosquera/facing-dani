# Project Plan

> **Decided, and why.** This project is the first build of a reusable template
> for beauty businesses, it ships bilingual from day one, and SEO is written into
> each page rather than bolted on at the end. Those three shape everything below.
> Anything still tagged `[confirm]` is a working assumption, not a decision, and
> each one is listed at the bottom with the single place it lives.

## 1. Problem - What problem are we solving?

A new nail, lash and makeup artist in Calgary has no presence beyond an
Instagram feed. Instagram is where her clients already are, and it is good at
showing work, but it is bad at everything that turns a browser into a booking:
it cannot hold a price list, it buries the answer to "what do you actually do",
it cannot be found on Google, and a grid of squares is a poor gallery when
someone wants to inspect one set closely.

The site is what her bio link points at. Its job is narrow and should stay
narrow:

1. Make her look like a real business rather than a hobby.
2. Show the work at a size where the quality is visible.
3. Answer what, how much, and how long, without a DM.
4. Take the booking, or hand it cleanly to wherever bookings live.

**What she is actually selling is craft, not price.** She trained in Colombia,
where the standard for nail work is higher than most people here expect. Shape,
structure and cuticle work are what decide whether a set still looks good in
week three, and that is what she was drilled on. This is the strongest card
because it is true, it is hard for a competitor to copy, and it survives a price
rise. The site leads with it everywhere: the About page is the long version, the
home page is the short version, and the gallery is the proof.

Price is deliberately not the angle. It is the one advantage that disappears the
moment she raises her rates, and a site built around being cheap is hard to
rebuild around being good.

**What it is not:** a booking engine, a shop, a blog, or a client account
system. Those are how a project like this quietly becomes a six-month build.

**She is fully bilingual, and that is a service rather than a setting.** A
translated site tells a visitor she can read it. A fluent artist tells her she
can have the whole appointment in Spanish: the consultation, the questions about
aftercare, the part where she changes her mind about the shape halfway through.
That is the thing worth saying out loud on the site, and it belongs on the home
page and the about page as a claim, not left implied by the existence of a `/es`
URL.

It is also not copyable. A competitor can run a page through a translator in an
afternoon. They cannot become bilingual.

### The second problem, which is the agency's

Almost no beauty business in Calgary has a bilingual site, because the agencies
building those sites do not speak Spanish. That is a gap, and this project is
the first build against it. See section 6.

## 2. Users - Who is this for?

**The client, roughly 15 to 25.** She arrives from an Instagram bio link, on a
phone, often at night, often deciding between two or three artists she already
follows. She is not reading, she is scrolling and judging. She wants to see the
work, find out whether nails or lashes are in her budget, and book without
composing a message.

This single fact sets nearly every decision in section 7. Mobile is not a
consideration, it is the product. Desktop exists and must not be broken, but it
is the afterthought.

**Her mother, paying for a grad set.** Arrives from Google or from her daughter.
Needs the business to look legitimate and safe in about four seconds: prices
visible, location clear, a human name, no dead links. She is the reason the
contact form exists, because she is not going to DM a teenager on Instagram.

**The Spanish-speaking client.** Searches in Spanish, finds nothing local, and
settles for an English site or a salon she found by word of mouth. She is
underserved by every competitor in this market, and she is why the site is
bilingual rather than translated later.

**The artist herself.** Needs one link that answers everything, so her DMs stop
being a price list.

## 3. Features - What does the MVP need?

- Home, framing the three services and pushing to the gallery and to booking
- One page per service: nails, lashes, makeup, each with pricing and duration
- A gallery large enough to judge the work, filterable by service
- An about page carrying her training and the trust the business has not earned yet
- A contact page with a form that reaches her, plus the direct booking route
- A thank-you page, so a submitted form is unambiguous
- **Every one of the above in English and Spanish**, at `/` and `/es`
- Per-page metadata, JSON-LD and hreflang, written with each page rather than after
- Sitemap and robots covering both languages

Three rules that decide what is in and what is out:

- **Both languages, per page.** A page is not done until it exists in both. A
  half-translated site reads worse than an English one, and retrofitting a second
  language means reopening every page, which is the mistake this plan already
  made once with SEO.
- **SEO ships with the page it describes.** The coding standards say SEO is the
  product and not a finishing pass, so metadata and structured data land in the
  same commit as the page. What remains at the end is the sitemap, robots and a
  cross-page audit, which genuinely need all pages to exist.
- **Nothing ships with placeholder text.** Every visitor-facing string is real
  before a page is called done. English is drafted from the mockups and the plan,
  then corrected. Spanish is written by Dani, who is a native speaker, which is
  the reason bilingual is realistic here and would not be on most projects.

Explicitly out of scope for the MVP: online payment, deposits, real-time
availability, client accounts, reviews written on the site, and a blog.

## 4. Data - What are we storing?

**Nothing in a database, and that is a decision rather than a gap.** Every piece
of content is a typed file in the repo, so it is version controlled, reviewable
in a diff, and impossible to lose.

- `siteConfig` - business name (**Dani Moreno**, Calgary, Alberta), contact
  details, hours, service area, socials
- Service data - the three services, their treatments, prices and durations
- Gallery data - image records with service tag, alt text and ordering
- FAQ data - questions and answers, reused for FAQ structured data
- Copy dictionaries - one per locale, `en` and `es`

**What is keyed by locale and what is not.** Getting this wrong means either a
duplicated price list that drifts, or an English word on a Spanish page.

| Locale-keyed | Shared across both |
|---|---|
| Service name and description | Price |
| Treatment labels | Duration |
| Image alt text | ImageKit path and service tag |
| FAQ question and answer | Ordering |
| Page metadata and JSON-LD text | Phone, email, hours, coordinates |

A price is a number and belongs in one place. A treatment label is prose and
belongs in two. Storing a price twice guarantees that one day they disagree, and
the visitor will believe whichever one is wrong.

A missing Spanish string is a build error, not a silent fallback to English.
Falling back quietly is how a site ends up half-translated without anyone
noticing.

**Because this is a template, the split matters more than usual.** Nothing that
identifies this particular business may live in a component. A component reads
`siteConfig.business.name`; it never contains the word Dani. The test is whether
a second beauty business could be stood up by editing `data/` and `theme.css`
and touching nothing else. If the answer is no, that is a bug and not a
preference.

The only thing that leaves the machine is a contact form submission, sent as
email and not retained. No accounts, no analytics, no cookie banner.

Images are records, not files. The repo stores an ImageKit path, alt text and a
service tag, never the photograph.

## 5. Tech - What stack are we using?

Next.js 16 with React 19, App Router, no separate backend. Static or server
rendered, deployed as one unit. Chosen because this is a marketing site where
page speed and SEO matter more than live data, and because a site with no
database has nothing to run a backend for.

- **UI** shadcn with Base UI primitives, lucide icons, Tailwind v4 with the theme
  as CSS variables in `globals.css` `@theme`, ported from `prototypes/theme.css`
- **Forms** react-hook-form with zod, validated on both sides. Not shadcn's
  `Form` wrapper, for the reason recorded in the coding standards
- **Email** Resend, called from a Server Action so the key stays server side
- **Images** ImageKit, doing real work here given a photo-led gallery
- **i18n** hand-rolled: a `[locale]` route segment and a dictionary per locale.
  No package. `next-intl` is more machinery than two languages and eight pages
  need, and the no-install rule applies
- **No database, no auth, no object storage, no motion library.** All four were
  offered by the scaffolder and declined. Animation is CSS

## 6. Monetize - How will this make money?

The site does not make money. It is a sales asset for a service business, and
the money is made in a chair. Success is bookings that can be traced to the site,
not traffic.

**How that gets measured, concretely:** a "how did you find me" field on the
contact form, plus Search Console. No analytics script, no cookie banner, no
privacy policy needed to start. That is a deliberate choice and it matches the
coding standards, which say analytics is a per-project decision and never a
default. It also makes the contact form load-bearing: it is both the booking
route for anyone who will not DM, and the only attribution the site has.

### The real return is the template

This build is the first of a reusable template for beauty businesses: nail
studios, lash techs, brow and makeup artists. Calgary has many, most are
Latin-owned, and almost none have a bilingual site. That is the gap.

What being a template actually requires, in one line each:

- Every business fact in `data/`, never in a component
- The whole look in `theme.css`, so client two is a palette swap and not a rebuild
- Both languages structural, not bolted on, so it is a default rather than an upsell
- Services as data, because the next client may do brows and not lashes

None of that is extra features. It is discipline applied while building anyway,
and it is worth far more on client two than it costs on client one.

Whether Dani's own build is billed is a separate conversation and not a product
decision.

## 7. UI/UX - How should this look and feel?

**After Party. Vibrant and active, never spa-calm.** A massage studio sells calm.
Nails sell energy, so the site is loud, dark and confident rather than soft and
muted. Decided by looking at rendered options, not adjectives. The sketches are
in `blueprint/reference/`:

- `direction-after-party.html` - the direction itself, three phone screens
- `ground-check.html` - the four grounds that were compared, and why this one won
- `light-and-dark.html` - the light twin, and the rules that keep them one brand
- `design-directions.html` - the three it beat, kept so the reasoning survives

**Ground: `#261F36`.** A plum, not a black. It was picked deliberately over the
darker options, which had more neon punch but read as severe. Plum lands warmer
and friendlier, which suits the clientele.

**Palette.** Four accents, and each one has a job. They are never decoration:

| Token | Fill | Text | Means |
|---|---|---|---|
| nails | `#FF3D8F` | `#D4176B` | nail services |
| lashes | `#A97BFF` | `#7B45E0` | lash services |
| makeup | `#FF8A3D` | `#BF5710` | makeup services |
| confirm | `#3DE8B0` | `#0E8F63` | success and confirmation |

Cards `#332747`, text `#F6F2FA`, muted `#B3A8C2`.

**Every accent needs a darker twin.** The fills fail contrast under 18px, so
small text and prices use the text column above, never the fill. This is the one
thing worth copying from face-and-body, which hit the same wall.

**Colour is navigation, not decoration.** Pink is always nails, violet is always
lashes, orange is always makeup, on every page. A returning client stops reading
menus and navigates by colour. The moment these four become ornament the whole
thing turns into a circus.

**Type: Unbounded 800 for headlines, Inter for everything else.** Anton was too
hard and read as a gym poster, Fredoka was too soft and read as a cereal box.
Unbounded is geometric and wide, confident at size, round enough to stay
friendly.

**Light and dark.** Dark is the brand. A light twin exists at `#FAF6FC` and the
translation rule is that glow becomes tint: blurred colour blobs on dark become
the same blobs unblurred and pale on light, dark cards become white cards tinted
per service. The gradient CTA and the gradient ticker are identical in both
modes, which is what keeps it feeling like one brand.

Whether visitors get a toggle is still open. Leaning no: brands do not flip, her
clients will not look for a sun icon, and a toggle means checking every section
and every photo treatment twice forever.

**Mobile is not a consideration, it is the product.** Her clients will meet this
site as a link in an Instagram bio, on a phone, at night. Every mockup was drawn
at phone width for that reason. Desktop is the afterthought.

**Photography carries it, and the ground makes demands.** Her work is the
brightest thing on every screen, which is the whole point of a dark ground. It
also means her photos need dark-friendly backgrounds, and that is worth telling
her before she shoots a hundred sets against a white desk. Photo panels stay
nearer `#1B1426` even though the page is `#261F36`, so images keep their punch
without darkening the whole site.

**Motion in CSS only.** Glows, gradients and the ticker cost nothing and need no
library. `motion` is not installed and is not being added.

The direction is locked. Minor tuning happens in `/prototype`, which is where
this becomes `prototypes/theme.css` and then ports into `globals.css` `@theme` at
the first UI feature.

## 8. Deployment - Where and how will this ship?

**Vercel.** A Next.js marketing site with no backend, no database and no workers
is the case Vercel is built for, and the free tier covers this traffic.

- **App type** Next.js 16 App Router, standard build output
- **Build** `npm run build`
- **Start** handled by the platform, no custom start command
- **Env vars by name** `NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT`, `IMAGEKIT_PRIVATE_KEY`,
  `RESEND_API_KEY`. Already in `.env.example`
- **Database or storage** none
- **Workers or cron** none
- **Health check** not applicable

**Deploy early, then keep deploying.** A preview URL from the first item, so Dani
watches it grow on her phone and corrections arrive while they are cheap. The
alternative is she sees it for the first time when it is finished and expensive
to change.

**Domain** `[confirm]` not registered yet. Follows the business name, so `danimoreno.ca` or a studio name. Buy the
`.ca` and the `.com` together; a Calgary business wants the `.ca` and a
competitor wanting the `.com` later is a headache.

**Locale routing** English at the root, Spanish at `/es`. Not a subdomain and not
a separate domain, because both split the ranking signal and this site has none
to spare. Every page carries `hreflang` for both plus `x-default`, or Google
treats them as duplicates and picks one for you.

**Before launch, and not as a feature:** a Google Business Profile matters more
than anything on this site for the first year, and building it out is part of
the engagement rather than an afterthought. The site supports the profile with
consistent name, address and phone, and with LocalBusiness structured data. It
does not replace it. Set up Search Console for both locales at launch.

The name, address and phone on the site and on the profile must match character
for character, including how the business name is written. Google treats a
mismatch as two businesses, and two half-signals rank worse than one whole one.
That is the reason section 4 insists every business fact comes from
`siteConfig`: one file, one source, no drift.

### What this site has to rank for

The target is **nails and makeup in Calgary**, plus lashes. That is the bar, and
it decides the page structure rather than following from it.

- **One page per service, not one services page.** A single page listing three
  services competes with itself and ranks for none of them. Separate pages for
  nails, lashes and makeup are the only way each one can be the best answer to
  its own query. This is why item 5 of the build plan exists in that shape.
- **Each service page owns its terms.** Nails owns gel, acrylic, extensions,
  chrome, nail art. Makeup owns grad, bridal, event, glam. Lashes owns classic,
  hybrid, volume, fills. No page borrows another page's words.
- **Calgary belongs in the title, the H1, the copy and the schema**, on every
  page, without turning into keyword soup that reads badly to a human.
- **Spanish is not an SEO target.** English is what this site is trying to rank.
  The Spanish pages exist so a visitor who reads Spanish more comfortably can
  use the site. `hreflang` is there to stop Google reading the two as duplicates
  and dropping one, which protects the English ranking. No Spanish keyword work.
- **Be honest about the timeline.** A new domain with no links does not win
  "nail salon Calgary" quickly. The site wins the long tail first: service plus
  neighbourhood, and service plus occasion. The Business Profile and
  reviews carry the head terms in the meantime. Anyone promising otherwise is
  selling something.

---

## Open `[confirm]` items

Four assumptions, all cheap to change, none blocking. Each one lives in exactly
one place, which is the point of the template discipline in section 4.

| | Assumed | Where it lives | Cost if wrong |
|---|---|---|---|
| Logo | None exists, palette not sampled from one | `theme.css` | A palette swap |
| Location | Service-area business, no public street address | LocalBusiness schema | One field |
| Booking | Instagram DM primary, form to Resend as the route for everyone else | One component | One page |
| Domain | Not registered, follows the name | `siteConfig` and Vercel | A DNS change |

The location assumption is the one to actually think about rather than default.
A seventeen-year-old working from home should probably not publish a street
address, and a service-area listing is the normal answer to that.

---

## What changed, and when

- **2026-09-20** Direction locked as After Party, section 7 written from rendered
  options rather than adjectives.
- **2026-09-20** Four decisions taken: this is the first build of a beauty
  template, craft and training is the angle rather than price, the site ships
  bilingual in the MVP, and attribution is a form field plus Search Console
  rather than an analytics script.
- **2026-09-20** SEO moved from a single item at the end into each page, because
  the coding standards say it is the product and not a finishing pass, and the
  plan contradicted them.
