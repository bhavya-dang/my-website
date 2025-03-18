"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  AlignLeft,
  ExternalLink,
  Home,
  Feather,
  Github,
  LinkedinIcon,
  Frame,
  FileDigit,
  Images,
  Mic,
  Mic2,
  LucideProps,
  AlignRight,
} from "lucide-react";

import React, { ForwardRefExoticComponent, RefAttributes } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { NavLink } from "@/type";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

const Menu = ({ navLinks }: { navLinks: NavLink[] }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="flex items-center gap-2 rounded-md border-2 bg-white dark:bg-black dark:border-neutral-900 border-neutral-300"
          variant="outline"
          size="icon"
        >
          <AlignLeft size="1.5rem" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        side="bottom"
        className={`w-[200px] rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black p-2 ${inter.className}`}
        sideOffset={5}
      >
        {navLinks.map((link, index) => {
          const isExternalLink = link.href.startsWith("http");

          return (
            <Link
              href={link.href}
              key={link.href}
              className="block w-full"
              target={isExternalLink ? "_blank" : undefined}
              rel={isExternalLink ? "noopener noreferrer" : undefined}
            >
              <DropdownMenuItem className="w-full px-3 py-2 text-sm rounded-lg cursor-pointer transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:bg-neutral-100 dark:focus:bg-neutral-800 outline-none">
                <span className="flex items-center gap-2">
                  {link.label}
                  {isExternalLink && (
                    <ExternalLink
                      size={12}
                      className="text-neutral-500 dark:text-neutral-400"
                    />
                  )}
                </span>
              </DropdownMenuItem>
            </Link>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Menu;
