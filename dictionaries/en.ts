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

  footer: {
    services: "Services",
    contact: "Get in touch",
    gallery: "The gallery",
    bookAppointment: "Book an appointment",
    about: "About",
    faq: "FAQ",
    instagram: "Instagram",
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
