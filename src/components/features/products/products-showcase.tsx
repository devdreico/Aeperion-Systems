import { m } from "framer-motion";
import { ArrowUpRight, ScanSearch, ServerCog, ShieldCheck, type LucideIcon } from "lucide-react";
import { Link } from "@/components/ui/link";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/shared/section-header";
import { HoverCard } from "@/components/animations/hover-card";
import { PRODUCTS } from "@/lib/products-data";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
  "scan-search": ScanSearch,
  "shield-check": ShieldCheck,
  "server-cog": ServerCog,
};

const ACCENTS = {
  green: {
    icon: "text-ae-green-300 bg-ae-green-400/10 border-ae-green-400/25",
    line: "from-ae-green-400/70 via-ae-green-400/20 to-transparent",
    glow: "bg-ae-green-400/10",
    ring: "group-hover:border-ae-green-400/40",
  },
  cyan: {
    icon: "text-cyan-300 bg-cyan-400/10 border-cyan-400/25",
    line: "from-cyan-400/70 via-cyan-400/20 to-transparent",
    glow: "bg-cyan-400/10",
    ring: "group-hover:border-cyan-400/40",
  },
  violet: {
    icon: "text-violet-300 bg-violet-400/10 border-violet-400/25",
    line: "from-violet-400/70 via-violet-400/20 to-transparent",
    glow: "bg-violet-400/10",
    ring: "group-hover:border-violet-400/40",
  },
} as const;

const STATUS_LABEL = {
  production: "En producción",
  beta: "Beta privada",
  private: "Privado",
} as const;

export function ProductsShowcase() {
  return (
    <section className="relative overflow-hidden bg-surface py-20 md:py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[800px] -translate-x-1/2 rounded-full bg-ae-green-400/[0.06] blur-[120px]" />
      <Container className="relative">
        <SectionHeader
          badge="Productos Aeperion"
          title="Tres sistemas. Una tesis: agentes en producción."
          description="No vendemos demos. Construimos productos propios que demuestran cómo la IA agéntica opera procesos reales, con seguridad y métricas."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {PRODUCTS.map((product, i) => {
            const Icon = ICONS[product.icon] ?? ScanSearch;
            const accent = ACCENTS[product.accent];
            return (
              <m.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
              >
                <HoverCard tiltDegree={5} scale={1.02} glare glareColor="rgba(255,255,255,0.06)">
                  <Link
                    href={product.href}
                    className={cn(
                      "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] p-6 backdrop-blur-md transition-colors",
                      accent.ring
                    )}
                  >
                    <div className={cn("pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full blur-[80px]", accent.glow)} />
                    <div className={cn("absolute inset-x-0 top-0 h-px bg-gradient-to-r", accent.line)} />

                    <div className="flex items-start justify-between">
                      <span className={cn("inline-flex h-12 w-12 items-center justify-center rounded-2xl border", accent.icon)}>
                        <Icon className="h-6 w-6" />
                      </span>
                      <Badge variant="glass" className="text-[10px] uppercase tracking-wider">
                        {STATUS_LABEL[product.status]}
                      </Badge>
                    </div>

                    <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-fg-subtle">
                      {product.category}
                    </p>
                    <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-fg">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-fg-muted">{product.tagline}</p>
                    <p className="mt-4 text-sm leading-relaxed text-fg-muted">
                      {product.description}
                    </p>

                    <ul className="mt-5 space-y-2">
                      {product.capabilities.slice(0, 3).map((cap) => (
                        <li key={cap} className="flex items-start gap-2 text-xs text-fg-muted">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ae-green-400" />
                          {cap}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 grid grid-cols-3 gap-2 border-t border-white/[0.06] pt-4">
                      {product.outcomes.map((outcome) => (
                        <div key={outcome.label}>
                          <p className="text-sm font-bold text-fg">{outcome.value}</p>
                          <p className="text-[9px] uppercase tracking-wider text-fg-subtle">
                            {outcome.label}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 flex items-center gap-1 text-xs font-semibold text-ae-green-400">
                      Explorar {product.name}
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </Link>
                </HoverCard>
              </m.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}