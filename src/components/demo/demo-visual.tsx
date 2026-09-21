"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Tool } from "@/types";

interface DemoVisualProps {
  tool: Tool;
  className?: string;
}

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

export function DemoVisual({ tool, className }: DemoVisualProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [tooltipVisible, setTooltipVisible] = useState<number | null>(null);

  const tabs: Tab[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      content: (
        <div className="space-y-4 p-6">
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Usuarios activos", value: "1,247", change: "+12%" },
              { label: "Ingresos hoy", value: "$2.4M", change: "+8%" },
              { label: "Tickets abiertos", value: "23", change: "-5%" },
            ].map((stat, i) => (
              <m.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative bg-surface-2 rounded-xl p-4 text-center"
                onMouseEnter={() => setTooltipVisible(i)}
                onMouseLeave={() => setTooltipVisible(null)}
              >
                <p className="text-2xl font-extrabold text-fg">{stat.value}</p>
                <p className="text-xs text-fg-muted mt-1">{stat.label}</p>
                <span
                  className={cn(
                    "text-[10px] font-semibold",
                    stat.change.startsWith("+") ? "text-ae-success" : "text-ae-error"
                  )}
                >
                  {stat.change}
                </span>
                <AnimatePresence>
                  {tooltipVisible === i && (
                    <m.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute -top-8 left-1/2 -translate-x-1/2 z-10 glass-strong text-fg text-[10px] px-2.5 py-1 rounded-lg whitespace-nowrap"
                    >
                      Dato simulado para demo
                    </m.div>
                  )}
                </AnimatePresence>
              </m.div>
            ))}
          </div>
          <div className="bg-surface-2 rounded-xl p-6 flex items-center justify-center text-fg-subtle text-sm min-h-[150px]">
            <m.div
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-center"
            >
              <div className="h-12 w-12 mx-auto mb-3 rounded-xl bg-ae-green-400/15 flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-ae-green-500" />
              </div>
              <p>Gráfico interactivo (demo visual)</p>
              <p className="text-xs text-fg-subtle mt-1">
                Los datos mostrados son simulados
              </p>
            </m.div>
          </div>
        </div>
      ),
    },
    {
      id: "config",
      label: "Configuración",
      content: (
        <div className="p-6 space-y-3">
          {["Notificaciones", "Integración WhatsApp", "Reportes automáticos", "Usuarios"].map(
            (item, i) => (
              <m.div
                key={item}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center justify-between p-3 bg-surface-2 rounded-xl"
              >
                <span className="text-sm text-fg-muted">{item}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked={i < 2} className="sr-only peer" />
                  <div className="w-9 h-5 bg-surface-3 peer-checked:bg-ae-green-400 rounded-full transition-colors" />
                  <div className="absolute top-0.5 left-0.5 h-4 w-4 bg-white rounded-full shadow peer-checked:translate-x-4 transition-transform" />
                </label>
              </m.div>
            )
          )}
        </div>
      ),
    },
    {
      id: "activity",
      label: "Actividad",
      content: (
        <div className="p-6">
          {[
            { action: "Nueva venta registrada", time: "2 min", type: "success" },
            { action: "Cliente actualizado", time: "15 min", type: "info" },
            { action: "Copia de seguridad completada", time: "1 hora", type: "success" },
            { action: "Actualización de sistema", time: "3 horas", type: "warning" },
          ].map((item, i) => (
            <m.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3 py-3 border-b border-border last:border-0"
            >
              <div
                className={cn(
                  "h-2 w-2 rounded-full",
                  item.type === "success" && "bg-ae-success",
                  item.type === "info" && "bg-ae-info",
                  item.type === "warning" && "bg-ae-warning"
                )}
              />
              <span className="flex-1 text-sm text-fg-muted">{item.action}</span>
              <span className="text-xs text-fg-subtle">{item.time}</span>
            </m.div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className={cn("rounded-3xl glass-card overflow-hidden", className)}>
      <div className="flex border-b border-border bg-surface-2/40">
        {tabs.map((tab, i) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(i)}
            className={cn(
              "relative px-5 py-3 text-sm font-semibold transition-colors",
              activeTab === i
                ? "text-ae-green-600 dark:text-ae-green-300"
                : "text-fg-muted hover:text-fg"
            )}
          >
            {tab.label}
            {activeTab === i && (
              <m.div
                layoutId="demo-tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-ae-green-400"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <m.div
          key={activeTab}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
        >
          {tabs[activeTab].content}
        </m.div>
      </AnimatePresence>

      <div className="px-6 py-3 bg-surface-2/40 border-t border-border flex items-center justify-between">
        <span className="text-xs text-fg-subtle">
          Demo interactiva — datos simulados
        </span>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-ae-green-400/15 text-ae-green-700 dark:text-ae-green-300 font-semibold">
          {tool.demoType}
        </span>
      </div>
    </div>
  );
}
