"use client";

import { createContext, useContext, useRef, useState, useEffect, ReactNode, useCallback } from "react";

interface AudioContextType {
  isPlaying: boolean;
  togglePlay: () => void;
  currentSong: { title: string; artist: string; coverSrc: string };
}

const AudioContext = createContext<AudioContextType | null>(null);

const AUDIO_SRC = "/audio/solace-by-txmy.mp3";

export function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const started = useRef(false);

  const currentSong = {
    title: "Solace",
    artist: "txmy",
    coverSrc: "/audio/solace-cover.jpg",
  };

  useEffect(() => {
    if (typeof Audio === "undefined") return;

    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.preload = "auto";

    audio.addEventListener("error", () => setIsPlaying(false));

    audioRef.current = audio;

    const start = () => {
      if (started.current) return;
      started.current = true;
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    };

    document.addEventListener("click", start, { once: true });
    document.addEventListener("keydown", start, { once: true });
    document.addEventListener("touchstart", start, { once: true });

    return () => {
      audio.pause();
      audio.src = "";
      document.removeEventListener("click", start);
      document.removeEventListener("keydown", start);
      document.removeEventListener("touchstart", start);
    };
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }, []);

  return (
    <AudioContext.Provider value={{ isPlaying, togglePlay, currentSong }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudio must be used within an AudioProvider");
  return ctx;
}
