"use client";
import React from "react";
import { BackgroundBeams } from "./ui/background-beams";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

interface AboutMeModalProps {
  onClose: () => void;
}

export default function AboutMeModal({ onClose }: AboutMeModalProps) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={onClose} // Prevent closing on modal click
    >
      <div className="w-[80%] h-[80%] rounded-md bg-neutral-950 relative flex flex-col items-center justify-center p-4 overflow-visible">
        <div
          className={`w-full max-w-2xl mx-auto min-h-[200px] ${inter.className}`}
        >
          <h1 className="relative z-10 text-3xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-bold ">
            Hi there, I&apos;m Bhavya Dang
          </h1>
          <p className="text-neutral-500 max-w-lg mx-auto my-2 text-lg relative z-10 text-center">
            Also known as Sync! 👋
          </p>

          <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm relative z-10 text-center">
            A self-taught full-stack developer and hobbyist artist based in
            India
          </p>
          <div className="text-center md:text-left w-full mt-5 text-base md:text-md md:mx-7">
            <p className="text-neutral-500 max-w-lg mx-auto my-2 relative z-10">
              {" "}
              📖 Morning Star and Circle of Inevitability
            </p>
            <p className="text-neutral-500 max-w-lg mx-auto my-2 relative z-10">
              {" "}
              🛠️ Currently working on this website and learning about Next.js{" "}
            </p>

            <p className="text-neutral-500 max-w-lg mx-auto my-2 relative z-10">
              🐈 I love cats
            </p>
          </div>
        </div>

        <BackgroundBeams />
      </div>
    </div>
  );
}
