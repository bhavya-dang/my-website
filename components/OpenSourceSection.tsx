import { Star, ExternalLink, GitPullRequestArrow } from "lucide-react";
import { ReactNode } from "react";

export interface Repo {
  name: string;
  highlight: ReactNode;
  prUrl: string;
  githubUrl: string;
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
                href={repo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground text-sm hover:text-accent transition-colors inline-flex items-center gap-1.5"
              >
                {repo.name}
                <ExternalLink className="w-3 h-3 opacity-40 shrink-0" />
              </a>
              {/*<a
                href={repo.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors font-mono"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">demo</span>
              </a>*/}
            </div>

            <div className="text-sm text-muted-foreground leading-relaxed">
              {repo.highlight}
            </div>

            <a
              href={repo.prUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center gap-1.5 text-xs text-accent hover:underline"
            >
              <GitPullRequestArrow className="w-3.5 h-3.5" />
              View pull request
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
