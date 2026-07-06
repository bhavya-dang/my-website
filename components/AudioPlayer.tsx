"use client";

import { useState } from "react";
import { Play, Pause, Music } from "lucide-react";
import { useAudio } from "@/context/AudioContext";
import Image from "next/image";

export default function AudioPlayer() {
  const { isPlaying, togglePlay, currentSong } = useAudio();
  const [imgError, setImgError] = useState(false);

  return (
    <div className="bg-background/70 backdrop-blur-xl border border-border/50 rounded-xl shadow-lg p-3 w-56">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-gradient-to-br from-accent to-purple-900 flex items-center justify-center">
          {imgError ? (
            <Music className="w-5 h-5 text-white/70" />
          ) : (
            <Image
              width={40}
              height={40}
              src={currentSong.coverSrc}
              alt={`Cover art for ${currentSong.title}`}
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
            />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate">
            {currentSong.title}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            {currentSong.artist}
          </p>
        </div>

        <button
          onClick={togglePlay}
          className="shrink-0 w-9 h-9 flex items-center justify-center rounded-full bg-accent/10 hover:bg-accent/20 transition-colors text-accent"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4 ml-0.5" />
          )}
        </button>
      </div>
    </div>
  );
}
