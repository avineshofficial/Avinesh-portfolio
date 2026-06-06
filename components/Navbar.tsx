"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#timeline", label: "Timeline" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = document.querySelectorAll("section[id]");
      let current = "";
      sections.forEach((section) => {
        const el = section as HTMLElement;
        if (window.scrollY >= el.offsetTop - 120) {
          current = el.getAttribute("id") || "";
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-200 ${
        scrolled
          ? "bg-[#ffffff] border-b-4 border-black py-3 shadow-[0_4px_0px_0px_#000000]"
          : "bg-transparent border-b-4 border-transparent py-5"
      }`}
    >
      <div className="flex justify-between items-center px-5 md:px-20 py-1 max-w-[1440px] mx-auto">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="font-[var(--font-geist)] text-[24px] md:text-[28px] font-black tracking-tighter text-black bg-primary px-4 py-1.5 border-[3px] border-black shadow-[3px_3px_0px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_0px_#000000] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_0px_#000000] transition-all"
        >
          AVINESH
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`font-[var(--font-jetbrains)] text-[14px] tracking-wider font-bold transition-all px-3 py-1 border-[3px] border-transparent hover:border-black hover:bg-primary hover:shadow-[3px_3px_0px_0px_#000] ${
                activeSection === link.href.replace("#", "")
                  ? "bg-primary border-black text-black shadow-[3px_3px_0px_0px_#000]"
                  : "text-black hover:text-black"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="brutal-btn-primary px-6 py-2.5 text-[14px]"
          >
            Get in Touch
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2.5 z-60 border-[3px] border-black bg-primary shadow-[2px_2px_0px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_#000] cursor-pointer"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-black"
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-6 h-0.5 bg-black"
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-black"
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#ffffff] border-b-4 border-black overflow-hidden shadow-[0_4px_0px_0px_#000]"
          >
            <div className="flex flex-col gap-4 px-5 py-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="font-[var(--font-jetbrains)] text-[14px] tracking-wider font-bold text-black hover:bg-primary hover:text-black border-2 border-transparent hover:border-black p-2 shadow-none hover:shadow-[2px_2px_0px_0px_#000] transition-all"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="brutal-btn-primary px-6 py-3 text-center text-[14px] w-full"
              >
                Get in Touch
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
