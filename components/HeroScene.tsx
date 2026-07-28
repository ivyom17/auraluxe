"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial, Float, Sparkles, Environment } from "@react-three/drei";
import * as THREE from "three";

function Core() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.08;
    meshRef.current.rotation.y = t * 0.12;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={meshRef} scale={1.7}>
        <icosahedronGeometry args={[1, 24]} />
        <MeshDistortMaterial
          color="#7c5cff"
          attach="material"
          distort={0.42}
          speed={1.8}
          roughness={0.15}
          metalness={0.85}
          emissive="#4f46e5"
          emissiveIntensity={0.25}
        />
      </mesh>
    </Float>
  );
}

function OrbitRing({ radius, speed, color, tilt }: { radius: number; speed: number; color: string; tilt: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = state.clock.getElapsedTime() * speed;
  });
  return (
    <group ref={ref} rotation={[tilt, 0.3, 0]}>
      <mesh>
        <torusGeometry args={[radius, 0.006, 16, 128]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

function Shards() {
  const groupRef = useRef<THREE.Group>(null);
  const items = useMemo(
    () =>
      Array.from({ length: 6 }).map((_, i) => ({
        pos: [
          Math.cos((i / 6) * Math.PI * 2) * 3.2,
          Math.sin((i / 6) * Math.PI * 2) * 1.6,
          Math.sin(i) * 1.5,
        ] as [number, number, number],
        scale: 0.25 + Math.random() * 0.3,
        color: i % 2 === 0 ? "#22d3ee" : "#e879f9",
      })),
    []
  );

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
  });

  return (
    <group ref={groupRef}>
      {items.map((it, i) => (
        <Float key={i} speed={1.2 + i * 0.15} floatIntensity={1.4} rotationIntensity={1.2}>
          <mesh position={it.pos} scale={it.scale}>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color={it.color}
              metalness={0.6}
              roughness={0.2}
              emissive={it.color}
              emissiveIntensity={0.4}
              transparent
              opacity={0.85}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function MouseParallaxRig() {
  const { camera, pointer } = useThree();
  const target = useRef(new THREE.Vector3(0, 0, 6));

  useFrame(() => {
    target.current.x = THREE.MathUtils.lerp(target.current.x, pointer.x * 0.6, 0.04);
    target.current.y = THREE.MathUtils.lerp(target.current.y, pointer.y * 0.4, 0.04);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, target.current.x, 0.06);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, target.current.y, 0.06);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 42 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1.4} color="#7c5cff" />
      <pointLight position={[-5, -3, -2]} intensity={1.1} color="#22d3ee" />
      <spotLight position={[0, 6, 4]} angle={0.5} penumbra={1} intensity={0.6} color="#e879f9" />

      <Core />
      <Shards />
      <OrbitRing radius={2.6} speed={0.12} color="#7c5cff" tilt={0.4} />
      <OrbitRing radius={3.1} speed={-0.08} color="#22d3ee" tilt={-0.3} />
      <Sparkles count={80} scale={9} size={2} speed={0.3} color="#f5f5f9" opacity={0.5} />

      <MouseParallaxRig />
      <Environment preset="city" />
    </Canvas>
  );
}
