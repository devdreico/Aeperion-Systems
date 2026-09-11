"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-ae-gray-50 rounded-lg p-4 text-center"
                onMouseEnter={() => setTooltipVisible(i)}
                onMouseLeave={() => setTooltipVisible(null)}
              >
                <p className="text-2xl font-bold text-ae-gray-900">{stat.value}</p>
                <p className="text-xs text-ae-gray-500 mt-1">{stat.label}</p>
                <span className={cn(
                  "text-[10px] font-medium",
                  stat.change.startsWith("+") ? "text-ae-success" : "text-ae-error"
                )}>
                  {stat.change}
                </span>
                <AnimatePresence>
                  {tooltipVisible === i && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute -top-8 left-1/2 -translate-x-1/2 bg-ae-gray-900 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap"
                    >
                      Dato simulado para demo
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
          <div className="bg-ae-gray-50 rounded-lg p-6 flex items-center justify-center text-ae-gray-400 text-sm min-h-[150px]">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-center"
            >
              <div className="h-12 w-12 mx-auto mb-3 rounded-xl bg-ae-green-100 flex items-center justify-center">
                <span className="text-ae-green-500 text-lg">📊</span>
              </div>
              <p>Gráfico interactivo (demo visual)</p>
              <p className="text-xs text-ae-gray-400 mt-1">Los datos mostrados son simulados</p>
            </motion.div>
          </div>
        </div>
      ),
    },
    {
      id: "config",
      label: "Configuración",
      content: (
        <div className="p-6 space-y-4">
          {["Notificaciones", "Integración WhatsApp", "Reportes automáticos", "Usuarios"].map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center justify-between p-3 bg-ae-gray-50 rounded-lg"
            >
              <span className="text-sm text-ae-gray-700">{item}</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked={i < 2} className="sr-only peer" />
                <div className="w-8 h-4 bg-ae-gray-300 peer-checked:bg-ae-green-400 rounded-full transition-colors" />
                <div className="absolute top-0.5 left-0.5 h-3 w-3 bg-white rounded-full shadow peer-checked:translate-x-4 transition-transform" />
              </label>
            </motion.div>
          ))}
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
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3 py-3 border-b border-ae-gray-100 last:border-0"
            >
              <div className={cn(
                "h-2 w-2 rounded-full",
                item.type === "success" && "bg-ae-success",
                item.type === "info" && "bg-ae-info",
                item.type === "warning" && "bg-ae-warning"
              )} />
              <span className="flex-1 text-sm text-ae-gray-700">{item.action}</span>
              <span className="text-xs text-ae-gray-400">{item.time}</span>
            </motion.div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className={cn("bg-white rounded-2xl border border-ae-gray-200 overflow-hidden shadow-sm", className)}>
      {/* Tabs */}
      <div className="flex border-b border-ae-gray-100 bg-ae-gray-50/50">
        {tabs.map((tab, i) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(i)}
            className={cn(
              "relative px-5 py-3 text-sm font-medium transition-colors",
              activeTab === i ? "text-ae-green-600" : "text-ae-gray-500 hover:text-ae-gray-700"
            )}
          >
            {tab.label}
            {activeTab === i && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-ae-green-400"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
        >
          {tabs[activeTab].content}
        </motion.div>
      </AnimatePresence>

      {/* Footer */}
      <div className="px-6 py-3 bg-ae-gray-50 border-t border-ae-gray-100 flex items-center justify-between">
        <span className="text-xs text-ae-gray-400">Demo interactiva — datos simulados</span>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-ae-green-100 text-ae-green-600 font-medium">
          {tool.demoType}
        </span>
      </div>
    </div>
  );
}
