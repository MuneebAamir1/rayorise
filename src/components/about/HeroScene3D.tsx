"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/* ── Single floating fabric panel ── */
function FabricPanel({
  position,
  rotation,
  scale,
  color,
  opacity,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  color: string;
  opacity: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    /* Subtle cursor-reactive rotation */
    meshRef.current.rotation.x +=
      (pointer.y * 0.08 - meshRef.current.rotation.x) * delta * 0.5;
    meshRef.current.rotation.y +=
      (pointer.x * 0.08 - meshRef.current.rotation.y) * delta * 0.5;
  });

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color,
        transparent: true,
        opacity,
        roughness: 0.85,
        metalness: 0.05,
        side: THREE.DoubleSide,
      }),
    [color, opacity]
  );

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.3}>
      <mesh
        ref={meshRef}
        position={position}
        rotation={rotation}
        scale={scale}
        material={material}
      >
        <planeGeometry args={[1, 1, 8, 8]} />
      </mesh>
    </Float>
  );
}

/* ── Scene content ── */
function Scene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.25} />
      <directionalLight
        position={[3, 4, 5]}
        intensity={0.6}
        color="#F0E8D8"
      />
      <pointLight
        position={[-2, -1, 3]}
        intensity={0.3}
        color="#C9913A"
        distance={8}
      />

      {/* Abstract fabric panels — pattern-cutting composition */}
      {/* Main back panel */}
      <FabricPanel
        position={[0, 0.1, 0]}
        rotation={[0.05, 0.1, -0.02]}
        scale={[2.2, 2.8, 1]}
        color="#2A2520"
        opacity={0.85}
      />
      {/* Contrast side panel */}
      <FabricPanel
        position={[1.2, 0.3, 0.3]}
        rotation={[0.02, -0.15, 0.05]}
        scale={[1.1, 2.2, 1]}
        color="#3A3530"
        opacity={0.7}
      />
      {/* Accent stripe panel */}
      <FabricPanel
        position={[-0.8, -0.2, 0.5]}
        rotation={[-0.03, 0.2, -0.08]}
        scale={[0.6, 2.4, 1]}
        color="#C9913A"
        opacity={0.12}
      />
      {/* Small collar/detail panel */}
      <FabricPanel
        position={[0.3, 1.3, 0.4]}
        rotation={[0.1, 0.05, 0.12]}
        scale={[1.4, 0.5, 1]}
        color="#221E19"
        opacity={0.6}
      />
      {/* Sleeve panel */}
      <FabricPanel
        position={[-1.4, 0.2, 0.2]}
        rotation={[-0.05, 0.25, -0.15]}
        scale={[0.9, 1.8, 1]}
        color="#2A2520"
        opacity={0.55}
      />
    </>
  );
}

/* ── Canvas wrapper ── */
export default function HeroScene3D() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
      }}
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 0, 5], fov: 35 }}
        style={{ pointerEvents: "auto" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
