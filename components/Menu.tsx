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
} from "lucide-react";

import React, { ForwardRefExoticComponent, RefAttributes } from "react";
import { Button } from "./ui/button";
import Link from "next/link";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

const dropdownStyles = {
  item: "h-11 rounded-lg text-sm hover:bg-stone-200 hover:text-black dark:hover:bg-neutral-700 dark:hover:text-white",
  itemLink: "flex flex-row justify-start items-center gap-3",
  itemLabel: "flex flex-row justify-center items-center gap-2",
};

interface NavLinks {
  navLinks: {
    href: string;
    icon: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
    label: string;
  }[];
}

const Menu = ({ navLinks }: NavLinks) => {
  return (
    <div className="lg:hidden md:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="flex items-center gap-2 rounded-md border-2 bg-white dark:bg-black dark:border-neutral-900 border-neutral-300"
            variant="outline"
            size="icon"
          >
            <AlignLeft size="20px" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className={`min-w-[16rem] rounded-[0.75rem] ml-14 border-neutral-300 dark:border-neutral-900 bg-white dark:bg-black dark:text-white ${inter.className}`}
        >
          {navLinks.map((link, index, array) => {
            const isExternalLink = link.href.startsWith("http");
            const nextIsExternalLink =
              index < array.length - 1 &&
              array[index + 1].href.startsWith("http");

            return (
              <React.Fragment key={link.href}>
                <DropdownMenuItem asChild className={dropdownStyles.item}>
                  <Link href={link.href} className={dropdownStyles.itemLink}>
                    <link.icon size="18px" strokeWidth={2} />
                    <span className={dropdownStyles.itemLabel}>
                      {link.label}
                      {isExternalLink && (
                        <ExternalLink size={11} strokeWidth={2} />
                      )}
                    </span>
                  </Link>
                </DropdownMenuItem>
                {!isExternalLink && nextIsExternalLink && (
                  <DropdownMenuSeparator className="dark:bg-neutral-600 bg-neutral-300" />
                )}
              </React.Fragment>
            );
          })}
          {/* <DropdownMenuSeparator className="dark:bg-neutral-600 bg-neutral-300" />
          <DropdownMenuItem asChild className={dropdownStyles.item}>
            <Link
              href="https://bhavya-dang.github.io/resume/"
              target="_blank"
              className={dropdownStyles.itemLink}
            >
              <FileDigit size={"18px"} strokeWidth={1.5} />
              <span className={dropdownStyles.itemLabel}>
                resume
                <ExternalLink size={11} strokeWidth={2} />
              </span>
            </Link>
          </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Menu;
