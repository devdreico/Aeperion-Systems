import { m } from "framer-motion";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { Link } from "@/components/ui/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { ParticleSystem } from "@/components/animations/particle-system";
import { SITE_CONFIG } from "@/lib/constants";

export function AgenticCTA() {
  return (
    <section className="relative overflow-hidden bg-[#05070A] py-24 md:py-32">
      <ParticleSystem
        count={38}
        color="rgba(110, 196, 94, 0.32)"
        speed={0.12}
        interactive={false}
        maxDistance={220}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#05070A] via-[#07110B] to-[#0A0A0B]" />
      <div className="absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-ae-green-500/10 blur-[130px]" />
      <div className="absolute -bottom-40 -left-40 h-[440px] w-[440px] rounded-full bg-cyan-500/[0.07] blur-[120px]" />

      <Container className="relative z-10 text-center">
        <m.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-ae-green-400/25 bg-ae-green-400/10 px-3.5 py-1.5 text-xs font-semibold text-ae-green-300">
            <Sparkles className="h-3.5 w-3.5" />
            Siguiente paso
          </span>

          <h2 className="mx-auto mt-6 max-w-3xl text-balance text-3xl font-extrabold tracking-tight text-white md:text-4xl lg:text-5xl">
            Tu operación no necesita más software. Necesita{" "}
            <span className="bg-gradient-to-r from-ae-green-300 to-cyan-300 bg-clip-text text-transparent">
              agentes que trabajen
            </span>
            .
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/55">
            Cuéntanos qué proceso quieres transformar. Te respondemos con un
            diagnóstico inicial y una propuesta de flujo agéntico, sin compromiso.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="xl">
              <Link href="/cotizacion">
                Solicitar cotización
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="glass" size="xl">
              <a href={SITE_CONFIG.links.whatsapp} target="_blank" rel="noreferrer noopener">
                <MessageCircle className="h-4 w-4" />
                Hablar por WhatsApp
              </a>
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] text-white/35">
            <span>Respuesta en menos de 1 hora</span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span>Diagnóstico sin compromiso</span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span>Bogotá, Colombia</span>
          </div>
        </m.div>
      </Container>
    </section>
  );
}