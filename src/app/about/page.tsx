import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Target, Search, HeartHandshake, Bot } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { COMPANY_VALUES, SITE_CONFIG } from "@/lib/constants";
import { MILESTONES, TEAM } from "@/lib/team-data";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Sobre Aeperion Systems",
  description:
    "Startup fintech de desarrollo de software con IA. Desde 2017 en Bogotá, automatizamos y damos eficiencia a las empresas colombianas.",
  path: "/about",
});

const values = [
  { icon: Search, title: COMPANY_VALUES[0].title, description: COMPANY_VALUES[0].description },
  { icon: Bot, title: COMPANY_VALUES[1].title, description: COMPANY_VALUES[1].description },
  { icon: Target, title: COMPANY_VALUES[2].title, description: COMPANY_VALUES[2].description },
  { icon: HeartHandshake, title: COMPANY_VALUES[3].title, description: COMPANY_VALUES[3].description },
];

export default function AboutPage() {
  return (
    <div className="pt-20">
      <Section variant="glass" size="lg">
        <Container variant="narrow" className="text-center">
          <span className="inline-block px-3.5 py-1.5 rounded-full glass text-xs font-semibold text-ae-green-700 dark:text-ae-green-300 mb-6">
            Desde {SITE_CONFIG.foundedYear} · {SITE_CONFIG.city}, {SITE_CONFIG.country}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-fg tracking-tight mb-6">
            No solo vendemos
            <br />
            <span className="text-gradient-green">software</span>
          </h1>
          <p className="text-lg md:text-xl text-fg-muted leading-relaxed max-w-2xl mx-auto">
            Startup fintech que aplica inteligencia artificial para identificar
            problemas reales y construir soluciones que dan eficiencia,
            crecimiento y capacidad de expansión a cada empresa.
          </p>
        </Container>
      </Section>

      <Section variant="alt" size="lg">
        <Container variant="narrow">
          <SectionHeader
            badge="Filosofía"
            title="Análisis primero, tecnología después"
            align="center"
          />
          <div className="space-y-6 text-base md:text-lg text-fg-muted leading-relaxed">
            <p>
              Muchos negocios todavía operan de forma manual o no cuentan con
              herramientas digitales básicas: automatizaciones con WhatsApp,
              CRM, facturación electrónica o sistemas POS adaptados a su
              operación.
            </p>
            <p>
              En Aeperion no creemos en vender software por vender. Creemos en{" "}
              <strong className="text-fg">identificar primero el problema</strong>.
              Por eso nuestro proceso empieza con un análisis profundo de la
              operación de cada empresa, potenciado con datos e IA.
            </p>
            <p>
              Detectamos brechas en ventas, atención al cliente, automatización,
              administración y captación. Una vez identificadas, construimos la
              solución exacta que las resuelve.
            </p>
            <p className="font-semibold text-fg">
              Nuestro propósito es construir soluciones digitales que mejoren el
              funcionamiento, el crecimiento y la capacidad de expansión de cada
              negocio.
            </p>
          </div>
        </Container>
      </Section>

      <Section variant="default" size="lg">
        <Container>
          <SectionHeader badge="Valores" title="Cómo trabajamos" align="center" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="p-6 rounded-3xl glass-card hover:border-ae-green-400/40 transition-all duration-300"
                >
                  <div className="h-11 w-11 rounded-2xl bg-ae-green-400/15 flex items-center justify-center text-ae-green-500 mb-4">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-fg mb-2">{v.title}</h3>
                  <p className="text-sm text-fg-muted leading-relaxed">{v.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section variant="alt" size="lg">
        <Container variant="narrow">
          <SectionHeader badge="Historia" title="Nuestra trayectoria" align="center" />
          <div className="space-y-8">
            {MILESTONES.map((item) => (
              <div key={item.year} className="relative pl-8 border-l-2 border-ae-green-400/30">
                <div className="absolute left-[-9px] top-0 h-4 w-4 rounded-full bg-ae-green-400 border-2 border-surface" />
                <span className="text-xs font-bold text-ae-green-600 dark:text-ae-green-300">
                  {item.year}
                </span>
                <h3 className="text-lg font-bold text-fg mt-1">{item.title}</h3>
                <p className="text-sm text-fg-muted mt-1">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section variant="default" size="lg">
        <Container>
          <SectionHeader
            badge="Equipo"
            title="Las personas detrás de Aeperion"
            description="Un equipo compacto de producto, ingeniería, diseño y éxito del cliente."
            align="center"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member) => (
              <div key={member.name} className="rounded-3xl glass-card p-6 text-center">
                <div className="mx-auto h-16 w-16 rounded-full bg-ae-green-400/15 text-ae-green-600 dark:text-ae-green-300 font-extrabold text-xl flex items-center justify-center mb-4">
                  {member.name
                    .split(" ")
                    .slice(0, 2)
                    .map((n) => n[0])
                    .join("")}
                </div>
                <h3 className="text-base font-bold text-fg">{member.name}</h3>
                <p className="text-xs font-semibold text-ae-green-600 dark:text-ae-green-300 mb-2">
                  {member.role}
                </p>
                <p className="text-xs text-fg-muted leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section variant="default" size="md">
        <Container className="text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-fg mb-4">
            ¿Quieres ser parte de nuestra historia?
          </h2>
          <p className="text-fg-muted mb-8 max-w-md mx-auto">
            Agenda una asesoría gratuita y descubre cómo podemos transformar tu negocio.
          </p>
          <Link href="/asesoria">
            <Button variant="primary" size="xl" className="group">
              Asesoría Gratuita
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </Link>
        </Container>
      </Section>
    </div>
  );
}
