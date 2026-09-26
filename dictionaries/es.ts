import type { Dictionary } from "./en";

// Typed as Dictionary, so a missing key fails the build. No English fallback on purpose.
// Draft copy for Dani to approve before launch.
export const es: Dictionary = {
  meta: {
    title: "Uñas en Calgary, con cita o en tu fiesta - Glammed Beauty Studio",
    template: "%s - Glammed Beauty Studio",
    description:
      "Uñas de gel y acrílico en Calgary, con formación colombiana. ¿Organizas una fiesta de niños o adolescentes? Puedo ir con uñas, pintura facial y maquillaje para los invitados.",
  },

  blurb:
    "Uñas en Calgary, con cita previa. Formación colombiana. También voy a fiestas de niños y adolescentes.",

  marquee: ["Uñas", "Fiestas", "Calgary"],

  nav: {
    home: "Inicio",
    nails: "Uñas",
    parties: "Fiestas",
    about: "Sobre mí",
    store: "Tienda",
    lashes: "Pestañas",
    makeup: "Maquillaje",
    gallery: "Galería",
    contact: "Contacto",
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
      parties: "Fiestas",
      store: "Tienda",
      lashes: "Pestañas",
      makeup: "Maquillaje",
      gallery: "Galería",
      bookAppointment: "Reservar una cita",
      contact: "Preguntas y fiestas",
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
      menuHeading: "Precios de uñas en Calgary",
      work: { heading: "Trabajo reciente en uñas", all: "Ver todos los sets" },
      guide: {
        eyebrow: "Qué set es para ti",
        headingLead: "Gel, acrílico",
        headingAccent: "o Gel‑X",
        lede: "Tres maneras de tener las uñas que quieres. ¿No sabes cuál? Mándame una foto de lo que buscas y te digo qué reservar.",
        ask: "Pregúntame primero",
        kinds: {
          gel: {
            name: "Manicure en gel",
            tag: "Tus propias uñas",
            body: "Esmalte en gel sobre tus uñas naturales, curado con lámpara. Brillante, no se descascara y no agrega largo. La opción si tus uñas ya tienen el largo que te gusta.",
            lasts: "Dura unas dos a tres semanas.",
          },
          acrylic: {
            name: "Acrílico",
            tag: "Largo y resistencia",
            body: "Acrílico construido sobre tu uña o sobre un tip y moldeado a mano. La opción más resistente, y la de las formas largas y esculpidas.",
            lasts: "Un relleno cada dos a tres semanas.",
          },
          gelX: {
            name: "Gel‑X",
            tag: "Largo, más liviano",
            body: "Tips de gel suave que cubren toda la uña, pegados con gel. Más livianos que el acrílico, más rápidos de poner y más suaves de retirar.",
            lasts: "Un relleno cada dos a tres semanas.",
          },
        },
      },
      steps: {
        eyebrow: "Tu cita",
        headingLead: "Una cita de uñas,",
        headingAccent: "paso a paso",
        lede: "Por qué un set completo toma unas dos horas, y en qué se va ese tiempo. Un manicure en gel no lleva construcción y toma más o menos una.",
        items: {
          talk: {
            title: "Miramos tus manos y tu foto",
            time: "Unos 5 minutos",
            body: "Lo que haces todo el día decide qué tan largo puede ser un set y qué forma va a aguantar. El largo, la forma y el color quedan definidos antes de empezar.",
          },
          removal: {
            title: "Retiro, si vienes con un set puesto",
            time: "Unos 30 minutos",
            body: "El set anterior se remoja y se lima con cuidado, nunca se arranca. Avísame cuando reserves para que haya tiempo.",
          },
          prep: {
            title: "Preparación",
            time: "Unos 15 minutos",
            body: "Cutículas empujadas y limpias, la superficie pulida suave y deshidratada. Casi todo levantamiento empieza por una preparación a medias, así que esta parte nunca va con prisa.",
          },
          build: {
            title: "Construcción y forma",
            time: "Unos 45 a 60 minutos",
            body: "Se pone el acrílico o el Gel‑X, y luego cada uña se lima al mismo largo y la misma forma, con el punto más grueso donde la uña necesita resistencia.",
          },
          colour: {
            title: "Color y arte",
            time: "Unos 20 a 40 minutos",
            body: "El color en gel, y después francesa, chrome, cat-eye o arte a mano si lo pediste. Cada capa se cura en la lámpara.",
          },
          finish: {
            title: "Top coat, aceite y cuidados",
            time: "Unos 10 minutos",
            body: "Un top coat para el brillo, aceite de cutícula y un par de consejos para que el set se vea bien hasta tu relleno.",
          },
        },
      },
      faq: {
        eyebrow: "Antes de tu set",
        headingLead: "Preguntas sobre",
        headingAccent: "uñas",
        items: {
          lasting: {
            q: "¿Cuánto duran las uñas de gel y de acrílico?",
            a: "Un manicure en gel dura unas dos a tres semanas antes de que se note el crecimiento. El acrílico y el Gel‑X duran mientras hagas los rellenos, cada dos a tres semanas, porque el set avanza a medida que crece tu uña.",
          },
          shortNails: {
            q: "¿Me puedo hacer un set si tengo las uñas muy cortas o mordidas?",
            a: "Casi siempre, sí. El acrílico y el Gel‑X agregan largo sobre una uña corta. Si el lecho de la uña es muy pequeño, al principio aguanta mejor un largo corto y natural, y en el siguiente relleno se puede ir más largo.",
          },
          damage: {
            q: "¿El acrílico daña las uñas naturales?",
            a: "El daño que se le echa al acrílico viene casi siempre de limar de más y de arrancar o despegar el set. Limado con cuidado y retirado como se debe, las uñas de abajo quedan sanas.",
          },
          length: {
            q: "¿Cómo elijo el largo y la forma?",
            a: "Empieza por lo que hacen tus manos todo el día. Cuadrada u ovalada corta va bien para escribir en el computador y para las tareas de la casa, almendra es resistente para el día a día en largo medio, y coffin necesita largo y es para un set llamativo. ¿No sabes cuál? Trae una foto y lo decidimos juntas.",
          },
          broken: {
            q: "¿Y si se me rompe o se me levanta una uña?",
            a: "Escríbeme apenas pase. No la pegues ni la despegues en casa: si arrancas una esquina levantada, se lleva una capa de tu propia uña.",
          },
          reference: {
            q: "¿Puedo traer una foto de Instagram o Pinterest?",
            a: "Sí, por favor. Una foto es la forma más rápida de mostrar una forma, un color o un diseño. Te digo si hay que ajustar algo para el largo de tus uñas, y el arte se cobra como el adicional de arte en uñas.",
          },
        },
      },
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
      menuHeading: "Precios de pestañas en Calgary",
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
      menuHeading: "Precios de maquillaje en Calgary",
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
      title: "Preguntas y fiestas en Calgary",
      description:
        "Pregúntame lo que quieras, o cuéntame de la fiesta que organizas en Calgary: la fecha, cuántos invitados y la zona. Contesto todos los mensajes, casi siempre el mismo día. Te atiendo en español.",
    },
    eyebrow: "Preguntas y fiestas",
    headingLead: "Dime qué",
    headingAccent: "necesitas",
    lede: "Pregúntame lo que quieras, o cuéntame de una fiesta que estás organizando. Me llega al correo y contesto todos, casi siempre el mismo día. Para reservar una cita de uñas es más rápido desde la página de uñas.",

    direct: {
      heading: "¿Prefieres escribirme directo?",
      body: "También sirve, y es más rápido si ya sabes lo que quieres.",
      link: "Escríbeme por Instagram",
    },

    form: {
      name: "Tu nombre",
      email: "Correo",
      emailHint: "Para poder contestarte. No se manda nada más aquí.",
      topic: "¿De qué se trata?",
      topicPlaceholder: "Elige una",
      partyKind: "¿Qué tipo de fiesta?",
      partyDate: "Fecha",
      guests: "¿Cuántos invitados?",
      guestsHint: "Más o menos está bien.",
      area: "Zona de Calgary",
      areaHint: "Con el barrio basta por ahora.",
      source: "¿Cómo me encontraste?",
      sourcePlaceholder: "Elige una",
      message: "¿Qué tienes en mente?",
      messageHint: "Tu pregunta, o una foto de referencia que hayas visto.",
      messageHintParty: "Sus edades, el estilo que buscan, lo que deba saber.",
      submit: "Enviar",
      submitting: "Enviando...",
      required: "Obligatorio",
    },

    topics: {
      party: "Una fiesta que organizo",
      question: "Una pregunta",
      product: "Un producto de la tienda",
      other: "Otra cosa",
    },

    partyKinds: {
      birthday: "Cumpleaños",
      school: "Evento escolar",
      other: "Otra cosa",
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
      date: "Elige la fecha de la fiesta.",
      guests: "Un número del 1 al 50, por favor.",
    },

    failed:
      "Eso no se envió, y prefiero decírtelo a fingir que sí. Inténtalo otra vez en un momento.",
  },

  partiesPage: {
    meta: {
      title: "Uñas, pintura facial y maquillaje para fiestas en Calgary",
      description:
        "¿Organizas un cumpleaños o un evento escolar en Calgary? Voy a tu fiesta con uñas, pintura facial y maquillaje para los invitados: sencillo y divertido para niños, más de moda para adolescentes.",
    },
    serviceType: "Uñas, pintura facial y maquillaje para fiestas",
    eyebrow: "Fiestas en Calgary",
    headingLead: "Uñas y más para",
    headingAccent: "tu fiesta",
    lede: "¿Organizas un cumpleaños, una pijamada o un evento escolar para niños o adolescentes? Tú haces la fiesta. Yo llego, armo mi estación y les hago uñas, pintura facial y maquillaje a los invitados.",
    ask: "Pregunta por tu fiesta",
    what: {
      eyebrow: "Lo que hago allí",
      heading: "Mi parte, y solo mi parte",
      points: {
        host: {
          title: "Tú organizas",
          body: "El pastel, los juegos, los invitados y el lugar son tuyos. Yo soy una cosa ese día, no toda la fiesta.",
        },
        nails: {
          title: "Yo hago la belleza",
          body: "Uñas, pintura facial y maquillaje, un look para cada invitado. Sencillo y divertido para niños, sets y maquillaje más de moda para adolescentes.",
        },
        extras: {
          title: "Pestañas si las pides",
          body: "Para los invitados mayores que las quieran, puedo agregar pestañas. Menciónalo cuando preguntes.",
        },
      },
    },
    how: {
      eyebrow: "Cómo funciona",
      heading: "Tres pasos, sin sistema de reservas",
      steps: {
        ask: {
          title: "Cuéntame de la fiesta",
          body: "La fecha, cuántos invitados y la zona de Calgary, desde el formulario de contacto. Sus edades también ayudan.",
        },
        confirm: {
          title: "Te confirmo por correo",
          body: "Reviso la fecha y te contesto con los detalles, para que sepas exactamente qué esperar.",
        },
        day: {
          title: "Ese día, llego a la fiesta",
          body: "Me instalo, atiendo a los invitados y recojo cuando termino. El resto de la fiesta sigue siendo tuyo.",
        },
      },
    },
    closing: {
      eyebrow: "¿Ya tienes fecha?",
      headingLead: "Hagamos que",
      headingAccent: "brille",
      lede: "Mándame la fecha, el número de invitados y la zona, y te contesto, casi siempre el mismo día.",
    },
  },

  about: {
    meta: {
      title: "Sobre Dani, artista de uñas en Calgary",
      description:
        "Formada en Colombia, haciendo uñas en Calgary con cita previa y en fiestas de niños y adolescentes. Quién te hace las uñas, y por qué el acabado me importa.",
    },
    eyebrow: "Sobre mí",
    headingLead: "Quién te hace",
    headingAccent: "las uñas",
    lede: "Un negocio nuevo no tiene reseñas, no tiene voz a voz y no tiene nada que mostrar aparte del trabajo y de quien lo hace. Así que aquí estoy yo, y de dónde viene mi manera de trabajar.",
    sections: {
      training: {
        heading: "Formada en Colombia",
        body: "Me formé en Colombia, donde el estándar del trabajo de uñas es bastante más alto de lo que la mayoría espera aquí. La forma, la estructura y el trabajo de cutícula son lo que decide si un set sigue viéndose bien en la tercera semana, y es justo lo que me enseñaron a hacer bien.",
      },
      building: {
        heading: "Construyendo algo mío",
        body: "Desde entonces no he parado de hacerle las uñas a mi familia y a mis amigas, y ahora estoy construyendo esto como algo mío. Lo que eso significa para ti es que recibes la versión de mí que todavía se preocupa muchísimo por cada set. Tráeme una foto de Pinterest, o siéntate sin ninguna idea y lo resolvemos juntas.",
      },
      parties: {
        heading: "También fiestas",
        body: "Además de las citas, voy a fiestas de niños y adolescentes con uñas, pintura facial y maquillaje para los invitados. Tú organizas la fiesta; yo llevo mi estación y hago mi parte.",
      },
      spanish: {
        heading: "En inglés o en español",
        body: "El español es mi primer idioma, así que tu cita puede ser en el idioma en que te sientas más cómoda.",
      },
    },
    feeling:
      "Lo que más me importa es cómo te sientes cuando te vas. No solo que el set se vea bien, sino que salgas sintiéndote hermosa y segura de ti misma.",
    nails: "Ver el menú de uñas",
    party: "Para tu fiesta",
  },

  store: {
    meta: {
      title: "Uñas press-on y cuidado de uñas en Calgary",
      description:
        "Sets de uñas press-on hechos en Calgary, listos o a tu medida, además de aceite de cutícula, limas de vidrio y kits de cuidado. Venta en persona, sin envíos.",
    },
    eyebrow: "Tienda",
    headingLead: "Press-ons y",
    headingAccent: "cuidado de uñas",
    lede: "Sets press-on que hago yo, y el cuidado que mantiene cualquier set bonito entre citas. Agrégalo a tu cita, o pregúntame y lo recoges.",
    tabsLabel: "Productos por tipo",
    stockTag: "Foto de archivo",
    all: "Todo",
    categories: {
      pressOns: "Press-ons",
      nailCare: "Cuidado de uñas",
    },
    products: {
      readyPressOns: {
        name: "Set press-on listo",
        body: "Uno de mis diseños, con varias tallas en cada caja para que le quede a casi cualquier mano.",
      },
      customPressOns: {
        name: "Set press-on a tu medida",
        body: "Hecho a tus tallas y con tu diseño. Mándame una foto de lo que quieres y yo lo mido y lo armo.",
      },
      cuticleOilPen: {
        name: "Aceite de cutícula en lápiz",
        body: "Un lápiz que cabe en la cartera. Un poco cada día mantiene las cutículas suaves y hace que el set dure.",
      },
      cuticleOilBottle: {
        name: "Aceite de cutícula, 15 ml",
        body: "El frasco con pincel, para la casa. El mismo trabajo, en más cantidad.",
      },
      glassFile: {
        name: "Lima de vidrio",
        body: "Lima suave y se lava fácil. Dura años, no como una lima de cartón.",
      },
      careKit: {
        name: "Kit de cuidado de uñas",
        body: "Aceite de cutícula, una lima de vidrio y un pulidor. Lo que mantiene un set bonito en la tercera semana.",
      },
    },
    buy: {
      heading: "Cómo comprar",
      body: "Sin carrito y sin envíos. Agrégalo a tu cita cuando reserves, o pregúntame y lo recoges en Calgary.",
      ask: "Pregunta por un producto",
    },
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
      a: "Abre la página de uñas, toca Reservar junto al tratamiento que quieres y elige una hora en el calendario. ¿Tienes preguntas antes? La página de contacto siempre está abierta.",
    },
    parties: {
      q: "¿Puedes ir a una fiesta?",
      a: "Sí, con mi estación en una fiesta que tú organizas, para niños o adolescentes: uñas, pintura facial y maquillaje. Las fiestas no se reservan en línea: mándame la fecha, cuántos invitados y la zona desde la página de contacto, y te confirmo por correo.",
    },
    duration: {
      q: "¿Cuánto dura un set completo?",
      a: "Una manicura en gel toma alrededor de una hora. Un set completo con extensiones y arte toma de dos a tres horas, y un relleno cerca de una hora y media.",
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
      a: "Ven con las uñas sin nada, o cuéntame qué tienes puesto para planear el tiempo de retirarlo. Trae una foto de referencia si tienes una, y cuenta con el tiempo completo de la cita. ¿Vas a reservar pestañas? Llega sin maquillaje en los ojos y avísame si tienes alguna alergia, porque el pegamento de pestañas puede tener acrílico o látex.",
    },
    removalAndFills: {
      q: "¿Puedes quitar un set de otro salón, y cada cuánto necesito un relleno?",
      a: "Sí. El retiro está en la lista de precios de uñas; avísame cuando reserves para apartar el tiempo. Los rellenos son cada dos o tres semanas.",
    },
    hair: {
      q: "¿Haces cabello?",
      a: "No. Lo mío son las uñas, con maquillaje y pestañas si los pides, y es a propósito.",
    },
  },

  home: {
    hero: {
      eyebrow: "Calgary · con cita previa",
      headingLead: "Uñas que",
      headingAccent: "se notan",
      sell: "Sets de gel y acrílico, con formación colombiana, tomando citas ahora en Calgary. Tráeme una foto de referencia o déjame crear algo para ti. ¿Organizas una fiesta de niños o adolescentes? Puedo ir con uñas, pintura facial y maquillaje para los invitados.",
      nails: "Reservar uñas",
      party: "Para tu fiesta",
      dmNote: "O mándame un DM por Instagram, lo que te sea más fácil",
    },
    nails: {
      eyebrow: "Uñas",
      headingLead: "Gel, acrílico y",
      headingAccent: "Gel‑X en Calgary",
      lede: "Sets completos y rellenos, cromado, francés y arte a mano. Forma y trabajo de cutícula que siguen viéndose bien en la tercera semana.",
      addOns: "Agrega francés, cromado o arte a cualquier set.",
      more: "Ver el menú completo y reservar",
    },
    story: {
      eyebrow: "Quién te hace las uñas",
      headingLead: "Formada en Colombia,",
      headingAccent: "trabajando en Calgary",
      intro:
        "Aprendí uñas en Colombia, donde el acabado lo es todo, y ahora hago sets en Calgary, en inglés o en español.",
      more: "Más sobre mí",
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
      headingLead: "Uñas y más para",
      headingAccent: "tu fiesta",
      lede: "¿Organizas un cumpleaños o una reunión para niños o adolescentes? Tú haces la fiesta, yo llego y me encargo de los invitados: uñas, pintura facial, maquillaje, y pestañas para los mayores.",
      points: {
        host: {
          title: "Tú organizas, yo hago la belleza",
          body: "El pastel, los juegos y los invitados son tuyos. Yo armo mi estación y voy atendiendo a los invitados.",
        },
        age: {
          title: "Pensado para su edad",
          body: "Pintura facial y uñas sencillas y lindas para los niños. Sets más de moda, maquillaje y pestañas para los adolescentes.",
        },
        ask: {
          title: "Pregunta primero",
          body: "Las fiestas no se reservan en línea. Mándame la fecha, cuántos invitados y la zona, y te confirmo por correo.",
        },
      },
      ask: "Pregunta por tu fiesta",
    },

    guide: {
      eyebrow: "Guía de uñas",
      headingLead: "Formas, acabados",
      headingAccent: "y cuidado",
      lede: "Una guía rápida de qué pedir, y de cómo mantenerlo bonito cuando te vas.",
      storeLink: "Aceite de cutícula en la tienda",
      columns: {
        shapes: {
          heading: "Formas",
          items: {
            almond: { term: "Almendra", text: "Lados que se afinan y punta redondeada. Estiliza los dedos y aguanta el día a día." },
            coffin: { term: "Coffin", text: "Larga, con lados rectos y punta plana. La forma de los sets llamativos, y necesita largo, así que acrílico o Gel‑X." },
            square: { term: "Cuadrada", text: "Lados rectos y borde plano. Fácil de llevar corta, y la punta luce muy bien con francés." },
            oval: { term: "Ovalada", text: "Suave y redondeada. El look más natural, y la que menos se engancha." },
          },
        },
        finishes: {
          heading: "Acabados",
          items: {
            chrome: { term: "Cromado", text: "Un polvo espejo o perlado pulido sobre el gel, para que toda la uña refleje la luz." },
            french: { term: "Francés", text: "Una línea limpia en la punta, blanca clásica o de cualquier color, gruesa o micro." },
            catEye: { term: "Ojo de gato", text: "Gel magnético que forma una franja de brillo sobre la uña, como luz moviéndose en terciopelo." },
            sparkle: { term: "Glitter y piedras", text: "Glitter fino, una línea brillante en la sonrisa, o cristales en una uña de acento." },
            art: { term: "Arte a mano", text: "Flores, corazones, líneas, estrellas. Trae una foto de referencia y se arma para tus uñas." },
          },
        },
        care: {
          heading: "Que dure",
          items: {
            oil: { term: "Aceite de cutícula a diario", text: "Las uñas hidratadas se doblan en vez de romperse, y el set sigue brillante en los bordes." },
            gloves: { term: "Guantes para limpiar", text: "El agua caliente y los productos de limpieza son lo que levanta un set antes de tiempo." },
            tools: { term: "Las uñas no son herramientas", text: "Abre latas y despega etiquetas con otra cosa. Así es como se rompen las puntas." },
            lifting: { term: "Nunca arranques una esquina", text: "Si despegas una esquina levantada, se lleva una capa de tu uña natural. Escríbeme y lo arreglamos." },
            fills: { term: "Relleno cada dos o tres semanas", text: "Mientras tu uña crece, el relleno mantiene el equilibrio para que el set no se quiebre." },
          },
        },
      },
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
      title: "Mi trabajo en Calgary: arte y sets de uñas",
      description:
        "Sets reales, nunca fotos de archivo. Arte de uñas, francés, cromado y Gel-X hechos en Calgary, y algo de mi maquillaje, en grande para que juzgues el acabado.",
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
    styles: {
      eyebrow: "Lo que estás viendo",
      headingLead: "Los estilos",
      headingAccent: "de estas fotos",
      lede: "Los sets de arriba caen en unas pocas familias. Si una de ellas es lo que buscas, dilo al reservar y trae la foto.",
      groups: {
        french: {
          title: "Francés, de todas las formas",
          body: "Puntas blancas clásicas, puntas pastel de un color distinto en cada dedo, un francés azul claro con flores pintadas a mano y una punta blanca bordeada en dorado. La línea del francés es el detalle que mejor muestra el trabajo de forma, por eso hay tantas.",
        },
        chrome: {
          title: "Cromado, ojo de gato y brillo",
          body: "Un ojo de gato burdeos profundo que refleja una franja de luz en cada uña, un lila perlado con brillo iridiscente y hojuelas iridiscentes sobre blanco.",
        },
        art: {
          title: "Arte a mano",
          body: "Florecitas blancas sobre rosado intenso, corazones, estrellas en rosado y negro, una flor blanca en relieve, y sets de temporada como un lazo de Navidad, un copo de nieve y un bastón de caramelo.",
        },
        sparkle: {
          title: "Glitter y cristales",
          body: "Una línea fina de glitter en la sonrisa, cristales a lo largo de la punta o agrupados en una uña de acento, y un acabado de glitter azucarado junto a una textura tejida.",
        },
        makeup: {
          title: "También algo de maquillaje",
          body: "Un ojo gráfico azul y un look suave y natural para el día a día. El maquillaje es una parte más pequeña de lo que hago, así que hay menos de estos.",
        },
      },
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
