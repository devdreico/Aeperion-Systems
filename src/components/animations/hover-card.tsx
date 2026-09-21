"use client";

import { useRef, useState, type ReactNode } from "react";
import { m, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/** @description 3D tilt effect on hover with optional glare overlay */
interface HoverCardProps {
  children: ReactNode;
  className?: string;
  tiltDegree?: number;
  glare?: boolean;
  glareColor?: string;
  scale?: number;
}

export function HoverCard({
  children,
  className,
  tiltDegree = 8,
  glare = true,
  glareColor = "rgba(110, 196, 94, 0.1)",
  scale = 1.02,
}: HoverCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glareX, setGlareX] = useState(50);
  const [glareY, setGlareY] = useState(50);
  const [isHovered, setIsHovered] = useState(false);

  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const rotX = (-mouseY / (rect.height / 2)) * tiltDegree;
    const rotY = (mouseX / (rect.width / 2)) * tiltDegree;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlareX(50 + (mouseX / (rect.width / 2)) * 30);
    setGlareY(50 + (mouseY / (rect.height / 2)) * 30);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setGlareX(50);
    setGlareY(50);
  };

  return (
    <m.div
      ref={ref}
      className={cn("relative perspective-[1000px]", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX,
        rotateY,
        scale: isHovered ? scale : 1,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      {children}
      {glare && isHovered && (
        <div
          className="absolute inset-0 rounded-[inherit] pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, ${glareColor} 0%, transparent 60%)`,
          }}
        />
      )}
    </m.div>
  );
}
