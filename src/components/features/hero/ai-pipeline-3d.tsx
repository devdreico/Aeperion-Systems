import {
  Component,
  Suspense,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { FLOW_STAGES } from "@/lib/method-data";
import { PipelineFallback } from "./pipeline-fallback";

const NODE_COLORS = ["#6EC45E", "#22D3EE", "#8FF07A", "#A78BFA", "#22D3EE"];

function buildCurve() {
  return new THREE.CatmullRomCurve3([
    new THREE.Vector3(-4.6, 0.15, 0),
    new THREE.Vector3(-2.3, 0.75, -0.2),
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(2.3, -0.75, 0.2),
    new THREE.Vector3(4.6, -0.15, 0),
  ]);
}

function PipelineNode({
  position,
  index,
}: {
  position: THREE.Vector3;
  index: number;
}) {
  const ring = useRef<THREE.Mesh>(null);
  const color = NODE_COLORS[index % NODE_COLORS.length];

  useFrame((state) => {
    if (ring.current) {
      ring.current.rotation.z = state.clock.elapsedTime * 0.35 + index;
      ring.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4 + index) * 0.25;
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={0.18} floatIntensity={0.45}>
      <group position={position}>
        <mesh>
          <icosahedronGeometry args={[0.2, 1]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={2.4}
            roughness={0.2}
            metalness={0.4}
          />
        </mesh>
        <mesh ref={ring}>
          <torusGeometry args={[0.42, 0.006, 10, 64]} />
          <meshBasicMaterial color={color} transparent opacity={0.55} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.52, 24, 24]} />
          <meshBasicMaterial color={color} transparent opacity={0.045} />
        </mesh>
      </group>
    </Float>
  );
}

function FlowParticles({ curve }: { curve: THREE.CatmullRomCurve3 }) {
  const ref = useRef<THREE.Points>(null);
  const count = 110;

  const positions = useMemo(() => new Float32Array(count * 3), [count]);
  const seeds = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        offset: i / count,
        speed: 0.025 + (i % 7) * 0.006,
        spread: Math.sin(i * 1.7) * 0.16,
      })),
    [count]
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const geometry = ref.current?.geometry;
    if (!geometry) return;
    const attr = geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const seed = seeds[i];
      const p = curve.getPointAt((seed.offset + t * seed.speed) % 1);
      arr[i * 3] = p.x + Math.sin(t * 0.8 + i) * 0.02;
      arr[i * 3 + 1] = p.y + seed.spread + Math.cos(t * 0.6 + i) * 0.02;
      arr[i * 3 + 2] = p.z + Math.sin(t * 0.5 + i) * 0.02;
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#B6FF9E"
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Core() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.18;
      mesh.current.rotation.x = state.clock.elapsedTime * 0.08;
    }
  });
  return (
    <group>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[0.95, 1]} />
        <meshBasicMaterial color="#6EC45E" wireframe transparent opacity={0.22} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial
          color="#0B1A10"
          emissive="#6EC45E"
          emissiveIntensity={0.55}
          roughness={0.25}
          metalness={0.65}
        />
      </mesh>
      <pointLight color="#6EC45E" intensity={6} distance={9} />
    </group>
  );
}

function Scene() {
  const curve = useMemo(buildCurve, []);
  const nodePositions = useMemo(
    () => [0, 0.25, 0.5, 0.75, 1].map((t) => curve.getPointAt(t)),
    [curve]
  );
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      state.pointer.x * 0.16,
      0.04
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -state.pointer.y * 0.1,
      0.04
    );
  });

  const linePoints = useMemo(() => curve.getPoints(90), [curve]);

  return (
    <group ref={group}>
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 5]} intensity={1.6} color="#FFFFFF" />
      <pointLight position={[-5, -3, 2]} intensity={3} color="#22D3EE" />
      <pointLight position={[5, 3, 2]} intensity={3} color="#A78BFA" />

      <Line
        points={linePoints}
        color="#6EC45E"
        lineWidth={1}
        transparent
        opacity={0.22}
      />
      <Line
        points={linePoints}
        color="#22D3EE"
        lineWidth={0.6}
        transparent
        opacity={0.12}
        dashed
        dashSize={0.18}
        gapSize={0.22}
      />

      <Core />
      {nodePositions.map((position, index) => (
        <PipelineNode key={FLOW_STAGES[index]?.id ?? index} position={position} index={index} />
      ))}
      <FlowParticles curve={curve} />

      <Sparkles
        count={70}
        scale={[11, 5, 5]}
        size={1.6}
        speed={0.25}
        opacity={0.45}
        color="#8FF07A"
      />
    </group>
  );
}

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    );
  } catch {
    return false;
  }
}

class GLBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export function AIPipeline3D({ className }: { className?: string }) {
  if (typeof window !== "undefined" && !hasWebGL()) {
    return <PipelineFallback className={className} />;
  }

  return (
    <div className={className}>
      <GLBoundary fallback={<PipelineFallback />}>
        <Canvas
          dpr={[1, 1.75]}
          camera={{ position: [0, 0, 9], fov: 42 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          style={{ background: "transparent" }}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </GLBoundary>
    </div>
  );
}