# Project Plan

> One of the two planning docs you provide. Use as much detail as the project
> needs, including rationale, constraints, examples, edge cases, and explicit
> exclusions that should guide later feature work. Draft it directly, develop it
> through any AI conversation, or optionally run `/discovery` for a guided deep
> planning session. The content is always yours to direct. When it is filled in,
> run `/overview` to generate the project overview from this plus `build-plan.md`.

> **Placeholders, marked.** Anything tagged `[confirm]` is a working assumption
> made so the build could start, not a decision. Each one is safe to be wrong:
> the name lives in one config file, the address is a schema field, the booking
> route is one component. None of them block design or layout.

## 1. Problem - What problem are we solving?

A new nail, lash and makeup artist in Calgary has no presence beyond an
Instagram feed. Instagram is where her clients already are, and it is fine at
showing work, but it is bad at everything that turns a browser into a booking:
it cannot hold a price list, it buries the answer to "what do you actually do",
it cannot be found on Google, and a grid of squares is a poor gallery when the
client wants to inspect one set closely.

The site is the thing her bio link points at. Its job is narrow and it should
stay narrow:

1. Make her look like a real business rather than a hobby.
2. Show the work at a size where the quality is visible.
3. Answer what, how much, and how long, without a DM.
4. Take the booking, or hand it cleanly to wherever bookings live.

What it is not: a booking engine, a shop, a blog, or a client account system.
Those are how this kind of project quietly becomes a six-month build.

## 2. Users - Who is this for?

**The client, roughly 15 to 25.** She arrives from an Instagram bio link, on a
phone, often at night, often deciding between two or three artists she is
already following. She is not reading, she is scrolling and judging. She wants
to see the work, find out whether nails or lashes are in her budget, and book
without composing a message.

This single fact sets nearly every decision in section 7. Mobile is not a
consideration, it is the product. Desktop exists and must not be broken, but it
is the afterthought.

**Her mother, paying for a grad set.** Arrives from Google or from her daughter.
Needs the business to look legitimate, safe and real in about four seconds:
prices visible, location clear, a human face and name, no dead links.

**The artist herself.** Needs to send one link that answers everything, so her
DMs stop being a price list.

## 3. Features - What does the MVP need?

- Home, framing the three services and pushing to the gallery and to booking
- One page per service: nails, lashes, makeup, each with pricing and duration
- A gallery large enough to judge the work, filterable by service
- An about page carrying her training and the trust the business does not have yet
- A contact page with a form that reaches her, plus the direct booking route
- Local SEO basics: per-page metadata, sitemap, robots, LocalBusiness structured data
- A thank-you page, so a submitted form is unambiguous and trackable

Explicitly out of scope for the MVP: online payment, deposits, real-time
availability, client accounts, reviews written on the site, a blog, and
multi-language. Spanish is a genuine opportunity in this market, noted here as a
later option rather than a v1 feature.

## 4. Data - What are we storing?

**Nothing in a database, because there is no database.** That is a deliberate
choice, not a gap. Every piece of content is a typed file in the repo, which
means it is version controlled, reviewable in a diff, and impossible to lose.

- `siteConfig` - business name, contact details, hours, service area, socials
- Service data - the three services, their treatments, prices and durations
- Gallery data - image records with service tag, alt text and ordering
- FAQ data - questions and answers, reused for FAQ structured data

The only thing that leaves the machine is a contact form submission, which is
sent as email and not retained by the site. No accounts, no cookies beyond what
the framework needs, no analytics until asked for by name.

Images are served through ImageKit, so the repo holds records and not a hundred
megabytes of photographs.

## 5. Tech - What stack are we using?

Next.js 16 with React 19, App Router, no separate backend. Static or server
rendered, deployed as one unit. Chosen because this is a marketing site where
page speed and SEO matter more than live data, and because a site with no
database has nothing to run a backend for.

- **UI** shadcn with Base UI primitives, lucide icons, Tailwind v4 with the
  theme expressed as CSS variables in `globals.css` `@theme`
- **Forms** react-hook-form with zod, validated on both sides
- **Email** Resend, for the contact form only
- **Images** ImageKit, which is doing real work here given a photo-led gallery
- **No database, no auth, no object storage, no motion library.** All four were
  offered by the scaffolder and declined. Animation is CSS.

## 6. Monetize - How will this make money?

The site does not make money. It is a sales asset for a service business, and
the money is made in a chair.

That means success is measured in bookings that can be traced to the site, not
in traffic. It also sets the ceiling on what belongs here: any feature that
cannot plausibly move a visitor toward booking is out, however nice it looks.

For the agency, this is a client site. Whether it becomes a paid or maintained
engagement is a separate conversation and not a product decision.

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

**Domain** `[confirm]` not registered yet. It follows the business name, so it
waits on section 1's `[confirm]`.

**Before launch, and not as a feature:** a Google Business Profile matters more
than anything on this site for the first year. The site supports it with
consistent name, address and phone, and with LocalBusiness structured data. It
does not replace it.

---

## Open `[confirm]` items

Four assumptions, all cheap to change, none blocking:

| | Assumed | Where it lives |
|---|---|---|
| Business name | "Dani" as a working brand | `siteConfig`, one file |
| Logo | None exists, so the palette is not sampled from one | `theme.css`, a palette swap |
| Location | Service-area business, no public street address | LocalBusiness schema field |
| Booking | Instagram DM as primary, contact form to Resend as backup | One component on one page |

The location assumption is the one to actually think about rather than default:
a young artist working from home should probably not publish a street address,
and a service-area listing is the normal answer to that.
