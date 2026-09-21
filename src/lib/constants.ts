/**
 * AEPERION — Global Constants
 *
 * HANDOFF-FRONTEND:
 *   - SITE_URL usado para SEO metadata
 *   - SOCIAL_LINKS usado en footer y botón WhatsApp
 *   - NAV_LINKS usado en Nav component
 */

export const SITE_CONFIG = {
  name: "Aeperion Systems",
  tagline: "Transformamos problemas operativos en sistemas que trabajan para ti",
  description:
    "Empresa de desarrollo de software enfocada en analizar, categorizar y brindar soluciones digitales a negocios que presentan problemas operativos o falta de estructura digital.",
  url: "https://aeperion.com",
  ogImage: "/images/og-image.png",
  valueProp:
    "Deja de operar a mano. Diseñamos sistemas digitales que venden, automatizan, organizan y hacen crecer tu negocio.",
  links: {
    whatsapp: "https://wa.me/573001234567",
    email: "contacto@aeperion.com",
    instagram: "https://instagram.com/aeperion",
    linkedin: "https://linkedin.com/company/aeperion",
    mercadoPago: "https://www.mercadopago.com.co/",
  },
  contact: {
    phoneDisplay: "+57 300 123 4567",
    phoneCleansed: "573001234567",
    responseTime: "Respuesta en menos de 1 hora",
    businessHours: "Lunes a viernes: 8:00 - 18:00",
    whatsappLabel: "WhatsApp directo",
  },
  payments: {
    mercadoPago: {
      enabled: false,
      label: "Mercado Pago",
      description: "Pago seguro para planes y herramientas. Configura tu access token en variables de entorno.",
      publicKey: "",
    },
  },
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/planes", label: "Planes" },
  { href: "/herramientas", label: "Herramientas" },
  { href: "/metodo", label: "Método" },
  { href: "/about", label: "Nosotros" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/contacto", label: "Contacto" },
] as const;

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
    title: "Soluciones Reales",
    description:
      "No vendemos software genérico. Identificamos problemas específicos y construimos herramientas que los resuelven.",
    icon: "target",
  },
  {
    title: "Expansión Digital",
    description:
      "Ayudamos a las empresas a dar el salto digital de forma ordenada, escalable y sostenible.",
    icon: "trending-up",
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
  satisfactionRate: 97,
  clientsServed: 150,
  yearsActive: 4,
} as const;
