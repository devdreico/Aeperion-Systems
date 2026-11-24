import type { TeamMember } from "@/types";

/**
 * AEPERION — Equipo híbrido
 *
 * Humanos + agentes. Los agentes propios se llaman SPR.
 */
export const TEAM: TeamMember[] = [
  {
    name: "Andrei Cifuentes",
    role: "Fundador & CEO",
    bio: "Estrategia, producto y relación con clientes. Lidera la tesis de Aeperion: flujos de trabajo agénticos que operan en producción, no demos.",
  },
  {
    name: "Núcleo SPR",
    role: "Agentes de ingeniería",
    bio: "Agentes especializados en análisis de sistemas, ingeniería inversa, generación de código y evaluación. Operan KSPR y aceleran cada proyecto.",
  },
  {
    name: "AELOCK Core",
    role: "Agentes de seguridad",
    bio: "Agentes de detección, triage y respuesta. Correlacionan señales, priorizan riesgo y preparan evidencia para el equipo humano.",
  },
  {
    name: "Presentto Ops",
    role: "Agentes de administración digital",
    bio: "Agentes de hosting, monitoreo, backups y soporte. Mantienen la presencia digital de los clientes de Presentto Online.",
  },
];

export const MILESTONES = [
  {
    year: "2017",
    title: "Nace Aeperion Systems",
    description:
      "Fundada en Bogotá para resolver problemas operativos reales con software a medida.",
  },
  {
    year: "2021",
    title: "IA aplicada",
    description:
      "Incorporamos modelos de IA a procesos de atención, datos y decisiones.",
  },
  {
    year: "2023",
    title: "Primeros agentes",
    description:
      "Diseñamos nuestros primeros flujos multi-agente con herramientas y evaluación.",
  },
  {
    year: "2025",
    title: "KSPR y AELOCK",
    description:
      "Lanzamos el sistema de ingeniería inversa agéntica y el agente de ciberseguridad.",
  },
  {
    year: "2026",
    title: "Presentto Online",
    description:
      "Consolidamos la administración digital para clientes inexpertos bajo Presentto.",
  },
] as const;