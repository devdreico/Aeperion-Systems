import type { MetadataRoute } from "next";
import { TOOLS } from "@/lib/tools-data";
import { BLOG_POSTS } from "@/lib/blog-data";
import { PROJECTS } from "@/lib/projects-data";
import { PLANS } from "@/lib/plans-data";
import { absoluteUrl } from "@/lib/seo";

function entry(
  path: string,
  opts: {
    lastModified?: Date;
    changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
    priority?: number;
  } = {}
): MetadataRoute.Sitemap[number] {
  const url = absoluteUrl(path);
  return {
    url,
    lastModified: opts.lastModified ?? new Date(),
    changeFrequency: opts.changeFrequency ?? "monthly",
    priority: opts.priority ?? 0.5,
    alternates: {
      languages: {
        "es-CO": url,
        "x-default": url,
      },
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    entry("/", { changeFrequency: "weekly", priority: 1 }),
    entry("/planes", { changeFrequency: "weekly", priority: 0.9 }),
    entry("/herramientas", { changeFrequency: "weekly", priority: 0.9 }),
    entry("/proyectos", { changeFrequency: "weekly", priority: 0.8 }),
    entry("/metodo", { changeFrequency: "monthly", priority: 0.7 }),
    entry("/about", { changeFrequency: "monthly", priority: 0.7 }),
    entry("/blog", { changeFrequency: "weekly", priority: 0.8 }),
    entry("/faq", { changeFrequency: "monthly", priority: 0.7 }),
    entry("/contacto", { changeFrequency: "monthly", priority: 0.8 }),
    entry("/asesoria", { changeFrequency: "monthly", priority: 0.9 }),
  ];

  const planRoutes: MetadataRoute.Sitemap = PLANS.filter(
    (p) => p.id !== "asesoria"
  ).map((plan) =>
    entry(`/planes/${plan.id}`, {
      changeFrequency: "monthly",
      priority: 0.9,
    })
  );

  const toolRoutes: MetadataRoute.Sitemap = TOOLS.map((tool) =>
    entry(`/herramientas/${tool.id}`, {
      changeFrequency: "monthly",
      priority: 0.7,
    })
  );

  const demoRoutes: MetadataRoute.Sitemap = TOOLS.filter((t) => t.hasDemo).map(
    (tool) =>
      entry(`/demo/${tool.id}`, {
        changeFrequency: "monthly",
        priority: 0.5,
      })
  );

  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) =>
    entry(`/blog/${post.slug}`, {
      lastModified: new Date(post.publishedAtISO),
      changeFrequency: "monthly",
      priority: 0.8,
    })
  );

  const projectRoutes: MetadataRoute.Sitemap = PROJECTS.map((project) =>
    entry(`/proyectos/${project.slug}`, {
      lastModified: new Date(project.year, 0, 1),
      changeFrequency: "yearly",
      priority: 0.7,
    })
  );

  return [
    ...staticRoutes,
    ...planRoutes,
    ...toolRoutes,
    ...demoRoutes,
    ...blogRoutes,
    ...projectRoutes,
  ];
}
