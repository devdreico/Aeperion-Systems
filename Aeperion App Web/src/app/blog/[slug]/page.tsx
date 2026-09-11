import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BLOG_POSTS, getBlogPostBySlug } from "@/lib/blog-data";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

/**
 * AEPERION — Blog Detail Page
 *
 * HANDOFF-FRONTEND:
 *   - Content sections: fade-in on scroll con Framer Motion
 *   - Images: lazy load with blur placeholder
 *   - Share buttons: animation on hover
 *   - Progress reading indicator
 */

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Artículo no encontrado" };

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) notFound();

  return (
    <div className="pt-20">
      <article>
        <Container variant="narrow" className="py-12 md:py-20">
          {/* HANDOFF-FRONTEND: Animar back button con slide-in */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-ae-gray-500 hover:text-ae-green-600 mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al blog
          </Link>

          {/* HANDOFF-FRONTEND: Animar badge + title con fade-in-up stagger */}
          <Badge variant="secondary" className="mb-4">{post.category}</Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-ae-gray-900 tracking-tight mb-4">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-ae-gray-400 mb-8 pb-8 border-b border-ae-gray-100">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {post.publishedAt}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {post.readingTime} min de lectura
            </span>
          </div>

          {/* HANDOFF-FRONTEND: Content — animar párrafos con fade-in on scroll */}
          <div
            className="prose prose-gray max-w-none prose-headings:text-ae-gray-900 prose-p:text-ae-gray-600 prose-p:leading-relaxed prose-a:text-ae-green-600"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* HANDOFF-FRONTEND: Tags — animar con stagger */}
          <div className="mt-8 pt-8 border-t border-ae-gray-100">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full bg-ae-gray-100 text-ae-gray-600"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </article>

      {/* HANDOFF-FRONTEND: CTA section — animar fade-in con gradient background */}
      <section className="py-16 bg-ae-gray-50 border-t border-ae-gray-100">
        <Container className="text-center">
          <h2 className="text-2xl font-bold text-ae-gray-900 mb-4">
            ¿Listo para empezar tu transformación digital?
          </h2>
          <p className="text-ae-gray-500 mb-8 max-w-md mx-auto">
            Agenda una asesoría gratuita y descubre el primer paso para tu negocio.
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
