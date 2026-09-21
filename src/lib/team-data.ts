import type { TeamMember } from "@/types";

export const TEAM: TeamMember[] = [
  {
    name: "Felipe Aeperion",
    role: "CEO & Fundador",
    bio: "Estrategia de producto y negocio. Lleva 9 años ayudando a empresas colombianas a digitalizar su operación con foco en eficiencia.",
  },
  {
    name: "Sofía Martínez",
    role: "CTO",
    bio: "Arquitectura de software e inteligencia artificial. Lidera el desarrollo de automatizaciones y modelos aplicados a operaciones reales.",
  },
  {
    name: "Tomás Rivera",
    role: "Head of Design",
    bio: "Diseño de producto e interfaces. Traduce procesos complejos en experiencias simples para el equipo de cada cliente.",
  },
  {
    name: "Gabriela Torres",
    role: "Head of Customer Success",
    bio: "Acompaña a cada cliente desde el diagnóstico hasta la adopción. Garantiza que la solución se use y genere resultados.",
  },
];

export const MILESTONES = [
  {
    year: "2017",
    title: "Nace Aeperion Systems",
    description:
      "Fundada en Bogotá como startup de desarrollo de software enfocada en resolver problemas operativos reales de las empresas.",
  },
  {
    year: "2019",
    title: "Primera ola de automatización",
    description:
      "Lanzamos nuestras primeras integraciones de WhatsApp y facturación electrónica para pymes.",
  },
  {
    year: "2021",
    title: "IA aplicada a la operación",
    description:
      "Incorporamos modelos de IA para atención, clasificación de datos y analítica predictiva.",
  },
  {
    year: "2023",
    title: "Plataforma integral",
    description:
      "Consolidamos 39 soluciones en 10 categorías, desde presencia web hasta sistemas empresariales completos.",
  },
  {
    year: "2026",
    title: "240+ clientes",
    description:
      "Compañías de todo el país operan sobre nuestras soluciones con un 98% de satisfacción.",
  },
] as const;
