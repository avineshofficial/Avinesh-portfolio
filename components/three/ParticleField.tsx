"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleFieldProps {
  count?: number;
  mousePositionRef?: React.MutableRefObject<{ x: number; y: number }>;
}

export default function ParticleField({
  count = 500,
  mousePositionRef,
}: ParticleFieldProps) {
  const meshRef = useRef<THREE.Points>(null);

  const { positions, speeds, offsets } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const offsets = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
      speeds[i] = 0.2 + Math.random() * 0.8;
      offsets[i] = Math.random() * Math.PI * 2;
    }

    return { positions, speeds, offsets };
  }, [count]);

  const sizes = useMemo(() => {
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      sizes[i] = 0.02 + Math.random() * 0.06;
    }
    return sizes;
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    const scrollY = window.scrollY;
    const scrollZ = scrollY * 0.015; // Particles fly forward on scroll
    
    const posArray = meshRef.current.geometry.attributes.position
      .array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const mouseX = mousePositionRef?.current.x || 0;
      const mouseY = mousePositionRef?.current.y || 0;
      // Gentle orbital motion + mouse parallax
      posArray[i3] =
        positions[i3] +
        Math.sin(time * speeds[i] * 0.3 + offsets[i]) * 0.5 +
        mouseX * 0.3;
      posArray[i3 + 1] =
        positions[i3 + 1] +
        Math.cos(time * speeds[i] * 0.2 + offsets[i]) * 0.5 +
        mouseY * 0.3;
        
      // Fly forward based on scroll
      let newZ = positions[i3 + 2] + Math.sin(time * speeds[i] * 0.1 + offsets[i] * 2) * 0.3 + scrollZ;
      
      // Loop particles back to the far distance if they fly past the camera
      while (newZ > 8) newZ -= 30;
      
      posArray[i3 + 2] = newZ;
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Rotate the whole particle field faster when scrolled down
    meshRef.current.rotation.y = time * 0.02 + scrollY * 0.001;
    meshRef.current.rotation.x = scrollY * 0.0005;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#ff8c55"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
