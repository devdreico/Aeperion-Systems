import { m } from "framer-motion";
import {
  Bot,
  Code2,
  Database,
  ScanSearch,
  ServerCog,
  ShieldCheck,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/shared/section-header";
import { CAPABILITIES } from "@/lib/capabilities-data";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
  workflow: Workflow,
  "scan-search": ScanSearch,
  "shield-check": ShieldCheck,
  database: Database,
  "code-2": Code2,
  "server-cog": ServerCog,
  bot: Bot,
};

const ACCENTS = {
  green: {
    icon: "text-ae-green-300 bg-ae-green-400/10 border-ae-green-400/25",
    dot: "bg-ae-green-400",
    hover: "hover:border-ae-green-400/30",
  },
  cyan: {
    icon: "text-cyan-300 bg-cyan-400/10 border-cyan-400/25",
    dot: "bg-cyan-400",
    hover: "hover:border-cyan-400/30",
  },
  violet: {
    icon: "text-violet-300 bg-violet-400/10 border-violet-400/25",
    dot: "bg-violet-400",
    hover: "hover:border-violet-400/30",
  },
} as const;

export function CapabilitiesSection() {
  return (
    <section className="relative overflow-hidden bg-surface py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <Container className="relative">
        <SectionHeader
          badge="Capacidades"
          title="Expertos en uso, aplicación y desarrollo de IA."
          description="No somos una agencia que añadió IA a su catálogo. Diseñamos la arquitectura, operamos los agentes y medimos el resultado."
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((cap, i) => {
            const Icon = ICONS[cap.icon] ?? Workflow;
            const accent = ACCENTS[cap.accent];
            return (
              <m.div
                key={cap.id}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: (i % 3) * 0.08 }}
                className={cn(
                  "group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] p-6 backdrop-blur-md transition-colors",
                  accent.hover
                )}
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                <div className="flex items-center justify-between">
                  <span className={cn("inline-flex h-11 w-11 items-center justify-center rounded-2xl border", accent.icon)}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-[10px] tracking-widest text-fg-subtle">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-bold tracking-tight text-fg">{cap.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{cap.description}</p>
                <ul className="mt-4 grid grid-cols-1 gap-1.5">
                  {cap.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-2 text-xs text-fg-muted">
                      <span className={cn("h-1 w-1 shrink-0 rounded-full", accent.dot)} />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </m.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}