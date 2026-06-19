"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

// power3.out cubic-bezier
const EASE_POWER3_OUT: [number, number, number, number] = [0.215, 0.61, 0.355, 1];

export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  // Direction-based initial offset
  const directionMap = {
    up: { y: 50, x: 0 },
    down: { y: -50, x: 0 },
    left: { x: 50, y: 0 },
    right: { x: -50, y: 0 },
  };
  const offset = directionMap[direction];

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        x: offset.x,
        y: offset.y,
        skewY: direction === "up" || direction === "down" ? 4 : 0,
      }}
      animate={
        isInView
          ? { opacity: 1, x: 0, y: 0, skewY: 0 }
          : {
              opacity: 0,
              x: offset.x,
              y: offset.y,
              skewY: direction === "up" || direction === "down" ? 4 : 0,
            }
      }
      transition={{
        duration: 0.7,
        delay,
        ease: EASE_POWER3_OUT,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
