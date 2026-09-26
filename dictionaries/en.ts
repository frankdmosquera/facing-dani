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
    parties: "Parties",
    about: "About",
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
      parties: "Parties",
      lashes: "Lashes",
      makeup: "Makeup",
      gallery: "The gallery",
      bookAppointment: "Book an appointment",
      contact: "Questions and parties",
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
      menuHeading: "Nail prices in Calgary",
      work: { heading: "Recent nail work", all: "See every set" },
      // Nails only: which set to book. General technique, no promises about her.
      guide: {
        eyebrow: "Which set is for you",
        headingLead: "Gel, acrylic",
        headingAccent: "or Gel‑X",
        lede: "Three ways to get the nails you want. Not sure which one? Send me a photo of what you are after and I will tell you what to book.",
        ask: "Ask me first",
        kinds: {
          gel: {
            name: "Gel manicure",
            tag: "Your own nails",
            body: "Gel polish on your natural nails, cured under a lamp. Glossy, no chipping, and no added length. The one to book if your nails are already the length you like.",
            lasts: "Lasts about two to three weeks.",
          },
          acrylic: {
            name: "Acrylic",
            tag: "Length and strength",
            body: "Acrylic built over your nail or a tip and shaped by hand. The strongest option, and the one for long, sculpted shapes.",
            lasts: "A fill every two to three weeks.",
          },
          gelX: {
            name: "Gel‑X",
            tag: "Length, lighter feel",
            body: "Soft gel tips that cover the whole nail, bonded with gel. Lighter than acrylic, quicker to put on, and gentler to take off.",
            lasts: "A fill every two to three weeks.",
          },
        },
      },
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
      menuHeading: "Lash prices in Calgary",
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
      menuHeading: "Makeup prices in Calgary",
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
      title: "Questions and Party Requests in Calgary",
      description:
        "Ask me anything, or tell me about the party you are hosting in Calgary: the date, how many guests and the area. I answer every message, usually the same day. Se habla espanol.",
    },
    eyebrow: "Questions and parties",
    headingLead: "Tell me what",
    headingAccent: "you need",
    lede: "Ask me anything, or tell me about a party you are hosting. It lands in my inbox and I answer every one, usually the same day. Booking a nail appointment is quicker from the nails page.",

    direct: {
      heading: "Would rather just message me?",
      body: "That works too, and it is faster if you already know what you want.",
      link: "Message on Instagram",
    },

    form: {
      name: "Your name",
      email: "Email",
      emailHint: "So I can reply. Nothing else is sent here.",
      topic: "What is it about?",
      topicPlaceholder: "Pick one",
      partyKind: "What kind of party?",
      partyDate: "Date",
      guests: "How many guests?",
      guestsHint: "Roughly is fine.",
      area: "Area of Calgary",
      areaHint: "The neighbourhood is enough for now.",
      source: "How did you find me?",
      sourcePlaceholder: "Pick one",
      message: "What are you thinking?",
      messageHint: "Your question, or a reference photo you have seen.",
      messageHintParty: "Their ages, the look they are after, anything I should know.",
      submit: "Send it",
      submitting: "Sending...",
      required: "Required",
    },

    topics: {
      party: "A party I am hosting",
      question: "A question",
      other: "Something else",
    },

    partyKinds: {
      birthday: "Birthday",
      school: "School event",
      other: "Something else",
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
      date: "Pick the date of the party.",
      guests: "A number from 1 to 50, please.",
    },

    // Names no second route: there is no Instagram or public email yet.
    failed:
      "That did not send, and I would rather tell you than pretend it did. Try again in a moment.",
  },

  // A parent hosts; she comes and does the guests' nails. Never "book me for your party".
  partiesPage: {
    meta: {
      title: "Nails for Kids' and Teen Parties in Calgary",
      description:
        "Hosting a birthday or a school event in Calgary? I come to your party and do the guests' nails: simple, cute designs for kids, trendier sets for teens.",
    },
    serviceType: "Party nails",
    eyebrow: "Parties in Calgary",
    headingLead: "Nails for",
    headingAccent: "your party",
    lede: "Hosting a birthday, a sleepover or a school event for kids or teens? You run the party. I come along, set up a nail station and do the guests' nails.",
    ask: "Ask about your party",
    what: {
      eyebrow: "What I do there",
      heading: "My part, and only my part",
      points: {
        host: {
          title: "You host",
          body: "The cake, the games, the guests and the place are yours. I am one thing on the day, not the whole party.",
        },
        nails: {
          title: "I do the nails",
          body: "A nail station and a design for each guest. Simple and cute for kids, trendier sets for teens.",
        },
        extras: {
          title: "Makeup on request",
          body: "For older guests who want it, I can add light makeup. Mention it when you ask.",
        },
      },
    },
    how: {
      eyebrow: "How it works",
      heading: "Three steps, no booking system",
      steps: {
        ask: {
          title: "Tell me about the party",
          body: "The date, how many guests and the area of Calgary, through the contact form. Their ages help too.",
        },
        confirm: {
          title: "I confirm by email",
          body: "I check the date and come back to you with the details, so you know exactly what to expect.",
        },
        day: {
          title: "On the day, I come to you",
          body: "I set up, work through the guests, and pack up when I am done. The rest of the party stays yours.",
        },
      },
    },
    closing: {
      eyebrow: "Got a date?",
      headingLead: "Let's make it",
      headingAccent: "shine",
      lede: "Send me the date, the number of guests and the area, and I will come back to you, usually the same day.",
    },
  },

  // No age and no photo of her. Written in her voice, like the rest of the site.
  about: {
    meta: {
      title: "About Dani, Nail Artist in Calgary",
      description:
        "Trained in Colombia, doing nails in Calgary by appointment and at kids' and teen parties. Who is doing your nails, and why the finish matters to me.",
    },
    eyebrow: "About",
    headingLead: "The person doing",
    headingAccent: "your nails",
    lede: "A new business has no reviews, no word of mouth and nothing to point at except the work and the person doing it. So here is the person, and where the way I work comes from.",
    sections: {
      training: {
        heading: "Trained in Colombia",
        body: "I did my training in Colombia, where the standard for nail work is a lot higher than most people here expect. Shape, structure and cuticle work are the parts that decide whether a set still looks good in week three, and they are the parts I was taught to get right.",
      },
      building: {
        heading: "Building something of my own",
        body: "Since then I have been doing sets for family and friends constantly, and now I am building this into something of my own. What that means for you is the version of me that still cares enormously about every single set. Bring a photo from Pinterest, or sit down with no idea and we will work it out.",
      },
      parties: {
        heading: "Parties, too",
        body: "Besides appointments, I come to kids' and teen parties and do the guests' nails. You host the party; I bring the nail station and do my part.",
      },
      spanish: {
        heading: "In English or in Spanish",
        body: "Spanish is my first language, so your appointment can happen in whichever language you are more comfortable in.",
      },
    },
    nails: "See the nails menu",
    party: "Nails for your party",
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
      a: "Open the nails page, tap Book next to the treatment you want, and pick a time in the calendar. Questions first? The contact page is always open.",
    },
    parties: {
      q: "Can you come to a party?",
      a: "Yes, as the nail station at a party you host, for kids or teens. Parties are not booked online: send me the date, how many guests and the area through the contact page, and I will confirm by email.",
    },
    duration: {
      q: "How long does a full set take?",
      a: "A gel manicure is about an hour. A full set with extensions and art runs two to three hours, and a fill about an hour and a half.",
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
      a: "Come with bare nails, or tell me what is on them so I can plan time to take it off. Bring a reference photo if you have one, and plan for the full appointment time. Booking lashes? Come with no eye makeup and tell me about any allergies, because lash glue can contain acrylic or latex.",
    },
    removalAndFills: {
      q: "Can you take off a set from another salon, and how often do I need a fill?",
      a: "Yes. Removal is on the nails price list; mention it when you book so the time is set aside. Fills are every two to three weeks.",
    },
    hair: {
      q: "Do you do hair?",
      a: "No. Nails are what I do, with makeup and lashes on request, and that is on purpose.",
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
    nails: {
      eyebrow: "Nails",
      headingLead: "Gel, acrylic and",
      headingAccent: "Gel‑X in Calgary",
      lede: "Full sets and fills, chrome, French and hand-painted art. Shape and cuticle work that still looks good in week three.",
      addOns: "Add French tips, chrome or nail art to any set.",
      more: "See the full menu and book",
    },
    story: {
      eyebrow: "Who is doing your nails",
      headingLead: "Trained in Colombia,",
      headingAccent: "working in Calgary",
      training:
        "I did my training in Colombia, where the standard for nail work is a lot higher than most people here expect. Shape, structure and cuticle work are the parts that decide whether a set still looks good in week three, and they are the parts I was taught to get right.",
      more: "More about me",
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

    parties: {
      eyebrow: "Parties",
      headingLead: "Nails for",
      headingAccent: "your party",
      lede: "Hosting a birthday or a get-together for kids or teens? You run the party, I come and do the guests' nails.",
      points: {
        host: {
          title: "You host, I do the nails",
          body: "Cake, games and guests are yours. I set up a nail station and work through the guests.",
        },
        age: {
          title: "Made for their age",
          body: "Simple, cute designs for kids, trendier sets for teens. Makeup on request.",
        },
        ask: {
          title: "Ask first",
          body: "Parties are not booked online. Send me the date, how many guests and the area, and I will confirm by email.",
        },
      },
      ask: "Ask about your party",
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
      title: "Nail Art and Sets Done in Calgary",
      description:
        "Real sets, never stock photos. Nail art, French, chrome and Gel-X done in Calgary, plus some of my makeup, shown big enough to judge the finish for yourself.",
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
