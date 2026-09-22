import { ImageResponse } from "next/og";
import { SITE_CONFIG } from "@/lib/constants";

export const alt = "Aeperion Systems — Automatización e IA para empresas";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0A0A0B 0%, #101114 55%, #12241a 100%)",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              background: "#F4F5F6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={`${SITE_CONFIG.url}/images/logo/logo-aeperion.png`}
              width={58}
              height={58}
              alt="Aeperion Systems"
              style={{ objectFit: "contain" }}
            />
          </div>
          <div style={{ display: "flex", fontSize: 40, fontWeight: 700, color: "#F4F5F6" }}>
            Aeperion
            <span style={{ color: "#6EC45E" }}>&nbsp;Systems</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 68,
              fontWeight: 800,
              lineHeight: 1.05,
              color: "#F4F5F6",
              letterSpacing: "-0.03em",
              maxWidth: 980,
            }}
          >
            <span>Automatización e IA para&nbsp;</span>
            <span style={{ color: "#6EC45E" }}>empresas que crecen</span>
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#A2A4AB", fontWeight: 300 }}>
            Software a medida · Desde 2017 · Bogotá, Colombia
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 26,
            color: "#6E7078",
          }}
        >
          <span>aesystems.com</span>
          <span style={{ color: "#6EC45E" }}>39 soluciones · 240+ clientes</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
