import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import { Navbar } from "../components/Navbar";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/terminal.svg" sizes="any" />
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body
        className={`${inter.className} m-auto bg-white dark:bg-black selection:bg-white selection:text-violet-900 px-4 sm:px-8 md:px-16 lg:px-36`}
      >
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
