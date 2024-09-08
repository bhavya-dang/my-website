"use client";

import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import Menu from "./Menu";
import { navLinks } from "@/constants";

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
    <nav className="flex p-4 justify-between font-mono text-slate-800 dark:text-slate-200 items-center mt-2 ml-3">
      <ul className="hidden nav-links md:flex gap-8">
        {navLinks.map((link, index) => (
          <li
            key={index}
            className="hover:bg-violet-500 hover:text-white rounded"
          >
            <a
              href={link.href}
              target={link.external ? "_blank" : "_self"}
              className="flex gap-1 items-center"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <Menu />
      <div className="flex gap-4">
        <button className="flex items-center mr-5" onClick={handleThemeToggle}>
          {/* <SunIcon className="w-5 h-5" /> */}
          {theme === "light" ? (
            <MoonIcon className="w-[25px] h-[25px] hover:animate-wiggle transition ease-linear duration-150" />
          ) : (
            <SunIcon className="w-[25px] h-[25px] hover:animate-spin-slow transition ease-linear duration-150" />
          )}
        </button>
      </div>
    </nav>
  );
};
