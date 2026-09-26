import type { Dictionary } from "./en";

// Typed as Dictionary, so a missing key fails the build. No English fallback on purpose.
// Draft copy for Dani to approve before launch.
export const es: Dictionary = {
  meta: {
    title: "Uñas en Calgary, con cita o en tu fiesta - Glammed Beauty Studio",
    template: "%s - Glammed Beauty Studio",
    description:
      "Uñas de gel y acrílico en Calgary, con formación colombiana. ¿Organizas una fiesta de niños o adolescentes? Puedo ir y hacerles las uñas a los invitados.",
  },

  blurb:
    "Uñas en Calgary, con cita previa. Formación colombiana. También hago uñas en fiestas de niños y adolescentes.",

  marquee: ["Uñas", "Fiestas", "Calgary"],

  nav: {
    home: "Inicio",
    nails: "Uñas",
    parties: "Fiestas",
    lashes: "Pestañas",
    makeup: "Maquillaje",
    gallery: "El trabajo",
    logos: "Logos",
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
      contact: "Preguntas y eventos",
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
      meta: {
        title: "Uñas en gel y acrílico en Calgary",
        description:
          "Uñas en gel y acrílico en Calgary: sets completos, extensiones, chrome y arte pintado a mano. Forma, estructura y trabajo de cutícula que sigue viéndose bien en la tercera semana.",
      },
      eyebrow: "Forma, estructura, cutícula",
      headingLead: "Uñas, hechas",
      headingAccent: "como se debe",
      lede: "Uñas en gel y acrílico en Calgary: sets completos y rellenos, chrome y arte pintado a mano. Las partes que casi nadie mira son justo las que me enseñaron a hacer bien, y son las que deciden si un set sigue viéndose bien tres semanas después.",
      cta: {
        eyebrow: "Tráeme una foto",
        headingLead: "Armemos",
        headingAccent: "tu set",
        lede: "Mándame una referencia o siéntate sin ninguna idea. Las dos cosas funcionan.",
        book: "Reservar con Dani",
        instagram: "Escríbeme por Instagram",
      },
      empty: {
        heading: "Estoy definiendo los precios",
        body: "Estoy armando la lista ahora. Escríbeme y te digo exactamente cuánto te saldría tu set, sin sorpresas en la silla.",
      },
      work: { heading: "Trabajo reciente en uñas", all: "Ver todos los sets" },
      treatments: {
        gelManicure: "Manicure en gel",
        acrylicFullSet: "Set completo en acrílico",
        acrylicFill: "Relleno de acrílico",
        gelXFullSet: "Extensiones Gel-X, set completo",
        gelXFill: "Relleno de Gel-X",
        french: "Puntas francesas, adicional",
        chrome: "Chrome, adicional",
        nailArt: "Arte en uñas, adicional",
        removal: "Retiro de un set anterior",
      },
    },
    lashes: {
      name: "Pestañas",
      blurb:
        "Clásicas, híbridas y de volumen, diseñadas según la forma de tus ojos y no según una plantilla.",
      meta: {
        title: "Extensiones de pestañas en Calgary",
        description:
          "Extensiones de pestañas clásicas, híbridas y de volumen en Calgary, diseñadas según la forma de tus ojos y no según una plantilla. Rellenos cada dos a cuatro semanas.",
      },
      eyebrow: "Diseñadas para tus ojos",
      headingLead: "Extensiones de pestañas",
      headingAccent: "en Calgary",
      lede: "Clásicas, híbridas y de volumen. Cada set se diseña según la forma de tus ojos y tu línea de pestañas, no copiado de una plantilla, porque el mismo set no le queda igual a dos caras distintas. En Calgary, con cita previa y rellenos cada dos a cuatro semanas.",
      cta: {
        eyebrow: "Primer set o relleno",
        headingLead: "Diseñemos",
        headingAccent: "tus pestañas",
        lede: "Dime si las quieres discretas o bien marcadas y yo me encargo del resto.",
        book: "Reservar con Dani",
        instagram: "Escríbeme por Instagram",
      },
      empty: {
        heading: "Estoy definiendo los precios",
        body: "Estoy armando la lista ahora. Escríbeme con el look que buscas y te digo qué set te lo da y cuánto cuesta.",
      },
      work: {
        heading: "Trabajo reciente en pestañas",
        all: "Ver todos los sets",
      },
      treatments: {
        classicFullSet: "Set completo clásico",
        hybridFullSet: "Set completo híbrido",
        volumeFullSet: "Set completo de volumen",
        fill: "Relleno",
        removal: "Retiro de pestañas",
      },
    },
    makeup: {
      name: "Maquillaje",
      blurb:
        "Graduaciones, cumpleaños, sesiones de fotos y eventos. Desde soft glam hasta glam completo.",
      meta: {
        title: "Maquillaje de graduación y eventos en Calgary",
        description:
          "Maquillaje de graduación, novias y eventos en Calgary. Desde soft glam hasta glam completo, hecho para durar toda la noche y para verse en las fotos igual que en el espejo.",
      },
      eyebrow: "Hecho para durar la noche",
      headingLead: "Maquillaje de graduación y eventos",
      headingAccent: "en Calgary",
      lede: "Graduaciones, cortejos de novia, sesiones de fotos y cumpleaños en Calgary, desde soft glam hasta glam completo. Tiene que aguantar toda una noche y tiene que verse en las fotos igual que en el espejo, que son dos problemas distintos.",
      cta: {
        eyebrow: "Dime la ocasión",
        headingLead: "Planeemos",
        headingAccent: "el look",
        lede: "Dame la fecha y más o menos qué buscas, y te contesto con una hora.",
        book: "Reservar con Dani",
        instagram: "Escríbeme por Instagram",
      },
      empty: {
        heading: "Estoy definiendo los precios",
        body: "Estoy armando la lista ahora. Dime la ocasión y más o menos cuándo, y te contesto con un precio y una hora.",
      },
      work: { heading: "Maquillaje reciente", all: "Ver todos los sets" },
      treatments: {
        softGlam: "Soft glam, eventos y sesiones de fotos",
        fullGlam: "Full glam, graduación y prom, pestañas incluidas",
        bridalParty: "Cortejo nupcial, por persona",
        stripLashes: "Pestañas postizas, adicional",
      },
    },
  },

  contact: {
    meta: {
      title: "Reserva tu cita en Calgary",
      description:
        "Dime qué buscas y cuándo, y te contesto con una hora. Uñas, pestañas y maquillaje en Calgary, con cita previa. Te atiendo en español.",
    },
    eyebrow: "Sin depósito, sin cuenta, sin app",
    headingLead: "Dime qué",
    headingAccent: "quieres",
    lede: "Llena esto y me llega al correo. Contesto todos, casi siempre el mismo día, y no hay nada reservado hasta que acordemos una hora en Calgary que nos sirva a las dos.",

    direct: {
      heading: "¿Prefieres escribirme directo?",
      body: "También sirve, y es más rápido si ya sabes lo que quieres.",
      link: "Escríbeme por Instagram",
    },

    form: {
      name: "Tu nombre",
      email: "Correo",
      emailHint: "Para poder contestarte. No se manda nada más aquí.",
      service: "¿Qué estás buscando?",
      servicePlaceholder: "Todavía no sé",
      source: "¿Cómo me encontraste?",
      sourcePlaceholder: "Elige una",
      message: "¿Qué tienes en mente?",
      messageHint:
        "Fechas aproximadas, una foto de referencia que hayas visto, o simplemente cuál es la ocasión.",
      submit: "Enviar",
      submitting: "Enviando...",
      required: "Obligatorio",
    },

    sources: {
      instagram: "Instagram",
      google: "Google",
      friend: "Me contó una amiga",
      returning: "Ya he venido antes",
      other: "En otro lugar",
    },

    errors: {
      required: "Este hace falta.",
      email: "Eso no parece un correo.",
      tooShort: "Un poco más de detalle me ayuda a contestarte bien.",
      tooLong: "Eso es más largo de lo que acepta el formulario.",
    },

    failed:
      "Eso no se envió, y prefiero decírtelo a fingir que sí. Inténtalo otra vez en un momento.",
  },

  thankYou: {
    meta: {
      title: "Mensaje enviado",
      description: "Tu mensaje ya llegó. Te contesto pronto.",
    },
    eyebrow: "Ya quedó",
    headingLead: "Listo,",
    headingAccent: "gracias",
    lede: "Tu mensaje está en mi correo. Contesto todos, casi siempre el mismo día, y te vuelvo a escribir con una hora y un precio.",
    next: "Mientras tanto, vale la pena ver el resto del trabajo.",
    gallery: "Ver la galería",
    home: "Volver al inicio",
  },

  treatmentList: {
    priceFrom: "Desde",
    durationLabel: "Dura",
    book: "Reservar",
  },

  inspiration: {
    heading: "Inspiración",
    tag: "Inspiración",
    note: "Ideas para traer como referencia. Son fotos de stock, no mi trabajo.",
  },

  faq: {
    booking: {
      q: "¿Cómo reservo?",
      a: "Usa el formulario en la página de contacto. Dime qué servicio quieres, más o menos cuándo te viene bien, y mándame una foto de referencia si tienes una.",
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
    deposit: {
      q: "¿Tengo que dejar un depósito?",
      a: "No hay depósito. Reservas, vienes y pagas al final de la cita.",
    },
    payment: {
      q: "¿Cómo puedo pagar?",
      a: "En efectivo o con tarjeta, al final de la cita.",
    },
    firstVisit: {
      q: "Es mi primera vez. ¿Qué debería saber?",
      a: "Ven con las uñas sin nada, o cuéntame qué tienes puesto para planear el tiempo de retirarlo. Para pestañas, llega sin maquillaje en los ojos ni pestañina, evita el café antes para que los ojos estén quietos, y avísame si tienes alguna alergia, porque el pegamento de pestañas puede tener acrílico o látex. Trae una foto de referencia si tienes una, y cuenta con el tiempo completo de la cita.",
    },
    removalAndFills: {
      q: "¿Puedes quitar un set de otro salón, y cada cuánto necesito un relleno?",
      a: "Sí. El retiro está en la lista de precios de cada servicio; avísame cuando reserves para apartar el tiempo. Los rellenos de uñas son cada dos o tres semanas, y los de pestañas cada dos a cuatro.",
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
      sell: "Sets de gel y acrílico, con formación colombiana, tomando citas ahora en Calgary. Tráeme una foto de referencia o déjame crear algo para ti. ¿Organizas una fiesta de niños o adolescentes? Puedo ir y hacerles las uñas a los invitados.",
      nails: "Reservar uñas",
      party: "Uñas para tu fiesta",
      dmNote: "O mándame un DM por Instagram, lo que te sea más fácil",
    },
    nails: {
      eyebrow: "Uñas",
      headingLead: "Gel, acrílico y",
      headingAccent: "Gel-X en Calgary",
      lede: "Sets completos y rellenos, cromado, francés y arte a mano. Forma y trabajo de cutícula que siguen viéndose bien en la tercera semana.",
      addOns: "Agrega francés, cromado o arte a cualquier set.",
      more: "Ver el menú completo y reservar",
    },
    story: {
      eyebrow: "Quién te hace las uñas",
      headingLead: "Formada en Colombia,",
      headingAccent: "trabajando en Calgary",
      training:
        "Me formé en Colombia, donde el estándar del trabajo de uñas es bastante más alto de lo que la mayoría espera aquí. La forma, la estructura y el trabajo de cutícula son lo que decide si un set sigue viéndose bien en la tercera semana, y es justo lo que me enseñaron a hacer bien.",
      feeling:
        "Lo que más me importa es cómo te sientes cuando te vas. No solo que el set se vea bien, sino que salgas sintiéndote hermosa y segura de ti misma.",
    },
    work: {
      eyebrow: "Trabajo reciente",
      heading: "El trabajo, no la promesa",
      all: "Ver todo el trabajo",
    },

    jobTitle: "Artista de uñas",

    portraitAlt:
      "La artista, fotografiada en el salón donde trabaja, con una camiseta negra.",

    bilingual: {
      heading: "Tu cita puede ser en español",
      body: "No solo esta página. El español es mi primer idioma, así que la consulta, la conversación y el momento en el que cambias de opinión sobre el color pasan en el idioma en el que te sientas más cómoda. Una página traducida solo te dice que la puedes leer. Esto es yo diciéndote que te van a entender.",
    },

    parties: {
      eyebrow: "Fiestas",
      headingLead: "Uñas para",
      headingAccent: "tu fiesta",
      lede: "¿Organizas un cumpleaños o una reunión para niños o adolescentes? Tú haces la fiesta, yo voy y les hago las uñas a los invitados.",
      points: {
        host: {
          title: "Tú organizas, yo hago las uñas",
          body: "El pastel, los juegos y los invitados son tuyos. Yo armo una estación de uñas y voy atendiendo a los invitados.",
        },
        age: {
          title: "Pensado para su edad",
          body: "Diseños sencillos y lindos para los niños, sets más de moda para los adolescentes. Maquillaje si lo pides.",
        },
        ask: {
          title: "Pregunta primero",
          body: "Las fiestas no se reservan en línea. Mándame la fecha, cuántos invitados y la zona, y te confirmo por correo.",
        },
      },
      ask: "Pregunta por tu fiesta",
    },

    expect: {
      eyebrow: "En la silla",
      heading: "Lo que realmente pasa",
      steps: {
        arriving: {
          title: "Primero te miro las manos",
          body: "No la foto que trajiste. Lo que haces todo el día decide qué tan largo puede ser un set y cómo hay que construirlo, y esa conversación toma dos minutos y te ahorra una uña rota en la primera semana.",
        },
        during: {
          title: "Casi todo el tiempo se va antes del color",
          body: "Preparación, forma y estructura. Es la parte más aburrida de ver y es exactamente la razón por la que un set aguanta tres semanas en vez de una.",
        },
        after: {
          title: "Si algo se levanta, dime de una vez",
          body: "No lo aguantes y no lo arregles tú con lo que haya en el cajón. Escríbeme apenas lo notes y tráelo mientras todavía es un problema pequeño.",
        },
      },
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

  // No es objetivo de posicionamiento: el título se escribe para leerse bien.
  gallery: {
    meta: {
      title: "Mi trabajo en Calgary: uñas, pestañas y maquillaje",
      description:
        "Sets reales, nunca fotos de archivo. Arte de uñas, extensiones de pestañas y maquillaje para eventos hechos en Calgary, en grande para que juzgues el acabado.",
    },
    eyebrow: "Cada foto es mía",
    headingLead: "El trabajo,",
    headingAccent: "hecho en Calgary",
    lede: "En grande a propósito. Vas a elegir a alguien con quien te vas a sentar dos horas, y una miniatura no te dice nada de una línea de cutícula.",
    filters: {
      label: "Filtrar por servicio",
      all: "Todo",
    },
    count: {
      one: "1 foto",
      other: "{n} fotos",
    },
    empty: {
      heading: "Las fotos vienen en camino",
      body: "Aquí no sube nada que no sea trabajo mío, así que esta página se va llenando conforme voy fotografiando. Mientras tanto dime qué buscas y te muestro lo que tengo.",
    },
    cta: {
      eyebrow: "La parte fácil",
      headingLead: "¿Viste una que",
      headingAccent: "quieras?",
      lede: "Mándamela y la hacemos tuya, o ven sin nada y lo resolvemos juntas.",
      book: "Reservar con Dani",
      instagram: "Escríbeme por Instagram",
    },
    lightbox: {
      open: "Ver más grande: {photo}",
      close: "Cerrar",
      previous: "Foto anterior",
      next: "Siguiente foto",
      position: "Foto {current} de {total}",
    },
    images: {
      frenchGlitterGems:
        "Uñas almendradas con francesa blanca, una línea fina de glitter sobre la sonrisa y un grupo de cristales en el anular",
      burgundyCatEye:
        "Uñas almendradas largas en chrome cat-eye borgoña, con la luz marcando una banda en cada uña",
      palePinkGloss:
        "Uñas en rosa pálido brillante sobre dedos superpuestos",
      peachFrenchGems:
        "Uñas durazno con francesa blanca y cristales pequeños sobre la línea de la sonrisa",
      whiteGlitterSquare:
        "Uñas cuadradas largas en blanco, combinando acabado de glitter azucarado, textura tejida en relieve y francesa blanca, con escamas iridiscentes en dos uñas",
      blueFrenchFloral:
        "Uñas cuadradas largas con francesa azul claro, flores blancas pintadas a mano y cristales",
      pinkFloralArt:
        "Uñas rosa intenso con flores blancas pequeñas pintadas a mano en dos dedos",
      pastelFrenchTips:
        "Uñas cuadradas con francesas en pastel rosa, amarillo y verde, un color por dedo",
      lilacSquare:
        "Uñas cuadradas en lila perlado con brillo iridiscente, sin arte",
      christmasShortSet:
        "Uñas cortas con francesa roja, un moño de regalo pintado a mano, un copo de nieve y una raya de bastón de caramelo",
      whiteFlowerGoldFrench:
        "Uñas cuadradas con francesa blanca bordeada en dorado, una flor blanca en relieve en una uña y un pequeño dije dorado en otra",
      spiderAccentFrench:
        "Uñas cuadradas con francesa blanca, una uña naranja con una araña negra pintada y una letra dorada en la siguiente",
      heartsFrench:
        "Uñas cuadradas cortas con francesa blanca, corazones delineados, un grupo de cristales y una uña iridiscente",
      almondBowFrench:
        "Uñas almendradas con francesa blanca, perlas pequeñas y un moño rosa en relieve en una uña",
      pinkFrenchCrystals:
        "Uñas cuadradas con francesa rosa intenso, una línea de cristales en una uña y un acento rosa perlado",
      goldLeafFrench:
        "Primer plano de uñas cuadradas con hojuelas doradas, francesa blanca, estrellas blancas pintadas a mano y un diseño de hojas blancas",
      clearCoffinLinework:
        "Uñas coffin largas transparentes con líneas blancas finas y detalles de remolinos dorados",
      pinkBlackStars:
        "Uñas rosa y negro con estrellas pintadas a mano, una uña con manchas de leopardo y líneas finas de francesa",
      blueGraphicEyeProfile:
        "Maquillaje gráfico de perfil: una franja azul intensa sobre los ojos con estrellitas blancas y labios rosa",
      blueGraphicEyeTurned:
        "El mismo maquillaje gráfico azul con estrellas blancas, con la cabeza girada",
      softNaturalLookFront:
        "Maquillaje natural suave de frente: cejas definidas, delineado alado y labios nude",
      softNaturalLookSide:
        "Maquillaje natural suave de lado, con delineado alado y labios nude",
      colourSwatchArm:
        "Muestras de sombra en el brazo: un degradado de morado a naranja junto a un marrón cálido",
    },
  },
};
