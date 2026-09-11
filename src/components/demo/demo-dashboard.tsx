"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CounterAnimation } from "@/components/animations/counter-animation";
import type { Tool } from "@/types";

interface DemoDashboardProps {
  tool: Tool;
  className?: string;
}

// Mock data generator
function generateMockData() {
  const now = Date.now();
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now - (6 - i) * 86400000);
    return {
      date: d.toLocaleDateString("es-CO", { weekday: "short", day: "numeric" }),
      ventas: Math.floor(Math.random() * 50 + 20),
      clientes: Math.floor(Math.random() * 15 + 5),
      ingresos: Math.floor(Math.random() * 5000000 + 1000000),
    };
  });

  const recentClients = [
    { name: "Carlos Mendoza", action: "Compra", amount: 450000, time: "hace 2 min" },
    { name: "Maria Gutierrez", action: "Lead nuevo", amount: 0, time: "hace 15 min" },
    { name: "Juan Pablo R.", action: "Cotización", amount: 200000, time: "hace 1 hora" },
    { name: "Ana Rodriguez", action: "Compra", amount: 1000000, time: "hace 2 horas" },
    { name: "Pedro Sanchez", action: "Soporte", amount: 0, time: "hace 3 horas" },
  ];

  return { days, recentClients };
}

export function DemoDashboard({ tool, className }: DemoDashboardProps) {
  const [filter, setFilter] = useState<"week" | "month">("week");
  const data = useMemo(() => generateMockData(), []);

  const totals = useMemo(() => {
    return data.days.reduce(
      (acc, d) => ({
        ventas: acc.ventas + d.ventas,
        clientes: acc.clientes + d.clientes,
        ingresos: acc.ingresos + d.ingresos,
      }),
      { ventas: 0, clientes: 0, ingresos: 0 }
    );
  }, [data]);

  const maxVentas = Math.max(...data.days.map((d) => d.ventas));

  return (
    <div className={cn("space-y-6", className)}>
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Ventas totales", value: totals.ventas, format: (n: number) => `${n}`, suffix: "" },
          { label: "Clientes nuevos", value: totals.clientes, format: (n: number) => `${n}`, suffix: "" },
          { label: "Ingresos totales", value: totals.ingresos, format: (n: number) => `$${(n / 1000).toFixed(0)}K`, suffix: "" },
        ].map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-xl border border-ae-gray-200 p-5"
          >
            <p className="text-xs text-ae-gray-500 mb-1">{kpi.label}</p>
            <p className="text-2xl font-bold text-ae-gray-900">
              <CounterAnimation from={0} to={kpi.value} duration={1.5} delay={i * 0.2} formatFn={kpi.format} />
              {kpi.suffix}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Chart (Bar graph) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="bg-white rounded-xl border border-ae-gray-200 p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-ae-gray-900">Ventas (7 días)</h3>
          <div className="flex gap-1">
            {(["week", "month"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-3 py-1 text-xs rounded-md transition-colors",
                  filter === f ? "bg-ae-green-100 text-ae-green-700" : "text-ae-gray-500 hover:bg-ae-gray-100"
                )}
              >
                {f === "week" ? "Semana" : "Mes"}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-end gap-2 h-32">
          {data.days.map((d, i) => (
            <motion.div
              key={d.date}
              className="flex-1 flex flex-col items-center gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.05 }}
            >
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(d.ventas / maxVentas) * 100}%` }}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-[40px] rounded-t-md bg-gradient-to-t from-ae-green-500 to-ae-green-300"
              />
              <span className="text-[10px] text-ae-gray-500">{d.date}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="bg-white rounded-xl border border-ae-gray-200 overflow-hidden"
      >
        <div className="px-5 py-3 border-b border-ae-gray-100">
          <h3 className="text-sm font-semibold text-ae-gray-900">Actividad reciente</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ae-gray-100">
                <th className="text-left px-5 py-3 text-xs text-ae-gray-500 font-medium">Cliente</th>
                <th className="text-left px-5 py-3 text-xs text-ae-gray-500 font-medium">Acción</th>
                <th className="text-right px-5 py-3 text-xs text-ae-gray-500 font-medium">Monto</th>
                <th className="text-right px-5 py-3 text-xs text-ae-gray-500 font-medium">Tiempo</th>
              </tr>
            </thead>
            <tbody>
              {data.recentClients.map((client, i) => (
                <motion.tr
                  key={client.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.05, duration: 0.3 }}
                  className="border-b border-ae-gray-50 hover:bg-ae-gray-50 transition-colors"
                >
                  <td className="px-5 py-3 text-ae-gray-900 font-medium">{client.name}</td>
                  <td className="px-5 py-3">
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-[10px] font-medium",
                      client.action === "Compra" && "bg-ae-green-100 text-ae-green-700",
                      client.action === "Lead nuevo" && "bg-blue-100 text-blue-700",
                      client.action === "Cotización" && "bg-amber-100 text-amber-700",
                      client.action === "Soporte" && "bg-ae-gray-100 text-ae-gray-600"
                    )}>
                      {client.action}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right text-ae-gray-900">
                    {client.amount > 0 ? `$${client.amount.toLocaleString()}` : "—"}
                  </td>
                  <td className="px-5 py-3 text-right text-ae-gray-400 text-xs">{client.time}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
