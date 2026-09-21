import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * AEPERION — Logo Lockup
 *
 * Mark: raster oficial (negro, fondo transparente).
 * En tema oscuro se invierte a blanco vía CSS para mantener contraste.
 * Lockup horizontal con wordmark Montserrat.
 */

interface LogoProps {
  variant?: "small" | "default" | "large";
  showText?: boolean;
  className?: string;
  textClassName?: string;
  /** Fuerza el mark en blanco (para fondos oscuros fijos, ej. footer/CTA) */
  onDark?: boolean;
}

const SIZES = {
  small: { mark: 30, text: "text-base", gap: "gap-2" },
  default: { mark: 38, text: "text-xl", gap: "gap-2.5" },
  large: { mark: 56, text: "text-3xl", gap: "gap-3.5" },
} as const;

export function Logo({
  variant = "default",
  showText = true,
  className,
  textClassName,
  onDark = false,
}: LogoProps) {
  const { mark, text, gap } = SIZES[variant];

  return (
    <span className={cn("inline-flex items-center", gap, className)}>
      <span
        className={cn(
          "relative shrink-0 flex items-center justify-center",
          "transition-transform duration-300 group-hover:scale-105"
        )}
        style={{ width: mark, height: mark }}
      >
        <span
          aria-hidden
          className="absolute inset-0 rounded-full bg-ae-green-400/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
        <Image
          src="/images/logo/logo-aeperion.png"
          alt="Aeperion Systems"
          width={mark}
          height={mark}
          className={cn(
            "relative object-contain select-none",
            onDark ? "invert" : "dark:invert"
          )}
          priority
        />
      </span>

      {showText && (
        <span
          className={cn(
            "font-bold tracking-tight leading-none whitespace-nowrap",
            onDark ? "text-white" : "text-fg",
            text,
            textClassName
          )}
        >
          Aeperion
          <span className={onDark ? "text-ae-green-300" : "text-ae-green-500"}>
            {" "}
            Systems
          </span>
        </span>
      )}
    </span>
  );
}
