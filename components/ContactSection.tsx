"use client";

import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

export default function ContactSection() {
  return (
    <section id="contact" className="px-5 md:px-20 py-16 scroll-mt-24">
      <div className="max-w-[1440px] mx-auto">
        <AnimatedSection>
          <div className="brutal-card-flat bg-white overflow-hidden border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Form Block */}
              <div className="p-8 md:p-12">
                <motion.h2
                  initial={{ opacity: 0, y: 50, skewY: 4 }}
                  whileInView={{ opacity: 1, y: 0, skewY: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
                  className="font-[var(--font-geist)] text-[36px] md:text-[44px] leading-tight font-black uppercase text-black mb-6"
                >
                  Let&apos;s{" "}
                  <span className="bg-[#FF6B35] px-3.5 py-1 border-[3px] border-black inline-block rotate-[2deg] shadow-[3px_3px_0px_0px_#000000] text-black">
                    Connect
                  </span>
                </motion.h2>
                <p className="text-gray-800 font-[var(--font-inter)] text-[16px] md:text-[18px] leading-[26px] mb-8">
                  Have a project in mind or just want to chat about AI? Drop me
                  a message.
                </p>

                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block font-[var(--font-jetbrains)] text-[12px] leading-[16px] tracking-[0.02em] font-bold text-black mb-2 uppercase">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="brutal-input w-full"
                    />
                  </div>
                  <div>
                    <label className="block font-[var(--font-jetbrains)] text-[12px] leading-[16px] tracking-[0.02em] font-bold text-black mb-2 uppercase">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="brutal-input w-full"
                    />
                  </div>
                  <div>
                    <label className="block font-[var(--font-jetbrains)] text-[12px] leading-[16px] tracking-[0.02em] font-bold text-black mb-2 uppercase">
                      Message
                    </label>
                    <textarea
                      placeholder="Your vision here..."
                      rows={4}
                      className="brutal-input w-full"
                    />
                  </div>
                  <button
                    type="submit"
                    className="brutal-btn-primary w-full py-4 text-[14px] uppercase font-black"
                  >
                    SEND MESSAGE
                  </button>
                </form>
              </div>

              {/* Info Block */}
              <div className="bg-[#FFE047] p-8 md:p-12 flex flex-col justify-between border-t-[3px] md:border-t-0 md:border-l-[3px] border-black relative overflow-hidden">
                <div>
                  <h3 className="font-[var(--font-jetbrains)] text-[14px] leading-[20px] tracking-[0.1em] font-black text-black mb-8 border-b-2 border-black pb-2">
                    CONTACT INFORMATION
                  </h3>
                  <div className="space-y-6 relative z-10">
                    <a
                      href="mailto:contact@avinesh.dev"
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-12 h-12 border-[3px] border-black bg-white flex items-center justify-center shadow-[3px_3px_0px_0px_#000000] group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] group-hover:shadow-[5px_5px_0px_0px_#000000] transition-all shrink-0">
                        <span className="material-symbols-outlined text-black font-black">
                          mail
                        </span>
                      </div>
                      <div>
                        <p className="font-[var(--font-jetbrains)] text-[11px] font-bold text-black uppercase">
                          Email
                        </p>
                        <p className="font-[var(--font-inter)] text-[16px] md:text-[18px] font-bold text-black">
                          contact@avinesh.dev
                        </p>
                      </div>
                    </a>
                    <a href="#" className="flex items-center gap-4 group">
                      <div className="w-12 h-12 border-[3px] border-black bg-white flex items-center justify-center shadow-[3px_3px_0px_0px_#000000] group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] group-hover:shadow-[5px_5px_0px_0px_#000000] transition-all shrink-0">
                        <span className="material-symbols-outlined text-black font-black">
                          location_on
                        </span>
                      </div>
                      <div>
                        <p className="font-[var(--font-jetbrains)] text-[11px] font-bold text-black uppercase">
                          Location
                        </p>
                        <p className="font-[var(--font-inter)] text-[16px] md:text-[18px] font-bold text-black">
                          Remote / Earth
                        </p>
                      </div>
                    </a>
                  </div>
                </div>

                <div className="pt-8 relative z-10">
                  <h3 className="font-[var(--font-jetbrains)] text-[14px] leading-[20px] tracking-[0.1em] font-black text-black mb-4 uppercase">
                    Socials & Resume
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href="#"
                      className="w-11 h-11 border-[3px] border-black bg-white font-[var(--font-jetbrains)] font-bold text-black flex items-center justify-center shadow-[3px_3px_0px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_0px_#000000] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_0px_#000000] transition-all"
                      title="GitHub"
                    >
                      GH
                    </a>
                    <a
                      href="#"
                      className="w-11 h-11 border-[3px] border-black bg-white font-[var(--font-jetbrains)] font-bold text-black flex items-center justify-center shadow-[3px_3px_0px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_0px_#000000] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_0px_#000000] transition-all"
                      title="LinkedIn"
                    >
                      LN
                    </a>
                    <a
                      href="#"
                      className="px-5 py-2 border-[3px] border-black bg-[#00F5D4] font-[var(--font-jetbrains)] font-bold text-black flex items-center justify-center shadow-[3px_3px_0px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_0px_#000000] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_0px_#000000] transition-all"
                    >
                      RESUME
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
