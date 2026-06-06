"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-16 px-5 md:px-20 scroll-mt-24">
      <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Content (Text & CTAs) */}
        <div className="lg:col-span-7 flex flex-col items-start text-left relative z-10 order-2 lg:order-1">
          {/* Welcome Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: -2 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            className="brutal-badge bg-tertiary mb-6 rotate-[-2deg] text-sm uppercase tracking-widest shadow-[3px_3px_0px_0px_#000000]"
          >
            <span className="material-symbols-outlined text-base">waving_hand</span>
            Welcome to my space
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className="font-[var(--font-geist)] text-[48px] leading-[48px] md:text-[84px] md:leading-[80px] font-black text-black tracking-tighter uppercase mb-6"
          >
            Hi, I&apos;m{" "}
            <span className="bg-primary px-3 py-1 border-[4px] border-black inline-block rotate-[1deg] shadow-[4px_4px_0px_0px_#000000]">
              Avinesh
            </span>
          </motion.h1>

          {/* Headline Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="brutal-card-flat bg-white p-5 md:p-6 mb-8 max-w-xl text-left border-[3px] border-black shadow-[4px_4px_0px_0px_#000000]"
          >
            <p className="font-[var(--font-jetbrains)] text-[14px] md:text-[16px] leading-[22px] font-bold text-black uppercase mb-3">
              ✦ DEVELOPER / AI ENTHUSIAST / EXPLORER ✦
            </p>
            <p className="font-[var(--font-inter)] text-[16px] md:text-[18px] leading-[26px] text-gray-800">
              I build high-performance web systems and integrate advanced AI architectures. Dedicated to crafting software that is clean, fast, and satisfying to use.
            </p>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4 w-full sm:w-auto"
          >
            <a
              href="#projects"
              className="brutal-btn-primary px-8 py-4 text-[16px] w-full sm:w-auto text-center font-bold"
            >
              VIEW PROJECTS
              <span className="material-symbols-outlined ml-2 text-xl">arrow_forward</span>
            </a>
            <a
              href="#contact"
              className="brutal-btn-secondary px-8 py-4 text-[16px] w-full sm:w-auto text-center font-bold"
            >
              CONTACT ME
            </a>
          </motion.div>
        </div>

        {/* Right Content (Image & Brutalist Stickers) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            className="relative w-72 h-72 md:w-96 md:h-96 shrink-0"
          >
            {/* Main Picture Frame */}
            <div className="w-full h-full brutal-card-flat overflow-hidden p-2 bg-white rotate-[2deg] hover:rotate-0 transition-transform duration-300">
              <img
                alt="Avinesh Avatar"
                className="w-full h-full object-cover border-[3px] border-black bg-gray-100"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4_OLCsolTI0_PavKHgDiG9-qZwTiylTKYmrITaUQGsQkims59wDNl6TW0WyZ2GROttqad42z0lzIAE4arDm95eyAvyBqiqSFrrquDUZ2lPMYgH4SnRA1qYQqgiDWX9c26qX6gsMuMZzRIMRmcian9tcXLK7vfhMMAPYqqxK0USeg_5VWhacmYPjrfdpwCquF7TQiAf_aEbY0QUwiZFrcELX_WYK9sZWdmkbHkeYzccgjCcg5Gn-KpoOf6Y9qwNZGYs2cPgM5WIdw"
              />
            </div>

            {/* Overlapping Badge Stickers */}
            
            {/* Badge 1: Experience */}
            <motion.div
              initial={{ opacity: 0, x: 20, rotate: 15 }}
              animate={{ opacity: 1, x: 0, rotate: 12 }}
              transition={{ type: "spring", stiffness: 120, delay: 0.5 }}
              className="absolute -top-4 -right-4 brutal-badge bg-primary rotate-[12deg] text-[12px] md:text-[14px] shadow-[3px_3px_0px_0px_#000] z-20 hover:-translate-y-1 hover:rotate-[8deg] transition-all"
            >
              3+ YEARS EXP
            </motion.div>

            {/* Badge 2: Tech Skill */}
            <motion.div
              initial={{ opacity: 0, x: -30, rotate: -20 }}
              animate={{ opacity: 1, x: 0, rotate: -8 }}
              transition={{ type: "spring", stiffness: 120, delay: 0.6 }}
              className="absolute -bottom-6 -left-8 brutal-badge bg-secondary rotate-[-8deg] text-[12px] md:text-[14px] shadow-[3px_3px_0px_0px_#000] z-20 hover:-translate-y-1 hover:rotate-[-12deg] transition-all"
            >
              ⚡ FULL STACK DEV
            </motion.div>

            {/* Badge 3: AI Focus */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: 10 }}
              animate={{ opacity: 1, y: 0, rotate: 4 }}
              transition={{ type: "spring", stiffness: 120, delay: 0.7 }}
              className="absolute -bottom-4 -right-6 brutal-badge bg-tertiary-container rotate-[4deg] text-[12px] md:text-[14px] shadow-[3px_3px_0px_0px_#000] z-20 hover:-translate-y-1 hover:rotate-[0deg] transition-all"
            >
              🧠 AI SPECIALIST
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
