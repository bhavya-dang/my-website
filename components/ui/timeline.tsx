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

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.scrollHeight); // Ensures full height is captured
    }
  }, [data]); // Depend on data to ensure updates

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"], // Ensures smoother tracking
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className={`${inter.className}`} ref={containerRef}>
      <div className="px-36 py-20">
        <h1
          className={`font-extrabold text-6xl text-slate-950 dark:text-white leading-tight ${inter.className} `}
        >
          Work.
        </h1>
        <p className="text-lg text-slate-700 dark:text-slate-300 mt-4">
          Here&apos;s a timeline of my journey.
        </p>
      </div>

      <div ref={ref} className="relative px-36 pb-20 ">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start first:pt-5 pt-10 md:pt-40 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-3xl font-bold text-neutral-500 dark:text-neutral-500 ">
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
          className="absolute md:left-[10.95rem] left-8 top-0 overflow-hidden w-[2px]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
              background:
                "linear-gradient(to top, #a855f7, #3b82f6, transparent)",
            }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
