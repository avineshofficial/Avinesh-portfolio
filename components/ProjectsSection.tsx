"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";

const projects = [
  {
    title: "Neural Sentinel v2.0",
    description: "An autonomous monitoring system that utilizes deep learning to detect anomalies in large-scale server clusters with 99.4% accuracy.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDdec7ERp3XC9zaAEoKYseI2iHpO_HWLB3uNEg_ba6hde1ddxAmuLnAJjPG7_2pB6QlzFpx0qF6H1ZVsvm4KjPocOVaudIJxyGT8WA5HGnw1DHCiDlKa4a8gp0pl_oMjtoMhLqVQZoyUxgjwuVJIUayHmnIdWk4zcSJjuH3QUAqO6hfs_m42VhgaOeL2ELeGZMc9-a-SMbr5n1WHSbcslozeYJjDeL5L_ts23Vh1zQEMzcHAhXUbnsbbNMhTJKH9gR-0-flwffcVwY",
    tags: ["AI / ML", "PYTHON"],
    links: { live: "#", code: "#" },
    noteType: "Case File #104",
    classifiedText: "THREAT ANOMALY DETECTED"
  },
  {
    title: "VaultOS",
    description: "Encrypted file management system with hardware-level security integration and custom credentials vault.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCrSXQkIgKrf8hRIvif1FTiyHGrTIlLksgzyKS5v_yr626GqioYThvhMSbh4ajybZXumDn7OnIcBDU_tzVw0mpEOrQdx6SM7SdpKRx_EmVQSywA556Cql19RjgBQaf5gLlfK4nwLfDtmmswgLqL936CLZLTLh0FpNN5_sAQ6xZ1ERYr1XiBLtKzUY12e9blW84fgpnAskra2dXIJGQBcDYvSDHfcZ8uAboiwKbDwLBoDu_QrXqQrLWs7JGTsZ4b3gZlzUqJTq-YNjw",
    tags: ["SEC", "C++"],
    links: { live: "#", code: "#" },
    noteType: "Decryption Key",
    classifiedText: "ENCRYPTED SHELL VAULT"
  },
  {
    title: "Flux Engine",
    description: "A high-performance animation library built for modern React applications requiring smooth transitions.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPLxzRT0aTUMFsrJU4gorDWhuawY9yHKFN9nc_bAu1qjU7wiywuONAhyV5c45jHeKJT4rpdEWDYoS-5A0N3jgEnb1edtJSvyqOEzd0UvO2Qc_Qk19RhU5DWvq0P8CKzPvB-ZEs9okX-2rgwziYCu9koEEYtqj-IHs0Bo-VMHzJyjZ74ZBkJ2GGOaMMaIejrpzkDntxi6YfmaNO_baMS7hih4ENTj9AV3PsAy2HAbITz_L-gby6kzz1YsPmTbAgt-_P5PBQStWhvaY",
    tags: ["REACT", "THREE.JS"],
    links: { live: "#", code: "#" },
    noteType: "Blueprint #09",
    classifiedText: "60 FPS RENDER MATRIX"
  },
  {
    title: "CloudLink Pro",
    description: "Enterprise-grade AWS infrastructure automation tool for rapid deployment of serverless environments.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_DUwL2hrlkNyfAm67zRINm8RFG0i5eruf5OASEEdTMN5KDfKIMAlEbPVPINvBxPM9FHGCCBAnk9GA8H8_y4GSG5uty_bZXYbGKcBxN93SzgQRNmMhhYbbqAOdr8zjG0mNvnGb3SfWGoUzwy64XcLPFLPSeXR43dCJvhUcxCs8BP5h63LfgrDGn40GlWkr-mIY9tplxw2dUlZ4niV2HQmZng0GTHQ0xWUF0-HsIZf3fEHV0mpKtoXsT_rPeeY0f7GlUzEkJoQ6BlY",
    tags: ["AWS", "TERRAFORM"],
    links: { live: "#", code: "#" },
    noteType: "Config Sheet",
    classifiedText: "INFRASTRUCTURE MAPPED"
  },
];

// Helper to clamp Web Animation API progress offsets between 0 and 1 inclusive to prevent WAAPI monotonicity runtime errors.
const clampRange = (range: number[]) => range.map(val => Math.max(0, Math.min(1, val)));

// Subcomponent that renders a dynamic sagging red string rope between two push pins.
function RopePath({
  x1,
  y1,
  x2,
  y2,
  scrollYProgress,
  startProgress,
  endProgress,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  scrollYProgress: any;
  startProgress: number;
  endProgress: number;
}) {
  const mid = (startProgress + endProgress) / 2;
  // Dynamic sag: looses at 50px sag, tightens down to 12px as the camera scrolls between pins
  const rawSag = useTransform(scrollYProgress, clampRange([startProgress - 0.1, mid, endProgress + 0.1]), [50, 12, 50]);
  const sagSpring = useSpring(rawSag, { damping: 20, stiffness: 85 });

  // Map the spring value to a quadratic bezier curve path string
  const d = useTransform(sagSpring, (s) => {
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2 + s;
    return `M ${x1} ${y1} Q ${midX} ${midY} ${x2} ${y2}`;
  });

  return (
    <>
      {/* Catenary rope drop shadow */}
      <motion.path
        d={d}
        fill="none"
        stroke="rgba(0,0,0,0.12)"
        strokeWidth="4"
        strokeLinecap="round"
        className="blur-[2px]"
        style={{ transform: "translateY(6px) translateX(3px)" }}
      />
      {/* Main Crimson Rope */}
      <motion.path d={d} fill="none" stroke="#D32F2F" strokeWidth="2.5" strokeLinecap="round" />
    </>
  );
}

export default function ProjectsSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const [isDesktop, setIsDesktop] = useState(true);
  const [trackScrollRange, setTrackScrollRange] = useState(1400);

  // Responsive layout values
  const W = isDesktop ? 360 : 280; // Card width
  const G = isDesktop ? 160 : 80;  // Gap
  const P = isDesktop ? 240 : 80;  // Padding left

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);

      if (targetRef.current) {
        const viewportW = window.innerWidth;
        const totalTrackW = P + 4 * (W + G) - G + P;
        setTrackScrollRange(Math.max(600, totalTrackW - viewportW));
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isDesktop, W, G, P]);

  // Horizontal camera slider motion
  const xCamera = useTransform(scrollYProgress, [0, 1], ["0px", `-${trackScrollRange}px`]);

  // Pin X coordinate relative to the track container
  const pinX_0 = P + W / 2;
  const pinX_1 = P + (W + G) + W / 2;
  const pinX_2 = P + 2 * (W + G) + W / 2;
  const pinX_3 = P + 3 * (W + G) + W / 2;
  const pinY = 120; // Pin height inside track

  // Track active project index based on scroll progress
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCenters = [0.15, 0.45, 0.75, 0.98];

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    let closestIdx = 0;
    let minDiff = Infinity;
    activeCenters.forEach((center, idx) => {
      const diff = Math.abs(latest - center);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = idx;
      }
    });
    if (closestIdx !== activeIndex) {
      setActiveIndex(closestIdx);
    }
  });

  return (
    <section ref={targetRef} id="projects" className="relative h-[300vh] bg-transparent">
      {/* Sticky corkboard container */}
      <div
        className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center py-6 select-none"
        style={{
          backgroundColor: "#D9CDB8", // Warm wood cork shade
          backgroundImage: `
            radial-gradient(#B8A994 1.8px, transparent 1.8px),
            radial-gradient(#A6957F 1.2px, transparent 1.2px)
          `,
          backgroundSize: "20px 20px, 40px 40px",
          backgroundPosition: "0 0, 10px 10px",
        }}
      >
        {/* Title Case Folder Header */}
        <div className="px-5 md:px-20 mb-4 max-w-[1440px] mx-auto w-full flex justify-between items-end shrink-0 z-30">
          <div>
            <div className="brutal-badge bg-[#FFE047] text-xs font-black px-2 py-0.5 border border-black rotate-[-2deg] mb-2 shadow-[2px_2px_0px_0px_#000]">
              CASE FILE: DECLASSIFIED
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 50, skewY: 4 }}
              whileInView={{ opacity: 1, y: 0, skewY: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
              className="font-[var(--font-geist)] text-[36px] md:text-[54px] font-black uppercase text-black leading-none"
            >
              Selected{" "}
              <span className="bg-[#FF6B35] px-4 py-1.5 border-[3px] border-black inline-block rotate-[1.5deg] shadow-[4px_4px_0px_0px_#000000] text-black">
                Work
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30, skewY: 2 }}
              whileInView={{ opacity: 1, y: 0, skewY: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1], delay: 0.1 }}
              className="text-gray-800 font-[var(--font-jetbrains)] text-[12px] md:text-[14px] mt-3 uppercase tracking-wider font-extrabold"
            >
              ✦ Follow the connected strings to investigate ✦
            </motion.p>
          </div>
          <a
            href="#"
            className="hidden md:inline-flex items-center brutal-btn-secondary px-5 py-2.5 text-[14px]"
          >
            ALL CLUES
            <span className="material-symbols-outlined ml-2 text-base">arrow_forward</span>
          </a>
        </div>

        {/* Immersion camera horizontal viewport window */}
        <div className="relative flex items-center w-full h-[540px]">
          {/* Scrollable Track container */}
          <motion.div
            ref={trackRef}
            style={{ x: xCamera }}
            className="flex items-center relative h-full w-max z-10"
          >
            {/* SVG Connecting Ropes Overlay */}
            <svg
              className="absolute inset-0 pointer-events-none z-20"
              style={{
                width: `${P + 4 * (W + G)}px`,
                height: "100%",
              }}
            >
              <RopePath
                x1={pinX_0}
                y1={pinY}
                x2={pinX_1}
                y2={pinY}
                scrollYProgress={scrollYProgress}
                startProgress={0.05}
                endProgress={0.4}
              />
              <RopePath
                x1={pinX_1}
                y1={pinY}
                x2={pinX_2}
                y2={pinY}
                scrollYProgress={scrollYProgress}
                startProgress={0.35}
                endProgress={0.7}
              />
              <RopePath
                x1={pinX_2}
                y1={pinY}
                x2={pinX_3}
                y2={pinY}
                scrollYProgress={scrollYProgress}
                startProgress={0.65}
                endProgress={0.95}
              />
            </svg>

            {/* Rendered Project notebook papers */}
            <div className="flex gap-[160px] pl-[240px] pr-[240px] h-full items-center relative z-30">
              {projects.map((project, i) => {
                const isActive = activeIndex === i;
                const p_i = activeCenters[i];

                // Scroll rotation, scaling and focus fades
                const scrollRotate = useTransform(scrollYProgress, clampRange([p_i - 0.15, p_i, p_i + 0.15]), [-5, 0, 5]);
                const scale = useTransform(scrollYProgress, clampRange([p_i - 0.15, p_i, p_i + 0.15]), [0.94, 1.05, 0.94]);
                const opacity = useTransform(scrollYProgress, clampRange([p_i - 0.2, p_i, p_i + 0.2]), [0.55, 1.0, 0.55]);

                // Pushpin rotation
                const pinRotate = useTransform(scrollYProgress, clampRange([p_i - 0.15, p_i, p_i + 0.15]), [-20, 0, 20]);

                // Physics spring damping for elastic motion
                const springScale = useSpring(scale, { damping: 18, stiffness: 80 });
                const springRotate = useSpring(scrollRotate, { damping: 18, stiffness: 85 });
                const springPinRotate = useSpring(pinRotate, { damping: 18, stiffness: 80 });

                return (
                  <motion.div
                    key={project.title}
                    style={{
                      scale: springScale,
                      rotate: springRotate,
                      opacity,
                    }}
                    className="relative w-[280px] sm:w-[320px] md:w-[360px] shrink-0 h-[430px]"
                  >
                    {/* Metal Thumbtack Anchor */}
                    <motion.div
                      style={{ rotate: springPinRotate }}
                      className="absolute top-[-14px] left-1/2 -translate-x-1/2 z-40 pointer-events-none"
                    >
                      <div className="relative w-5 h-5 flex items-center justify-center">
                        {/* Needle shadow */}
                        <div className="absolute w-4 h-4 bg-black/25 rounded-full blur-[1.5px] translate-x-1.5 translate-y-2.5" />
                        <div className="w-0.5 h-3.5 bg-gray-400 absolute bottom-[-5px] z-10" />
                        {/* Red pin head */}
                        <div className="w-4.5 h-4.5 bg-[#d9383a] rounded-full border border-black z-20 flex items-center justify-center shadow-md">
                          <div className="w-1.5 h-1.5 rounded-full bg-white/40 absolute top-0.5 left-0.5" />
                        </div>
                      </div>
                    </motion.div>

                    {/* Infinite slow swaying card container (simulates wind sway) */}
                    <motion.div
                      animate={{
                        rotate: [-1, 1, -1],
                        y: [-2, 2, -2],
                      }}
                      transition={{
                        duration: 4.5 + i * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      style={{
                        backgroundColor: "#FDFDFD",
                        backgroundImage: `
                          linear-gradient(90deg, transparent 36px, #ff8a8a 36px, #ff8a8a 37px, transparent 37px),
                          linear-gradient(rgba(0, 0, 255, 0.05) 1.5px, transparent 1.5px)
                        `,
                        backgroundSize: "100% 100%, 100% 24px",
                        backgroundPosition: "0 0",
                      }}
                      className="w-full h-full border-[2.5px] border-black/80 shadow-[4px_8px_16px_rgba(0,0,0,0.15)] flex flex-col justify-between p-5 relative overflow-hidden select-none"
                    >
                      {/* Spiral notebook torn punch holes along the top margin */}
                      <div className="absolute top-2 left-0 right-0 flex justify-around px-6 pointer-events-none">
                        {Array.from({ length: 9 }).map((_, holeIdx) => (
                          <div
                            key={holeIdx}
                            className="w-2.5 h-2.5 rounded-full bg-[#D9CDB8] border border-black/20 shadow-inner"
                          />
                        ))}
                      </div>

                      {/* Notebook content wrapper */}
                      <div className="flex-1 flex flex-col mt-4">
                        {/* Folder note type */}
                        <div className="flex justify-between items-center mb-3 pl-8">
                          <span className="font-[var(--font-jetbrains)] text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                            {project.noteType}
                          </span>
                          <span className="font-[var(--font-jetbrains)] text-[11px] font-black text-black">
                            REF: 0{i + 1}
                          </span>
                        </div>

                        {/* Image reveal mask animation */}
                        <motion.div
                          animate={{
                            clipPath: isActive ? "inset(0% 0% 0% 0%)" : "inset(0% 100% 0% 0%)",
                          }}
                          transition={{ duration: 0.7, ease: "easeInOut" }}
                          className="w-full h-40 border-[2px] border-black bg-gray-100 overflow-hidden relative shadow-inner"
                        >
                          <img
                            alt={project.title}
                            className="w-full h-full object-cover pointer-events-none"
                            src={project.image}
                          />
                        </motion.div>

                        {/* Paper body context */}
                        <div className="mt-4 pl-8 flex-1 flex flex-col">
                          {/* Title */}
                          <h3 className="font-[var(--font-geist)] text-[18px] md:text-[20px] font-black uppercase text-black leading-tight mb-2">
                            {project.title}
                          </h3>

                          {/* Description */}
                          <p className="font-[var(--font-inter)] text-[12px] md:text-[13px] leading-relaxed text-gray-700 font-medium">
                            {project.description}
                          </p>
                        </div>
                      </div>

                      {/* Handwritten drawn labels */}
                      <motion.div
                        animate={{
                          opacity: isActive ? 1 : 0,
                          scale: isActive ? 1 : 0.85,
                          rotate: isActive ? -4 : 0,
                        }}
                        transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
                        className="absolute bottom-16 right-4 font-['Caveat',cursive] text-[20px] leading-none text-[#D32F2F] border-2 border-dashed border-[#D32F2F]/30 px-3 py-1 rounded tracking-wide uppercase pointer-events-none font-bold"
                      >
                        {project.classifiedText}
                      </motion.div>

                      {/* Custom Tags & Slide-Up Buttons */}
                      <div className="pl-8 pt-3 border-t border-black/10 shrink-0">
                        {/* Tags */}
                        <div className="flex gap-2 mb-2">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="font-[var(--font-jetbrains)] text-[9px] font-extrabold text-black uppercase border border-black/50 px-2 py-0.5"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Action buttons sliding up */}
                        <motion.div
                          animate={{
                            y: isActive ? 0 : 25,
                            opacity: isActive ? 1 : 0,
                          }}
                          transition={{ duration: 0.4, ease: "easeOut", delay: 0.08 }}
                          className="flex gap-3 mt-1.5"
                        >
                          <a
                            href={project.links.live}
                            className="brutal-btn-primary px-3 py-1.5 text-[10px] font-extrabold uppercase flex items-center gap-1.5 shadow-[2px_2px_0px_0px_#000]"
                          >
                            <span className="material-symbols-outlined text-xs font-black">
                              link
                            </span>
                            LIVE DEMO
                          </a>
                          <a
                            href={project.links.code}
                            className="brutal-btn-secondary px-3 py-1.5 text-[10px] font-extrabold uppercase flex items-center gap-1.5 shadow-[2px_2px_0px_0px_#000]"
                          >
                            <span className="material-symbols-outlined text-xs font-black">
                              code
                            </span>
                            SOURCE
                          </a>
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
