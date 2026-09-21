"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { m } from "framer-motion";
import { cn } from "@/lib/utils";
import { PROJECTS } from "@/lib/projects-data";
import { HoverCard } from "@/components/animations/hover-card";
import { SectionHeader } from "@/components/shared/section-header";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProjectsSectionProps {
  className?: string;
  limit?: number;
  showCta?: boolean;
}

export function ProjectsSection({
  className,
  limit = 3,
  showCta = true,
}: ProjectsSectionProps) {
  const projects = PROJECTS.slice(0, limit);

  return (
    <section className={cn("py-20 md:py-28 bg-surface relative overflow-hidden", className)}>
      <Container className="relative">
        <SectionHeader
          badge="Casos de éxito"
          title="Resultados que se miden"
          description="Problemas operativos reales resueltos con software, automatización e IA."
          align="center"
        />

        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.12, delayChildren: 0.1 },
            },
          }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14"
        >
          {projects.map((project) => (
            <m.div
              key={project.id}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                },
              }}
            >
              <HoverCard tiltDegree={4} scale={1.02} glare>
                <Link href={`/proyectos/${project.slug}`} className="block h-full">
                  <article className="group relative h-full rounded-3xl glass-card overflow-hidden">
                    <div
                      className={cn(
                        "relative h-36 bg-gradient-to-br p-6 flex flex-col justify-between",
                        project.accent
                      )}
                    >
                      <div className="absolute inset-0 bg-black/10" />
                      <span className="relative text-xs font-bold text-white/90 uppercase tracking-wider">
                        {project.industry}
                      </span>
                      <ArrowUpRight className="relative h-6 w-6 text-white transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>

                    <div className="p-6">
                      <h3 className="text-lg font-bold text-fg mb-1">
                        {project.clientName}
                      </h3>
                      <p className="text-sm text-fg-muted leading-relaxed line-clamp-3">
                        {project.challenge}
                      </p>

                      <div className="mt-5 grid grid-cols-3 gap-2">
                        {project.metrics.map((metric) => (
                          <div key={metric.label}>
                            <div className="text-sm font-bold text-ae-green-500">
                              {metric.value}
                            </div>
                            <div className="text-[10px] text-fg-subtle leading-tight">
                              {metric.label}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-[10px]">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </article>
                </Link>
              </HoverCard>
            </m.div>
          ))}
        </m.div>

        {showCta && (
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mt-12"
          >
            <Link href="/proyectos">
              <Button variant="secondary" size="lg" className="group">
                Ver todos los proyectos
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            </Link>
          </m.div>
        )}
      </Container>
    </section>
  );
}
