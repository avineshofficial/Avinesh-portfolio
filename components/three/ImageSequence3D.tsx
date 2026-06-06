"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

const imageUrls = [
  "/images/keyboard-1.jpg",
  "/images/keyboard-2.jpg",
  "/images/keyboard-3.jpg",
  "/images/keyboard-4.jpg",
  "/images/keyboard-5.jpg",
];

export default function ImageSequence3D({ mousePosition = { x: 0, y: 0 } }: { mousePosition?: { x: number, y: number } }) {
  const materialsRef = useRef<THREE.MeshBasicMaterial[]>([]);
  const groupRef = useRef<THREE.Group>(null);
  
  // Load textures
  const textures = useTexture(imageUrls);

  useFrame((state) => {
    if (!materialsRef.current.length || !groupRef.current) return;
    const scrollY = window.scrollY;
    
    // Map the scroll across 1.5 viewport heights
    const maxScroll = window.innerHeight * 1.5;
    const scrollProgress = Math.max(0, Math.min(1, scrollY / (maxScroll || 1)));
    
    const numImages = textures.length;
    const rawIndex = scrollProgress * (numImages - 1);
    
    // Crossfade opacity
    materialsRef.current.forEach((mat, i) => {
      const dist = Math.abs(rawIndex - i);
      mat.opacity = Math.max(0, 1 - dist);
      mat.needsUpdate = true;
    });
    
    // 3D Parallax and floating effects
    const time = state.clock.elapsedTime;
    
    // Float gently up/down
    groupRef.current.position.y = Math.sin(time * 0.5) * 0.2 + scrollY * 0.002;
    
    // Tilt slightly based on mouse position
    groupRef.current.rotation.y = mousePosition.x * 0.1;
    groupRef.current.rotation.x = -mousePosition.y * 0.1;
    
    // Push slightly back as you scroll
    groupRef.current.position.z = -5 - scrollY * 0.005;
  });

  return (
    <group ref={groupRef} position={[0, 0, -5]}>
      {textures.map((texture, i) => (
        <mesh key={i} position={[0, 0, i * -0.01]}>
          {/* 16:9 Aspect ratio scaled up */}
          <planeGeometry args={[16, 9]} />
          <meshBasicMaterial
            ref={(el) => {
              if (el) materialsRef.current[i] = el;
            }}
            map={texture}
            transparent
            opacity={i === 0 ? 1 : 0}
            depthWrite={false}
            // Tone down the brightness slightly so it blends with the dark theme
            color="#dddddd" 
          />
        </mesh>
      ))}
    </group>
  );
}
