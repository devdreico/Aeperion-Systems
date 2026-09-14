import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TOOLS, TOOL_CATEGORIES } from "@/lib/tools-data";
import { formatCOP } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return TOOLS.map((tool) => ({
    slug: tool.id,
  }));
}

/**
 * AEPERION — Tool Detail Page
 *
 * Página individual de cada herramienta con detalle completo.
 *
 * HANDOFF-FRONTEND:
 *   - Hero de la herramienta con fade-in
 *   - Feature list: stagger reveal
 *   - Price: counter animation
 *   - CTA: magnetic button
 *   - Related tools: hover effects
 */

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = TOOLS.find((t) => t.id === slug);
  if (!tool) return { title: "Herramienta no encontrada" };

  return {
    title: `${tool.name} | Aeperion Systems`,
    description: tool.description,
  };
}

export default async function ToolDetailPage({ params }: Props) {
  const { slug } = await params;
  const tool = TOOLS.find((t) => t.id === slug);

  if (!tool) notFound();

  const category = TOOL_CATEGORIES.find((c) => c.id === tool.category);
  const relatedTools = TOOLS.filter((t) => tool.relatedTools.includes(t.id));

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-white to-ae-gray-50">
        <Container variant="narrow">
          <Link
            href="/herramientas"
            className="inline-flex items-center gap-1 text-sm text-ae-gray-500 hover:text-ae-green-600 mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a herramientas
          </Link>

          <Badge variant="secondary" className="mb-4">
            {category?.name}
          </Badge>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-ae-gray-900 tracking-tight mb-4">
            {tool.name}
          </h1>

          <p className="text-lg text-ae-gray-500 leading-relaxed mb-6">
            {tool.longDescription}
          </p>

          <div className="flex items-center gap-4 mb-8">
            <span className="text-3xl font-bold text-ae-green-600">{formatCOP(tool.price)}</span>
            <span className="text-sm text-ae-gray-400">COP · Pago único</span>
            {tool.hasDemo && (
              <Badge variant="success" className="flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                Demo disponible
              </Badge>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/asesoria">
              <Button variant="primary" size="lg" className="animate-pulse-glow">
                Comprar {tool.name}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            {tool.hasDemo && (
              <Link href={`/demo/${tool.id}`}>
                <Button variant="secondary" size="lg">
                  <Sparkles className="h-4 w-4" />
                  Probar Demo
                </Button>
              </Link>
            )}
          </div>
        </Container>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <Container variant="narrow">
          <h2 className="text-2xl font-bold text-ae-gray-900 mb-8">
            ¿Qué incluye?
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            {tool.features.map((feature, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-ae-gray-50">
                <Check className="h-5 w-5 text-ae-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-ae-gray-700">{feature}</span>
              </div>
            ))}
          </div>

          {tool.requirements.length > 0 && (
            <>
              <h2 className="text-2xl font-bold text-ae-gray-900 mb-4">
                Requisitos
              </h2>
              <ul className="space-y-2 mb-12">
                {tool.requirements.map((req, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-ae-gray-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-ae-gray-400" />
                    {req}
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Related Tools */}
          {relatedTools.length > 0 && (
            <>
              <h2 className="text-2xl font-bold text-ae-gray-900 mb-6">
                Herramientas relacionadas
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {relatedTools.map((rt) => (
                  <Link key={rt.id} href={`/herramientas/${rt.id}`}>
                    <div className="p-4 rounded-xl border border-ae-gray-200 hover:border-ae-green-200 hover:shadow-sm transition-all duration-200">
                      <h3 className="text-sm font-semibold text-ae-gray-900 mb-1">{rt.name}</h3>
                      <p className="text-xs text-ae-gray-500">{rt.subtitle}</p>
                      <span className="text-xs font-semibold text-ae-green-600 mt-2 block">
                        {formatCOP(rt.price)}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 bg-ae-gray-50">
        <Container className="text-center">
          <h2 className="text-2xl font-bold text-ae-gray-900 mb-4">
            ¿Listo para empezar?
          </h2>
          <p className="text-ae-gray-500 mb-8 max-w-md mx-auto">
            Agenda una asesoría gratuita y descubre cómo {tool.name.toLowerCase()} puede transformar tu operación.
          </p>
          <Link href="/asesoria">
            <Button variant="primary" size="xl">
              Asesoría Gratuita
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </Container>
      </section>
    </div>
  );
}
