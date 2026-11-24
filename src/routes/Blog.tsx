import { m } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { Link } from "@/components/ui/link";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/layout/container";
import { Seo } from "@/components/shared/seo";
import { AgenticCTA } from "@/components/features/trust/agentic-cta";
import { BLOG_POSTS } from "@/lib/blog-data";

export default function Blog() {
  return (
    <>
      <Seo
        title="Blog — Notas de IA y flujos agénticos"
        description="Notas técnicas sobre agentes, ingeniería inversa, ciberseguridad y operación de IA en producción."
        path="/blog"
      />

      <section className="border-b border-border/60 bg-surface">
        <Container className="py-16 md:py-24">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-ae-green-400/25 bg-ae-green-400/10 px-3 py-1 text-[11px] font-semibold text-ae-green-300">
              Blog
            </span>
            <h1 className="mt-5 text-balance text-4xl font-extrabold tracking-tight text-fg md:text-5xl">
              Notas de IA y flujos agénticos.
            </h1>
            <p className="mt-4 text-base leading-relaxed text-fg-muted">
              Lo que aprendemos construyendo agentes en producción. Sin humo.
            </p>
          </m.div>
        </Container>
      </section>

      <section className="bg-surface py-12 md:py-16">
        <Container>
          <div className="grid gap-4 md:grid-cols-2">
            {BLOG_POSTS.map((post, i) => (
              <m.article
                key={post.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.025] p-6 transition-colors hover:border-ae-green-400/30"
                >
                  <div className="flex items-center gap-2">
                    <Badge variant="glass" className="text-[10px]">
                      {post.category}
                    </Badge>
                    <span className="flex items-center gap-1 text-[10px] text-fg-subtle">
                      <Clock className="h-3 w-3" />
                      {post.readingTime} min
                    </span>
                  </div>
                  <h2 className="mt-4 text-lg font-bold leading-snug text-fg group-hover:text-ae-green-300">
                    {post.title}
                  </h2>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-fg-muted">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-5 text-[11px] text-fg-subtle">
                    <span>{post.publishedAt}</span>
                    <span className="inline-flex items-center gap-1 font-semibold text-ae-green-400">
                      Leer
                      <ArrowUpRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              </m.article>
            ))}
          </div>
        </Container>
      </section>

      <AgenticCTA />
    </>
  );
}