"use client";

import { useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface Particle3D {
  x: number;
  y: number;
  z: number;
  origX: number;
  origY: number;
  origZ: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  pulsePhase: number;
}

interface ParticleSystemProps {
  count?: number;
  color?: string;
  speed?: number;
  className?: string;
  interactive?: boolean;
  maxDistance?: number;
}

export function ParticleSystem({
  count = 60,
  color = "#6EC45E",
  speed = 0.4,
  className,
  interactive = true,
  maxDistance = 140,
}: ParticleSystemProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle3D[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const animFrameRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  const initParticles = useCallback((width: number, height: number, particleCount: number) => {
    return Array.from({ length: particleCount }, () => {
      const x = (Math.random() - 0.5) * width * 0.9;
      const y = (Math.random() - 0.5) * height * 0.9;
      const z = (Math.random() - 0.5) * 400;
      return {
        x,
        y,
        z,
        origX: x,
        origY: y,
        origZ: z,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        vz: (Math.random() - 0.5) * speed,
        size: Math.random() * 2 + 1,
        pulsePhase: Math.random() * Math.PI * 2,
      };
    });
  }, [speed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      width = rect.width || window.innerWidth;
      height = rect.height || window.innerHeight;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = "100%";
      canvas.style.height = "100%";

      const responsiveCount = width < 768 ? Math.floor(count * 0.6) : count;
      particlesRef.current = initParticles(width, height, responsiveCount);
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - width / 2;
      const y = e.clientY - rect.top - height / 2;
      mouseRef.current.targetX = x * 0.15;
      mouseRef.current.targetY = y * 0.15;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
    };

    if (interactive) {
      window.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("mouseleave", handleMouseLeave);
    }

    const animate = () => {
      timeRef.current += 0.008;
      const t = timeRef.current;

      // Smooth mouse interpolation (lerp)
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // 3D Camera Rotation angles based on time and mouse
      const angleX = mouseRef.current.y * 0.002 + Math.sin(t * 0.5) * 0.15;
      const angleY = mouseRef.current.x * 0.002 + t * 0.2;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      const particles = particlesRef.current;
      const projected: { x: number; y: number; z: number; size: number; alpha: number; p: Particle3D }[] = [];

      // Update and 3D project particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        // Bounce bounds in 3D
        if (Math.abs(p.x) > width * 0.6) p.vx *= -1;
        if (Math.abs(p.y) > height * 0.6) p.vy *= -1;
        if (Math.abs(p.z) > 300) p.vz *= -1;

        // 3D Rotation around Y axis
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.z * cosY + p.x * sinY;

        // 3D Rotation around X axis
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + p.y * sinX;

        // Perspective projection
        const fov = 400;
        const scale = fov / (fov + z2 + 200);
        const projX = width / 2 + x1 * scale;
        const projY = height / 2 + y2 * scale;

        const alpha = Math.min(1, Math.max(0.1, (z2 + 300) / 600));
        const pulse = Math.sin(t * 3 + p.pulsePhase) * 0.5 + 0.5;

        projected.push({
          x: projX,
          y: projY,
          z: z2,
          size: Math.max(0.5, p.size * scale * (1 + pulse * 0.3)),
          alpha,
          p,
        });
      });

      // Draw connection lines between close projected particles
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * Math.min(p1.alpha, p2.alpha) * 0.4;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = color;
            ctx.globalAlpha = lineAlpha;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw particles with glowing nodes
      projected.forEach(({ x, y, size, alpha }) => {
        ctx.beginPath();
        ctx.arc(x, y, size * 1.8, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = alpha * 0.3;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = alpha;
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
      if (interactive) {
        window.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [count, color, speed, interactive, maxDistance, initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 w-full h-full pointer-events-none z-0", className)}
      aria-hidden="true"
    />
  );
}
