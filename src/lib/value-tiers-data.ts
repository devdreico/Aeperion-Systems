import type { ValueTier } from "@/types";

/**
 * AEPERION — Niveles de valor
 *
 * No son planes cerrados ni precios de catálogo.
 * Cada nivel se cotiza según alcance, datos, riesgo y tiempo.
 */
export const VALUE_TIERS: ValueTier[] = [
  {
    id: "diagnostico",
    level: "01",
    name: "Diagnóstico",
    subtitle: "Mapa de oportunidades",
    description:
      "Entendemos tu operación, tus datos y tus sistemas. Salimos con un mapa priorizado de dónde la IA genera valor real y dónde no.",
    idealFor: "Equipos que quieren claridad antes de invertir.",
    outcome: "Roadmap priorizado con quick wins y riesgos.",
    includes: [
      "Sesiones de descubrimiento con negocio y técnica",
      "Mapa de procesos y cuellos de botella",
      "Inventario de datos y sistemas",
      "Identificación de 3-5 casos de uso priorizados",
      "Estimación de impacto y esfuerzo",
      "Recomendación de arquitectura inicial",
    ],
    upgrades: [
      "Auditoría de seguridad inicial",
      "Análisis de viabilidad regulatoria",
      "Workshop ejecutivo de IA",
    ],
    cta: "Solicitar diagnóstico",
  },
  {
    id: "piloto",
    level: "02",
    name: "Piloto agéntico",
    subtitle: "Un flujo en producción",
    description:
      "Construimos y desplegamos un flujo de trabajo agéntico real, con métricas y evaluación. La forma más rápida de demostrar valor sin apostar todo.",
    idealFor: "Equipos con un caso de uso claro y urgencia.",
    outcome: "Un agente operando en producción con métricas.",
    includes: [
      "Diseño del flujo y de la arquitectura agéntica",
      "Implementación de un caso de uso end-to-end",
      "Integraciones con tus sistemas",
      "Guardrails, evaluación y observabilidad",
      "Dashboard de métricas del flujo",
      "Transferencia y documentación",
    ],
    upgrades: [
      "RAG sobre conocimiento interno",
      "Integración con WhatsApp o correo",
      "Human-in-the-loop avanzado",
      "Capacitación del equipo",
    ],
    highlight: true,
    cta: "Cotizar piloto",
  },
  {
    id: "plataforma",
    level: "03",
    name: "Plataforma",
    subtitle: "Operación multi-agente",
    description:
      "Escalamos de un flujo a una plataforma de agentes: múltiples casos de uso, orquestación, permisos, evaluación continua y operación.",
    idealFor: "Empresas que ya validaron IA y necesitan escalar.",
    outcome: "Plataforma agéntica operando varios procesos.",
    includes: [
      "Arquitectura multi-agente y orquestación",
      "3-5 flujos en producción",
      "Capa de conocimiento y RAG con permisos",
      "Evaluación automatizada y observabilidad",
      "Panel de control y alertas",
      "Soporte y evolución mensual",
    ],
    upgrades: [
      "Agentes de ciberseguridad (AELOCK)",
      "Ingeniería inversa (KSPR)",
      "Gobierno de IA y compliance",
      "Equipo dedicado",
    ],
    cta: "Diseñar plataforma",
  },
  {
    id: "enterprise",
    level: "04",
    name: "Enterprise",
    subtitle: "Transformación AI-native",
    description:
      "Acompañamos la transformación completa: estrategia, plataforma, seguridad, gobierno y adopción. IA en el centro de la operación.",
    idealFor: "Organizaciones con múltiples áreas y sistemas.",
    outcome: "Capacidad interna instalada y operación AI-native.",
    includes: [
      "Estrategia y gobierno de IA",
      "Plataforma agéntica empresarial",
      "Seguridad y cumplimiento",
      "Integración con sistemas legados",
      "Formación de equipos internos",
      "Equipo Aeperion dedicado",
    ],
    upgrades: [
      "Sala de situación de seguridad",
      "Centro de excelencia de IA",
      "Programa de agentes internos",
    ],
    cta: "Hablar con Aeperion",
  },
];

export const VALUE_UPGRADES = [
  {
    title: "Agentes especializados",
    description: "Agentes verticales para ventas, soporte, operaciones o finanzas.",
    icon: "bot",
  },
  {
    title: "RAG y conocimiento",
    description: "Tu conocimiento interno convertido en una capa consultable y segura.",
    icon: "database",
  },
  {
    title: "Seguridad agéntica",
    description: "AELOCK integrado a tus flujos para detección y respuesta.",
    icon: "shield-check",
  },
  {
    title: "Ingeniería inversa",
    description: "KSPR reconstruye y documenta los sistemas que necesitas intervenir.",
    icon: "scan-search",
  },
  {
    title: "Observabilidad de IA",
    description: "Trazas, evaluaciones, costos y calidad de cada respuesta.",
    icon: "activity",
  },
  {
    title: "Capacitación y adopción",
    description: "Tu equipo aprende a operar, evaluar y mejorar los agentes.",
    icon: "graduation-cap",
  },
] as const;