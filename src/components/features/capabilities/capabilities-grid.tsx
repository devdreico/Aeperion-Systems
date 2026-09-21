"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { HoverCard } from "@/components/animations/hover-card";
import { SectionHeader } from "@/components/shared/section-header";
import { CursorSpotlight } from "@/components/animations/cursor-spotlight";
import { Container } from "@/components/layout/container";
import { Search, Bot, Code2, TrendingUp } from "lucide-react";

const capabilities = [
  {
    icon: Search,
    title: "Diagnóstico",
    description:
      "Analizamos tu operación para encontrar fugas de tiempo y dinero antes de construir nada.",
    features: ["Diagnóstico gratuito", "Mapeo de procesos", "Cuellos de botella", "Proyección de ROI"],
  },
  {
    icon: Bot,
    title: "Automatización con IA",
    description:
      "Agentes y flujos que atienden, clasifican y ejecutan tareas 24/7 sin intervención manual.",
    features: ["WhatsApp con IA", "Email automation", "Facturación automática", "CRM inteligente"],
  },
  {
    icon: Code2,
    title: "Desarrollo a medida",
    description:
      "Software, web y apps construidos alrededor de tu proceso real, no de una plantilla.",
    features: ["Web y apps", "Sistemas POS", "Integraciones API", "Dashboards"],
  },
  {
    icon: TrendingUp,
    title: "Escalabilidad",
    description:
      "Herramientas que crecen contigo, con datos y soporte para decidir mejor cada mes.",
    features: ["Analítica avanzada", "KPIs en vivo", "Infraestructura cloud", "Soporte continuo"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

interface CapabilitiesGridProps {
  className?: string;
}

export function CapabilitiesGrid({ className }: CapabilitiesGridProps) {
  return (
    <section className={cn("py-20 md:py-28 bg-surface relative overflow-hidden", className)}>
      <CursorSpotlight className="block">
        <Container className="relative z-10">
          <SectionHeader
            badge="Nuestro enfoque"
            title="Del diagnóstico a la solución"
            description="No vendemos herramientas sin entender tu negocio. Primero diagnosticamos, luego construimos lo que de verdad mueve la aguja."
            align="center"
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
          >
            {capabilities.map((cap) => {
              const Icon = cap.icon;
              return (
                <motion.div key={cap.title} variants={cardVariants}>
                  <HoverCard tiltDegree={6} scale={1.03} glare glareColor="rgba(110, 196, 94, 0.1)">
                    <div className="relative h-full p-8 rounded-3xl glass-card group transition-colors hover:border-ae-green-400/40">
                      <div className="relative z-10">
                        <div className="h-12 w-12 rounded-2xl bg-ae-green-400/15 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                          <Icon className="h-6 w-6 text-ae-green-500" />
                        </div>
                        <h3 className="text-xl font-bold text-fg mb-3">{cap.title}</h3>
                        <p className="text-sm text-fg-muted mb-5 leading-relaxed">
                          {cap.description}
                        </p>
                        <ul className="space-y-2">
                          {cap.features.map((f) => (
                            <li key={f} className="flex items-center gap-2 text-xs text-fg-muted">
                              <span className="h-1.5 w-1.5 rounded-full bg-ae-green-400 flex-shrink-0" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </HoverCard>
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </CursorSpotlight>
    </section>
  );
}
