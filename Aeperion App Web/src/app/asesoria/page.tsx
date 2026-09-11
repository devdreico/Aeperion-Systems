import type { Metadata } from "next";
import { AsesoriaClient } from "./asesoria-client";

export const metadata: Metadata = {
  title: "Asesoría Gratuita",
  description:
    "Agenda una asesoría gratuita de 30 minutos. Respondemos 5 preguntas, analizamos tu negocio y te entregamos un reporte con oportunidades reales.",
};

/**
 * AEPERION — Asesoría Gratuita Page
 *
 * Flujo de conversión principal:
 *   1. Hero contextual
 *   2. Quiz de 5 preguntas (diagnóstico rápido)
 *   3. Resultado con recomendación de plan
 *   4. Calendario de agendamiento
 *   5. Confirmación + email
 *
 * HANDOFF-FRONTEND:
 *   - El componente AsesoriaClient contiene la lógica interactiva
 *   - Agregar transiciones suaves entre pasos del quiz
 *   - Animaciones de entrada para cada pregunta
 *   - Confetti o celebración al completar
 */
export default function AsesoriaPage() {
  return <AsesoriaClient />;
}
