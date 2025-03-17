import { Timeline } from "@/components/ui/timeline";
import { ArrowRight, ExternalLink, MapPin } from "lucide-react";
import { Metadata } from "next";
import React from "react";

export const generateMetadata = (): Metadata => ({
  title: "Journey",
  description: "Explore my journey.",
});

interface ExperienceProps {
  title: string;
  company: string;
  companyLink?: string;
  location?: string;
  description: React.ReactNode;
  techStack: string[];
}

const ExperienceCard = ({
  title,
  company,
  companyLink,
  location,
  description,
  techStack,
}: ExperienceProps) => {
  return (
    <div>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3">
        {title}
      </h1>
      <div className="text-neutral-700 dark:text-neutral-300 text-sm sm:text-lg md:text-xl flex items-center gap-x-1 mt-1 mb-2">
        <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
        {companyLink ? (
          <a
            href={companyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline inline-flex items-center gap-1"
          >
            {company}
            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 opacity-50" />
          </a>
        ) : (
          <span>{company}</span>
        )}
      </div>
      {React.isValidElement(description) && description.type === "ul" ? (
        <ul className="mb-3 text-sm sm:text-base text-neutral-700 dark:text-neutral-300 space-y-2 list-disc pl-4">
          {React.Children.map(description.props.children, (child) => (
            <li>{child}</li>
          ))}
        </ul>
      ) : (
        <p className="mb-3 text-sm sm:text-base text-neutral-700 dark:text-neutral-300">
          {description}
        </p>
      )}
      {techStack.length > 0 && (
        <div className="flex flex-wrap gap-2 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
          <span>🛠️ {techStack.join(", ")}</span>
        </div>
      )}
    </div>
  );
};

// const experiences = [
//   {
//     title: "Jan 2025 - Present",
//     content: (
//       <>
//         <h1 className="text-4xl font-bold mb-3">SDET Intern</h1>
//         <span className="text-neutral-700 dark:text-neutral-300 text-xl flex items-center gap-x-1 mt-1 mb-2">
//           <MapPin className="w-5 h-5" />{" "}
//           <span className="hover:underline">
//             <a href="https://www.ciena.com/">Ciena</a>
//           </span>
//         </span>
//         <p className="mb-2 text-neutral-700 dark:text-neutral-300">
//           Works as an Automation Engineer to develop and maintain automated
//           tests for Ciena&apos;s products.
//           <br />
//         </p>
//         🛠️
//         <span className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base ">
//           {" "}
//           Postman, Playwright, Javascript, Testrail, Jira, Newman
//         </span>
//       </>
//     ),
//   },
//   {
//     title: "May - July 2024",
//     content: (
//       <>
//         <h1 className="text-4xl font-bold mb-3">SDE Intern</h1>
//         <span className="text-neutral-700 dark:text-neutral-300 text-xl flex items-center gap-x-1 mt-1 mb-2">
//           <MapPin className="w-5 h-5" />{" "}
//           <span className="hover:underline">
//             <a href="https://d2itechnology.com/">D2I Technology</a>
//           </span>
//         </span>
//         <p className="mb-2 text-neutral-700 dark:text-neutral-300">
//           Developed{" "}
//           <span className="underline italic">Sustainable Discipleship</span>, a
//           platform for fostering Christian community and spiritual growth,
//           enabling users to create organizations and groups.
//           <br />
//         </p>
//         🛠️
//         <span className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base ">
//           {" "}
//           React, MySQL, Knex.js, Material UI
//         </span>
//       </>
//     ),
//   },
//   {
//     title: "2022 - 2024",
//     content: (
//       <>
//         <h1 className="text-4xl font-bold mb-3">Active Volunteer</h1>
//         <span className="text-neutral-700 dark:text-neutral-300 text-xl flex items-center gap-x-1 mt-1 mb-2">
//           <MapPin className="w-5 h-5" />{" "}
//           <span className="hover:underline">
//             <a href="https://asetalias.in/">ALiAS</a>
//           </span>
//         </span>
//         <ul className="mb-2 text-neutral-700 dark:text-neutral-300 space-y-2">
//           <li>
//             Hosted and conducted an{" "}
//             <span className="font-semibold">MEVN Stack Workshop</span> and
//             organized 4 major events each attracting nearly{" "}
//             <span className="font-semibold">150 participants</span>.{" "}
//           </li>
//           <li>
//             Actively participated in organizing events and workshops,
//             contributing to the growth and development of the community.
//           </li>
//         </ul>
//       </>
//     ),
//   },
//   {
//     title: "Dec 2023",
//     content: (
//       <>
//         <h1 className="text-4xl font-bold mb-3">Participant</h1>
//         <span className="text-neutral-700 dark:text-neutral-300 text-xl flex items-center gap-x-1 mt-1 mb-2">
//           <MapPin className="w-5 h-5" />{" "}
//           <span className="hover:underline">
//             <a href="https://supabase.com/blog/supabase-hackathon-lwx">
//               Supabase Week X Hackathon
//             </a>
//           </span>
//         </span>
//         <p className="mb-2 text-neutral-700 dark:text-neutral-300">
//           Built <span className="underline italic">BrowserMingle</span>, a
//           Chrome extension that connects users consuming similar content.
//           <br />
//         </p>
//         🛠️
//         <span className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base ">
//           {" "}
//           React, Tailwind, Pinecone, Bun, DaisyUI, Supabase
//         </span>
//       </>
//     ),
//   },
//   {
//     title: "Apr - May 2023",
//     content: (
//       <>
//         <h1 className="text-4xl font-bold mb-3">SDE Intern</h1>
//         <span className="text-neutral-700 dark:text-neutral-300 text-xl flex items-center gap-x-1 mt-1 mb-2">
//           <MapPin className="w-5 h-5" />{" "}
//           <span className="hover:underline">
//             <span className="hover:underline hover:cursor-pointer">
//               ByFornoTri Tech
//             </span>
//           </span>
//         </span>
//         <ul className="mb-2 text-neutral-700 dark:text-neutral-300 space-y-2">
//           <li>Worked on form recognition system for hospitals in Uganda.</li>
//           <li>
//             Tested and Validated several forms, making sure that they pass the
//             criteria for the AutoCorrection and Clarity system.
//           </li>
//         </ul>
//         🛠️
//         <span className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base ">
//           {" "}
//           Python
//         </span>
//       </>
//     ),
//   },
//   {
//     title: "September 2022",
//     content: (
//       <>
//         <h1 className="text-4xl font-bold mb-3">Participant</h1>
//         <span className="text-neutral-700 dark:text-neutral-300 text-xl flex items-center gap-x-1 mt-1 mb-2">
//           <MapPin className="w-5 h-5" />{" "}
//           <span className="hover:underline">
//             <a href="https://hackthemountains2.devfolio.co/">
//               HackTheMountains 2.0 Hackathon
//             </a>
//           </span>
//         </span>
//         <p className="mb-2 text-neutral-700 dark:text-neutral-300">
//           Built{" "}
//           <a
//             className="underline italic"
//             href="https://github.com/bhavya-dang/rpi-purifier?tab=readme-ov-file#raspberry-pi---centralised-air-purifying-system"
//           >
//             rpi-purifier
//           </a>
//           , a completely autonomous and centralised air purifying system for
//           your home.
//           <br />
//         </p>
//         <p className="flex flex-col">
//           <span className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base">
//             {"🛠️ "}
//             Raspberry Pi 4, Vue.js, MongoDB, Tailwind CSS, Twilio API,
//             OpenWeather API
//           </span>
//         </p>
//       </>
//     ),
//   },
// ];

const experiences = [
  {
    title: "SDET Intern",
    company: "Ciena",
    companyLink: "https://www.ciena.com/",
    location: "Jan 2025 - Present",
    description:
      "Works as an Automation Engineer to develop and maintain automated tests for Ciena's products.",
    techStack: [
      "Postman",
      "Playwright",
      "Javascript",
      "Testrail",
      "Jira",
      "Newman",
    ],
  },
  {
    title: "SDE Intern",
    company: "D2I Technology",
    companyLink: "https://d2itechnology.com/",
    location: "May - July 2024",
    description: (
      <>
        Developed{" "}
        <span className="underline italic">Sustainable Discipleship</span>, a
        platform for fostering Christian community and spiritual growth,
        enabling users to create organizations and groups.
      </>
    ),
    techStack: ["React", "MySQL", "Knex.js", "Material UI"],
  },
  {
    title: "Active Volunteer",
    company: "ALiAS",
    companyLink: "https://asetalias.in/",
    location: "2022 - 2024",
    description: (
      <ul className="mb-2 text-neutral-700 dark:text-neutral-300 space-y-2">
        <li>
          Hosted and conducted an{" "}
          <span className="font-semibold">MEVN Stack Workshop</span> and
          organized 4 major events each attracting nearly{" "}
          <span className="font-semibold">150 participants</span>.
        </li>
        <li>
          Actively participated in organizing events and workshops, contributing
          to the growth and development of the community.
        </li>
      </ul>
    ),
    techStack: [],
  },
  {
    title: "Participant",
    company: "Supabase Week X Hackathon",
    companyLink: "https://supabase.com/blog/supabase-hackathon-lwx",
    location: "Dec 2023",
    description: (
      <>
        Built <span className="underline italic">BrowserMingle</span>, a Chrome
        extension that connects users consuming similar content.
      </>
    ),
    techStack: ["React", "Tailwind", "Pinecone", "Bun", "DaisyUI", "Supabase"],
  },
  {
    title: "SDE Intern",
    company: "ByFornoTri Tech",
    location: "Apr - May 2023",
    description: (
      <ul className="mb-2 text-neutral-700 dark:text-neutral-300 space-y-2">
        <li>Worked on form recognition system for hospitals in Uganda.</li>
        <li>
          Tested and validated several forms, ensuring compatibility with
          AutoCorrection and Clarity system.
        </li>
      </ul>
    ),
    techStack: ["Python"],
  },
  {
    title: "Participant",
    company: "HackTheMountains 2.0 Hackathon",
    companyLink: "https://hackthemountains2.devfolio.co/",
    location: "September 2022",
    description: (
      <>
        Built{" "}
        <a
          className="underline italic"
          href="https://github.com/bhavya-dang/rpi-purifier?tab=readme-ov-file#raspberry-pi---centralised-air-purifying-system"
        >
          rpi-purifier
        </a>
        , a completely autonomous and centralized air purifying system for your
        home.
      </>
    ),
    techStack: [
      "Raspberry Pi 4",
      "Vue.js",
      "MongoDB",
      "Tailwind CSS",
      "Twilio API",
      "OpenWeather API",
    ],
  },
];

export default async function JourneyPage() {
  return (
    <div className="px-2 sm:px-4 md:px-6 lg:px-20">
      <Timeline
        data={experiences.map((exp) => ({
          title: exp.location,
          content: <ExperienceCard {...exp} />,
        }))}
      />
    </div>
  );
}
