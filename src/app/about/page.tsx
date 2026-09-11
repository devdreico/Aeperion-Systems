import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Target, Search, HeartHandshake, TrendingUp } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { COMPANY_VALUES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Sobre Aeperion Systems",
  description:
    "Somos una empresa de desarrollo de software enfocada en analizar, categorizar y brindar soluciones digitales a negocios con problemas operativos.",
};

/**
 * AEPERION — About Page
 *
 * HANDOFF-FRONTEND:
 *   - Manifiesto: text-reveal en frases clave
 *   - Values cards: stagger reveal
 *   - Fotos de equipo: hover zoom (placeholder por ahora)
 */

const values = [
  {
    icon: Search,
    title: COMPANY_VALUES[0].title,
    description: COMPANY_VALUES[0].description,
  },
  {
    icon: Target,
    title: COMPANY_VALUES[1].title,
    description: COMPANY_VALUES[1].description,
  },
  {
    icon: TrendingUp,
    title: COMPANY_VALUES[2].title,
    description: COMPANY_VALUES[2].description,
  },
  {
    icon: HeartHandshake,
    title: COMPANY_VALUES[3].title,
    description: COMPANY_VALUES[3].description,
  },
];

const timeline = [
  {
    year: "2022",
    title: "Fundación",
    description: "Aeperion nace con la idea de que los problemas operativos de las empresas pueden resolverse con tecnología a medida.",
  },
  {
    year: "2023",
    title: "Primeros 20 clientes",
    description: "Validamos el modelo de negocio con clientes reales en Bogotá. Descubrimos que el análisis previo es más valioso que el software mismo.",
  },
  {
    year: "2024",
    title: "Expansión a 39 herramientas",
    description: "Pasamos de soluciones genéricas a un catálogo de 39 herramientas individuales que resuelven problemas específicos.",
  },
  {
    year: "2025",
    title: "Crecimiento nacional",
    description: "Clientes en 5 ciudades de Colombia. Consolidamos los 3 planes de ejecución y el modelo de asesoría gratuita como puerta de entrada.",
  },
  {
    year: "2026",
    title: "Plataforma digital",
    description: "Lanzamiento de nuestra plataforma web con demos interactivas, compra de herramientas individuales y sistema de asesorías automatizado.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <Section variant="default" size="lg">
        <Container variant="narrow" className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-ae-gray-900 tracking-tight mb-6">
            No solo vendemos
            <br />
            <span className="text-ae-green-500">software</span>
          </h1>
          <p className="text-lg md:text-xl text-ae-gray-500 leading-relaxed max-w-2xl mx-auto">
            Identificamos problemas reales dentro de tu empresa y construimos soluciones digitales
            que mejoran tu funcionamiento, crecimiento y capacidad de expansión.
          </p>
        </Container>
      </Section>

      {/* Manifest */}
      <Section variant="alt" size="lg">
        <Container variant="narrow">
          <h2 className="text-2xl md:text-3xl font-bold text-ae-gray-900 mb-8 text-center">
            Nuestra filosofía
          </h2>
          <div className="space-y-6 text-base md:text-lg text-ae-gray-600 leading-relaxed">
            <p>
              Muchos negocios todavía operan de forma manual o no cuentan con herramientas digitales
              básicas como páginas web, automatizaciones con WhatsApp, sistemas CRM, facturación
              electrónica o sistemas POS adaptados a su operación.
            </p>
            <p>
              En Aeperion no creemos en vender software por vender. Creemos en <strong>identificar
              primero el problema</strong>. Por eso nuestro proceso empieza con un análisis profundo
              de la operación de cada empresa.
            </p>
            <p>
              Detectamos huecos en áreas como ventas, atención al cliente, automatización,
              administración interna, presencia digital y captación de nuevos clientes. Una vez
              identificados, construimos la solución exacta que los resuelve.
            </p>
            <p className="font-medium text-ae-gray-900">
              La idea principal de Aeperion no es solo vender software, sino identificar problemas
              reales y construir soluciones digitales que mejoren el funcionamiento, crecimiento y
              capacidad de expansión de cada negocio.
            </p>
          </div>
        </Container>
      </Section>

      {/* Values */}
      <Section variant="default" size="lg">
        <Container>
          <h2 className="text-2xl md:text-3xl font-bold text-ae-gray-900 mb-12 text-center">
            Cómo trabajamos
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div key={i} className="p-6 rounded-2xl border border-ae-gray-100 hover:border-ae-green-200 hover:shadow-md transition-all duration-300">
                  <div className="h-10 w-10 rounded-xl bg-ae-green-50 flex items-center justify-center text-ae-green-500 mb-4">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-ae-gray-900 mb-2">{v.title}</h3>
                  <p className="text-sm text-ae-gray-500 leading-relaxed">{v.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Timeline */}
      <Section variant="alt" size="lg">
        <Container variant="narrow">
          <h2 className="text-2xl md:text-3xl font-bold text-ae-gray-900 mb-12 text-center">
            Nuestra historia
          </h2>
          <div className="space-y-8">
            {timeline.map((item, i) => (
              <div key={i} className="relative pl-8 border-l-2 border-ae-green-200">
                <div className="absolute left-[-9px] top-0 h-4 w-4 rounded-full bg-ae-green-400 border-2 border-white" />
                <span className="text-xs font-bold text-ae-green-600">{item.year}</span>
                <h3 className="text-lg font-semibold text-ae-gray-900 mt-1">{item.title}</h3>
                <p className="text-sm text-ae-gray-500 mt-1">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section variant="default" size="md">
        <Container className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-ae-gray-900 mb-4">
            ¿Quieres ser parte de nuestra historia?
          </h2>
          <p className="text-ae-gray-500 mb-8 max-w-md mx-auto">
            Agenda una asesoría gratuita y descubre cómo podemos ayudarte a transformar tu negocio.
          </p>
          <Link href="/asesoria">
            <Button variant="primary" size="xl">
              Asesoría Gratuita
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </Container>
      </Section>
    </div>
  );
}
