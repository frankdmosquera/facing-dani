import { siteWideFaq } from "@/data/faq";
import { orderedGallery } from "@/data/gallery";
import { portrait } from "@/data/portrait";
import type { ServiceId } from "@/data/services";
import { siteConfig } from "@/data/siteConfig";
import { treatmentLabel, treatmentsFor } from "@/data/treatments";
import type { Dictionary } from "@/dictionaries/en";
import { imagekitEndpoint } from "@/lib/imagekit";
import { siteUrl } from "@/lib/siteUrl";

// JSON-LD builders. Each reads the same data and dictionary its page renders, so they cannot disagree.

export function faqPageSchema(t: Dictionary) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: siteWideFaq().map((item) => ({
      "@type": "Question",
      name: t.faq[item.key].q,
      acceptedAnswer: {
        "@type": "Answer",
        text: t.faq[item.key].a,
      },
    })),
  };
}

export function imageGallerySchema(t: Dictionary) {
  const images = orderedGallery();
  if (images.length === 0 || !imagekitEndpoint) return null;

  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: t.gallery.meta.title,
    description: t.gallery.meta.description,
    image: images.map((image) => ({
      "@type": "ImageObject",
      // The plain master URL: no transformation, no cache-busting version.
      contentUrl: `${imagekitEndpoint}${image.imagekitPath}`,
      name: t.gallery.images[image.key],
    })),
  };
}

export function serviceSchema(serviceId: ServiceId, t: Dictionary) {
  const copy = t.services[serviceId];
  const rows = treatmentsFor(serviceId);

  const base = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: copy.name,
    description: copy.meta.description,
    serviceType: copy.name,
    areaServed: {
      "@type": "City",
      name: siteConfig.business.city,
    },
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.business.name,
    },
  };

  // An empty catalogue would claim she offers nothing.
  if (rows.length === 0) return base;

  return {
    ...base,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: copy.name,
      itemListElement: rows.map((row) => ({
        "@type": "Offer",
        name: treatmentLabel(t, serviceId, row.key),
        // "From $5" is a minimum, so it must not be sent as `price`.
        ...(row.from
          ? {
              priceSpecification: {
                "@type": "PriceSpecification",
                minPrice: row.priceCad,
                priceCurrency: "CAD",
              },
            }
          : { price: row.priceCad, priceCurrency: "CAD" }),
      })),
    },
  };
}

export function personSchema(t: Dictionary) {
  const base = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.business.name,
    jobTitle: t.home.jobTitle,
    description: t.home.story.lede,
    knowsLanguage: ["en", "es"],
    worksFor: {
      "@type": "LocalBusiness",
      name: siteConfig.business.name,
    },
    areaServed: {
      "@type": "City",
      name: siteConfig.business.city,
    },
  };

  if (!portrait || !imagekitEndpoint) return base;

  return { ...base, image: `${imagekitEndpoint}${portrait.imagekitPath}` };
}

export function contactPageSchema(t: Dictionary) {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: t.contact.meta.title,
    description: t.contact.meta.description,
    mainEntity: {
      "@type": "LocalBusiness",
      name: siteConfig.business.name,
      email: siteConfig.business.email,
      areaServed: {
        "@type": "City",
        name: siteConfig.business.city,
      },
      availableLanguage: ["en", "es"],
    },
  };
}

// Home page only. No street address on purpose: it goes out with the booking. No phone or hours exist.
export function localBusinessSchema(t: Dictionary) {
  const base = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    name: siteConfig.business.name,
    description: t.meta.description,
    email: siteConfig.business.email,
    areaServed: {
      "@type": "City",
      name: siteConfig.business.city,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.business.city,
      addressRegion: "AB",
      addressCountry: "CA",
    },
    availableLanguage: ["en", "es"],
  };

  return siteUrl ? { ...base, url: siteUrl } : base;
}

// Escapes `<` so a "</script>" in the data cannot close the tag early.
export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
