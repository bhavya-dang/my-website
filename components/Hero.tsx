import Image from "next/image";
import RoleScramble from "../app/roles";

import { socialLinks } from "@/constants/index";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import WorkStatus from "@/components/work-status";

export const Hero = () => {
  return (
    <div className="flex items-center h-[91vh] w-full">
      <div className="text-center w-1/2">
        <h1 className="-ml-28 text-4xl">
          Hi, I&apos;m{" "}
          <span className="text-white py-1 px-3 rounded-full bg-violet-500 shadow-lg shadow-violet-500/85">
            Bhavya Dang
          </span>
        </h1>

        <div className="ml-[21%]">
          <RoleScramble />

          <ul className="social-links flex gap-4 mt-4">
            {socialLinks.map((s, i) => (
              <li key={i}>
                <a href={s.url} target="_blank">
                  {s.name === "github" ? (
                    <GitHubLogoIcon className="w-5 h-5 opacity-100 hover:opacity-80 transition ease-linear duration-150" />
                  ) : (
                    <LinkedInLogoIcon className="w-5 h-5 opacity-100 hover:opacity-80 transition ease-linear duration-150" />
                  )}
                </a>
              </li>
            ))}
          </ul>
          <WorkStatus />
        </div>
      </div>

      <div className="text-center w-1/2">
        <Image
          src="/me4.jpg"
          height={400}
          width={400}
          alt="Hero Image"
          className="rounded-full dark:shadow-[0_0_5rem_-0.5rem_#fff8] shadow-[0_0_5rem_-0.5rem_#000] hero-join-button-dark-i transition-all duration-300 p-[1px]"
        />
      </div>
    </div>
  );
};
