"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useVelocity } from "framer-motion";

const skills = [
  {
    icon: "terminal",
    title: "Python",
    description: "Automation, Scripting, Backend Architecture",
  },
  {
    icon: "psychology",
    title: "AI & ML",
    description: "Neural Networks, Scikit-Learn, PyTorch",
  },
  {
    icon: "web",
    title: "Web Dev",
    description: "React, Tailwind, Next.js, Performance",
  },
  {
    icon: "database",
    title: "Database",
    description: "MongoDB, PostgreSQL, SQL Optimization",
  },
  {
    icon: "cloud",
    title: "AWS Cloud",
    description: "EC2, S3, Lambda, Serverless Infra",
  },
  {
    icon: "bolt",
    title: "Prompt Eng.",
    description: "LLM Tuning, RAG Systems, Advanced Logic",
  },
  {
    icon: "api",
    title: "Backends",
    description: "Node.js, FastAPI, RESTful APIs",
  },
  {
    icon: "deployed_code",
    title: "DevOps",
    description: "Docker, CI/CD, Git Workflows",
  },
];

const skillColors = [
  "bg-[#FFE047]", // Yellow
  "bg-[#FF6B35]", // Orange
  "bg-[#00F5D4]", // Teal
  "bg-[#A78BFA]", // Purple
  "bg-[#38BDF8]", // Blue
  "bg-[#A3E635]", // Green
  "bg-[#FF70A6]", // Pink
  "bg-[#F59E0B]", // Amber
];

// Realistic random rotations & jitters for stacked cards
const stackRotations = [-7, 5, -3, 9, -6, 4, -2, 8];
const jittersX = [-10, 6, -5, 8, -4, 11, -7, 5];
const jittersY = [5, -7, -3, 9, 11, -5, 3, -7];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Calculate velocity for motion blur
  const scrollVelocity = useVelocity(scrollYProgress);
  const blurPixels = useTransform(scrollVelocity, [-2, 0, 2], [8, 0, 8]);
  const motionBlurStyle = useTransform(blurPixels, (v) => (v > 0.5 ? `blur(${v}px)` : "none"));

  // Parallax background scroll
  const bgY = useTransform(scrollYProgress, [0, 1], ["0px", "-100px"]);

  // Track responsive grid details
  const [isDesktop, setIsDesktop] = useState(true);
  const [cellDimensions, setCellDimensions] = useState({ cellW: 320, cellH: 200 });

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);

      if (gridRef.current) {
        const gridWidth = gridRef.current.offsetWidth;
        const cols = desktop ? 4 : 2;
        const gap = desktop ? 24 : 16;
        
        // Compute exact center-to-center cell spacing (width + gap)
        const cellW = (gridWidth - gap * (cols - 1)) / cols + gap;
        const cellH = desktop ? 180 + gap : 150 + gap;
        setCellDimensions({ cellW, cellH });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isDesktop]);

  const cols = isDesktop ? 4 : 2;
  const rows = isDesktop ? 2 : 4;

  return (
    <section ref={sectionRef} id="skills" className="relative h-[300vh] bg-transparent">
      {/* Sticky Viewport Wrapper */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center items-center py-6 px-5 md:px-20 z-10">
        
        {/* Parallax Dot Grid Background */}
        <motion.div
          style={{
            y: bgY,
            backgroundImage: `radial-gradient(rgba(0, 0, 0, 0.15) 1.5px, transparent 1.5px)`,
            backgroundSize: "24px 24px",
          }}
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.25]"
        />

        {/* Content container */}
        <div className="max-w-[1440px] mx-auto w-full relative z-10 flex flex-col items-center">
          {/* Header */}
          <div className="text-center mb-12 shrink-0">
            <motion.h2
              initial={{ opacity: 0, y: 50, skewY: 4 }}
              whileInView={{ opacity: 1, y: 0, skewY: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
              className="font-[var(--font-geist)] text-[40px] leading-[44px] tracking-tight font-black md:text-[60px] md:leading-[64px] text-black uppercase mb-4"
            >
              Core{" "}
              <span className="bg-primary px-4 py-1.5 border-[3px] border-black inline-block rotate-[-1.5deg] shadow-[4px_4px_0px_0px_#000000]">
                Capabilities
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30, skewY: 2 }}
              whileInView={{ opacity: 1, y: 0, skewY: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1], delay: 0.1 }}
              className="text-gray-800 font-[var(--font-inter)] text-[14px] md:text-[16px] max-w-2xl mx-auto uppercase tracking-wider font-extrabold"
            >
              ✦ Scroll down to deal the capability cards ✦
            </motion.p>
          </div>

          {/* Cards Frame */}
          <div
            ref={gridRef}
            className="w-full max-w-[1200px] mx-auto min-h-[380px] lg:min-h-[420px] flex items-center justify-center relative perspective-[1200px]"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 w-full">
              {skills.map((skill, i) => {
                const col = i % cols;
                const row = Math.floor(i / cols);

                // Math translation back to the deck center
                const xStack = -(col - (cols - 1) / 2) * cellDimensions.cellW + jittersX[i];
                const yStack = -(row - (rows - 1) / 2) * cellDimensions.cellH + jittersY[i];

                // Scroll phases timeline for Card 'i'
                const t0 = 0.0;
                const tStartFly = 0.02 + 0.02 * i;    // Staggered Fly-In starts
                const tEndFly = 0.08 + 0.02 * i;      // Staggered Fly-In finishes
                const tStartDeal = 0.22 + 0.06 * i;   // Sequential Deal Out starts
                const tEndDeal = 0.36 + 0.06 * i;     // Sequential Deal Out settles
                const t5 = 1.0;

                // Dealing Arc values
                const midT = (tStartDeal + tEndDeal) / 2;
                const arcX = (col - (cols - 1) / 2) * (isDesktop ? 60 : 30);
                const arcY = -70; // Arch upward during fly out

                // Raw transforms
                const rawX = useTransform(
                  scrollYProgress,
                  [t0, tStartFly, tEndFly, tStartDeal, midT, tEndDeal, t5],
                  [xStack, xStack, xStack, xStack, xStack * 0.5 + arcX, 0, 0]
                );

                const rawY = useTransform(
                  scrollYProgress,
                  [t0, tStartFly, tEndFly, tStartDeal, midT, tEndDeal, t5],
                  [1000, 1000, yStack, yStack, yStack * 0.5 + arcY, 0, 0] // Fly in from 1000px down
                );

                const rawRotate = useTransform(
                  scrollYProgress,
                  [t0, tStartFly, tEndFly, tStartDeal, midT, tEndDeal, t5],
                  [stackRotations[i], stackRotations[i], stackRotations[i], stackRotations[i], stackRotations[i] * 1.5, 0, 0]
                );

                const rawScale = useTransform(
                  scrollYProgress,
                  [t0, tStartFly, tEndFly, tStartDeal, tEndDeal, t5],
                  [0.9, 0.9, 0.9, 0.9, 1.0, 1.0]
                );

                // 3D Perspective card tilts
                const rawRotateX = useTransform(scrollYProgress, [tStartDeal, midT, tEndDeal], [18, 10, 0]);
                const rawRotateY = useTransform(scrollYProgress, [tStartDeal, midT, tEndDeal], [-12, -6, 0]);

                // Physics spring values (liquid smooth scroll w/ subtle bounce & settle momentum)
                const xSpring = useSpring(rawX, { damping: 24, stiffness: 85 });
                const ySpring = useSpring(rawY, { damping: 24, stiffness: 85 });
                const rotateSpring = useSpring(rawRotate, { damping: 20, stiffness: 75 });
                const scaleSpring = useSpring(rawScale, { damping: 15, stiffness: 90 });
                const rotateXSpring = useSpring(rawRotateX, { damping: 15, stiffness: 80 });
                const rotateYSpring = useSpring(rawRotateY, { damping: 15, stiffness: 80 });

                // Set active flying card on top zIndex stack
                const zIndex = useTransform(
                  scrollYProgress,
                  [t0, tStartDeal, tStartDeal + 0.01, tEndDeal - 0.01, tEndDeal, t5],
                  [10 + i, 10 + i, 60, 60, 10, 10]
                );

                return (
                  <motion.div
                    key={skill.title}
                    style={{
                      x: xSpring,
                      y: ySpring,
                      rotate: rotateSpring,
                      scale: scaleSpring,
                      rotateX: rotateXSpring,
                      rotateY: rotateYSpring,
                      zIndex,
                      filter: motionBlurStyle,
                      transformStyle: "preserve-3d",
                    }}
                    className="relative h-[150px] lg:h-[180px] w-full"
                  >
                    {/* Inner Card - handles scale/lifts on hover trigger relative to parent's scroll position */}
                    <div
                      className={`brutal-card p-5 h-full flex flex-col justify-between cursor-pointer select-none transition-all duration-200 hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[8px_8px_0px_0px_#000000] ${
                        skillColors[i % skillColors.length]
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        {/* Icon Block */}
                        <div className="w-10 h-10 border-[2.5px] border-black bg-white flex items-center justify-center shadow-[2px_2px_0px_0px_#000000] shrink-0">
                          <span className="material-symbols-outlined text-black text-xl font-black">
                            {skill.icon}
                          </span>
                        </div>
                        {/* Counter tag */}
                        <span className="font-[var(--font-jetbrains)] text-[10px] font-black text-black opacity-40 uppercase">
                          0{i + 1}
                        </span>
                      </div>
                      
                      {/* Text block */}
                      <div className="mt-3">
                        <h3 className="font-[var(--font-geist)] text-[16px] lg:text-[18px] font-black uppercase text-black leading-tight mb-1">
                          {skill.title}
                        </h3>
                        <p className="font-[var(--font-jetbrains)] text-[10px] leading-[13px] font-bold text-black opacity-80 uppercase tracking-tight line-clamp-2">
                          {skill.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
