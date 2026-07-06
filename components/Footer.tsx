"use client";

import { externalLinks } from "@/constants";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";

export const Footer = () => {
  return (
    <footer className="border-t border-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-12 md:py-16">
        <div className="flex items-center justify-center gap-6">
          {externalLinks.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label={link.label}
            >
              {link.label === "Github" ? (
                <GitHubLogoIcon className="w-5 h-5" />
              ) : link.label === "LinkedIn" ? (
                <LinkedInLogoIcon className="w-5 h-5" />
              ) : link.label === "Youtube" ? (
                <span className="text-sm font-bold">YT</span>
              ) : null}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
