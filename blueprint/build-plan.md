# Build Plan

> One of the two planning docs you provide. Write it directly, develop it through
> any AI conversation, or optionally run `/discovery`. Keep the items high-level
> even when `project-plan.md` is detailed; later `/feature` specs hold the depth
> for each build item.

The features that make up this project, high level and in rough build order, one
line each, no detail (that comes per feature). Rough is fine at first, but before
`/overview` runs this file should be shaped into a checkbox list the build loop
can track.

Keep it as a checklist. Run `/feature` with no number to spec the **next
unchecked** item, or `/feature 3` / `/feature "login"` to pick a specific one.
Completed features get checked off here, so the build plan doubles as your
progress tracker. A big item gets split into sub-items (4a, 4b, etc.) when you
spec it.

## Continuing after the initial build

This is a living roadmap, not a plan that freezes when the first release is
done. Keep completed items checked, then append new unchecked features as the
project grows. Optional milestone headings such as `## MVP` and `## Post-MVP`
keep a longer plan readable without changing how `/feature` finds the next
unchecked item.

Do not renumber completed features because their archived specs refer back to
those numbers. Continue with the next unused number. If a new feature materially
changes the product direction, users, data, stack, monetization, UI/UX, or
deployment, update the relevant part of `project-plan.md` too. Then re-run
`/overview` before spec'ing the feature.

You can edit this file directly or ask the AI to start a new feature by name. If
`/feature "team workspaces"` does not match an existing item, it will propose the
new build-plan line and any necessary project-plan changes, wait for approval,
refresh the overview, and then write the feature spec.

Scaffolding the app (create-next-app, etc.) and prototyping the look are
pre-build steps, not features (see the README), so don't list them here. Start
with your first real slice of functionality.

A common order that works well: build the core UI with placeholder data first,
then wire up data, auth, and integrations. Add deployment readiness only when
the app is worth shipping or a provider config change is part of the work. Adapt
it to your project.

## Format

Use checkboxes. Each item should be a feature-sized outcome, not a loose task or
a whole product area.

Good:

- [ ] 1. **Skill submission** - upload a skill package and save its metadata
- [ ] 2. **Validation result** - run checks and show pass/fail status for a skill
- [ ] 3. **Directory listing** - browse and filter published skills
- [ ] 4. **Deployment readiness** - configure Render or Vercel and verify the
  production build

Avoid:

- Upload stuff
- Database
- Make it look nice
- Auth, billing, dashboard, validation, and deploy

If your first pass is just rough bullets, that is okay. Run `/overview` after
filling both planning docs; it will flag plan-shape problems and can propose a
cleaned-up checkbox version before generating the project overview.

---

## MVP

Order matters here. The shell carries the theme, so it goes first and everything
after inherits it. The gallery is the page that sells the work, so it comes
before the pages that describe it. SEO is last of the content work because it
needs real pages to describe.

- [ ] 1. **Site shell and theme** - port `prototypes/theme.css` into `globals.css`
  `@theme`, then build the header, mobile nav and footer against it
- [ ] 2. **Home page** - hero, the three services, gallery teaser, her story,
  FAQ and the booking call to action
- [ ] 3. **Gallery** - the full set of work, filterable by service, at a size
  where the quality is actually visible
- [ ] 4. **Service pages** - nails, lashes and makeup, one page each, with
  treatments, prices and durations
- [ ] 5. **About** - her training and the trust a new business has not earned yet
- [ ] 6. **Contact and booking** - the form, validation, Resend delivery, the
  direct booking route and a thank-you page
- [ ] 7. **Local SEO** - per-page metadata, sitemap, robots, LocalBusiness and
  FAQ structured data
- [ ] 8. **Deployment readiness** - Vercel config, env vars, and a verified
  production build

## Post-MVP

Not scheduled. Listed so they stop being re-proposed as if they were new.

- [ ] 9. **Spanish** - a genuine and near-uncontested opening in this market
- [ ] 10. **Reviews on site** - waits until there are reviews worth showing
- [ ] 11. **Real booking** - availability and deposits, only if DMs stop coping
