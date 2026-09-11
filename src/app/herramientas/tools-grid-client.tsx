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
import { Card, CardContent } from "@/components/ui/card";
import { TOOLS, TOOL_CATEGORIES } from "@/lib/tools-data";
import { formatCOP } from "@/lib/utils";
import type { ToolCategory } from "@/types";

const categoryIcons: Record<string, string> = {
  "web-presencia": "🌐",
  automatizacion: "🤖",
  "crm-ventas": "👥",
  facturacion: "🧾",
  "pos-pagos": "💳",
  "redes-sociales": "📱",
  administracion: "🏢",
  analitica: "📊",
  comunicacion: "💬",
  diseno: "🎨",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const } },
};

export function ToolsGridClient() {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("categoria") as ToolCategory | null;
  const [selectedCategory, setSelectedCategory] = React.useState<ToolCategory | null>(activeCategory);

  const filteredTools = selectedCategory
    ? TOOLS.filter((t) => t.category === selectedCategory)
    : TOOLS;

  return (
    <div className="pt-20">
      <Section variant="default" size="sm">
        <Container>
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-ae-gray-900 tracking-tight mb-4">
              39 Herramientas Digitales
            </h1>
            <p className="text-lg text-ae-gray-500 max-w-2xl mx-auto">
              Cada herramienta resuelve un problema específico. Adquiere solo lo que necesitas,
              cuando lo necesitas.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            <motion.button
              onClick={() => setSelectedCategory(null)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              layout
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                !selectedCategory
                  ? "bg-ae-gray-900 text-white"
                  : "bg-ae-gray-100 text-ae-gray-600 hover:bg-ae-gray-200"
              }`}
            >
              Todas
            </motion.button>
            {TOOL_CATEGORIES.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                layout
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === cat.id
                    ? "bg-ae-green-400 text-white"
                    : "bg-ae-gray-100 text-ae-gray-600 hover:bg-ae-gray-200"
                }`}
              >
                {categoryIcons[cat.id]} {cat.name}
              </motion.button>
            ))}
          </div>

          {/* Tools Grid */}
          <AnimatePresence mode="wait">
            {filteredTools.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center py-16"
              >
                <p className="text-ae-gray-500">No hay herramientas en esta categoría.</p>
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
                {filteredTools.map((tool) => (
                  <motion.div key={tool.id} variants={cardVariants}>
                    <Link href={`/herramientas/${tool.id}`}>
                      <Card className="group h-full border-ae-gray-100 hover:border-ae-green-200 hover:shadow-md transition-all duration-300">
                        <CardContent className="p-5">
                          <div className="flex items-start justify-between mb-3">
                            <Badge variant="secondary" className="text-[10px]">
                              {TOOL_CATEGORIES.find((c) => c.id === tool.category)?.name}
                            </Badge>
                            <span className="text-sm font-bold text-ae-green-600">
                              {formatCOP(tool.price)}
                            </span>
                          </div>
                          <h3 className="text-base font-semibold text-ae-gray-900 mb-1 group-hover:text-ae-green-700 transition-colors">
                            {tool.name}
                          </h3>
                          <p className="text-xs text-ae-gray-500 leading-relaxed line-clamp-2">
                            {tool.description}
                          </p>
                          {tool.hasDemo && (
                            <span className="inline-flex items-center gap-1 mt-3 text-[10px] text-ae-green-600 font-medium">
                              <Sparkles className="h-3 w-3" />
                              Demo disponible
                            </span>
                          )}
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="text-center mt-10">
            <p className="text-sm text-ae-gray-500 mb-4">
              ¿No encuentras lo que necesitas? Todas las herramientas pueden combinarse en un plan.
            </p>
            <Link href="/asesoria">
              <Button variant="primary" size="lg">
                Asesoría Gratuita
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  );
}
