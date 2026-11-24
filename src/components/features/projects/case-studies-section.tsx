import { m } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/components/ui/link";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/shared/section-header";
import { PROJECTS } from "@/lib/projects-data";
import { cn } from "@/lib/utils";

interface Props {
  limit?: number;
  showHeader?: boolean;
}

export function CaseStudiesSection({ limit, showHeader = true }: Props) {
  const items = limit ? PROJECTS.slice(0, limit) : PROJECTS;

  return (
    <section className="relative overflow-hidden bg-surface-1/40 py-20 md:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <Container className="relative">
        {showHeader && (
          <SectionHeader
            badge="Casos"
            title="Agentes en producción, con números."
            description="Casos reales de flujos agénticos, ingeniería inversa, seguridad y administración digital."
          />
        )}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((project, i) => (
            <m.div
              key={project.id}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: (i % 3) * 0.07 }}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] p-5 backdrop-blur-md transition-colors hover:border-ae-green-400/30"
            >
              <div className={cn("absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r", project.accent)} />
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-fg-subtle">
                    {project.industry} · {project.year}
                  </p>
                  <h3 className="mt-1 text-base font-bold text-fg">{project.clientName}</h3>
                </div>
                <Badge variant="glass" className="shrink-0 text-[9px]">
                  {project.tags[0]}
                </Badge>
              </div>

              <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-fg-muted">
                {project.challenge}
              </p>

              <div className="mt-4 grid grid-cols-3 gap-2 border-y border-white/[0.06] py-3">
                {project.metrics.map((metric) => (
                  <div key={metric.label}>
                    <p className="text-sm font-extrabold text-fg">{metric.value}</p>
                    <p className="text-[9px] uppercase tracking-wider text-fg-subtle">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 text-[9px] text-fg-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                href={`/casos#${project.slug}`}
                className="mt-4 inline-flex items-center gap-1 text-[11px] font-semibold text-ae-green-400"
              >
                Ver caso completo
                <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </m.div>
          ))}
        </div>

        {limit && (
          <div className="mt-8 text-center">
            <Link
              href="/casos"
              className="inline-flex items-center gap-1 text-xs font-semibold text-fg-muted transition-colors hover:text-ae-green-400"
            >
              Ver todos los casos
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
}