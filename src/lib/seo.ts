import { SITE_CONFIG } from "@/lib/constants";

/** Normaliza a path con barra final. */
export function normalizePath(path: string): string {
  if (!path || path === "/") return "/";
  const withLeading = path.startsWith("/") ? path : `/${path}`;
  const clean = withLeading.split("#")[0].split("?")[0];
  if (clean === "/") return "/";
  return clean.endsWith("/") ? clean : `${clean}/`;
}

/** URL absoluta canónica para un path del sitio. */
export function absoluteUrl(path: string = "/"): string {
  const base = SITE_CONFIG.url.replace(/\/$/, "");
  const normalized = normalizePath(path);
  return normalized === "/" ? `${base}/` : `${base}${normalized}`;
}

/** Serializa un script JSON-LD de forma segura. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/** JSON-LD de organización. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/images/logo/logo-aeperion.png"),
    description: SITE_CONFIG.description,
    foundingDate: String(SITE_CONFIG.foundedYear),
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE_CONFIG.city,
      addressCountry: "CO",
    },
    sameAs: [
      SITE_CONFIG.links.linkedin,
      SITE_CONFIG.links.instagram,
      SITE_CONFIG.links.kspr,
    ],
  };
}

export function breadcrumbListJsonLd(
  items: { name: string; path?: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.path !== undefined ? { item: absoluteUrl(item.path) } : {}),
    })),
  };
}

export function faqPageJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}