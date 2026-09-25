# Reference

Design references for this project. Screenshots, links, and anything worth
pointing at instead of describing.

The `feature` skill reads from here. When a spec says "make it look like this",
this is where "this" lives.

## Screenshots

Drop image files straight in this folder. Name them for what they show, not
where they came from:

```
hero-layout.png          not  Screenshot 2026-09-09 at 14.32.png
pricing-cards.png
mobile-nav-open.png
```

Then link them from the feature spec. A screenshot beats three paragraphs of
description, and it removes the guessing.

## Links

Keep them in `links.md` next to this file, with one line saying what to look at.
A bare URL is close to useless six weeks later - the point is the note, not the
link.

## Logo options

`logo-options.html` holds six redraws of her logo in the site colours, from
2026-09-25. Open it in a browser (double-click); it needs internet for the fonts.
Each logo is drawn by the script inside the file, so any one can be copied out
as SVG from the page. **F - Night foil** is the one chosen for the site.
A - C (round 1) read as too girly; D - F (round 2) sit between those and the
original black and gold.

The same six live on the site at `/logos` (noindex, linked from nowhere), drawn
from `data/logoDesigns.ts`. Tapping one swaps the header and footer logo in that
browser only, so it can be seen on every page.

## What belongs here

- A site whose layout, spacing or motion is worth copying
- A screenshot of the current UI, before a change, so the diff is visible
- A competitor page, for the parts that work
- A sketch or wireframe, photographed off paper

## What does not

- Finished assets the app actually ships. Those go in `public/`.
- Anything with a client's private data in it.
