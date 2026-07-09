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

    return () => {
      audio.pause();
      audio.src = "";
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
