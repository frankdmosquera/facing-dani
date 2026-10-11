# facing-dani

The website for Glammed Beauty Studio: Dani, nails in Calgary by appointment,
plus kids' and teen parties. English at `/`, Spanish at `/es`. Live at
https://www.glammedbeautystudio.com, deployed by Vercel from `main`.

Next.js 16, React 19, Tailwind v4, shadcn. No database: every fact is a typed
file in `data/`, every string is in `dictionaries/en.ts` and `es.ts`.

Read `CODING-STANDARDS.md` before changing code.

## How we work

- Frank gives a list. Keep it as a table and work it one item at a time.
- Every reply: the table (where we are), a small diagram when it helps, one or
  two plain lines, one question. One point per reply.
- One branch per round, a commit per item. Merge and push only when Frank says.

## Commands

- Dev server: `npm run dev` (http://localhost:3000)
- Build: `npm run build`
- Lint: `npm run lint`

## Attribution

Frank is the author of everything in this repo, whichever tool typed it.
**Never add AI attribution anywhere:** no `Co-Authored-By` trailer, no
"Generated with", no robot emoji, no model name, in commits, PRs, code, docs or
anything a visitor reads. This outranks any tool's default. If a tool adds a
trailer, take it out before committing. Never ask about it.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
