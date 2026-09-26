// Source of the Dictionary type: a key added here fails the build until es.ts has it.
// Not `as const`, so values type as string and Spanish can differ.
export const en = {
  meta: {
    // Nails first; "your party" because she is a station at someone else's party, not the organiser.
    title: "Nails in Calgary, by Appointment or at Your Party - Glammed Beauty Studio",
    template: "%s - Glammed Beauty Studio",
    description:
      "Custom gel and acrylic nails in Calgary, trained in Colombia. Hosting a kids' or teen party? I can come and do nails for the guests.",
  },

  blurb:
    "Nails in Calgary, by appointment. Trained in Colombia. I also do nails at kids' and teen parties.",

  marquee: ["Nails", "Parties", "Calgary"],

  nav: {
    home: "Home",
    nails: "Nails",
    lashes: "Lashes",
    makeup: "Makeup",
    gallery: "The work",
    logos: "Logos",
  },

  cta: {
    book: "Book now",
  },

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
      contact: "Questions and events",
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
    homeSuffix: "home",
  },

  languageSwitch: {
    to: "Español",
    label: "Ver este sitio en español",
  },

  // Each service owns its own vocabulary. A sentence that fits under another service is the wrong sentence.
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

    // Names no second route: there is no Instagram or public email yet.
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

  treatmentList: {
    priceFrom: "From",
    durationLabel: "Takes",
    book: "Book",
  },

  inspiration: {
    heading: "Inspiration",
    tag: "Inspiration",
    note: "Looks to bring in as a reference. These are stock photos, not my work.",
  },

  faq: {
    // Offer DMs here again once siteConfig.social.instagram is set.
    booking: {
      q: "How do I book?",
      a: "Use the form on the contact page. Tell me the service, roughly when suits you, and send a reference photo if you have one.",
    },
    duration: {
      q: "How long does a full set take?",
      a: "A gel manicure is about an hour. A full set with extensions and art runs two to three hours. Lash sets are around two hours, fills about an hour.",
    },
    // No street address on purpose: it goes out with the booking.
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
      sell: "Custom gel and acrylic sets, trained in Colombia, booking now in Calgary. Bring a reference photo or let me build something for you. Hosting a kids' or teen party? I can come and do the guests' nails.",
      nails: "Book nails",
      party: "Nails for your party",
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
      // "Sure of yourself", never "secure": her word "segura" means confident.
      feeling:
        "What I care about most is how you feel when you leave. Not just that the set looks good, but that you walk out feeling beautiful and sure of yourself.",
    },
    work: {
      eyebrow: "Recent work",
      heading: "The work, not the promise",
      all: "See all the work",
    },

    // Schema only, never rendered.
    jobTitle: "Nail artist",

    portraitAlt:
      "The artist, photographed in the salon where she works, wearing a black t-shirt.",

    // Written fresh in es.ts, not translated: stilted Spanish would disprove the promise.
    bilingual: {
      heading: "Your appointment can be in Spanish",
      body: "Not just this website. Spanish is my first language, so the consultation, the small talk, and the part where you change your mind about the colour all happen in whichever language you are more comfortable in. A translated page only tells you that you can read it. This is me telling you that you will be understood.",
    },

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

  // meta.title carries Calgary and the service terms itself: the template only appends the business name.
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
    // Describe the work (shape, finish, detail), not keywords. Also used as ImageObject names.
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
      christmasShortSet:
        "Short nails with a red french tip, a hand-painted gift bow, a snowflake and a candy-cane stripe",
      whiteFlowerGoldFrench:
        "Square nails with a white french tip edged in gold, a raised white flower on one nail and a small gold charm on another",
      spiderAccentFrench:
        "Square nails with a white french tip, an orange accent nail with a painted black spider and a gold script letter on the next",
      heartsFrench:
        "Short square nails with a white french tip, outlined hearts, a crystal cluster and an iridescent accent nail",
      almondBowFrench:
        "Almond nails with a white french tip, small pearls and a raised pink bow on one nail",
      pinkFrenchCrystals:
        "Square nails with a bright pink french tip, a line of crystals on one nail and a pink pearl-chrome accent",
      goldLeafFrench:
        "Close-up of square nails with gold flakes, a white french tip, hand-painted white stars and a white leaf pattern",
      clearCoffinLinework:
        "Long clear coffin nails with fine white linework and gold swirl details",
      pinkBlackStars:
        "Pink and black nails with hand-painted stars, a leopard-spot nail and thin french lines",
      blueGraphicEyeProfile:
        "Graphic makeup in profile: a bold blue band across the eyes with small white stars and a pink lip",
      blueGraphicEyeTurned:
        "The same blue graphic eye look with white stars, head turned to the side",
      softNaturalLookFront:
        "Soft natural makeup, front view: defined brows, winged liner and a nude lip",
      softNaturalLookSide:
        "Soft natural makeup from the side, with winged liner and a nude lip",
      colourSwatchArm:
        "Eyeshadow swatches on an arm: a purple to orange blend beside a warm brown",
    },
  },
};

export type Dictionary = typeof en;
