import { m } from "framer-motion";
import {
  Activity,
  Brain,
  Layers,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { FLOW_STAGES } from "@/lib/method-data";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
  layers: Layers,
  brain: Brain,
  workflow: Workflow,
  zap: Zap,
  activity: Activity,
};

const ACCENTS = [
  "text-ae-green-300 border-ae-green-400/30 bg-ae-green-400/10",
  "text-cyan-300 border-cyan-400/30 bg-cyan-400/10",
  "text-ae-green-300 border-ae-green-400/30 bg-ae-green-400/10",
  "text-violet-300 border-violet-400/30 bg-violet-400/10",
  "text-cyan-300 border-cyan-400/30 bg-cyan-400/10",
];

/**
 * Fallback 2D del pipeline agéntico.
 * Se usa cuando WebGL no está disponible o el usuario prefiere menos movimiento.
 */
export function PipelineFallback({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full", className)}>
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ae-green-400/10 blur-[90px]" />
        <div className="absolute left-[15%] top-[20%] h-40 w-40 rounded-full bg-cyan-400/10 blur-[80px]" />
        <div className="absolute bottom-[10%] right-[12%] h-44 w-44 rounded-full bg-violet-400/10 blur-[90px]" />
      </div>

      <div className="relative grid gap-3 md:grid-cols-5">
        {FLOW_STAGES.map((stage, i) => {
          const Icon = ICONS[stage.icon] ?? Workflow;
          return (
            <m.div
              key={stage.id}
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.35 + i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {i < FLOW_STAGES.length - 1 && (
                <div className="absolute -right-2 top-1/2 hidden h-px w-4 -translate-y-1/2 bg-gradient-to-r from-ae-green-400/60 to-transparent md:block" />
              )}
              <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-4 backdrop-blur-md transition-colors hover:border-ae-green-400/30">
                <div className="mb-3 flex items-center justify-between">
                  <span
                    className={cn(
                      "inline-flex h-9 w-9 items-center justify-center rounded-xl border",
                      ACCENTS[i % ACCENTS.length]
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-white/35">
                    {stage.label}
                  </span>
                </div>
                <p className="text-sm font-semibold text-white">{stage.title}</p>
                <p className="mt-1 text-[11px] leading-relaxed text-white/45">
                  {stage.description}
                </p>
                <m.span
                  className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-ae-green-400/60 to-transparent"
                  animate={{ opacity: [0.15, 0.7, 0.15] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
                />
              </div>
            </m.div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.25em] text-white/30">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ae-green-400" />
        Pipeline agéntico · SPR
      </div>
    </div>
  );
}