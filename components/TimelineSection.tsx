"use client";

import AnimatedSection from "./AnimatedSection";

export default function TimelineSection() {
  return (
    <section id="timeline" className="px-5 md:px-20 py-16 scroll-mt-24">
      <div className="max-w-[1440px] mx-auto">
        <AnimatedSection>
          <h2 className="font-[var(--font-geist)] text-[40px] leading-[44px] tracking-tight font-black md:text-[60px] md:leading-[64px] text-center text-black uppercase mb-20">
            Career{" "}
            <span className="bg-[#A3E635] px-4 py-1.5 border-[3px] border-black inline-block rotate-[-1deg] shadow-[4px_4px_0px_0px_#000000]">
              Timeline
            </span>
          </h2>
        </AnimatedSection>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[4px] bg-black -translate-x-1/2" />

          {/* Milestone 1 */}
          <div className="relative mb-16 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12 md:text-right mb-4 md:mb-0 order-2 md:order-1 w-full pl-12 md:pl-0">
              <AnimatedSection direction="right">
                <div className="brutal-card p-6 w-full text-left bg-white">
                  <span className="brutal-badge bg-[#FFE047] text-[11px] font-bold uppercase">
                    2023 - PRESENT
                  </span>
                  <h3 className="font-[var(--font-geist)] text-[22px] md:text-[26px] font-black uppercase text-black mt-3 mb-2">
                    Lead Developer
                  </h3>
                  <p className="text-gray-700 font-[var(--font-inter)] text-[15px] leading-[22px]">
                    Architecting scalable AI solutions and cloud-native
                    applications for high-tech ventures.
                  </p>
                </div>
              </AnimatedSection>
            </div>
            <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-6 h-6 bg-[#FFE047] border-[3px] border-black rounded-full z-10 order-1 shadow-[2px_2px_0px_0px_#000000]" />
            <div className="md:w-1/2 md:pl-12 order-3 hidden md:block" />
          </div>

          {/* Milestone 2 */}
          <div className="relative mb-16 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12 order-2 md:order-1 hidden md:block" />
            <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-6 h-6 bg-[#FF6B35] border-[3px] border-black rounded-full z-10 order-1 shadow-[2px_2px_0px_0px_#000000]" />
            <div className="md:w-1/2 md:pl-12 order-3 w-full pl-12 md:pl-12">
              <AnimatedSection direction="left">
                <div className="brutal-card p-6 w-full text-left bg-white">
                  <span className="brutal-badge bg-[#FF6B35] text-[11px] font-bold uppercase">
                    2021 - 2023
                  </span>
                  <h3 className="font-[var(--font-geist)] text-[22px] md:text-[26px] font-black uppercase text-black mt-3 mb-2">
                    Software Engineer
                  </h3>
                  <p className="text-gray-700 font-[var(--font-inter)] text-[15px] leading-[22px]">
                    Specialized in full-stack Python development and integration
                    of large language models.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>

          {/* Milestone 3 */}
          <div className="relative flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12 md:text-right mb-4 md:mb-0 order-2 md:order-1 w-full pl-12 md:pl-0">
              <AnimatedSection direction="right">
                <div className="brutal-card p-6 w-full text-left bg-white">
                  <span className="brutal-badge bg-[#00F5D4] text-[11px] font-bold uppercase">
                    2018 - 2021
                  </span>
                  <h3 className="font-[var(--font-geist)] text-[22px] md:text-[26px] font-black uppercase text-black mt-3 mb-2">
                    B.Tech Computer Science
                  </h3>
                  <p className="text-gray-700 font-[var(--font-inter)] text-[15px] leading-[22px]">
                    Graduated with honors, focusing on Computational
                    Intelligence and Distributed Systems.
                  </p>
                </div>
              </AnimatedSection>
            </div>
            <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-6 h-6 bg-[#00F5D4] border-[3px] border-black rounded-full z-10 order-1 shadow-[2px_2px_0px_0px_#000000]" />
            <div className="md:w-1/2 md:pl-12 order-3 hidden md:block" />
          </div>
        </div>
      </div>
    </section>
  );
}
