import type { Metadata } from "next";
import { PricingSection } from "@/components/features/pricing/pricing-section";

export const metadata: Metadata = {
  title: "Planes de Ejecución",
  description:
    "Elige el plan ideal para tu negocio: Standart ($200K), Fullpack ($450K) o Syspack ($1M). Todos incluyen asesoría gratuita.",
};

/**
 * AEPERION — Planes Page
 *
 * Muestra todos los planes en grid + tabla comparativa.
 *
 * HANDOFF-FRONTEND:
 *   - PricingSection: mismas animaciones que en landing
 *   - FULL PAGE: agregar padding extra para scroll reveal desde el hero
 */
export default function PlanesPage() {
  return (
    <div className="pt-20">
      {/* HANDOFF-FRONTEND: Hero interno con fade-in */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-white to-ae-gray-50">
        <div className="container-ae text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-ae-gray-900 tracking-tight">
            Planes de Ejecución
          </h1>
          <p className="mt-4 text-lg text-ae-gray-500 max-w-2xl mx-auto">
            Desde el primer paso digital hasta un sistema empresarial completo.
            Cada plan está diseñado para un nivel de crecimiento diferente.
          </p>
        </div>
      </section>

      <PricingSection />

      {/* Comparison Table */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-ae">
          <h2 className="text-2xl md:text-3xl font-bold text-ae-gray-900 text-center mb-12">
            Comparativa completa
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-ae-gray-200">
                  <th className="text-left py-4 pr-8 font-semibold text-ae-gray-900">Característica</th>
                  <th className="text-center py-4 px-4 font-semibold text-ae-gray-600">Standart</th>
                  <th className="text-center py-4 px-4 font-semibold text-ae-green-600 bg-ae-green-50/50">Fullpack</th>
                  <th className="text-center py-4 px-4 font-semibold text-ae-gray-900">Syspack</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { f: "Páginas web", s: "1 página", f_: "5 páginas", sy: "10+ / app" },
                  { f: "WhatsApp Automation", s: "Básico", f_: "Completo", sy: "Avanzado + API" },
                  { f: "CRM", s: "—", f_: "Básico", sy: "Completo + POS" },
                  { f: "Facturación electrónica", s: "—", f_: "✓", sy: "✓ + Contabilidad" },
                  { f: "Herramientas incluidas", s: "1", f_: "3", sy: "10" },
                  { f: "Capacitación", s: "—", f_: "Equipo", sy: "Completa" },
                  { f: "Soporte", s: "1 mes", f_: "3 meses", sy: "6 meses + mtto" },
                  { f: "Dashboard KPIs", s: "—", f_: "—", sy: "✓" },
                  { f: "Redes sociales", s: "—", f_: "—", sy: "✓" },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-ae-gray-100 hover:bg-ae-gray-50 transition-colors">
                    <td className="py-3 pr-8 text-ae-gray-700">{row.f}</td>
                    <td className="text-center py-3 px-4 text-ae-gray-500">{row.s}</td>
                    <td className="text-center py-3 px-4 text-ae-green-700 bg-ae-green-50/30 font-medium">{row.f_}</td>
                    <td className="text-center py-3 px-4 text-ae-gray-700">{row.sy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
