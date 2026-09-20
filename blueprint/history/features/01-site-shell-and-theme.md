# Feature: Site shell and theme

**From build-plan:** feature 1

**Branch:** `feature/site-shell-and-theme`

**Status:** verified - all four steps built, `npm run lint` and `npm run build`
both exit 0. Live visual and interaction checks still need a running server;
see **What the build changed** below.

## What the build changed

Five departures from the spec as written. None add scope; each is recorded
because a later item reads these files.

1. **The brand ink tokens are `--ink` / `--ink-muted` / `--ink-faint`, not
   `--text` / `--muted` / `--faint`.** The spec listed `--muted` on both sides
   of the port: `prototypes/theme.css` uses it for a *text* colour and shadcn
   uses it for a *surface*. One name, two meanings, and the palette quietly
   stops being one palette. Renamed the brand ink; shadcn's `--muted` keeps
   shadcn's meaning. Utilities are `text-ink`, `text-ink-muted`, `text-ink-faint`.
2. **`siteConfig` gained `meta` and `marquee`.** Step 2's done-when requires a
   real title and description from config, and the ticker words include the city,
   which a component may not contain. Both follow the same rule as every other
   field.
3. **`data/siteConfig.ts` was created in step 2, not step 3.** Step 2's metadata
   reads from it, so it had to exist first. Step 3 used it as planned.
4. **`social.instagram` is `null` and the footer renders the link
   conditionally.** The handle is not recorded anywhere in the plans. Inventing
   one would ship a dead link on the site's main entry point, and an empty
   `href` is worse than an absent row. See Open questions - this is the one
   business fact still missing.
5. **The mobile panel is a full-screen overlay, and it closes on link click
   rather than by watching the pathname.** The mockup draws a burger and no
   panel, so the pattern was chosen here: a full-screen dialog needs no header
   measurement and suits a phone. The first attempt closed the panel from an
   effect keyed on `usePathname`, which `react-hooks/set-state-in-effect`
   correctly flagged; the link's own `onClick` does the same job directly.

## Goal

Port the locked After Party theme from `prototypes/theme.css` into
`app/globals.css` `@theme`, then build the header, mobile nav and footer against
it. Everything after this item inherits both, which is why it goes first: a shell
built after the pages means reopening every page.

At the end of this item the app is one dark, branded, phone-first frame with
working navigation chrome and no page content. Item 3 fills the home page.

## Design reference

- `prototypes/theme.css` - the token source. The `:root` block is what ports.
- `prototypes/home.html` - the shell markup and CSS, lines 73-108 (ticker,
  `header.site`, `.navrow`, `.logo`, `.nav`, `.navcta`, `.burger`) and the
  `<footer class="site">` block.
- `blueprint/reference/direction-after-party.html` - the direction at phone width.
- `blueprint/reference/light-and-dark.html` - the light twin and the glow-becomes-tint rule.

## In scope

- The theme port: brand tokens into `:root`, the `.light` twin, and the shadcn
  semantic tokens remapped onto brand values so `components/ui/button.tsx` keeps
  resolving.
- Fonts: Unbounded 800 for headings, Inter for body, via `next/font/google`,
  replacing Geist.
- `data/siteConfig.ts` - only the fields the shell renders.
- `components/shell/SiteHeader.tsx` - sticky, blurred, wordmark + nav + CTA + burger.
- `components/shell/MobileNav.tsx` - the one client component. The burger in the
  mockup opens nothing; this item builds the panel it implies.
- `components/shell/SiteFooter.tsx` - three columns plus the legal row.
- `components/shell/Ticker.tsx` - the gradient marquee above the header.
- A skip link, because the header is sticky and the ticker sits above it.
- Replacing the create-next-app demo `app/page.tsx` with a minimal placeholder
  that proves the shell renders, and removing the default assets it stops using.

## Out of scope

- **Locale routing, the `[locale]` segment, dictionaries and the language
  switch.** Item 2. This item hardcodes English labels behind stable keys so
  item 2 swaps one file, not every component.
- **Any page content** - hero, services, gallery, story, FAQ. Items 3-7.
- **Per-page metadata and JSON-LD.** Each page carries its own from item 3 on;
  this item sets only the root `<html lang>`, title template and font wiring.
- **A theme toggle.** See Open questions - the `.light` tokens are ported but
  nothing activates them.
- **Anything a nav link points at.** Clicking Gallery at the end of this item is
  a 404 until items 3-7 land. Expected, not a defect.
- Site-wide SEO, sitemap, robots. Item 9.

## Build loop

`workflow.stepReview` is `feature`: build all four steps, then stop for one
review of the whole item. `workflow.checkpointCommits` is `disabled`, so no
commits during implementation. `/complete` makes the single feature commit.

Verify after every step: `npm run lint` then `npm run build`. Both exist and
`npm run lint` passes clean on the current tree (observed). No test runner is
installed and `/ci` has not been run, so there is no `Verify` script - run the
two commands directly.

## Build steps

- [x] **1. Port the theme into `app/globals.css`**

  Replace the stock neutral palette with the After Party tokens. `:root` carries
  the brand tokens from `prototypes/theme.css` (`--ground`, `--surface`,
  `--surface-2`, `--shot`, `--line`, `--line-soft`, `--text`, `--muted`,
  `--faint`, the four accents, the four `-on-light` twins, `--hot`, `--on-hot`,
  the three glow values, `--radius*`, `--container`, `--section`, `--gutter`).
  Add the `.light` block verbatim. Delete the stock grey `:root` values and the
  whole `.dark` block.

  **Dark is `:root` here, which inverts the shadcn convention.** The brand is
  dark; light is the option. Keep the `@custom-variant dark` line so `dark:`
  utilities in `button.tsx` stay class-scoped rather than silently becoming a
  media query that fires on a visitor's OS setting.

  Remap the shadcn semantic tokens onto brand values in the same `:root`, at
  minimum `--background`, `--foreground`, `--card`, `--card-foreground`,
  `--popover`, `--popover-foreground`, `--muted`, `--muted-foreground`,
  `--border`, `--input`, `--ring`, `--primary`, `--primary-foreground`,
  `--destructive`, `--radius`. Name colours for their job, never their value.

  Done when: `npm run lint && npm run build` pass, and the existing
  `components/ui/button.tsx` renders in all six variants against brand tokens
  with no grey left. Confirm no `oklch(... 0 0)` neutral remains in `globals.css`.

- [x] **2. Fonts and root layout**

  Swap Geist for Unbounded (weight 800, headings) and Inter (body) via
  `next/font/google`, exposing `--font-display` and `--font-body`. Wire both into
  `@theme` so `font-display` and `font-body` are real utilities.

  Fix the existing self-referential `--font-sans: var(--font-sans)` in
  `@theme inline` - it is never defined, so `font-sans` currently resolves to
  nothing. Point it at the body font.

  Set `<html lang="en">` and a real `metadata` title template and description
  from `siteConfig`. Remove "Create Next App".

  Done when: build passes, headings render in Unbounded 800 and body in Inter
  with no FOUT-swap flash, and no Geist import remains.

- [x] **3. `data/siteConfig.ts`, header, mobile nav and skip link**

  Create `data/siteConfig.ts` first - see Data / contracts. No component may
  contain the word Dani; the wordmark, the nav and the CTA all read from it.

  `SiteHeader` is a server component: sticky, `color-mix` ground at 88% with
  `backdrop-filter: blur(12px)`, bottom hairline on `--line-soft`. Wordmark left
  (accent dot in `--nails`), nav and CTA from `>= 900px`, burger below.

  `MobileNav` is the only `"use client"` file in this item, and the reason is
  open/closed state. It owns the toggle and nothing else; the nav items come in
  as props. It must handle: `aria-expanded` and `aria-controls` on the burger,
  Escape to close, focus moved into the panel on open and returned to the burger
  on close, focus kept inside the panel while open, `body` scroll locked while
  open, and closing on link activation.

  Add a skip link as the first focusable element, targeting `#main`.

  Done when: build passes; at 375px the burger opens a panel listing every nav
  item and the CTA, Escape closes it and focus returns to the burger, Tab does
  not reach the page behind it, and the page does not scroll behind the panel; at
  1280px the burger is gone and the inline nav and CTA show; the skip link
  appears on first Tab and jumps to `#main`.

- [x] **4. Ticker, footer, and a placeholder page**

  `Ticker` - the gradient marquee above the header,
  `linear-gradient(90deg, nails, lashes, makeup)` with `--on-hot` text,
  `aria-hidden="true"`. The mockup is static; the plan names the ticker as
  motion, so animate it in CSS with `@keyframes` and no library, and stop the
  animation entirely under `@media (prefers-reduced-motion: reduce)`.

  `SiteFooter` - three columns (blurb, services, get in touch) plus the legal
  row, all strings from `siteConfig`.

  Replace `app/page.tsx` with a minimal placeholder carrying `id="main"` and one
  heading, enough to prove the shell frames a page. Delete the create-next-app
  assets it no longer uses (`public/next.svg`, `vercel.svg`, `file.svg`,
  `globe.svg`, `window.svg`); keep `app/favicon.ico`.

  Done when: build passes; the full frame renders at 375px and 1280px with the
  ticker scrolling, the footer showing real `siteConfig` strings and no
  placeholder or lorem text; with reduced motion on, the ticker is stationary and
  legible; no `next/image` import of a deleted asset remains.

## Files / areas

| Path | Change |
|---|---|
| `app/globals.css` | Rewrite the token blocks; keep `@import`s and `@layer base` |
| `app/layout.tsx` | Fonts, metadata, `lang`, mount Ticker / Header / Footer, `#main` |
| `app/page.tsx` | Replace the demo with a placeholder |
| `data/siteConfig.ts` | New |
| `components/shell/SiteHeader.tsx` | New, server |
| `components/shell/MobileNav.tsx` | New, `"use client"` |
| `components/shell/SiteFooter.tsx` | New, server |
| `components/shell/Ticker.tsx` | New, server |
| `public/*.svg` | Delete the five create-next-app assets |

Do not touch `components/ui/button.tsx`. It is generated; step 1 changes the
tokens it reads instead.

## Data / contracts

`data/siteConfig.ts` is created here and extended by later items. This item adds
only what the shell renders. Every field is shared across locales - nothing here
is locale-keyed, per the lock in `project-overview.md`.

```
siteConfig = {
  business: {
    name: string        // "Dani Moreno" - the legal/NAP name, footer legal row
    wordmark: string    // "dani" - the tight header mark, NOT the same field
    wordmarkAccent: string  // "." - rendered in --nails
    city, region: string    // "Calgary", "Alberta"
    blurb: string           // the footer sentence
  },
  social: { instagram: string },   // href + handle
  nav: Array<{ key: string, label: string, href: string }>,
  cta: { key: string, label: string, href: string },
  footer: { services: NavItem[], contact: NavItem[] },
}
```

Three contracts later items inherit:

1. **`name` and `wordmark` are separate fields.** The header mark is "dani", the
   NAP name is "Dani Moreno", and Google treats a mismatch in the NAP name as a
   different business. Deriving one from the other loses that.
2. **Every nav item carries a stable `key` alongside its `label`.** Item 2
   replaces `label` with a dictionary lookup on `key` and makes `href`
   locale-aware. That must be one file's worth of change, not every component's.
3. **No component contains a business fact.** The test from
   `project-overview.md`: a second beauty business stands up by editing `data/`
   and the theme. If a string in `components/shell/` names this business, the
   step is not done.

Provisional English hrefs for this item: `/gallery`, `/nails`, `/lashes`,
`/makeup`, `/about`, `/contact`. See Open questions.

## Testing

No test runner is installed and testing is opt-in, so this item adds none. Run
`/tests` first if unit coverage is wanted before item 2.

Verification is `npm run lint && npm run build` after each step, plus the
observable checks in each `Done when`. Those checks are manual in a browser at
375px and 1280px; no browser-test harness exists, so do not claim automated
visual evidence. `/browser-tests` would add one if that is wanted before the
pages land.

## Notes for the AI

- **Read `node_modules/next/dist/docs/` before writing framework code.** Next 16
  has breaking changes against older training data, and this is the first real
  framework code in the repo.
- Tailwind v4, CSS-first. No `tailwind.config.js`.
- Tailwind for styling, no inline styles. The mockup's raw CSS is the reference,
  not the implementation.
- `"use client"` only on `MobileNav`, and the reason is open/closed state. Static
  markup stays on the server.
- Do not add a package. If it is two seconds of hand-written code, write it.
  Animation is CSS - `motion` is not installed and is not being added.
- Icons from lucide only. The burger is three `<i>` bars in the mockup; either is
  fine, but do not introduce a second icon set.
- shadcn's `Button` is not needed here. The CTA is a gradient pill link, which is
  an `<a href>`, and restyling a primitive at the call site is against standards.
- The four accents are navigation, not decoration: pink is always nails, violet
  lashes, orange makeup. The wordmark dot is `--nails`.
- The accent fills fail contrast under 18px on light surfaces. Nothing in this
  item puts small text on a light surface, but the `-on-light` twins are ported
  so later items have them.

## Open questions

Question 3 is new and arrived during the build. The first two did not block
implementation and are recorded because a later item reopens the file if the
answer changes.

3. **Her Instagram handle is not recorded anywhere.** The plans call Instagram
   DM the primary booking route and the bio link the site's main entry point,
   but no document holds the handle. `siteConfig.social.instagram` is `null` and
   the footer link does not render, so nothing false ships. Needed before
   feature 8 deploys.

1. **The light theme ships as tokens but nothing activates it.** `theme.css`
   carries a complete `.light` block, labelled "Not wired to a toggle in the
   prototype; swap by adding .light to `<body>`", and `project-plan.md` section 7
   says a visitor toggle is "leaning no". This item ports the tokens and wires no
   toggle, so no visitor can reach light mode - it is unreachable CSS, reversible
   at any time, with no user-visible consequence today. If the answer later
   becomes `prefers-color-scheme` or a toggle, it is a change to `globals.css`
   plus one control, not a re-port.
2. **Route slugs are provisional, and the Spanish side is genuinely open.**
   `/overview` flagged that the slugs are undecided, including whether Spanish
   translates (`/es/unas`) or mirrors (`/es/nails`). This item uses the obvious
   English slugs above. They are unreachable, un-deployed and un-indexed until
   item 8, and they live in `siteConfig.nav` rather than in components, so
   changing them is one file. Item 2 owns the locale-aware form.

---

## Implementation walkthrough

What was actually built, by area, and the decisions that were not obvious when
the spec was written.

### `app/globals.css` - the theme port

The spec described this as porting `prototypes/theme.css` into `@theme`. In
practice it was a reconciliation, because the file was still stock
create-next-app: neutral oklch greys, light in `:root`, dark in `.dark`, and a
full shadcn token set that `components/ui/button.tsx` already reads.

Three things had to hold at once, and they pulled against each other:

1. **Dark is the brand**, so the After Party tokens belong in `:root` and the
   light twin in `.light`. That inverts the usual shadcn arrangement.
2. **`button.tsx` must keep resolving.** It reads `--background`, `--border`,
   `--primary`, `--radius-md` and so on. Those names stay; what changed is that
   they now point at brand values (`--background: var(--ground)`,
   `--card: var(--surface)`, `--ring: var(--nails)`).
3. **`@custom-variant dark (&:is(.dark *))` stays.** Deleting it would not
   remove dark-mode behaviour, it would silently convert every `dark:` utility
   in generated components into a `prefers-color-scheme` media query that fires
   on a visitor's OS setting. Keeping it class-scoped means `dark:` simply never
   matches, which is correct: the base styles already are the dark ones.

The collision worth remembering: `prototypes/theme.css` uses `--muted` for a
*text* colour and shadcn uses it for a *surface*. Same name, two meanings, and
the palette stops being one palette. The brand ink was renamed to `--ink`,
`--ink-muted` and `--ink-faint`; shadcn's `--muted` kept shadcn's meaning.

A second, quieter trap: Tailwind `@theme` keys must not share a name with the
`:root` var they read, or the reference is circular. That is why the large brand
radius is `--radius-card` in `:root` and surfaces as `--radius-xl` in `@theme`,
rather than both being `--radius-lg`.

`--destructive` was left at the scaffold's own dark-mode red rather than
invented, because the brand has no red and nothing needed one yet.

### `app/layout.tsx` - fonts and frame

Unbounded 800 and Inter replace Geist, exposed as `--font-unbounded` and
`--font-inter` and read through `--display` / `--body`. Both carry a literal
family fallback (`var(--font-unbounded, "Unbounded")`) so the stack stays valid
if next/font ever fails to load - without it an undefined variable produces a
leading comma and an invalid `font-family`.

This also fixed a latent defect in the scaffold: `@theme inline` declared
`--font-sans: var(--font-sans)`, a self-reference that was never defined
anywhere, so `font-sans` resolved to nothing. It now points at the body font.

The skip link is the first focusable element and targets `#main`, which the
placeholder page provides. With a sticky header and a ticker above it, a
keyboard visitor would otherwise tab through the whole shell on every page.

### `data/siteConfig.ts` - the template contract

Created earlier than the spec scheduled it, because step 2's metadata reads from
it. Three decisions later features inherit:

- **`name` and `wordmark` are separate fields.** The header mark is "dani"; the
  NAP name is "Dani Moreno". Deriving one from the other would either put a long
  legal name in a tight header or send a shortened name to the Google Business
  Profile, and Google reads a NAP mismatch as two businesses.
- **Every nav item carries a stable `key` beside its `label`.** Feature 2
  replaces `label` with a dictionary lookup keyed on `key`. That has to be one
  file's worth of change, not every shell component reopened.
- **`social.instagram` is `null`.** The handle is not recorded in any plan
  document. Rather than invent one, the footer renders the Instagram link only
  when it is set, so an unknown handle cannot ship as a dead link on the site's
  main entry point.

### `components/shell/` - the chrome

`SiteHeader`, `SiteFooter`, `Ticker` and `Wordmark` are server components.
`MobileNav` is the only `"use client"` file, and the reason is open/closed
state.

The mockup draws a burger and nothing behind it, so the panel's behaviour was
defined here rather than ported. It is a full-screen dialog: that needs no
header-height measurement, survives the header being sticky, and suits a phone.
It handles `aria-expanded` / `aria-controls`, `role="dialog"` with
`aria-modal`, Escape to close, focus moved to the first link on open and
returned to the burger on close, Tab cycling inside the panel, and `body`
scroll locked while open.

The first version closed the panel from a `useEffect` keyed on `usePathname`.
`react-hooks/set-state-in-effect` flagged it, correctly - the link's own
`onClick` does the same job without an effect, and back/forward is not a path
the panel can be open on.

The ticker holds its words twice and slides exactly `-50%`, which is what makes
the loop seamless instead of snapping. It is `aria-hidden` because every word in
it is said properly elsewhere, and it stops dead under
`prefers-reduced-motion: reduce`.

`Wordmark` carries an `sr-only` suffix naming the business and the destination,
because "dani." alone is not a useful link name.

### `app/page.tsx` and `public/`

The create-next-app demo was replaced with a placeholder carrying `id="main"`.
Feature 3 builds the real home page inside the frame. The five default SVGs went
with it, since nothing referenced them any more and the standards say only icons
and the favicon belong in `public/`.

### What was verified, and what was not

`npm run lint` and `npm run build` both exit 0. Confirmed from the build output
rather than assumed: the real `<title>`, `<html lang="en">` carrying both font
variable classes, Unbounded and Inter `@font-face` emitted with fallbacks,
`.animate-ticker{animation:34s linear infinite ticker}` and `@keyframes ticker`
present, `--ground:#261f36` and `--ink:#f6f2fa` with the `.light` overrides
beside them, zero stock `oklch(... 0 0)` neutrals remaining, the skip link in the
markup, and the Instagram link correctly absent.

Not verified at completion time, because no server was running: the frame at
375px and 1280px, the burger and panel interaction, the ticker actually
scrolling, and reduced motion stopping it. Those need `npm run dev`.
