import { useMemo, useState } from "react";
import { m } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Seo } from "@/components/shared/seo";
import { AgenticCTA } from "@/components/features/trust/agentic-cta";
import { FAQ_ITEMS } from "@/lib/faq-data";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { id: "all", label: "Todo" },
  { id: "servicios", label: "Servicios" },
  { id: "proceso", label: "Proceso" },
  { id: "pagos", label: "Pagos" },
  { id: "soporte", label: "Soporte" },
] as const;

export default function Faq() {
  const [category, setCategory] = useState<string>("all");
  const [open, setOpen] = useState<number | null>(0);

  const items = useMemo(
    () => (category === "all" ? FAQ_ITEMS : FAQ_ITEMS.filter((f) => f.category === category)),
    [category]
  );

  return (
    <>
      <Seo
        title="FAQ — Aeperion Systems"
        description="Preguntas frecuentes sobre flujos de trabajo agénticos, KSPR, AELOCK, Presentto Online y cómo trabajamos."
        path="/faq"
      />

      <section className="border-b border-border/60 bg-surface">
        <Container className="py-16 md:py-24">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-ae-green-400/25 bg-ae-green-400/10 px-3 py-1 text-[11px] font-semibold text-ae-green-300">
              FAQ
            </span>
            <h1 className="mt-5 text-balance text-4xl font-extrabold tracking-tight text-fg md:text-5xl">
              Preguntas frecuentes.
            </h1>
            <p className="mt-4 text-base leading-relaxed text-fg-muted">
              Lo que suelen preguntarnos antes de empezar un flujo agéntico.
            </p>
          </m.div>

          <div className="mt-8 flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setCategory(cat.id);
                  setOpen(0);
                }}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                  category === cat.id
                    ? "border-ae-green-400/40 bg-ae-green-400/10 text-ae-green-300"
                    : "border-white/10 bg-white/[0.03] text-fg-muted hover:text-fg"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="mt-6 space-y-2">
            {items.map((item, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={item.question}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025]"
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm font-semibold text-fg">{item.question}</span>
                    {isOpen ? (
                      <Minus className="h-4 w-4 shrink-0 text-ae-green-400" />
                    ) : (
                      <Plus className="h-4 w-4 shrink-0 text-fg-subtle" />
                    )}
                  </button>
                  {isOpen && (
                    <m.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="border-t border-white/[0.06] px-5 py-4"
                    >
                      <p className="text-sm leading-relaxed text-fg-muted">{item.answer}</p>
                    </m.div>
                  )}
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <AgenticCTA />
    </>
  );
}