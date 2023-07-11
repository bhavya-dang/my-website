import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "./components/Navbar";
const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/SY__.png" sizes="any" />
      </head>
      <body className={`${inter.className} m-auto  p-4`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
