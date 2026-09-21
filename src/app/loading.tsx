"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface mesh-bg">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative mb-8"
      >
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.35, 0.1, 0.35] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full bg-ae-green-400/25 blur-2xl"
        />
        <svg width="64" height="64" viewBox="0 0 100 100" className="relative">
          <motion.path
            d="M50 5 L90 27.5 L90 72.5 L50 95 L10 72.5 L10 27.5 Z"
            fill="none"
            stroke="#6EC45E"
            strokeWidth="4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.text
            x="50"
            y="62"
            textAnchor="middle"
            fill="#6EC45E"
            fontSize="40"
            fontWeight="bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            A
          </motion.text>
        </svg>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-sm text-fg-muted mb-6"
      >
        Cargando...
      </motion.p>

      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="h-2 w-2 rounded-full bg-ae-green-400"
            animate={{ y: [0, -8, 0], opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <Container className="mt-16">
        <div className="space-y-4 max-w-2xl mx-auto">
          <div className="h-8 shimmer rounded-lg w-3/4 mx-auto" />
          <div className="h-4 shimmer rounded w-1/2 mx-auto" />
          <div className="grid grid-cols-3 gap-4 mt-8">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="h-32 shimmer rounded-2xl"
              />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
