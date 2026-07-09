import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/context/ThemeContext";
import { Navbar } from "@/components/Navbar";
import { AudioProvider } from "@/context/AudioContext";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const baseUrl = "https://bhavyadang.in";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    template: "%s | Bhavya Dang",
    default: "Bhavya Dang",
  },
  description: "Bhavya Dang — Developer, Designer, Creator",
  keywords: [
    "Bhavya Dang",
    "developer",
    "designer",
    "portfolio",
    "full stack",
    "next.js",
    "react",
  ],
  openGraph: {
    title: "Bhavya Dang",
    description: "Bhavya Dang — Developer, Designer, Creator",
    url: baseUrl,
    siteName: "Bhavya Dang",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/meV.jpg",
        width: 1200,
        height: 1200,
        alt: "Bhavya Dang",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bhavya Dang",
    description: "Bhavya Dang — Developer, Designer, Creator",
    images: ["/meV.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: baseUrl,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <link rel="icon" href="/terminal.svg" sizes="any" />
        <meta name="theme-color" content="#f5f5f7" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0e0e12" media="(prefers-color-scheme: dark)" />
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
      <body className="bg-background text-foreground">
        <ThemeProvider>
          <AudioProvider>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-lg focus:outline-none"
            >
              Skip to content
            </a>
            <Navbar />
            <main id="main-content">{children}</main>
          </AudioProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
