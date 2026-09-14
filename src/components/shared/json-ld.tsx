import * as React from "react";
import { SITE_CONFIG } from "@/lib/constants";

export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": SITE_CONFIG.name,
    "url": SITE_CONFIG.url,
    "description": SITE_CONFIG.description,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "COP",
      "lowPrice": "150000",
      "highPrice": "1200000"
    },
    "provider": {
      "@type": "Organization",
      "name": SITE_CONFIG.name,
      "url": SITE_CONFIG.url,
      "logo": `${SITE_CONFIG.url}/images/logo/logo-aeperion.png`,
      "sameAs": [
        SITE_CONFIG.links.whatsapp
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
