import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BLOG_POSTS } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Artículos sobre transformación digital, automatización, CRM, facturación electrónica y más para tu negocio.",
};

/**
 * AEPERION — Blog Page
 *
 * HANDOFF-FRONTEND:
 *   - Cards: stagger reveal con Framer Motion
 *   - Featured post: hero reveal animation
 *   - Reading time badges: subtle hover effect
 *   - Category badges: color-coding by category
 */

export default function BlogPage() {
  const featured = BLOG_POSTS[0];
  const rest = BLOG_POSTS.slice(1);

  return (
    <div className="pt-20">
      <Section variant="default" size="lg">
        <Container>
          <div className="text-center mb-12">
            {/* HANDOFF-FRONTEND: Animar headline con fade-in-up */}
            <h1 className="text-4xl md:text-5xl font-bold text-ae-gray-900 tracking-tight mb-4">
              Blog
            </h1>
            <p className="text-lg text-ae-gray-500 max-w-xl mx-auto">
              Artículos, guías y recursos sobre transformación digital, automatización y herramientas para tu negocio.
            </p>
          </div>

          {/* HANDOFF-FRONTEND: Featured post — animar con fade-in + slide-up */}
          <Link href={`/blog/${featured.slug}`}>
            <div className="group relative overflow-hidden rounded-2xl border border-ae-gray-200 bg-gradient-to-br from-ae-gray-50 to-white p-8 mb-12 transition-all duration-300">
              {/* HANDOFF-FRONTEND: Agregar hover glow effect con Framer Motion, background parallax sutil */}
              <Badge variant="default" className="mb-4">{featured.category}</Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-ae-gray-900 mb-3 group-hover:text-ae-green-600 transition-colors">
                {featured.title}
              </h2>
              <p className="text-ae-gray-500 mb-4 max-w-2xl">{featured.excerpt}</p>
              <div className="flex items-center gap-4 text-xs text-ae-gray-400">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {featured.publishedAt}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {featured.readingTime} min
                </span>
              </div>
            </div>
          </Link>

          {/* HANDOFF-FRONTEND: Posts grid — animar con StaggerReveal */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                {/* HANDOFF-FRONTEND: Wrap en motion.div con stagger index delay */}
                <Card className="group h-full border-ae-gray-100 hover:border-ae-green-200 hover:shadow-md transition-all duration-300">
                  <CardContent className="p-6">
                    <Badge variant="secondary" className="mb-3 text-[10px]">
                      {post.category}
                    </Badge>
                    <h3 className="text-base font-semibold text-ae-gray-900 mb-2 group-hover:text-ae-green-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-xs text-ae-gray-500 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-3 text-[10px] text-ae-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {post.publishedAt}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readingTime} min
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
