"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TOOL_CATEGORIES, TOOLS } from "@/lib/tools-data";
import { HoverCard } from "@/components/animations/hover-card";
import { SectionHeader } from "@/components/shared/section-header";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

interface ToolsShowcaseProps {
  className?: string;
}

const categoryIcons: Record<string, string> = {
  "web-presencia": "🌐",
  automatizacion: "⚡",
  "crm-ventas": "🤝",
  facturacion: "📄",
  "pos-pagos": "💳",
  "redes-sociales": "📱",
  administracion: "📊",
  analitica: "📈",
  comunicacion: "💬",
  diseno: "🎨",
};

export function ToolsShowcase({ className }: ToolsShowcaseProps) {
  return (
    <section className={cn("py-20 md:py-28 bg-ae-gray-50 relative overflow-hidden", className)}>
      <Container>
        <SectionHeader
          badge="39 herramientas"
          title="Todo lo que tu negocio necesita"
          description="Desde presencia web hasta automatización avanzada. Cada herramienta está diseñada para resolver un problema específico."
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
              transition: { staggerChildren: 0.06, delayChildren: 0.2 },
            },
          }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-12"
        >
          {TOOL_CATEGORIES.map((cat) => {
            const count = TOOLS.filter((t) => t.category === cat.id).length;
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
                    className="block p-5 rounded-xl bg-white border border-ae-gray-100 hover:border-ae-green-200 transition-colors h-full"
                  >
                    <div className="text-2xl mb-3">
                      {categoryIcons[cat.id] || "🔧"}
                    </div>
                    <h3 className="text-sm font-semibold text-ae-gray-900 mb-1">{cat.name}</h3>
                    <p className="text-[10px] text-ae-gray-400">{count} herramientas</p>
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
            <Button variant="secondary" size="lg">
              Ver catálogo completo
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
