import { Timeline } from "@/components/ui/timeline";
import { ExternalLink, MapPin } from "lucide-react";
import { Metadata } from "next";
import React from "react";
import { experiences } from "@/lib/experiences";

export const generateMetadata = (): Metadata => ({
  title: "Journey",
  description: "Explore my journey.",
});

interface ExperienceProps {
  title: string;
  company: string;
  companyLink?: string;
  duration?: string;
  description?: React.ReactNode;
  techStack: string[];
}

const ExperienceCard = ({
  title,
  company,
  companyLink,
  duration,
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
      {description && (
        typeof description === "string" ? (
          <p className="mb-3 text-sm sm:text-base text-neutral-700 dark:text-neutral-300">
            {description}
          </p>
        ) : (
          <div className="mb-3 text-sm sm:text-base text-neutral-700 dark:text-neutral-300">
            {description}
          </div>
        )
      )}
      {techStack.length > 0 && (
        <div className="flex flex-wrap gap-2 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
          <span>🛠️ {techStack.join(", ")}</span>
        </div>
      )}
    </div>
  );
};

export default async function JourneyPage() {
  const timelineData = experiences.map((exp) => ({
    title: exp.duration,
    content: (
      <ExperienceCard
        title={exp.title}
        company={exp.company}
        companyLink={exp.companyLink}
        duration={exp.duration}
        description={
          exp.highlights && exp.highlights.length > 0 ? (
            <ul className="space-y-2 list-disc pl-4">
              {exp.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          ) : undefined
        }
        techStack={exp.techStack}
      />
    ),
  }));

  return (
    <div className="px-2 sm:px-4 md:px-6 lg:px-20">
      <Timeline data={timelineData} />
    </div>
  );
}
