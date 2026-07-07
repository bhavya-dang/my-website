import { ExternalLinkType, NavLink } from "@/type";

export const externalLinks: ExternalLinkType[] = [
  {
    label: "Github",
    url: "https://github.com/bhavya-dang",
  },

  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/bhavya-dang-27506b223/",
  },
  // {
  //   url: "http://resume.bhavyadang.in/",
  //   label: "Resume",
  // },
  {
    url: "https://youtube.com/@bhavyadangdev",
    label: "Youtube",
  },
];

export const navLinks: NavLink[] = [
  { href: "/#hero", label: "Home" },
  { href: "/#now", label: "Now" },
  { href: "/#stack", label: "Stack" },
  { href: "/#projects", label: "Projects" },
  { href: "/#experience", label: "Experience" },
  { href: "/#videos", label: "Videos" },
  { href: "/#art", label: "Art" },
  { href: "https://wiki.bhavyadang.in", label: "Wiki" },
  { href: "https://resume.bhavyadang.in", label: "Resume" },
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

export const changelog = [
  {
    date: "07/07/26",
    items: ["major site overhaul", "switched to a single page layout"],
  },
  {
    date: "16/06/26",
    items: [
      "fixed resume site's DNS issue",
      "added resume link to the command palette!",
    ],
  },
  {
    date: "29/03/26",
    items: [
      "added a command palette to easily perform operations and navigate within the site",
      "added this changelog banner!",
    ],
  },
  {
    date: "28/03/25",
    items: ["created a TUI version of this website; will be published soon"],
  },
];
