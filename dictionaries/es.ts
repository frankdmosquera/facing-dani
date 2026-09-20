import type { Dictionary } from "./en";

/**
 * The annotation is the whole mechanism. A key that exists in `en` and is
 * missing or misspelled here is a TypeScript error, and `next build` runs
 * TypeScript, so the build fails.
 *
 * There is deliberately no fallback to English. A page that quietly renders
 * half in one language is worse than one that refuses to build, and it is the
 * exact way a bilingual site rots without anyone noticing.
 *
 * Draft copy, written to be corrected. Dani is a native speaker and these
 * strings are hers to approve before launch - "trained in Colombia" in
 * particular is a sales line, not a sentence to translate literally.
 */
export const es: Dictionary = {
  meta: {
    title: "Dani Moreno - Uñas, Pestañas y Maquillaje en Calgary",
    template: "%s - Dani Moreno",
    description:
      "Uñas, pestañas y maquillaje en Calgary, con formación colombiana. Forma, estructura y trabajo de cutícula que sigue viéndose bien en la tercera semana. Te atiendo en español.",
  },

  blurb:
    "Uñas, pestañas y maquillaje en Calgary. Formación colombiana. Con cita previa.",

  nav: {
    nails: "Uñas",
    lashes: "Pestañas",
    makeup: "Maquillaje",
    gallery: "El trabajo",
    about: "Sobre mí",
  },

  cta: {
    book: "Reservar",
  },

  footer: {
    services: "Servicios",
    contact: "Contacto",
    gallery: "La galería",
    bookAppointment: "Reservar una cita",
    about: "Sobre mí",
    faq: "Preguntas frecuentes",
    instagram: "Instagram",
  },

  a11y: {
    skipToContent: "Saltar al contenido",
    mainNav: "Principal",
    openMenu: "Menú",
    closeMenu: "Cerrar menú",
    homeSuffix: "inicio",
  },

  languageSwitch: {
    to: "English",
    label: "View this site in English",
  },
};
