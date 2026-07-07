"use client";
import { useState } from "react";
import Image from "next/image";
import { externalLinks } from "@/constants/index";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { FileUser } from "lucide-react";
import { motion } from "framer-motion";
import WorkStatus from "./work-status";

export const Hero = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center py-16 sm:py-24 md:py-32"
    >
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
        <motion.div
          className="order-2 md:order-1 text-center sm:text-left"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="font-mono text-xs sm:text-sm text-muted-foreground mb-4">
            <span className="text-accent">$</span>
            <span className="ml-1.5">whoami</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] text-balance">
            Bhavya
            <br />
            <span className="font-serif text-accent font-normal italic lg:text-9xl leading-none">
              Dang
            </span>
          </h1>

          <div className="w-10 h-0.5 bg-accent mt-7 mb-5 mx-auto sm:mx-0" />

          <p className="font-mono text-sm text-muted-foreground">
            Developer &amp; Designer{" "}
          </p>

          <WorkStatus className="mt-3 justify-center sm:justify-start" />

          {/*<div className="mt-8 flex items-center gap-5">
            {externalLinks.map((s, i) => (
              <a
                key={i}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                aria-label={s.label}
              >
                {s.label === "Github" ? (
                  <GitHubLogoIcon className="w-5 h-5" />
                ) : s.label === "LinkedIn" ? (
                  <LinkedInLogoIcon className="w-5 h-5" />
                ) : s.label === "Youtube" ? (
                  <span className="text-xl font-bold">YT</span>
                ) : (
                  <FileUser className="w-5 h-5" />
                )}
              </a>
            ))}
          </div>*/}
        </motion.div>

        <motion.div
          className="order-1 md:order-2 flex justify-center md:justify-end"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="relative">
            <div className="relative w-48 h-48 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full overflow-hidden shadow-xl ring-1 ring-black/10 dark:ring-white/10">
              <Image
                src="/meV-1.webp"
                fill
                sizes="(max-width: 640px) 192px, (max-width: 768px) 288px, 320px"
                alt="Bhavya Dang"
                className={`object-cover transition-all duration-500 ${
                  isImageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
                priority
                onLoadingComplete={() => setIsImageLoaded(true)}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
