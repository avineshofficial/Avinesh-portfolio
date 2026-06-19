"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import AnimatedSection from "./AnimatedSection";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Milestones ───────────────────────────────────────────────────────────────
const milestones = [
  {
    year: "2023 – PRESENT",
    role: "Lead Developer",
    company: "High-Tech Ventures",
    color: "#FFE047", // Primary yellow
    accent: "#FF6B35",
    icon: "rocket_launch",
    description:
      "Architecting scalable AI solutions and cloud-native applications. Leading cross-functional teams to ship production-grade systems at scale.",
    tags: ["AI/ML", "Cloud Native", "Architecture"],
  },
  {
    year: "2021 – 2023",
    role: "Software Engineer",
    company: "Product Studio",
    color: "#FF6B35", // Orange
    accent: "#FFE047",
    icon: "code",
    description:
      "Specialized in full-stack Python development and large language model integration into consumer-facing products used by thousands daily.",
    tags: ["Python", "LLMs", "Full-Stack"],
  },
  {
    year: "2019 – 2021",
    role: "Junior Developer",
    company: "Digital Agency",
    color: "#A78BFA", // Purple
    accent: "#00F5D4",
    icon: "terminal",
    description:
      "Built responsive web applications and contributed to open-source projects. Sharpened core skills in React, TypeScript, and modern CSS.",
    tags: ["React", "TypeScript", "CSS"],
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function TimelineSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const N = milestones.length;

      // Horizontal spacing between card centers, in px (responsive to viewport)
      const getSpacing = () => Math.min(window.innerWidth * 0.34, 460);

      // ── Main update loop (driven by scroll progress 0 → 1) ─────────
      const update = (progress: number) => {
        const activePos = progress * (N - 1);
        const spacing = getSpacing();

        // 1. Giant background word — slow parallax pan
        if (bgTextRef.current) {
          gsap.set(bgTextRef.current, {
            xPercent: -10 - progress * 18,
          });
        }

        // 2. Progress bar
        if (progressFillRef.current) {
          gsap.set(progressFillRef.current, { scaleX: progress });
        }

        // 3. Per-card carousel transform
        milestones.forEach((m, i) => {
          const card = cardRefs.current[i];
          if (!card) return;

          const offset = i - activePos;
          const absOffset = Math.abs(offset);

          if (absOffset > 2.4) {
            gsap.set(card, { autoAlpha: 0 });
            return;
          }

          const clamped = Math.min(absOffset, 1.4);
          const scale = 1 - clamped * 0.32;
          const rotation = offset * -16;
          const opacity = absOffset > 1.6 ? 0 : 1 - clamped / 1.6;
          const x = offset * spacing;
          const y = clamped * 18;
          const zIndex = Math.round((2 - clamped) * 10);

          gsap.set(card, {
            x,
            y,
            scale,
            rotation,
            autoAlpha: opacity,
            zIndex,
            transformOrigin: "center center",
          });

          card.style.boxShadow =
            clamped < 0.15
              ? `6px 6px 0px 0px #000000`
              : "4px 4px 0px 0px #000000";
        });

        // 4. Bottom milestone labels
        labelRefs.current.forEach((lbl, i) => {
          if (!lbl) return;
          const offset = i - activePos;
          const pr = Math.max(0, 1 - Math.abs(offset));
          gsap.set(lbl, {
            opacity: 0.3 + pr * 0.7,
            scale: 0.8 + pr * 0.22,
          });
        });
      };

      // ── ScrollTrigger ──────────────────────────────────────────────
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${window.innerHeight * (N + 0.5)}`,
        pin: true,
        scrub: 1.2,
        anticipatePin: 1,
        onUpdate: (self) => update(self.progress),
      });

      update(0.001);
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: "#FAF6EE" }}
    >
      {/* ── Dot-grid overlay — matches site body texture exactly ──── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(0,0,0,0.12) 1.5px, transparent 1.5px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* ── Giant background word (parallax) ────────────────────────  */}
      <div
        ref={bgTextRef}
        className="absolute inset-0 z-[1] flex items-center justify-center pointer-events-none select-none"
      >
        <span
          className="font-[var(--font-geist)] font-black uppercase text-black whitespace-nowrap"
          style={{
            fontSize: "clamp(120px, 22vw, 260px)",
            opacity: 0.04,
            letterSpacing: "-0.04em",
          }}
        >
          JOURNEY
        </span>
      </div>

      {/* ── Section header ───────────────────────────────────────── */}
      <div className="absolute top-0 left-0 w-full z-30 pt-10 pointer-events-none">
        <AnimatedSection>
          <div className="flex flex-col items-center gap-3">
            {/* Badge */}
            <div
              className="flex items-center gap-2 border-[2px] border-black px-4 py-1.5 bg-white"
              style={{ boxShadow: "2px 2px 0px 0px #000000" }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
              <span className="font-[var(--font-jetbrains)] text-[10px] font-bold uppercase tracking-[0.3em] text-black/70">
                Scroll to Travel the Journey
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
            </div>

            {/* Heading */}
            <h2 className="font-[var(--font-geist)] text-[40px] leading-tight tracking-[-0.04em] font-black md:text-[56px] text-center text-black uppercase">
              Career{" "}
              <span
                className="inline-block px-4 py-1.5 border-[3px] border-black rotate-[-1deg] bg-[#FFE047]"
                style={{ boxShadow: "4px 4px 0px 0px #000000" }}
              >
                Journey
              </span>
            </h2>
          </div>
        </AnimatedSection>
      </div>

      {/* ── Carousel stage ───────────────────────────────────────── */}
      <div
        ref={stageRef}
        className="relative z-20 w-full h-full flex items-center justify-center"
        style={{ perspective: "1400px" }}
      >
        {milestones.map((m, i) => (
          <div
            key={i}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="absolute"
            style={{
              width: "clamp(260px, 24vw, 320px)",
              willChange: "transform, opacity",
            }}
          >
            {/* ── Card ─────────────────────────────────────────── */}
            <div className="relative bg-white border-[3px] border-black overflow-hidden">
              {/* Color-coded top bar */}
              <div className="h-[6px] w-full" style={{ backgroundColor: m.color }} />

              {/* Corner icon badge */}
              <div
                className="absolute top-0 right-0 w-[52px] h-[52px] flex items-end justify-start pl-2 pb-1 border-l-[3px] border-b-[3px] border-black"
                style={{ backgroundColor: m.color }}
              >
                <span className="material-symbols-outlined text-black text-[18px]">
                  {m.icon}
                </span>
              </div>

              <div className="p-6 pt-5">
                {/* Year badge */}
                <span
                  className="font-[var(--font-jetbrains)] text-[9.5px] font-bold uppercase tracking-[0.18em] inline-block px-2.5 py-1 border-[2px] border-black mb-4 text-black"
                  style={{
                    backgroundColor: m.color,
                    boxShadow: "2px 2px 0px 0px #000000",
                  }}
                >
                  {m.year}
                </span>

                {/* Role */}
                <h3 className="font-[var(--font-geist)] text-[21px] font-black uppercase text-black leading-tight mb-0.5">
                  {m.role}
                </h3>

                {/* Company */}
                <p className="font-[var(--font-jetbrains)] text-[9.5px] uppercase tracking-[0.15em] text-black/45 font-bold mb-4">
                  @ {m.company}
                </p>

                {/* Divider */}
                <div className="w-full h-[2px] bg-black mb-4" />

                {/* Description */}
                <p className="text-black/65 font-[var(--font-inter)] text-[12.5px] leading-relaxed mb-5">
                  {m.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {m.tags.map((tag, ti) => (
                    <span
                      key={ti}
                      className="font-[var(--font-jetbrains)] text-[9px] font-bold uppercase border-[2px] border-black px-2 py-0.5 text-black"
                      style={{
                        backgroundColor: ti === 0 ? m.color : "transparent",
                        boxShadow: "1.5px 1.5px 0px 0px #000000",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Large watermark number */}
                <div
                  className="absolute bottom-4 right-5 font-[var(--font-geist)] text-[42px] font-black leading-none select-none pointer-events-none"
                  style={{ color: "#000000", opacity: 0.06 }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Bottom progress bar ──────────────────────────────────── */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-4">
        {/* Milestone labels with dots */}
        <div className="flex items-center gap-6">
          {milestones.map((m, i) => (
            <div
              key={i}
              ref={(el) => {
                labelRefs.current[i] = el;
              }}
              className="flex flex-col items-center gap-1.5"
              style={{ opacity: 0.3 }}
            >
              <div
                className="w-2.5 h-2.5 border-[2px] border-black"
                style={{ backgroundColor: m.color }}
              />
              <span className="font-[var(--font-jetbrains)] text-[8px] font-bold uppercase tracking-wider text-black whitespace-nowrap">
                {m.role.split(" ")[0]}
              </span>
            </div>
          ))}
        </div>

        {/* Scroll progress bar */}
        <div className="w-[200px] h-[3px] bg-black/15 overflow-hidden border border-black/20">
          <div
            ref={progressFillRef}
            className="h-full origin-left bg-black"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </section>
  );
}