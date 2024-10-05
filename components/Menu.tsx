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
} from "lucide-react";

import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

import { socialLinks } from "@/constants/index";

const dropdownStyles = {
  item: "h-11 rounded-lg text-md hover:bg-[#212121]",
  itemLink: "flex flex-row justify-start items-center gap-3",
  itemLabel: "flex flex-row justify-center items-center gap-2",
};

const Menu = () => {
  return (
    <div className="lg:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="flex items-center gap-2 rounded-md border-2 bg-white dark:bg-black dark:border-neutral-600 border-neutral-300"
            variant="outline"
            size="icon"
          >
            <AlignLeft size="20px" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="min-w-[16rem] font-mono rounded-[0.75rem] ml-14 border-neutral-300 dark:border-neutral-600 bg-white dark:bg-black dark:text-white"
        >
          <DropdownMenuItem asChild className={dropdownStyles.item}>
            <Link href="/" className={dropdownStyles.itemLink}>
              <Home size={"18px"} strokeWidth={1.5} />
              <span>home</span>
            </Link>
          </DropdownMenuItem>
          {/* <DropdownMenuItem asChild className={dropdownStyles.item}>
            <Link href="/blogs" className={dropdownStyles.itemLink}>
              <Feather size={"18px"} strokeWidth={1.5} />
              <span>blogs</span>
            </Link>
          </DropdownMenuItem> */}
          <DropdownMenuItem asChild className={dropdownStyles.item}>
            <Link href="/gallery" className={dropdownStyles.itemLink}>
              <Images size={"18px"} strokeWidth={1.5} />
              <span>gallery</span>
            </Link>
          </DropdownMenuItem>
          {/* <DropdownMenuItem asChild className={dropdownStyles.item}>
            <Link href="/talks" className={dropdownStyles.itemLink}>
              <Mic2 size={"18px"} strokeWidth={1.5} />
              <span>talks</span>
            </Link>
          </DropdownMenuItem> */}
          <DropdownMenuItem asChild className={dropdownStyles.item}>
            <Link href="/projects" className={dropdownStyles.itemLink}>
              <Frame size={"18px"} strokeWidth={1.5} />
              <span className={dropdownStyles.itemLabel}>projects</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="dark:bg-neutral-600 bg-neutral-300" />
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
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Menu;
