"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { m } from "framer-motion";
import { cn } from "@/lib/utils";
import { ParticleSystem } from "@/components/animations/particle-system";
import { MagneticButton } from "@/components/animations/magnetic-button";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/constants";

interface FinalCTAProps {
  className?: string;
}

export function FinalCTA({ className }: FinalCTAProps) {
  return (
    <section
      className={cn(
        "relative py-28 md:py-36 overflow-hidden bg-ae-gray-900",
        className
      )}
    >
      <ParticleSystem
        count={34}
        color="rgba(110, 196, 94, 0.35)"
        speed={0.15}
        interactive={false}
        maxDistance={200}
      />

      <div className="absolute inset-0 bg-gradient-to-br from-ae-gray-900 via-ae-gray-900/95 to-ae-green-900/40" />
      <div className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full bg-ae-green-500/15 blur-[130px] animate-aurora" />
      <div className="absolute -bottom-40 -left-40 w-[440px] h-[440px] rounded-full bg-ae-green-500/10 blur-[110px] animate-aurora [animation-delay:-7s]" />

      <Container className="relative z-10 text-center">
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-ae-green-500/10 border border-ae-green-500/25 text-ae-green-300 text-xs font-semibold mb-6">
            Comienza hoy
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight text-balance">
            Tu negocio merece mejores herramientas
          </h2>
          <p className="text-lg text-ae-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
            Agenda una asesoría gratuita y descubre cómo la automatización y la
            IA pueden transformar tu operación.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <MagneticButton strength={22}>
              <Link href="/asesoria">
                <Button
                  variant="primary"
                  size="xl"
                  className="shadow-lg shadow-ae-green-500/25"
                >
                  Asesoría Gratuita
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </MagneticButton>
            <MagneticButton strength={12}>
              <Link href={SITE_CONFIG.links.whatsapp} target="_blank">
                <Button
                  variant="glass"
                  size="xl"
                  className="text-white border-white/20 hover:bg-white/10"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp
                </Button>
              </Link>
            </MagneticButton>
          </div>

          <p className="text-xs text-ae-gray-500 mt-6">
            Sin compromiso · Diagnóstico gratuito · Respuesta en menos de 1 hora
          </p>
        </m.div>
      </Container>
    </section>
  );
}
