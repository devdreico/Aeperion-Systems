"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { NAV_LINKS, NAV_LINKS_SECONDARY } from "@/lib/constants";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/theme-toggle";

const isActivePath = (pathname: string, href: string) =>
  pathname === href || (href !== "/" && pathname.startsWith(href));

export function Nav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeMenus = () => {
    setIsOpen(false);
    setMoreOpen(false);
  };

  const secondaryActive = NAV_LINKS_SECONDARY.some((l) =>
    isActivePath(pathname, l.href)
  );

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        isScrolled ? "glass-nav py-0" : "bg-transparent py-1"
      )}
    >
      <nav className="container-ae flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="relative z-10 group" onClick={closeMenus}>
          <Logo variant="small" showText />
        </Link>

        <div className="hidden lg:flex items-center gap-0.5">
          {NAV_LINKS.map((link) => {
            const active = isActivePath(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenus}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                  active
                    ? "text-ae-green-600 dark:text-ae-green-300"
                    : "text-fg-muted hover:text-fg"
                )}
              >
                {link.label}
                {active && (
                  <m.span
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-3 right-3 h-0.5 bg-ae-green-400 rounded-full"
                    transition={{ type: "spring", stiffness: 320, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}

          <div
            ref={moreRef}
            className="relative"
            onMouseEnter={() => setMoreOpen(true)}
            onMouseLeave={() => setMoreOpen(false)}
          >
            <button
              type="button"
              aria-expanded={moreOpen}
              aria-haspopup="menu"
              className={cn(
                "flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                secondaryActive
                  ? "text-ae-green-600 dark:text-ae-green-300"
                  : "text-fg-muted hover:text-fg"
              )}
            >
              Más
              <ChevronDown
                className={cn("h-3.5 w-3.5 transition-transform", moreOpen && "rotate-180")}
              />
            </button>
            <AnimatePresence>
              {moreOpen && (
                <m.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute right-0 top-full mt-2 w-44 p-1.5 rounded-2xl glass-strong"
                  role="menu"
                >
                  {NAV_LINKS_SECONDARY.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      role="menuitem"
                      onClick={closeMenus}
                      className={cn(
                        "block px-3 py-2 text-sm rounded-xl transition-colors",
                        isActivePath(pathname, link.href)
                          ? "bg-ae-green-400/10 text-ae-green-700 dark:text-ae-green-300"
                          : "text-fg-muted hover:bg-surface-2 hover:text-fg"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </m.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <Link href="/asesoria" onClick={closeMenus}>
            <Button variant="primary" size="sm" className="group">
              Asesoría Gratuita
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </Link>
        </div>

        <div className="flex md:hidden items-center gap-1.5">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-10 p-2 rounded-lg hover:bg-surface-2 transition-colors"
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <>
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 top-16 z-30 bg-black/30 backdrop-blur-sm md:hidden"
              onClick={() => setIsOpen(false)}
            />
            <m.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="fixed right-0 top-16 bottom-0 z-40 w-[82%] max-w-sm glass-strong md:hidden overflow-y-auto"
            >
              <div className="p-5 pt-6 space-y-1">
                {[...NAV_LINKS, ...NAV_LINKS_SECONDARY].map((link, i) => {
                  const active = isActivePath(pathname, link.href);
                  return (
                    <m.div
                      key={link.href}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.04, duration: 0.3 }}
                    >
                      <Link
                        href={link.href}
                        onClick={closeMenus}
                        className={cn(
                          "block px-4 py-3 rounded-xl text-base font-medium transition-colors",
                          active
                            ? "bg-ae-green-400/10 text-ae-green-700 dark:text-ae-green-300"
                            : "text-fg-muted hover:bg-surface-2 hover:text-fg"
                        )}
                      >
                        {link.label}
                      </Link>
                    </m.div>
                  );
                })}

                <m.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="pt-4"
                >
                  <Link href="/asesoria" onClick={closeMenus}>
                    <Button variant="primary" size="lg" className="w-full">
                      Asesoría Gratuita
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </m.div>
              </div>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
