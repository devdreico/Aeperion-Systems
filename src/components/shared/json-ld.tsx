import * as React from "react";
import { SITE_CONFIG } from "@/lib/constants";
import { absoluteUrl, serializeJsonLd } from "@/lib/seo";

export function JsonLd() {
  const logoUrl = absoluteUrl("/images/logo/logo-aeperion.png");

  const organization = {
    "@type": "Organization",
    "@id": `${SITE_CONFIG.url}/#organization`,
    name: SITE_CONFIG.name,
    alternateName: "Aeperion",
    url: absoluteUrl("/"),
    logo: logoUrl,
    image: logoUrl,
    description: SITE_CONFIG.description,
    foundingDate: String(SITE_CONFIG.foundedYear),
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE_CONFIG.city,
      addressRegion: "Bogotá D.C.",
      addressCountry: "CO",
    },
    areaServed: [
      { "@type": "Country", name: SITE_CONFIG.country },
      { "@type": "City", name: SITE_CONFIG.city },
    ],
    sameAs: [SITE_CONFIG.links.linkedin, SITE_CONFIG.links.instagram],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: SITE_CONFIG.links.email,
      availableLanguage: ["es"],
      areaServed: "CO",
    },
    telephone: SITE_CONFIG.contact.phoneDisplay,
    email: SITE_CONFIG.links.email,
    knowsLanguage: "es",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ],
      opens: "08:00",
      closes: "18:00",
    },
  };

  const website = {
    "@type": "WebSite",
    "@id": `${SITE_CONFIG.url}/#website`,
    url: absoluteUrl("/"),
    name: SITE_CONFIG.name,
    alternateName: "Aeperion",
    inLanguage: "es-CO",
    description: SITE_CONFIG.description,
    publisher: { "@id": `${SITE_CONFIG.url}/#organization` },
  };

  const service = {
    "@type": "ProfessionalService",
    "@id": `${SITE_CONFIG.url}/#service`,
    name: SITE_CONFIG.name,
    url: absoluteUrl("/"),
    description: SITE_CONFIG.description,
    image: logoUrl,
    priceRange: "$$",
    currency: "COP",
    areaServed: [
      { "@type": "City", name: SITE_CONFIG.city },
      { "@type": "Country", name: SITE_CONFIG.country },
    ],
    provider: { "@id": `${SITE_CONFIG.url}/#organization` },
    makesOffer: [
      {
        "@type": "Offer",
        name: "Plan Standart",
        price: "200000",
        priceCurrency: "COP",
        url: absoluteUrl("/planes/standart/"),
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Plan Fullpack",
        price: "450000",
        priceCurrency: "COP",
        url: absoluteUrl("/planes/fullpack/"),
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Plan Syspack",
        price: "1000000",
        priceCurrency: "COP",
        url: absoluteUrl("/planes/syspack/"),
        availability: "https://schema.org/InStock",
      },
    ],
  };

  const schema = {
    "@context": "https://schema.org",
    "@graph": [organization, website, service],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
    />
  );
}
