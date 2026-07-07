"use client";

import React from "react";

interface JourneyItem {
  title: string;
  content: React.ReactNode;
}

export default function JourneySection({ data }: { data: JourneyItem[] }) {
  return (
    <>
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-2 text-balance">
          Experience
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg mb-8">
          My professional timeline.
        </p>
        <div className="font-mono text-xs sm:text-sm text-muted-foreground mb-8">
          <span className="text-accent">$</span>
          <span className="ml-1.5">cat ~/experience.log</span>
        </div>
        <div className="space-y-6">
          {data.map((item, index) => (
            <div key={index} className="border-l-2 border-accent pl-4 sm:pl-6">
              <div className="font-mono text-xs text-muted-foreground mb-2">
                {item.title}
              </div>
              <div className="rounded-lg border border-border/40 bg-card/50 p-4 sm:p-5 hover:border-border/80 transition-colors">
                {item.content}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Check out my{" "}
          <a
            href="https://resume.bhavyadang.in"
            className="text-accent hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            resume{" "}
          </a>
          for more details!
        </p>
      </div>
    </>
  );
}
