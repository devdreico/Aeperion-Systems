"use client";

import { Search, PenTool, Code, Rocket, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const phases = [
  {
    number: 1,
    icon: Search,
    title: "Diagnóstico",
    subtitle: "Entendemos tu operación",
    description:
      "Comenzamos con una conversación profunda. No asumimos nada. Preguntamos, observamos y documentamos cómo funciona realmente tu negocio.",
    details: [
      "Entrevista con founders y equipo clave",
      "Revisión de procesos actuales",
      "Identificación de herramientas existentes",
      "Mapeo de flujos operativos",
      "Detección de puntos de fricción",
    ],
    duration: "3-5 días",
  },
  {
    number: 2,
    icon: PenTool,
    title: "Análisis de brechas",
    subtitle: "Encontramos lo que falta",
    description:
      "Comparamos tu operación actual con el estado ideal. Detectamos ausencias críticas y oportunidades que no sabías que tenías.",
    details: [
      "Análisis de brechas digitales",
      "Identificación de ausencias críticas",
      "Detección de potencial dormido",
      "Priorización por impacto",
      "Reporte de oportunidades",
    ],
    duration: "2-3 días",
  },
  {
    number: 3,
    icon: Code,
    title: "Arquitectura de solución",
    subtitle: "Diseñamos lo que necesitas",
    description:
      "Con el diagnóstico claro, diseñamos la solución exacta. No construimos de más, solo lo que resuelve tus problemas reales.",
    details: [
      "Diseño de arquitectura digital",
      "Selección de herramientas",
      "Definición de integraciones",
      "Plan de implementación",
      "Presupuesto y cronograma",
    ],
    duration: "3-5 días",
  },
  {
    number: 4,
    icon: Rocket,
    title: "Implementación",
    subtitle: "Construimos y entregamos",
    description:
      "Construimos cada herramienta con estándares profesionales. Probamos, ajustamos y no soltamos el proyecto hasta que funciona en tu operación real.",
    details: [
      "Desarrollo ágil con entregas parciales",
      "Pruebas en entorno real",
      "Capacitación del equipo",
      "Documentación de uso",
      "Puesta en producción",
    ],
    duration: "7-30 días",
  },
  {
    number: 5,
    icon: TrendingUp,
    title: "Expansión",
    subtitle: "Crecemos contigo",
    description:
      "El lanzamiento es solo el comienzo. Monitoreamos, optimizamos y expandimos. Tus herramientas crecen al ritmo de tu negocio.",
    details: [
      "Soporte y mantenimiento continuo",
      "Reportes mensuales de rendimiento",
      "Optimización basada en datos",
      "Nuevas funcionalidades",
      "Escalabilidad asegurada",
    ],
    duration: "Continua",
  },
];

export function MetodoTimeline() {
  return (
    <div className="relative">
      {/* Animated connector */}
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-[23px] md:left-[31px] top-4 bottom-4 w-0.5 origin-top bg-gradient-to-b from-ae-green-400 via-ae-green-400/60 to-transparent"
      />

      <div className="space-y-16">
        {phases.map((phase) => {
          const Icon = phase.icon;
          return (
            <motion.div
              key={phase.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="relative pl-12 md:pl-16"
            >
              <div className="absolute left-0 top-0 h-12 w-12 md:h-14 md:w-14 rounded-full bg-ae-green-400 flex items-center justify-center text-white font-extrabold text-lg shadow-glow">
                {phase.number}
              </div>

              <div className="rounded-3xl glass-card p-6 md:p-7">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-8 w-8 rounded-lg bg-ae-green-400/15 flex items-center justify-center text-ae-green-500">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-semibold text-ae-green-600 dark:text-ae-green-300">
                    {phase.duration}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-fg mb-1">
                  {phase.title}
                </h2>
                <p className="text-sm text-fg-subtle font-medium mb-4">{phase.subtitle}</p>
                <p className="text-base text-fg-muted leading-relaxed mb-6">
                  {phase.description}
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {phase.details.map((detail) => (
                    <div key={detail} className="flex items-start gap-2 text-sm text-fg-muted">
                      <span className="h-1.5 w-1.5 rounded-full bg-ae-green-400 flex-shrink-0 mt-1.5" />
                      {detail}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
