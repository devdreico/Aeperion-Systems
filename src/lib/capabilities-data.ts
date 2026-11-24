import type { Capability } from "@/types";

export const CAPABILITIES: Capability[] = [
  {
    id: "agentic-workflows",
    title: "Flujos de trabajo agénticos",
    description:
      "Diseñamos y operamos sistemas multi-agente con herramientas, memoria, guardrails y evaluación. La autonomía se gana con evidencia.",
    icon: "workflow",
    accent: "green",
    bullets: [
      "Orquestación multi-agente",
      "Tool calling e integraciones",
      "Memoria y contexto persistente",
      "Guardrails y human-in-the-loop",
      "Evaluación y observabilidad",
    ],
  },
  {
    id: "reverse-engineering",
    title: "Ingeniería inversa con IA",
    description:
      "KSPR reconstruye la lógica de sistemas existentes para intervenir con precisión: código, reglas, dependencias y decisiones.",
    icon: "scan-search",
    accent: "green",
    bullets: [
      "Análisis de repositorios",
      "Extracción de reglas de negocio",
      "Mapa de dependencias",
      "Documentación viva",
      "Migraciones asistidas",
    ],
  },
  {
    id: "agentic-security",
    title: "Ciberseguridad agéntica",
    description:
      "AELOCK correlaciona señales, prioriza riesgos y responde con contexto. Seguridad aumentada por agentes, no reemplazada por ellos.",
    icon: "shield-check",
    accent: "violet",
    bullets: [
      "Threat hunting",
      "Triage de vulnerabilidades",
      "Respuesta a incidentes",
      "Hardening continuo",
      "Cumplimiento y evidencia",
    ],
  },
  {
    id: "data-rag",
    title: "Datos, RAG y evaluación",
    description:
      "Construimos la capa de conocimiento que hace útil a un agente: ingestión, retrieval, permisos, evaluación y mejora continua.",
    icon: "database",
    accent: "cyan",
    bullets: [
      "Pipelines de ingestión",
      "RAG con permisos",
      "Evaluación de calidad",
      "Trazabilidad de respuestas",
      "Métricas de negocio",
    ],
  },
  {
    id: "ai-native-dev",
    title: "Desarrollo AI-native",
    description:
      "Productos web, APIs y automatizaciones construidos alrededor de IA desde el primer día, no como un añadido.",
    icon: "code-2",
    accent: "green",
    bullets: [
      "Aplicaciones web y APIs",
      "Copilotos y asistentes",
      "Automatizaciones end-to-end",
      "Integraciones con sistemas legados",
      "Deploy y operación",
    ],
  },
  {
    id: "managed-digital",
    title: "Administración digital",
    description:
      "Presentto Online opera la presencia digital de clientes inexpertos: hosting, dominio, correo, web, backups y soporte.",
    icon: "server-cog",
    accent: "cyan",
    bullets: [
      "Hosting gestionado",
      "Dominios y DNS",
      "Correo corporativo",
      "Backups y monitoreo",
      "Soporte humano + IA",
    ],
  },
];

export const CAPABILITY_MAP = Object.fromEntries(
  CAPABILITIES.map((c) => [c.id, c])
) as Record<string, Capability>;