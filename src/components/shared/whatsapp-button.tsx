"use client";

import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/constants";

interface WhatsAppButtonProps {
  className?: string;
}

export function WhatsAppButton({ className }: WhatsAppButtonProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 320);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <m.div
          initial={{ opacity: 0, scale: 0.5, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 24 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className={cn("fixed bottom-6 right-6 z-40", className)}
        >
          <AnimatePresence>
            {hovered && (
              <m.span
                initial={{ opacity: 0, x: 10, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap glass-strong rounded-xl px-3.5 py-2 text-xs font-semibold text-fg shadow-lg"
              >
                {SITE_CONFIG.contact.whatsappLabel}
              </m.span>
            )}
          </AnimatePresence>

          <m.a
            href={SITE_CONFIG.links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="relative flex h-14 w-14 items-center justify-center rounded-full bg-ae-green-500 text-white shadow-lg shadow-ae-green-500/30 hover:bg-ae-green-600 transition-colors"
            aria-label="Contactar por WhatsApp"
          >
            <MessageCircle className="h-6 w-6" />
            <span className="absolute inset-0 rounded-full bg-ae-green-400 animate-ping opacity-20" />
          </m.a>
        </m.div>
      )}
    </AnimatePresence>
  );
}
