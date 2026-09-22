# Design links

One line per link. Say what to look at, not just where it is.

A bare URL is close to useless six weeks later. `https://example.com` tells you
nothing; "the way the pricing cards stack on mobile" tells you why you saved it.

## Format

```
- <url> - what to look at, and why
```

## Ours

Published artifacts from this project. Private until shared from each page's
own Share menu. Republishing the same local file updates the same URL, so these
links do not change.

- https://claude.ai/artifact/99bTBTUPXZHDPHjTdTxjfZ - the build log,
  `blueprint/context/project-log.html`. `/overview` refills it and republishes
  to this same address.
- https://claude.ai/artifact/EXcCvgP6fDQs4fWfWmyj3R - the home page mockup,
  `prototypes/home.html`. Note the photos are Unsplash comps loaded from another
  site, which the artifact viewer blocks, so this one only looks right on
  `node prototypes/serve.mjs`.
- https://claude.ai/artifact/RPRPJb24TKNEFjKabxda1Y - the photo guide for Dani,
  `blueprint/reference/photo-guide.html`. Bilingual, phone shaped. Share it with
  her before she shoots anything.

The gallery mockup is deliberately not published, for the same comps reason.
Run it locally.

## Her photos

- https://drive.google.com/drive/folders/1e5lFwx0ih7K99gjqlYF8FKgG-HqFhpg0 -
  "work", shared by Dani on 2026-09-21 from
  `danielahernandezmoreno074@gmail.com`. She filled it late that evening, every
  file stamped between 23:45 and 23:49.

**Assessed on 2026-09-21, during feature 4.** 77 files: 47 iPhone HEIC, 25 JPG,
5 videos. All 72 stills were decoded and looked at. Ten nail sets shipped to
`facing-dani/nails` on ImageKit. Three things came out of the pass and none of
them are code problems:

- **There are no lash photographs. Not one, in 72.** The site sells three
  services and the gallery can only show two. Item 5's lashes page has the same
  hole. This is the single biggest content ask outstanding.
- **Makeup is one look, two frames**, and the model's face is recognisable in
  both. Held back pending her permission. The same goes for a portrait that is
  almost certainly Dani, which belongs on item 6 anyway.
- **Everything was shot in July and August 2025.** Nothing is recent work.

The weak shots fail in ways the photo guide already covers: cluttered domestic
backgrounds, flat overhead light, framing too far back to read a cuticle line.
The one failure it does **not** cover is other people in the frame, which is a
consent question rather than a composition one. Worth a fifth rule, remembering
the published artifact keeps its old content until it is republished.

**Decided, and unchanged by the photos arriving: no stock photography of nail
work.** A gallery on a nail artist's site is a claim that this is her work. A
client books on a borrowed photo and finds out in the chair, which is the worst
possible place to find out, and it turns the craft angle from a fact into a
sales line. `prototypes/home.html` said this in a comment before anyone asked.

**The habit still matters more than the backlog.** Three shots at the end of
every appointment beats another camera-roll dump, and it is the one thing that
turns ten sets into forty by Christmas.

**Unresolved, and separate: her name.** `siteConfig.business.name` is
"Dani Moreno". Her email suggests Daniela Hernandez Moreno. The site and the
Google Business Profile must match character for character or Google reads
them as two businesses, so this needs confirming before the profile goes up.

## Links

### Worth copying

- https://chillhouse.com/ - the strongest reference found. A single full-bleed
  photo of hands and nails fills the entire viewport, oversized display caps sit
  over it, and the chrome is a thin bar and nothing else. The work is the design.
  See `ref-chillhouse-hero.png`.
- https://dearsundays.com/ - split hero, type left and photo right, one accent
  colour used for the button and nothing else. Steal the layout discipline, not
  the palette; the sage-and-cream is spa-calm and this project is not.
  See `ref-dear-sundays-hero.png`.
- https://oliveandjune.com/ - the page is a promo-heavy shop and mostly noise,
  and the screenshot came out dimmed behind a modal, so it was dropped. The one
  thing worth remembering: "Busy Girls Need Fast Manis" set in heavy condensed
  caps is the right energy for nails. Condensed display type reads as active,
  serif reads as calm. That is why the headline font here is Unbounded and not a
  serif.

### Counter-examples, note kept, screenshot dropped

The design is locked, so these no longer need to sit here as images. The lesson
is the part worth keeping. Screenshots are in git history at `a37ce33` if one is
ever needed again.

- https://www.paintnailbar.com/ - a script font laid over a busy photo, so the
  headline is nearly unreadable, plus a flat pink band above the logo. This is
  the default beauty-site mistake: decorative type fighting a detailed image.
- http://www.vanityprojectsnyc.com/ - gallery-first positioning for a nail
  artist is the right instinct, but the execution is an art-world puzzle. A
  visitor cannot tell what is sold or how to book.

### Read on the way past

- https://www.awwwards.com/inspiration/beauty-studio-salon-sona - checked and
  discarded. Elegant, muted, spa-calm. Recorded so it is not looked up twice.
