"use client";

import AnimatedSection from "./AnimatedSection";

const stats = [
  { value: "3+", label: "Years Dev" },
  { value: "15+", label: "Projects" },
  { value: "99%", label: "Uptime" },
  { value: "10k+", label: "Lines of AI" },
];

const statBgs = [
  "bg-primary",            // Yellow
  "bg-primary-container",  // Orange
  "bg-tertiary",           // Teal
  "bg-secondary"           // Purple
];

export default function AboutSection() {
  return (
    <section id="about" className="px-5 md:px-20 py-16 scroll-mt-24">
      <div className="max-w-[1440px] mx-auto">
        <AnimatedSection>
          <div className="brutal-card-flat bg-white p-8 md:p-12 flex flex-col md:flex-row gap-12 items-center border-[3px] border-black shadow-[6px_6px_0px_0px_#000000]">
            {/* Profile Image */}
            <div className="w-48 h-48 border-[3px] border-black overflow-hidden bg-white p-1.5 shrink-0 relative rotate-[-3deg] hover:rotate-0 transition-transform shadow-[4px_4px_0px_0px_#000000] group cursor-pointer">
              <div className="absolute inset-0 bg-primary/10 group-hover:opacity-0 transition-opacity z-10" />
              <img
                alt="Avinesh"
                className="w-full h-full object-cover border-2 border-black"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4_OLCsolTI0_PavKHgDiG9-qZwTiylTKYmrITaUQGsQkims59wDNl6TW0WyZ2GROttqad42z0lzIAE4arDm95eyAvyBqiqSFrrquDUZ2lPMYgH4SnRA1qYQqgiDWX9c26qX6gsMuMZzRIMRmcian9tcXLK7vfhMMAPYqqxK0USeg_5VWhacmYPjrfdpwCquF7TQiAf_aEbY0QUwiZFrcELX_WYK9sZWdmkbHkeYzccgjCcg5Gn-KpoOf6Y9qwNZGYs2cPgM5WIdw"
              />
            </div>

            {/* Content */}
            <div className="flex-1 w-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 border-2 border-black bg-primary flex items-center justify-center shadow-[2px_2px_0px_0px_#000000]">
                  <span className="material-symbols-outlined text-black font-bold">
                    person
                  </span>
                </div>
                <h2 className="font-[var(--font-geist)] text-[32px] md:text-[36px] font-black uppercase tracking-tight text-black">
                  About Me
                </h2>
              </div>

              <p className="font-[var(--font-inter)] text-[16px] md:text-[18px] leading-[26px] md:leading-[28px] text-gray-800 mb-8">
                I am a passionate software engineer dedicated to crafting
                efficient solutions at the intersection of web technology and
                Artificial Intelligence. With a deep fascination for
                high-performance systems, I strive to build applications that
                are as fast as they are functional.
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                  <AnimatedSection key={stat.label} delay={0.08 * i}>
                    <div className={`brutal-card p-4 text-center ${statBgs[i % statBgs.length]}`}>
                      <span className="block text-black font-[var(--font-geist)] text-[32px] font-black uppercase leading-none mb-1">
                        {stat.value}
                      </span>
                      <span className="font-[var(--font-jetbrains)] text-[11px] font-bold text-black uppercase tracking-wider block">
                        {stat.label}
                      </span>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
