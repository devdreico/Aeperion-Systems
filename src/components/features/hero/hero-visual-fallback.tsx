"use client";

import { motion } from "framer-motion";
import { Activity, BarChart3, Bot, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroVisualFallbackProps {
  className?: string;
}

const ease = [0.16, 1, 0.3, 1] as const;

const card =
  "absolute rounded-2xl glass-card p-4 shadow-2xl shadow-black/20";

export function HeroVisualFallback({ className }: HeroVisualFallbackProps) {
  const from = (x: number, y: number, delay: number) => ({
    initial: { opacity: 0, x, y, scale: 0.86 },
    animate: { opacity: 1, x: 0, y: 0, scale: 1 },
    transition: { duration: 0.7, delay, ease },
  });

  return (
    <div className={cn("relative h-full w-full", className)} aria-hidden="true">
      <div className="absolute inset-0 mesh-bg opacity-70" />

      {/* KPI main */}
      <motion.div
        {...from(-40, 30, 0.1)}
        className={cn(card, "left-[6%] top-[18%] w-[62%]")}
      >
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-ae-green-400" />
            <span className="text-[11px] font-semibold text-fg">
              Panel de operación
            </span>
          </div>
          <span className="text-[10px] font-semibold text-ae-green-500">
            ● EN VIVO
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { l: "Ingresos", v: "$48.2M" },
            { l: "Auto", v: "1.284" },
            { l: "Horas", v: "312h" },
          ].map((k) => (
            <div key={k.l} className="rounded-xl bg-surface-2/70 p-2.5">
              <div className="text-[9px] text-fg-subtle">{k.l}</div>
              <div className="text-sm font-bold text-fg">{k.v}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex h-12 items-end gap-1.5">
          {[35, 55, 42, 70, 58, 88, 76].map((v, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${v}%` }}
              transition={{ duration: 0.6, delay: 0.6 + i * 0.05, ease }}
              className="flex-1 rounded-t bg-gradient-to-t from-ae-green-500/40 to-ae-green-400"
            />
          ))}
        </div>
      </motion.div>

      {/* Chat */}
      <motion.div
        {...from(50, -30, 0.4)}
        className={cn(card, "right-[4%] top-[6%] w-[36%]")}
      >
        <div className="mb-2 flex items-center gap-2">
          <Bot className="h-3.5 w-3.5 text-ae-green-500" />
          <span className="text-[11px] font-semibold text-fg">Asistente IA</span>
        </div>
        <div className="space-y-1.5">
          <div className="ml-auto w-fit max-w-full rounded-lg bg-surface-2 px-2.5 py-1.5 text-[10px] text-fg-muted">
            ¿Ventas de hoy?
          </div>
          <div className="w-fit rounded-lg bg-ae-green-400/15 px-2.5 py-1.5 text-[10px] font-medium text-ae-green-600 dark:text-ae-green-300">
            $2.4M · +8%
          </div>
          <div className="flex gap-1 pt-0.5">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="h-1.5 w-1.5 rounded-full bg-ae-green-400"
                style={{ opacity: 0.4 + i * 0.25 }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Bars */}
      <motion.div
        {...from(-60, 20, 0.65)}
        className={cn(card, "bottom-[6%] left-[2%] w-[42%]")}
      >
        <div className="mb-2 flex items-center gap-2">
          <BarChart3 className="h-3.5 w-3.5 text-ae-green-500" />
          <span className="text-[11px] font-semibold text-fg">
            Ventas por canal
          </span>
        </div>
        <div className="flex h-14 items-end gap-1.5">
          {[45, 70, 52, 88, 64, 96, 80].map((v, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${v}%` }}
              transition={{ duration: 0.6, delay: 0.9 + i * 0.05, ease }}
              className="flex-1 rounded-t bg-gradient-to-t from-ae-green-500/35 to-ae-green-400"
            />
          ))}
        </div>
      </motion.div>

      {/* Flow */}
      <motion.div
        {...from(60, 30, 0.85)}
        className={cn(card, "bottom-[10%] right-[6%] w-[40%]")}
      >
        <div className="mb-2 flex items-center gap-2">
          <Activity className="h-3.5 w-3.5 text-ae-green-500" />
          <span className="text-[11px] font-semibold text-fg">
            Automatización
          </span>
        </div>
        <div className="flex items-center gap-1">
          {["WhatsApp", "CRM", "Factura"].map((n, i) => (
            <div key={n} className="flex items-center gap-1">
              <span className="rounded-md bg-surface-2 px-1.5 py-1 text-[9px] text-fg-muted">
                {n}
              </span>
              {i < 2 && <span className="text-[9px] text-ae-green-500">→</span>}
            </div>
          ))}
        </div>
        <div className="mt-2 flex items-center gap-1.5 text-[10px] font-medium text-ae-green-600 dark:text-ae-green-300">
          <Wallet className="h-3 w-3" />
          3 flujos ejecutándose
        </div>
      </motion.div>
    </div>
  );
}
