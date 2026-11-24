import type { Product } from "@/types";

/**
 * AEPERION — Productos principales
 *
 * Tres sistemas propios que demuestran la tesis de la compañía:
 * flujos de trabajo agénticos aplicados a problemas reales.
 */
export const PRODUCTS: Product[] = [
  {
    id: "kspr",
    name: "KSPR",
    tagline: "Ingeniería inversa agéntica",
    description:
      "Sistema de IA agéntica que reconstruye la lógica de sistemas existentes: código, reglas de negocio, dependencias y decisiones.",
    longDescription:
      "KSPR es nuestro sistema de ingeniería inversa aumentada por agentes. Sus agentes SPR leen repositorios, infraestructura y documentación para reconstruir cómo funciona un sistema antes de intervenirlo. El resultado: análisis profundo, especificaciones vivas y migraciones con evidencia, no con suposiciones.",
    href: "https://kspr.presentto.online",
    external: true,
    accent: "green",
    icon: "scan-search",
    category: "Ingeniería inversa · Agentes",
    capabilities: [
      "Análisis multi-repositorio y reconstrucción de arquitectura",
      "Extracción de reglas de negocio y flujos ocultos",
      "Mapa de dependencias, riesgos y puntos de intervención",
      "Documentación viva generada y validada por agentes SPR",
      "Migraciones asistidas con trazabilidad y evaluación",
      "Auditoría técnica continua sobre el sistema en producción",
    ],
    outcomes: [
      { label: "Tiempo de análisis", value: "-80%" },
      { label: "Cobertura de lógica", value: "Profunda" },
      { label: "Agentes SPR", value: "Especializados" },
    ],
    stack: ["LLMs", "RAG", "Tree-sitter", "Agentes", "Observabilidad"],
    useCases: [
      {
        title: "Core legado sin documentación",
        description: "Reconstruye arquitectura, reglas y dependencias antes de migrar o intervenir.",
      },
      {
        title: "Due diligence técnica",
        description: "Evalúa el riesgo real de adquirir o integrar un sistema desconocido.",
      },
      {
        title: "Auditoría de lógica",
        description: "Detecta reglas ocultas, deuda técnica y puntos de fallo antes de tocar producción.",
      },
    ],
    integrations: ["GitHub", "GitLab", "Jira", "Confluence", "Bases de datos", "APIs"],
    status: "production",
  },
  {
    id: "aelock",
    name: "AELOCK",
    tagline: "Ciberseguridad agéntica",
    description:
      "Agente de IA para procesos de ciberseguridad: detección, triage, respuesta y hardening continuo.",
    longDescription:
      "AELOCK opera como un equipo de seguridad aumentado por IA. Sus agentes correlacionan señales, priorizan vulnerabilidades, investigan alertas y proponen respuestas con contexto. Diseñado para equipos que necesitan postura de seguridad real sin inflar la nómina.",
    href: "https://aelock.presentto.online",
    external: true,
    accent: "violet",
    icon: "shield-check",
    category: "Ciberseguridad · Agentes",
    capabilities: [
      "Threat hunting asistido y correlación de señales",
      "Triage y priorización de vulnerabilidades por riesgo real",
      "Investigación de alertas con contexto de negocio",
      "Respuesta a incidentes con playbooks ejecutables",
      "Hardening continuo y verificación de configuraciones",
      "Reportes de cumplimiento y evidencia para auditoría",
    ],
    outcomes: [
      { label: "Triage de alertas", value: "Automatizado" },
      { label: "Cobertura", value: "24/7" },
      { label: "Ruido operativo", value: "-70%" },
    ],
    stack: ["LLMs", "SIEM", "MITRE ATT&CK", "Playbooks", "Agentes"],
    useCases: [
      {
        title: "SOC aumentado",
        description: "Reduce ruido, prioriza por riesgo y acelera la investigación de alertas.",
      },
      {
        title: "Hardening continuo",
        description: "Verifica configuraciones, permisos y superficie de exposición.",
      },
      {
        title: "Respuesta a incidentes",
        description: "Playbooks ejecutables con contexto, evidencia y trazabilidad.",
      },
    ],
    integrations: ["SIEM", "EDR", "Cloud (AWS/GCP/Azure)", "MITRE ATT&CK", "Slack", "PagerDuty"],
    status: "beta",
  },
  {
    id: "presentto",
    name: "Presentto Online",
    tagline: "Presencia digital administrada",
    description:
      "Host y empresa de administración digital completa para clientes que no quieren lidiar con la tecnología.",
    longDescription:
      "Presentto Online es la capa de administración digital de Aeperion para clientes inexpertos. Nos encargamos del hosting, dominio, correo, sitio web, backups, seguridad y soporte. El cliente se enfoca en su negocio; los agentes y el equipo Aeperion se enfocan en que su presencia digital funcione.",
    href: "https://presentto.online",
    external: true,
    accent: "cyan",
    icon: "server-cog",
    category: "Hosting · Administración digital",
    capabilities: [
      "Hosting gestionado, dominios y certificados",
      "Sitios web administrados y actualizados",
      "Correo corporativo y configuración de DNS",
      "Backups, monitoreo y recuperación",
      "Seguridad gestionada y parches",
      "Soporte humano + agentes para clientes inexpertos",
    ],
    outcomes: [
      { label: "Uptime objetivo", value: "99.9%" },
      { label: "Soporte", value: "Humano + IA" },
      { label: "Complejidad para el cliente", value: "Cero" },
    ],
    stack: ["Hosting", "DNS", "Backups", "Monitoreo", "Agentes"],
    useCases: [
      {
        title: "Pyme sin equipo técnico",
        description: "Hosting, dominio, correo y web administrados de punta a punta.",
      },
      {
        title: "Profesional independiente",
        description: "Presencia digital profesional sin contratar a nadie más.",
      },
      {
        title: "Red de negocios",
        description: "Administración centralizada de múltiples dominios y sitios.",
      },
    ],
    integrations: ["Dominios", "DNS", "Correo", "WordPress", "Vercel", "Cloudflare"],
    status: "production",
  },
];

export const PRODUCT_MAP = Object.fromEntries(
  PRODUCTS.map((p) => [p.id, p])
) as Record<Product["id"], Product>;