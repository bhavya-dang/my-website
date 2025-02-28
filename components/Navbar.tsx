/* eslint-disable @next/next/no-img-element */
"use client";

import { SunIcon, MoonIcon, HomeIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import Menu from "./Menu";
import { navLinks } from "@/constants";
import { Home } from "lucide-react";
import { FloatingDockDemo } from "./FloatingDock";

import { Inter } from "next/font/google";
import Image from "next/image";
const inter = Inter({ subsets: ["latin"] });

export const Navbar = () => {
  const [theme, setTheme] = useState("light"); // Default to light theme

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (!storedTheme) {
      localStorage.setItem("theme", "light");
    }
    if (storedTheme === "light") {
      setTheme(storedTheme);
    } else {
      document
        .querySelector("html")
        ?.classList.toggle("dark", theme === "dark" ? true : false);

      setTheme("dark");
    }
  }, [theme]);

  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    document
      .querySelector("html")
      ?.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <nav
      className={`flex p-4 px-36 justify-between ${inter.className} text-slate-800 dark:text-slate-200 items-center mt-6 font-medium`}
    >
      <h1 className="text-2xl font-semibold">
        <a href="/" className="flex gap-1 items-center">
          Bhavya Dang
        </a>
      </h1>
      <div className="flex space-x-3">
        <ul className="hidden nav-links lg:flex gap-x-1">
          {navLinks.map((link, index) => (
            <li
              key={index}
              className={`px-3 py-1 hover:cursor-pointer text-black/90 hover:text-black dark:text-white/90 dark:hover:text-white text-md transition-all ease-in-out duration-[0.3s]`}
            >
              <a href={link.href} className="flex gap-1 items-center">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <button className="flex items-center" onClick={handleThemeToggle}>
          {/* <SunIcon className="w-5 h-5" /> */}
          {theme === "light" ? (
            <MoonIcon className="w-[24px] h-[24px] hover:animate-wiggle transition ease-linear duration-150" />
          ) : (
            <SunIcon className="w-[24px] h-[24px] hover:animate-spin-slow transition ease-linear duration-150" />
          )}
        </button>
      </div>
      {/* <FloatingDockDemo /> */}

      {/* <div className="flex items-center gap-3"> */}
      {/* <a href="/" className="lg:hidden font-semibold">
          <Home size={20} strokeWidth={1.8} />
        </a> */}

      {/* <Menu navLinks={navLinks} /> */}
      {/* </div> */}
    </nav>
  );
};
