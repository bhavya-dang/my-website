import Image from "next/image";
import RoleScramble from "../app/roles";
import { socialLinks } from "@/constants/index";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import WorkStatus from "@/components/work-status";

export const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center md:h-[91vh] h-screen w-full">
      <div className="small-hero w-full flex justify-center mb-8">
        <Image
          src="/me4.jpg"
          height={200}
          width={200}
          alt="Hero Image"
          className="md:hidden mr-6 rounded-full dark:shadow-[0_0_5rem_-0.5rem_#fff8] shadow-[0_0_5rem_-0.5rem_#000] hero-join-button-dark-i transition-all duration-300 p-[1px]"
        />
      </div>

      <div className="flex flex-col items-center w-full mt-14 md:w-1/2 md:items-start text-center md:text-left">
        <h1 className="text-4xl md:text-4xl font-inter font-bold text-black dark:text-white">
          Hi, I&apos;m{" "}
          <span className="md:py-1 md:px-3 md:rounded-full md:bg-violet-500 md:shadow-lg md:shadow-violet-500/85">
            Bhavya Dang
          </span>
        </h1>

        <div className="mt-3 flex flex-col items-center mr-12">
          <RoleScramble className="font-mono italic text-2xl md:text-3xl font-semibold text-neutral-500 text-center md:text-left" />

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

      <div className="hidden md:flex justify-center w-full md:w-1/2">
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
