import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Clock, User } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionTransition } from "@/components/animations/section-transition";
import { BLOG_POSTS, getBlogPostBySlug } from "@/lib/blog-data";
import { JsonLdScript } from "@/components/shared/json-ld-script";
import {
  blogPostingJsonLd,
  breadcrumbListJsonLd,
  pageMetadata,
} from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Artículo no encontrado", robots: { index: false } };
  return pageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.publishedAtISO,
    modifiedTime: post.modifiedAtISO ?? post.publishedAtISO,
    authors: [post.author],
    keywords: post.tags,
  });
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  const jsonLd = [
    blogPostingJsonLd(post),
    breadcrumbListJsonLd([
      { name: "Inicio", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: post.title },
    ]),
  ];

  return (
    <div className="pt-20">
      <JsonLdScript data={jsonLd} />
      <article>
        <Container variant="narrow" className="py-12 md:py-20">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-fg-muted hover:text-ae-green-600 dark:hover:text-ae-green-300 mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al blog
          </Link>

          <Badge variant="secondary" className="mb-4">
            {post.category}
          </Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-fg tracking-tight mb-5">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-fg-subtle mb-10 pb-8 border-b border-border">
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {post.publishedAt}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {post.readingTime} min de lectura
            </span>
          </div>

          <SectionTransition>
            <div
              className="article-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </SectionTransition>

          <div className="mt-10 pt-8 border-t border-border">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full bg-surface-2 text-fg-muted"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </article>

      <section className="py-16 md:py-20 bg-surface-1">
        <Container>
          <h2 className="text-2xl font-extrabold text-fg mb-8">
            Sigue leyendo
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {related.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group">
                <article className="h-full rounded-3xl glass-card p-6 hover:border-ae-green-400/40 transition-colors">
                  <Badge variant="secondary" className="mb-3 text-[10px]">
                    {p.category}
                  </Badge>
                  <h3 className="text-base font-bold text-fg mb-2 group-hover:text-ae-green-600 dark:group-hover:text-ae-green-300 transition-colors line-clamp-2">
                    {p.title}
                  </h3>
                  <p className="text-xs text-fg-muted line-clamp-2">{p.excerpt}</p>
                </article>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20 bg-surface relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 mesh-bg" />
        <Container className="relative text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-fg mb-4">
            ¿Listo para automatizar tu operación?
          </h2>
          <p className="text-fg-muted mb-8 max-w-md mx-auto">
            Agenda una asesoría gratuita y descubre el primer paso para tu negocio.
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
