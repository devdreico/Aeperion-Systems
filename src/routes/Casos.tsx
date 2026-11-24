import { m } from "framer-motion";
import { ArrowRight, Quote } from "lucide-react";
import { Link } from "@/components/ui/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Seo } from "@/components/shared/seo";
import { AgenticCTA } from "@/components/features/trust/agentic-cta";
import { PROJECTS } from "@/lib/projects-data";
import { cn } from "@/lib/utils";

export default function Casos() {
  return (
    <>
      <Seo
        title="Casos — Agentes en producción"
        description="Casos reales de flujos agénticos, ingeniería inversa, ciberseguridad y administración digital en empresas colombianas."
        path="/casos"
      />

      <section className="relative overflow-hidden border-b border-border/60 bg-surface">
        <div className="pointer-events-none absolute -left-40 -top-40 h-[480px] w-[480px] rounded-full bg-cyan-400/[0.06] blur-[140px]" />
        <Container className="relative py-16 md:py-24">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-[11px] font-semibold text-cyan-300">
              Casos
            </span>
            <h1 className="mt-5 text-balance text-4xl font-extrabold tracking-tight text-fg md:text-5xl lg:text-6xl">
              Agentes en producción, con números.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-fg-muted md:text-lg">
              Cada caso incluye el problema, la arquitectura, el resultado y la
              voz del equipo que lo opera.
            </p>
          </m.div>
        </Container>
      </section>

      <section className="bg-surface py-16 md:py-24">
        <Container className="space-y-8">
          {PROJECTS.map((project, i) => (
            <m.article
              key={project.id}
              id={project.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: i * 0.03 }}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] p-6 backdrop-blur-md md:p-8"
            >
              <div className={cn("absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r", project.accent)} />
              <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="glass" className="text-[10px]">
                      {project.industry}
                    </Badge>
                    <span className="text-[11px] text-fg-subtle">{project.year}</span>
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 text-[9px] text-fg-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-fg">
                    {project.clientName}
                  </h2>

                  <div className="mt-5 space-y-4">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-fg-subtle">
                        Reto
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-fg-muted">{project.challenge}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-fg-subtle">
                        Solución
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-fg-muted">{project.solution}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-fg-subtle">
                        Resultados
                      </p>
                      <ul className="mt-1 space-y-1.5">
                        {project.results.map((result) => (
                          <li key={result} className="flex items-start gap-2 text-sm text-fg-muted">
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ae-green-400" />
                            {result}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-3 gap-2">
                    {project.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="rounded-xl border border-white/[0.06] bg-black/20 p-3 text-center"
                      >
                        <p className="text-lg font-extrabold text-fg">{metric.value}</p>
                        <p className="text-[9px] uppercase tracking-wider text-fg-subtle">
                          {metric.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  <blockquote className="relative flex-1 rounded-2xl border border-white/[0.06] bg-black/20 p-5">
                    <Quote className="h-5 w-5 text-ae-green-400/40" />
                    <p className="mt-2 text-sm italic leading-relaxed text-fg-muted">
                      “{project.testimonial}”
                    </p>
                    <footer className="mt-3 text-[11px] text-fg-subtle">
                      <span className="font-semibold text-fg">{project.testimonialAuthor}</span> ·{" "}
                      {project.testimonialRole}
                    </footer>
                  </blockquote>

                  <Button asChild variant="glass" className="w-full">
                    <Link href="/cotizacion">
                      Quiero un caso así
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </m.article>
          ))}
        </Container>
      </section>

      <AgenticCTA />
    </>
  );
}