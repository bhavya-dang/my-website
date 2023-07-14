"use client";

import { socialLinks } from "@/constants/index";
import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  SunIcon,
  MoonIcon,
} from "@radix-ui/react-icons";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    if (localTheme) {
      setTheme(localTheme);
    } else {
      document.querySelector("html")?.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }, []);

  const handleThemeToggle = () => {
    if (theme === "dark") {
      document.querySelector("html")?.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      document.querySelector("html")?.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    }
  };

  return (
    <nav className="flex justify-between font-inter text-white items-center mt-2 ml-3">
      <ul className="nav-links flex gap-8">
        <li className="hover:text-[#a29bfe]">
          <a href="/">Home</a>
        </li>
        <li className="hover:text-[#a29bfe]">
          <a href="/projects">Projects</a>
        </li>
        <li className="hover:text-[#a29bfe]">
          <a href="/blogs">Blogs</a>
        </li>
        <li className="hover:text-[#a29bfe]">
          <a
            href="https://sync-codes.github.io/resume/"
            target="_blank"
            className="flex gap-1 items-center"
          >
            Resume{" "}
            <span className="w-[0.1rem] h-[0.1rem] relative">
              {" "}
              <ArrowUpRightIcon className="h-3 w-3 text-gray-400 absolute top-1/2 -right-[0.68rem] transform -translate-y-1/2" />
            </span>
          </a>
        </li>
      </ul>
      <div className="flex gap-4">
        <button
          className="flex items-center opacity-60 hover:opacity-100"
          onClick={handleThemeToggle}
        >
          <SunIcon className="w-5 h-5" />
        </button>
        <ul className="social-links flex gap-4">
          {socialLinks.map((s, i) => (
            <li key={i}>
              <a href={s.url} target="_blank">
                {s.name === "github" ? (
                  <GitHubLogoIcon className="w-5 h-5 opacity-60 hover:opacity-100" />
                ) : (
                  <LinkedInLogoIcon className="w-5 h-5 opacity-60 hover:opacity-100" />
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
