"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ParticleSystem } from "@/components/animations/particle-system";
import { MagneticButton } from "@/components/animations/magnetic-button";
import { TextReveal } from "@/components/animations/text-reveal";
import { NoiseTexture } from "@/components/animations/noise-texture";
import { AuroraBackground } from "@/components/animations/aurora-background";
import { CounterAnimation } from "@/components/animations/counter-animation";
import { Container } from "@/components/layout/container";
import { SITE_CONFIG, TRUST_METRICS } from "@/lib/constants";

interface CinematicHeroProps {
  className?: string;
}

const stats = [
  { to: TRUST_METRICS.clientsServed, suffix: "+", label: "Clientes" },
  { to: TRUST_METRICS.toolsOffered, suffix: "", label: "Soluciones" },
  { to: TRUST_METRICS.satisfactionRate, suffix: "%", label: "Satisfacción" },
  { to: TRUST_METRICS.yearsActive, suffix: "", label: "Años" },
];

export function CinematicHero({ className }: CinematicHeroProps) {
  return (
    <section
      className={cn(
        "relative min-h-[92vh] flex items-center overflow-hidden mesh-bg bg-surface",
        className
      )}
    >
      <AuroraBackground />
      <ParticleSystem
        count={55}
        color="rgba(110, 196, 94, 0.4)"
        speed={0.2}
        interactive={true}
        maxDistance={150}
      />
      <NoiseTexture opacity={0.02} />

      <Container className="relative z-10 py-24 md:py-32">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
          >
            <Sparkles className="h-4 w-4 text-ae-green-500" />
            <span className="text-sm font-medium text-fg">
              IA aplicada a la operación de tu empresa
            </span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-fg tracking-tight leading-[1.04] mb-6">
            <TextReveal
              text="Automatizamos tu operación"
              as="span"
              mode="chars"
              stagger={0.018}
              delay={0.25}
              className="block"
            />
            <TextReveal
              text="con software e IA a la"
              as="span"
              mode="chars"
              stagger={0.018}
              delay={0.7}
              className="block"
            />
            <span className="relative inline-block mt-2">
              <TextReveal
                text="medida de tu negocio"
                as="span"
                mode="chars"
                stagger={0.018}
                delay={1.15}
                className="relative text-gradient-green"
              />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-fg-muted max-w-2xl mb-10 leading-relaxed"
          >
            Startup fintech de desarrollo de software con IA. Diseñamos sistemas
            que venden, automatizan y organizan, para que tu equipo se dedique a
            crecer. Desde {SITE_CONFIG.foundedYear} en {SITE_CONFIG.city}.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <MagneticButton strength={25}>
              <Link
                href="/asesoria"
                className="group relative inline-flex items-center gap-2 px-8 py-4 bg-ae-green-500 text-white font-semibold rounded-2xl overflow-hidden transition-all duration-300 hover:bg-ae-green-600 hover:shadow-glow"
              >
                <span className="relative z-10">Asesoría Gratuita</span>
                <ArrowRight className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </MagneticButton>

            <MagneticButton strength={15}>
              <Link
                href="/herramientas"
                className="inline-flex items-center gap-2 px-8 py-4 glass text-fg font-semibold rounded-2xl hover:border-ae-green-400/50 transition-all duration-300"
              >
                Ver soluciones
              </Link>
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.3 }}
            className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-x-8 gap-y-4 mt-12 pt-8 border-t border-border"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-fg">
                  <CounterAnimation to={stat.to} suffix={stat.suffix} duration={1.8} delay={2.5} />
                </span>
                <span className="text-sm text-fg-muted">{stat.label}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.8 }}
            className="hidden md:flex items-center gap-4 mt-16 text-xs text-fg-subtle"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-5 h-8 rounded-full border border-border flex items-start justify-center pt-1.5"
            >
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-2 rounded-full bg-ae-green-400"
              />
            </motion.div>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              {SITE_CONFIG.city}, {SITE_CONFIG.country} · Scroll para explorar
            </span>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
