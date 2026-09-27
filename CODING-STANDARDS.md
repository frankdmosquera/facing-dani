# Coding Standards

Next.js 16, TypeScript, Tailwind v4, shadcn. No database, no auth, no separate
backend.

## TypeScript and React

- Strict mode. No `any`: use real types or `unknown`
- Types for props and data models; inference where it is obvious
- Functional components and hooks only, one job per component

## Next.js

Next 16 has breaking changes against older training data. Read the guide in
`node_modules/next/dist/docs/` before writing framework code rather than
recalling it.

- Server components by default. `"use client"` needs a reason you can name in
  one line: state, an effect, an event handler, or a browser API
- When only part of a section is interactive, the client component owns the
  behaviour and takes the static markup as `children`
- Server Actions for form submissions; on this site, only the contact form

### Rendering

- Static by default. Known slugs use `generateStaticParams`
- Dynamic parts stream behind `Suspense` only when actually needed
- A Route Handler only for webhooks, uploads, long-running work or an external
  client

## Files and naming

No `src/`. `@/*` resolves to the project root.

- Components `components/[feature]/ComponentName.tsx`, pages
  `app/[locale]/[route]/page.tsx`, actions `actions/`, helpers `lib/`, content
  `data/`, copy `dictionaries/`
- PascalCase components and types, camelCase functions, SCREAMING_SNAKE_CASE
  constants

## Styling

- Tailwind for all styling, no inline styles. Theme as CSS variables in
  `globals.css`, no `tailwind.config.js`
- Colours are named for their job (`text-nails`), never their value
- Dark is the default. Light mode is the `.light` class on `<html>`, set by the
  header button; `light:` utilities cover the few things that swap outright
- Surfaces that stay dark in every theme (the photo viewer, labels on photos)
  carry `on-dark`
- Animation is CSS. No motion library

### shadcn

Base UI primitives, `components.json` is the source of truth, lucide icons
only.

- Add components with the CLI, never hand-write into `components/ui/`
- Prefer wrapping a primitive in `components/[feature]/` over editing it
- Change a theme variable rather than restyling a primitive at the call site
- **Do not use shadcn's `Form` / `FormField` wrapper.** Use its Input, Label,
  Select and Button and wire react-hook-form directly: shadcn's form layer lags
  react-hook-form's API, and mixing them renders a form that does not work
  (checked 2026-09-09; re-check before assuming it still holds)

## Data and copy

- Every business fact lives in `data/siteConfig.ts`. No component contains the
  word Dani
- A price lives once, in `data/treatments.ts`. Prose lives once per language
- `es.ts` is typed as the `en` shape, so a missing Spanish string is a build
  error. Never add an English fallback
- Images are ImageKit paths, never files in the repo. Her originals carry GPS:
  re-encode every upload without metadata
- Stock photos are decoration only: never in the gallery, a work strip or
  structured data, never captioned as her work
- Zod validates the contact form, the only thing crossing a trust boundary
- Secrets stay server side. Anything a client component can reach is public

## Errors

- try/catch in Server Actions, return `{ success, data, error }`
- The visitor gets a message saying what to do next, never the raw error
- A failed contact form must never look like a success
- Log the real error on the server

## SEO

Every page carries its own metadata, JSON-LD and `hreflang`, in the same change
as the page. Search Console, no analytics script, no cookie banner.

## Comments and writing

- Comment the why, never the what. Keep only traps and non-obvious reasons; no
  build history, banners or narration
- No commented-out code, unused imports or variables
- No em dashes in code, comments, commits or copy. Use a hyphen or rephrase
