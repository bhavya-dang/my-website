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
export const socialLinks = [
  {
    name: "github",
    url: "https://github.com/bhavya-dang",
  },

  {
    name: "linkedin",
    url: "https://www.linkedin.com/in/bhavya-dang-27506b223/",
  },
];

export const navLinks = [
  { href: "/", label: "Home", external: false, icon: Home },
  { href: "/projects", label: "Projects", external: false, icon: Frame },
  { href: "/gallery", label: "Gallery", external: false, icon: Images },
  {
    href: "https://bhavya-dang.github.io/resume/",
    label: "Resume",
    external: true,
    icon: FileDigit,
  },
  {
    href: "https://youtube.com/@bhavyadangdev",
    label: "YouTube",
    external: true,
    icon: Youtube,
  },
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
