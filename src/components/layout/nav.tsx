"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";

export function Nav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-ae-gray-100/50 shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav className="container-ae flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="relative z-10">
          <Logo variant="small" showText />
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                  isActive
                    ? "text-ae-green-600"
                    : "text-ae-gray-600 hover:text-ae-gray-900 hover:bg-ae-gray-50"
                )}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-3 right-3 h-0.5 bg-ae-green-400 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/asesoria">
            <Button variant="primary" size="sm">
              Asesoría Gratuita
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative z-10 p-2 rounded-lg hover:bg-ae-gray-100 transition-colors"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-16 z-40 bg-white md:hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="p-4 pt-6 space-y-1"
            >
              {NAV_LINKS.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "block px-4 py-3 rounded-xl text-base font-medium transition-colors",
                        isActive
                          ? "bg-ae-green-50 text-ae-green-700"
                          : "text-ae-gray-700 hover:bg-ae-gray-50"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="pt-4"
              >
                <Link href="/asesoria">
                  <Button variant="primary" size="xl" className="w-full">
                    Asesoría Gratuita
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
