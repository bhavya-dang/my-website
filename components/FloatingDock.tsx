import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import { Home, Feather, Frame, FileDigit, Images } from "lucide-react";
import Image from "next/image";

export function FloatingDockDemo() {
  const links = [
    {
      title: "Home",
      icon: (
        <Home className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/",
    },

    {
      title: "Projects",
      icon: (
        <Frame className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/projects",
    },
    {
      title: "Blogs",
      icon: (
        <Feather className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/blogs",
    },
    {
      title: "Gallery",
      icon: (
        <Images className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/gallery",
    },
    {
      title: "Resume",
      icon: (
        <FileDigit className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://bhavya-dang.github.io/resume/",
      external: true,
    },
  ];
  return (
    <div className="flex items-center justify-center">
      <FloatingDock items={links} />
    </div>
  );
}
