"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TOOLS, TOOL_CATEGORIES } from "@/lib/tools-data";
import { CATEGORY_ICONS, CATEGORY_COLORS } from "@/components/features/tools/category-icons";
import { formatCOP, cn } from "@/lib/utils";
import type { ToolCategory } from "@/types";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function ToolsGridClient() {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("categoria") as ToolCategory | null;
  const [selectedCategory, setSelectedCategory] =
    React.useState<ToolCategory | null>(activeCategory);

  const filteredTools = selectedCategory
    ? TOOLS.filter((t) => t.category === selectedCategory)
    : TOOLS;

  return (
    <div className="pt-20">
      <Section variant="glass" size="sm">
        <Container>
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-fg tracking-tight mb-4">
              39 soluciones digitales
            </h1>
            <p className="text-lg text-fg-muted max-w-2xl mx-auto">
              Cada solución resuelve un problema específico. Adquiere solo lo que
              necesitas, cuando lo necesitas.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            <FilterPill
              active={!selectedCategory}
              onClick={() => setSelectedCategory(null)}
              label="Todas"
            />
            {TOOL_CATEGORIES.map((cat) => {
              const Icon = CATEGORY_ICONS[cat.id];
              return (
                <FilterPill
                  key={cat.id}
                  active={selectedCategory === cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  label={cat.name}
                  icon={Icon ? <Icon className="h-3.5 w-3.5" /> : undefined}
                />
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {filteredTools.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center py-16"
              >
                <p className="text-fg-muted">No hay soluciones en esta categoría.</p>
              </motion.div>
            ) : (
              <motion.div
                key={selectedCategory || "all"}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {filteredTools.map((tool) => {
                  const Icon = CATEGORY_ICONS[tool.category];
                  const color = CATEGORY_COLORS[tool.category] ?? "text-ae-green-500";
                  return (
                    <motion.div key={tool.id} variants={cardVariants} layout>
                      <Link href={`/herramientas/${tool.id}`} className="block h-full">
                        <article className="group h-full rounded-2xl glass-card p-5 hover:border-ae-green-400/40 transition-colors">
                          <div className="flex items-start justify-between mb-3">
                            <span className="h-10 w-10 rounded-xl bg-surface-2 flex items-center justify-center group-hover:scale-110 transition-transform">
                              {Icon && <Icon className={cn("h-5 w-5", color)} />}
                            </span>
                            <span className="text-sm font-bold text-ae-green-600 dark:text-ae-green-300">
                              {formatCOP(tool.price)}
                            </span>
                          </div>
                          <Badge variant="secondary" className="text-[10px] mb-2">
                            {TOOL_CATEGORIES.find((c) => c.id === tool.category)?.name}
                          </Badge>
                          <h3 className="text-base font-bold text-fg mb-1 group-hover:text-ae-green-600 dark:group-hover:text-ae-green-300 transition-colors">
                            {tool.name}
                          </h3>
                          <p className="text-xs text-fg-muted leading-relaxed line-clamp-2">
                            {tool.description}
                          </p>
                          {tool.hasDemo && (
                            <span className="inline-flex items-center gap-1 mt-3 text-[10px] text-ae-green-600 dark:text-ae-green-300 font-semibold">
                              <Sparkles className="h-3 w-3" />
                              Demo disponible
                            </span>
                          )}
                        </article>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="text-center mt-12">
            <p className="text-sm text-fg-muted mb-4">
              ¿No encuentras lo que necesitas? Todas las soluciones pueden
              combinarse en un plan.
            </p>
            <Link href="/asesoria">
              <Button variant="primary" size="lg" className="group">
                Asesoría Gratuita
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  label,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  icon?: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors",
        active ? "text-white" : "glass text-fg-muted hover:text-fg"
      )}
    >
      {active && (
        <motion.span
          layoutId="tools-pill"
          className="absolute inset-0 rounded-full bg-ae-green-500"
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-1.5">
        {icon}
        {label}
      </span>
    </button>
  );
}
