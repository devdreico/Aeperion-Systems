"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { cn } from "@/lib/utils";

export type HeroTheme = "light" | "dark";

interface CommandCenter3DProps {
  className?: string;
  theme?: HeroTheme;
  reducedMotion?: boolean;
  onReady?: () => void;
  onFail?: () => void;
}

/* ============================================================
   PALETTE
   ============================================================ */
interface Palette {
  card: string;
  cardEdge: string;
  text: string;
  muted: string;
  green: string;
  greenSoft: string;
  chip: string;
  grid: string;
  shadow: string;
}

function getPalette(theme: HeroTheme): Palette {
  if (theme === "dark") {
    return {
      card: "rgba(15,17,21,0.92)",
      cardEdge: "rgba(110,196,94,0.38)",
      text: "#F4F5F6",
      muted: "#9BA0A8",
      green: "#6EC45E",
      greenSoft: "rgba(110,196,94,0.16)",
      chip: "rgba(255,255,255,0.06)",
      grid: "rgba(255,255,255,0.07)",
      shadow: "rgba(0,0,0,0.5)",
    };
  }
  return {
    card: "rgba(255,255,255,0.94)",
    cardEdge: "rgba(52,112,38,0.4)",
    text: "#0A0A0B",
    muted: "#5A5A60",
    green: "#347026",
    greenSoft: "rgba(110,196,94,0.18)",
    chip: "rgba(10,10,11,0.05)",
    grid: "rgba(10,10,11,0.07)",
    shadow: "rgba(0,0,0,0.14)",
  };
}

/* ============================================================
   CANVAS HELPERS
   ============================================================ */
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

function makeTexture(
  w: number,
  h: number,
  draw: (ctx: CanvasRenderingContext2D, w: number, h: number, p: Palette) => void,
  p: Palette,
  anisotropy: number
): THREE.CanvasTexture {
  const scale = 2;
  const canvas = document.createElement("canvas");
  canvas.width = w * scale;
  canvas.height = h * scale;
  const ctx = canvas.getContext("2d")!;
  ctx.scale(scale, scale);
  draw(ctx, w, h, p);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = anisotropy;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}

/* ============================================================
   PANEL DRAWING
   ============================================================ */
function drawKpiPanel(ctx: CanvasRenderingContext2D, w: number, h: number, p: Palette) {
  roundRect(ctx, 0, 0, w, h, 26);
  ctx.fillStyle = p.card;
  ctx.fill();
  ctx.strokeStyle = p.cardEdge;
  ctx.lineWidth = 2;
  ctx.stroke();

  const pad = w * 0.045;
  // Header
  ctx.fillStyle = p.green;
  ctx.beginPath();
  ctx.arc(pad + 7, pad + 10, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.font = `600 ${h * 0.058}px Montserrat, system-ui, sans-serif`;
  ctx.fillStyle = p.text;
  ctx.textBaseline = "middle";
  ctx.fillText("Aeperion · Panel de operación", pad + 24, pad + 11);

  ctx.font = `600 ${h * 0.048}px Montserrat, system-ui, sans-serif`;
  ctx.fillStyle = p.green;
  ctx.textAlign = "right";
  ctx.fillText("● EN VIVO", w - pad, pad + 11);
  ctx.textAlign = "left";

  // Divider
  ctx.strokeStyle = p.grid;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(pad, pad + 30);
  ctx.lineTo(w - pad, pad + 30);
  ctx.stroke();

  // KPI tiles
  const kpis = [
    { label: "Ingresos", value: "$48.2M", delta: "+18%" },
    { label: "Automatizaciones", value: "1.284", delta: "+7%" },
    { label: "Horas ahorradas", value: "312h", delta: "+24%" },
  ];
  const tileGap = pad * 0.7;
  const tileW = (w - pad * 2 - tileGap * 2) / 3;
  const tileY = pad + 44;
  const tileH = h * 0.34;
  kpis.forEach((k, i) => {
    const x = pad + i * (tileW + tileGap);
    roundRect(ctx, x, tileY, tileW, tileH, 16);
    ctx.fillStyle = p.chip;
    ctx.fill();
    ctx.strokeStyle = p.grid;
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.font = `500 ${h * 0.042}px Montserrat, system-ui, sans-serif`;
    ctx.fillStyle = p.muted;
    ctx.fillText(k.label, x + 14, tileY + 22);

    ctx.font = `700 ${h * 0.085}px Montserrat, system-ui, sans-serif`;
    ctx.fillStyle = p.text;
    ctx.fillText(k.value, x + 14, tileY + 22 + h * 0.095);

    ctx.font = `600 ${h * 0.04}px Montserrat, system-ui, sans-serif`;
    ctx.fillStyle = p.green;
    ctx.fillText(k.delta, x + 14, tileY + tileH - 16);
  });

  // Sparkline
  const chartY = tileY + tileH + h * 0.06;
  const chartH = h - chartY - pad;
  const chartW = w - pad * 2;
  const pts = [0.2, 0.35, 0.28, 0.5, 0.42, 0.68, 0.6, 0.82, 0.74, 0.95];
  const grad = ctx.createLinearGradient(pad, chartY, pad, chartY + chartH);
  grad.addColorStop(0, "rgba(110,196,94,0.35)");
  grad.addColorStop(1, "rgba(110,196,94,0)");
  ctx.beginPath();
  pts.forEach((v, i) => {
    const x = pad + (i / (pts.length - 1)) * chartW;
    const y = chartY + chartH - v * chartH;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.lineTo(pad + chartW, chartY + chartH);
  ctx.lineTo(pad, chartY + chartH);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  ctx.beginPath();
  pts.forEach((v, i) => {
    const x = pad + (i / (pts.length - 1)) * chartW;
    const y = chartY + chartH - v * chartH;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.strokeStyle = p.green;
  ctx.lineWidth = 3;
  ctx.lineJoin = "round";
  ctx.stroke();
}

function drawBarPanel(ctx: CanvasRenderingContext2D, w: number, h: number, p: Palette) {
  roundRect(ctx, 0, 0, w, h, 22);
  ctx.fillStyle = p.card;
  ctx.fill();
  ctx.strokeStyle = p.cardEdge;
  ctx.lineWidth = 2;
  ctx.stroke();

  const pad = w * 0.06;
  ctx.font = `700 ${h * 0.075}px Montserrat, system-ui, sans-serif`;
  ctx.fillStyle = p.text;
  ctx.textBaseline = "middle";
  ctx.fillText("Ventas por canal", pad, pad + 6);
  ctx.font = `500 ${h * 0.05}px Montserrat, system-ui, sans-serif`;
  ctx.fillStyle = p.muted;
  ctx.fillText("Últimos 7 días", pad, pad + 6 + h * 0.085);

  const bars = [0.45, 0.7, 0.5, 0.9, 0.62, 0.98, 0.78];
  const labels = ["L", "M", "X", "J", "V", "S", "D"];
  const areaTop = h * 0.36;
  const areaH = h * 0.44;
  const areaW = w - pad * 2;
  const gap = areaW * 0.02;
  const bw = (areaW - gap * (bars.length - 1)) / bars.length;

  // grid lines
  ctx.strokeStyle = p.grid;
  ctx.lineWidth = 1;
  for (let g = 0; g <= 3; g++) {
    const y = areaTop + (g / 3) * areaH;
    ctx.beginPath();
    ctx.moveTo(pad, y);
    ctx.lineTo(w - pad, y);
    ctx.stroke();
  }

  bars.forEach((v, i) => {
    const x = pad + i * (bw + gap);
    const bh = v * areaH;
    const y = areaTop + areaH - bh;
    const g = ctx.createLinearGradient(0, y, 0, areaTop + areaH);
    g.addColorStop(0, p.green);
    g.addColorStop(1, "rgba(110,196,94,0.25)");
    roundRect(ctx, x, y, bw, bh, bw * 0.28);
    ctx.fillStyle = g;
    ctx.fill();

    ctx.font = `600 ${h * 0.05}px Montserrat, system-ui, sans-serif`;
    ctx.fillStyle = p.muted;
    ctx.textAlign = "center";
    ctx.fillText(labels[i], x + bw / 2, h - pad * 0.4);
  });
  ctx.textAlign = "left";
}

function drawChatPanel(ctx: CanvasRenderingContext2D, w: number, h: number, p: Palette) {
  roundRect(ctx, 0, 0, w, h, 22);
  ctx.fillStyle = p.card;
  ctx.fill();
  ctx.strokeStyle = p.cardEdge;
  ctx.lineWidth = 2;
  ctx.stroke();

  const pad = w * 0.06;
  ctx.textBaseline = "middle";
  ctx.fillStyle = p.green;
  ctx.beginPath();
  ctx.arc(pad + 6, pad + 8, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.font = `700 ${h * 0.078}px Montserrat, system-ui, sans-serif`;
  ctx.fillStyle = p.text;
  ctx.fillText("Asistente IA", pad + 20, pad + 9);

  const bubble = (
    x: number,
    y: number,
    bw: number,
    bh: number,
    fill: string,
    text: string,
    align: "left" | "right"
  ) => {
    roundRect(ctx, x, y, bw, bh, 12);
    ctx.fillStyle = fill;
    ctx.fill();
    ctx.font = `500 ${h * 0.052}px Montserrat, system-ui, sans-serif`;
    ctx.fillStyle = align === "right" ? p.text : p.muted;
    ctx.textAlign = "left";
    ctx.fillText(text, x + 12, y + bh / 2);
  };

  bubble(pad, h * 0.34, w * 0.6, h * 0.16, p.chip, "¿Cuánto vendimos hoy?", "right");
  bubble(w - pad - w * 0.72, h * 0.55, w * 0.72, h * 0.16, p.greenSoft, "$2.4M · +8% vs ayer", "left");

  // typing dots
  const ty = h * 0.83;
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.arc(pad + 8 + i * 16, ty, 4, 0, Math.PI * 2);
    ctx.fillStyle = p.green;
    ctx.globalAlpha = 0.35 + i * 0.2;
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function drawFlowPanel(ctx: CanvasRenderingContext2D, w: number, h: number, p: Palette) {
  roundRect(ctx, 0, 0, w, h, 22);
  ctx.fillStyle = p.card;
  ctx.fill();
  ctx.strokeStyle = p.cardEdge;
  ctx.lineWidth = 2;
  ctx.stroke();

  const pad = w * 0.06;
  ctx.textBaseline = "middle";
  ctx.font = `700 ${h * 0.075}px Montserrat, system-ui, sans-serif`;
  ctx.fillStyle = p.text;
  ctx.fillText("Automatización activa", pad, pad + 6);

  const nodes = ["WhatsApp", "CRM", "Factura", "Pago"];
  const ny = h * 0.46;
  const nh = h * 0.2;
  const gap = w * 0.035;
  const nw = (w - pad * 2 - gap * (nodes.length - 1)) / nodes.length;

  nodes.forEach((n, i) => {
    const x = pad + i * (nw + gap);
    roundRect(ctx, x, ny, nw, nh, 10);
    ctx.fillStyle = p.chip;
    ctx.fill();
    ctx.strokeStyle = p.cardEdge;
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = p.green;
    ctx.beginPath();
    ctx.arc(x + 11, ny + nh / 2, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.font = `600 ${h * 0.05}px Montserrat, system-ui, sans-serif`;
    ctx.fillStyle = p.text;
    ctx.textAlign = "center";
    ctx.fillText(n, x + nw / 2 + 4, ny + nh / 2);
    ctx.textAlign = "left";
  });

  // connectors
  ctx.strokeStyle = p.green;
  ctx.globalAlpha = 0.5;
  ctx.lineWidth = 2;
  ctx.setLineDash([6, 6]);
  for (let i = 0; i < nodes.length - 1; i++) {
    const x1 = pad + i * (nw + gap) + nw;
    const x2 = pad + (i + 1) * (nw + gap);
    ctx.beginPath();
    ctx.moveTo(x1, ny + nh / 2);
    ctx.lineTo(x2, ny + nh / 2);
    ctx.stroke();
  }
  ctx.setLineDash([]);
  ctx.globalAlpha = 1;

  // status footer
  ctx.font = `600 ${h * 0.048}px Montserrat, system-ui, sans-serif`;
  ctx.fillStyle = p.green;
  ctx.fillText("✓ 3 flujos ejecutándose", pad, h * 0.82);
}

function drawGridBackdrop(ctx: CanvasRenderingContext2D, w: number, h: number, p: Palette) {
  const step = w / 26;
  ctx.strokeStyle = p.grid;
  ctx.lineWidth = 1;
  for (let x = 0; x <= w; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = 0; y <= h; y += step) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }
}

/* ============================================================
   EASING
   ============================================================ */
function easeOutBack(x: number) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}
function easeOutCubic(x: number) {
  return 1 - Math.pow(1 - x, 3);
}
function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

/* ============================================================
   PANEL DEFINITIONS
   ============================================================ */
interface PanelSpec {
  id: "kpi" | "bar" | "chat" | "flow";
  texW: number;
  texH: number;
  worldW: number;
  target: THREE.Vector3;
  delay: number;
  phase: number;
  draw: (ctx: CanvasRenderingContext2D, w: number, h: number, p: Palette) => void;
}

const PANELS: PanelSpec[] = [
  {
    id: "kpi",
    texW: 1024,
    texH: 650,
    worldW: 4.5,
    target: new THREE.Vector3(0.2, 0.65, 0),
    delay: 0.15,
    phase: 0.4,
    draw: drawKpiPanel,
  },
  {
    id: "chat",
    texW: 620,
    texH: 420,
    worldW: 2.5,
    target: new THREE.Vector3(2.75, 1.7, 0.75),
    delay: 0.75,
    phase: 1.7,
    draw: drawChatPanel,
  },
  {
    id: "bar",
    texW: 660,
    texH: 470,
    worldW: 2.75,
    target: new THREE.Vector3(-2.15, -1.15, 0.7),
    delay: 0.5,
    phase: 2.9,
    draw: drawBarPanel,
  },
  {
    id: "flow",
    texW: 660,
    texH: 470,
    worldW: 2.75,
    target: new THREE.Vector3(3.05, -1.2, 1.05),
    delay: 1.0,
    phase: 3.8,
    draw: drawFlowPanel,
  },
];

/* ============================================================
   COMPONENT
   ============================================================ */
export function CommandCenter3D({
  className,
  theme = "dark",
  reducedMotion = false,
  onReady,
  onFail,
}: CommandCenter3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onReadyRef = useRef(onReady);
  const onFailRef = useRef(onFail);

  useEffect(() => {
    onReadyRef.current = onReady;
    onFailRef.current = onFail;
  }, [onReady, onFail]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      onFailRef.current?.();
      return;
    }

    
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0, 9.4);

    const pmrem = new THREE.PMREMGenerator(renderer);
    const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envRT.texture;

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const key = new THREE.DirectionalLight(0xffffff, 1.6);
    key.position.set(3, 5, 6);
    scene.add(key);
    const greenLight = new THREE.PointLight(0x6ec45e, 90, 40, 2);
    greenLight.position.set(-5, 2, 5);
    scene.add(greenLight);
    const rim = new THREE.PointLight(0x8fd180, 50, 40, 2);
    rim.position.set(5, -3, 4);
    scene.add(rim);

    const root = new THREE.Group();
    scene.add(root);

    // Backdrop grid plane
    const gridTexture = makeTexture(
      760,
      460,
      (ctx, w, h, p) => drawGridBackdrop(ctx, w, h, p),
      getPalette(theme),
      renderer.capabilities.getMaxAnisotropy()
    );
    const gridMat = new THREE.MeshBasicMaterial({
      map: gridTexture,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
    });
    const gridPlane = new THREE.Mesh(new THREE.PlaneGeometry(16, 10), gridMat);
    gridPlane.position.set(0.6, 0, -3.4);
    root.add(gridPlane);

    const anisotropy = renderer.capabilities.getMaxAnisotropy();

    interface PanelObj {
      spec: PanelSpec;
      group: THREE.Group;
      mat: THREE.MeshStandardMaterial;
      start: { pos: THREE.Vector3; rot: THREE.Euler; scale: number };
      texture: THREE.CanvasTexture;
    }

    const panels: PanelObj[] = PANELS.map((spec) => {
      const height = spec.worldW * (spec.texH / spec.texW);
      const texture = makeTexture(spec.texW, spec.texH, spec.draw, getPalette(theme), anisotropy);
      const mat = new THREE.MeshStandardMaterial({
        map: texture,
        transparent: true,
        roughness: 0.32,
        metalness: 0.15,
        envMapIntensity: 0.7,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(spec.worldW, height), mat);
      const group = new THREE.Group();
      group.add(mesh);
      root.add(group);

      const dir = Math.sign(spec.target.x) || 1;
      const start = {
        pos: new THREE.Vector3(
          spec.target.x + dir * 2.4,
          spec.target.y + 1.4,
          spec.target.z - 5.5
        ),
        rot: new THREE.Euler(0.5, dir * -0.6, dir * 0.35),
        scale: 0.62,
      };
      return { spec, group, mat, start, texture };
    });

    // 3D bars in front of the bar panel
    const barSpec = PANELS.find((p) => p.id === "bar")!;
    const barGroup = new THREE.Group();
    const barCount = 7;
    const barTargets = [0.45, 0.7, 0.5, 0.9, 0.62, 0.98, 0.78];
    const barMeshes: THREE.Mesh[] = [];
    const barTotalW = barSpec.worldW * 0.78;
    const barW = barTotalW / (barCount * 1.6);
    for (let i = 0; i < barCount; i++) {
      const g = new THREE.BoxGeometry(barW, 1, barW);
      g.translate(0, 0.5, 0);
      const m = new THREE.MeshStandardMaterial({
        color: 0x6ec45e,
        emissive: 0x2f7a26,
        emissiveIntensity: 0.7,
        roughness: 0.35,
        metalness: 0.2,
        transparent: true,
        opacity: 0,
      });
      const mesh = new THREE.Mesh(g, m);
      const x = -barTotalW / 2 + barW / 2 + i * (barTotalW / barCount) * 0.82;
      mesh.position.set(x, 0, 0);
      mesh.scale.y = 0.001;
      barGroup.add(mesh);
      barMeshes.push(mesh);
    }
    barGroup.position.set(
      barSpec.target.x,
      barSpec.target.y - barSpec.worldW * (barSpec.texH / barSpec.texW) * 0.18,
      barSpec.target.z + 0.22
    );
    barGroup.scale.setScalar(0.9);
    root.add(barGroup);

    // Data pulses travelling between panel centers
    const curvePoints = [
      new THREE.Vector3(-2.15, -1.15, 0.7),
      new THREE.Vector3(0.2, 0.65, 0),
      new THREE.Vector3(3.05, -1.2, 1.05),
      new THREE.Vector3(2.75, 1.7, 0.75),
    ];
    const curve = new THREE.CatmullRomCurve3(curvePoints, true, "catmullrom", 0.5);
    const pulseGeo = new THREE.SphereGeometry(0.055, 12, 12);
    const pulses: THREE.Mesh[] = [];
    for (let i = 0; i < 8; i++) {
      const m = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x8fd180 : 0x6ec45e,
        transparent: true,
        opacity: 0,
      });
      const mesh = new THREE.Mesh(pulseGeo, m);
      root.add(mesh);
      pulses.push(mesh);
    }

    // Connection lines
    const lineGeo = new THREE.BufferGeometry().setFromPoints([...curvePoints, curvePoints[0]]);
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x6ec45e,
      transparent: true,
      opacity: 0,
    });
    const lineLoop = new THREE.Line(lineGeo, lineMat);
    root.add(lineLoop);

    /* ---------------- Layout / resize ---------------- */
    let viewW = 1;
    let viewH = 1;
    let isMobile = false;

    const applyLayout = () => {
      const rect = container.getBoundingClientRect();
      viewW = Math.max(1, rect.width);
      viewH = Math.max(1, rect.height);
      renderer.setSize(viewW, viewH, false);
      camera.aspect = viewW / viewH;
      isMobile = camera.aspect < 1.02;
      if (isMobile) {
        camera.position.z = 11.5;
        root.position.set(0.15, -1.5, 0);
        root.scale.setScalar(0.72);
      } else {
        camera.position.z = 9.8;
        root.position.set(1.0, 0.05, 0);
        root.scale.setScalar(0.9);
      }
      camera.updateProjectionMatrix();
    };

    const ro = new ResizeObserver(applyLayout);
    ro.observe(container);
    applyLayout();

    /* ---------------- Interaction ---------------- */
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onPointerMove = (e: PointerEvent) => {
      pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    let scrollProgress = 0;
    let scrollDirty = true;
    const onScroll = () => {
      scrollDirty = true;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    let visible = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.01 }
    );
    io.observe(container);

    let hidden = false;
    const onVisibility = () => {
      hidden = document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibility);

    /* ---------------- Render loop ---------------- */
    const clock = new THREE.Clock();
    let raf = 0;

    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!visible || hidden) return;

      if (scrollDirty) {
        const rect = container.getBoundingClientRect();
        const total = window.innerHeight + rect.height;
        const passed = clamp01((window.innerHeight - rect.top) / total);
        scrollProgress = clamp01((passed - 0.15) / 0.5);
        scrollDirty = false;
      }

      const t = clock.getElapsedTime();
      const assemblyDur = reducedMotion ? 0.001 : 1.5;

      // camera / root parallax
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;

      panels.forEach((panel) => {
        const p = clamp01((t - panel.spec.delay) / assemblyDur);
        const e = reducedMotion ? 1 : easeOutBack(p);
        const fade = reducedMotion ? 1 : clamp01(p * 1.6);

        const bob = reducedMotion ? 0 : Math.sin(t * 0.7 + panel.spec.phase) * 0.05;
        const targetPos = panel.spec.target.clone();
        targetPos.y += bob;

        panel.group.position.lerpVectors(panel.start.pos, targetPos, e);
        panel.group.position.z += (1 - e) * -0.5;
        panel.group.rotation.x = THREE.MathUtils.lerp(panel.start.rot.x, 0, e);
        panel.group.rotation.y = THREE.MathUtils.lerp(panel.start.rot.y, 0, e);
        panel.group.rotation.z = THREE.MathUtils.lerp(panel.start.rot.z, 0, e);
        const s = THREE.MathUtils.lerp(panel.start.scale, 1, e);
        panel.group.scale.setScalar(s * (isMobile ? 0.92 : 1));
        panel.mat.opacity = fade;

        // scroll recede
        panel.group.position.z -= scrollProgress * 2.4;
        panel.group.position.y += scrollProgress * 0.6;
      });

      // bars rise after bar panel
      barMeshes.forEach((mesh, i) => {
        const p = clamp01((t - 0.9 - i * 0.06) / (reducedMotion ? 0.001 : 0.8));
        const e = reducedMotion ? 1 : easeOutCubic(p);
        mesh.scale.y = Math.max(0.001, barTargets[i] * 0.85 * e);
        (mesh.material as THREE.MeshStandardMaterial).opacity = clamp01(p * 1.4);
      });
      barGroup.position.z = barSpec.target.z + 0.22 - scrollProgress * 2.4;

      // pulses
      const pulseFade = clamp01((t - 1.4) / 1) * (1 - scrollProgress * 0.6);
      pulses.forEach((pulse, i) => {
        const u = ((t * 0.09 + i / pulses.length) % 1 + 1) % 1;
        const point = curve.getPointAt(u);
        pulse.position.copy(point);
        pulse.position.z += 0.22;
        const mat = pulse.material as THREE.MeshBasicMaterial;
        mat.opacity = reducedMotion ? 0 : pulseFade * (0.35 + 0.65 * Math.sin(u * Math.PI));
        const sc = reducedMotion ? 0.001 : 0.8 + Math.sin(u * Math.PI) * 0.6;
        pulse.scale.setScalar(sc);
      });
      (lineLoop.material as THREE.LineBasicMaterial).opacity = reducedMotion
        ? 0.18
        : pulseFade * 0.28;

      // idle parallax
      const px = reducedMotion ? 0 : pointer.x;
      const py = reducedMotion ? 0 : pointer.y;
      root.rotation.y += (px * 0.18 - root.rotation.y) * 0.04;
      root.rotation.x += (py * 0.12 - root.rotation.x) * 0.04;
      root.position.z = -scrollProgress * 1.6;

      renderer.render(scene, camera);
    };

    frame();
    onReadyRef.current?.();

    return () => {
      
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);

      panels.forEach((panel) => {
        panel.group.traverse((o) => {
          const m = o as THREE.Mesh;
          if (m.geometry) m.geometry.dispose();
        });
        panel.mat.dispose();
        panel.texture.dispose();
      });
      barMeshes.forEach((m) => {
        m.geometry.dispose();
        (m.material as THREE.Material).dispose();
      });
      pulses.forEach((p) => (p.material as THREE.Material).dispose());
      pulseGeo.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      gridTexture.dispose();
      gridMat.dispose();
      gridPlane.geometry.dispose();
      envRT.dispose();
      pmrem.dispose();
      renderer.dispose();
    };
  }, [theme, reducedMotion]);

  return (
    <div ref={containerRef} className={cn("relative h-full w-full", className)} aria-hidden="true">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
