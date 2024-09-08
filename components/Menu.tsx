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
} from "lucide-react";

import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

import { socialLinks } from "@/constants/index";

const dropdownStyles = {
  item: "h-11 rounded-lg text-md hover:bg-[#212121]",
};

const Menu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="flex items-center gap-2 rounded-md border-2 border-neutral-600"
          variant="outline"
          size="icon"
        >
          <AlignLeft size="25px" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-[16rem] font-mono rounded-[0.75rem] ml-8 border-neutral-600 bg-black"
      >
        <DropdownMenuItem asChild className={dropdownStyles.item}>
          <Link
            href="/"
            className="flex flex-row justify-start items-center gap-3"
          >
            <Home size={"18px"} strokeWidth={1.5} />
            <span>home</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className={dropdownStyles.item}>
          <Link
            href="/blogs"
            className="flex flex-row justify-start items-center gap-3"
          >
            <Feather size={"18px"} strokeWidth={1.5} />
            <span>blogs</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className={dropdownStyles.item}>
          <Link
            href="/projects"
            target="_blank"
            className="flex flex-row justify-start items-center gap-3"
          >
            <Frame size={"18px"} strokeWidth={1.5} />
            <span className="flex flex-row justify-center items-center gap-2">
              projects
            </span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-neutral-600" />
        <DropdownMenuItem asChild className={dropdownStyles.item}>
          <Link
            href="https://bhavya-dang.github.io/resume/"
            target="_blank"
            className="flex flex-row justify-start items-center gap-3"
          >
            <FileDigit size={"18px"} strokeWidth={1.5} />
            <span className="flex flex-row justify-center items-center gap-2">
              resume
              <ExternalLink size={11} strokeWidth={2} />
            </span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className={dropdownStyles.item}>
          <Link
            href={socialLinks[0].url}
            target="_blank"
            className="flex flex-row justify-start items-center gap-3"
          >
            <Github size={"18px"} strokeWidth={1.5} />
            <span className="flex flex-row justify-center items-center gap-2">
              github
              <ExternalLink size={11} strokeWidth={2} />
            </span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className={dropdownStyles.item}>
          <Link
            href={socialLinks[1].url}
            target="_blank"
            className="flex flex-row justify-start items-center gap-3"
          >
            <LinkedinIcon size={"18px"} strokeWidth={1.5} />
            <span className="flex flex-row justify-center items-center gap-2">
              linkedin
              <ExternalLink size={11} strokeWidth={2} />
            </span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Menu;
