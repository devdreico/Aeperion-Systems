"use client";
import { useState, useEffect } from "react";

/**
 * Listens to a CSS media query string and returns whether it matches.
 *
 * @param query - A CSS media query string (e.g. "(min-width: 768px)").
 * @returns `true` if the document matches the query, `false` otherwise.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);
    const listener = (event: MediaQueryListEvent) => setMatches(event.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}
