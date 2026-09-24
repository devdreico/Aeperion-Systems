"use client";

import * as React from "react";
import { m, AnimatePresence } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { FAQ_CATEGORIES, FAQ_ITEMS } from "@/lib/faq-data";

export function FAQSection() {
  const [activeCategory, setActiveCategory] = React.useState<string>("all");
  const [query, setQuery] = React.useState("");
  const [openId, setOpenId] = React.useState<string | null>(null);

  const filtered = React.useMemo(() => {
    const byCategory =
      activeCategory === "all"
        ? FAQ_ITEMS
        : FAQ_ITEMS.filter((f) => f.category === activeCategory);
    const q = query.trim().toLowerCase();
    if (!q) return byCategory;
    return byCategory.filter(
      (f) =>
        f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)
    );
  }, [activeCategory, query]);

  return (
    <div>
      <div className="relative max-w-md mx-auto mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-fg-subtle" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar una pregunta..."
          aria-label="Buscar en preguntas frecuentes"
          className="h-12 w-full rounded-full glass pl-11 pr-4 text-sm text-fg placeholder:text-fg-subtle focus:outline-none focus:ring-2 focus:ring-ae-green-400/60"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {FAQ_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              "relative px-4 py-2 rounded-full text-sm font-medium transition-colors",
              activeCategory === cat.id
                ? "text-white"
                : "glass text-fg-muted hover:text-fg"
            )}
          >
            {activeCategory === cat.id && (
              <m.span
                layoutId="faq-pill"
                className="absolute inset-0 rounded-full bg-ae-green-500"
                transition={{ type: "spring", stiffness: 320, damping: 30 }}
              />
            )}
            <span className="relative z-10">{cat.label}</span>
          </button>
        ))}
      </div>

      <m.div layout className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((item) => {
            const isOpen = openId === item.question;
            return (
              <m.div
                key={item.question}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className={cn(
                  "rounded-2xl border overflow-hidden transition-colors",
                  isOpen
                    ? "border-ae-green-400/40 glass-strong"
                    : "border-border glass-card"
                )}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : item.question)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-surface-2/50 transition-colors"
                >
                  <span className="text-sm md:text-base font-semibold text-fg pr-4">
                    {item.question}
                  </span>
                  <m.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="shrink-0"
                  >
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-colors",
                        isOpen ? "text-ae-green-500" : "text-fg-subtle"
                      )}
                    />
                  </m.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <m.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm text-fg-muted leading-relaxed">
                        {item.answer}
                      </p>
                    </m.div>
                  )}
                </AnimatePresence>
              </m.div>
            );
          })}
        </AnimatePresence>

        {filtered.length === 0 && (
          <p className="text-center text-sm text-fg-subtle py-8">
            No encontramos preguntas para “{query}”.
          </p>
        )}
      </m.div>
    </div>
  );
}
