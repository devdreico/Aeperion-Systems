import { m } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "@/components/ui/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Seo } from "@/components/shared/seo";
import { CapabilitiesSection } from "@/components/features/capabilities/capabilities-section";
import { MethodSection } from "@/components/features/method/method-section";
import { AgenticCTA } from "@/components/features/trust/agentic-cta";

const STACK = [
  {
    title: "Modelos y razonamiento",
    items: ["LLMs frontier", "Modelos locales", "Routing de modelos", "Function calling", "Structured outputs"],
  },
  {
    title: "Orquestación agéntica",
    items: ["Multi-agente", "Memoria", "Herramientas", "Human-in-the-loop", "Guardrails"],
  },
  {
    title: "Conocimiento y datos",
    items: ["RAG", "Embeddings", "Permisos por rol", "Ingestión multimodal", "Versionado"],
  },
  {
    title: "Evaluación y operación",
    items: ["Evals automatizadas", "Trazas", "Métricas de calidad", "Costos", "Alertas"],
  },
  {
    title: "Seguridad",
    items: ["AELOCK", "Análisis de riesgo", "Prompt injection", "Secrets", "Compliance"],
  },
  {
    title: "Producto",
    items: ["React + Vite", "APIs", "Integraciones", "Deploy", "Observabilidad"],
  },
];

export default function Capacidades() {
  return (
    <>
      <Seo
        title="Capacidades — IA agéntica, datos y seguridad"
        description="Diseñamos, construimos y operamos flujos de trabajo agénticos: orquestación, RAG, evaluación, seguridad y desarrollo AI-native."
        path="/capacidades"
      />

      <section className="relative overflow-hidden border-b border-border/60 bg-surface">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-ae-green-400/[0.07] blur-[140px]" />
        <Container className="relative py-16 md:py-24">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-ae-green-400/25 bg-ae-green-400/10 px-3 py-1 text-[11px] font-semibold text-ae-green-300">
              Capacidades
            </span>
            <h1 className="mt-5 text-balance text-4xl font-extrabold tracking-tight text-fg md:text-5xl lg:text-6xl">
              Expertos en uso, aplicación y desarrollo de IA.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-fg-muted md:text-lg">
              No añadimos IA a un catálogo. Diseñamos la arquitectura, construimos
              los agentes, los ponemos en producción y medimos el resultado.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/cotizacion">
                  Cotizar un flujo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="glass" size="lg">
                <Link href="/metodo">Ver el método</Link>
              </Button>
            </div>
          </m.div>
        </Container>
      </section>

      <CapabilitiesSection />

      <section className="border-y border-border/60 bg-surface-1/40 py-16 md:py-24">
        <Container>
          <div className="mb-10 max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ae-green-400">
              Stack
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-fg md:text-4xl">
              La capa técnica detrás de cada agente.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-fg-muted">
              Elegimos tecnología por criterio de producción: latencia, costo,
              trazabilidad y seguridad. No por moda.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {STACK.map((group) => (
              <div
                key={group.title}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5"
              >
                <h3 className="text-sm font-bold text-fg">{group.title}</h3>
                <ul className="mt-3 space-y-1.5">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-[11.5px] text-fg-muted">
                      <Check className="h-3 w-3 shrink-0 text-ae-green-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <MethodSection />
      <AgenticCTA />
    </>
  );
}