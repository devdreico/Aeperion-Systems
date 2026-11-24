import { useMemo, useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { m } from "framer-motion";
import { ArrowRight, Check, Clock, Mail, MessageCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Container } from "@/components/layout/container";
import { Seo } from "@/components/shared/seo";
import { PRODUCTS } from "@/lib/products-data";
import { VALUE_TIERS } from "@/lib/value-tiers-data";
import { SITE_CONFIG } from "@/lib/constants";

const PROCESS_OPTIONS = [
  "Ventas y seguimiento comercial",
  "Atención al cliente / soporte",
  "Operaciones y documentos",
  "Ingeniería inversa / sistemas legados",
  "Ciberseguridad",
  "Datos y conocimiento interno (RAG)",
  "Presencia digital administrada",
  "Otro",
];

const TIMELINE_OPTIONS = ["Inmediato", "Este trimestre", "Este año", "Explorando"];

export default function Cotizacion() {
  const [params] = useSearchParams();
  const preselectedTier = params.get("tier") ?? "";
  const preselectedProduct = params.get("product") ?? "";

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    process: PROCESS_OPTIONS[0],
    tier: preselectedTier,
    product: preselectedProduct,
    timeline: TIMELINE_OPTIONS[1],
    message: "",
  });

  const tierLabel = useMemo(
    () => VALUE_TIERS.find((t) => t.id === preselectedTier)?.name ?? "",
    [preselectedTier]
  );

  const update = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;
    const payload = {
      ...form,
      _subject: `Cotización Aeperion — ${form.company || form.name}`,
      source: "aeperion.presentto.online/cotizacion",
    };

    try {
      if (endpoint) {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error("request failed");
        setStatus("sent");
        return;
      }

      const body = [
        `Nombre: ${form.name}`,
        `Email: ${form.email}`,
        `Empresa: ${form.company}`,
        `WhatsApp: ${form.phone}`,
        `Proceso: ${form.process}`,
        `Nivel: ${form.tier || "No definido"}`,
        `Producto: ${form.product || "No definido"}`,
        `Timeline: ${form.timeline}`,
        "",
        form.message,
      ].join("\n");

      window.location.href = `mailto:${SITE_CONFIG.links.email}?subject=${encodeURIComponent(
        `Cotización Aeperion — ${form.company || form.name}`
      )}&body=${encodeURIComponent(body)}`;
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <Seo
        title="Cotización — Diseña tu siguiente mejora con IA"
        description="Cuéntanos qué proceso quieres transformar. Te respondemos con un diagnóstico inicial y una propuesta de flujo agéntico."
        path="/cotizacion"
      />

      <section className="relative overflow-hidden border-b border-border/60 bg-surface">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-ae-green-400/[0.07] blur-[140px]" />
        <Container className="relative py-16 md:py-20">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-ae-green-400/25 bg-ae-green-400/10 px-3 py-1 text-[11px] font-semibold text-ae-green-300">
              Cotización
            </span>
            <h1 className="mt-5 text-balance text-3xl font-extrabold tracking-tight text-fg md:text-5xl">
              Cuéntanos qué proceso quieres transformar.
            </h1>
            <p className="mt-4 text-base leading-relaxed text-fg-muted">
              No vendemos planes. Entendemos tu operación y cotizamos la
              siguiente mejora concreta.
              {tierLabel && (
                <>
                  {" "}
                  Nivel preseleccionado: <span className="text-ae-green-300">{tierLabel}</span>.
                </>
              )}
            </p>
          </m.div>
        </Container>
      </section>

      <section className="bg-surface py-12 md:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <form
              onSubmit={onSubmit}
              className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 backdrop-blur-md md:p-8"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-medium text-fg-muted">Nombre *</span>
                  <Input
                    required
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Tu nombre"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-medium text-fg-muted">Email *</span>
                  <Input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="tu@empresa.com"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-medium text-fg-muted">Empresa</span>
                  <Input
                    value={form.company}
                    onChange={(e) => update("company", e.target.value)}
                    placeholder="Nombre de tu empresa"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-medium text-fg-muted">WhatsApp</span>
                  <Input
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="+57 300 000 0000"
                  />
                </label>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-medium text-fg-muted">
                    Proceso a mejorar
                  </span>
                  <select
                    value={form.process}
                    onChange={(e) => update("process", e.target.value)}
                    className="h-10 w-full rounded-xl border border-border bg-surface px-3 text-sm text-fg outline-none focus:border-ae-green-400/60"
                  >
                    {PROCESS_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-medium text-fg-muted">Timeline</span>
                  <select
                    value={form.timeline}
                    onChange={(e) => update("timeline", e.target.value)}
                    className="h-10 w-full rounded-xl border border-border bg-surface px-3 text-sm text-fg outline-none focus:border-ae-green-400/60"
                  >
                    {TIMELINE_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-medium text-fg-muted">
                    Nivel de valor
                  </span>
                  <select
                    value={form.tier}
                    onChange={(e) => update("tier", e.target.value)}
                    className="h-10 w-full rounded-xl border border-border bg-surface px-3 text-sm text-fg outline-none focus:border-ae-green-400/60"
                  >
                    <option value="">No definido</option>
                    {VALUE_TIERS.map((tier) => (
                      <option key={tier.id} value={tier.id}>
                        {tier.level} · {tier.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-medium text-fg-muted">Producto</span>
                  <select
                    value={form.product}
                    onChange={(e) => update("product", e.target.value)}
                    className="h-10 w-full rounded-xl border border-border bg-surface px-3 text-sm text-fg outline-none focus:border-ae-green-400/60"
                  >
                    <option value="">No definido</option>
                    {PRODUCTS.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="mt-4 block">
                <span className="mb-1.5 block text-xs font-medium text-fg-muted">
                  Contexto del proceso
                </span>
                <textarea
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  rows={5}
                  placeholder="¿Qué proceso quieres mejorar? ¿Qué datos y sistemas intervienen? ¿Qué resultado esperas?"
                  className="w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-sm text-fg outline-none placeholder:text-fg-subtle focus:border-ae-green-400/60"
                />
              </label>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button type="submit" size="lg" disabled={status === "sending"}>
                  {status === "sending" ? "Enviando..." : "Solicitar cotización"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <p className="text-[11px] text-fg-subtle">
                  Respuesta en menos de 1 hora hábil. Sin compromiso.
                </p>
              </div>

              {status === "sent" && (
                <p className="mt-4 flex items-center gap-2 rounded-xl border border-ae-green-400/25 bg-ae-green-400/10 px-3 py-2 text-xs text-ae-green-200">
                  <Check className="h-4 w-4" />
                  Solicitud registrada. Te contactaremos con el siguiente paso.
                </p>
              )}
              {status === "error" && (
                <p className="mt-4 rounded-xl border border-red-400/25 bg-red-400/10 px-3 py-2 text-xs text-red-300">
                  No pudimos enviar el formulario. Escríbenos a{" "}
                  <a href={`mailto:${SITE_CONFIG.links.email}`} className="underline">
                    {SITE_CONFIG.links.email}
                  </a>
                  .
                </p>
              )}
            </form>

            <aside className="space-y-4">
              <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-5">
                <h2 className="text-sm font-bold text-fg">Qué pasa después</h2>
                <ol className="mt-4 space-y-3">
                  {[
                    "Revisamos tu contexto y agendamos una llamada de 30 minutos.",
                    "Identificamos el caso de uso con mayor impacto y menor riesgo.",
                    "Te enviamos una propuesta con alcance, hitos y métricas.",
                  ].map((step, i) => (
                    <li key={step} className="flex gap-3 text-xs text-fg-muted">
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-ae-green-400/25 bg-ae-green-400/10 font-mono text-[10px] text-ae-green-300">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-5">
                <h2 className="text-sm font-bold text-fg">Contacto directo</h2>
                <ul className="mt-3 space-y-2.5 text-xs text-fg-muted">
                  <li className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-ae-green-400" />
                    <a href={`mailto:${SITE_CONFIG.links.email}`} className="hover:text-fg">
                      {SITE_CONFIG.links.email}
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <MessageCircle className="h-3.5 w-3.5 text-ae-green-400" />
                    <a
                      href={SITE_CONFIG.links.whatsapp}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="hover:text-fg"
                    >
                      WhatsApp directo
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-ae-green-400" />
                    {SITE_CONFIG.contact.businessHours}
                  </li>
                </ul>
              </div>

              <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/[0.04] p-5">
                <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300">
                  <ShieldCheck className="h-4 w-4" />
                  Privacidad
                </div>
                <p className="mt-2 text-[11px] leading-relaxed text-fg-muted">
                  La información que compartes se usa solo para evaluar tu
                  solicitud. No se comparte con terceros.
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}