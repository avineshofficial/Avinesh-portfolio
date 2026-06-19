"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useScroll, useSpring, useMotionValueEvent, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const navLinks = [
  { href: "#about", label: "ABOUT", icon: "person", color: "#FFE047" },
  { href: "#skills", label: "SKILLS", icon: "terminal", color: "#FF6B35" },
  { href: "#projects", label: "PROJECTS", icon: "folder", color: "#A78BFA" },
  { href: "#timeline", label: "CAREER", icon: "work", color: "#38BDF8" },
  { href: "#achievements", label: "ACHIEVEMENTS", icon: "local_police", color: "#FFE047" },
  { href: "#contact", label: "CONTACT", icon: "mail", color: "#FF6B35" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const navRef = useRef<HTMLElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollPercent(Math.round(latest * 100));
  });

  useGSAP(() => {
    if (navRef.current) {
      gsap.from(navRef.current, {
        y: -120,
        opacity: 0,
        duration: 1.4,
        ease: "elastic.out(1, 0.5)",
        delay: 0.3,
      });
    }
    if (mobileNavRef.current) {
      gsap.from(mobileNavRef.current, {
        y: 120,
        opacity: 0,
        duration: 1.4,
        ease: "elastic.out(1, 0.5)",
        delay: 0.3,
      });
    }
  }, []);

  // Magnetic hover
  const handleMouseMove = useCallback((e: React.MouseEvent, index: number) => {
    const el = iconRefs.current[index];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    gsap.to(el, {
      x: (e.clientX - cx) * 0.4,
      y: (e.clientY - cy) * 0.4,
      scale: 1.25,
      duration: 0.3,
      ease: "power2.out",
    });
  }, []);

  const handleMouseLeave = useCallback((index: number) => {
    const el = iconRefs.current[index];
    if (!el) return;
    gsap.to(el, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: "elastic.out(1, 0.4)",
    });
    setHoveredIndex(null);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const secs = document.querySelectorAll("section[id]");
      let cur = "";
      secs.forEach((s) => {
        const rect = s.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2) {
          cur = s.getAttribute("id") || "";
        }
      });
      setActiveSection(cur);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const t = document.querySelector(href);
    if (t) {
      t.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    }
  };

  const outerClipPath = "polygon(16px 0%, calc(100% - 16px) 0%, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0% calc(100% - 16px), 0% 16px)";
  const innerClipPath = "polygon(14px 0%, calc(100% - 14px) 0%, 100% 14px, 100% calc(100% - 14px), calc(100% - 14px) 100%, 14px 100%, 0% calc(100% - 14px), 0% 14px)";

  const mobOuterClip = "polygon(12px 0%, calc(100% - 12px) 0%, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0% calc(100% - 12px), 0% 12px)";
  const mobInnerClip = "polygon(10px 0%, calc(100% - 10px) 0%, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0% calc(100% - 10px), 0% 10px)";

  return (
    <>
      {/* ═══════════ DESKTOP VIEW ═══════════ */}
      <motion.nav
        ref={navRef}
        className="hidden lg:flex fixed left-1/2 -translate-x-1/2 z-50 flex-col items-center"
        animate={{
          top: scrolled ? "16px" : "32px",
          width: scrolled ? "900px" : "1050px"
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        style={{ filter: "drop-shadow(6px 6px 0px rgba(0,0,0,1))" }}
      >
        {/* Main Chamfered Box */}
        <div className="relative w-full z-10">
          <div className="bg-black p-[3px]" style={{ clipPath: outerClipPath }}>
            <div 
              className="bg-[#FFFDF5]/95 backdrop-blur-md w-full relative flex items-center justify-between"
              style={{ clipPath: innerClipPath }}
            >
              <div className={`flex items-center justify-between w-full transition-all duration-300 ${scrolled ? "py-2 px-6" : "py-3 px-8"}`}>
                
                {/* Logo */}
                <div className="relative z-10 shrink-0">
                  <AnimatePresence>
                    {!scrolled && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ delay: 1 }}
                        className="absolute -top-3 -right-3 text-[#FF6B35] font-black text-xl rotate-12 select-none pointer-events-none"
                      >
                        ✦
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className={`block font-[var(--font-geist)] font-black text-black bg-[#FFE047] border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-[-2deg] transition-all hover:rotate-0 hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ${scrolled ? "text-[16px] px-4 py-1" : "text-[20px] px-6 py-1.5"}`}
                  >
                    AVINESH
                  </a>
                </div>

                {/* Nav Links */}
                <div className="flex-1 flex items-center justify-center gap-2 px-4">
                  {navLinks.map((link, i) => {
                    const isActive = activeSection === link.href.replace("#", "");
                    const isHovered = hoveredIndex === i;

                    return (
                      <React.Fragment key={link.href}>
                        <div className="flex items-center relative">
                          <div className="relative flex flex-col items-center">
                            {/* Colored dot above */}
                            <motion.div 
                              className="absolute -top-2.5 w-2 h-2 rounded-full border-[1.5px] border-black z-20"
                              style={{ backgroundColor: link.color }}
                              animate={{ y: isActive ? -4 : 0, scale: isActive ? 1.2 : 1 }}
                            />

                            {/* Link Item */}
                            <a
                              href={link.href}
                              onClick={(e) => handleNavClick(e, link.href)}
                              onMouseEnter={() => setHoveredIndex(i)}
                              onMouseMove={(e) => handleMouseMove(e, i)}
                              onMouseLeave={() => handleMouseLeave(i)}
                              className={`relative flex flex-col items-center justify-center cursor-pointer group z-10 ${scrolled ? "px-2 py-1.5" : "px-3 py-2"}`}
                            >
                              {/* Active Background Box */}
                              {isActive && (
                                <motion.div
                                  layoutId="activeBoxDesk"
                                  className="absolute inset-0 bg-[#FFE047] border-[2px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] -z-10"
                                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                                  style={{ borderRadius: "4px" }}
                                >
                                  {/* Triangle pointing down */}
                                  <div className="absolute -bottom-[8px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-black">
                                    <div className="absolute -top-[8px] -left-[4px] w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-[#FFE047]" />
                                  </div>
                                </motion.div>
                              )}

                              {/* Action lines for active */}
                              <AnimatePresence>
                                {isActive && (
                                  <motion.div 
                                    initial={{ opacity: 0, scale: 0.5, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.5, y: 10 }}
                                    className="absolute -top-6 left-1/2 -translate-x-1/2 flex gap-1 text-black font-black text-xs pointer-events-none select-none"
                                  >
                                    <motion.span animate={{ y: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 0.5 }}>\</motion.span>
                                    <motion.span animate={{ y: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 0.5, delay: 0.1 }}>|</motion.span>
                                    <motion.span animate={{ y: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 0.5, delay: 0.2 }}>/</motion.span>
                                  </motion.div>
                                )}
                              </AnimatePresence>

                              <div
                                ref={(el) => { iconRefs.current[i] = el; }}
                                className={`transition-all duration-200 ${scrolled ? "text-[18px]" : "text-[22px]"}`}
                              >
                                <span
                                  className={`material-symbols-outlined transition-colors duration-200 ${isActive || isHovered ? "text-black" : "text-black/60"}`}
                                  style={{
                                    fontVariationSettings: isActive || isHovered ? "'FILL' 1, 'wght' 600" : "'FILL' 0, 'wght' 400"
                                  }}
                                >
                                  {link.icon}
                                </span>
                              </div>

                              <span className={`font-[var(--font-jetbrains)] uppercase tracking-wide transition-all mt-1 ${isActive ? "font-black text-black" : isHovered ? "font-bold text-black" : "font-semibold text-black/60"} ${scrolled ? "text-[8px]" : "text-[9px]"}`}>
                                {link.label}
                              </span>
                            </a>
                          </div>
                        </div>

                        {/* Spacer Dots */}
                        {i < navLinks.length - 1 && (
                          <div className="flex gap-[3px] mx-2 pointer-events-none select-none">
                            <span className="w-[3px] h-[3px] bg-black/20 rounded-full" />
                            <span className="w-[3px] h-[3px] bg-black/20 rounded-full" />
                            <span className="w-[3px] h-[3px] bg-black/20 rounded-full" />
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>

                {/* CTA */}
                <div className="shrink-0 relative z-10">
                  <a
                    href="#contact"
                    onClick={(e) => handleNavClick(e, "#contact")}
                    className={`flex items-center gap-1 font-[var(--font-jetbrains)] font-bold text-black bg-[#FF6B35] border-[2px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] active:translate-y-[0px] active:translate-x-[0px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] ${scrolled ? "text-[10px] px-3 py-1.5" : "text-[12px] px-4 py-2"}`}
                    style={{ borderRadius: "4px" }}
                  >
                    LET&apos;S TALK
                    <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
                  </a>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar Underneath */}
        <div className="relative w-[82%] h-[16px] flex items-stretch -mt-[3px] z-0">
           {/* Label */}
           <div className="bg-black text-[#FFFDF5] font-[var(--font-jetbrains)] font-bold text-[8px] tracking-wider px-3 flex items-center justify-center border-[2px] border-black border-t-0">
             YOUR JOURNEY
           </div>
           {/* Bar */}
           <div className="flex-1 bg-black relative overflow-hidden flex items-center px-[2px] pb-[2px] border-b-[2px] border-black">
              <motion.div 
                className="h-full bg-[#FFE047] origin-left"
                style={{
                  scaleX,
                  width: "100%",
                  backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.4), rgba(255,255,255,0.4) 6px, transparent 6px, transparent 12px)"
                }}
              />
           </div>
           {/* Percent */}
           <div className="bg-[#FFFDF5] text-black font-[var(--font-jetbrains)] font-bold text-[8px] px-2 flex items-center justify-center border-[2px] border-black border-t-0 -ml-[2px] z-10">
             {scrollPercent}%
           </div>
        </div>
      </motion.nav>

      {/* ═══════════ MOBILE VIEW ═══════════ */}
      <motion.nav 
        ref={mobileNavRef}
        className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[94vw] max-w-[420px]"
        style={{ filter: "drop-shadow(4px 4px 0px rgba(0,0,0,1))" }}
      >
        <div className="bg-black p-[2.5px]" style={{ clipPath: mobOuterClip }}>
          <div className="bg-[#FFFDF5]/95 backdrop-blur-md w-full px-2 py-2 flex items-center justify-between" style={{ clipPath: mobInnerClip }}>
            
            {/* A. Logo */}
            <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="w-10 h-10 rounded-full bg-[#FFE047] border-[2px] border-black flex items-center justify-center font-[var(--font-geist)] font-black text-sm text-black shrink-0 shadow-[2px_2px_0px_0px_#000]">
              A.
            </a>

            {/* Center Icons */}
            <div className="flex-1 flex flex-col items-center justify-center px-2">
              <div className="flex items-center justify-around w-full relative z-10 pb-1">
                {navLinks.map((link, i) => {
                  const isActive = activeSection === link.href.replace("#", "");
                  return (
                    <div key={link.href} className="flex flex-col items-center gap-1.5">
                       <a href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="relative p-1">
                         {isActive && (
                           <motion.div layoutId="activeMob" className="absolute inset-0 bg-[#FFE047] border-[1.5px] border-black rounded-md -z-10 shadow-[2px_2px_0px_0px_#000]" />
                         )}
                         <span className={`material-symbols-outlined text-[20px] ${isActive ? "text-black" : "text-black/50"}`} style={{ fontVariationSettings: isActive ? "'FILL' 1, 'wght' 600" : "'FILL' 0, 'wght' 400" }}>
                           {link.icon}
                         </span>
                       </a>
                       {/* Colored dot under icon */}
                       <div className="w-1.5 h-1.5 rounded-full border border-black" style={{ backgroundColor: link.color }} />
                    </div>
                  )
                })}
              </div>
              {/* Progress Line */}
              <div className="w-[90%] h-1.5 bg-black/10 rounded-full overflow-hidden mt-1 border-[1px] border-black/20">
                 <motion.div className="h-full bg-[#FFE047] origin-left border-r border-black/20" style={{ scaleX }} />
              </div>
            </div>

            {/* Hamburger */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="w-10 h-10 bg-white border-[2px] border-black rounded-xl shadow-[2px_2px_0px_0px_#000] flex flex-col items-center justify-center gap-[3px] shrink-0 active:translate-y-px active:shadow-[1px_1px_0px_0px_#000] transition-all">
              <motion.span animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 5 : 0 }} className="w-[18px] h-[2px] bg-black block rounded-full" />
              <motion.span animate={{ opacity: mobileOpen ? 0 : 1 }} className="w-[18px] h-[2px] bg-black block rounded-full" />
              <motion.span animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -5 : 0 }} className="w-[18px] h-[2px] bg-black block rounded-full" />
            </button>

          </div>
        </div>

        {/* Expanded Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="absolute bottom-[calc(100%+16px)] left-0 right-0 bg-[#FFFDF5] border-[3px] border-black shadow-[4px_4px_0px_0px_#000] p-4 rounded-2xl -z-10"
            >
              <div className="grid grid-cols-2 gap-3">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.replace("#", "");
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`flex items-center gap-3 p-3 border-[2px] border-black transition-all rounded-lg ${
                        isActive
                          ? "bg-[#FFE047] shadow-[3px_3px_0px_0px_#000]"
                          : "bg-white hover:bg-[#FFE047]/30 shadow-[2px_2px_0px_0px_#000]"
                      }`}
                    >
                      <span
                        className="material-symbols-outlined text-black text-[20px]"
                        style={{
                          fontVariationSettings: isActive ? "'FILL' 1, 'wght' 700" : "'FILL' 0, 'wght' 500",
                        }}
                      >
                        {link.icon}
                      </span>
                      <span className="font-[var(--font-jetbrains)] text-[11px] font-bold text-black uppercase tracking-wide">
                        {link.label}
                      </span>
                    </a>
                  );
                })}
              </div>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="brutal-btn-primary w-full mt-4 py-3 text-[12px] text-center flex items-center justify-center gap-2 rounded-lg"
              >
                LET&apos;S TALK
                <span className="material-symbols-outlined text-sm">arrow_outward</span>
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
