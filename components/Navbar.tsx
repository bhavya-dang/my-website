"use client";

import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  SunIcon,
  MoonIcon,
} from "@radix-ui/react-icons";

import { useEffect, useState } from "react";
// interface NavbarProps {
//   initialTheme: string;
// }
export const Navbar = () => {
  const [theme, setTheme] = useState("light"); // Default to light theme

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme === "light") {
      setTheme(storedTheme);
    } else {
      // const systemDarkMode = window.matchMedia(
      //   "(prefers-color-scheme: dark)"
      // ).matches;
      document
        .querySelector("html")
        ?.classList.toggle("dark", theme === "dark" ? true : false);
      // document.querySelector("html")?.classList.toggle("dark");
      // localStorage.setItem("theme", systemDarkMode ? "dark" : "light");
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
    <nav className="flex justify-between font-mono text-slate-800 dark:text-slate-200 items-center mt-2 ml-3">
      <ul className="nav-links flex gap-8">
        <li className="hover:bg-violet-500 hover:text-white rounded">
          <a href="/">/home</a>
        </li>
        <li className="hover:bg-violet-500 hover:text-white rounded">
          <a href="/projects">/projects</a>
        </li>
        <li className="hover:bg-violet-500 hover:text-white rounded">
          <a href="/blogs">/blogs</a>
        </li>
        <li className="hover:bg-violet-500 hover:text-white rounded">
          <a
            href="https://sync-codes.github.io/resume/"
            target="_blank"
            className="flex gap-1 items-center"
          >
            /resume{" "}
            {/* <span className="w-[0.1rem] h-[0.1rem] relative">
              {" "}
              <ArrowUpRightIcon className="h-3 w-3 text-gray-400 absolute top-1/2 -right-[0.68rem] transform -translate-y-1/2" />
            </span> */}
          </a>
        </li>
      </ul>
      <div className="flex gap-4">
        <button
          className="flex items-center opacity-100 hover:opacity-60 transition ease-linear duration-150"
          onClick={handleThemeToggle}
        >
          {/* <SunIcon className="w-5 h-5" /> */}
          {theme === "light" ? (
            <MoonIcon className="w-5 h-5" />
          ) : (
            <SunIcon className="w-5 h-5" />
          )}
        </button>
      </div>
    </nav>
  );
};
