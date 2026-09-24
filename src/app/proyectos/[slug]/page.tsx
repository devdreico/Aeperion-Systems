import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Quote } from "lucide-react";
import { PROJECTS, getProjectBySlug } from "@/lib/projects-data";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { JsonLdScript } from "@/components/shared/json-ld-script";
import { breadcrumbListJsonLd, pageMetadata } from "@/lib/seo";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Proyecto no encontrado", robots: { index: false } };
  return pageMetadata({
    title: `${project.clientName} — ${project.industry}`,
    description: project.challenge,
    path: `/proyectos/${project.slug}`,
    keywords: [project.clientName, project.industry, ...project.tags],
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const jsonLd = breadcrumbListJsonLd([
    { name: "Inicio", path: "/" },
    { name: "Proyectos", path: "/proyectos" },
    { name: project.clientName },
  ]);

  return (
    <div className="pt-20">
      <JsonLdScript data={jsonLd} />
      <section
        className={cn(
          "relative overflow-hidden bg-gradient-to-br py-20 md:py-28 text-white",
          project.accent
        )}
      >
        <div className="absolute inset-0 bg-black/25" />
        <Container className="relative z-10">
          <Link
            href="/proyectos"
            className="inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a proyectos
          </Link>
          <div className="flex flex-wrap gap-2 mb-5">
            <Badge variant="glass" className="text-white border-white/30">
              {project.industry}
            </Badge>
            <Badge variant="glass" className="text-white border-white/30">
              {project.year}
            </Badge>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight max-w-3xl">
            {project.clientName}
          </h1>
          <div className="mt-8 grid grid-cols-3 gap-4 max-w-2xl">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="rounded-2xl bg-white/10 backdrop-blur-sm p-4">
                <div className="text-xl md:text-2xl font-extrabold">{metric.value}</div>
                <div className="text-[11px] text-white/80 leading-tight mt-1">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20 bg-surface">
        <Container className="grid lg:grid-cols-2 gap-12">
          <div className="rounded-3xl glass-card p-8">
            <h2 className="text-xl font-bold text-fg mb-3">El reto</h2>
            <p className="text-fg-muted leading-relaxed">{project.challenge}</p>
          </div>
          <div className="rounded-3xl glass-card p-8">
            <h2 className="text-xl font-bold text-fg mb-3">La solución</h2>
            <p className="text-fg-muted leading-relaxed">{project.solution}</p>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20 bg-surface-1">
        <Container>
          <h2 className="text-2xl md:text-3xl font-extrabold text-fg mb-8 text-center">
            Resultados
          </h2>
          <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {project.results.map((result) => (
              <div key={result} className="flex items-start gap-3 rounded-3xl glass-card p-6">
                <Check className="h-5 w-5 text-ae-green-500 shrink-0 mt-0.5" />
                <span className="text-sm text-fg-muted">{result}</span>
              </div>
            ))}
          </div>

          <figure className="mt-14 max-w-2xl mx-auto rounded-3xl glass-strong p-8 text-center">
            <Quote className="h-7 w-7 text-ae-green-400/50 mx-auto mb-4" />
            <blockquote className="text-lg text-fg font-light leading-relaxed">
              “{project.testimonial}”
            </blockquote>
            <figcaption className="mt-5">
              <span className="block text-sm font-bold text-fg">
                {project.testimonialAuthor}
              </span>
              <span className="block text-xs text-fg-subtle">
                {project.testimonialRole} · {project.clientName}
              </span>
            </figcaption>
          </figure>
        </Container>
      </section>

      <section className="py-16 md:py-20 bg-surface">
        <Container className="text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-fg mb-3">
            ¿Tienes un reto similar?
          </h2>
          <p className="text-fg-muted max-w-xl mx-auto mb-8">
            Cuéntanos tu operación y te mostramos cómo la automatizamos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/asesoria">
              <Button variant="primary" size="xl" className="group">
                Asesoría Gratuita
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
            <Link href="/proyectos">
              <Button variant="secondary" size="xl">
                Ver más proyectos
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
