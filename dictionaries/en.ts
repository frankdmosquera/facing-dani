// Source of the Dictionary type: a key added here fails the build until es.ts has it.
// Not `as const`, so values type as string and Spanish can differ.
export const en = {
  meta: {
    // Nails first; "your party" because she is a station at someone else's party, not the organiser.
    title: "Nails in Calgary, by Appointment or at Your Party - Glammed Beauty Studio",
    template: "%s - Glammed Beauty Studio",
    description:
      "Custom gel and acrylic nails in Calgary, trained in Colombia. Hosting a kids' or teen party? I can come with nails, face painting and makeup for the guests.",
  },

  blurb:
    "Nails in Calgary, by appointment. Trained in Colombia. I also come to kids' and teen parties.",

  marquee: ["Nails", "Parties", "Calgary"],

  nav: {
    home: "Home",
    nails: "Nails",
    parties: "Parties",
    about: "About",
    store: "Store",
    lashes: "Lashes",
    makeup: "Makeup",
    gallery: "Gallery",
    contact: "Contact",
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
      store: "Store",
      lashes: "Lashes",
      makeup: "Makeup",
      gallery: "Gallery",
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
      // Where the two hours of a full set go. Times match data/treatments.ts.
      steps: {
        eyebrow: "Your appointment",
        headingLead: "A nail appointment,",
        headingAccent: "step by step",
        lede: "Why a full set takes about two hours, and where that time goes. A gel manicure skips the building and takes about one.",
        items: {
          talk: {
            title: "We look at your hands and your photo",
            time: "About 5 minutes",
            body: "What you do all day decides how long a set can be and which shape will hold. Length, shape and colour are settled before anything starts.",
          },
          removal: {
            title: "Removal, if you come in with a set",
            time: "About 30 minutes",
            body: "An old set is soaked and filed off gently, never pried. Mention it when you book so the time is there.",
          },
          prep: {
            title: "Prep",
            time: "About 15 minutes",
            body: "Cuticles pushed back and cleaned up, the surface lightly buffed and dried out. Most lifting starts with skipped prep, so this part is never rushed.",
          },
          build: {
            title: "Building and shaping",
            time: "About 45 to 60 minutes",
            body: "Acrylic or Gel‑X goes on, then every nail is filed to the same length and shape, with the thickest point where the nail needs its strength.",
          },
          colour: {
            title: "Colour and art",
            time: "About 20 to 40 minutes",
            body: "Gel colour, then French, chrome, cat-eye or hand-painted art if you asked for it. Every layer cures under the lamp.",
          },
          finish: {
            title: "Top coat, oil and aftercare",
            time: "About 10 minutes",
            body: "A top coat for shine, cuticle oil, and a quick word on keeping the set looking good until your fill.",
          },
        },
      },
      // Nails only, and none of these repeat the site-wide FAQ on home.
      faq: {
        eyebrow: "Before your set",
        headingLead: "Nail",
        headingAccent: "questions",
        items: {
          lasting: {
            q: "How long do gel and acrylic nails last?",
            a: "A gel manicure lasts about two to three weeks before it grows out. Acrylic and Gel‑X last as long as you keep up the fills, every two to three weeks, because the set moves forward as your nails grow.",
          },
          shortNails: {
            q: "Can I get a set if my nails are very short or bitten?",
            a: "Usually, yes. Acrylic and Gel‑X add length over a short nail. If the nail bed is very small, a shorter, natural length holds up better at first, and it can go longer at the next fill.",
          },
          damage: {
            q: "Do acrylic nails ruin your natural nails?",
            a: "The damage people blame on acrylic mostly comes from heavy filing and from picking or ripping a set off. Filed with care and taken off properly, the nails underneath stay healthy.",
          },
          length: {
            q: "How do I choose a length and shape?",
            a: "Start with what your hands do all day. Short square or oval suits typing and chores, almond is strong for everyday wear at medium length, and coffin needs length and suits a statement set. Not sure? Bring a photo and we decide together.",
          },
          broken: {
            q: "What if a nail breaks or lifts?",
            a: "Message me as soon as it happens. Do not glue it or peel it at home: a lifted corner pulled off takes a layer of your own nail with it.",
          },
          reference: {
            q: "Can I bring a photo from Instagram or Pinterest?",
            a: "Yes, please. A photo is the quickest way to show a shape, a colour or a design. I will tell you if anything needs adjusting for your nail length, and art is priced as the nail art add-on.",
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
      product: "A product from the store",
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

  // A parent hosts; she comes and does her part: nails, face painting, makeup. Never "book me for your party".
  partiesPage: {
    meta: {
      title: "Party Nails, Face Painting and Makeup in Calgary",
      description:
        "Hosting a birthday or a school event in Calgary? I come to your party with nails, face painting and makeup for the guests: simple and fun for kids, trendier for teens.",
    },
    serviceType: "Party nails, face painting and makeup",
    eyebrow: "Parties in Calgary",
    headingLead: "Nails and more for",
    headingAccent: "your party",
    lede: "Hosting a birthday, a sleepover or a school event for kids or teens? You run the party. I come along, set up a station and do the guests' nails, faces and makeup.",
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
          title: "I do the beauty",
          body: "Nails, face painting and makeup, a look for each guest. Simple and fun for kids, trendier sets and makeup for teens.",
        },
        extras: {
          title: "Lashes on request",
          body: "For older guests who want them, I can add lashes. Mention it when you ask.",
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
        body: "Besides appointments, I come to kids' and teen parties with nails, face painting and makeup for the guests. You host the party; I bring my station and do my part.",
      },
      spanish: {
        heading: "In English or in Spanish",
        body: "Spanish is my first language, so your appointment can happen in whichever language you are more comfortable in.",
      },
    },
    // "Sure of yourself", never "secure": her word "segura" means confident.
    feeling:
      "What I care about most is how you feel when you leave. Not just that the set looks good, but that you walk out feeling beautiful and sure of yourself.",
    nails: "See the nails menu",
    party: "For your party",
  },

  // Sold in person: no cart, no shipping, no online payment.
  store: {
    meta: {
      title: "Press-On Nails and Nail Care in Calgary",
      description:
        "Press-on nail sets made in Calgary, ready-made or custom to your sizes, plus cuticle oil, glass files and care kits. Sold in person, no shipping.",
    },
    eyebrow: "Store",
    headingLead: "Press-ons and",
    headingAccent: "nail care",
    lede: "Press-on sets I make, and the care that keeps any set looking good between appointments. Add it to your appointment, or ask and pick it up.",
    tabsLabel: "Products by type",
    stockTag: "Stock photo",
    all: "All",
    categories: {
      pressOns: "Press-ons",
      nailCare: "Nail care",
    },
    products: {
      readyPressOns: {
        name: "Ready-made press-on set",
        body: "One of my designs, with a range of sizes in each box so it fits most hands.",
      },
      customPressOns: {
        name: "Custom press-on set",
        body: "Made to your sizes and your design. Send me a photo of what you want and I will size and build it.",
      },
      cuticleOilPen: {
        name: "Cuticle oil pen",
        body: "A click pen that fits in a bag. A little every day keeps cuticles soft and helps a set last.",
      },
      cuticleOilBottle: {
        name: "Cuticle oil, 15 ml",
        body: "The bottle with a brush, for at home. Same job, more of it.",
      },
      glassFile: {
        name: "Glass nail file",
        body: "Files gently and rinses clean. Lasts for years, unlike a paper board.",
      },
      careKit: {
        name: "Nail care kit",
        body: "Cuticle oil, a glass file and a buffer. What keeps a set looking good in week three.",
      },
    },
    buy: {
      heading: "How to buy",
      body: "No cart and no shipping. Add it to your appointment when you book, or ask me and pick it up in Calgary.",
      ask: "Ask about a product",
    },
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
      a: "Yes, with my station at a party you host, for kids or teens: nails, face painting and makeup. Parties are not booked online: send me the date, how many guests and the area through the contact page, and I will confirm by email.",
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
      sell: "Custom gel and acrylic sets, trained in Colombia, booking now in Calgary. Bring a reference photo or let me build something for you. Hosting a kids' or teen party? I can come with nails, face painting and makeup for the guests.",
      nails: "Book nails",
      party: "For your party",
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
      // Two lines on purpose: the full story lives on /about, and home must not repeat it.
      intro:
        "I learned nails in Colombia, where the finish is everything, and now I do sets in Calgary, in English or in Spanish.",
      more: "More about me",
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
      headingLead: "Nails and more for",
      headingAccent: "your party",
      lede: "Hosting a birthday or a get-together for kids or teens? You run the party, I come and set up for the guests: nails, face painting, makeup, and lashes for the older ones.",
      points: {
        host: {
          title: "You host, I do the beauty",
          body: "Cake, games and guests are yours. I set up a station and work through the guests.",
        },
        age: {
          title: "Made for their age",
          body: "Face painting and simple, cute nails for kids. Trendier sets, makeup and lashes for teens.",
        },
        ask: {
          title: "Ask first",
          body: "Parties are not booked online. Send me the date, how many guests and the area, and I will confirm by email.",
        },
      },
      ask: "Ask about your party",
    },

    guide: {
      eyebrow: "Nail guide",
      headingLead: "Shapes, finishes",
      headingAccent: "and aftercare",
      lede: "A quick guide to what to ask for, and how to keep it looking good once you walk out.",
      storeLink: "Cuticle oil in the store",
      columns: {
        shapes: {
          heading: "Shapes",
          items: {
            almond: { term: "Almond", text: "Tapered sides and a rounded tip. It slims and lengthens the fingers, and it is strong enough for every day." },
            coffin: { term: "Coffin", text: "Long, with straight sides and a flat tip. The shape for statement sets, and it needs length, so acrylic or Gel‑X." },
            square: { term: "Square", text: "Straight sides and a flat edge. Easy to wear short, and the tip takes a French line well." },
            oval: { term: "Oval", text: "Soft and rounded. The most natural look, and the least likely to snag on things." },
          },
        },
        finishes: {
          heading: "Finishes",
          items: {
            chrome: { term: "Chrome", text: "A mirror or pearl powder buffed over gel, so the whole nail catches the light." },
            french: { term: "French", text: "A clean tip line, classic white or any colour, thick or micro." },
            catEye: { term: "Cat-eye", text: "Magnetic gel that pulls a band of shimmer across the nail, like light moving on velvet." },
            sparkle: { term: "Glitter and gems", text: "Fine glitter, a sparkle line along the smile, or crystals on an accent nail." },
            art: { term: "Hand-painted art", text: "Flowers, hearts, lines, stars. Bring a reference photo and it gets built for your nails." },
          },
        },
        care: {
          heading: "Make it last",
          items: {
            oil: { term: "Cuticle oil every day", text: "Hydrated nails flex instead of cracking, and the set stays glossy at the edges." },
            gloves: { term: "Gloves for cleaning", text: "Hot water and cleaning products are what lift a set early." },
            tools: { term: "Nails are not tools", text: "Open cans and peel stickers with something else. That is how tips crack." },
            lifting: { term: "Never pick a lift", text: "Peeling a lifted corner takes a layer of your own nail with it. Message me and get it fixed." },
            fills: { term: "Fills every two to three weeks", text: "As your nails grow, a fill keeps the balance right so the set does not snap." },
          },
        },
      },
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
    styles: {
      eyebrow: "What you are looking at",
      headingLead: "The styles",
      headingAccent: "in these photos",
      lede: "The sets above fall into a few families. If one of them is what you are after, say so when you book and bring the photo.",
      groups: {
        french: {
          title: "French, every way",
          body: "Classic white tips, pastel tips in a different colour on each finger, a pale blue French with hand-painted flowers, and a white tip edged in gold. A French line is the detail that shows shape work best, which is why there are so many.",
        },
        chrome: {
          title: "Chrome, cat-eye and shimmer",
          body: "A deep burgundy cat-eye that throws a band of light across each nail, a pearly lilac with an iridescent shimmer, and iridescent flakes over white.",
        },
        art: {
          title: "Hand-painted art",
          body: "Small white flowers on bright pink, hearts, stars on pink and black, a raised white flower, and seasonal sets like a Christmas bow, snowflake and candy cane.",
        },
        sparkle: {
          title: "Glitter and crystals",
          body: "A fine glitter line along the smile, crystals set along the tip or clustered on one accent nail, and a sugar-glitter finish next to a knitted texture.",
        },
        makeup: {
          title: "Some makeup too",
          body: "A graphic blue eye and a soft, natural everyday look. Makeup is a smaller part of what I do, so there are fewer of these.",
        },
      },
    },
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
