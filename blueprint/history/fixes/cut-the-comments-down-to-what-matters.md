# Fix: Cut the comments down to what matters

**Type:** Fix

**Status:** verified

**Branch:** `fix/cut-the-comments-down-to-what-matters`

## The problem

About a quarter of the source is comments: 1,692 of 6,633 lines across 60
files. Reading the code means wading through them. `contactAction.ts` is 76
comment lines out of 148.

Most of it is one of three things:

- **Build history.** "An earlier version...", "two rounds were spent on it",
  "caught by filling it in a real browser", what the sibling project does.
- **Restating the code** or explaining standard Next.js, which the reader
  already knows.
- **Big `/** */` blocks** at the top of a file or function, far from the line
  they are about.

`coding-standards.md` already forbids this ("comment only what the code cannot
say", "when in doubt, leave the comment out"). The code drifted from its own
rule, so the standard is not changed here.

The worst files:

| File | Comment lines / total |
|---|---|
| `components/gallery/GalleryLightbox.tsx` | 129 / 426 |
| `dictionaries/en.ts` | 128 / 560 |
| `data/decorativeImages.ts` | 94 / 431 |
| `lib/schema.ts` | 94 / 248 |
| `actions/contactAction.ts` | 76 / 148 |
| `data/gallery.ts` | 70 / 123 |
| `components/gallery/GalleryFigure.tsx` | 67 / 164 |
| `lib/contactValidation.ts` | 64 / 98 |

## The fix

The reader is a developer who knows Next.js well. A comment stays only when it
is one of:

- **A trap**: something that looks wrong or removable and would break if
  "fixed" (the honeypot staying unconstrained, the `/en` redirects, the
  ordering in the contact action).
- **A non-obvious reason** for a value or a choice that the code cannot show.
- **A constraint from outside the code**: a Google, ImageKit or browser rule.

Shape:

- One or two lines, `//`, directly above the line it explains, or at the end of
  it when it is tiny.
- `/** */` only where a real explanation cannot fit in two lines. Rare.
- No history, no "earlier version", no rounds spent, no sibling project.
- No file header blocks, no section announcements, no JSDoc that repeats the
  signature.
- No em dashes.

Also fixes the stale comment in `lib/locale.ts` that says only `/` exists.

**Must not break:** anything. Comments only. Not a single line of code,
string, class name or dictionary copy changes. CRLF line endings stay intact
on every file touched.

## Build steps

- [x] 1. **Routing, SEO and the contact form.** `actions/`, `lib/`, `app/`,
   `next.config.ts`, `emails/`.
   Done when: comments in those files follow the rules above and the
   no-code-change check passes.
- [x] 2. **Components.** Everything under `components/`.
   Done when: same.
- [x] 3. **Data, dictionaries, scripts and styles.** `data/`, `dictionaries/`,
   `scripts/`, `app/globals.css`.
   Done when: same, and the total comment count is reported against 1,692.

## Verify

- **No code changed.** Every touched `.ts` / `.tsx` / `.mjs` file, parsed with
  TypeScript and printed with comments removed, is identical to the same file
  at `main`. `git diff --stat` shows only deletions and comment lines.
- **Line endings.** Every touched file is still pure CRLF.
- `npm run lint` and `npm run build` pass.
- Open `/`, `/nails` and `/contact` in a browser and confirm they render as
  before.
- Read `actions/contactAction.ts` top to bottom: what is left should be a
  handful of short markers, each sitting on the line it explains.

## Verification actually performed

| Check | Result |
|---|---|
| Every touched `.ts` / `.tsx` / `.mjs` parsed with TypeScript and printed with comments removed, compared against `main` | 55 of 55 identical |
| `globals.css` with `/* */` stripped, compared against `main` | identical |
| Line endings on every touched file | pure CRLF, no em dashes |
| `npm run lint` | clean |
| `npm run build` | 19 static pages generated, 14 routes |
| `node scripts/auditSeo.mjs` | PASSED - 14 routes |

The browser check in Verify was not run: the `/implement` rules do not start a
dev server. It is covered by the first row. With comments stripped, the code is
byte-identical to `main`, so nothing can render differently.

## Implementation walkthrough

### The rule that decided every comment

A comment stayed only if deleting it would let someone "fix" the code into a
bug: the honeypot that must report success, the `/en` redirects, every page
setting its own `alternates`, the header blur living on its own layer. Build
history went ("an earlier version", "two rounds were spent", "measured on the
running page"), and so did anything restating the code or explaining standard
Next.js. What survived is one or two `//` lines on the line it explains.

### How no-code-change was proved

A scratch script parsed each file at `HEAD` and in the working tree with the
TypeScript compiler, printed both with `removeComments: true`, and compared the
output. Two false alarms had to be taught away, both rules the JSX compiler
already follows:

- `git show` returns LF while the working tree is CRLF, and JSX text keeps a
  `\r`. Both sides are normalised to LF before parsing.
- Removing a `{/* ... */}` block merges the whitespace-only JSX text around
  it. Whitespace-only JSX text that spans a newline is dropped by the compiler,
  so the checker drops it too.

Anything else that differed failed the file. Nothing did.

### Step 1: routing, SEO and the contact form

`actions/contactAction.ts` went from 76 comment lines to 7. `lib/schema.ts`
keeps only the two SEO traps: an empty offer catalogue and `From $5` sent as a
minimum rather than `price`. `lib/locale.ts` lost the stale "only / exists
today" note. `next.config.ts` keeps why the rewrites are one rule per route
rather than a catch-all.

### Step 2: components

`GalleryLightbox.tsx` held the longest essays: the srcset density trap, the
focus workaround, the `translate-none` fix. Each is now one line on the
attribute or class string it protects. The detail is still in this project's
memory and in the feature archives. `SiteHeader.tsx` keeps the backdrop-filter
warning, the one comment in the shell that prevents a real regression.

### Step 3: data, dictionaries, scripts and styles

`data/decorativeImages.ts` keeps its three rules (never her work, no
identifiable face, free licences only) and drops the `// N1` style
contact-sheet codes. `data/portrait.ts` now says the portrait stays null because
the site shows no photo of her. `dictionaries/en.ts` gained one comment it did
not have before: "sure of yourself" never becomes "secure". It moved there from
`Story.tsx` so it sits on the string it protects. The dictionary edits went
through a script that only replaced whole comment blocks, so no copy could
change by accident. `globals.css` keeps its short section headers as navigation
markers and loses the contrast-ratio essays.

### Result

1,692 comment lines down to 145, across 55 files. 1,922 lines deleted in all.
