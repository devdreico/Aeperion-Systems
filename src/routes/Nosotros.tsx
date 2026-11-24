import { m } from "framer-motion";
import {
  Bot,
  HeartHandshake,
  Search,
  Target,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { Seo } from "@/components/shared/seo";
import { SectionHeader } from "@/components/shared/section-header";
import { AgenticCTA } from "@/components/features/trust/agentic-cta";
import { COMPANY_VALUES, SITE_CONFIG } from "@/lib/constants";
import { MILESTONES, TEAM } from "@/lib/team-data";

const VALUE_ICONS: Record<string, LucideIcon> = {
  target: Target,
  bot: Bot,
  search: Search,
  "heart-handshake": HeartHandshake,
};

export default function Nosotros() {
  return (
    <>
      <Seo
        title="Nosotros — Aeperion Systems"
        description="Aeperion Systems diseña, construye y opera flujos de trabajo agénticos. Un equipo híbrido de humanos y agentes SPR desde 2017 en Bogotá."
        path="/nosotros"
      />

      <section className="relative overflow-hidden border-b border-border/60 bg-surface">
        <div className="pointer-events-none absolute -left-40 -top-40 h-[480px] w-[480px] rounded-full bg-ae-green-400/[0.06] blur-[140px]" />
        <Container className="relative py-16 md:py-24">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-ae-green-400/25 bg-ae-green-400/10 px-3 py-1 text-[11px] font-semibold text-ae-green-300">
              Nosotros
            </span>
            <h1 className="mt-5 text-balance text-4xl font-extrabold tracking-tight text-fg md:text-5xl lg:text-6xl">
              Un equipo híbrido. Una obsesión: que la IA trabaje.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-fg-muted md:text-lg">
              Desde {SITE_CONFIG.foundedYear} en {SITE_CONFIG.city}, Colombia.
              Humanos que diseñan el sistema y agentes SPR que lo operan.
            </p>
          </m.div>
        </Container>
      </section>

      <section className="bg-surface py-16 md:py-24">
        <Container>
          <SectionHeader
            badge="Principios"
            title="Cómo pensamos la IA."
            description="Cuatro principios que determinan qué construimos y qué rechazamos."
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {COMPANY_VALUES.map((value, i) => {
              const Icon = VALUE_ICONS[value.icon] ?? Target;
              return (
                <m.div
                  key={value.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: i * 0.07 }}
                  className="rounded-3xl border border-white/10 bg-white/[0.025] p-5"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-ae-green-400/25 bg-ae-green-400/10 text-ae-green-300">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-fg">{value.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-fg-muted">{value.description}</p>
                </m.div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="border-y border-border/60 bg-surface-1/40 py-16 md:py-24">
        <Container>
          <SectionHeader
            badge="Equipo"
            title="Humanos + agentes SPR."
            description="No escondemos los agentes: son parte del equipo y operan con supervisión."
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((member) => (
              <div
                key={member.name}
                className="rounded-3xl border border-white/10 bg-white/[0.025] p-5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-ae-green-400/25 bg-ae-green-400/10 text-xs font-bold text-ae-green-300">
                  {member.name
                    .split(" ")
                    .slice(0, 2)
                    .map((n) => n[0])
                    .join("")}
                </div>
                <h3 className="mt-4 text-sm font-bold text-fg">{member.name}</h3>
                <p className="text-[11px] font-medium text-ae-green-300/90">{member.role}</p>
                <p className="mt-2 text-xs leading-relaxed text-fg-muted">{member.bio}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-surface py-16 md:py-24">
        <Container>
          <SectionHeader
            badge="Trayectoria"
            title="De software a sistemas agénticos."
            description="La evolución de Aeperion en cinco hitos."
          />
          <div className="relative ml-4 border-l border-white/10 pl-8">
            {MILESTONES.map((milestone, i) => (
              <m.div
                key={milestone.year}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="relative pb-8 last:pb-0"
              >
                <span className="absolute -left-[41px] top-1 h-3 w-3 rounded-full border border-ae-green-400/50 bg-ae-green-400/20" />
                <p className="font-mono text-xs text-ae-green-300">{milestone.year}</p>
                <h3 className="mt-1 text-base font-bold text-fg">{milestone.title}</h3>
                <p className="mt-1 max-w-2xl text-sm leading-relaxed text-fg-muted">
                  {milestone.description}
                </p>
              </m.div>
            ))}
          </div>
        </Container>
      </section>

      <AgenticCTA />
    </>
  );
}