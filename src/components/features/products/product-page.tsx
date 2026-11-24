import { m } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ScanSearch,
  ServerCog,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Link } from "@/components/ui/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Seo } from "@/components/shared/seo";
import { AgenticCTA } from "@/components/features/trust/agentic-cta";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
  "scan-search": ScanSearch,
  "shield-check": ShieldCheck,
  "server-cog": ServerCog,
};

const ACCENTS = {
  green: {
    text: "text-ae-green-300",
    bg: "bg-ae-green-400/10",
    border: "border-ae-green-400/25",
    gradient: "from-ae-green-400/25 via-transparent to-transparent",
    glow: "bg-ae-green-400/10",
    dot: "bg-ae-green-400",
  },
  cyan: {
    text: "text-cyan-300",
    bg: "bg-cyan-400/10",
    border: "border-cyan-400/25",
    gradient: "from-cyan-400/25 via-transparent to-transparent",
    glow: "bg-cyan-400/10",
    dot: "bg-cyan-400",
  },
  violet: {
    text: "text-violet-300",
    bg: "bg-violet-400/10",
    border: "border-violet-400/25",
    gradient: "from-violet-400/25 via-transparent to-transparent",
    glow: "bg-violet-400/10",
    dot: "bg-violet-400",
  },
} as const;

const FLOW = [
  { step: "01", title: "Diagnóstico", desc: "Entendemos el sistema, el riesgo y el objetivo." },
  { step: "02", title: "Integración", desc: "Conectamos datos, herramientas y permisos." },
  { step: "03", title: "Operación", desc: "Los agentes ejecutan con guardrails y supervisión." },
  { step: "04", title: "Evolución", desc: "Medimos, evaluamos y ampliamos cobertura." },
];

export function ProductPage({ product }: { product: Product }) {
  const Icon = ICONS[product.icon] ?? ScanSearch;
  const accent = ACCENTS[product.accent];

  return (
    <>
      <Seo
        title={`${product.name} — ${product.tagline}`}
        description={product.description}
        path={`/${product.id}`}
      />

      <section className="relative overflow-hidden border-b border-border/60 bg-surface">
        <div className={cn("pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full blur-[140px]", accent.glow)} />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_75%)]" />

        <Container className="relative grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <m.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center gap-2"
            >
              <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold", accent.text, accent.bg, accent.border)}>
                <Sparkles className="h-3 w-3" />
                {product.category}
              </span>
              <Badge variant="glass" className="text-[10px] uppercase tracking-wider">
                {product.status === "production" ? "En producción" : product.status === "beta" ? "Beta privada" : "Privado"}
              </Badge>
            </m.div>

            <m.h1
              initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
              className="mt-6 text-5xl font-extrabold tracking-tight text-fg md:text-6xl"
            >
              {product.name}
            </m.h1>
            <p className={cn("mt-2 text-lg font-semibold", accent.text)}>{product.tagline}</p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-fg-muted">
              {product.longDescription}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="xl">
                <Link href={product.href}>
                  Abrir {product.name}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="glass" size="xl">
                <Link href={`/cotizacion?product=${product.id}`}>
                  Cotizar integración
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {product.stack.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] text-fg-muted"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <m.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] p-5 backdrop-blur-md"
          >
            <div className={cn("absolute inset-x-0 top-0 h-px bg-gradient-to-r", accent.gradient)} />
            <div className="flex items-center justify-between">
              <span className={cn("inline-flex h-12 w-12 items-center justify-center rounded-2xl border", accent.text, accent.bg, accent.border)}>
                <Icon className="h-6 w-6" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-subtle">
                {product.name} · core
              </span>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3">
              {product.outcomes.map((outcome) => (
                <div key={outcome.label} className="rounded-xl border border-white/[0.06] bg-black/20 p-3">
                  <p className="text-base font-extrabold text-fg">{outcome.value}</p>
                  <p className="mt-0.5 text-[9px] uppercase tracking-wider text-fg-subtle">
                    {outcome.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 space-y-2">
              {product.capabilities.slice(0, 4).map((cap, i) => (
                <div key={cap} className="flex items-center gap-3 rounded-xl border border-white/[0.05] bg-black/15 px-3 py-2">
                  <span className="font-mono text-[10px] text-fg-subtle">0{i + 1}</span>
                  <span className="text-[11px] text-fg-muted">{cap}</span>
                  <Check className={cn("ml-auto h-3.5 w-3.5", accent.text)} />
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center gap-2 rounded-xl border border-white/[0.06] bg-black/20 px-3 py-2 text-[10px] text-fg-subtle">
              <span className="relative flex h-1.5 w-1.5">
                <span className={cn("absolute inline-flex h-full w-full animate-ping rounded-full opacity-60", accent.dot)} />
                <span className={cn("relative inline-flex h-1.5 w-1.5 rounded-full", accent.dot)} />
              </span>
              Operando con agentes SPR
            </div>
          </m.div>
        </Container>
      </section>

      <section className="bg-surface py-16 md:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className={cn("text-[11px] font-semibold uppercase tracking-[0.2em]", accent.text)}>
                Capacidades
              </p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-fg">
                Lo que {product.name} hace en producción.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                No es una lista de features. Es lo que el sistema ejecuta, con
                evidencia y supervisión.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {product.capabilities.map((cap, i) => (
                <div
                  key={cap}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 transition-colors hover:border-white/15"
                >
                  <span className="font-mono text-[10px] text-fg-subtle">0{i + 1}</span>
                  <p className="mt-2 text-sm font-medium text-fg">{cap}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-border/60 bg-surface-1/40 py-16 md:py-24">
        <Container>
          <div className="mb-10 max-w-xl">
            <p className={cn("text-[11px] font-semibold uppercase tracking-[0.2em]", accent.text)}>
              Casos de uso
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-fg">
              Dónde genera valor.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {product.useCases.map((useCase, i) => (
              <div
                key={useCase.title}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] p-5"
              >
                <span className="font-mono text-3xl font-bold text-white/10">0{i + 1}</span>
                <h3 className="mt-2 text-base font-bold text-fg">{useCase.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-fg-muted">{useCase.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-surface py-16 md:py-24">
        <Container>
          <div className="mb-10 text-center">
            <p className={cn("text-[11px] font-semibold uppercase tracking-[0.2em]", accent.text)}>
              Implementación
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-fg">
              De la conexión a la operación.
            </h2>
          </div>
          <div className="grid gap-3 md:grid-cols-4">
            {FLOW.map((step, i) => (
              <div key={step.step} className="relative rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
                {i < FLOW.length - 1 && (
                  <div className="absolute -right-2 top-1/2 hidden h-px w-4 -translate-y-1/2 bg-gradient-to-r from-white/20 to-transparent md:block" />
                )}
                <span className="font-mono text-xs text-fg-subtle">{step.step}</span>
                <h3 className="mt-2 text-sm font-bold text-fg">{step.title}</h3>
                <p className="mt-1 text-[11px] leading-relaxed text-fg-muted">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <span className="mr-2 text-[10px] uppercase tracking-[0.18em] text-fg-subtle">
              Integra con
            </span>
            {product.integrations.map((integration) => (
              <span
                key={integration}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] text-fg-muted"
              >
                {integration}
              </span>
            ))}
          </div>
        </Container>
      </section>

      <AgenticCTA />
    </>
  );
}