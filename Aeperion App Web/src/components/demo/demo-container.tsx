"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import type { Tool } from "@/types";
import { DemoTerminal } from "./demo-terminal";
import { DemoDashboard } from "./demo-dashboard";
import { DemoVisual } from "./demo-visual";
import { DemoForm } from "./demo-form";

interface DemoContainerProps {
  tool: Tool;
}

export function DemoContainer({ tool }: DemoContainerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-[60vh] bg-white rounded-2xl border border-ae-gray-200 shadow-sm flex items-center justify-center"
      >
        <div className="text-center max-w-md p-8">
          <div className="h-12 w-12 rounded-full bg-ae-error/10 flex items-center justify-center mx-auto mb-4">
            <Sparkles className="h-6 w-6 text-ae-error" />
          </div>
          <p className="text-ae-gray-900 font-medium mb-1">Error al cargar demo</p>
          <p className="text-sm text-ae-gray-500 mb-4">{error}</p>
          <button
            onClick={() => setError(null)}
            className="text-sm text-ae-green-600 hover:underline"
          >
            Intentar de nuevo
          </button>
        </div>
      </motion.div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-[60vh] bg-white rounded-2xl border border-ae-gray-200 shadow-sm flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="h-8 w-8 rounded-full border-2 border-ae-green-400 border-t-transparent mx-auto mb-4"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-sm text-ae-gray-500"
          >
            Inicializando demo...
          </motion.p>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={tool.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {tool.demoType === "terminal" && <DemoTerminal tool={tool} />}
        {tool.demoType === "dashboard" && <DemoDashboard tool={tool} />}
        {tool.demoType === "visual" && <DemoVisual tool={tool} />}
        {tool.demoType === "form" && <DemoForm tool={tool} />}
        {!tool.demoType && (
          <div className="min-h-[60vh] bg-white rounded-2xl border border-ae-gray-200 shadow-sm flex items-center justify-center">
            <div className="text-center max-w-md p-8">
              <div className="h-16 w-16 rounded-2xl bg-ae-green-100 flex items-center justify-center mx-auto mb-6">
                <Sparkles className="h-8 w-8 text-ae-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-ae-gray-900 mb-2">
                Demo: {tool.name}
              </h2>
              <p className="text-ae-gray-500">{tool.description}</p>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
