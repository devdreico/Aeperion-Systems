import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_CONFIG.name,
    short_name: SITE_CONFIG.shortName,
    description: SITE_CONFIG.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0A0A0B",
    theme_color: "#6EC45E",
    lang: "es-CO",
    categories: ["business", "productivity", "utilities"],
    icons: [
      {
        src: "/images/logo/logo-aeperion.png",
        sizes: "720x722",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/logo/logo-aeperion.png",
        sizes: "720x722",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
