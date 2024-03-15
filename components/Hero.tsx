import RoleScramble from "../app/roles";
import Image from "next/image";

import { socialLinks } from "@/constants/index";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";

export const Hero = () => {
  return (
    <div className="flex items-center justify-center h-[90vh]">
      {/* Purple box */}
      {/* <div className="absolute bg-violet-500 rotate-12 ml-10 w-[500px] h-[500px] z-40"></div> */}

      <div className="text-center w-1/2">
        <h1 className="text-4xl">
          Hi, I&apos;m{" "}
          <span className="text-white py-1 px-3 rounded-full bg-violet-500">
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
        </div>
      </div>
      {/* Purple box */}
      <div className="text-center w-1/2">
        <Image
          src="/me4.jpg" // Replace with the actual path to your image
          height={400}
          width={400}
          alt="Hero Image"
          className="rounded-full"
        />

        {/* </div> */}
      </div>
      {/* <div className="absolute bg-violet-500 rotate-12 ml-10 w-[500px] h-[500px] z-40"></div> */}
    </div>
  );
};
