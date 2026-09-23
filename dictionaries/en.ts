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
    home: "Home",
    nails: "Nails",
    lashes: "Lashes",
    makeup: "Makeup",
    gallery: "The work",
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
      lede: "Gel and acrylic nails in Calgary: full sets and fills, chrome and hand-painted art. The parts most people never look at are the parts I was taught to get right, and they are what decide whether a set still looks good three weeks later.",
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
      treatments: {
        gelManicure: "Gel manicure",
        acrylicFullSet: "Acrylic full set",
        acrylicFill: "Acrylic fill",
        gelXFullSet: "Gel-X extensions, full set",
        gelXFill: "Gel-X fill",
        french: "French tips, add-on",
        chrome: "Chrome, add-on",
        nailArt: "Nail art, add-on",
        removal: "Removal of a previous set",
      },
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
      treatments: {
        classicFullSet: "Classic full set",
        hybridFullSet: "Hybrid full set",
        volumeFullSet: "Volume full set",
        fill: "Fill",
        removal: "Lash removal",
      },
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
      treatments: {
        softGlam: "Soft glam, events and photoshoots",
        fullGlam: "Full glam, grad and prom, lashes included",
        bridalParty: "Bridal party, per person",
        stripLashes: "Strip lashes, add-on",
      },
    },
  },

  /**
   * The contact page and its thank-you twin.
   *
   * The plan calls this form load-bearing for two separate reasons: it is the
   * booking route for anyone who will not DM, and `sources` is the only
   * attribution the site has. No analytics, no cookie banner.
   *
   * `errors` are keyed off what the zod schema returns, so a schema message and
   * a sentence a visitor reads are never the same string.
   */
  contact: {
    meta: {
      title: "Book a Set in Calgary",
      description:
        "Tell me what you are after and when, and I will come back with a time. Nails, lashes and makeup in Calgary, by appointment. Se habla espanol.",
    },
    eyebrow: "No deposit, no account, no app",
    headingLead: "Tell me what",
    headingAccent: "you want",
    lede: "Fill this in and it lands in my inbox. I answer every one, usually the same day, and nothing is booked until we have agreed a time in Calgary that works for both of us.",

    /**
     * The other half of the build-plan line. The page renders this band only
     * once the Instagram handle is known, the same rule the footer and every
     * BookingBand follow.
     */
    direct: {
      heading: "Would rather just message me?",
      body: "That works too, and it is faster if you already know what you want.",
      link: "Message on Instagram",
    },

    form: {
      name: "Your name",
      email: "Email",
      emailHint: "So I can reply. Nothing else is sent here.",
      service: "What are you after?",
      servicePlaceholder: "Not sure yet",
      source: "How did you find me?",
      sourcePlaceholder: "Pick one",
      message: "What are you thinking?",
      messageHint:
        "Rough dates, a reference photo you have seen, or just what the occasion is.",
      submit: "Send it",
      submitting: "Sending...",
      required: "Required",
    },

    sources: {
      instagram: "Instagram",
      google: "Google",
      friend: "A friend told me",
      returning: "I have been before",
      other: "Somewhere else",
    },

    errors: {
      required: "This one is needed.",
      email: "That does not look like an email address.",
      tooShort: "A little more detail would help me answer properly.",
      tooLong: "That is longer than the form can take.",
    },

    /**
     * The form-level failure, in words rather than an error code. It used to
     * offer DMs as the way through. With no Instagram account and no public
     * email there is no second route to name, so it names none rather than a
     * dead one.
     */
    failed:
      "That did not send, and I would rather tell you than pretend it did. Try again in a moment.",
  },

  thankYou: {
    meta: {
      title: "Message Sent",
      description: "Your enquiry is in. I will come back to you shortly.",
    },
    eyebrow: "That is in",
    headingLead: "Got it,",
    headingAccent: "thank you",
    lede: "Your message is in my inbox. I answer every one, usually the same day, and I will come back with a time and a price.",
    next: "While you wait, the rest of the work is worth a look.",
    gallery: "See the gallery",
    home: "Back to the start",
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
   * The stock grid on each service page. The note is not optional: without it
   * the heading alone could read as her portfolio. No key per image, on
   * purpose - see `data/decorativeImages.ts`.
   */
  inspiration: {
    heading: "Inspiration",
    note: "Looks to bring in as a reference. These are stock photos, not my work.",
  },

  /**
   * Rendered twice from one source: as the visible list and as FAQPage
   * structured data. They cannot drift apart.
   *
   * The location answer deliberately gives no street address. She works by
   * appointment and publishing one is a privacy call nobody has made.
   */
  faq: {
    /**
     * Names only the form, because there is no Instagram account yet. When
     * `siteConfig.social.instagram` is set, this answer should offer DMs again.
     */
    booking: {
      q: "How do I book?",
      a: "Use the form on the contact page. Tell me the service, roughly when suits you, and send a reference photo if you have one.",
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
    deposit: {
      q: "Do I need to pay a deposit?",
      a: "No deposit. You book, you come in, and you pay at the end of the appointment.",
    },
    payment: {
      q: "How can I pay?",
      a: "Cash or card, at the end of the appointment.",
    },
    firstVisit: {
      q: "It is my first time. What should I know?",
      a: "Come with bare nails, or tell me what is on them so I can plan time to take it off. For lashes, arrive with no eye makeup or mascara, skip the coffee beforehand so your eyes stay still, and tell me about any allergies, because lash glue can contain acrylic or latex. Bring a reference photo if you have one, and plan for the full appointment time.",
    },
    removalAndFills: {
      q: "Can you take off a set from another salon, and how often do I need a fill?",
      a: "Yes. Removal is on the price list for each service; mention it when you book so the time is set aside. Nail fills are every two to three weeks, lash fills every two to four.",
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
      /** Rendered only once `siteConfig.social.instagram` is set. */
      dmNote: "Or send a DM on Instagram, whatever is easier",
    },
    services: {
      eyebrow: "What I do",
      heading: "Three things, done properly",
      lede: "No hair, no facials, no upsell. Nails, lashes and makeup, which is what the training was in and what the work is good at.",
      more: "See more",
    },
    story: {
      lede: "A new business has no reviews, no word of mouth and nothing to point at except the work and the person doing it. So here is the person, and where the way I work comes from.",
      eyebrow: "Who is doing your nails",
      headingLead: "Trained in Colombia,",
      headingAccent: "working in Calgary",
      training:
        "I did my training in Colombia, where the standard for nail work is a lot higher than most people here expect. Shape, structure and cuticle work are the parts that decide whether a set still looks good in week three, and they are the parts I was taught to get right.",
      building:
        "Since then I have been doing sets for family and friends constantly, and now I am building this into something of my own. What that means for you is the version of me that still cares enormously about every single set. Bring a photo from Pinterest, or sit down with no idea and we will work it out.",
      feeling:
        "What I care about most is how you feel when you leave. Not just that the set looks good, but that you walk out feeling beautiful and sure of yourself.",
    },
    /**
     * The shop window. Its heading is deliberately not "Gallery": the link says
     * where it goes, and the heading says what is in it.
     */
    work: {
      eyebrow: "Recent sets",
      heading: "The work, not the promise",
      all: "See all the work",
    },

    /** Schema only, never rendered: what she is, not what the page is called. */
    jobTitle: "Nail, lash and makeup artist",

    portraitAlt:
      "The artist, photographed in the salon where she works, wearing a black t-shirt.",

    /**
     * The bilingual promise, said out loud. This is a locked contract from the
     * project plan: a translated site tells a visitor she can read it, a fluent
     * artist tells her she can have the whole appointment in Spanish. Leaving it
     * implied by a /es URL is exactly what this section exists to prevent.
     *
     * The Spanish version is not a translation of this. It is the same promise
     * written for someone who is already reading in Spanish, because a promise
     * about fluency delivered in stilted Spanish disproves itself.
     */
    bilingual: {
      heading: "Your appointment can be in Spanish",
      body: "Not just this website. Spanish is my first language, so the consultation, the small talk, and the part where you change your mind about the colour all happen in whichever language you are more comfortable in. A translated page only tells you that you can read it. This is me telling you that you will be understood.",
    },

    /**
     * What actually happens in the chair. Deliberately not a second FAQ: the
     * FAQ below owns booking, duration, location and cancellation, and none of
     * those answers are repeated here.
     *
     * Keyed rather than an array, for the reason `data/faq.ts` gives - an array
     * with a missing Spanish entry would compile and ship.
     */
    expect: {
      eyebrow: "In the chair",
      heading: "What actually happens",
      steps: {
        arriving: {
          title: "First, I look at your hands",
          body: "Not at the photo you brought. What you do all day decides how long a set can be and how it has to be built, and that conversation takes two minutes and saves you a broken nail in week one.",
        },
        during: {
          title: "Most of the time goes before any colour",
          body: "Prep, shape and structure. It is the least interesting part to watch and the entire reason a set survives three weeks instead of one.",
        },
        after: {
          title: "If something lifts, tell me early",
          body: "Do not wait it out and do not fix it yourself with whatever is in the drawer. Message me as soon as you notice and bring it in while it is still a small problem.",
        },
      },
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
    lightbox: {
      open: "Open larger: {photo}",
      close: "Close",
      previous: "Previous photo",
      next: "Next photo",
      position: "Photo {current} of {total}",
    },
    images: {
      frenchGlitterGems:
        "Almond nails with a white french tip, a fine glitter line along the smile and a cluster of crystals on the ring finger",
      burgundyCatEye:
        "Long almond nails in deep burgundy cat-eye chrome, the light catching a band across each nail",
      palePinkGloss:
        "Glossy pale pink nails on overlapping fingers",
      peachFrenchGems:
        "Peach nails with a white french tip and small crystals set along the smile line",
      whiteGlitterSquare:
        "Long square nails in white, mixing a sugar-glitter finish, a raised knitted texture and a white french tip, with iridescent flakes on two nails",
      blueFrenchFloral:
        "Long square nails with a pale blue french tip, hand-painted white flowers and scattered crystals",
      pinkFloralArt:
        "Bright pink nails with small hand-painted white flowers on two fingers",
      pastelFrenchTips:
        "Square nails with pastel pink, yellow and green french tips, one colour per finger",
      lilacSquare:
        "Square nails in a pearly lilac with an iridescent shimmer, no nail art",
    },
  },
};

export type Dictionary = typeof en;
