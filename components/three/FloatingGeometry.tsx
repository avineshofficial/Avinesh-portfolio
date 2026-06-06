"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

interface FloatingGeometryProps {
  mousePositionRef?: React.MutableRefObject<{ x: number; y: number }>;
}

function FloatingShape({
  position,
  geometry,
  speed,
  rotationAxis,
  scale,
}: {
  position: [number, number, number];
  geometry: "icosahedron" | "octahedron" | "torus";
  speed: number;
  rotationAxis: "x" | "y" | "z";
  scale: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    const scrollY = window.scrollY;

    // Spin faster based on scroll
    meshRef.current.rotation[rotationAxis] = t * speed + scrollY * 0.005 * speed;
    
    // Spread outward from the center based on scroll
    const spread = 1 + scrollY * 0.002;
    meshRef.current.position.y = (position[1] + Math.sin(t * speed * 0.5) * 0.5) * spread;
    meshRef.current.position.x = (position[0] + Math.cos(t * speed * 0.3) * 0.2) * spread;
    
    // Move slightly towards the camera based on scroll
    meshRef.current.position.z = position[2] + scrollY * 0.01;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {geometry === "icosahedron" && <icosahedronGeometry args={[1, 1]} />}
      {geometry === "octahedron" && <octahedronGeometry args={[1, 0]} />}
      {geometry === "torus" && <torusGeometry args={[1, 0.3, 16, 32]} />}
      <MeshDistortMaterial
        color="#ff5c00"
        emissive="#ff3300"
        emissiveIntensity={0.15}
        roughness={0.6}
        metalness={0.8}
        wireframe
        distort={0.2}
        speed={1.5}
        transparent
        opacity={0.35}
      />
    </mesh>
  );
}

export default function FloatingGeometry({ mousePositionRef }: FloatingGeometryProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    const scrollY = window.scrollY;
    const mouseX = mousePositionRef?.current.x || 0;
    const mouseY = mousePositionRef?.current.y || 0;
    
    // Mouse Parallax + Scroll Parallax
    groupRef.current.rotation.y +=
      (mouseX * 0.1 - groupRef.current.rotation.y) * 0.02;
    groupRef.current.rotation.x +=
      (mouseY * 0.05 - groupRef.current.rotation.x) * 0.02;
      
    // Z-rotation based on scroll
    groupRef.current.rotation.z = scrollY * 0.001;
  });

  return (
    <group ref={groupRef}>
      <FloatingShape
        position={[3, 1, -2]}
        geometry="icosahedron"
        speed={0.3}
        rotationAxis="y"
        scale={1.2}
      />
      <FloatingShape
        position={[-3.5, -1, -3]}
        geometry="octahedron"
        speed={0.4}
        rotationAxis="x"
        scale={0.9}
      />
      <FloatingShape
        position={[1, -2, -4]}
        geometry="torus"
        speed={0.25}
        rotationAxis="z"
        scale={0.7}
      />
      <FloatingShape
        position={[-1.5, 2.5, -5]}
        geometry="icosahedron"
        speed={0.2}
        rotationAxis="y"
        scale={0.5}
      />
    </group>
  );
}
