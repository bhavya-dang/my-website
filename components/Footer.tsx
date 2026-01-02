"use client";

import { externalLinks } from "@/constants";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { FileUser } from "lucide-react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`mt-auto mb-8 border-t border-neutral-200 dark:border-neutral-800 pt-8 ${inter.className} `}
    >
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-4">
        {/* Copyright */}
        <div className="text-sm text-neutral-600 dark:text-neutral-400 text-center md:text-left">
          <p className="flex flex-col md:block">
            <span>Built and designed by Bhavya Dang.</span>
            <span> All rights reserved. © {currentYear}</span>
          </p>
        </div>

        {/* Social Links */}
        <ul className="hidden md:flex items-center gap-x-4">
          {externalLinks.map((link, i) => (
            <li key={i} className="flex items-center justify-center">
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors duration-300 flex items-center justify-center"
                aria-label={link.label}
              >
                {link.label === "Github" ? (
                  <GitHubLogoIcon className="w-5 h-5 transition ease-linear" />
                ) : link.label === "LinkedIn" ? (
                  <LinkedInLogoIcon className="w-5 h-5 transition ease-linear" />
                ) : link.label === "Youtube" ? (
                  <i className="bx bxl-youtube text-[20px] leading-none flex items-center justify-center"></i>
                ) : null}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};
