import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Search, PenTool, Code, Rocket, TrendingUp } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Método de Trabajo",
  description:
    "Conoce nuestra metodología de 5 fases: Diagnóstico, Análisis de brechas, Arquitectura de solución, Implementación y Expansión.",
};

/**
 * AEPERION — Método Page
 *
 * HANDOFF-FRONTEND:
 *   - Timeline visual con animación de scroll
 *   - Cada fase se revela al hacer scroll
 *   - Números de fase animados (counter)
 *   - Conexión visual entre fases (línea animada)
 */

const phases = [
  {
    number: 1,
    icon: Search,
    title: "Diagnóstico",
    subtitle: "Entendemos tu operación",
    description:
      "Comenzamos con una conversación profunda. No asumimos nada. Preguntamos, observamos y documentamos cómo funciona realmente tu negocio en el día a día.",
    details: [
      "Entrevista con founders y equipo clave",
      "Revisión de procesos actuales",
      "Identificación de herramientas existentes",
      "Mapeo de flujos operativos",
      "Detección de puntos de fricción",
    ],
    duration: "3-5 días",
  },
  {
    number: 2,
    icon: PenTool,
    title: "Análisis de Brechas",
    subtitle: "Encontramos lo que falta",
    description:
      "Comparamos tu operación actual con el estado ideal. Detectamos ausencias críticas, inconsistencias y oportunidades que no sabías que tenías.",
    details: [
      "Análisis de brechas digitales",
      "Identificación de ausencias críticas",
      "Detección de potencial dormido",
      "Priorización por impacto",
      "Reporte de oportunidades",
    ],
    duration: "2-3 días",
  },
  {
    number: 3,
    icon: Code,
    title: "Arquitectura de Solución",
    subtitle: "Diseñamos lo que necesitas",
    description:
      "Con el diagnóstico claro, diseñamos la solución exacta. No construimos de más. Solo lo que resuelve tus problemas reales.",
    details: [
      "Diseño de arquitectura digital",
      "Selección de herramientas",
      "Definición de integraciones",
      "Plan de implementación",
      "Presupuesto y timeline",
    ],
    duration: "3-5 días",
  },
  {
    number: 4,
    icon: Rocket,
    title: "Implementación",
    subtitle: "Construimos y entregamos",
    description:
      "Construimos cada herramienta con estándares profesionales. Probamos, ajustamos y entregamos. No soltamos el proyecto hasta que funciona en tu operación real.",
    details: [
      "Desarrollo ágil con entregas parciales",
      "Pruebas en entorno real",
      "Capacitación del equipo",
      "Documentación de uso",
      "Puesta en producción",
    ],
    duration: "7-30 días (según plan)",
  },
  {
    number: 5,
    icon: TrendingUp,
    title: "Expansión",
    subtitle: "Crecemos contigo",
    description:
      "El lanzamiento es solo el comienzo. Monitoreamos, optimizamos y expandimos. A medida que tu negocio crece, tus herramientas crecen contigo.",
    details: [
      "Soporte y mantenimiento continuo",
      "Reportes mensuales de rendimiento",
      "Optimización basada en datos",
      "Nuevas funcionalidades",
      "Escalabilidad asegurada",
    ],
    duration: "Continua",
  },
];

export default function MetodoPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <Section variant="default" size="lg">
        <Container variant="narrow" className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-ae-gray-900 tracking-tight mb-6">
            Nuestro método:
            <br />
            <span className="text-ae-green-500">5 fases</span> para transformar tu negocio
          </h1>
          <p className="text-lg text-ae-gray-500 max-w-2xl mx-auto leading-relaxed">
            No improvisamos. Cada solución sigue un proceso probado que garantiza que resolvemos
            el problema correcto, de la manera correcta.
          </p>
        </Container>
      </Section>

      {/* Timeline */}
      <Section variant="alt" size="lg">
        <Container variant="narrow">
          <div className="space-y-16">
            {phases.map((phase, i) => {
              const Icon = phase.icon;
              return (
                <div key={i} className="relative pl-12 md:pl-16">
                  {/* Connector line */}
                  {i < phases.length - 1 && (
                    <div className="absolute left-[23px] md:left-[31px] top-14 bottom-[-4rem] w-0.5 bg-ae-green-200" />
                  )}

                  {/* Number circle */}
                  <div className="absolute left-0 top-0 h-12 w-12 md:h-14 md:w-14 rounded-full bg-ae-green-400 flex items-center justify-center text-white font-bold text-lg">
                    {phase.number}
                  </div>

                  {/* Content */}
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-8 w-8 rounded-lg bg-ae-green-50 flex items-center justify-center text-ae-green-500">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="text-xs font-medium text-ae-green-600">{phase.duration}</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-ae-gray-900 mb-1">
                      {phase.title}
                    </h2>
                    <p className="text-sm text-ae-gray-500 font-medium mb-4">{phase.subtitle}</p>
                    <p className="text-base text-ae-gray-600 leading-relaxed mb-6">
                      {phase.description}
                    </p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {phase.details.map((detail, j) => (
                        <div key={j} className="flex items-start gap-2 text-sm text-ae-gray-600">
                          <span className="h-1.5 w-1.5 rounded-full bg-ae-green-400 flex-shrink-0 mt-1.5" />
                          {detail}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section variant="default" size="md">
        <Container className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-ae-gray-900 mb-4">
            Comienza con la Fase 1 hoy
          </h2>
          <p className="text-ae-gray-500 mb-8 max-w-md mx-auto">
            Agenda tu diagnóstico gratuito de 30 minutos. Sin compromiso.
          </p>
          <Link href="/asesoria">
            <Button variant="primary" size="xl">
              Agendar Diagnóstico
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </Container>
      </Section>
    </div>
  );
}
