"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ParallaxLayer } from "@/components/animations/parallax-layer";
import { ParticleSystem } from "@/components/animations/particle-system";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/constants";

interface FinalCTAProps {
  className?: string;
}

export function FinalCTA({ className }: FinalCTAProps) {
  return (
    <section className={cn("relative py-28 md:py-36 overflow-hidden bg-ae-gray-900", className)}>
      {/* Particle Background */}
      <ParticleSystem
        count={30}
        color="rgba(110, 196, 94, 0.3)"
        speed={0.15}
        interactive={false}
        maxDistance={200}
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-ae-gray-900 via-ae-gray-900/95 to-ae-green-900/30" />
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-ae-green-500/10 blur-[120px]" />
      <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-ae-green-500/10 blur-[100px]" />

      <ParallaxLayer speed={0.3} direction="vertical">
        <Container className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="inline-block px-4 py-1.5 rounded-full bg-ae-green-500/10 border border-ae-green-500/20 text-ae-green-400 text-xs font-medium mb-6"
            >
              Comienza hoy
            </motion.span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
              Tu negocio merece mejores herramientas
            </h2>
            <p className="text-lg text-ae-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
              Agenda una asesoría gratuita y descubre cómo podemos transformar
              la operación de tu negocio.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/asesoria">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button variant="primary" size="xl" className="shadow-lg shadow-ae-green-500/25">
                    Asesoría Gratuita
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </motion.div>
              </Link>
              <Link href={SITE_CONFIG.links.whatsapp} target="_blank">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button variant="secondary" size="xl" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                    <MessageCircle className="h-5 w-5" />
                    WhatsApp
                  </Button>
                </motion.div>
              </Link>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="text-xs text-ae-gray-500 mt-6"
            >
              Sin compromiso · Diagnóstico gratuito · Respuesta en 24 horas
            </motion.p>
          </motion.div>
        </Container>
      </ParallaxLayer>
    </section>
  );
}
