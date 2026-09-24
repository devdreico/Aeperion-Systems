import type { Metadata } from "next";
import { ToolsGridClient } from "./tools-grid-client";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "39 Herramientas Individuales",
  description:
    "Explora nuestro catálogo completo de 39 herramientas digitales. Páginas web, automatización, CRM, facturación, POS y más.",
  path: "/herramientas",
  keywords: [
    "herramientas digitales Colombia",
    "software para negocios",
    "CRM facturación POS",
  ],
});

/**
 * AEPERION — Herramientas Page
 *
 * Catálogo completo de 39 herramientas con filtro por categoría.
 */
export default function HerramientasPage() {
  return <ToolsGridClient />;
}
