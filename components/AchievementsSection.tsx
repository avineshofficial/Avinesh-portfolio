"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Particle helper ──────────────────────────────────────────────────────────
const PARTICLE_COUNT = 10;

// ─── Achievement Data ─────────────────────────────────────────────────────────
const achievements = [
  {
    id: "aws",
    title: "AWS Certified",
    subtitle: "Cloud Solutions Architect Associate",
    icon: "cloud",
    stampIcon: "verified",
    color: "#A78BFA",
    year: "2023",
    issuer: "Amazon Web Services",
  },
  {
    id: "hackathon",
    title: "Hackathon Winner",
    subtitle: "First Place · AI for Good 2023",
    icon: "trophy",
    stampIcon: "military_tech",
    color: "#FF6B35",
    year: "2023",
    issuer: "TechFest Global",
  },
  {
    id: "google",
    title: "Google AI",
    subtitle: "Deep Learning Specialization",
    icon: "psychology",
    stampIcon: "workspace_premium",
    color: "#38BDF8",
    year: "2024",
    issuer: "Google DeepMind",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function AchievementsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const progressBarFillRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stampRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressFillRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lockIconRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const glowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const unlockedBannerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scanLineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconBoxRefs = useRef<(HTMLDivElement | null)[]>([]);
  const particleRefs = useRef<(HTMLDivElement | null)[][]>(
    achievements.map(() => [])
  );
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const N = achievements.length;

      // ── Master timeline pinned to scroll ──────────────────────────────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${window.innerHeight * (N + 1.5)}`,
          pin: true,
          scrub: 0.9,
          anticipatePin: 1,
        },
      });

      // ── Badge pop-in ─────────────────────────────────────────────────
      tl.fromTo(
        badgeRef.current,
        { scale: 0.6, opacity: 0, rotate: -6 },
        { scale: 1, opacity: 1, rotate: 0, duration: 0.2, ease: "back.out(2)" },
        0
      );

      // ── Heading stagger entrance ─────────────────────────────────────
      tl.fromTo(
        headingRef.current,
        { y: 50, opacity: 0, skewY: 4 },
        { y: 0, opacity: 1, skewY: 0, duration: 0.28, ease: "power3.out" },
        0.05
      );

      // ── Locked scan-line looping on all cards before unlock ──────────
      // (pure CSS handles the loop; GSAP removes it post-unlock)

      // ── Sequential unlock per card ────────────────────────────────────
      achievements.forEach((a, i) => {
        const card = cardRefs.current[i];
        const stamp = stampRefs.current[i];
        const progressFill = progressFillRefs.current[i];
        const lockIcon = lockIconRefs.current[i];
        const glow = glowRefs.current[i];
        const banner = unlockedBannerRefs.current[i];
        const scanLine = scanLineRefs.current[i];
        const iconBox = iconBoxRefs.current[i];
        const particles = particleRefs.current[i];
        const dot = dotRefs.current[i];

        if (!card) return;

        const segStart = 0.28 + i * (0.72 / N);
        const segEnd = segStart + 0.72 / N;
        const mid = (segStart + segEnd) / 2;

        // ── Pre-unlock: scan-line stops ──────────────────────────────
        if (scanLine) {
          tl.to(scanLine, { opacity: 0, duration: 0.05 }, segStart);
        }

        // ── Step 1: Card rises + de-saturates ────────────────────────
        tl.to(
          card,
          {
            y: 0,
            rotateX: 0,
            filter: "grayscale(0%) brightness(1)",
            opacity: 1,
            duration: 0.22,
            ease: "back.out(1.8)",
          },
          segStart
        );

        // ── Step 2: Glow ring flash ───────────────────────────────────
        if (glow) {
          tl
            .to(
              glow,
              { opacity: 1, scale: 1, duration: 0.1, ease: "power2.out" },
              segStart + 0.04
            )
            .to(
              glow,
              { opacity: 0, scale: 1.4, duration: 0.18, ease: "power2.in" },
              segStart + 0.14
            );
        }

        // ── Step 3: Lock fades & shrinks ─────────────────────────────
        if (lockIcon) {
          tl.to(
            lockIcon,
            { opacity: 0, scale: 0, rotate: 45, duration: 0.1, ease: "back.in(3)" },
            segStart + 0.06
          );
        }

        // ── Step 4: Icon box bounces ──────────────────────────────────
        if (iconBox) {
          tl
            .to(iconBox, { scale: 1.3, duration: 0.08, ease: "power2.out" }, segStart + 0.1)
            .to(iconBox, { scale: 1, duration: 0.14, ease: "elastic.out(1.4, 0.5)" }, segStart + 0.18);
        }

        // ── Step 5: Progress bar sweeps ───────────────────────────────
        if (progressFill) {
          tl.fromTo(
            progressFill,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.22, ease: "power2.inOut" },
            segStart + 0.08
          );
        }

        // ── Step 6: Particles burst outward ───────────────────────────
        particles.forEach((p, pi) => {
          if (!p) return;
          const angle = (pi / PARTICLE_COUNT) * 360;
          const dist = 50 + Math.random() * 60;
          const rad = (angle * Math.PI) / 180;
          tl
            .fromTo(
              p,
              { x: 0, y: 0, scale: 0, opacity: 1 },
              {
                x: Math.cos(rad) * dist,
                y: Math.sin(rad) * dist,
                scale: 1,
                opacity: 0,
                duration: 0.28,
                ease: "power2.out",
              },
              segStart + 0.05
            );
        });

        // ── Step 7: "UNLOCKED" banner stamps in then fades ────────────
        if (banner) {
          tl
            .fromTo(
              banner,
              { scale: 1.8, opacity: 0, rotate: -8 },
              { scale: 1, opacity: 1, rotate: -6, duration: 0.14, ease: "back.out(3)" },
              mid - 0.06
            )
            .to(
              banner,
              { opacity: 0, y: -10, duration: 0.18, ease: "power2.in" },
              mid + 0.12
            );
        }

        // ── Step 8: Stamp drops in ────────────────────────────────────
        if (stamp) {
          tl.fromTo(
            stamp,
            { scale: 2.8, opacity: 0, rotate: -25 },
            {
              scale: 1,
              opacity: 1,
              rotate: -12,
              duration: 0.2,
              ease: "back.out(2.8)",
            },
            mid - 0.04
          );
        }

        // ── Step 9: Bottom dot fills ──────────────────────────────────
        if (dot) {
          tl
            .to(dot, { scale: 1.8, duration: 0.08, ease: "power2.out" }, segStart + 0.12)
            .to(dot, {
              scale: 1,
              backgroundColor: a.color,
              borderColor: "#000000",
              duration: 0.1,
              ease: "elastic.out(1.5, 0.5)",
            }, segStart + 0.2);
        }

        // ── Step 10: Master progress bar ─────────────────────────────
        if (progressBarFillRef.current) {
          tl.to(
            progressBarFillRef.current,
            { scaleX: (i + 1) / N, duration: 0.22, ease: "power2.inOut" },
            segStart + 0.1
          );
        }

        // ── Step 11: Counter ticks up ─────────────────────────────────
        if (counterRef.current) {
          const el = counterRef.current;
          tl.to(
            {},
            {
              duration: 0.1,
              onUpdate() { el.textContent = String(i + 1); },
            },
            segStart + 0.15
          );
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="achievements"
      className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center"
      style={{ backgroundColor: "#FAF6EE" }}
    >
      {/* ── Dot-grid background ────────────────────────────────────────── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(0,0,0,0.12) 1.5px, transparent 1.5px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* ── Content wrapper ────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-[1100px] px-5 md:px-10 flex flex-col gap-8">

        {/* ── Section heading ───────────────────────────────────────────── */}
        <div className="flex flex-col items-center gap-3 text-center">
          {/* Badge */}
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 border-[2px] border-black px-4 py-1.5 bg-white"
            style={{ boxShadow: "2px 2px 0px 0px #000000", opacity: 0 }}
          >
            <span className="material-symbols-outlined text-[14px] text-black">
              workspace_premium
            </span>
            <span className="font-[var(--font-jetbrains)] text-[10px] font-bold uppercase tracking-[0.3em] text-black/70">
              Earned through dedication
            </span>
          </div>

          {/* Heading */}
          <h2
            ref={headingRef}
            className="font-[var(--font-geist)] text-[36px] md:text-[52px] font-black uppercase tracking-tight text-black leading-tight"
            style={{ opacity: 0, transform: "translateY(50px)" }}
          >
            Achievements{" "}
            <span
              className="inline-block px-3 py-1 border-[3px] border-black rotate-[-1deg] bg-[#FFE047]"
              style={{ boxShadow: "4px 4px 0px 0px #000000" }}
            >
              &amp; Certs
            </span>
          </h2>
        </div>

        {/* ── Cards grid ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map((a, i) => (
            <div
              key={a.id}
              className="relative"
              style={{ perspective: "900px" }}
            >
              {/* Glow ring */}
              <div
                ref={(el) => { glowRefs.current[i] = el; }}
                className="absolute inset-[-10px] z-0 pointer-events-none"
                style={{
                  border: `3px solid ${a.color}`,
                  opacity: 0,
                  boxShadow: `0 0 40px 12px ${a.color}77`,
                }}
              />

              {/* Card */}
              <div
                ref={(el) => { cardRefs.current[i] = el; }}
                className="relative bg-white border-[3px] border-black overflow-visible flex flex-col justify-between"
                style={{
                  opacity: 0.3,
                  filter: "grayscale(85%) brightness(0.8)",
                  transform: "translateY(36px) rotateX(18deg)",
                  transformOrigin: "top center",
                  transformStyle: "preserve-3d",
                  boxShadow: "4px 4px 0px 0px #000000",
                  minHeight: "290px",
                }}
              >
                {/* Colour top bar */}
                <div className="h-[6px] w-full shrink-0" style={{ backgroundColor: a.color }} />

                {/* Scan-line overlay on locked card */}
                <div
                  ref={(el) => { scanLineRefs.current[i] = el; }}
                  className="absolute inset-0 z-20 pointer-events-none overflow-hidden"
                  style={{ borderRadius: 0 }}
                >
                  <div
                    className="absolute left-0 w-full h-[3px] opacity-40"
                    style={{
                      backgroundColor: a.color,
                      animation: `scanLine 1.8s linear infinite`,
                      animationDelay: `${i * 0.55}s`,
                    }}
                  />
                </div>

                {/* Particle burst origin (center of card) */}
                <div className="absolute top-1/2 left-1/2 z-30 pointer-events-none" style={{ transform: "translate(-50%,-50%)" }}>
                  {Array.from({ length: PARTICLE_COUNT }).map((_, pi) => (
                    <div
                      key={pi}
                      ref={(el) => { particleRefs.current[i][pi] = el; }}
                      className="absolute w-2 h-2 border-[2px] border-black"
                      style={{
                        backgroundColor: pi % 2 === 0 ? a.color : "#FFE047",
                        opacity: 0,
                        top: "-4px",
                        left: "-4px",
                      }}
                    />
                  ))}
                </div>

                {/* Card body */}
                <div className="p-6 flex flex-col gap-4 flex-1">
                  {/* Icon row */}
                  <div className="flex items-center justify-between">
                    <div
                      ref={(el) => { iconBoxRefs.current[i] = el; }}
                      className="w-12 h-12 border-[3px] border-black flex items-center justify-center"
                      style={{
                        backgroundColor: a.color,
                        boxShadow: "3px 3px 0px 0px #000000",
                      }}
                    >
                      <span className="material-symbols-outlined text-black text-2xl font-black">
                        {a.icon}
                      </span>
                    </div>

                    {/* Lock icon */}
                    <span
                      ref={(el) => { lockIconRefs.current[i] = el; }}
                      className="material-symbols-outlined text-black/25 text-[28px]"
                    >
                      lock
                    </span>
                  </div>

                  {/* Title */}
                  <div>
                    <h3 className="font-[var(--font-geist)] text-[22px] font-black uppercase text-black leading-tight mb-0.5">
                      {a.title}
                    </h3>
                    <p className="font-[var(--font-jetbrains)] text-[10px] font-bold uppercase tracking-[0.14em] text-black/50">
                      {a.subtitle}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="w-full h-[2px] bg-black" />

                  {/* Meta row */}
                  <div className="flex items-center justify-between">
                    <span className="font-[var(--font-jetbrains)] text-[9px] font-bold uppercase tracking-widest text-black/40">
                      {a.issuer}
                    </span>
                    <span
                      className="font-[var(--font-jetbrains)] text-[9px] font-bold px-2 py-0.5 border-[2px] border-black text-black"
                      style={{
                        backgroundColor: a.color,
                        boxShadow: "1.5px 1.5px 0px 0px #000000",
                      }}
                    >
                      {a.year}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div
                    className="w-full h-3 border-[2px] border-black overflow-hidden"
                    style={{ boxShadow: "2px 2px 0px 0px #000000" }}
                  >
                    <div
                      ref={(el) => { progressFillRefs.current[i] = el; }}
                      className="h-full origin-left"
                      style={{
                        backgroundColor: a.color,
                        transform: "scaleX(0)",
                        width: "100%",
                      }}
                    />
                  </div>
                </div>

                {/* "UNLOCKED" flash banner */}
                <div
                  ref={(el) => { unlockedBannerRefs.current[i] = el; }}
                  className="absolute top-1/2 left-1/2 z-40 pointer-events-none select-none"
                  style={{
                    transform: "translate(-50%, -50%) rotate(-6deg)",
                    opacity: 0,
                  }}
                >
                  <div
                    className="font-[var(--font-geist)] font-black uppercase text-black text-[13px] tracking-[0.22em] px-3 py-1.5 border-[3px] border-black whitespace-nowrap"
                    style={{
                      backgroundColor: a.color,
                      boxShadow: "3px 3px 0px 0px #000000",
                    }}
                  >
                    ✦ UNLOCKED ✦
                  </div>
                </div>

                {/* Certification stamp */}
                <div
                  ref={(el) => { stampRefs.current[i] = el; }}
                  className="absolute bottom-4 right-4 w-[62px] h-[62px] flex items-center justify-center pointer-events-none select-none"
                  style={{
                    opacity: 0,
                    rotate: "-12deg",
                    border: `3px solid ${a.color}`,
                    boxShadow: `0 0 0 2px #000000, 2px 2px 0 2px #000000`,
                    backgroundColor: "white",
                  }}
                >
                  <span
                    className="material-symbols-outlined text-[26px]"
                    style={{ color: a.color }}
                  >
                    {a.stampIcon}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Master progress bar ───────────────────────────────────────── */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-4 w-full max-w-[500px]">
            <div className="flex items-center gap-1.5">
              <span
                ref={counterRef}
                className="font-[var(--font-geist)] text-[18px] font-black text-black"
              >
                0
              </span>
              <span className="font-[var(--font-jetbrains)] text-[9px] font-bold uppercase tracking-widest text-black/40">
                / {achievements.length} unlocked
              </span>
            </div>

            {/* Bar */}
            <div className="flex-1 h-[4px] bg-black/10 overflow-hidden border border-black/20">
              <div
                ref={progressBarFillRef}
                className="h-full origin-left bg-black"
                style={{ transform: "scaleX(0)" }}
              />
            </div>

            <span className="font-[var(--font-jetbrains)] text-[9px] font-bold uppercase tracking-widest text-black/40">
              complete
            </span>
          </div>

          {/* Milestone dots */}
          <div className="flex items-center gap-6">
            {achievements.map((a, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <div
                  ref={(el) => { dotRefs.current[i] = el; }}
                  className="w-3 h-3 border-[2px] border-black/20"
                  style={{ backgroundColor: "transparent" }}
                />
                <span className="font-[var(--font-jetbrains)] text-[7px] font-bold uppercase tracking-wider text-black/40">
                  {a.id}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Scan-line keyframe ────────────────────────────────────────── */}
      <style>{`
        @keyframes scanLine {
          0%   { top: -4px; opacity: 0; }
          10%  { opacity: 0.5; }
          90%  { opacity: 0.5; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </section>
  );
}
