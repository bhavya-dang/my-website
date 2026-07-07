import { ReactNode } from "react";

export const experiences: {
  title: string;
  company: string;
  companyLink?: string;
  duration: string;
  location: string;
  highlights?: ReactNode[];
  techStack: string[];
}[] = [
  {
    title: "SVT/PV Software Systems Engineer",
    company: "Ciena",
    companyLink: "https://www.ciena.com/",
    duration: "Jul 2025 — Present",
    location: "Hybrid, Delhi",
    highlights: [
      "Led a multi-sprint infrastructure optimisation initiative that achieved a 100% pass rate across multiple releases",
      "Built dynamic AI utilities for regression and root-cause analysis, increasing testing workflow efficiency by ~20%",
      "Develop and maintain automated test suites for Navigator NCS, Ciena's photonic network management platform",
      "Drive cross-functional collaboration with development and network engineering teams to refine testing methodologies",
    ],
    techStack: [
      "Postman",
      "Playwright",
      "Javascript",
      "Testrail",
      "Jira",
      "Newman",
      "Teamcity",
    ],
  },
  {
    title: "SDET Intern",
    company: "Ciena",
    companyLink: "https://www.ciena.com/",
    duration: "Jan 2025 — Jun 2025",
    location: "Hybrid, Delhi",
    highlights: [
      "Prototyped a Playwright-based API automation rewrite for PlannerPlus, targeting significantly faster and more versatile test execution",
      "Proposed and shipped enhancements to existing API automation scripts, improving readability and reducing testing downtime",
      "Partnered with development and network engineering teams to improve test coverage and software quality",
    ],
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
    title: "Co-founder",
    company: "Thinkspace",
    companyLink: "https://thinkspacedel.in",
    duration: "Jun 2026 — Present",
    location: "Delhi",
    highlights: [
      "Co-founded a creative maker community in Delhi for people who actively build and create — 10+ members within the first week of launch",
      "Built the full-stack platform (React + Supabase + Netlify) with an admin review dashboard, RLS policies, and automated member approval workflows",
      "Lead brand design and community growth, including Instagram content and identity system",
    ],
    techStack: ["React", "Supabase", "Netlify", "Tailwind"],
  },
  {
    title: "Full-Stack Trainee",
    company: "D2I Technology",
    companyLink: "https://www.sustainable-discipleship.com/",
    duration: "May 2024 — Jul 2024",
    location: "Remote",
    highlights: [
      "Built the Sustainable Discipleship platform — community management, Scripture integration, and role-based UI for hundreds of members",
      "Implemented GDPR-compliant data privacy protocols and secure authentication across the platform",
    ],
    techStack: ["React", "MySQL", "Knex.js", "Material UI"],
  },
  {
    title: "Active Volunteer",
    company: "ALiAS — Amity Linux Assistance Sapience",
    companyLink: "https://asetalias.in/",
    duration: "2022 — 2024",
    location: "Delhi",
    highlights: [
      "Conducted a MEVN Stack workshop attended by 50+ participants",
      "Organised 4 back-to-back major events averaging 150 attendees each",
    ],
    techStack: [],
  },
  {
    title: "Participant",
    company: "Supabase Week X Hackathon",
    companyLink: "https://supabase.com/blog/supabase-hackathon-lwx",
    duration: "Dec 2023",
    location: "Remote",
    highlights: [
      <>
        Built{" "}
        <a
          href="https://bhavya-dang.github.io/browser-mingle"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent underline"
        >
          browser-mingle
        </a>
        , a Chrome extension connecting users browsing similar content in
        real-time
      </>,
    ],
    techStack: ["React", "Tailwind", "Pinecone", "Bun", "DaisyUI", "Supabase"],
  },
  {
    title: "Participant",
    company: "HackTheMountains 2.0 Hackathon",
    companyLink: "https://hackthemountains2.devfolio.co/",
    duration: "Sep 2022",
    location: "Remote",
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
