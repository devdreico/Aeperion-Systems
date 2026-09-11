import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // === Static Export Configuration ===
  // Genera HTML estático en /out/ con rutas relativas
  // para soporte file:// y servidores estáticos
  output: "export",
  assetPrefix: "./",
  trailingSlash: true,

  // Images must be unoptimized for static export
  images: {
    unoptimized: true,
  },

  // Strict mode for development
  reactStrictMode: true,
};

export default nextConfig;
