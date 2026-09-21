/**
 * AEPERION — Global Constants
 *
 * Domain: aesystems.com · Brand: Aeperion Systems
 * Founded 2017 · Bogotá, Colombia
 */

const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "573001234567";

const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contacto@aesystems.com";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aesystems.com";

const INSTAGRAM_URL =
  process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://instagram.com/aeperion.systems";

const LINKEDIN_URL =
  process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "https://linkedin.com/company/aeperion-systems";

export const SITE_CONFIG = {
  name: "Aeperion Systems",
  shortName: "Aeperion",
  tagline: "Automatización e inteligencia artificial para empresas que quieren crecer",
  description:
    "Startup fintech de desarrollo de software impulsado por IA. Automatizamos procesos y creamos sistemas digitales que dan eficiencia a las empresas. Desde 2017 en Bogotá, Colombia.",
  url: SITE_URL,
  domain: "aesystems.com",
  valueProp:
    "Deja de operar a mano. Diseñamos sistemas con IA que venden, automatizan, organizan y hacen crecer tu negocio.",
  foundedYear: 2017,
  city: "Bogotá",
  country: "Colombia",
  links: {
    whatsapp: `https://wa.me/${WHATSAPP_NUMBER}`,
    email: CONTACT_EMAIL,
    instagram: INSTAGRAM_URL,
    linkedin: LINKEDIN_URL,
    mercadoPago:
      process.env.NEXT_PUBLIC_MP_LINK ?? "https://www.mercadopago.com.co/",
    wompi: process.env.NEXT_PUBLIC_WOMPI_LINK ?? "https://checkout.wompi.co/",
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
        process.env.NEXT_PUBLIC_MP_LINK ?? "https://www.mercadopago.com.co/",
      publicKey: process.env.NEXT_PUBLIC_MP_PUBLIC_KEY ?? "",
    },
    wompi: {
      enabled: true,
      label: "Wompi",
      description: "Tarjetas, PSE, Nequi y Bancolombia. Pago seguro.",
      link: process.env.NEXT_PUBLIC_WOMPI_LINK ?? "https://checkout.wompi.co/",
      publicKey: process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY ?? "",
    },
  },
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/planes", label: "Planes" },
  { href: "/herramientas", label: "Soluciones" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/metodo", label: "Método" },
  { href: "/about", label: "Nosotros" },
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
    title: "Análisis Primero",
    description:
      "No construimos sin entender. Cada solución nace de un diagnóstico profundo de la operación real.",
    icon: "search",
  },
  {
    title: "IA con Propósito",
    description:
      "Aplicamos inteligencia artificial donde genera eficiencia real: atención, ventas, datos y decisiones.",
    icon: "bot",
  },
  {
    title: "Soluciones Reales",
    description:
      "No vendemos software genérico. Identificamos problemas específicos y construimos herramientas que los resuelven.",
    icon: "target",
  },
  {
    title: "Acompañamiento Continuo",
    description:
      "No desaparecemos después de la entrega. Cada solución incluye soporte, capacitación y evolución.",
    icon: "heart-handshake",
  },
] as const;

export const TRUST_METRICS = {
  toolsOffered: 39,
  plansDelivered: 3,
  avgDeliveryDays: 12,
  satisfactionRate: 98,
  clientsServed: 240,
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
  {
    id: "wompi",
    name: "Wompi",
    description: "Tarjetas, PSE, Nequi y Bancolombia.",
    href: SITE_CONFIG.payments.wompi.link,
    enabled: SITE_CONFIG.payments.wompi.enabled,
  },
] as const;
