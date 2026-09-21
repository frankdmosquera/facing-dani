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
   * Service names and blurbs. Prices and treatments are item 5 and live with
   * the service data, not here.
   */
  services: {
    nails: {
      name: "Nails",
      blurb:
        "Gel, acrylic, extensions and custom art. Chrome, french, cat-eye, whatever you bring me.",
    },
    lashes: {
      name: "Lashes",
      blurb:
        "Classic, hybrid and volume sets, mapped to your eye shape rather than a template.",
    },
    makeup: {
      name: "Makeup",
      blurb:
        "Grad, birthdays, photoshoots and events. Soft glam through to full glam.",
    },
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
};

export type Dictionary = typeof en;
