"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import RoleScramble from "../app/roles";
import { externalLinks } from "@/constants/index";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import WorkStatus from "@/components/work-status";
import { useWindowSize } from "@/app/hooks/useWindowSize";
// import "boxicons";
// import AboutMeModal from "../components/AboutMeModal";

import { Inter } from "next/font/google";
import { FileUser } from "lucide-react";
import { motion } from "framer-motion";

const inter = Inter({ subsets: ["latin"] });

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8, ease: "easeOut" },
};

const scaleIn = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.8, ease: "easeOut" },
};

export const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { width } = useWindowSize();

  const getImageSize = (): { w: number; h: number } => {
    if (width && width < 640) return { w: 200, h: 200 };
    if (width && width >= 640 && width < 1024) return { w: 300, h: 300 };
    return { w: 400, h: 400 };
  };

  const { w, h } = getImageSize();

  return (
    <div className="flex flex-col md:flex-row items-center md:items-center gap-y-4 justify-center min-h-screen px-2 lg:mr-12 md:px-6 -mt-28">
      {/* Small Hero for Mobile */}
      <motion.div
        className="small-hero w-full md:hidden flex justify-center mb-4"
        {...fadeInUp}
      >
        <div className="relative">
          <Image
            src="/me4.jpg"
            height={h}
            width={w}
            alt="Hero Image"
            className={`rounded-full dark:shadow-[0_0_1rem_-0.1rem_#fff8] shadow-[0_0_1rem_-0.1rem_#000] hero-join-button-dark-i transition-all duration-500 ${
              isImageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoadingComplete={() => setIsImageLoaded(true)}
            priority
          />
        </div>
      </motion.div>

      {/* Text Section */}
      <motion.div
        className="w-full md:w-1/2 md:ml-3 flex flex-col items-center md:items-start lg:ml-[7.5rem] text-center md:text-left mt-2 md:mt-0"
        {...fadeInUp}
      >
        <div className="flex items-center whitespace-nowrap">
          <motion.h1
            className={`text-2xl lg:text-4xl font-extrabold ${inter.className}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            Hi 👋, I&apos;m&nbsp;
          </motion.h1>
          <motion.h1
            className={`text-2xl lg:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-black to-black/[0.6] dark:text-white bg-opacity-50 ${inter.className}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            Bhavya.
          </motion.h1>
        </div>

        <motion.div
          className="mt-2 flex flex-col items-center md:items-start lg:mt-4"
          {...fadeInUp}
        >
          <div className="flex items-center justify-center">
            <RoleScramble className="font-mono italic text-md md:text-xl lg:text-2xl mt-2 font-semibold text-neutral-500 dark:text-neutral-400 whitespace-nowrap" />
          </div>

          {/* external links */}
          <motion.ul
            className="external-links flex items-start gap-x-4 mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          >
            {externalLinks.map((s, i) => (
              <motion.li
                key={i}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-300"
                >
                  {s.label === "Github" ? (
                    <GitHubLogoIcon className="w-5 h-5 opacity-100 hover:opacity-80 transition ease-linear duration-300" />
                  ) : s.label === "LinkedIn" ? (
                    <LinkedInLogoIcon className="w-5 h-5 opacity-100 hover:opacity-80 transition ease-linear duration-300" />
                  ) : s.label === "Youtube" ? (
                    <i className="bx bxl-youtube text-2xl"></i>
                  ) : (
                    <FileUser className="w-5 h-5 opacity-100 hover:opacity-80 transition ease-linear duration-300" />
                  )}
                </a>
              </motion.li>
            ))}
          </motion.ul>
          <WorkStatus className="hidden md:flex" />
        </motion.div>
      </motion.div>

      {/* Image Section for larger screens */}
      <motion.div
        className="hidden w-full md:w-1/2 md:flex justify-center ml-96"
        {...scaleIn}
      >
        <div className="relative">
          <Image
            src="/me4.jpg"
            alt="Hero Image"
            className={`rounded-full p-[1px] dark:shadow-[0_0_5rem_-0.5rem_#fff8] shadow-[0_0_5rem_-0.5rem_#000] hero-join-button-dark-i transition-all duration-500 ${
              isImageLoaded ? "opacity-100" : "opacity-0"
            }`}
            width={w}
            height={h}
            priority
            quality={100}
            onLoadingComplete={() => setIsImageLoaded(true)}
          />
        </div>
      </motion.div>

      {/* {isModalOpen && (
        <>
          <div className="fixed inset-0 bg-black/80 z-40"></div>
          <AboutMeModal onClose={() => setIsModalOpen(false)} />
        </>
      )} */}
    </div>
  );
};
