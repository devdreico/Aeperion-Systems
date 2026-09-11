"use client";

import { cn } from "@/lib/utils";

/** @description Subtle SVG noise overlay texture for grain effect */
interface NoiseTextureProps {
  opacity?: number;
  className?: string;
}

export function NoiseTexture({ opacity = 0.03, className }: NoiseTextureProps) {
  return (
    <div
      className={cn("absolute inset-0 pointer-events-none overflow-hidden", className)}
      aria-hidden="true"
    >
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <filter id="ae-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#ae-noise)" opacity={opacity} />
      </svg>
    </div>
  );
}
