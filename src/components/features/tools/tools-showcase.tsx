"use client";

import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TOOL_CATEGORIES, TOOLS } from "@/lib/tools-data";
import { CATEGORY_ICONS } from "@/components/features/tools/category-icons";
import { HoverCard } from "@/components/animations/hover-card";
import { SectionHeader } from "@/components/shared/section-header";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

interface ToolsShowcaseProps {
  className?: string;
}

export function ToolsShowcase({ className }: ToolsShowcaseProps) {
  return (
    <section className={cn("py-20 md:py-28 bg-surface-1 relative overflow-hidden", className)}>
      <Container>
        <SectionHeader
          badge="39 soluciones"
          title="Todo lo que tu negocio necesita"
          description="Desde presencia web hasta automatización avanzada. Cada solución resuelve un problema operativo específico."
          align="center"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.05, delayChildren: 0.15 },
            },
          }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-12"
        >
          {TOOL_CATEGORIES.map((cat) => {
            const count = TOOLS.filter((t) => t.category === cat.id).length;
            const Icon = CATEGORY_ICONS[cat.id] ?? Zap;
            return (
              <motion.div
                key={cat.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
              >
                <HoverCard tiltDegree={5} scale={1.03} glare={false}>
                  <Link
                    href={`/herramientas?categoria=${cat.id}`}
                    className="block p-5 rounded-2xl glass-card hover:border-ae-green-400/40 transition-colors h-full group"
                  >
                    <div className="h-10 w-10 rounded-xl bg-ae-green-400/15 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-5 w-5 text-ae-green-500" />
                    </div>
                    <h3 className="text-sm font-bold text-fg mb-1">{cat.name}</h3>
                    <p className="text-[10px] text-fg-subtle">{count} soluciones</p>
                  </Link>
                </HoverCard>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-10"
        >
          <Link href="/herramientas">
            <Button variant="secondary" size="lg" className="group">
              Ver catálogo completo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
