import type { CaseStudy } from "@/types";

export const PROJECTS: CaseStudy[] = [
  {
    id: "p1",
    slug: "clinica-dental-automatizacion-citas",
    clientName: "Clínica Dental Sonrisa Viva",
    industry: "Salud",
    year: 2026,
    challenge:
      "La recepción no daba abasto con las citas por WhatsApp. El 38% de los mensajes quedaba sin responder y las citas perdidas representaban pérdidas mensuales importantes.",
    solution:
      "Implementamos un flujo de automatización de WhatsApp con IA: agendamiento, confirmación, recordatorios y reagendamiento sin intervención humana. Se integró con la agenda del consultorio y la facturación electrónica.",
    results: [
      "Reducción del 47% en citas perdidas",
      "Respuesta a pacientes en menos de 5 segundos, 24/7",
      "Liberó 6 horas diarias de la recepción",
    ],
    metrics: [
      { label: "Citas perdidas", value: "-47%" },
      { label: "Tiempo de respuesta", value: "<5s" },
      { label: "Horas/semana ahorradas", value: "30h" },
    ],
    testimonial:
      "El sistema agenda, confirma y recuerda solo. Recuperamos la tranquilidad y la agenda está más llena que nunca.",
    testimonialAuthor: "Camila Restrepo",
    testimonialRole: "Fundadora",
    accent: "from-ae-green-400 to-emerald-600",
    tags: ["Automatización", "WhatsApp IA", "Salud"],
  },
  {
    id: "p2",
    slug: "distribuidora-facturacion-inventario",
    clientName: "Distribuciones El Progreso",
    industry: "Comercio mayorista",
    year: 2025,
    challenge:
      "Operación 100% manual en cuadernos y Excel. El inventario nunca cuadraba y la facturación electrónica ante la DIAN se hacía con retraso y errores.",
    solution:
      "Sistema integrado de facturación electrónica, inventario en tiempo real y CRM de clientes. Dashboards ejecutivos para ver márgenes por producto y vendedor.",
    results: [
      "Facturación DIAN 100% al día desde el primer mes",
      "Inventario con 99.2% de exactitud",
      "Cierre contable reducido de 5 días a 1",
    ],
    metrics: [
      { label: "Exactitud inventario", value: "99.2%" },
      { label: "Cierre contable", value: "1 día" },
      { label: "Errores de facturación", value: "-91%" },
    ],
    testimonial:
      "Hoy facturamos electrónico y el inventario cuadra solo. Dejamos de operar a ciegas.",
    testimonialAuthor: "Andrés Villalba",
    testimonialRole: "Gerente General",
    accent: "from-sky-400 to-blue-600",
    tags: ["Facturación", "Inventario", "DIAN"],
  },
  {
    id: "p3",
    slug: "inmobiliaria-crm-ventas",
    clientName: "Inmobiliaria Altavista",
    industry: "Bienes raíces",
    year: 2025,
    challenge:
      "Los prospectos se perdían entre hojas de cálculo, WhatsApp y correo. Sin seguimiento estructurado, las ventas dependían de la memoria del asesor.",
    solution:
      "CRM inmobiliario con pipeline de ventas, automatización de seguimiento multicanal y embudo con scoring de leads. Reportería de conversión por asesor y proyecto.",
    results: [
      "Ventas mensuales de 6 a 11 propiedades",
      "Tasa de respuesta a leads del 34% al 82%",
      "Visibilidad total del pipeline comercial",
    ],
    metrics: [
      { label: "Ventas mensuales", value: "6 → 11" },
      { label: "Respuesta a leads", value: "82%" },
      { label: "Ciclo de venta", value: "-28%" },
    ],
    testimonial:
      "Ya no se nos enfría un prospecto. El CRM cambió la forma en que vendemos.",
    testimonialAuthor: "Laura Gómez",
    testimonialRole: "Directora Comercial",
    accent: "from-violet-400 to-purple-600",
    tags: ["CRM", "Ventas", "Automatización"],
  },
  {
    id: "p4",
    slug: "fintech-ia-conciliaciones",
    clientName: "AhorraYa",
    industry: "Fintech",
    year: 2025,
    challenge:
      "El equipo financiero conciliaba transacciones de forma manual durante días. Reportes regulatorios y de riesgo se construían a mano cada semana.",
    solution:
      "Automatización de conciliaciones con IA para detección de anomalías, generación automática de reportes y panel de control en tiempo real con alertas.",
    results: [
      "Conciliación diaria en 12 minutos (antes 2 días)",
      "Detección temprana de fraude en transacciones",
      "Ahorro equivalente a 2 cargos operativos",
    ],
    metrics: [
      { label: "Tiempo de conciliación", value: "-94%" },
      { label: "Anomalías detectadas", value: "+320" },
      { label: "Cargos ahorrados", value: "2" },
    ],
    testimonial:
      "El equipo de Aeperion es de otro nivel técnico. Nos ahorraron dos cargos operativos.",
    testimonialAuthor: "Ricardo Peña",
    testimonialRole: "CEO",
    accent: "from-amber-400 to-orange-600",
    tags: ["IA", "Fintech", "Automatización"],
  },
  {
    id: "p5",
    slug: "restaurante-pos-domicilios",
    clientName: "Café Montaña Roja",
    industry: "Restaurantes",
    year: 2025,
    challenge:
      "Pedidos por llamada y redes sociales sin control. Errores en domicilios, sin trazabilidad y sin datos de venta por producto.",
    solution:
      "Menú digital, POS integrado, gestión de domicilios con seguimiento y facturación. App de pedidos con pago en línea vía Mercado Pago.",
    results: [
      "Pedidos erróneos reducidos en 78%",
      "Ticket promedio +19% con ventas sugeridas",
      "Datos diarios de ventas por producto",
    ],
    metrics: [
      { label: "Pedidos erróneos", value: "-78%" },
      { label: "Ticket promedio", value: "+19%" },
      { label: "Ventas en línea", value: "+41%" },
    ],
    testimonial:
      "Pedí una página web y terminé con un sistema completo. La relación calidad-precio es increíble.",
    testimonialAuthor: "Julián Ospina",
    testimonialRole: "Propietario",
    accent: "from-rose-400 to-red-600",
    tags: ["POS", "Domicilios", "Pagos"],
  },
  {
    id: "p6",
    slug: "constructora-dashboard-obra",
    clientName: "Constructora Sólida",
    industry: "Construcción",
    year: 2024,
    challenge:
      "Sobrecostos detectados tarde y reportes de obra inconsistentes entre frentes de trabajo. Información dispersa en múltiples archivos.",
    solution:
      "Dashboard de obra en tiempo real con KPIs de avance, presupuesto y materiales. Alertas automáticas de desviación y reportes ejecutivos automáticos.",
    results: [
      "Detección de sobrecostos con 3 semanas de anticipación",
      "Reportes de obra automatizados",
      "Desviación de presupuesto reducida 22%",
    ],
    metrics: [
      { label: "Anticipación de alertas", value: "3 sem" },
      { label: "Desviación de presupuesto", value: "-22%" },
      { label: "Reportes manuales", value: "0" },
    ],
    testimonial:
      "El dashboard nos dejó ver por fin los sobrecostos a tiempo. Decidimos con datos.",
    testimonialAuthor: "Mauricio Herrera",
    testimonialRole: "Socio Fundador",
    accent: "from-teal-400 to-cyan-600",
    tags: ["Dashboard", "Analítica", "Construcción"],
  },
];

export function getProjectBySlug(slug: string) {
  return PROJECTS.find((p) => p.slug === slug);
}

export const PROJECT_INDUSTRIES = Array.from(
  new Set(PROJECTS.map((p) => p.industry))
);
