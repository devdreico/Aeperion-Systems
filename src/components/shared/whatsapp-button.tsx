"use client";

import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/constants";

interface WhatsAppButtonProps {
  className?: string;
}

export function WhatsAppButton({ className }: WhatsAppButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          href={SITE_CONFIG.links.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={cn(
            "fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-ae-green-500 text-white flex items-center justify-center shadow-lg shadow-ae-green-500/30 hover:bg-ae-green-600 transition-colors",
            className
          )}
          aria-label="Contactar por WhatsApp"
        >
          <MessageCircle className="h-6 w-6" />
          {/* Pulse ring */}
          <motion.span
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full bg-ae-green-400"
          />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
