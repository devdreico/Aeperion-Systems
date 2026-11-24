import type { FlowStage, MethodStep } from "@/types";

export const FLOW_STAGES: FlowStage[] = [
  {
    id: "input",
    label: "01 · Input",
    title: "Multimodal",
    description: "Texto, documentos, imágenes, audio, video y datos de sistemas.",
    icon: "layers",
  },
  {
    id: "understanding",
    label: "02 · Comprensión",
    title: "Contexto",
    description: "RAG, ingeniería inversa y modelos que entienden tu operación.",
    icon: "brain",
  },
  {
    id: "orchestration",
    label: "03 · Orquestación",
    title: "Agentes SPR",
    description: "Agentes con herramientas, memoria, permisos y guardrails.",
    icon: "workflow",
  },
  {
    id: "action",
    label: "04 · Acción",
    title: "Ejecución",
    description: "APIs, sistemas, personas y canales. El flujo termina en el mundo real.",
    icon: "zap",
  },
  {
    id: "learning",
    label: "05 · Aprendizaje",
    title: "Evaluación",
    description: "Métricas, trazas y mejora continua. La autonomía se gana con evidencia.",
    icon: "activity",
  },
];

export const METHOD_STEPS: MethodStep[] = [
  {
    id: "diagnostico",
    step: "01",
    title: "Diagnóstico",
    description:
      "Mapeamos procesos, datos y sistemas. Identificamos dónde la IA genera valor y dónde solo añade riesgo.",
    deliverables: ["Mapa de procesos", "Casos de uso priorizados", "Estimación de impacto"],
    duration: "1-2 semanas",
  },
  {
    id: "diseno",
    step: "02",
    title: "Diseño del flujo",
    description:
      "Diseñamos la arquitectura agéntica: agentes, herramientas, memoria, permisos, guardrails y métricas.",
    deliverables: ["Arquitectura", "Contratos de datos", "Plan de evaluación"],
    duration: "1-2 semanas",
  },
  {
    id: "prototipo",
    step: "03",
    title: "Prototipo",
    description:
      "Construimos el flujo end-to-end con datos reales. Validamos calidad, latencia, costo y riesgos.",
    deliverables: ["Flujo funcional", "Evaluación inicial", "Demo ejecutiva"],
    duration: "2-4 semanas",
  },
  {
    id: "produccion",
    step: "04",
    title: "Producción",
    description:
      "Desplegamos con observabilidad, guardrails y human-in-the-loop. Integramos con tus sistemas.",
    deliverables: ["Flujo en producción", "Dashboard", "Runbook operativo"],
    duration: "2-6 semanas",
  },
  {
    id: "evolucion",
    step: "05",
    title: "Evolución",
    description:
      "Medimos, evaluamos y mejoramos. Añadimos casos de uso y transferimos capacidad a tu equipo.",
    deliverables: ["Reporte mensual", "Mejoras priorizadas", "Capacitación"],
    duration: "Continuo",
  },
];