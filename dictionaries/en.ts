/**
 * English is the source of truth for the shape. `Dictionary` is derived from
 * this object, so adding a string here makes the build demand the Spanish one.
 *
 * Deliberately not `as const`: that would type every value as its own string
 * literal, and Spanish would then have to repeat the English words exactly to
 * typecheck. Plain inference gives `string`, which is what a translation is.
 *
 * Only chrome lives here. Page copy arrives with the page that needs it.
 */
export const en = {
  meta: {
    title: "Dani Moreno - Nails, Lashes and Makeup in Calgary",
    template: "%s - Dani Moreno",
    description:
      "Nail, lash and makeup artistry in Calgary, trained in Colombia. Shape, structure and cuticle work that still looks good in week three. Se habla espanol.",
  },

  blurb:
    "Nails, lashes and makeup in Calgary. Trained in Colombia. By appointment.",

  nav: {
    nails: "Nails",
    lashes: "Lashes",
    makeup: "Makeup",
    gallery: "The work",
    about: "About",
  },

  cta: {
    book: "Book now",
  },

  /**
   * Headings and links are separate objects so `FooterKey` means "a label a
   * footer link can use" and nothing else. Flattened, a link could be typed
   * with the key of a column heading and still compile.
   *
   * The footer words some things differently from the nav on purpose -
   * `gallery` is "The work" up top and "The gallery" down here - so these are
   * their own strings rather than a reuse of the nav labels.
   */
  footer: {
    headings: {
      services: "Services",
      contact: "Get in touch",
    },
    links: {
      nails: "Nails",
      lashes: "Lashes",
      makeup: "Makeup",
      gallery: "The gallery",
      bookAppointment: "Book an appointment",
      about: "About",
      faq: "FAQ",
      instagram: "Instagram",
    },
  },

  a11y: {
    skipToContent: "Skip to content",
    mainNav: "Main",
    openMenu: "Menu",
    closeMenu: "Close menu",
    /** Appended to the wordmark so the link is not announced as "dani dot". */
    homeSuffix: "home",
  },

  /**
   * The switch names the language it goes to, in that language, so a visitor
   * who cannot read the current one can still find it.
   */
  languageSwitch: {
    to: "Español",
    label: "Ver este sitio en español",
  },

  /**
   * One block per service. `name` and `blurb` are the home page's cards; the
   * rest is that service's own page.
   *
   * **Each service owns its vocabulary and borrows nobody else's.** Nails owns
   * gel, acrylic, extensions, chrome and nail art; lashes owns classic, hybrid,
   * volume and fills; makeup owns grad, bridal, event and glam. Three pages
   * exist instead of one so that each can rank for its own terms, and that only
   * works if no two pages say the same thing. If a sentence here would read
   * correctly under another service, it is the wrong sentence.
   *
   * The page lede is deliberately not a reuse of `blurb`: the home page already
   * ranks with those words.
   *
   * `treatments` is empty until Dani sets her prices. `data/treatments.ts` is
   * typed off these keys, so a row cannot exist without a label, and a nails
   * row cannot borrow a lashes label.
   */
  services: {
    nails: {
      name: "Nails",
      blurb:
        "Gel, acrylic, extensions and custom art. Chrome, french, cat-eye, whatever you bring me.",
      meta: {
        title: "Gel and Acrylic Nails in Calgary",
        description:
          "Gel and acrylic nails in Calgary: full sets, extensions, chrome and hand-painted art. Shape, structure and cuticle work that still looks right in week three.",
      },
      eyebrow: "Shape, structure, cuticle line",
      headingLead: "Nails, done",
      headingAccent: "properly in Calgary",
      lede: "Gel and acrylic nails in Calgary: full sets and fills, chrome and hand-painted art. The parts most people never look at are the parts I was drilled on, and they are what decide whether a set still looks good three weeks later.",
      cta: {
        eyebrow: "Bring a photo",
        headingLead: "Let's build",
        headingAccent: "your set",
        lede: "Send me a reference or sit down with no idea at all. Either works.",
        book: "Book with Dani",
        instagram: "Message on Instagram",
      },
      empty: {
        heading: "Prices are being set",
        body: "I am putting the list together now. Message me and I will tell you exactly what your set would cost, with no surprises in the chair.",
      },
      work: { heading: "Recent nail work", all: "See every set" },
      treatments: {},
    },
    lashes: {
      name: "Lashes",
      blurb:
        "Classic, hybrid and volume sets, mapped to your eye shape rather than a template.",
      meta: {
        title: "Eyelash Extensions in Calgary",
        description:
          "Classic, hybrid and volume lash extensions in Calgary, mapped to your eye shape rather than a template. Fills every two to four weeks.",
      },
      eyebrow: "Mapped to your eyes",
      headingLead: "Lash extensions",
      headingAccent: "in Calgary",
      lede: "Classic, hybrid and volume. Every set is mapped to your own eye shape and lash line rather than copied off a chart, because the same set does not suit two different faces. Calgary, by appointment, with fills every two to four weeks.",
      cta: {
        eyebrow: "First set or a fill",
        headingLead: "Let's map",
        headingAccent: "your lashes",
        lede: "Tell me whether you want them subtle or obvious and I will take it from there.",
        book: "Book with Dani",
        instagram: "Message on Instagram",
      },
      empty: {
        heading: "Prices are being set",
        body: "I am putting the list together now. Message me with the look you are after and I will tell you which set gets you there and what it costs.",
      },
      work: { heading: "Recent lash work", all: "See every set" },
      treatments: {},
    },
    makeup: {
      name: "Makeup",
      blurb:
        "Grad, birthdays, photoshoots and events. Soft glam through to full glam.",
      meta: {
        title: "Grad and Event Makeup in Calgary",
        description:
          "Grad, bridal and event makeup in Calgary. Soft glam through to full glam, built to last a whole night and to photograph the way it looks in the mirror.",
      },
      eyebrow: "Built to last the night",
      headingLead: "Grad and event makeup",
      headingAccent: "in Calgary",
      lede: "Grad, bridal parties, photoshoots and birthdays across Calgary, soft glam through to full glam. It has to survive a whole evening and it has to photograph the way it looks in the mirror, which are two different problems.",
      cta: {
        eyebrow: "Tell me the occasion",
        headingLead: "Let's plan",
        headingAccent: "the look",
        lede: "Give me the date and roughly what you are after, and I will come back with a time.",
        book: "Book with Dani",
        instagram: "Message on Instagram",
      },
      empty: {
        heading: "Prices are being set",
        body: "I am putting the list together now. Tell me the occasion and roughly when, and I will come back with a price and a time.",
      },
      work: { heading: "Recent makeup", all: "See every set" },
      treatments: {},
    },
  },

  /**
   * Shared across the three service pages. The price itself never translates -
   * it is a shared fact and renders as `$65` in both languages - but the word
   * in front of an open-ended price does.
   */
  treatmentList: {
    priceFrom: "From",
    durationLabel: "Takes",
  },

  /**
   * Rendered twice from one source: as the visible list and as FAQPage
   * structured data. They cannot drift apart.
   *
   * The location answer deliberately gives no street address. She works by
   * appointment and publishing one is a privacy call nobody has made.
   */
  faq: {
    booking: {
      q: "How do I book?",
      a: "Send a DM on Instagram or use the form on the contact page. Tell me the service, roughly when suits you, and send a reference photo if you have one.",
    },
    duration: {
      q: "How long does a full set take?",
      a: "A gel manicure is about an hour. A full set with extensions and art runs two to three hours. Lash sets are around two hours, fills about an hour.",
    },
    location: {
      q: "Where are you located?",
      a: "Calgary, by appointment. The exact address goes out when your booking is confirmed.",
    },
    cancelling: {
      q: "What if I need to cancel?",
      a: "Let me know at least 24 hours before and it is no problem at all. Short notice cancellations make it hard to fill the slot, so please try.",
    },
    hair: {
      q: "Do you do hair?",
      a: "No. Nails, lashes and makeup only, and that is on purpose.",
    },
  },

  home: {
    hero: {
      eyebrow: "Calgary · by appointment",
      headingLead: "Nails that",
      headingAccent: "get noticed",
      sell: "Custom sets, lash extensions and event makeup. Trained in Colombia, booking now in Calgary. Bring a reference photo or let me build something for you.",
      book: "Book with Dani",
      seeWork: "See the work",
      /** Prose, not a link. The Instagram handle is not known yet. */
      dmNote: "Or send a DM on Instagram, whatever is easier",
    },
    services: {
      eyebrow: "What I do",
      heading: "Three things, done properly",
      lede: "No hair, no facials, no upsell. Nails, lashes and makeup, which is what the training was in and what the work is good at.",
      more: "See more",
    },
    story: {
      eyebrow: "Who is doing your nails",
      headingLead: "Trained in Colombia,",
      headingAccent: "working in Calgary",
      training:
        "I did my training in Colombia, where the standard for nail work is a lot higher than most people here expect. Shape, structure and cuticle work are the parts that decide whether a set still looks good in week three, and they are the parts I was drilled on.",
      building:
        "I am building this business from the ground up, which means you get the version of me that still cares enormously about every single set. Bring a photo from Pinterest, or sit down with no idea and we will work it out.",
    },
    faq: {
      eyebrow: "Before you book",
      heading: "The usual questions",
    },
    booking: {
      eyebrow: "Ready when you are",
      headingLead: "Let's do",
      headingAccent: "your set",
      lede: "Tell me what you are after and when. I will come back with a time.",
      book: "Book with Dani",
      instagram: "Message on Instagram",
    },
  },

  /**
   * The gallery page.
   *
   * `meta.title` carries Calgary and the three service terms itself, because
   * the layout's template only appends the business name and the title is the
   * headline Google shows. The H1 carries Calgary too.
   *
   * `count.other` holds a literal `{n}`, replaced at render. It is never shown
   * for zero: with no photos the empty state replaces the grid and the filter
   * row entirely, and a chip only exists for a service that has some.
   *
   * `images` is one alt string per photo, keyed. It is empty until her photos
   * are uploaded, and `data/gallery.ts` is typed off these keys.
   */
  gallery: {
    meta: {
      title: "Nail, Lash and Makeup Work in Calgary",
      description:
        "Real sets, never stock photos. Nail art, lash extensions and event makeup done in Calgary, shown big enough to judge the finish for yourself.",
    },
    eyebrow: "Every photo is mine",
    headingLead: "The work,",
    headingAccent: "done in Calgary",
    lede: "Big on purpose. You are choosing someone to sit with for two hours, and a thumbnail tells you nothing about a cuticle line.",
    filters: {
      label: "Filter by service",
      all: "All",
    },
    count: {
      one: "1 photo",
      other: "{n} photos",
    },
    empty: {
      heading: "Photos are on the way",
      body: "Nothing goes up here that is not my own work, so this page fills as I shoot. Tell me what you are after in the meantime and I will show you what I have.",
    },
    cta: {
      eyebrow: "The easy part",
      headingLead: "Seen one you",
      headingAccent: "want?",
      lede: "Send it to me and we will make it yours, or bring nothing and we will work it out together.",
      book: "Book with Dani",
      instagram: "Message on Instagram",
    },
    /**
     * Alt text describes the work, because that is what a visitor who cannot
     * see the photo is here to learn: the shape, the finish, the detail. It is
     * not a place for "nails Calgary". The same strings become the `name` of
     * each ImageObject in the page's structured data.
     */
    images: {
      frenchGlitterGems:
        "Almond nails with a white french tip, a fine glitter line along the smile and a cluster of crystals on the ring finger",
      nudeOvalGloss:
        "Short oval nails in a glossy nude pink, both hands resting on a black tray",
      burgundyCatEye:
        "Long almond nails in deep burgundy cat-eye chrome, the light catching a band across each nail",
      palePinkGloss:
        "Pale pink glossy oval nails, one hand resting over the other",
      peachFrenchGems:
        "Peach nails with a white french tip and small crystals set along the smile line",
      whiteGlitterSquare:
        "Square nails in white glitter with a single crystal accent",
      blueFrenchFloral:
        "Long square nails with a pale blue french tip, hand-painted white flowers and scattered crystals",
      pinkFloralArt:
        "Bright pink nails with small hand-painted white flowers on two fingers",
      pastelFrenchTips:
        "Square nails with pastel pink, yellow and green french tips, one colour per finger",
      lilacSquare: "Short square nails in a soft lilac, no art",
    },
  },
};

export type Dictionary = typeof en;
