"use client";
import { useState, useEffect, type RefObject } from "react";

interface MousePosition {
  /** Horizontal position relative to the element, in pixels. */
  x: number;
  /** Vertical position relative to the element, in pixels. */
  y: number;
  /** Whether the mouse is currently inside the element. */
  isInside: boolean;
}

/**
 * Tracks the mouse position (x, y) relative to a given ref element.
 * Useful for magnetic button effects and hover-based animations.
 *
 * @param ref - A React ref pointing to the target element.
 * @returns An object with `x`, `y`, and `isInside` state.
 */
export function useMousePosition<T extends HTMLElement = HTMLDivElement>(
  ref: RefObject<T | null>
): MousePosition {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    isInside: false,
  });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        isInside: true,
      });
    };

    const handleMouseEnter = () => {
      setPosition((prev) => ({ ...prev, isInside: true }));
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0, isInside: false });
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [ref]);

  return position;
}
