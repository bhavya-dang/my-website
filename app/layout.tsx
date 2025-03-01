import "./globals.css";
import type { Metadata } from "next";

import { Navbar } from "../components/Navbar";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: {
    template: "%s | Bhavya Dang",
    default: "Bhavya Dang",
  },
  description: "Bhavya Dang | Full Stack Developer",
  openGraph: {
    title: "Bhavya Dang",
    description: "Bhavya Dang | Full Stack Developer",
    url: "https://bhavyadang.in",
    siteName: "Bhavya Dang",
    images: [
      {
        url: "https://github.com/bhavya-dang/my-website/blob/master/public/bhavyadang.jpeg?raw=true",
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
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
      </head>
      <body className="m-auto bg-white dark:bg-black selection:bg-white selection:text-violet-900 px-36">
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
