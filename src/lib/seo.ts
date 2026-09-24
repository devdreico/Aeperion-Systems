import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import type { BlogPostData } from "@/lib/blog-data";

/** Normaliza a path con barra final (coincide con trailingSlash: true). */
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

interface PageMetadataOptions {
  /** Título corto (usa el template `%s | Aeperion Systems`). */
  title?: string;
  /** Título completo que ignora el template (home, brand). */
  titleAbsolute?: string;
  description: string;
  /** Path de la ruta, ej. `/planes` o `/blog/mi-post`. */
  path: string;
  type?: "website" | "article";
  image?: { url: string; width?: number; height?: number; alt?: string };
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  keywords?: string[];
  noindex?: boolean;
}

const DEFAULT_OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Aeperion Systems — Automatización e IA para empresas",
} as const;

/**
 * Metadata completa por página: canonical propio (evita el bug de
 * heredar canonical "/" del layout), OG/Twitter únicos y hreflang.
 */
export function pageMetadata(opts: PageMetadataOptions): Metadata {
  const path = normalizePath(opts.path);
  const canonical = path;
  const image = opts.image ?? DEFAULT_OG_IMAGE;
  const ogTitle = opts.titleAbsolute ?? opts.title ?? SITE_CONFIG.name;
  const ogType = opts.type ?? "website";

  const openGraph: Metadata["openGraph"] = {
    type: ogType,
    locale: "es_CO",
    siteName: SITE_CONFIG.name,
    title: ogTitle,
    description: opts.description,
    url: absoluteUrl(path),
    images: [
      {
        url: image.url,
        width: image.width ?? DEFAULT_OG_IMAGE.width,
        height: image.height ?? DEFAULT_OG_IMAGE.height,
        alt: image.alt ?? DEFAULT_OG_IMAGE.alt,
      },
    ],
    ...(ogType === "article"
      ? {
          publishedTime: opts.publishedTime,
          modifiedTime: opts.modifiedTime ?? opts.publishedTime,
          authors: opts.authors ?? [SITE_CONFIG.name],
        }
      : {}),
  };

  return {
    ...(opts.titleAbsolute
      ? { title: { absolute: opts.titleAbsolute } }
      : opts.title
        ? { title: opts.title }
        : {}),
    description: opts.description,
    ...(opts.keywords ? { keywords: opts.keywords } : {}),
    alternates: {
      canonical,
      languages: {
        "es-CO": canonical,
        "x-default": canonical,
      },
    },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: opts.description,
      images: [typeof image.url === "string" ? image.url : DEFAULT_OG_IMAGE.url],
    },
    ...(opts.noindex
      ? { robots: { index: false, follow: false } }
      : {}),
  };
}

/** JSON-LD: lista de migas de pan (BreadcrumbList). */
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

/** JSON-LD: preguntas frecuentes (FAQPage). */
export function faqPageJsonLd(
  items: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/** JSON-LD: producto/servicio con oferta (planes y herramientas). */
export function productJsonLd(opts: {
  name: string;
  description: string;
  path: string;
  price: number;
  currency?: string;
  category?: string;
  image?: string;
}) {
  const url = absoluteUrl(opts.path);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: opts.name,
    description: opts.description,
    url,
    ...(opts.image ? { image: opts.image } : {}),
    ...(opts.category ? { category: opts.category } : {}),
    brand: {
      "@type": "Brand",
      name: SITE_CONFIG.name,
    },
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: opts.currency ?? "COP",
      price: String(opts.price),
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: SITE_CONFIG.name,
        url: absoluteUrl("/"),
      },
    },
  };
}

/** JSON-LD: artículo de blog (BlogPosting). */
export function blogPostingJsonLd(post: BlogPostData) {
  const url = absoluteUrl(`/blog/${post.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url,
    mainEntityOfPage: url,
    datePublished: post.publishedAtISO,
    dateModified: post.modifiedAtISO ?? post.publishedAtISO,
    inLanguage: "es-CO",
    image: [absoluteUrl("/opengraph-image")],
    author: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: absoluteUrl("/about/"),
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: absoluteUrl("/"),
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/images/logo/logo-aeperion.png"),
      },
    },
    keywords: post.tags.join(", "),
    articleSection: post.category,
  };
}

/** Serializa y renderiza un script JSON-LD seguro. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
