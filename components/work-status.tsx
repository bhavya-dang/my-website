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
    <div className="flex items-center gap-x-2 mt-5 ml-3 md:text-left">
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
      </span>
      <p className="font-mono text-neutral-500">Open to work</p>
    </div>
  );
};

export default WorkStatus;