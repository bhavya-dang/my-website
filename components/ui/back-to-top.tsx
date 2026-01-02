"use client";

import { useScroll, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

import { Inter } from "next/font/google";

import localFont from "next/font/local";

export const satoshi = localFont({
  src: "../../app/fonts/Satoshi-Regular.otf",
  weight: "400",
});

export function BackToTop() {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    // Track scroll position to show/hide based on position
    const unsubscribe = scrollY.on("change", (latest) => {
      const shouldShow = latest > 100;

      if (!shouldShow) {
        // Hide immediately if scrolled back to top
        setIsVisible(false);
        if (scrollTimeout) {
          clearTimeout(scrollTimeout);
        }
      }
    });

    // Track scroll events to detect when scrolling stops
    const handleScroll = () => {
      const currentScrollY =
        window.scrollY || document.documentElement.scrollTop;

      if (currentScrollY > 100) {
        // Show button when scrolling
        setIsVisible(true);

        // Clear any existing timeout
        if (scrollTimeout) {
          clearTimeout(scrollTimeout);
        }

        // Set timeout to hide after 1 second of no scrolling
        scrollTimeout = setTimeout(() => {
          setIsVisible(false);
        }, 1000);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      unsubscribe();
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
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
      <span className={`hidden sm:inline ${satoshi.className} font-semibold`}>
        Back to Top
      </span>
    </motion.button>
  );
}
