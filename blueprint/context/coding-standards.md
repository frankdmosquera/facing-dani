# Coding Standards

> Your conventions, tuned to this project. The stack here is Next.js 16 +
> TypeScript + Tailwind v4 + shadcn, with no database, no auth and no separate
> backend. Rules for things this project does not have were removed rather than
> left in, because a standard that describes an absent tool teaches you to skim
> the file.
>
> Run `/onboard` after installing the Blueprint. It tunes this file to the real
> project stack, along with `AGENTS.md`, `CLAUDE.md` when present,
> `ai-interaction.md`, `.gitignore`, and README placement. Review the result
> before `/overview`.

## TypeScript

- Strict mode enabled
- No `any` types - use proper typing or `unknown`
- Define interfaces for all props, API responses, and data models
- Use type inference where obvious, explicit types where helpful

## React

- Functional components only (no class components)
- Use hooks for state and side effects
- Keep components focused - one job per component
- Extract reusable logic into custom hooks

## Next.js

Next 16 has breaking changes against older training data. Read the guide in
`node_modules/next/dist/docs/` before writing framework code rather than
recalling it.

- Server components by default. `"use client"` needs a reason you can name in one
  line: state, an effect, an event handler, or a browser API.
- Server Actions for form submissions. On this site that is the contact form and
  nothing else.
- Dynamic routes for the service and gallery pages, with `generateStaticParams`
  so each slug is still a static page.

How a given page is rendered is decided under **Rendering** below. It is not
repeated here, because a rule in two places is a rule that goes stale in one.

## File Organization

No `src/` directory. The scaffolder passes `--no-src-dir`, so everything sits at
the project root. In a monorepo these paths are relative to `frontend/`.

- Components: `components/[feature]/ComponentName.tsx`
- Pages: `app/[route]/page.tsx`
- Server Actions: `actions/[feature].ts`
- Types: `types/[feature].ts`
- Lib/Utils: `lib/[utility].ts`
- Import alias: `@/*` resolves to the project root, so `@/lib/utils`, not
  `@/src/lib/utils`

Shared types in a monorepo live in `packages/shared`, imported from both sides
rather than redeclared.

## Naming

- Components: PascalCase (`ItemCard.tsx`)
- Files: Match component name or kebab-case
- Functions: camelCase
- Constants: SCREAMING_SNAKE_CASE
- Types/Interfaces: PascalCase (no prefix)

## Styling

- Tailwind CSS for all styling. No inline styles.
- Tailwind v4: CSS-first config (`@theme` in `globals.css`), no `tailwind.config.js`
- Dark mode first, light mode as option. `globals.css` declares
  `@custom-variant dark (&:is(.dark *))`, so dark is a class on an ancestor and
  not a media query. Whether visitors get a toggle is a product decision, not a
  styling one.

### shadcn

This project uses the `shadcn` package with Base UI primitives, not the older
copy-in Radix distribution. `components.json` is the source of truth: style
`base-nova`, `cssVariables: true`, lucide icons, `ui` alias `@/components/ui`.

- Add components with the CLI. Never hand-write a file into `components/ui/`,
  because the next CLI run will not know about it.
- `components/ui/` is generated code. Editing it is allowed but the edit becomes
  yours to maintain forever, so prefer wrapping a component in
  `components/[feature]/` over changing the primitive.
- Never restyle a primitive at the call site with a wall of utility classes. If
  a component needs a different look everywhere, change the theme variable it
  reads. That is what `cssVariables: true` buys.
- Icons come from lucide and nothing else. One icon set, no exceptions, because
  two sets never quite match.
- The theme lives in `globals.css` under `@theme` and `:root`, ported from
  `prototypes/theme.css`. Colours are named for their job, never their value: a
  component reads the nails colour, not a pink.
- shadcn is a starting point, not a ceiling. A plain `<section>` needs no
  primitive behind it. Reach for a component when it carries real behaviour such
  as focus handling, keyboard support or portals.
- **One exception, and it is easy to trip over: do not use shadcn's `Form` /
  `FormField` wrapper.** Use its Input, Label, Select and Button, and wire the
  form with react-hook-form directly. See **Forms** below for why.

## Data

There is no database, and that is a decision rather than a gap. Every piece of
content is a typed file in the repo, which means it is version controlled,
reviewable in a diff, and impossible to lose.

- Content lives in `data/*.ts` as typed exports: services, gallery records, FAQ,
  and `siteConfig`. Server components import it directly. Nothing is fetched at
  request time to render content that has not changed.
- A `Record` type per data file, exported alongside the data, so a typo in a
  price is a build error rather than a visitor seeing `undefined`.
- Images are records, not files. The repo stores an ImageKit path, alt text and a
  service tag. It does not store the photograph.
- Zod validates anything crossing a trust boundary. On this site that is exactly
  one thing: the contact form.
- Secrets stay server side. `RESEND_API_KEY` and `IMAGEKIT_PRIVATE_KEY` are read
  in Server Actions only. Anything a client component can reach is public,
  whatever it is named.

If a feature later needs a database or auth, write the rules for it then,
against the real schema. Writing them now would mean guessing, and the blueprint
still ships them for projects that have one.

## Error Handling

- Use try/catch in Server Actions
- Return a `{ success, data, error }` shape from actions
- Show the visitor a message that tells them what to do next, never the raw
  error. "Something went wrong, try again or send a DM" beats a stack trace.
- A failed contact form must never look like a success. Silently swallowing a
  Resend failure loses a booking and nobody finds out.
- Log the real error server side. The visitor gets the friendly version, the
  server keeps the useful one.

## Testing

The blueprint installs no test runner; testing is opt-in at the project level,
because the overlay can't know your stack. Adding unit testing is an explicit
setup task the AI can do through the normal workflow, either as a build-plan item
or with `/tests`. The setup should choose the stack-native runner, wire the
scripts or commands, add a small example test, and update the Commands section
of `AGENTS.md`.

When `AGENTS.md` declares a `Verify` command, treat it as the umbrella automated
gate. It combines only the checks this project actually has, in this order when
available: typecheck, tests, then build. The command does not enable an absent
test runner or replace focused evidence. It gives local work and optional CI one
exact command to run. `/ci` owns Verify and CI setup. `/tests` adds the real test
command to Verify when it already exists, but never creates CI only because
testing was configured.

**The opt-in switch is one signal: a `test` command in the Commands section of
`AGENTS.md`.** Declare one and **tests become a gate for logic-bearing steps**,
not an optional extra; leave it out and the loop verifies logic with the evidence
it already uses (run it, a screenshot, the build). Adding the runner is itself a
deliberate step, never a silent mid-step install. This is the single definition
of the switch; the skills and `ai-interaction.md` only point back here.

- **What to test (the scope rule):** pure logic where a wrong answer is possible -
  parsers, formatters, validators, id/slug builders, server actions. These have
  assertable inputs and outputs and real edge cases (empty, missing, malformed).
- **What not to test:** UI components and integration-level surfaces (render or
  export routes, anything driving a real browser or external service). Verify those
  with a screenshot and the build, not brittle unit tests.
- **The gate (when a runner is configured):** a build step that adds in-scope logic
  must ship a passing test in the same reviewable diff. The project's test command
  must be green before the step is approved, before any checkpoint commit, and
  before `/complete` merges. UI and integration-only steps are exempt and ride on
  screenshot plus build evidence.
- **When it's named:** the `/feature` spec's Testing section predicts the coverage,
  `/implement` writes the test with the step, and if a step surfaces logic the spec
  didn't foresee, add a focused test then.
- An empty suite should fail, not pass, so "no tests ran" never looks like "passed".
- Test files live next to source files (for example `feature.test.ts`).
- Run them via the project's test command (see Commands in `AGENTS.md`), not a
  hardcoded tool name.

Stack binding (swap for yours): a TypeScript app uses Vitest, `vi.mock()` for
external dependencies (the database, auth, third party APIs), and `vi.useFakeTimers()` for
time-dependent logic; a Python app would use pytest; a Go app `go test`.

## Browser Verification

For UI and integration behavior, prefer real browser evidence over reading the
code and assuming it works.

- Browser automation is separately opt-in through `/browser-tests`. That setup
  reuses a compatible runner or prefers Playwright for supported projects, then
  documents the exact command as `Browser tests` in `AGENTS.md`.
- When `Browser tests` is declared, add focused coverage for stable behavioral
  done-whens when it is proportionate, and run the documented command during
  `/check`. Do not assume it proves visual fidelity, real authenticated-profile
  behavior, browser chrome, or another claim the test does not observe.
- If no Browser tests command is declared, do not add a runner silently in the
  middle of an unrelated feature. Use the available dev server, browser
  screenshots, build output, API output, or manual evidence instead.
- Browser tests are not part of the default Verify command or CI unless the user
  separately chooses that slower gate.
- Browser evidence is especially important for flows that click, type, submit,
  navigate, download files, render complex layouts, or depend on client-side
  state.

## Code Quality

- No commented-out code unless specified
- No unused imports or variables
- Keep functions under 50 lines when possible

## Comments

Write code that explains itself; comment only what the code cannot say.
Over-commenting is a common AI tell, so resist it.

- Comment the **why**, not the **what**. Delete any comment that restates the code.
- No banner/header blocks, section dividers, or step-by-step narration of obvious
  code. A file does not need a comment announcing each region.
- A comment earns its place only when it captures something the code can't: a
  non-obvious decision, a gotcha or workaround, why a value is what it is, or a
  link to a spec or issue.
- Prefer self-documenting names and small functions over explanatory comments.
- Keep doc comments minimal: a one-line purpose on an exported type or function is
  plenty; don't write JSDoc that just repeats the signature.
- When in doubt, leave the comment out.

## Writing

- No em dashes (U+2014) in generated content: docs, comments, commit messages,
  READMEs, specs. They read as AI-generated.
- Use a hyphen for `term - description` separators; rephrase prose with commas,
  parentheses, or a colon. Avoid en dashes and the ellipsis character too.

## Forms

Use shadcn components for form UI: Input, Label, Select, Button.

Do NOT use shadcn's Form / FormField wrapper, even though the shadcn docs still
show it. Wire forms with react-hook-form directly, following react-hook-form's
current controller API.

Why: shadcn's form layer has not caught up with react-hook-form's current API.
Mixing them produces a form that renders but does not work.

Verified in real projects on 2026-09-09. Re-check before assuming it still
holds. This rule describes a third party that has not caught up yet, not a
permanent truth.

## Marketing site (Next.js)

- Every business fact lives in `data/siteConfig.ts`: name, phone, email, hours,
  address, coordinates, social links, review sources. A component never
  hardcodes one. Changing that file changes the site, which is the point.
- Nothing ships with placeholder text. Before a page is called done, every
  string a visitor can read is either real or comes from `siteConfig`. That
  includes the page title, which is the headline Google shows.
- Images go through the ImageKit wrapper rather than `next/image` directly, and
  are hosted on ImageKit. Only icons and the favicon belong in `public/`.
- Server components by default. `"use client"` needs a reason you can name in
  one line: state, an effect, an event handler, or a browser API. Reaching for
  a hook out of habit is not a reason.
- When only part of a section is interactive, keep the interactive shell in a
  client component and pass the static content in as `children`. The client
  component owns the behaviour, an observer or a toggle, and nothing else. The
  markup it wraps stays on the server.
- Animation is CSS first. A JavaScript animation library earns its place only
  for layout animation, gestures, or motion that has to be interruptible. A
  fade, a reveal or a colour change is CSS, and it costs no hydration. Check
  `tool-helper/library/animations/` before building one, the traps are already
  written down there.
- Every page carries JSON-LD structured data, and the site carries a sitemap.
  On these builds SEO is the product, not a finishing pass.
- Search Console on every site. Analytics is a per project decision, never a
  default. Reach for Google Analytics when the client spends money on ads and
  needs to see what it returns, not because the client is large; otherwise a
  light cookie free tracker is enough. Disclose either in a privacy policy. A
  consent banner is only worth its cost when the site genuinely serves EU or UK
  visitors, since it sits between a visitor and the phone number.

## Rendering (Next.js)

Rendering is decided by one question: what is the least work the browser can
do and still get the right page? The reason is performance and SEO, every
time. These sites exist to rank.

- Static by default. If a page can be built at build time, it is
- Dynamic route but the slugs are known: `generateStaticParams`, so it is still
  a static page per slug
- Static page with one dynamic part: the page stays static and the dynamic part
  streams in behind `Suspense`. Only when actually needed, never by default
- Genuinely dynamic per request, a dashboard or per-user data: server
  components fetch directly, `"use client"` only for the interactive parts
- Server Actions for form submissions and simple mutations
- A Route Handler only for webhooks, uploads with progress, long-running work,
  specific status codes or headers, or an external client
