"use client";
import { useState, useEffect } from "react";

interface ScrollProgress {
  /** Scroll progress from 0 to 1. */
  progress: number;
  /** Current vertical scroll position in pixels. */
  scrollY: number;
  /** Whether the user is currently scrolling upward. */
  isScrollingUp: boolean;
}

/**
 * Tracks the page's scroll progress, current scroll Y position, and scroll direction.
 *
 * @returns An object with `progress` (0-1), `scrollY`, and `isScrollingUp`.
 */
export function useScrollProgress(): ScrollProgress {
  const [state, setState] = useState<ScrollProgress>({
    progress: 0,
    scrollY: 0,
    isScrollingUp: true,
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        docHeight > 0 ? Math.min(currentScrollY / docHeight, 1) : 0;

      setState({
        progress,
        scrollY: currentScrollY,
        isScrollingUp: currentScrollY < lastScrollY,
      });

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return state;
}
