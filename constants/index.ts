import { ExternalLinkType, NavLink } from "@/type";
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
  Youtube,
} from "lucide-react";

export const externalLinks: ExternalLinkType[] = [
  {
    label: "Github",
    url: "https://github.com/bhavya-dang",
  },

  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/bhavya-dang-27506b223/",
  },
  {
    url: "https://bhavya-dang.github.io/resume/",
    label: "Resume",
  },
  {
    url: "https://youtube.com/@bhavyadangdev",
    label: "Youtube",
  },
];

export const navLinks: NavLink[] = [
  { href: "/projects", label: "Projects" },
  { href: "/work", label: "Work" },
  { href: "https://wiki.bhavyadang.dev", label: "Wiki" },
  { href: "/art", label: "Art" },
];

export const notionColors: {
  [key: string]: string;
  default: string;
  gray: string;
  brown: string;
  orange: string;
  yellow: string;
  green: string;
  blue: string;
  purple: string;
  pink: string;
  red: string;
} = {
  default: "#37352F",
  gray: "#9B9A97",
  brown: "#64473A",
  orange: "#D9730D",
  yellow: "#DFAB01",
  green: "#0F7B6C",
  blue: "#0B6E99",
  purple: "#6940A5",
  pink: "#AD1A72",
  red: "#E03E3E",
};
