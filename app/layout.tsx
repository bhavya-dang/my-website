import "./globals.css";
import type { Metadata } from "next";

import { Navbar } from "../components/Navbar";
import { Analytics } from "@vercel/analytics/react";

// const determineInitialTheme = (): string => {
//   // Check if the user has a stored preference in localStorage
//   const storedTheme = localStorage.getItem("theme");

//   // If there is a stored preference, use it
//   if (storedTheme) {
//     console.log("storedTheme: ", storedTheme);
//     return storedTheme;
//   }

//   // If not, check the user's system preference
//   const systemDarkMode = window.matchMedia(
//     "(prefers-color-scheme: dark)"
//   ).matches;

//   // Use the system preference if available
//   if (systemDarkMode) {
//     return "dark";
//   }

//   // Fallback to a default theme if none of the above conditions are met
//   return "light";
// };

// // Usage example
// const initialTheme: string = determineInitialTheme();

export const metadata: Metadata = {
  title: "Bhavya Dang",
  description:
    "Bhavya Dang's super awesome amazing fantastic marvelous website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="">
      <head>
        <link rel="icon" href="/SY__.png" sizes="any" />
      </head>
      <body className="font-mono m-auto p-4 bg-slate-200 dark:bg-[#212121]">
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
