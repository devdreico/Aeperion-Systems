"use client";

import { useState, useEffect } from "react";
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

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] rounded-3xl glass-card flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="h-8 w-8 rounded-full border-2 border-ae-green-400 border-t-transparent mx-auto mb-4"
          />
          <p className="text-sm text-fg-muted">Inicializando demo...</p>
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
          <div className="min-h-[60vh] rounded-3xl glass-card flex items-center justify-center">
            <div className="text-center max-w-md p-8">
              <div className="h-16 w-16 rounded-2xl bg-ae-green-400/15 flex items-center justify-center mx-auto mb-6">
                <Sparkles className="h-8 w-8 text-ae-green-500" />
              </div>
              <h2 className="text-2xl font-extrabold text-fg mb-2">
                Demo: {tool.name}
              </h2>
              <p className="text-fg-muted">{tool.description}</p>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
