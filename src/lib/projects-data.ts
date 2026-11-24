import type { CaseStudy } from "@/types";

/**
 * AEPERION — Casos de flujos de trabajo agénticos
 *
 * Evidencia de la tesis: agentes en producción, con métricas y operación.
 */
export const PROJECTS: CaseStudy[] = [
  {
    id: "p1",
    slug: "kspr-core-bancario",
    clientName: "Fintech andina",
    industry: "Servicios financieros",
    year: 2026,
    challenge:
      "Un core transaccional de 12 años sin documentación confiable. Cada cambio requería semanas de análisis manual y el riesgo de romper reglas de negocio ocultas era altísimo.",
    solution:
      "KSPR reconstruyó la arquitectura, las reglas de negocio y las dependencias del core con agentes SPR. Generó documentación viva y un mapa de intervención priorizado para el equipo.",
    results: [
      "Análisis inicial reducido de 6 semanas a 5 días",
      "1.240 reglas de negocio extraídas y validadas",
      "Mapa de dependencias con puntos de riesgo identificados",
    ],
    metrics: [
      { label: "Tiempo de análisis", value: "-88%" },
      { label: "Reglas extraídas", value: "1.240" },
      { label: "Cobertura documentada", value: "92%" },
    ],
    testimonial:
      "KSPR nos mostró partes del sistema que ni el equipo original recordaba. Pasamos de miedo a un plan claro.",
    testimonialAuthor: "CTO",
    testimonialRole: "Fintech andina",
    accent: "from-ae-green-400 to-emerald-600",
    tags: ["KSPR", "Ingeniería inversa", "Legacy"],
  },
  {
    id: "p2",
    slug: "aelock-soc-agentico",
    clientName: "SaaS B2B",
    industry: "Tecnología",
    year: 2026,
    challenge:
      "El equipo de seguridad recibía miles de alertas semanales. El 70% era ruido y los incidentes reales se detectaban tarde.",
    solution:
      "AELOCK se integró al SIEM y al stack cloud. Los agentes correlacionan señales, priorizan por riesgo real y preparan investigación y respuesta para el equipo humano.",
    results: [
      "Ruido operativo reducido en 72%",
      "Tiempo de triage de horas a minutos",
      "Playbooks de respuesta ejecutables con contexto",
    ],
    metrics: [
      { label: "Ruido", value: "-72%" },
      { label: "Triage", value: "Minutos" },
      { label: "Cobertura", value: "24/7" },
    ],
    testimonial:
      "AELOCK no reemplazó al equipo: lo hizo mirar solo lo que importa. El cambio en carga operativa fue inmediato.",
    testimonialAuthor: "Head of Security",
    testimonialRole: "SaaS B2B",
    accent: "from-violet-400 to-purple-600",
    tags: ["AELOCK", "Ciberseguridad", "SOC"],
  },
  {
    id: "p3",
    slug: "presentto-pymes",
    clientName: "Red de pymes",
    industry: "Servicios",
    year: 2025,
    challenge:
      "120 pequeños negocios con dominios vencidos, sitios caídos, correos mal configurados y cero soporte técnico. Nadie sabía a quién llamar.",
    solution:
      "Presentto Online centralizó hosting, dominios, correo, backups y soporte. Un panel único y un equipo humano + agentes que monitorea y resuelve.",
    results: [
      "Uptime agregado de 99.9%",
      "Tickets críticos resueltos en menos de 4 horas",
      "Cero conocimiento técnico requerido por parte del cliente",
    ],
    metrics: [
      { label: "Uptime", value: "99.9%" },
      { label: "Pymes administradas", value: "120" },
      { label: "Soporte", value: "<4h" },
    ],
    testimonial:
      "Yo vendo comida, no entiendo de hosting. Presentto se encarga de todo y mi página nunca se cae.",
    testimonialAuthor: "Propietaria",
    testimonialRole: "Negocio gastronómico",
    accent: "from-cyan-400 to-sky-600",
    tags: ["Presentto", "Hosting", "Soporte"],
  },
  {
    id: "p4",
    slug: "flujo-agentico-ventas",
    clientName: "Distribuidora nacional",
    industry: "Comercio",
    year: 2025,
    challenge:
      "Los leads llegaban por WhatsApp, correo y formulario. Sin seguimiento unificado, el 40% se enfriaba antes del primer contacto.",
    solution:
      "Flujo agéntico de ventas: captura multicanal, calificación, enriquecimiento, asignación y seguimiento. El agente redacta, agenda y escala a humano cuando toca.",
    results: [
      "Tasa de respuesta a leads de 34% a 86%",
      "Ciclo de venta reducido en 31%",
      "Cero leads sin seguimiento",
    ],
    metrics: [
      { label: "Respuesta", value: "86%" },
      { label: "Ciclo de venta", value: "-31%" },
      { label: "Leads perdidos", value: "0" },
    ],
    testimonial:
      "El flujo no se cansa, no olvida y no se salta pasos. Nos devolvió el control del pipeline.",
    testimonialAuthor: "Gerente Comercial",
    testimonialRole: "Distribuidora nacional",
    accent: "from-amber-400 to-orange-600",
    tags: ["Agentes", "Ventas", "Multicanal"],
  },
  {
    id: "p5",
    slug: "rag-firma-legal",
    clientName: "Firma jurídica",
    industry: "Legal",
    year: 2025,
    challenge:
      "800.000 documentos de jurisprudencia y contratos sin forma de consultarlos con precisión. Los abogados perdían horas buscando precedentes.",
    solution:
      "Capa RAG con permisos por caso, evaluación de respuestas y citas verificables. El agente responde con fuente, página y nivel de confianza.",
    results: [
      "Búsqueda de precedentes de horas a segundos",
      "Respuestas con cita y trazabilidad",
      "Adopción del 90% del equipo legal",
    ],
    metrics: [
      { label: "Tiempo de búsqueda", value: "-95%" },
      { label: "Documentos indexados", value: "800k" },
      { label: "Adopción", value: "90%" },
    ],
    testimonial:
      "No queríamos un chatbot que inventara. Queríamos respuestas con fuente. Eso es lo que construyeron.",
    testimonialAuthor: "Socia",
    testimonialRole: "Firma jurídica",
    accent: "from-rose-400 to-red-600",
    tags: ["RAG", "Legal", "Evaluación"],
  },
  {
    id: "p6",
    slug: "agentes-operaciones-logistica",
    clientName: "Operador logístico",
    industry: "Logística",
    year: 2024,
    challenge:
      "Facturas, guías y documentos de transporte llegaban en PDF, imagen y correo. La digitación manual generaba errores y retrasos.",
    solution:
      "Agentes multimodales de extracción y validación: leen documentos, contrastan con el sistema, detectan anomalías y escalan excepciones.",
    results: [
      "Documentos procesados sin digitación manual",
      "Errores de captura reducidos en 91%",
      "Cierre operativo diario en 30 minutos",
    ],
    metrics: [
      { label: "Errores", value: "-91%" },
      { label: "Cierre diario", value: "30 min" },
      { label: "Documentos/día", value: "2.400" },
    ],
    testimonial:
      "El equipo dejó de teclear y empezó a supervisar. La operación se volvió aburrida, en el buen sentido.",
    testimonialAuthor: "Director de Operaciones",
    testimonialRole: "Operador logístico",
    accent: "from-sky-400 to-blue-600",
    tags: ["Multimodal", "Operaciones", "Agentes"],
  },
];

export const PROJECT_MAP = Object.fromEntries(
  PROJECTS.map((p) => [p.slug, p])
) as Record<string, CaseStudy>;