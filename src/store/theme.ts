import { create } from "zustand";

type Theme = "light" | "dark" | "system";

interface ThemeState {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (t: Theme) => void;
}

function systemPrefersDark() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function resolve(theme: Theme): "light" | "dark" {
  if (theme === "system") return systemPrefersDark() ? "dark" : "light";
  return theme;
}

const initial: Theme = (typeof localStorage !== "undefined" && (localStorage.getItem("theme") as Theme)) || "system";

export const useThemeStore = create<ThemeState>((set) => ({
  theme: initial,
  resolvedTheme: resolve(initial),
  setTheme: (t) => {
    localStorage.setItem("theme", t);
    const r = resolve(t);
    document.documentElement.classList.toggle("dark", r === "dark");
    set({ theme: t, resolvedTheme: r });
  },
}));

// apply on load
if (typeof document !== "undefined") {
  document.documentElement.classList.toggle("dark", resolve(initial) === "dark");
}