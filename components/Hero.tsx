"use client";
import { useState } from "react";
import Image from "next/image";
import RoleScramble from "../app/roles";
import { socialLinks } from "@/constants/index";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import WorkStatus from "@/components/work-status";
import { useWindowSize } from "@/app/hooks/useWindowSize";
// import AboutMeModal from "../components/AboutMeModal";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const { width } = useWindowSize();

  const getImageSize = (): { w: number; h: number } => {
    if (width && width < 640) return { w: 200, h: 200 };
    if (width && width >= 640 && width < 1024) return { w: 350, h: 350 };
    return { w: 450, h: 450 };
  };

  const { w, h } = getImageSize();

  return (
    <div className="flex flex-col md:flex-row items-center md:items-center gap-y-4 justify-center h-screen px-2 lg:mr-12 md:px-6 -mt-20">
      {/* Small Hero for Mobile */}
      <div className="small-hero w-full md:hidden flex justify-center mb-4">
        <Image
          src="/sync.jpg"
          height={200}
          width={200}
          alt="Hero Image"
          className="rounded-full dark:shadow-[0_0_5rem_-0.5rem_#fff8] shadow-[0_0_5rem_-0.5rem_#000] hero-join-button-dark-i transition-all duration-300"
        />
      </div>

      {/* Text Section */}
      <div className="w-full md:w-1/2 md:ml-3 flex flex-col items-center md:items-start lg:ml-32 text-center md:text-left mt-2 md:mt-0">
        <h1
          className={`text-3xl lg:text-4xl font-bold  ${inter.className} bg-clip-text text-transparent bg-gradient-to-b from-black to-black/[0.6] dark:from-neutral-50 dark:to-neutral-400 bg-opacity-50`}
        >
          Hi, I&apos;m Bhavya Dang
          {/* <span
            className="md:py-1 md:px-3 text-black bg-clip-text text-transparent bg-gradient-to-b from-black to-black/[0.6] dark:from-neutral-50 dark:to-neutral-400 bg-opacity-50 md:rounded-full md:bg-white md:shadow-lg md:shadow-violet-500/40 hover:cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            Bhavya Dang
          </span> */}
        </h1>

        <div className="mt-2 flex flex-col items-center md:items-start lg:mt-4">
          <div className="flex items-center justify-center">
            <RoleScramble className="font-mono italic text-2xl md:text-xl lg:text-2xl mt-2 font-semibold text-neutral-500" />
          </div>

          {/* Social Links */}
          <ul className="social-links flex gap-x-4 mt-4">
            {socialLinks.map((s, i) => (
              <li key={i}>
                <a href={s.url} target="_blank" rel="noopener noreferrer">
                  {s.name === "github" ? (
                    <GitHubLogoIcon className="w-5 h-5 opacity-100 hover:opacity-80 transition ease-linear duration-150" />
                  ) : (
                    <LinkedInLogoIcon className="w-5 h-5 opacity-100 hover:opacity-80 transition ease-linear duration-150" />
                  )}
                </a>
              </li>
            ))}
          </ul>
          <WorkStatus />
        </div>
      </div>

      {/* Image Section for larger screens */}
      <div className="hidden w-full md:w-1/2 md:flex justify-center">
        <Image
          src="/sync.jpg"
          alt="Hero Image"
          className="rounded-full dark:shadow-[0_0_5rem_-0.5rem_#fff8] shadow-[0_0_5rem_-0.5rem_#000] hero-join-button-dark-i transition-all duration-300 p-[1px]"
          width={w}
          height={h}
        />
      </div>

      {/* {isModalOpen && (
        <>
          <div className="fixed inset-0 bg-black/80 z-40"></div>
          <AboutMeModal onClose={() => setIsModalOpen(false)} />
        </>
      )} */}
    </div>
  );
};
