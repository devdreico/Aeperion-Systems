import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TOOLS } from "@/lib/tools-data";
import { DemoContainer } from "@/components/demo/demo-container";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return TOOLS.filter((t) => t.hasDemo).map((tool) => ({
    slug: tool.id,
  }));
}

/**
 * AEPERION — Demo Interactiva Page
 */

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = TOOLS.find((t) => t.id === slug);
  if (!tool) return { title: "Demo no encontrada" };

  return {
    title: `Demo: ${tool.name}`,
    description: `Prueba interactiva de ${tool.name}. ${tool.description}`,
  };
}

export default async function DemoPage({ params }: Props) {
  const { slug } = await params;
  const tool = TOOLS.find((t) => t.id === slug);

  if (!tool || !tool.hasDemo) notFound();

  return (
    <div className="pt-20 min-h-screen bg-surface-1">
      <div className="fixed top-16 inset-x-0 z-30 glass-nav px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href={`/herramientas/${tool.id}`}
            className="text-sm text-fg-muted hover:text-ae-green-600 dark:hover:text-ae-green-300 flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Link>
          <span className="text-sm font-semibold text-fg hidden sm:inline">
            Demo: {tool.name}
          </span>
          <Badge variant="secondary" className="text-[10px]">
            {tool.demoType}
          </Badge>
        </div>
        <Link href="/asesoria">
          <Button variant="primary" size="sm" className="group">
            Solicitar ahora
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </Link>
      </div>

      <Container className="pt-20 pb-32">
        <DemoContainer tool={tool} />
      </Container>
    </div>
  );
}
