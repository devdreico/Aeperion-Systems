import { useParams } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import { Link } from "@/components/ui/link";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/layout/container";
import { Seo } from "@/components/shared/seo";
import { BLOG_POST_MAP } from "@/lib/blog-data";

export default function BlogPost() {
  const { slug } = useParams();
  const post = slug ? BLOG_POST_MAP[slug] : undefined;

  if (!post) {
    return (
      <Container className="py-24 text-center">
        <h1 className="text-3xl font-bold text-fg">Artículo no encontrado</h1>
        <Link href="/blog" className="mt-4 inline-block text-sm text-ae-green-400">
          Volver al blog
        </Link>
      </Container>
    );
  }

  return (
    <>
      <Seo
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        type="article"
      />

      <article className="bg-surface py-16 md:py-24">
        <Container className="max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-xs text-fg-muted hover:text-ae-green-300"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Volver al blog
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Badge variant="glass" className="text-[10px]">
              {post.category}
            </Badge>
            <span className="flex items-center gap-1 text-[11px] text-fg-subtle">
              <Clock className="h-3 w-3" />
              {post.readingTime} min
            </span>
            <span className="text-[11px] text-fg-subtle">{post.publishedAt}</span>
          </div>

          <h1 className="mt-4 text-balance text-3xl font-extrabold tracking-tight text-fg md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-fg-muted">{post.excerpt}</p>

          <div className="mt-6 flex items-center gap-2 text-xs text-fg-subtle">
            <span className="font-semibold text-fg">{post.author}</span>
            <span className="h-1 w-1 rounded-full bg-fg-subtle/40" />
            <span>{post.authorRole}</span>
          </div>

          <div
            className="mt-10 space-y-4 text-sm leading-relaxed text-fg-muted [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-fg [&_p]:leading-relaxed [&_strong]:text-fg"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mt-10 flex flex-wrap gap-2 border-t border-border pt-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] text-fg-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </Container>
      </article>
    </>
  );
}