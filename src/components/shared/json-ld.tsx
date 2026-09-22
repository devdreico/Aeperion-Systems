import * as React from "react";
import { SITE_CONFIG } from "@/lib/constants";

export function JsonLd() {
  const organization = {
    "@type": "Organization",
    "@id": `${SITE_CONFIG.url}/#organization`,
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/images/logo/logo-aeperion.png`,
    image: `${SITE_CONFIG.url}/images/logo/logo-aeperion.png`,
    description: SITE_CONFIG.description,
    foundingDate: String(SITE_CONFIG.foundedYear),
    founder: { "@type": "Organization", name: SITE_CONFIG.name },
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE_CONFIG.city,
      addressCountry: "CO",
    },
    areaServed: { "@type": "Country", name: SITE_CONFIG.country },
    sameAs: [
      SITE_CONFIG.links.linkedin,
      SITE_CONFIG.links.instagram,
      SITE_CONFIG.links.whatsapp,
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: SITE_CONFIG.links.email,
      availableLanguage: ["es"],
    },
    telephone: SITE_CONFIG.contact.phoneDisplay,
    email: SITE_CONFIG.links.email,
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
    url: SITE_CONFIG.url,
    name: SITE_CONFIG.name,
    inLanguage: "es-CO",
    publisher: { "@id": `${SITE_CONFIG.url}/#organization` },
  };

  const service = {
    "@type": "ProfessionalService",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    image: `${SITE_CONFIG.url}/images/logo/logo-aeperion.png`,
    priceRange: "$$",
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
      },
      {
        "@type": "Offer",
        name: "Plan Fullpack",
        price: "450000",
        priceCurrency: "COP",
      },
      {
        "@type": "Offer",
        name: "Plan Syspack",
        price: "1000000",
        priceCurrency: "COP",
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
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
