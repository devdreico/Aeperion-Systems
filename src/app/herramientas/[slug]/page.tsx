import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TOOLS, TOOL_CATEGORIES } from "@/lib/tools-data";
import { CATEGORY_ICONS } from "@/components/features/tools/category-icons";
import { formatCOP } from "@/lib/utils";
import { JsonLdScript } from "@/components/shared/json-ld-script";
import { breadcrumbListJsonLd, pageMetadata, productJsonLd } from "@/lib/seo";
import { ToolPurchaseForm } from "./tool-purchase-form";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return TOOLS.map((tool) => ({ slug: tool.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = TOOLS.find((t) => t.id === slug);
  if (!tool) return { title: "Herramienta no encontrada", robots: { index: false } };
  const category = TOOL_CATEGORIES.find((c) => c.id === tool.category);
  return pageMetadata({
    title: tool.name,
    description: tool.description,
    path: `/herramientas/${tool.id}`,
    keywords: [tool.name, tool.subtitle, category?.name].filter(
      (k): k is string => Boolean(k)
    ),
  });
}

export default async function ToolDetailPage({ params }: Props) {
  const { slug } = await params;
  const tool = TOOLS.find((t) => t.id === slug);
  if (!tool) notFound();

  const category = TOOL_CATEGORIES.find((c) => c.id === tool.category);
  const relatedTools = TOOLS.filter((t) => tool.relatedTools.includes(t.id));
  const Icon = CATEGORY_ICONS[tool.category];

  const jsonLd = [
    breadcrumbListJsonLd([
      { name: "Inicio", path: "/" },
      { name: "Soluciones", path: "/herramientas" },
      { name: tool.name },
    ]),
    productJsonLd({
      name: tool.name,
      description: tool.description,
      path: `/herramientas/${tool.id}`,
      price: tool.price,
      category: category?.name,
    }),
  ];

  return (
    <div className="pt-20">
      <JsonLdScript data={jsonLd} />
      <section className="relative overflow-hidden mesh-bg bg-surface py-12 md:py-20">
        <Container variant="narrow" className="relative z-10">
          <Link
            href="/herramientas"
            className="inline-flex items-center gap-1.5 text-sm text-fg-muted hover:text-ae-green-600 dark:hover:text-ae-green-300 mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a soluciones
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="h-12 w-12 rounded-2xl bg-ae-green-400/15 flex items-center justify-center">
              {Icon && <Icon className="h-6 w-6 text-ae-green-500" />}
            </span>
            <Badge variant="secondary">{category?.name}</Badge>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-fg tracking-tight mb-4">
            {tool.name}
          </h1>

          <p className="text-lg text-fg-muted leading-relaxed mb-6">
            {tool.longDescription}
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-8">
            <span className="text-3xl font-extrabold text-ae-green-600 dark:text-ae-green-300">
              {formatCOP(tool.price)}
            </span>
            <span className="text-sm text-fg-subtle">COP · pago único</span>
            {tool.hasDemo && (
              <Badge variant="success">
                <Sparkles className="h-3 w-3" />
                Demo disponible
              </Badge>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            {tool.hasDemo && (
              <Link href={`/demo/${tool.id}`}>
                <Button variant="secondary" size="lg">
                  <Sparkles className="h-4 w-4" />
                  Probar demo
                </Button>
              </Link>
            )}
            <a href="#tool-request">
              <Button variant="primary" size="lg" className="group">
                Solicitar esta solución
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </a>
          </div>
        </Container>
      </section>

      <section className="py-16 bg-surface">
        <Container variant="narrow">
          <h2 className="text-2xl font-extrabold text-fg mb-8">¿Qué incluye?</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            {tool.features.map((feature) => (
              <div
                key={feature}
                className="flex items-start gap-3 p-4 rounded-2xl glass-card"
              >
                <Check className="h-5 w-5 text-ae-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-fg-muted">{feature}</span>
              </div>
            ))}
          </div>

          {tool.requirements.length > 0 && (
            <>
              <h2 className="text-2xl font-extrabold text-fg mb-4">Requisitos</h2>
              <ul className="space-y-2 mb-12">
                {tool.requirements.map((req) => (
                  <li key={req} className="flex items-center gap-2 text-sm text-fg-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-fg-subtle" />
                    {req}
                  </li>
                ))}
              </ul>
            </>
          )}

          <div className="rounded-3xl glass-strong p-7 mb-12">
            <h2 className="text-lg font-bold text-fg mb-2">
              Adquiere {tool.name}
            </h2>
            <p className="text-sm text-fg-muted mb-5">
              Déjanos tus datos y te contactaremos para activar esta solución.
            </p>
            <ToolPurchaseForm toolName={tool.name} />
          </div>

          {relatedTools.length > 0 && (
            <>
              <h2 className="text-2xl font-extrabold text-fg mb-6">
                Soluciones relacionadas
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {relatedTools.map((rt) => (
                  <Link key={rt.id} href={`/herramientas/${rt.id}`} className="group">
                    <div className="p-4 rounded-2xl glass-card hover:border-ae-green-400/40 transition-colors h-full">
                      <h3 className="text-sm font-bold text-fg mb-1 group-hover:text-ae-green-600 dark:group-hover:text-ae-green-300 transition-colors">
                        {rt.name}
                      </h3>
                      <p className="text-xs text-fg-muted">{rt.subtitle}</p>
                      <span className="text-xs font-bold text-ae-green-600 dark:text-ae-green-300 mt-2 block">
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

      <section className="py-16 bg-surface-1">
        <Container className="text-center">
          <h2 className="text-2xl font-extrabold text-fg mb-4">¿Listo para empezar?</h2>
          <p className="text-fg-muted mb-8 max-w-md mx-auto">
            Agenda una asesoría gratuita y descubre cómo {tool.name.toLowerCase()}{" "}
            puede transformar tu operación.
          </p>
          <Link href="/asesoria">
            <Button variant="primary" size="xl" className="group">
              Asesoría Gratuita
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </Link>
        </Container>
      </section>
    </div>
  );
}
