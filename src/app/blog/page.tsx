import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { SectionTransition } from "@/components/animations/section-transition";
import { BLOG_POSTS } from "@/lib/blog-data";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Blog",
  description:
    "Artículos sobre automatización con IA, transformación digital, CRM, facturación electrónica y crecimiento para tu negocio.",
  path: "/blog",
  keywords: [
    "blog automatización IA",
    "transformación digital Colombia",
    "facturación electrónica DIAN",
    "CRM pymes",
  ],
});

const CATEGORY_GRADIENTS: Record<string, string> = {
  "Transformación Digital": "from-ae-green-400 to-emerald-600",
  Automatización: "from-sky-400 to-blue-600",
  Facturación: "from-amber-400 to-orange-600",
  CRM: "from-violet-400 to-purple-600",
  Web: "from-rose-400 to-red-600",
  POS: "from-teal-400 to-cyan-600",
};

function gradientFor(category: string) {
  return CATEGORY_GRADIENTS[category] ?? "from-ae-green-400 to-ae-green-700";
}

export default function BlogPage() {
  const [featured, ...rest] = BLOG_POSTS;

  return (
    <div className="pt-20">
      <Section variant="glass" size="lg">
        <Container>
          <div className="text-center mb-12">
            <Badge variant="default" className="mb-4">
              Recursos
            </Badge>
            <h1 className="text-4xl md:text-5xl font-extrabold text-fg tracking-tight mb-4">
              Blog
            </h1>
            <p className="text-lg text-fg-muted max-w-xl mx-auto">
              Guías y recursos sobre automatización, IA y crecimiento digital
              para empresas.
            </p>
          </div>

          <SectionTransition>
            <Link href={`/blog/${featured.slug}`} className="block group mb-12">
              <article className="relative overflow-hidden rounded-3xl glass-card">
                <div className={`h-44 md:h-56 bg-gradient-to-br ${gradientFor(featured.category)}`} />
                <div className="p-8">
                  <Badge variant="secondary" className="mb-4">
                    {featured.category}
                  </Badge>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-fg mb-3 group-hover:text-ae-green-600 dark:group-hover:text-ae-green-300 transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-fg-muted mb-4 max-w-2xl">{featured.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-fg-subtle">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {featured.publishedAt}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {featured.readingTime} min
                    </span>
                    <span className="inline-flex items-center gap-1 text-ae-green-600 dark:text-ae-green-300 font-semibold">
                      Leer artículo
                      <ArrowUpRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          </SectionTransition>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post, index) => (
              <SectionTransition key={post.slug} delay={index * 0.08}>
                <Link href={`/blog/${post.slug}`} className="block h-full group">
                  <article className="h-full rounded-3xl glass-card overflow-hidden hover:border-ae-green-400/40 transition-colors">
                    <div className={`h-28 bg-gradient-to-br ${gradientFor(post.category)}`} />
                    <div className="p-6">
                      <Badge variant="secondary" className="mb-3 text-[10px]">
                        {post.category}
                      </Badge>
                      <h3 className="text-base font-bold text-fg mb-2 group-hover:text-ae-green-600 dark:group-hover:text-ae-green-300 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-xs text-fg-muted mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-3 text-[10px] text-fg-subtle">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {post.publishedAt}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readingTime} min
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              </SectionTransition>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
