/**
 * AEPERION SYSTEMS — Global Constants
 *
 * Domain: aeperion.presentto.online · Brand: Aeperion Systems
 * Founded 2017 · Bogotá, Colombia
 *
 * Aeperion diseña, construye y opera flujos de trabajo agénticos.
 * Expertos en uso, aplicación y desarrollo de IA.
 */

const WHATSAPP_NUMBER =
  import.meta.env.VITE_WHATSAPP_NUMBER ?? "573001234567";

const CONTACT_EMAIL =
  import.meta.env.VITE_CONTACT_EMAIL ?? "contacto@aesystems.com";

const SITE_URL =
  import.meta.env.VITE_SITE_URL ?? "https://aeperion.presentto.online";

const INSTAGRAM_URL =
  import.meta.env.VITE_INSTAGRAM_URL ?? "https://instagram.com/aeperion.systems";

const LINKEDIN_URL =
  import.meta.env.VITE_LINKEDIN_URL ?? "https://linkedin.com/company/aeperion-systems";

export const GOOGLE_SITE_VERIFICATION =
  import.meta.env.VITE_GOOGLE_SITE_VERIFICATION;

export const BING_SITE_VERIFICATION =
  import.meta.env.VITE_BING_SITE_VERIFICATION;

export const TOOL_SALES_FORM_URL = "https://formspree.io/f/xljdbpdl";

export const SITE_CONFIG = {
  name: "Aeperion Systems",
  shortName: "Aeperion",
  tagline: "Desarrollo de flujos de trabajo agénticos e IA aplicada",
  description:
    "Aeperion Systems diseña, construye y opera flujos de trabajo agénticos. Expertos en uso, aplicación y desarrollo de IA. Creadores de KSPR, AELOCK y Presentto Online. Desde 2017 en Bogotá, Colombia.",
  url: SITE_URL.replace(/\/$/, ""),
  domain: "aeperion.presentto.online",
  valueProp:
    "Convertimos procesos complejos en flujos de trabajo agénticos que operan, aprenden y escalan solos.",
  foundedYear: 2017,
  city: "Bogotá",
  country: "Colombia",
  links: {
    whatsapp: `https://wa.me/${WHATSAPP_NUMBER}`,
    email: CONTACT_EMAIL,
    instagram: INSTAGRAM_URL,
    linkedin: LINKEDIN_URL,
    kspr: "https://kspr.presentto.online",
    presentto: "https://presentto.online",
    aelock: "https://aelock.presentto.online",
    mercadoPago:
      import.meta.env.VITE_MP_LINK ?? "https://www.mercadopago.com.co/",
  },
  contact: {
    phoneDisplay: `+${WHATSAPP_NUMBER.slice(0, 2)} ${WHATSAPP_NUMBER.slice(2, 5)} ${WHATSAPP_NUMBER.slice(5, 8)} ${WHATSAPP_NUMBER.slice(8)}`,
    phoneCleansed: WHATSAPP_NUMBER,
    responseTime: "Respuesta en menos de 1 hora",
    businessHours: "Lunes a viernes: 8:00 - 18:00",
    whatsappLabel: "WhatsApp directo",
  },
  payments: {
    mercadoPago: {
      enabled: true,
      label: "Mercado Pago",
      description: "Tarjetas, PSE y efectivo. Checkout seguro.",
      link:
        import.meta.env.VITE_MP_LINK ?? "https://www.mercadopago.com.co/",
      publicKey: import.meta.env.VITE_MP_PUBLIC_KEY ?? "",
    },
  },
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/kspr", label: "KSPR" },
  { href: "/aelock", label: "AELOCK" },
  { href: "/presentto", label: "Presentto" },
  { href: "/capacidades", label: "Capacidades" },
  { href: "/casos", label: "Casos" },
  { href: "/metodo", label: "Método" },
  { href: "/nosotros", label: "Nosotros" },
] as const;

export const NAV_LINKS_SECONDARY = [
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/contacto", label: "Contacto" },
] as const;

export const NAV_LINKS_ALL = [...NAV_LINKS, ...NAV_LINKS_SECONDARY] as const;

export const SOCIAL_LINKS = {
  whatsapp: {
    label: "WhatsApp",
    href: SITE_CONFIG.links.whatsapp,
    icon: "message-circle",
  },
  instagram: {
    label: "Instagram",
    href: SITE_CONFIG.links.instagram,
    icon: "instagram",
  },
  linkedin: {
    label: "LinkedIn",
    href: SITE_CONFIG.links.linkedin,
    icon: "linkedin",
  },
  email: {
    label: "Email",
    href: `mailto:${SITE_CONFIG.links.email}`,
    icon: "mail",
  },
} as const;

export const COMPANY_VALUES = [
  {
    title: "IA aplicada, no promesas",
    description:
      "Cada flujo que diseñamos termina en producción con métricas, evaluación y observabilidad. Nada de demos que no escalan.",
    icon: "target",
  },
  {
    title: "Agentes con criterio",
    description:
      "Orquestamos agentes con herramientas, memoria, guardrails y evaluación. La autonomía se gana con evidencia.",
    icon: "bot",
  },
  {
    title: "Ingeniería inversa",
    description:
      "Entendemos el sistema antes de cambiarlo. KSPR reconstruye lógica, reglas y dependencias para intervenir con precisión.",
    icon: "search",
  },
  {
    title: "Acompañamiento real",
    description:
      "Operamos contigo: capacitación, transferencia y evolución continua. La IA no reemplaza al equipo, lo amplifica.",
    icon: "heart-handshake",
  },
] as const;

export const TRUST_METRICS = {
  agenticFlows: 60,
  agentsDeployed: 180,
  industries: 14,
  satisfactionRate: 98,
  yearsActive: new Date().getFullYear() - SITE_CONFIG.foundedYear,
} as const;

export const PAYMENT_METHODS = [
  {
    id: "mercadopago",
    name: "Mercado Pago",
    description: "Tarjetas, PSE, efectivo y cuotas sin interés.",
    href: SITE_CONFIG.payments.mercadoPago.link,
    enabled: SITE_CONFIG.payments.mercadoPago.enabled,
  },
] as const;