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
};

export type Dictionary = typeof en;
