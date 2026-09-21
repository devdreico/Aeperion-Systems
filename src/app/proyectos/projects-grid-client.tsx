"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { CaseStudy } from "@/types";
import { HoverCard } from "@/components/animations/hover-card";
import { Badge } from "@/components/ui/badge";

interface ProjectsGridClientProps {
  projects: CaseStudy[];
  industries: string[];
}

export function ProjectsGridClient({ projects, industries }: ProjectsGridClientProps) {
  const [filter, setFilter] = useState<string>("all");

  const filtered =
    filter === "all" ? projects : projects.filter((p) => p.industry === filter);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {["all", ...industries].map((industry) => (
          <button
            key={industry}
            type="button"
            onClick={() => setFilter(industry)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              filter === industry
                ? "bg-ae-green-500 text-white"
                : "glass text-fg-muted hover:text-fg"
            )}
          >
            {industry === "all" ? "Todos" : industry}
          </button>
        ))}
      </div>

      <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
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
                      <span className="relative text-xs font-bold text-white/90 uppercase tracking-wider">
                        {project.industry} · {project.year}
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
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-[10px]">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </article>
                </Link>
              </HoverCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
