import { m } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/shared/section-header";
import { METHOD_STEPS } from "@/lib/method-data";
import { cn } from "@/lib/utils";

export function MethodSection({ compact = false }: { compact?: boolean }) {
  return (
    <section className="relative overflow-hidden bg-surface-1/40 py-20 md:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <Container className="relative">
        <SectionHeader
          badge="Método Aeperion"
          title="De la ambigüedad a un agente en producción."
          description="Un proceso corto, medible y sin teatro. Cada fase termina en un entregable que puedes evaluar."
        />

        <div className="relative grid gap-4 lg:grid-cols-5">
          <div className="pointer-events-none absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-ae-green-400/25 to-transparent lg:block" />
          {METHOD_STEPS.map((step, i) => (
            <m.div
              key={step.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
              className="relative"
            >
              <div className="group relative flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.025] p-5 backdrop-blur-md transition-colors hover:border-ae-green-400/30">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ae-green-400/30 bg-ae-green-400/10 font-mono text-xs font-bold text-ae-green-300">
                    {step.step}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-fg-subtle">
                    {step.duration}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-bold text-fg">{step.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-fg-muted">{step.description}</p>
                {!compact && (
                  <ul className="mt-4 space-y-1.5 border-t border-white/[0.06] pt-3">
                    {step.deliverables.map((d) => (
                      <li key={d} className="flex items-center gap-2 text-[11px] text-fg-muted">
                        <ArrowRight className="h-3 w-3 text-ae-green-400/70" />
                        {d}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </m.div>
          ))}
        </div>

        <p className={cn("mt-6 text-center text-xs text-fg-subtle")}>
          Cada fase se cotiza según alcance. No hay planes cerrados ni precios de catálogo.
        </p>
      </Container>
    </section>
  );
}