# Fix: Mobile nav panel is invisible

**Type:** Fix

**Status:** verified

**Branch:** `fix/mobile-nav-panel-is-invisible`

## The problem

On a phone, tapping the menu button appears to do nothing. The close button
shows, the rest of the page stays visible behind it, and none of the nav links
ever appear. There is currently **no way to navigate the site on a phone**,
which on a build whose plan calls mobile "the product" is the worst place for
this to be broken.

Shipped in feature 1 and live at https://facing-dani.vercel.app.

**The panel's state is entirely correct** - this is not a React or an
accessibility bug. Measured on the live site:

| | |
|---|---|
| `role` / `aria-modal` | `dialog` / `true` |
| `aria-expanded` on the burger | flips `true` / `false` |
| `body` scroll | locks on open, restores on close |
| Focus | moves to the close button, returns to the burger |
| Escape | closes |
| Focusables inside the panel | 7, all present in the DOM |

The panel is simply the wrong size and in the wrong place:

```
panel.getBoundingClientRect()  ->  { x: 0, y: 31, w: 375, h: 64 }
viewport                            375 x 812
```

64 pixels tall, pinned under the ticker. The first nav link sits at `y: 105`,
outside that box, and the panel's `overflow-y-auto` hides the overflow rather
than letting it spill. `document.elementFromPoint` at the screen centre returns
the `<footer>`, confirming nothing covers the page.

### Cause

`components/shell/SiteHeader.tsx` puts `backdrop-blur-[12px]` on the `<header>`
itself. **A `backdrop-filter` on an ancestor makes that ancestor the containing
block for every `position: fixed` descendant.** So the panel's `inset-0`
resolves against the header box instead of the viewport.

The header is 64px tall and starts 31px down, under the ticker. That is exactly
the rect above.

### Proof, not theory

Setting `backdropFilter: 'none'` on the header on the live page, with the panel
open, and re-measuring:

```
before   { y: 31, h: 64  }
after    { y: 0,  h: 812 }   coversViewport: true
```

The menu then rendered correctly: all five links, the gradient Book now pill,
and the focus ring on the close button. Nothing else needed changing.

## The fix

Move the translucent background and the blur off `<header>` and onto an
absolutely-positioned layer inside it. The header keeps `sticky`, which does
**not** create a containing block for fixed children, so the panel anchors to
the viewport again.

```
<header class="sticky top-0 z-40 border-b border-line-soft">
  <div aria-hidden class="pointer-events-none absolute inset-0
       bg-[color-mix(...)] backdrop-blur-[12px]" />
  <div class="relative mx-auto flex ...">   <-- existing nav row
```

Two things to get right:

- The content row needs `relative` so it paints above the blur layer. `relative`
  is safe here: only `transform`, `filter`, `backdrop-filter`, `perspective`,
  `contain` and `will-change` trap a fixed descendant. `position` alone does not.
- The blur layer needs `pointer-events-none` so it cannot swallow clicks on the
  wordmark, the nav or the burger.

**Must not break:**

- The frosted look at desktop and phone width. This is a move, not a redesign;
  the rendered header should be pixel-identical.
- The sticky behaviour and the bottom hairline.
- Everything in the table above, all of which already works.

**Do not** reach for a portal, a mount flag or extra state. The bug is one
misplaced CSS property, and `createPortal` would add a hydration-guard effect
that `react-hooks/set-state-in-effect` already objected to once in this
component.

## Build steps

- [x] **1. Move the header's blur onto an inner layer**

  Edit `components/shell/SiteHeader.tsx` only. No change to `MobileNav.tsx`,
  which is correct as written.

  Done when: `npm run lint` and `npm run build` both exit 0, and on the deployed
  preview at 375px the open panel measures `{ y: 0, height: <viewport height> }`
  and `document.elementFromPoint` at the screen centre returns an element inside
  `#mobile-nav`.

## Verify

At 375px on the deployed preview:

1. Tap the burger. All five links (Nails, Lashes, Makeup, The work, About) and
   the gradient Book now pill fill the screen; the page behind is fully covered.
2. Press Escape. The panel closes and focus returns to the burger.
3. Scroll while open. The page behind must not move.
4. Tap a link. The panel closes.

At 1280px: the header still looks frosted over the plum ground, is still sticky,
and the burger is still absent.

Regression path worth one look because it shares the header: the wordmark and
the Book now pill must both still be clickable at desktop width, since a blur
layer over them would be invisible but would eat the clicks.

## Verification actually performed

`npm run lint` exit 0, `npm run build` exit 0. Emitted markup confirmed: the
`<header>` carries no filter, the `aria-hidden` layer carries
`backdrop-blur-[12px]`, and the nav row carries `relative`.

No server was running, so the built artifact could not be loaded directly.
Instead the fix's exact emitted structure was reconstructed on the live
(unfixed) page and measured - the header reclassed, the layer inserted before
the nav row, the row set to `relative`:

| Check | Result |
|---|---|
| Panel rect, 375px | `{ y: 0, h: 812, w: 375 }` against an 812px viewport |
| `coversViewport` | `true` |
| `elementFromPoint` at screen centre | an `<a>` **inside** `#mobile-nav` |
| `<header>` backdrop-filter | `none` |
| Layer backdrop-filter | `blur(12px)` |
| Wordmark clickable, 1280px | reached, got `A` |
| Book now clickable, 1280px | reached, got `A` |
| First nav link clickable, 1280px | reached, got `A` |
| Header position | still `sticky` |
| Burger at 1280px | `display: none` |

That is a faithful reconstruction of the built output, not the deployed
artifact. The deployed check belongs to the preview build after this branch is
pushed.

---

## Implementation walkthrough

### `components/shell/SiteHeader.tsx` - the only file touched

The header went from carrying its own frosted ground:

```
<header class="sticky top-0 z-40 border-b border-line-soft
               bg-[color-mix(...)] backdrop-blur-[12px]">
  <div class="mx-auto flex ...">
```

to holding that ground as a separate layer:

```
<header class="sticky top-0 z-40 border-b border-line-soft">
  <div aria-hidden class="pointer-events-none absolute inset-0
       bg-[color-mix(...)] backdrop-blur-[12px]" />
  <div class="relative mx-auto flex ...">
```

Three properties moved and one was added. Nothing else in the component
changed, and `MobileNav.tsx` was not opened.

Both non-obvious parts carry a comment in the source, because both look like
noise to anyone who did not watch the bug happen:

- The layer exists **only** to keep `backdrop-filter` off the `<header>`
  element. Someone tidying up would naturally fold it back onto the header and
  silently reintroduce the bug, since nothing about the header looks different
  afterwards.
- `pointer-events-none` is load-bearing. Without it the layer sits over the
  wordmark, the nav and the CTA at every width, invisible and swallowing every
  click - strictly worse than the bug being fixed, and much harder to spot.

The nav row's new `relative` is there so it paints above the layer. That is
safe for the panel, and the comment says why: `position` alone never creates a
containing block for a fixed descendant. Only `transform`, `filter`,
`backdrop-filter`, `perspective`, `contain` and `will-change` do. Knowing which
half of that list matters is the whole content of this fix.

### What was rejected

A React portal would also have worked, and it is the answer most searches give.
It was turned down because it needs a mount flag to stay SSR-safe, which means
an effect that sets state - and `react-hooks/set-state-in-effect` had already
objected to exactly that pattern in this same component during feature 1. One
CSS property was the real problem; adding a hydration guard to work around it
would have left the property in place and the lesson unlearned.

### How it was verified without a server

No dev server was running and `/implement` does not start one, so the fix's
exact emitted structure was reconstructed on the live, still-broken page and
measured. The panel went from `{ y: 31, h: 64 }` to `{ y: 0, h: 812 }` against
an 812px viewport, and `elementFromPoint` at the screen centre changed from the
`<footer>` to an `<a>` inside `#mobile-nav`.

The desktop regression was checked the same way: the wordmark, the Book now
pill and the first nav link each resolve to their own `<a>` under
`elementFromPoint`, so the layer is not intercepting anything.

That is a faithful reconstruction of the built markup, not the deployed
artifact. The deployed confirmation is the Vercel preview for this branch.

### Why the original slipped through

Feature 1 passed `lint`, `build`, and a careful read of the emitted HTML and
CSS. Every one of those checks was green while the mobile navigation did not
work at all, because the defect only exists once a browser computes layout.
The lesson is recorded here rather than in a comment: for a phone-first build,
"the build passed" is not evidence that anything renders.
