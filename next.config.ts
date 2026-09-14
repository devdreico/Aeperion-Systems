import type { NextConfig } from "next";

const isVercel = process.env.VERCEL === "1" || !!process.env.VERCEL;
const isStaticExport = process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  ...(isStaticExport ? { output: "export", assetPrefix: "./" } : {}),
  trailingSlash: true,

  // Images must be unoptimized for static export
  images: {
    unoptimized: true,
  },

  // Strict mode for development
  reactStrictMode: true,
};

export default nextConfig;
