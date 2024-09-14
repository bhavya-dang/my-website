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
  description: "Bhavya Dang | Full Stack Developer",
  openGraph: {
    title: "Bhavya Dang",
    description: "Bhavya Dang | Full Stack Developer",
    url: "https://bhavyadang.tech",
    siteName: "Bhavya Dang",
    images: [
      {
        url: "https://github.com/bhavya-dang/my-website/blob/master/public/bhavyadang.jpeg?raw=true", // Use a valid absolute URL for the image
        width: 800,
        height: 600,
        alt: "Bhavya Dang profile image",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="">
      <head>
        <link rel="icon" href="/terminal.svg" sizes="any" />
      </head>
      <body className="font-mono m-auto bg-slate-200 dark:bg-black selection:bg-white selection:text-violet-900">
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
