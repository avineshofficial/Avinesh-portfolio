"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function GlowOrb({
  position = [0, 0, 0] as [number, number, number],
  color = "#ff5c00",
  size = 0.5,
  speed = 1,
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * speed;
    meshRef.current.position.y = position[1] + Math.sin(t * 0.5) * 0.8;
    meshRef.current.position.x = position[0] + Math.cos(t * 0.3) * 0.4;
    const scale = size + Math.sin(t) * 0.1;
    meshRef.current.scale.setScalar(scale);
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.08}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}
