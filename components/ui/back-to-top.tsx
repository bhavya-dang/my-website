"use client";

import { useScroll, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setIsVisible(latest > 100); // Show button if scrolled more than 100px
    });

    return () => unsubscribe();
  }, [scrollY]);

  return (
    <motion.button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-8 right-4 sm:bottom-8 sm:right-8 bg-black/90 dark:bg-white/90 hover:bg-violet-700 dark:hover:bg-violet-300 text-white dark:text-black text-sm sm:text-base font-medium py-2.5 px-3 sm:px-4 rounded-full shadow-lg transition-all flex items-center gap-2 z-[100] ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      initial={{ scale: 0.8 }}
      animate={{ scale: isVisible ? 1 : 0.8 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
      <span className="hidden sm:inline font-satoshi font-semibold">
        Back to Top
      </span>
    </motion.button>
  );
}
