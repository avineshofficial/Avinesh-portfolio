"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // A simple simulation for load balancing/loading time.
    // Realistically you'd check document.readyState or specific asset loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FAF6EE]"
        >
          <div className="flex flex-col items-center gap-4">
            {/* Simple Neo-Brutalist Loader */}
            <div className="w-16 h-16 border-4 border-black bg-[#FFE047] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-spin" />
            <h1 className="font-jetbrains text-2xl font-bold uppercase tracking-widest text-black mt-4">
              Loading
            </h1>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
