import type { Plan } from "@/types";

/**
 * AEPERION PLANS — Data Structure
 *
 * 4 CTA Options:
 *   1. ASESORÍA GRATUITA → CTA Principal (free)
 *   2. Plan Standart     → $200,000 COP
 *   3. Plan Fullpack     → $450,000 COP ←★ RECOMENDADO
 *   4. Plan Syspack      → $1,000,000 COP
 */

export const PLANS: Plan[] = [
  {
    id: "asesoria",
    name: "Asesoría Gratuita",
    subtitle: "Diagnóstico sin compromiso",
    price: 0,
    currency: "COP",
    period: "one-time",
    description:
      "Descubre qué necesita tu negocio. Una llamada de 30 minutos donde analizamos tu operación y te entregamos un reporte con oportunidades detectadas.",
    idealFor: "Cualquier negocio que quiera identificar sus brechas digitales",
    highlight: false,
    ctaText: "Agendar Asesoría",
    ctaRoute: "/asesoria",
    features: [
      { name: "Diagnóstico exprés (5 preguntas)", included: true },
      { name: "Llamada de 30 min con asesor", included: true },
      { name: "Reporte de oportunidades digitales", included: true },
      { name: "Sin compromiso de compra", included: true },
      { name: "Propuesta personalizada", included: true },
      { name: "Acceso a herramientas básicas", included: false },
      { name: "Soporte técnico", included: false },
      { name: "Capacitación del equipo", included: false },
    ],
    deliveryDays: 0,
    supportMonths: 0,
    color: "ae-green-400",
    icon: "sparkles",
    badge: "GRATIS",
  },
  {
    id: "standart",
    name: "Plan Standart",
    subtitle: "El primer paso digital",
    price: 200000,
    currency: "COP",
    period: "one-time",
    description:
      "Solución esencial para negocios que necesitan presencia digital inmediata con herramientas clave para empezar a crecer.",
    idealFor: "Negocios pequeños (1-3 empleados)",
    highlight: false,
    ctaText: "Elegir Standart",
    ctaRoute: "/planes/standart",
    features: [
      { name: "Página web profesional (1 página)", included: true },
      { name: "Automatización WhatsApp básica", included: true },
      { name: "1 herramienta individual a elección", included: true },
      { name: "Configuración inicial completa", included: true },
      { name: "Soporte: 1 mes", included: true },
      { name: "Capacitación del equipo", included: false },
      { name: "CRM", included: false },
      { name: "Facturación electrónica", included: false },
      { name: "Dashboard ejecutivo", included: false },
      { name: "Reportes mensuales", included: false },
    ],
    deliveryDays: 7,
    supportMonths: 1,
    color: "ae-green-500",
    icon: "rocket",
    mercadoPagoLink: "https://mpago.li/18TdeXa",
  },
  {
    id: "fullpack",
    name: "Plan Fullpack",
    subtitle: "Transformación digital completa",
    price: 450000,
    currency: "COP",
    period: "one-time",
    description:
      "Solución integral para negocios en crecimiento que necesitan automatizar su operación, centralizar sus procesos y escalar de forma ordenada.",
    idealFor: "Negocios en crecimiento (3-10 empleados)",
    highlight: true,
    ctaText: "Elegir Fullpack",
    ctaRoute: "/planes/fullpack",
    badge: "MÁS POPULAR",
    features: [
      { name: "Página web profesional (5 páginas)", included: true },
      { name: "Automatización WhatsApp completa", included: true },
      { name: "CRM básico", included: true },
      { name: "Facturación electrónica", included: true },
      { name: "3 herramientas individuales a elección", included: true },
      { name: "Capacitación del equipo", included: true },
      { name: "Soporte: 3 meses", included: true },
      { name: "Reportes mensuales de rendimiento", included: true },
      { name: "Dashboard ejecutivo", included: false },
      { name: "Sistema POS", included: false },
    ],
    deliveryDays: 15,
    supportMonths: 3,
    color: "ae-green-400",
    icon: "zap",
    mercadoPagoLink: "https://mpago.li/2j7HV3G",
  },
  {
    id: "syspack",
    name: "Plan Syspack",
    subtitle: "Sistema empresarial completo",
    price: 1000000,
    currency: "COP",
    period: "one-time",
    description:
      "Solución enterprise para empresas que necesitan un sistema digital completo, integrado y escalable con soporte premium y expansión total.",
    idealFor: "Empresas en expansión (10+ empleados)",
    highlight: false,
    ctaText: "Solicitar Syspack",
    ctaRoute: "/planes/syspack",
    badge: "ENTERPRISE",
    features: [
      { name: "Página web / app completa (10+ páginas)", included: true },
      { name: "Automatización WhatsApp avanzada + API", included: true },
      { name: "CRM completo + POS integrado", included: true },
      { name: "Facturación electrónica + contabilidad", included: true },
      { name: "Sistema de administración interno", included: true },
      { name: "10 herramientas individuales a elección", included: true },
      { name: "Capacitación completa del equipo", included: true },
      { name: "Soporte: 6 meses + mantenimiento", included: true },
      { name: "Dashboard ejecutivo con KPIs", included: true },
      { name: "Expansión redes sociales + contenido", included: true },
    ],
    deliveryDays: 30,
    supportMonths: 6,
    color: "ae-black",
    icon: "building2",
    mercadoPagoLink: "https://mpago.li/1qxcgM4",
  },
];

export const PLAN_COMPARISON_HEADERS = [
  { label: "Característica", key: "feature" },
  { label: "Standart", key: "standart" },
  { label: "Fullpack", key: "fullpack" },
  { label: "Syspack", key: "syspack" },
];

export const PLAN_COMPARISON_ROWS = [
  {
    feature: "Páginas web",
    standart: "1 página",
    fullpack: "5 páginas",
    syspack: "10+ páginas / app",
  },
  {
    feature: "WhatsApp Automation",
    standart: "Básico",
    fullpack: "Completo",
    syspack: "Avanzado + API",
  },
  {
    feature: "CRM",
    standart: "—",
    fullpack: "Básico",
    syspack: "Completo + POS",
  },
  {
    feature: "Facturación electrónica",
    standart: "—",
    fullpack: "✓",
    syspack: "✓ + Contabilidad",
  },
  {
    feature: "Herramientas incluidas",
    standart: "1",
    fullpack: "3",
    syspack: "10",
  },
  {
    feature: "Capacitación",
    standart: "—",
    fullpack: "Equipo",
    syspack: "Completa",
  },
  {
    feature: "Soporte",
    standart: "1 mes",
    fullpack: "3 meses",
    syspack: "6 meses + mantenimiento",
  },
  {
    feature: "Dashboard KPIs",
    standart: "—",
    fullpack: "—",
    syspack: "✓",
  },
  {
    feature: "Redes sociales",
    standart: "—",
    fullpack: "—",
    syspack: "✓",
  },
  {
    feature: "Inversión",
    standart: "$200,000",
    fullpack: "$450,000",
    syspack: "$1,000,000",
  },
];
