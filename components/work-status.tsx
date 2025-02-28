import React from "react";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const WorkStatus = () => {
  return (
    <div className="flex items-center gap-x-2 mt-5 ml-3 md:ml-0 md:text-left">
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-red"></span>
      </span>
      <p className="font-mono text-neutral-500">
        <a
          href="https://www.ciena.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          working @ciena
        </a>
      </p>
    </div>
  );
};

export default WorkStatus;
