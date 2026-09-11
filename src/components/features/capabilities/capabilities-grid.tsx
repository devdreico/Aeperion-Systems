"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { HoverCard } from "@/components/animations/hover-card";
import { SectionHeader } from "@/components/shared/section-header";
import { Container } from "@/components/layout/container";
import { Search, Bot, Code2, TrendingUp } from "lucide-react";

const capabilities = [
  {
    icon: Search,
    title: "Análisis",
    description: "Diagnosticamos tu negocio para identificar oportunidades de mejora y procesos que pueden ser optimizados.",
    features: ["Diagnóstico gratuito", "Mapeo de procesos", "Detección de cuellos de botella", "ROI projection"],
    gradient: "from-ae-green-400/20 to-transparent",
  },
  {
    icon: Bot,
    title: "Automatización",
    description: "Eliminamos tareas repetitivas con sistemas inteligentes que trabajan 24/7 por tu negocio.",
    features: ["WhatsApp automation", "Email marketing", "Facturación automática", "CRM inteligente"],
    gradient: "from-blue-400/20 to-transparent",
  },
  {
    icon: Code2,
    title: "Desarrollo",
    description: "Creamos soluciones digitales a medida: sitios web, apps, sistemas POS y más.",
    features: ["Desarrollo web", "Apps móviles", "Sistemas POS", "Integraciones API"],
    gradient: "from-purple-400/20 to-transparent",
  },
  {
    icon: TrendingUp,
    title: "Expansión",
    description: "Te acompañamos en el crecimiento con herramientas que escalan al ritmo de tu negocio.",
    features: ["Analítica avanzada", "Dashboard KPIs", "Escalabilidad", "Soporte continuo"],
    gradient: "from-amber-400/20 to-transparent",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
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
    <section className={cn("py-20 md:py-28 bg-white relative overflow-hidden", className)}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-ae-green-400/5 blur-[150px]" />

      <Container className="relative z-10">
        <SectionHeader
          badge="Nuestro Enfoque"
          title="De la diagnosis a la solución"
          description="No vendemos herramientas sin entender tu negocio. Primero diagnosticamos, luego construimos."
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
                <HoverCard tiltDegree={6} scale={1.03} glare={true} glareColor="rgba(110, 196, 94, 0.08)">
                  <div className="relative h-full p-8 rounded-2xl border border-ae-gray-100 bg-white group transition-colors hover:border-ae-green-200">
                    <div className={cn(
                      "absolute inset-0 rounded-2xl bg-gradient-to-b opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                      cap.gradient
                    )} />

                    <div className="relative z-10">
                      <div className="h-12 w-12 rounded-xl bg-ae-green-100 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="h-6 w-6 text-ae-green-600" />
                      </div>
                      <h3 className="text-xl font-bold text-ae-gray-900 mb-3">{cap.title}</h3>
                      <p className="text-sm text-ae-gray-500 mb-5 leading-relaxed">{cap.description}</p>
                      <ul className="space-y-2">
                        {cap.features.map((f) => (
                          <li key={f} className="flex items-center gap-2 text-xs text-ae-gray-600">
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
    </section>
  );
}
