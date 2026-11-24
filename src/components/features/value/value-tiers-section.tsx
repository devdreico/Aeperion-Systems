import { m } from "framer-motion";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { Link } from "@/components/ui/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/shared/section-header";
import { VALUE_TIERS, VALUE_UPGRADES } from "@/lib/value-tiers-data";
import { cn } from "@/lib/utils";

const UPGRADE_ICONS: Record<string, string> = {
  bot: "🤖",
  database: "🗄️",
  "shield-check": "🛡️",
  "scan-search": "🔍",
  activity: "📈",
  "graduation-cap": "🎓",
};

export function ValueTiersSection() {
  return (
    <section className="relative overflow-hidden bg-surface py-20 md:py-28">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-80 w-[700px] -translate-x-1/2 rounded-full bg-ae-green-400/[0.06] blur-[140px]" />
      <Container className="relative">
        <SectionHeader
          badge="Niveles de valor"
          title="No vendemos planes. Diseñamos la siguiente mejora."
          description="Cada nivel es una unidad de valor con entregables claros. El alcance y la inversión se cotizan después de entender tu operación."
        />

        <div className="grid gap-4 lg:grid-cols-4">
          {VALUE_TIERS.map((tier, i) => (
            <m.div
              key={tier.id}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 }}
              className={cn(
                "relative flex h-full flex-col rounded-3xl border p-5 backdrop-blur-md transition-colors",
                tier.highlight
                  ? "border-ae-green-400/40 bg-ae-green-400/[0.06] shadow-[0_0_50px_-20px_rgba(110,196,94,0.5)]"
                  : "border-white/10 bg-white/[0.025] hover:border-white/20"
              )}
            >
              {tier.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="border-ae-green-400/40 bg-ae-green-400/15 text-ae-green-200">
                    <Sparkles className="h-3 w-3" />
                    Punto de entrada recomendado
                  </Badge>
                </div>
              )}

              <div className="flex items-baseline justify-between">
                <span className="font-mono text-3xl font-bold text-white/15">{tier.level}</span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-fg-subtle">
                  Nivel
                </span>
              </div>
              <h3 className="mt-2 text-xl font-extrabold tracking-tight text-fg">{tier.name}</h3>
              <p className="text-xs font-medium text-ae-green-300/90">{tier.subtitle}</p>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">{tier.description}</p>

              <div className="mt-4 rounded-xl border border-white/[0.06] bg-black/20 p-3">
                <p className="text-[10px] uppercase tracking-[0.16em] text-fg-subtle">Resultado</p>
                <p className="mt-1 text-xs font-medium text-fg-muted">{tier.outcome}</p>
              </div>

              <ul className="mt-4 space-y-1.5">
                {tier.includes.slice(0, 5).map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[11.5px] text-fg-muted">
                    <Check className="mt-0.5 h-3 w-3 shrink-0 text-ae-green-400" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-5">
                <Button
                  asChild
                  variant={tier.highlight ? "primary" : "glass"}
                  className="w-full"
                  size="md"
                >
                  <Link href={`/cotizacion?tier=${tier.id}`}>
                    {tier.cta}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            </m.div>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-md">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ae-green-400">
                Mejoras
              </p>
              <h3 className="mt-1 text-xl font-bold text-fg">Añade capacidad, no paquetes.</h3>
            </div>
            <p className="max-w-md text-xs text-fg-muted">
              Cada mejora se integra al nivel que ya tienes. Se cotiza por separado y se activa
              cuando el negocio la necesita.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {VALUE_UPGRADES.map((upgrade) => (
              <div
                key={upgrade.title}
                className="rounded-2xl border border-white/[0.06] bg-black/20 p-4 transition-colors hover:border-ae-green-400/25"
              >
                <span className="text-lg">{UPGRADE_ICONS[upgrade.icon] ?? "✦"}</span>
                <p className="mt-2 text-xs font-semibold text-fg">{upgrade.title}</p>
                <p className="mt-1 text-[11px] leading-relaxed text-fg-subtle">
                  {upgrade.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}