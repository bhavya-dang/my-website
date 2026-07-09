"use client";

import { useState, useEffect, TouchEvent } from "react";
import { ExternalLink, Github } from "lucide-react";

export default function ProjectClient({ projects }: { projects: any[] }) {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const projectsPerPage = 5;
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const handleNext = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) handleNext();
    if (distance < -50) handlePrev();
  };

  const currentProjects = projects.slice(
    currentPage * projectsPerPage,
    (currentPage + 1) * projectsPerPage,
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8">
      <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-2 text-balance">
        Projects
      </h2>
      <p className="text-muted-foreground text-base sm:text-lg mb-8">
        Things I&apos;ve built.
      </p>

      <div className="font-mono text-xs sm:text-sm text-muted-foreground mb-4">
        <span className="text-accent">$</span>
        <span className="ml-1.5">ls -la projects/</span>
        <span className="ml-2 text-muted-foreground/50">
          ({projects.length} entries)
        </span>
      </div>

      {projects.length === 0 ? (
        <p className="font-mono text-sm text-muted-foreground">
          No projects to show yet.
        </p>
      ) : (
        <div
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="rounded-xl border border-border/50 overflow-hidden bg-background">
            <div className="hidden sm:grid grid-cols-[1fr_auto] gap-4 px-5 py-2.5 bg-background/50 border-b border-border/30 font-mono text-xs text-muted-foreground">
              <span>name</span>
              <span>links</span>
            </div>
            {currentProjects.map((project: any, i: number) => {
              const name =
                project.properties.Name?.title?.[0]?.plain_text ?? "Untitled";
              const desc =
                project.properties.Description?.rich_text?.[0]?.text?.content ??
                "";
              const githubUrl = project.properties["Github URL"]?.url;
              const demoUrl = project.properties["Demo URL"]?.url;

              return (
                <div
                  key={project.id}
                  className={`grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-2 sm:gap-4 px-5 py-4 hover:bg-secondary/30 transition-colors ${
                    i < currentProjects.length - 1
                      ? "border-b border-border/30"
                      : ""
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <span className="mt-1.5 w-2.5 h-2.5 rounded-full bg-accent/60 flex-shrink-0" />
                    <div className="min-w-0">
                      <h3 className="font-mono text-sm font-semibold truncate">
                        {name}
                      </h3>
                      {desc && (
                        <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2 leading-relaxed">
                          {desc}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:self-center">
                    {githubUrl && (
                      <a
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors font-mono"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">source</span>
                      </a>
                    )}
                    {demoUrl && (
                      <a
                        href={demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors font-mono"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">demo</span>
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-center gap-4 mt-4">
            <button
              onClick={handlePrev}
              className="font-mono text-xs text-muted-foreground hover:text-foreground transition-[color,transform] px-2 py-1 active:scale-95"
              aria-label="Previous page"
            >
              ◀ prev
            </button>
            <span className="font-mono text-xs text-muted-foreground tabular-nums">
              {mounted ? `${currentPage + 1} / ${totalPages}` : ""}
            </span>
            <button
              onClick={handleNext}
              className="font-mono text-xs text-muted-foreground hover:text-foreground transition-[color,transform] px-2 py-1 active:scale-95"
              aria-label="Next page"
            >
              next ▶
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
