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

const RECENT_CLIENTS = [
  { name: "Carlos Mendoza", action: "Compra", amount: 450000, time: "hace 2 min" },
  { name: "María Gutiérrez", action: "Lead nuevo", amount: 0, time: "hace 15 min" },
  { name: "Juan Pablo R.", action: "Cotización", amount: 200000, time: "hace 1 hora" },
  { name: "Ana Rodríguez", action: "Compra", amount: 1000000, time: "hace 2 horas" },
  { name: "Pedro Sánchez", action: "Soporte", amount: 0, time: "hace 3 horas" },
];

function buildSeries(count: number, label: "day" | "week") {
  const now = Date.now();
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(now - (count - 1 - i) * (label === "week" ? 7 : 1) * 86400000);
    return {
      date:
        label === "week"
          ? `Sem ${i + 1}`
          : d.toLocaleDateString("es-CO", { weekday: "short" }),
      ventas: Math.floor(Math.random() * 50 + 20),
      clientes: Math.floor(Math.random() * 15 + 5),
      ingresos: Math.floor(Math.random() * 5000000 + 1000000),
    };
  });
}

export function DemoDashboard({ tool, className }: DemoDashboardProps) {
  const [filter, setFilter] = useState<"week" | "month">("week");

  const days = useMemo(
    () => (filter === "week" ? buildSeries(7, "day") : buildSeries(4, "week")),
    [filter]
  );

  const totals = useMemo(
    () =>
      days.reduce(
        (acc, d) => ({
          ventas: acc.ventas + d.ventas,
          clientes: acc.clientes + d.clientes,
          ingresos: acc.ingresos + d.ingresos,
        }),
        { ventas: 0, clientes: 0, ingresos: 0 }
      ),
    [days]
  );

  const maxVentas = Math.max(...days.map((d) => d.ventas));

  const kpis = [
    { label: "Ventas totales", value: totals.ventas, format: (n: number) => `${n}` },
    { label: "Clientes nuevos", value: totals.clientes, format: (n: number) => `${n}` },
    {
      label: "Ingresos totales",
      value: totals.ingresos,
      format: (n: number) => `$${(n / 1000).toFixed(0)}K`,
    },
  ];

  return (
    <div className={cn("space-y-6", className)}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl glass-card p-5"
          >
            <p className="text-xs text-fg-subtle mb-1">{kpi.label}</p>
            <p className="text-2xl font-extrabold text-fg">
              <CounterAnimation
                from={0}
                to={kpi.value}
                duration={1.5}
                delay={i * 0.2}
                formatFn={kpi.format}
              />
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="rounded-2xl glass-card p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-fg">
            Ventas {filter === "week" ? "(7 días)" : "(4 semanas)"}
          </h3>
          <div className="flex gap-1 rounded-lg bg-surface-2 p-0.5">
            {(["week", "month"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-3 py-1 text-xs rounded-md transition-colors",
                  filter === f
                    ? "bg-ae-green-500 text-white"
                    : "text-fg-muted hover:text-fg"
                )}
              >
                {f === "week" ? "Semana" : "Mes"}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-end gap-2 h-32">
          {days.map((d, i) => (
            <motion.div
              key={`${filter}-${i}`}
              className="flex-1 flex flex-col items-center gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.05 }}
            >
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(d.ventas / maxVentas) * 100}%` }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-[40px] rounded-t-md bg-gradient-to-t from-ae-green-500 to-ae-green-300"
              />
              <span className="text-[10px] text-fg-subtle capitalize">{d.date}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="rounded-2xl glass-card overflow-hidden"
      >
        <div className="px-5 py-3 border-b border-border">
          <h3 className="text-sm font-bold text-fg">Actividad reciente</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {["Cliente", "Acción", "Monto", "Tiempo"].map((h, i) => (
                  <th
                    key={h}
                    className={cn(
                      "px-5 py-3 text-xs text-fg-subtle font-semibold",
                      i === 0 ? "text-left" : i === 3 ? "text-right" : i === 2 ? "text-right" : "text-left"
                    )}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RECENT_CLIENTS.map((client, i) => (
                <motion.tr
                  key={client.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.05, duration: 0.3 }}
                  className="border-b border-border last:border-0 hover:bg-surface-2/60 transition-colors"
                >
                  <td className="px-5 py-3 text-fg font-medium">{client.name}</td>
                  <td className="px-5 py-3">
                    <span
                      className={cn(
                        "px-2 py-0.5 rounded-full text-[10px] font-semibold",
                        client.action === "Compra" && "bg-ae-green-400/15 text-ae-green-700 dark:text-ae-green-300",
                        client.action === "Lead nuevo" && "bg-blue-400/15 text-blue-600 dark:text-blue-300",
                        client.action === "Cotización" && "bg-amber-400/15 text-amber-600 dark:text-amber-300",
                        client.action === "Soporte" && "bg-surface-3 text-fg-muted"
                      )}
                    >
                      {client.action}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right text-fg">
                    {client.amount > 0 ? `$${client.amount.toLocaleString()}` : "—"}
                  </td>
                  <td className="px-5 py-3 text-right text-fg-subtle text-xs">
                    {client.time}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <p className="text-center text-xs text-fg-subtle">
        Demo interactiva de {tool.name} — datos simulados
      </p>
    </div>
  );
}
