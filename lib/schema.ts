import { siteWideFaq } from "@/data/faq";
import { orderedGallery } from "@/data/gallery";
import { portrait } from "@/data/portrait";
import type { ServiceId } from "@/data/services";
import { siteConfig } from "@/data/siteConfig";
import { treatmentLabel, treatmentsFor } from "@/data/treatments";
import type { Dictionary } from "@/dictionaries/en";
import { imagekitEndpoint } from "@/lib/imagekit";
import { siteUrl } from "@/lib/siteUrl";

/**
 * FAQPage structured data, built from the same data and dictionary the visible
 * list renders from. One source, two outputs: the markup and the schema cannot
 * disagree, which is the usual way structured data goes stale.
 */
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

/**
 * ImageGallery structured data, from the same records and dictionary the grid
 * renders. Same rule as the FAQ above: one source, two outputs, so the markup
 * and the schema cannot disagree.
 *
 * Returns `null` rather than an empty gallery in the two cases where there is
 * nothing true to say - no photos, or no endpoint to address them by. An
 * `ImageGallery` with no images is a claim about a page that does not exist,
 * and a `contentUrl` built on an undefined endpoint is a broken link in
 * structured data, which is worse than no structured data.
 *
 * `contentUrl` is the plain master URL: no `tr=` transformation and no
 * `MEDIA_VERSION`. Those two exist for the browser - one resizes per viewport,
 * the other busts a year-long cache - and neither belongs in the canonical
 * address of the image.
 */
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
      contentUrl: `${imagekitEndpoint}${image.imagekitPath}`,
      name: t.gallery.images[image.key],
    })),
  };
}

/**
 * `Service` structured data for one service page, from the same records and
 * dictionary the page renders.
 *
 * `provider` reads the business name from `siteConfig`, never a literal, so the
 * template test holds here too. `areaServed` is Calgary because that is the
 * whole point of the page.
 *
 * `hasOfferCatalog` is omitted entirely rather than emitted empty when a service
 * has no priced treatments yet. An empty catalogue is a claim that she offers
 * nothing, which is worse than saying nothing about her offers at all.
 */
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

  if (rows.length === 0) return base;

  return {
    ...base,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: copy.name,
      itemListElement: rows.map((row) => ({
        "@type": "Offer",
        name: treatmentLabel(t, serviceId, row.key),
        price: row.priceCad,
        priceCurrency: "CAD",
      })),
    },
  };
}

/**
 * `Person` structured data for the About page.
 *
 * `knowsLanguage` is the one field here that is doing real work: it is the
 * machine-readable half of the bilingual promise the page makes in prose, and
 * it is the only signal on this site that says a Spanish-speaking client can be
 * served in Spanish.
 *
 * `name` and `worksFor.name` both read `siteConfig.business.name`, which is
 * correct only while the person and the business share a string. They do today.
 * Her full legal name is recorded as unresolved in
 * `blueprint/reference/links.md`, and settling it also settles what goes on the
 * Google Business Profile, which the overview requires to match character for
 * character.
 *
 * `image` is omitted rather than null when no portrait exists, the same rule
 * `imageGallerySchema` follows: say nothing rather than claim an empty thing.
 */
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

/**
 * `ContactPage` structured data.
 *
 * Deliberately thin. There is no street address to publish - she works by
 * appointment and the FAQ says the address goes out with the booking - and no
 * phone number in `siteConfig`, so `LocalBusiness` with a half-filled
 * `address` would be worse than nothing. What is true is the city she serves
 * and the languages she works in.
 */
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

/**
 * The business itself, emitted once on the home page and nowhere else.
 *
 * `HealthAndBeautyBusiness` rather than the bare `LocalBusiness` it extends: it
 * is the subtype that says what she actually does, and a more specific type is
 * free information.
 *
 * **No `streetAddress`, deliberately.** The FAQ already tells visitors "Calgary,
 * by appointment. The exact address goes out when your booking is confirmed."
 * Publishing one here would contradict the page and put a home address on the
 * internet. A locality-level `PostalAddress` is what a service-area business can
 * honestly say, and `areaServed` carries the rest.
 *
 * Absent because they do not exist rather than because they were forgotten:
 * `telephone`, `openingHours`, `geo`, `priceRange`, `logo`. Every one would have
 * to be invented, and an invented opening hour is a customer standing outside a
 * door.
 *
 * `url` is omitted while no domain is configured, for the same reason nothing
 * else guesses a host.
 */
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

/**
 * Serialise for a `<script type="application/ld+json">`.
 *
 * `<` is escaped because a `</script>` sequence inside the JSON would end the
 * tag early and drop the rest of the page into the document. Nothing in these
 * dictionaries contains one today, but the escape costs nothing and this is
 * the one place where a stray angle bracket breaks a page rather than
 * rendering oddly.
 */
export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
