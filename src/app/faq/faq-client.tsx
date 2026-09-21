"use client";

import * as React from "react";
import { m, AnimatePresence } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FAQItem } from "@/types";

const faqData: FAQItem[] = [
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
      "Sí, todos nuestros precios están en pesos colombianos (COP). Aceptamos tarjetas, PSE, Nequi y Bancolombia a través de Mercado Pago y Wompi.",
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
      "Aceptamos Mercado Pago (tarjetas, PSE, efectivo y cuotas) y Wompi (tarjetas, PSE, Nequi y Bancolombia). Todos los pagos se procesan en plataformas seguras certificadas.",
  },
  {
    category: "pagos",
    question: "¿Es seguro pagar en línea?",
    answer:
      "Sí. No almacenamos datos de tarjetas; el procesamiento lo hacen Mercado Pago y Wompi bajo estándares de seguridad bancaria. Recibirás confirmación y factura electrónica.",
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

const categories = [
  { id: "all", label: "Todas" },
  { id: "planes", label: "Planes" },
  { id: "proceso", label: "Proceso" },
  { id: "soporte", label: "Soporte" },
  { id: "pagos", label: "Pagos" },
  { id: "general", label: "General" },
] as const;

export function FAQSection() {
  const [activeCategory, setActiveCategory] = React.useState<string>("all");
  const [query, setQuery] = React.useState("");
  const [openId, setOpenId] = React.useState<string | null>(null);

  const filtered = React.useMemo(() => {
    const byCategory =
      activeCategory === "all"
        ? faqData
        : faqData.filter((f) => f.category === activeCategory);
    const q = query.trim().toLowerCase();
    if (!q) return byCategory;
    return byCategory.filter(
      (f) =>
        f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)
    );
  }, [activeCategory, query]);

  return (
    <div>
      <div className="relative max-w-md mx-auto mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-fg-subtle" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar una pregunta..."
          aria-label="Buscar en preguntas frecuentes"
          className="h-12 w-full rounded-full glass pl-11 pr-4 text-sm text-fg placeholder:text-fg-subtle focus:outline-none focus:ring-2 focus:ring-ae-green-400/60"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              "relative px-4 py-2 rounded-full text-sm font-medium transition-colors",
              activeCategory === cat.id
                ? "text-white"
                : "glass text-fg-muted hover:text-fg"
            )}
          >
            {activeCategory === cat.id && (
              <m.span
                layoutId="faq-pill"
                className="absolute inset-0 rounded-full bg-ae-green-500"
                transition={{ type: "spring", stiffness: 320, damping: 30 }}
              />
            )}
            <span className="relative z-10">{cat.label}</span>
          </button>
        ))}
      </div>

      <m.div layout className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((item) => {
            const isOpen = openId === item.question;
            return (
              <m.div
                key={item.question}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className={cn(
                  "rounded-2xl border overflow-hidden transition-colors",
                  isOpen
                    ? "border-ae-green-400/40 glass-strong"
                    : "border-border glass-card"
                )}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : item.question)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-surface-2/50 transition-colors"
                >
                  <span className="text-sm md:text-base font-semibold text-fg pr-4">
                    {item.question}
                  </span>
                  <m.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="shrink-0"
                  >
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-colors",
                        isOpen ? "text-ae-green-500" : "text-fg-subtle"
                      )}
                    />
                  </m.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <m.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm text-fg-muted leading-relaxed">
                        {item.answer}
                      </p>
                    </m.div>
                  )}
                </AnimatePresence>
              </m.div>
            );
          })}
        </AnimatePresence>

        {filtered.length === 0 && (
          <p className="text-center text-sm text-fg-subtle py-8">
            No encontramos preguntas para “{query}”.
          </p>
        )}
      </m.div>
    </div>
  );
}
