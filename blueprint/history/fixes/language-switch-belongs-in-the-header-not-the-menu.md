# Fix: Language switch belongs in the header, not the menu

**Type:** Fix

**Status:** verified

**Branch:** `fix/language-switch-belongs-in-the-header-not-the-menu`

## The problem

On a phone the language switch is inside the mobile menu. Tapping it changes the
language, which navigates, which closes the menu. You are left on the page you
started on and have to open the menu again to carry on.

Reported from the preview: *"when I hit Spanish in the mobile menu it takes me
away from there, and I have to click the mobile menu again."*

**The panel is not closing by mistake.** Nothing tells it to. It closes because
the `/` to `/es` hop is a real page load and the panel's open state lives in
memory. There is no bug in `MobileNav` to repair.

The actual mistake is placement. Every other item in that menu is a destination;
the switch is a setting that changes the whole site. Filing it with the nav links
is what makes it behave in a way that feels broken.

### Why the header is the right home for it

Beyond tidiness, there is a reason specific to this project.
`project-plan.md` section 2 describes the Spanish-speaking client who searches in
Spanish and finds nothing local. When she lands on the English page, **`Español`
visible in the header is the instant signal that this artist speaks her
language.** Behind a burger, she has to go looking for the one thing that
separates Dani from every other nail tech in Calgary.

It also removes the reported problem rather than patching it. No menu, no menu
state to lose.

## The fix

Show the switch in the header at every width, and take it out of the mobile
panel.

| | Now | After |
|---|---|---|
| Desktop header (>=900px) | `Español` | unchanged |
| Phone header (<900px) | wordmark + burger | wordmark + **`Español`** + burger |
| Mobile panel | `Español` at the bottom | removed |

Today the switch sits inside the header's `hidden … min-[900px]:flex` group
alongside the CTA, so it disappears below 900px. It needs to come out of that
group and sit as its own always-visible item; the CTA stays desktop-only.

**Must not break:**

- The switch's behaviour. It still swaps language on the current page and still
  returns to the same page. The full page load across `/` and `/es` stays - that
  is the root rewrite, unrelated, and now invisible because there is no menu
  state to lose.
- Header layout at 375px. The wordmark is roughly 60px and the burger 36px on a
  375px bar, so there is room, but it needs checking rather than assuming.
- Tap target size. The switch becomes a primary phone control, not a footnote at
  the bottom of a menu.
- One control in one place. `ai-interaction.md` already says nothing appears
  twice, and two switches would be exactly that.

## Build steps

- [x] **1. Move the switch out of the panel and into the header at all widths**

  `components/shell/SiteHeader.tsx`: lift `LanguageSwitch` out of the
  `min-[900px]:flex` group so it renders at every width. Leave the CTA in that
  group.

  `components/shell/MobileNav.tsx`: remove the `LanguageSwitch` render and its
  import. Nothing else in that file changes - the panel keeps Escape, focus
  return, scroll lock and close-on-link.

  `components/shell/LanguageSwitch.tsx` should not need changing beyond whatever
  sizing the header needs.

  Done when: `npm run lint` and `npm run build` exit 0; the built HTML for each
  locale contains **exactly one** language-switch anchor, not two; and at 375px
  the header shows wordmark, `Español` and the burger on one line with no wrap
  or overlap.

## Verify

At 375px on the deployed preview:

1. `Español` is visible in the header without opening the menu.
2. Tapping it goes to `/es`, and the header then reads `English`.
3. Open the menu. There is no language switch inside it.
4. The menu still opens, closes on Escape, and returns focus to the burger.

At 1280px the header is unchanged: wordmark, nav, `Español`, `Book now`.

Regression worth one look: the header is the element the mobile panel used to be
trapped inside. Confirm the panel still covers the full screen after this layout
change, since that bug lived in this exact component.

---

## Verification performed

`npm run lint` exit 0, `npm run build` exit 0.

**From the built output:**

| Check | Result |
|---|---|
| Switch anchors per page | `en.html` **1**, `es.html` **1** - not two |
| Burger per page | `en.html` 1, `es.html` 1 |
| Switch classes | no `hidden`, no `min-[900px]` - renders at every width |
| CTA classes | still `hidden … min-[900px]:inline-block` - desktop only |

**Layout at 375px**, measured by rebuilding the header's right-hand group on the
live page and reading the geometry:

| | |
|---|---|
| wordmark | x 20 -> 76 |
| `Español` | x 270 -> 325 |
| burger | x 325 -> 361 |
| viewport | 375, `overflows: false` |
| row height | **64px, unchanged** - nothing wrapped to a second line |
| centres | aligned |

**Tap target.** The first pass left it 22px tall, which is too small for a
control just promoted to primary on a phone. `-mx-2 px-2 py-3` brings it to
roughly 44px at net-zero layout cost. Confirmed at the CSS level in this
build - `.py-3{padding-block:calc(var(--spacing) * 3)}` with `--spacing` at 4px -
rather than measured rendered, because the live page's stylesheet never
compiled `py-3`.

**Not observed:** the switch being tapped on a real phone-width build, and the
mobile panel still covering the full screen after this header change. Both need
the preview or `npm run dev`. The panel one matters because the header is the
element that trapped it before.

---

## Implementation walkthrough

### `components/shell/SiteHeader.tsx`

The switch and the CTA shared one `hidden … min-[900px]:flex` wrapper, so
hiding the CTA on phones hid the switch with it. The wrapper became a plain
`flex items-center gap-5` that is always visible, and the CTA took the
breakpoint onto itself.

The burger moved into that group as well, so the header's right-hand side is
one row rather than a group plus a stray sibling.

Two comments were added, both for things that look like noise and are not: why
the switch is in the header at all rather than in the menu, and why the tap
target padding exists.

### `components/shell/MobileNav.tsx`

The `LanguageSwitch` render and its import came out. Nothing else changed -
Escape, focus return, focus containment, scroll lock and close-on-link are all
untouched. A comment sits where the switch used to be, saying where it went and
why, because an empty space does not explain itself.

### Two mistakes made and caught during the build

**The header briefly rendered two burgers.** Moving `MobileNav` into the new
group left the original sibling in place. Caught by grepping the file before
building, not by the build, which was perfectly happy. The "exactly one burger
per page" count in the built HTML is what confirms it is gone, and it is the
kind of duplicate that only shows at one breakpoint.

**The tap target was 22px.** The spec said the switch becomes a primary phone
control rather than a footnote in a menu, and the first pass carried over the
menu's sizing. `-mx-2 px-2 py-3` brings it to roughly 44px while the negative
margin cancels the horizontal padding, so nothing moves.

### A note on the verification technique

Layout at 375px was measured by rebuilding the header's right-hand group on the
live production page and reading the geometry, since no server was running.
That worked for position and overflow, and the row staying 64px tall is what
proves nothing wrapped.

It did **not** work for the tap target: the measurement came back 22px because
production's stylesheet was compiled without `py-3`, a class this build
introduces. Injecting markup into a deployed page only tests classes that page
already ships. The padding was confirmed instead by reading the compiled CSS in
this build.

One earlier check was also simply wrong: an `allOnOneLine` test compared
element `top` values, which differ between a 19px wordmark and a 14.5px link
that are centre-aligned on the same row. It reported a wrap that was not
happening. Compare centres, not tops.

### What is still unobserved

The switch tapped on a real phone-width build, and the mobile panel still
covering the full screen after this header change. The second one matters more
than it sounds: the header is the exact element whose `backdrop-filter` trapped
that panel before, and this change alters the header's layout.
