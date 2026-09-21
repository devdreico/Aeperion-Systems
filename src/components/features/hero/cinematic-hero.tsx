"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, Sparkles, MapPin, Layers } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/animations/magnetic-button";
import { NoiseTexture } from "@/components/animations/noise-texture";
import { AuroraBackground } from "@/components/animations/aurora-background";
import { CounterAnimation } from "@/components/animations/counter-animation";
import { Container } from "@/components/layout/container";
import { SITE_CONFIG, TRUST_METRICS } from "@/lib/constants";
import { HeroVisualFallback } from "./hero-visual-fallback";

const CommandCenter3D = dynamic(
  () => import("./command-center-3d").then((m) => ({ default: m.CommandCenter3D })),
  { ssr: false, loading: () => <HeroVisualFallback /> }
);

interface CinematicHeroProps {
  className?: string;
}

const ease = [0.16, 1, 0.3, 1] as const;

const stats = [
  { to: TRUST_METRICS.clientsServed, suffix: "+", label: "Clientes" },
  { to: TRUST_METRICS.toolsOffered, suffix: "", label: "Soluciones" },
  { to: TRUST_METRICS.satisfactionRate, suffix: "%", label: "Satisfacción" },
  { to: TRUST_METRICS.yearsActive, suffix: "", label: "Años" },
];

export function CinematicHero({ className }: CinematicHeroProps) {
  const [webglFailed, setWebglFailed] = useState(false);
  const { resolvedTheme } = useTheme();
  const shouldReduceMotion = useReducedMotion() ?? false;
  const heroTheme = resolvedTheme === "light" ? "light" : "dark";

  return (
    <section
      className={cn(
        "relative flex min-h-[100svh] items-center overflow-hidden bg-surface",
        className
      )}
    >
      {/* Ambient layers */}
      <AuroraBackground parallax={40} />
      <div className="hero-grid-overlay pointer-events-none absolute inset-0 opacity-70" />
      <div className="hero-vignette pointer-events-none absolute inset-0" />

      {/* WebGL command center */}
      <div className="absolute inset-0 z-0">
        {webglFailed ? (
          <HeroVisualFallback />
        ) : (
          <CommandCenter3D
            theme={heroTheme}
            reducedMotion={shouldReduceMotion}
            onFail={() => setWebglFailed(true)}
          />
        )}
        <NoiseTexture opacity={0.03} />
      </div>

      {/* Legibility scrim */}
      <div className="hero-scrim pointer-events-none absolute inset-0 z-[1]" />

      {/* Copy */}
      <Container className="relative z-10 pb-44 pt-28 md:pt-32 md:pb-48">
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="mb-7 inline-flex items-center gap-2 rounded-full glass px-4 py-2"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ae-green-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-ae-green-500" />
            </span>
            <span className="text-sm font-medium text-fg">
              Desde {SITE_CONFIG.foundedYear} · {SITE_CONFIG.city} · IA aplicada a la operación
            </span>
          </motion.div>

          <h1 className="relative overflow-hidden text-4xl font-extrabold leading-[1.05] tracking-tight text-fg sm:text-5xl md:text-6xl lg:text-7xl">
            {[
              { text: "Tu operación,", gradient: false, delay: 0.25 },
              { text: "en piloto automático.", gradient: true, delay: 0.45 },
            ].map((line) => (
              <span key={line.text} className="block overflow-hidden pb-[0.12em]">
                <motion.span
                  initial={shouldReduceMotion ? { y: 0 } : { y: "115%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: line.delay, ease }}
                  className={cn("block", line.gradient && "text-gradient-green")}
                >
                  {line.text}
                </motion.span>
              </span>
            ))}
            {/* One-time light sheen */}
            <span
              aria-hidden
              className="animate-sheen pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/45 to-transparent dark:via-white/25"
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.4, ease }}
            className="mb-9 mt-6 max-w-lg text-base leading-relaxed text-fg-muted md:text-lg"
          >
            Aeperion diseña software e IA que atienden, venden y organizan por
            ti. Menos tareas manuales, más crecimiento medible.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.6, ease }}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <MagneticButton strength={25}>
              <Link
                href="/asesoria"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-ae-green-500 px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-ae-green-600 hover:shadow-glow"
              >
                <span className="relative z-10">Asesoría Gratuita</span>
                <ArrowRight className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" />
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-ae-green-400 to-ae-green-600 transition-transform duration-500 group-hover:translate-x-0" />
              </Link>
            </MagneticButton>

            <MagneticButton strength={15}>
              <Link
                href="/herramientas"
                className="inline-flex items-center gap-2 rounded-2xl glass px-8 py-4 font-semibold text-fg transition-all duration-300 hover:border-ae-green-400/50"
              >
                <Layers className="h-4 w-4 text-ae-green-500" />
                Explorar soluciones
              </Link>
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.9 }}
            className="mt-7 flex items-center gap-2 text-xs text-fg-subtle"
          >
            <Sparkles className="h-3.5 w-3.5 text-ae-green-500" />
            Diagnóstico gratuito · Sin compromiso · Respuesta en menos de 1 hora
          </motion.div>
        </div>
      </Container>

      {/* HUD */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2.1, ease }}
        className="absolute inset-x-0 bottom-0 z-10"
      >
        <Container>
          <div className="mb-6 flex flex-col gap-4 rounded-3xl glass p-4 sm:flex-row sm:items-center sm:justify-between md:mb-8 md:p-5">
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 sm:flex sm:items-center sm:gap-10">
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-fg md:text-2xl">
                    <CounterAnimation
                      to={stat.to}
                      suffix={stat.suffix}
                      duration={1.8}
                      delay={2.4}
                    />
                  </span>
                  <span className="text-xs text-fg-muted">{stat.label}</span>
                </div>
              ))}
            </div>

            <div className="hidden items-center gap-3 text-xs text-fg-subtle md:flex">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                {SITE_CONFIG.city}
              </span>
              <span className="h-4 w-px bg-border" />
              <span className="inline-flex items-center gap-2">
                Desliza para explorar
                <motion.span
                  animate={shouldReduceMotion ? {} : { y: [0, 5, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-flex h-6 w-4 items-start justify-center rounded-full border border-border pt-1"
                >
                  <span className="h-1.5 w-1 rounded-full bg-ae-green-400" />
                </motion.span>
              </span>
            </div>
          </div>
        </Container>
      </motion.div>
    </section>
  );
}
