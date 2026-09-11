import { cn } from "@/lib/utils";

/**
 * AEPERION — Logo Component
 *
 * Renderiza el logo como SVG inline del brand.
 * Color verde: #6EC45E
 *
 * HANDOFF-FRONTEND:
 *   - Agregar hover animation (rotate o pulse sutil)
 *   - En hero: versión grande con animación de entrada
 */

interface LogoProps {
  variant?: "default" | "small" | "large";
  showText?: boolean;
  className?: string;
}

export function Logo({
  variant = "default",
  showText = true,
  className,
}: LogoProps) {
  const sizes = {
    small: { logo: 28, text: "text-lg" },
    default: { logo: 32, text: "text-xl" },
    large: { logo: 48, text: "text-2xl" },
  };

  const { logo: logoSize, text: textSize } = sizes[variant];

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      {/* Logo SVG — Aeperion Green #6EC45E */}
      <svg
        width={logoSize}
        height={logoSize}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
        aria-label="Aeperion Systems logo"
      >
        {/* Hexagonal shape */}
        <path
          d="M20 2L35 11V29L20 38L5 29V11L20 2Z"
          fill="#6EC45E"
          stroke="#5AB048"
          strokeWidth="1"
        />
        {/* Inner triangle - abstract A */}
        <path
          d="M20 10L28 28H12L20 10Z"
          fill="white"
          opacity="0.9"
        />
        {/* Accent dot */}
        <circle cx="20" cy="20" r="3" fill="#6EC45E" />
      </svg>

      {/* Text */}
      {showText && (
        <span
          className={cn(
            "font-semibold tracking-tight text-ae-gray-900",
            textSize
          )}
        >
          Aeperion
          <span className="text-ae-green-500"> Systems</span>
        </span>
      )}
    </div>
  );
}
