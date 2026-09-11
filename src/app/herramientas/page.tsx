import type { Metadata } from "next";
import { ToolsGridClient } from "./tools-grid-client";

export const metadata: Metadata = {
  title: "39 Herramientas Individuales",
  description:
    "Explora nuestro catálogo completo de 39 herramientas digitales. Páginas web, automatización, CRM, facturación, POS y más.",
};

/**
 * AEPERION — Herramientas Page
 *
 * Catálogo completo de 39 herramientas con filtro por categoría.
 *
 * HANDOFF-FRONTEND:
 *   - ToolsGridClient: contiene toda la lógica interactiva
 *   - Agregar animaciones de filtro (transición de grilla)
 *   - Cards: hover effects, stagger reveal
 *   - Badges de categoría: animación de selección
 */
export default function HerramientasPage() {
  return <ToolsGridClient />;
}
