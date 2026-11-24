import { m } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@/components/ui/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Seo } from "@/components/shared/seo";
import { MethodSection } from "@/components/features/method/method-section";
import { AgenticCTA } from "@/components/features/trust/agentic-cta";
import { FLOW_STAGES } from "@/lib/method-data";
import { cn } from "@/lib/utils";

export default function Metodo() {
  return (
    <>
      <Seo
        title="Método — De la ambigüedad a un agente en producción"
        description="Nuestro proceso para diseñar, construir y operar flujos de trabajo agénticos: diagnóstico, diseño, prototipo, producción y evolución."
        path="/metodo"
      />

      <section className="relative overflow-hidden border-b border-border/60 bg-surface">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-violet-400/[0.06] blur-[140px]" />
        <Container className="relative py-16 md:py-24">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-400/25 bg-violet-400/10 px-3 py-1 text-[11px] font-semibold text-violet-300">
              Método
            </span>
            <h1 className="mt-5 text-balance text-4xl font-extrabold tracking-tight text-fg md:text-5xl lg:text-6xl">
              De la ambigüedad a un agente en producción.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-fg-muted md:text-lg">
              Un proceso corto, medible y sin teatro. Cada fase termina en un
              entregable que puedes evaluar antes de avanzar.
            </p>
            <div className="mt-7">
              <Button asChild size="lg">
                <Link href="/cotizacion">
                  Empezar con un diagnóstico
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </m.div>
        </Container>
      </section>

      <MethodSection />

      <section className="border-y border-border/60 bg-surface py-16 md:py-24">
        <Container>
          <div className="mb-10 max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ae-green-400">
              Anatomía de un flujo
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-fg md:text-4xl">
              Cinco etapas. Un solo sistema.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-fg-muted">
              Así se ve un flujo agéntico de punta a punta, desde el input
              multimodal hasta la evaluación continua.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-5">
            {FLOW_STAGES.map((stage, i) => (
              <div
                key={stage.id}
                className={cn(
                  "relative rounded-2xl border p-5",
                  i === 2
                    ? "border-ae-green-400/30 bg-ae-green-400/[0.05]"
                    : "border-white/[0.08] bg-white/[0.02]"
                )}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-subtle">
                  {stage.label}
                </p>
                <h3 className="mt-2 text-sm font-bold text-fg">{stage.title}</h3>
                <p className="mt-1 text-[11px] leading-relaxed text-fg-muted">
                  {stage.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-white/[0.08] bg-black/20 p-5">
            <p className="text-xs leading-relaxed text-fg-muted">
              <span className="font-semibold text-fg">Principio operativo:</span> un agente
              no es autónomo porque se le permita actuar, sino porque su
              comportamiento está evaluado, trazado y limitado. La autonomía se
              gana con evidencia.
            </p>
          </div>
        </Container>
      </section>

      <AgenticCTA />
    </>
  );
}