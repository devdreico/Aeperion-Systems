import type { NextConfig } from "next";

const isVercel = process.env.VERCEL === "1" || !!process.env.VERCEL;
const isStaticExport = process.env.STATIC_EXPORT === "true" || (!isVercel && process.env.NODE_ENV === "production");
const basePath = process.env.BASE_PATH !== undefined ? process.env.BASE_PATH : (isStaticExport ? "/Aeperion-Systems" : "");

const nextConfig: NextConfig = {
  ...(isStaticExport ? { output: "export" } : {}),
  basePath: isVercel ? "" : basePath,
  assetPrefix: isVercel ? "" : basePath,
  trailingSlash: true,

  // Images must be unoptimized for static export
  images: {
    unoptimized: true,
  },

  // Strict mode for development
  reactStrictMode: true,
};

export default nextConfig;
