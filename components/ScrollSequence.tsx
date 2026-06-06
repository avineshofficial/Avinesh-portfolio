"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

const FRAME_COUNT = 164;

export default function ScrollSequence({ scrollContainerRef }: { scrollContainerRef: React.RefObject<HTMLElement | null> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const lastRenderedFrame = useRef(-1);
  const [loaded, setLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start start", "end end"],
  });

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];
    
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      // Format number to 3 digits (001, 002, etc.)
      const num = i.toString().padStart(3, "0");
      img.src = `/image/ezgif-frame-${num}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          setLoaded(true);
        }
      };
      images.push(img);
    }
    imagesRef.current = images;
  }, []);

  const renderFrame = (index: number) => {
    if (index === lastRenderedFrame.current) return;
    if (!canvasRef.current || !imagesRef.current[index]) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    lastRenderedFrame.current = index;
    const img = imagesRef.current[index];
    
    // Make sure the canvas resolution matches the image
    if (canvas.width !== img.width) canvas.width = img.width;
    if (canvas.height !== img.height) canvas.height = img.height;

    // Force high-quality rendering (4k quality)
    ctx.imageSmoothingEnabled = true;
    (ctx as any).imageSmoothingQuality = "high";

    // Draw the image onto the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
  };

  // Render first frame when loaded
  useEffect(() => {
    if (loaded) {
      renderFrame(0);
    }
  }, [loaded]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!loaded) return;
    const frameIndex = Math.min(
      FRAME_COUNT - 1,
      Math.max(0, Math.floor(latest * FRAME_COUNT))
    );
    // Use requestAnimationFrame to ensure smooth drawing without layout thrashing
    requestAnimationFrame(() => renderFrame(frameIndex));
  });

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <canvas
        ref={canvasRef}
        // Removed expensive mix-blend-screen, added hardware acceleration hints
        className="w-full h-full object-cover opacity-50" 
        style={{ willChange: "transform, opacity" }}
      />
    </div>
  );
}
