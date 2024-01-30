"use client";

import { SunIcon, MoonIcon } from "@radix-ui/react-icons";

import { useEffect, useState } from "react";

export const Navbar = () => {
  const [theme, setTheme] = useState("light"); // Default to light theme

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");

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
          </a>
        </li>
      </ul>
      <div className="flex gap-4">
        <button className="flex items-center" onClick={handleThemeToggle}>
          {/* <SunIcon className="w-5 h-5" /> */}
          {theme === "light" ? (
            <MoonIcon className="w-5 h-5 hover:animate-wiggle transition ease-linear duration-150" />
          ) : (
            <SunIcon className="w-5 h-5 hover:animate-spin-slow transition ease-linear duration-150" />
          )}
        </button>
      </div>
    </nav>
  );
};
