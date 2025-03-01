import { Timeline } from "@/components/ui/timeline";
import { MapPin } from "lucide-react";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => ({
  title: "Work",
  description: "Explore my work.",
});

const workExperience = [
  {
    title: "Jan 2025 - Present",
    content: (
      <>
        <h1 className="text-4xl font-bold mb-3">SDET</h1>
        <span className="text-neutral-700 dark:text-neutral-300 text-base flex items-center gap-x-1 mt-1 mb-2">
          <MapPin className="w-4 h-4" />{" "}
          <span className="hover:underline">
            <a href="https://www.ciena.com/">Ciena</a>
          </span>
        </span>
        <p className="mb-2 text-neutral-700 dark:text-neutral-300">
          Works as an Automation Engineer to develop and maintain automated
          tests for Ciena&apos;s products.
          <br />
        </p>
        🛠️
        <span className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base ">
          {" "}
          Postman, Playwright, Javascript, Testrail, Jira, Newman
        </span>
      </>
    ),
  },
  {
    title: "May - July 2024",
    content: (
      <>
        <h1 className="text-2xl font-bold mb-4">SDE Intern - D2I Technology</h1>
        <p className="mb-2 font-medium">
          Developed{" "}
          <span className="italic underline">Sustainable Discipleship</span>, a
          platform for fostering Christian community and spiritual growth,
          enabling users to create organizations and groups.
          <br />
        </p>
        🛠️
        <span className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base ">
          {" "}
          React, Material UI, MySQL, Knex, Express, Vercel
        </span>
      </>
    ),
  },
  {
    title: "2022 - 2024",
    content: (
      <>
        <h1 className="text-2xl font-bold mb-4">Active Volunteer - ALiAS</h1>
        <p className="mb-2 font-medium">
          <ul className="space-y-2">
            <li>
              Hosted and conducted an{" "}
              <span className="font-semibold underline">
                MEVN Stack Workshop
              </span>{" "}
              and organized{" "}
              <span className="font-semibold underline">4 major events</span>{" "}
              each attracting nearly{" "}
              <span className="font-semibold underline">150 participants</span>
              {". "}
            </li>
            <li>
              Actively participated in organizing events and workshops,
              contributing to the growth and development of the community.
            </li>
          </ul>

          <br />
        </p>
      </>
    ),
  },
  {
    title: "Dec 2023",
    content: (
      <>
        <h1 className="text-2xl font-bold mb-4">Supabase Week X Hackathon</h1>
        <p className="mb-2 font-medium">
          Built <span className="italic underline">BrowserMingle</span>, a
          Chrome extension that connects users consuming similar content.
          <br />
        </p>
        🛠️
        <span className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base ">
          {" "}
          React, Tailwind, Pinecone, Bun, DaisyUI, Supabase
        </span>
      </>
    ),
  },
  {
    title: "Apr - May 2023",
    content: (
      <>
        <h1 className="text-2xl font-bold mb-4">
          SDE Intern - ByFornoTri Tech
        </h1>
        <p className="font-medium">
          <ul className="space-y-2">
            <li>Worked on form recognition system for hospitals in Uganda. </li>
            <li>
              Tested and Validated several forms, making sure that they pass the
              criteria for the AutoCorrection and Clarity system.
            </li>
          </ul>
          <br />
        </p>
        🛠️
        <span className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base ">
          {" "}
          Python, Postman
        </span>
      </>
    ),
  },
];

export default function WorkPage() {
  return <Timeline data={workExperience} />;
}
