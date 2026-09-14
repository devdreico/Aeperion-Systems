import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * AEPERION — Logo Component
 *
 * Renderiza el logo real de Aeperion Systems.
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
      <div
        className="relative shrink-0 flex items-center justify-center"
        style={{ width: logoSize, height: logoSize }}
      >
        <Image
          src="/images/logo/logo-aeperion.png"
          alt="Aeperion Systems Logo"
          width={logoSize}
          height={logoSize}
          className="object-contain rounded-lg"
          priority
        />
      </div>

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
