import { ExternalLink, GitPullRequestArrow, Github } from "lucide-react";

export interface Highlight {
  description: string;
  prUrl: string;
}

export interface Repo {
  name: string;
  githubUrl: string;
  liveUrl?: string;
  highlights: Highlight[];
}

function getPrNumber(url: string): string {
  const match = url.match(/\/pull\/(\d+)/);
  return match ? `#${match[1]}` : "";
}

export default function OpenSourceSection({ repos }: { repos: Repo[] }) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8">
      <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-2 text-balance">
        Open Source
      </h2>
      <p className="text-muted-foreground text-base sm:text-lg mb-8">
        I have been trying to get more into OSS. Here are some of my
        contributions.
      </p>
      <div className="font-mono text-xs sm:text-sm text-muted-foreground mb-6">
        <span className="text-accent">$</span>
        <span className="ml-1.5">cat CONTRIBUTING.md</span>
      </div>

      {repos.length === 0 && (
        <div className="text-center text-muted-foreground font-mono text-sm py-12">
          No contributions yet.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {repos.map((repo, i) => (
          <div
            key={i}
            className="rounded-xl border border-border/50 bg-card p-5 flex flex-col gap-3"
          >
            <div className="flex items-start justify-between gap-3">
              <a
                href={repo.liveUrl ?? repo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground text-sm hover:text-accent transition-colors inline-flex items-center gap-1.5"
              >
                {repo.name}
                <ExternalLink className="w-3 h-3 opacity-40 shrink-0" />
              </a>

              <a
                href={repo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View source on GitHub"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>

            {repo.highlights.length > 0 && (
              <ul className="text-sm text-muted-foreground leading-relaxed space-y-2">
                {repo.highlights.map((h, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 before:mt-1.5 before:block before:h-1.5 before:w-1.5 before:shrink-0 before:rounded-full before:bg-muted-foreground"
                  >
                    <span className="flex-1">{h.description}</span>
                    <a
                      href={h.prUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-accent shrink-0 mt-0.5"
                    >
                      <GitPullRequestArrow className="w-3 h-3" />
                      {getPrNumber(h.prUrl)}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
