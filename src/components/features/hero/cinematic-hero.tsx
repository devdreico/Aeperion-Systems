"use client";

import Link from "next/link";
import { ArrowRight, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ParticleSystem } from "@/components/animations/particle-system";
import { MagneticButton } from "@/components/animations/magnetic-button";
import { TextReveal } from "@/components/animations/text-reveal";
import { NoiseTexture } from "@/components/animations/noise-texture";
import { Container } from "@/components/layout/container";

interface CinematicHeroProps {
  className?: string;
}

export function CinematicHero({ className }: CinematicHeroProps) {
  return (
    <section
      className={cn(
        "relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-b from-ae-gray-50 via-white to-white",
        className
      )}
    >
      <ParticleSystem
        count={60}
        color="rgba(110, 196, 94, 0.4)"
        speed={0.2}
        interactive={true}
        maxDistance={150}
      />

      <NoiseTexture opacity={0.02} />

      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-ae-green-400/5 blur-[120px]" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-ae-green-400/5 blur-[100px]" />

      <Container className="relative z-10 py-20 md:py-32">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ae-green-100/80 border border-ae-green-200/50 mb-8"
          >
            <Shield className="h-4 w-4 text-ae-green-600" />
            <span className="text-sm font-medium text-ae-green-700">
              Diagnóstico gratuito — Sin compromiso
            </span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-ae-gray-900 tracking-tight leading-[1.05] mb-6">
            <TextReveal
              text="Transformamos problemas"
              as="span"
              mode="chars"
              stagger={0.02}
              delay={0.3}
              className="block"
            />
            <TextReveal
              text="operativos en sistemas"
              as="span"
              mode="chars"
              stagger={0.02}
              delay={0.8}
              className="block"
            />
            <span className="relative inline-block mt-2">
              <TextReveal
                text="que trabajan para ti"
                as="span"
                mode="chars"
                stagger={0.02}
                delay={1.3}
                className="relative"
              />
              <span className="absolute inset-0 bg-gradient-to-r from-ae-green-400/20 to-transparent blur-xl -skew-y-1" />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-ae-gray-500 max-w-2xl mb-10 leading-relaxed"
          >
            Diagnóstico, análisis y soluciones digitales para tu negocio.
            Deja el caos operativo y empieza a crecer con sistemas que
            realmente funcionan.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <MagneticButton strength={25}>
              <Link
                href="/asesoria"
                className="group relative inline-flex items-center gap-2 px-8 py-4 bg-ae-green-500 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:bg-ae-green-600 hover:shadow-xl hover:shadow-ae-green-400/25"
              >
                <span className="relative z-10">Asesoría Gratuita</span>
                <ArrowRight className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-ae-green-400 to-ae-green-600"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
              </Link>
            </MagneticButton>

            <MagneticButton strength={15}>
              <Link
                href="/planes"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-ae-gray-200 text-ae-gray-700 font-semibold rounded-xl hover:border-ae-green-400 hover:text-ae-green-600 transition-all duration-300"
              >
                Ver Planes
              </Link>
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.5 }}
            className="flex flex-wrap items-center gap-6 mt-12 pt-8 border-t border-ae-gray-100"
          >
            {[
              { value: "150+", label: "Clientes" },
              { value: "39", label: "Herramientas" },
              { value: "97%", label: "Satisfacción" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-2">
                <span className="text-2xl font-bold text-ae-gray-900">{stat.value}</span>
                <span className="text-sm text-ae-gray-500">{stat.label}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
            className="hidden md:flex items-center gap-2 mt-16 text-xs text-ae-gray-400"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-5 h-8 rounded-full border border-ae-gray-300 flex items-start justify-center pt-1.5"
            >
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-2 rounded-full bg-ae-green-400"
              />
            </motion.div>
            <span>Scroll para explorar</span>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
