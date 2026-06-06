"use client";

import AnimatedSection from "./AnimatedSection";

export default function AchievementsSection() {
  return (
    <section className="px-5 md:px-20 py-16">
      <div className="max-w-[1440px] mx-auto">
        <AnimatedSection>
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 border-[3px] border-black bg-primary flex items-center justify-center shadow-[3px_3px_0px_0px_#000000]">
              <span className="material-symbols-outlined text-black font-black">
                workspace_premium
              </span>
            </div>
            <h2 className="font-[var(--font-geist)] text-[28px] md:text-[32px] font-black uppercase tracking-tight text-black">
              Achievements & Certs
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cert 1 */}
          <AnimatedSection delay={0.05}>
            <div className="brutal-card p-6 bg-[#A78BFA] relative group h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 border-[3px] border-black bg-white flex items-center justify-center mb-6 shadow-[3px_3px_0px_0px_#000000]">
                  <span className="material-symbols-outlined text-black text-2xl font-black">
                    school
                  </span>
                </div>
                <h3 className="font-[var(--font-geist)] text-[24px] md:text-[28px] font-black uppercase text-black mb-1">
                  AWS Certified
                </h3>
                <p className="font-[var(--font-jetbrains)] text-[12px] font-bold text-black uppercase tracking-wider mb-6">
                  Cloud Solutions Architect Associate
                </p>
              </div>
              <div className="w-full h-4 bg-white border-[3px] border-black shadow-[2px_2px_0px_0px_#000000]">
                <div className="h-full bg-black w-full" />
              </div>
            </div>
          </AnimatedSection>

          {/* Cert 2 */}
          <AnimatedSection delay={0.1}>
            <div className="brutal-card p-6 bg-[#FF6B35] relative group h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 border-[3px] border-black bg-white flex items-center justify-center mb-6 shadow-[3px_3px_0px_0px_#000000]">
                  <span className="material-symbols-outlined text-black text-2xl font-black">
                    trophy
                  </span>
                </div>
                <h3 className="font-[var(--font-geist)] text-[24px] md:text-[28px] font-black uppercase text-black mb-1">
                  Hackathon Winner
                </h3>
                <p className="font-[var(--font-jetbrains)] text-[12px] font-bold text-black uppercase tracking-wider mb-6">
                  First Place - AI for Good 2023
                </p>
              </div>
              <div className="w-full h-4 bg-white border-[3px] border-black shadow-[2px_2px_0px_0px_#000000]">
                <div className="h-full bg-black w-3/4" />
              </div>
            </div>
          </AnimatedSection>

          {/* Cert 3 */}
          <AnimatedSection delay={0.15}>
            <div className="brutal-card p-6 bg-[#38BDF8] relative group h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 border-[3px] border-black bg-white flex items-center justify-center mb-6 shadow-[3px_3px_0px_0px_#000000]">
                  <span className="material-symbols-outlined text-black text-2xl font-black">
                    verified
                  </span>
                </div>
                <h3 className="font-[var(--font-geist)] text-[24px] md:text-[28px] font-black uppercase text-black mb-1">
                  Google AI
                </h3>
                <p className="font-[var(--font-jetbrains)] text-[12px] font-bold text-black uppercase tracking-wider mb-6">
                  Deep Learning Specialization
                </p>
              </div>
              <div className="w-full h-4 bg-white border-[3px] border-black shadow-[2px_2px_0px_0px_#000000]">
                <div className="h-full bg-black w-full" />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
