import React from "react";

interface WorkStatusProps {
  className?: string;
}

const WorkStatus: React.FC<WorkStatusProps> = ({ className }) => {
  return (
    <div
      className={`flex items-center gap-x-2 ${className}`}
    >
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
      </span>
      <p className="font-mono text-xs text-muted-foreground">
        <a
          href="https://www.ciena.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors"
        >
          working @ciena
        </a>
      </p>
    </div>
  );
};

export default WorkStatus;
