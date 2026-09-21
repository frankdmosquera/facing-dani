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
    headings: {
      services: "Servicios",
      contact: "Contacto",
    },
    links: {
      nails: "Uñas",
      lashes: "Pestañas",
      makeup: "Maquillaje",
      gallery: "La galería",
      bookAppointment: "Reservar una cita",
      about: "Sobre mí",
      faq: "Preguntas frecuentes",
      instagram: "Instagram",
    },
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

  services: {
    nails: {
      name: "Uñas",
      blurb:
        "Gel, acrílico, extensiones y arte personalizado. Chrome, francesa, cat-eye, lo que me traigas.",
    },
    lashes: {
      name: "Pestañas",
      blurb:
        "Clásicas, híbridas y de volumen, diseñadas según la forma de tus ojos y no según una plantilla.",
    },
    makeup: {
      name: "Maquillaje",
      blurb:
        "Graduaciones, cumpleaños, sesiones de fotos y eventos. Desde soft glam hasta glam completo.",
    },
  },

  faq: {
    booking: {
      q: "¿Cómo reservo?",
      a: "Mándame un DM por Instagram o usa el formulario en la página de contacto. Dime qué servicio quieres, más o menos cuándo te viene bien, y mándame una foto de referencia si tienes una.",
    },
    duration: {
      q: "¿Cuánto dura un set completo?",
      a: "Una manicura en gel toma alrededor de una hora. Un set completo con extensiones y arte toma de dos a tres horas. Las pestañas alrededor de dos horas, los rellenos cerca de una.",
    },
    location: {
      q: "¿Dónde estás ubicada?",
      a: "En Calgary, con cita previa. La dirección exacta te llega cuando se confirma tu reserva.",
    },
    cancelling: {
      q: "¿Y si necesito cancelar?",
      a: "Avísame con al menos 24 horas de antelación y no hay ningún problema. Cancelar a última hora hace difícil llenar el espacio, así que por favor inténtalo.",
    },
    hair: {
      q: "¿Haces cabello?",
      a: "No. Solo uñas, pestañas y maquillaje, y es a propósito.",
    },
  },

  home: {
    hero: {
      eyebrow: "Calgary · con cita previa",
      headingLead: "Uñas que",
      headingAccent: "se notan",
      sell: "Sets personalizados, extensiones de pestañas y maquillaje para eventos. Con formación colombiana, tomando citas ahora en Calgary. Tráeme una foto de referencia o déjame crear algo para ti.",
      book: "Reservar con Dani",
      seeWork: "Ver el trabajo",
      dmNote: "O mándame un DM por Instagram, lo que te sea más fácil",
    },
    services: {
      eyebrow: "Lo que hago",
      heading: "Tres cosas, bien hechas",
      lede: "Nada de cabello, nada de faciales, nada de venderte de más. Uñas, pestañas y maquillaje, que es en lo que me formé y en lo que el trabajo es bueno.",
      more: "Ver más",
    },
    story: {
      eyebrow: "Quién te hace las uñas",
      headingLead: "Formada en Colombia,",
      headingAccent: "trabajando en Calgary",
      training:
        "Me formé en Colombia, donde el estándar del trabajo de uñas es bastante más alto de lo que la mayoría espera aquí. La forma, la estructura y el trabajo de cutícula son lo que decide si un set sigue viéndose bien en la tercera semana, y es justo en lo que me entrenaron.",
      building:
        "Estoy construyendo este negocio desde cero, lo que significa que recibes la versión de mí que todavía se preocupa muchísimo por cada set. Tráeme una foto de Pinterest, o siéntate sin ninguna idea y lo resolvemos juntas.",
    },
    faq: {
      eyebrow: "Antes de reservar",
      heading: "Las preguntas de siempre",
    },
    booking: {
      eyebrow: "Cuando tú quieras",
      headingLead: "Hagamos",
      headingAccent: "tu set",
      lede: "Dime qué buscas y cuándo. Te contesto con una hora.",
      book: "Reservar con Dani",
      instagram: "Escríbeme por Instagram",
    },
  },
};
