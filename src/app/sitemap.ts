import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import { TOOLS } from "@/lib/tools-data";
import { BLOG_POSTS } from "@/lib/blog-data";
import { PROJECTS } from "@/lib/projects-data";
import { PLANS } from "@/lib/plans-data";

const base = SITE_CONFIG.url;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    "",
    "/planes",
    "/herramientas",
    "/proyectos",
    "/metodo",
    "/about",
    "/blog",
    "/faq",
    "/contacto",
    "/asesoria",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const planRoutes = PLANS.filter((p) => p.id !== "asesoria").map((plan) => ({
    url: `${base}/planes/${plan.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const toolRoutes = TOOLS.map((tool) => ({
    url: `${base}/herramientas/${tool.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const demoRoutes = TOOLS.filter((t) => t.hasDemo).map((tool) => ({
    url: `${base}/demo/${tool.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const blogRoutes = BLOG_POSTS.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const projectRoutes = PROJECTS.map((project) => ({
    url: `${base}/proyectos/${project.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...planRoutes,
    ...toolRoutes,
    ...demoRoutes,
    ...blogRoutes,
    ...projectRoutes,
  ];
}
