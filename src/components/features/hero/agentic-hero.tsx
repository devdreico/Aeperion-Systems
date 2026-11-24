import {
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link } from "@/components/ui/link";
import { m, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  CircuitBoard,
  MapPin,
  Sparkles,
  Terminal,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { AuroraBackground } from "@/components/animations/aurora-background";
import { NoiseTexture } from "@/components/animations/noise-texture";
import { CounterAnimation } from "@/components/animations/counter-animation";
import { MagneticButton } from "@/components/animations/magnetic-button";
import { SITE_CONFIG, TRUST_METRICS } from "@/lib/constants";
import { PipelineFallback } from "./pipeline-fallback";

const AIPipeline3D = lazy(() =>
  import("./ai-pipeline-3d").then((mod) => ({ default: mod.AIPipeline3D }))
);

const ease = [0.16, 1, 0.3, 1] as const;

const stats = [
  { to: TRUST_METRICS.agenticFlows, suffix: "+", label: "Flujos agénticos" },
  { to: TRUST_METRICS.agentsDeployed, suffix: "+", label: "Agentes desplegados" },
  { to: TRUST_METRICS.industries, suffix: "+", label: "Industrias" },
  { to: TRUST_METRICS.satisfactionRate, suffix: "%", label: "Satisfacción" },
];

const consoleLines = [
  { prompt: "spr.orchestrator", text: "objetivo recibido · diseñar flujo de ventas" },
  { prompt: "spr.retrieval", text: "contexto cargado · 1.240 reglas de negocio" },
  { prompt: "spr.executor", text: "herramientas conectadas · CRM · WhatsApp · ERP" },
  { prompt: "spr.evaluator", text: "calidad 0.94 · riesgo bajo · listo para producción" },
];

export function AgenticHero() {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const [mount3d, setMount3d] = useState(false);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldReduceMotion) return;
    if (typeof navigator !== "undefined") {
      const nav = navigator as Navigator & {
        deviceMemory?: number;
        connection?: { saveData?: boolean };
      };
      if (
        (typeof nav.deviceMemory === "number" && nav.deviceMemory < 4) ||
        (typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency < 4) ||
        nav.connection?.saveData
      ) {
        return;
      }
    }

    const el = visualRef.current;
    if (el && "IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setMount3d(true);
            io.disconnect();
          }
        },
        { rootMargin: "200px" }
      );
      io.observe(el);
      return () => io.disconnect();
    }
    setMount3d(true);
  }, [shouldReduceMotion]);

  return (
    <section className="relative overflow-hidden bg-surface">
      <AuroraBackground parallax={50} />
      <div className="hero-grid-overlay pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ae-green-400/40 to-transparent" />
      <NoiseTexture opacity={0.035} />

      <Container className="relative z-10 grid items-center gap-12 pb-20 pt-24 md:pt-28 lg:grid-cols-[1.05fr_0.95fr] lg:pb-28 lg:pt-32">
        <div>
          <m.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-ae-green-400/25 bg-ae-green-400/10 px-3.5 py-1.5 text-xs font-semibold text-ae-green-300"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ae-green-400 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ae-green-400" />
            </span>
            Agentes en producción desde 2023
            <span className="text-white/25">·</span>
            <MapPin className="h-3 w-3" />
            Bogotá, Colombia
          </m.div>

          <m.h1
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease, delay: 0.05 }}
            className="mt-6 text-balance text-4xl font-extrabold leading-[1.04] tracking-tight text-fg md:text-5xl lg:text-6xl"
          >
            Flujos de trabajo{" "}
            <span className="bg-gradient-to-r from-ae-green-300 via-ae-green-400 to-cyan-300 bg-clip-text text-transparent">
              agénticos
            </span>{" "}
            que operan tu empresa.
          </m.h1>

          <m.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.15 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-fg-muted md:text-lg"
          >
            Aeperion Systems diseña, construye y opera sistemas multi-agente
            con herramientas, memoria, permisos y evaluación. Expertos en uso,
            aplicación y desarrollo de IA.
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.25 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <MagneticButton strength={18}>
              <Button asChild size="xl" className="w-full sm:w-auto">
                <Link href="/cotizacion">
                  Solicitar cotización
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </MagneticButton>
            <Button asChild variant="glass" size="xl" className="w-full sm:w-auto">
              <Link href="/kspr">
                <CircuitBoard className="h-4 w-4" />
                Explorar KSPR
              </Link>
            </Button>
          </m.div>

          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-extrabold tracking-tight text-fg">
                  <CounterAnimation to={stat.to} suffix={stat.suffix} />
                </p>
                <p className="mt-0.5 text-[10px] uppercase tracking-[0.16em] text-fg-subtle">
                  {stat.label}
                </p>
              </div>
            ))}
          </m.div>
        </div>

        <m.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease, delay: 0.2 }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.025] p-3 shadow-2xl backdrop-blur-sm">
            <div className="mb-2 flex items-center justify-between px-2 pt-1">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-ae-green-400/80" />
                <span className="h-2 w-2 rounded-full bg-cyan-400/60" />
                <span className="h-2 w-2 rounded-full bg-violet-400/60" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
                ae-spr · pipeline
              </span>
            </div>

            <div
              ref={visualRef}
              className="relative h-[280px] w-full overflow-hidden rounded-2xl border border-white/[0.06] bg-[#05070A] sm:h-[340px] lg:h-[400px]"
            >
              {mount3d && !shouldReduceMotion ? (
                <Suspense fallback={<PipelineFallback className="p-4" />}>
                  <AIPipeline3D className="h-full w-full" />
                </Suspense>
              ) : (
                <PipelineFallback className="p-4" />
              )}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_30%,rgba(5,7,10,0.65)_100%)]" />
            </div>

            <div className="mt-3 rounded-2xl border border-white/[0.06] bg-black/30 p-3 font-mono text-[10.5px] leading-relaxed">
              <div className="mb-2 flex items-center gap-2 text-white/30">
                <Terminal className="h-3.5 w-3.5" />
                <span>SPR runtime</span>
                <span className="ml-auto flex items-center gap-1 text-ae-green-400/80">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ae-green-400" />
                  live
                </span>
              </div>
              {consoleLines.map((line, i) => (
                <m.div
                  key={line.prompt}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.3, duration: 0.35 }}
                  className="truncate"
                >
                  <span className="text-ae-green-400/80">▸ {line.prompt}</span>{" "}
                  <span className="text-white/45">{line.text}</span>
                </m.div>
              ))}
            </div>
          </div>

          <div className="pointer-events-none absolute -right-4 -top-4 hidden rounded-2xl border border-ae-green-400/20 bg-[#080B0F]/90 p-3 shadow-xl backdrop-blur-md sm:block">
            <div className="flex items-center gap-2 text-[10px] text-white/60">
              <Bot className="h-4 w-4 text-ae-green-400" />
              <span>SPR-01 · Arquitecto</span>
              <span className="rounded-full bg-ae-green-400/15 px-1.5 py-0.5 text-ae-green-300">
                activo
              </span>
            </div>
          </div>

          <div className="pointer-events-none absolute -bottom-4 -left-4 hidden rounded-2xl border border-cyan-400/20 bg-[#080B0F]/90 p-3 shadow-xl backdrop-blur-md sm:block">
            <div className="flex items-center gap-2 text-[10px] text-white/60">
              <Sparkles className="h-4 w-4 text-cyan-300" />
              <span>Evaluación continua</span>
              <span className="rounded-full bg-cyan-400/15 px-1.5 py-0.5 text-cyan-200">
                0.94
              </span>
            </div>
          </div>
        </m.div>
      </Container>

      <div className="relative z-10 border-y border-border/60 bg-surface-1/60 py-4">
        <Container className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[11px] uppercase tracking-[0.18em] text-fg-subtle">
          <span>KSPR · ingeniería inversa</span>
          <span className="hidden h-1 w-1 rounded-full bg-fg-subtle/40 sm:block" />
          <span>AELOCK · ciberseguridad</span>
          <span className="hidden h-1 w-1 rounded-full bg-fg-subtle/40 sm:block" />
          <span>Presentto · administración digital</span>
          <span className="hidden h-1 w-1 rounded-full bg-fg-subtle/40 sm:block" />
          <span>{SITE_CONFIG.city}, {SITE_CONFIG.country}</span>
        </Container>
      </div>
    </section>
  );
}