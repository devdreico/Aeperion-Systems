import type { FAQItem } from "@/types";

export const FAQ_ITEMS: FAQItem[] = [
  {
    category: "planes",
    question: "¿Qué incluye cada plan?",
    answer:
      "El Plan Standart incluye página web de 1 página, automatización de WhatsApp básica y 1 solución individual. El Fullpack agrega CRM, facturación electrónica, 3 soluciones y capacitación. El Syspack incluye todo lo anterior más sistema administrativo, dashboard de KPIs, redes sociales y 10 soluciones.",
  },
  {
    category: "planes",
    question: "¿Puedo comprar soluciones individuales sin contratar un plan?",
    answer:
      "Sí. Ofrecemos 39 soluciones individuales que puedes adquirir por separado, cada una con precio único. Los planes ofrecen un ahorro significativo si necesitas varias.",
  },
  {
    category: "planes",
    question: "¿Los precios son en pesos colombianos?",
    answer:
      "Sí, todos nuestros precios están en pesos colombianos (COP). Aceptamos tarjetas, PSE, efectivo y cuotas a través de Mercado Pago.",
  },
  {
    category: "planes",
    question: "¿Ofrecen financiación?",
    answer:
      "Para los planes Fullpack y Syspack ofrecemos opciones de pago en 2 o 3 cuotas sin interés. Consulta con nuestro equipo de asesoría.",
  },
  {
    category: "planes",
    question: "¿Cómo usan la inteligencia artificial?",
    answer:
      "Aplicamos IA donde genera eficiencia real: atención automatizada en WhatsApp, clasificación de datos, detección de anomalías, analítica predictiva y agentes que ejecutan tareas repetitivas. No usamos IA como adorno, sino para ahorrar tiempo y costo.",
  },
  {
    category: "proceso",
    question: "¿Cuánto tiempo toma implementar una solución?",
    answer:
      "Depende del plan: Standart en 5-7 días hábiles, Fullpack en 10-15 días y Syspack en 20-30 días. Las soluciones individuales suelen estar listas en 2-5 días hábiles.",
  },
  {
    category: "proceso",
    question: "¿Necesito conocimientos técnicos?",
    answer:
      "No. Nos encargamos de todo: desarrollo, configuración y puesta en marcha. Solo necesitas contarnos qué necesitas. Incluimos capacitación para tu equipo.",
  },
  {
    category: "proceso",
    question: "¿Cómo es el proceso de trabajo?",
    answer:
      "Nuestro método tiene 5 fases: Diagnóstico, Análisis de brechas, Arquitectura de solución, Implementación y Expansión. Puedes verlo en detalle en la página de Método.",
  },
  {
    category: "soporte",
    question: "¿Qué soporte incluye cada plan?",
    answer:
      "Standart incluye 1 mes, Fullpack 3 meses y Syspack 6 meses con mantenimiento. El soporte cubre ajustes, resolución de problemas y actualizaciones menores.",
  },
  {
    category: "soporte",
    question: "¿Cuáles son los tiempos de respuesta?",
    answer:
      "Respondemos en menos de 1 hora en horario laboral (L-V 8:00-18:00). Para clientes con plan activo, el máximo es de 4 horas en incidencias críticas.",
  },
  {
    category: "pagos",
    question: "¿Qué métodos de pago aceptan?",
    answer:
      "Aceptamos Mercado Pago con tarjetas, PSE, efectivo y cuotas. Todos los pagos se procesan en una plataforma segura certificada.",
  },
  {
    category: "pagos",
    question: "¿Es seguro pagar en línea?",
    answer:
      "Sí. No almacenamos datos de tarjetas; el procesamiento lo hace Mercado Pago bajo estándares de seguridad bancaria. Recibirás confirmación y factura electrónica.",
  },
  {
    category: "pagos",
    question: "¿Hay garantía?",
    answer:
      "Todos nuestros planes incluyen una garantía de satisfacción de 15 días. Si no estás conforme con el resultado acordado, revisamos el caso y aplicamos la devolución correspondiente.",
  },
  {
    category: "general",
    question: "¿Qué tipo de clientes atienden?",
    answer:
      "Desde negocios unipersonales hasta empresas en expansión, típicamente entre 1 y 50 empleados. Trabajamos con cualquier industria: comercio, servicios, restaurantes, salud, construcción, fintech y más.",
  },
  {
    category: "general",
    question: "¿Trabajan solo en Colombia?",
    answer:
      "Operamos principalmente en Colombia, con clientes en otros países de Latinoamérica. Nuestro modelo es 100% remoto, sin limitación geográfica.",
  },
  {
    category: "general",
    question: "¿Desde cuándo existe Aeperion Systems?",
    answer:
      "Nacimos en 2017 en Bogotá, Colombia. Llevamos más de 9 años construyendo software y automatizaciones para empresas de todo el país.",
  },
];

export const FAQ_CATEGORIES = [
  { id: "all", label: "Todas" },
  { id: "planes", label: "Planes" },
  { id: "proceso", label: "Proceso" },
  { id: "soporte", label: "Soporte" },
  { id: "pagos", label: "Pagos" },
  { id: "general", label: "General" },
] as const;
