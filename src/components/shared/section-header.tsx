import { cn } from "@/lib/utils";

/**
 * AEPERION — Section Header Component
 *
 * Título + descripción + badge opcional para secciones.
 *
 * HANDOFF-FRONTEND:
 *   - badge: animar entrada con scale
 *   - title: usar <TextReveal> para animación letra por letra
 *   - description: fade-in con delay después del título
 *   - Alinear al centro (center) o izquierda (left) según diseño
 */

interface SectionHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}

export function SectionHeader({
  badge,
  title,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "max-w-2xl mb-12 md:mb-16",
        align === "center" && "mx-auto text-center",
        align === "left" && "text-left",
        className
      )}
    >
      {badge && (
        <span className="inline-block mb-4 px-3 py-1 text-xs font-semibold rounded-full bg-ae-green-50 text-ae-green-700 border border-ae-green-200">
          {badge}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-ae-gray-900 tracking-tight text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base md:text-lg text-ae-gray-500 leading-relaxed mx-auto max-w-xl">
          {description}
        </p>
      )}
    </div>
  );
}
