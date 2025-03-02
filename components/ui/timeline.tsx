"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import { Inter } from "next/font/google";
import React, { useEffect, useRef, useState } from "react";
const inter = Inter({ subsets: ["latin"] });

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  const { scrollY } = useScroll(); // Track the vertical scroll position
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setIsVisible(latest > 100); // Show button if scrolled more than 100px
    });

    return () => unsubscribe();
  }, [scrollY]);

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.scrollHeight); // Ensures full height is captured
    }
  }, [data]); // Depend on data to ensure updates

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 87%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className={`${inter.className}`} ref={containerRef}>
      <div className="px-16 py-20">
        <h1
          className={`font-extrabold text-6xl text-slate-950 dark:text-white leading-tight ${inter.className} `}
        >
          Journey.
        </h1>
        <p className="text-lg text-slate-700 dark:text-slate-300 mt-4">
          Here&apos;s a timeline of my experiences.
        </p>

        <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md bg-[linear-gradient(110deg,#08081a,45%,#344152,55%,#08081a)] dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 mt-4 text-white dark:text-white dark:border dark:border-white/10">
          <a href="https://www.linkedin.com/in/bhavya-dang-27506b223/">
            Connect with me on LinkedIn
          </a>
        </button>
      </div>

      <div ref={ref} className="relative px-16 pb-20 min-h-screen">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start first:pt-5 pt-10 md:pt-40 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-neutral-900 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-3xl font-bold text-neutral-800 dark:text-neutral-500 ">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500">
                {item.title}
              </h3>
              {item.content}{" "}
            </div>
          </div>
        ))}

        {/* Gradient Motion Line */}
        <div
          style={{ height: height + "px" }}
          className="absolute md:left-[5.95rem] left-8 top-0 overflow-hidden w-[2px]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
              background:
                "linear-gradient(to top, #a855f7 20%, #3b82f6 60%, transparent 100%)",
            }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full"
          />
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={`fixed bottom-5 right-5 bg-black dark:bg-white hover:bg-purple-700 text-white dark:text-black font-bold py-2 px-4 rounded-full shadow-md transition-all ${
              isVisible ? "block" : "hidden"
            }`}
            whileTap={{ scale: 0.9 }}
          >
            ⬆ Back to Top
          </motion.button>
        </div>
      </div>
    </div>
  );
};
