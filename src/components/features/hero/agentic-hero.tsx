import { useRef } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play, Rocket, Sparkles } from "lucide-react";
import { Link } from "@/components/ui/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { SITE_CONFIG } from "@/lib/constants";

const ease = [0.16, 1, 0.3, 1] as const;

export function AgenticHero() {
  const reduceMotion = useReducedMotion() ?? false;
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Fase 1 — Logo
  const logoOpacity = useTransform(scrollYProgress, [0, 0.22, 0.32], [1, 1, 0]);
  const logoScale = useTransform(scrollYProgress, [0, 0.32], [1, 1.12]);
  const logoY = useTransform(scrollYProgress, [0, 0.32], [0, -30]);

  // Fase 2 — AE
  const aeOpacity = useTransform(scrollYProgress, [0.26, 0.36, 0.56, 0.66], [0, 1, 1, 0]);
  const aeScale = useTransform(scrollYProgress, [0.26, 0.66], [0.9, 1.08]);
  const aeY = useTransform(scrollYProgress, [0.26, 0.66], [40, -20]);

  // Fase 3 — AI + video
  const aiOpacity = useTransform(scrollYProgress, [0.6, 0.72, 1], [0, 1, 1]);
  const aiScale = useTransform(scrollYProgress, [0.6, 1], [0.9, 1]);
  const videoOpacity = useTransform(scrollYProgress, [0.62, 0.78, 1], [0, 0.55, 0.85]);
  const buttonsOpacity = useTransform(scrollYProgress, [0.82, 0.92, 1], [0, 1, 1]);
  const buttonsY = useTransform(scrollYProgress, [0.82, 0.92], [24, 0]);

  // Indicador de scroll
  const hintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  if (reduceMotion) {
    return (
      <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-surface">
        <Container className="py-24 text-center">
          <img
            src="/images/logo/logo-aeperion.png"
            alt="Aeperion Systems"
            className="mx-auto h-16 w-16"
          />
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-fg md:text-6xl">
            Flujos de trabajo agénticos que operan tu empresa.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-fg-muted md:text-lg">
            Aeperion Systems diseña, construye y opera sistemas multi-agente.
            Expertos en uso, aplicación y desarrollo de IA.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="xl">
              <Link href="/cotizacion">
                Solicitar cotización
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="glass" size="xl">
              <Link href="/kspr">Explorar KSPR</Link>
            </Button>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className="relative h-[320vh] bg-[#05070A]"
      aria-label="Hero Aeperion Systems"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Fondo base */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(110,196,94,0.12),transparent_55%),linear-gradient(180deg,#05070A_0%,#070B0A_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)]" />

        {/* Video de dron (fase final) */}
        <m.div
          style={{ opacity: videoOpacity }}
          className="absolute inset-0"
        >
          <video
            className="h-full w-full object-cover"
            src="/videos/hero-drone.mp4"
            poster="/images/logo/logo-aeperion.png"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onError={(e) => {
              (e.currentTarget as HTMLVideoElement).style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/45 to-black/75" />
        </m.div>

        {/* Capa 1 — Logo Aeperion */}
        <m.div
          style={{ opacity: logoOpacity, scale: logoScale, y: logoY }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        >
          <img
            src="/images/logo/logo-aeperion.png"
            alt="Aeperion Systems"
            className="h-16 w-16 drop-shadow-[0_0_24px_rgba(110,196,94,0.35)] md:h-20 md:w-20"
          />
          <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.3em] text-ae-green-300/80">
            Aeperion Systems
          </p>
          <h1 className="mt-3 max-w-3xl text-balance text-4xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl">
            Flujos de trabajo{" "}
            <span className="bg-gradient-to-r from-ae-green-300 via-ae-green-400 to-cyan-300 bg-clip-text text-transparent">
              agénticos
            </span>{" "}
            que operan tu empresa.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/60 md:text-lg">
            Diseñamos, construimos y operamos sistemas multi-agente. Expertos en
            uso, aplicación y desarrollo de IA.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="xl">
              <Link href="/cotizacion">
                Solicitar cotización
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="glass" size="xl">
              <Link href="/kspr">Explorar KSPR</Link>
            </Button>
          </div>
        </m.div>

        {/* Capa 2 — AE */}
        <m.div
          style={{ opacity: aeOpacity, scale: aeScale, y: aeY }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-cyan-300/80">
            Agentes en producción
          </p>
          <h2 className="mt-2 select-none text-[26vw] font-black leading-none tracking-tighter text-white/95 md:text-[22vw]">
            AE
          </h2>
          <p className="mt-2 max-w-md text-sm text-white/50 md:text-base">
            Agentes que entienden tu operación, usan herramientas y ejecutan
            con supervisión.
          </p>
        </m.div>

        {/* Capa 3 — AI + CTA */}
        <m.div
          style={{ opacity: aiOpacity, scale: aiScale }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-ae-green-300/80">
            Inteligencia aplicada
          </p>
          <h2 className="select-none bg-gradient-to-b from-white to-white/40 bg-clip-text text-[26vw] font-black leading-none tracking-tighter text-transparent md:text-[22vw]">
            AI
          </h2>
          <m.div
            style={{ opacity: buttonsOpacity, y: buttonsY }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Button asChild size="xl">
              <Link href="/cotizacion">
                Agendar asesoría
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="glass" size="xl">
              <Link href="https://kspr.presentto.online">
                <Rocket className="h-4 w-4" />
                Abrir KSPR
              </Link>
            </Button>
            <Button asChild variant="glass" size="xl">
              <a href="mailto:contacto@aesystems.com?subject=Presentación%20de%20startup%20Aeperion">
                <Play className="h-4 w-4" />
                Presentación de startup
              </a>
            </Button>
          </m.div>
          <m.p
            style={{ opacity: buttonsOpacity }}
            className="mt-6 text-xs text-white/40"
          >
            {SITE_CONFIG.city}, {SITE_CONFIG.country} · {SITE_CONFIG.tagline}
          </m.p>
        </m.div>

        {/* Indicador de scroll */}
        <m.div
          style={{ opacity: hintOpacity }}
          className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-center"
        >
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
            Desplaza
          </p>
          <div className="mx-auto mt-2 h-8 w-px bg-gradient-to-b from-white/40 to-transparent" />
          <Sparkles className="mx-auto mt-1 h-3 w-3 text-ae-green-400/60" />
        </m.div>
      </div>
    </section>
  );
}