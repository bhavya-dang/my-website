"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Music2 } from "lucide-react";
import CommandPalette from "./CommandPalette";
import AudioPlayer from "./AudioPlayer";
import { useAudio } from "@/context/AudioContext";

const navItems = [
  { id: "hero", label: "Home" },
  { id: "now", label: "Now" },
  { id: "stack", label: "Stack" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "videos", label: "Videos" },
  { id: "art", label: "Art" },
];

export const Navbar = () => {
  const [showMusic, setShowMusic] = useState(false);
  const { isPlaying } = useAudio();
  const dialogRef = useRef<HTMLDivElement>(null);
  const musicBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!showMusic) return;

    const handleClick = (e: MouseEvent) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(e.target as Node) &&
        musicBtnRef.current &&
        !musicBtnRef.current.contains(e.target as Node)
      ) {
        setShowMusic(false);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [showMusic]);

  return (
    <nav className="fixed top-3 sm:top-4 max-sm:bottom-6 left-1/2 -translate-x-1/2 z-50 w-auto max-sm:w-[calc(100%-1.5rem)]">
      <div className="flex items-center justify-center gap-0.5 bg-background/70 backdrop-blur-xl border border-border/50 rounded-full shadow-lg px-2 sm:px-3 py-1.5 sm:py-2">
        <div className="hidden sm:flex items-center gap-0.5">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-mono rounded-lg hover:bg-secondary/80 transition-colors text-muted-foreground hover:text-foreground whitespace-nowrap"
            >
              {item.label}
            </a>
          ))}
          <div className="w-px h-4 bg-border mx-0.5 sm:mx-1 shrink-0" />
        </div>

        <button
          ref={musicBtnRef}
          onClick={() => setShowMusic(!showMusic)}
          className={`px-2 py-1 rounded-lg hover:bg-secondary/80 transition-colors ${
            isPlaying
              ? "text-accent"
              : "text-muted-foreground hover:text-foreground"
          }`}
          aria-label="Toggle music player"
        >
          {isPlaying ? <Music2 className="w-4 h-4" /> : <Music className="w-4 h-4" />}
        </button>

        <CommandPalette />
      </div>

      <AnimatePresence>
        {showMusic && (
          <motion.div
            ref={dialogRef}
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
            className="absolute max-sm:bottom-full max-sm:mb-3 sm:top-full sm:mt-3 left-1/2 -translate-x-1/2"
            style={{ willChange: "transform, opacity" }}
          >
            <AudioPlayer />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
