import { Hero } from "@/components/Hero";
import NowSection from "@/components/NowSection";
import TechSkills from "@/components/TechSkills";
import ProjectClient from "@/components/ProjectClient";
import YouTubeSection from "@/components/YouTubeSection";
import ArtClient from "@/components/ArtClient";
import JourneySection from "@/components/JourneySection";
import { Footer } from "@/components/Footer";
import Section from "@/components/Section";
import { fetchProjects } from "@/util/notion/index";
import { experiences } from "@/lib/experiences";

export const revalidate = 3600;

export default async function Home() {
  let projects: any[] = [];
  try {
    projects = await fetchProjects();
  } catch {
    // projects will fallback to empty array
  }

  const timelineData = experiences.map((exp) => ({
    title: exp.duration,
    content: (
      <>
        <div>
          <h3 className="text-lg sm:text-xl font-bold mb-1">{exp.title}</h3>
          <div className="text-muted-foreground text-sm flex items-center gap-2 mb-3">
            {exp.companyLink ? (
              <a
                href={exp.companyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                {exp.company}
              </a>
            ) : (
              <span>{exp.company}</span>
            )}
            <span className="text-muted-foreground/30">·</span>
            <span>{exp.location}</span>
          </div>
          {exp.highlights && exp.highlights.length > 0 && (
            <ul className="text-sm text-muted-foreground space-y-1 mb-3 list-disc pl-4">
              {exp.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          )}
          {exp.techStack.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {exp.techStack.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-secondary text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </>
    ),
  }));

  return (
    <>
      <Hero />

      <Section id="now" className="bg-secondary/50">
        <NowSection />
      </Section>

      <Section id="stack">
        <TechSkills />
      </Section>

      <Section id="projects" className="bg-secondary/50">
        <ProjectClient projects={projects} />
      </Section>

      <Section id="experience">
        <JourneySection data={timelineData} />
      </Section>

      <Section id="videos" className="bg-secondary/50">
        <YouTubeSection />
      </Section>

      <Section id="art">
        <ArtClient />
      </Section>

      <Footer />
    </>
  );
}
