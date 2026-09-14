"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FAQItem } from "@/types";

const faqData: FAQItem[] = [
  {
    category: "planes",
    question: "¿Qué incluye cada plan?",
    answer:
      "Cada plan incluye un conjunto específico de herramientas y servicios. El Plan Standart incluye página web de 1 página, automatización WhatsApp básica y 1 herramienta individual. El Fullpack agrega CRM, facturación, 3 herramientas y capacitación. El Syspack incluye todo lo anterior más sistema administrativo, dashboard, redes sociales y 10 herramientas.",
  },
  {
    category: "planes",
    question: "¿Puedo comprar herramientas individuales sin contratar un plan?",
    answer:
      "Sí. Ofrecemos 39 herramientas individuales que puedes adquirir por separado. Cada una tiene un precio único y funciona de forma independiente. Sin embargo, los planes ofrecen un ahorro significativo si necesitas múltiples herramientas.",
  },
  {
    category: "planes",
    question: "¿Los precios son en pesos colombianos?",
    answer:
      "Sí, todos nuestros precios están expresados en pesos colombianos (COP) e incluyen IVA. Aceptamos pagos por transferencia bancaria, tarjeta de crédito/débito y Nequi.",
  },
  {
    category: "planes",
    question: "¿Ofrecen financiación?",
    answer:
      "Sí. Para los planes Fullpack y Syspack ofrecemos opciones de pago en 2 o 3 cuotas sin interés. Consulta con nuestro equipo de asesoría para más detalles.",
  },
  {
    category: "proceso",
    question: "¿Cuánto tiempo toma implementar una solución?",
    answer:
      "Depende del plan: Standart se entrega en 5-7 días hábiles, Fullpack en 10-15 días, y Syspack en 20-30 días. Las herramientas individuales pueden estar listas en 2-5 días hábiles dependiendo de la complejidad.",
  },
  {
    category: "proceso",
    question: "¿Necesito conocimientos técnicos?",
    answer:
      "No. Nosotros nos encargamos de todo: desarrollo, configuración y puesta en marcha. Solo necesitas decirnos qué necesitas. Incluimos capacitación para tu equipo en todos los planes.",
  },
  {
    category: "proceso",
    question: "¿Cómo es el proceso de trabajo?",
    answer:
      "Nuestro método tiene 5 fases: 1) Diagnóstico (entendemos tu operación), 2) Análisis de brechas (encontramos lo que falta), 3) Arquitectura de solución (diseñamos la herramienta exacta), 4) Implementación (construimos y entregamos), 5) Expansión (crecemos contigo).",
  },
  {
    category: "soporte",
    question: "¿Qué soporte incluye cada plan?",
    answer:
      "El Plan Standart incluye 1 mes de soporte, Fullpack 3 meses y Syspack 6 meses con mantenimiento incluido. El soporte cubre ajustes, resolución de problemas y actualizaciones menores. Soporte adicional puede contratarse por separado.",
  },
  {
    category: "soporte",
    question: "¿Los tiempos de respuesta?",
    answer:
      "Respondemos en menos de 1 hora en horario laboral (L-V 8:00-18:00). Para clientes con plan activo, el tiempo de respuesta máximo es de 4 horas para incidencias críticas.",
  },
  {
    category: "pagos",
    question: "¿Qué métodos de pago aceptan?",
    answer:
      "Aceptamos transferencia bancaria (Bancolombia, Davivienda, Nequi), tarjetas de crédito/débito a través de nuestra pasarela de pagos, y Nequi. Próximamente añadiremos PayPal y criptomonedas.",
  },
  {
    category: "pagos",
    question: "¿Hay garantía?",
    answer:
      "Sí. Todos nuestros planes incluyen una garantía de satisfacción de 15 días. Si no estás conforme con el resultado, te devolvemos tu dinero sin preguntas.",
  },
  {
    category: "general",
    question: "¿Qué tipo de clientes atienden?",
    answer:
      "Atendemos desde negocios unipersonales hasta empresas en expansión. Nuestros clientes típicos tienen entre 1 y 50 empleados y buscan digitalizar su operación. Trabajamos con cualquier industria: comercio, servicios, restaurantes, salud, educación, entre otros.",
  },
  {
    category: "general",
    question: "¿Trabajan solo en Colombia?",
    answer:
      "Actualmente operamos principalmente en Colombia, pero hemos trabajado con clientes en otros países de Latinoamérica. Nuestro modelo de trabajo es 100% remoto, así que no hay limitación geográfica.",
  },
];

const categories = [
  { id: "all" as const, label: "Todas" },
  { id: "planes" as const, label: "Planes" },
  { id: "proceso" as const, label: "Proceso" },
  { id: "soporte" as const, label: "Soporte" },
  { id: "pagos" as const, label: "Pagos" },
  { id: "general" as const, label: "General" },
];

export function FAQSection() {
  const [activeCategory, setActiveCategory] = React.useState<string>("all");
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const filtered = activeCategory === "all"
    ? faqData
    : faqData.filter((f) => f.category === activeCategory);

  return (
    <div>
      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((cat) => (
          <motion.button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
              activeCategory === cat.id
                ? "bg-ae-gray-900 text-white"
                : "bg-ae-gray-100 text-ae-gray-600 hover:bg-ae-gray-200"
            )}
          >
            {cat.label}
          </motion.button>
        ))}
      </div>

      {/* Accordion */}
      <div className="space-y-3">
        {filtered.map((item, i) => (
          <div
            key={i}
            className="rounded-2xl border border-ae-gray-200 overflow-hidden transition-all duration-200"
          >
            <motion.button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              whileTap={{ scale: 0.995 }}
              aria-expanded={openIndex === i}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-ae-gray-50 transition-colors"
            >
              <span className="text-sm font-medium text-ae-gray-900 pr-4">
                {item.question}
              </span>
              <motion.div
                animate={{ rotate: openIndex === i ? 180 : 0 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <ChevronDown className="h-4 w-4 text-ae-gray-400 flex-shrink-0" />
              </motion.div>
            </motion.button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5">
                    <p className="text-sm text-ae-gray-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
