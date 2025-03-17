/* eslint-disable @next/next/no-img-element */
"use client";

import { HomeIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import Menu from "./Menu";
import { navLinks } from "@/constants";
import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun } from "lucide-react";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <nav
      className={`flex items-center justify-between p-4 px-6 md:px-10 lg:px-36 mt-6 font-medium ${inter.className} text-slate-800 dark:text-slate-200 w-full`}
    >
      <h1 className="hidden md:flex text-md md:text-2xl lg:text-2xl font-semibold">
        <a href="/">Bhavya Dang</a>
      </h1>

      <div className="flex items-center justify-between w-full md:w-auto">
        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-x-4 nav-links mr-4">
          {navLinks.map(
            (link, index) =>
              link.label !== "Home" && (
                <li
                  key={index}
                  className="px-3 py-1 text-black/90 dark:text-white/90 hover:text-black dark:hover:text-white transition-all duration-300 ease-in-out cursor-pointer"
                >
                  <a href={link.href} className="flex gap-1 items-center">
                    {link.label}
                  </a>
                </li>
              )
          )}
        </ul>

        {/* Mobile Menu */}
        <div className="flex items-center justify-between w-full md:hidden">
          <div className="relative">
            <Menu navLinks={navLinks} />
          </div>
          {/* Theme Toggle Button */}
          <div className="flex-shrink-0">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5 text-slate-800 dark:text-white hover:animate-wiggle transition ease-linear duration-150" />
              ) : (
                <Sun className="w-5 h-5 text-slate-800 dark:text-white hover:animate-spin-slow transition ease-linear duration-150" />
              )}
            </button>
          </div>
        </div>

        {/* Desktop Theme Toggle */}
        <div className="hidden md:block">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5 text-slate-800 dark:text-white hover:animate-wiggle transition ease-linear duration-150" />
            ) : (
              <Sun className="w-5 h-5 text-slate-800 dark:text-white hover:animate-spin-slow transition ease-linear duration-150" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};
