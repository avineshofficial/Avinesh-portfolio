"use client";

import { useRef, useCallback, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import ParticleField from "./ParticleField";

export default function HeroScene() {
  const mousePositionRef = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      mousePositionRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePositionRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    },
    []
  );

  return (
    <div
      className="three-canvas-container"
      onMouseMove={handleMouseMove}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent", pointerEvents: "none" }}
      >
        <Suspense fallback={null}>
          <AdaptiveDpr pixelated />

          {/* Lighting */}
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.5} color="#ff5c00" />
          <pointLight position={[-10, -10, 5]} intensity={0.3} color="#ffb59a" />

          {/* 3D Elements */}
          <ParticleField count={400} mousePositionRef={mousePositionRef} />

          {/* Post-processing */}
          <EffectComposer>
            <Bloom
              intensity={0.5}
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
