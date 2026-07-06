import { ReactNode } from "react";

const nowItems: { label: string; value: ReactNode }[] = [
  {
    label: "Building",
    value: (
      <>
        <span>
          <ul>
            <li>
              <a
                href="https://pkgui.bhavyadang.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline"
              >
                pkgui
              </a>{" "}
              - Manage multiple package managers in one interface. Right from
              your terminal
            </li>
            <br />
            <li>
              <a
                href="https://solace.bhavyadang.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline"
              >
                Solace
              </a>{" "}
              - A minimalistic theme with violet accents and pastel syntax.
            </li>
          </ul>
        </span>
      </>
    ),
  },
  {
    label: "Reading",
    value: (
      <>
        <span>
          <ul>
            <li>
              <a
                href="https://m.webnovel.com/book/shadow-slave_22196546206090805"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline"
              >
                Shadow Slave
              </a>{" "}
              - By GuiltyThree
            </li>
            <br />
            <li>
              <a
                href="https://carlhendrick.substack.com/p/reading-comprehension-is-not-a-skill"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline"
              >
                Reading Comprehension Is Not a Skill
              </a>{" "}
              - By Carl Hendrick
            </li>
            <br />
            <li>...and a few other substacks I found this week</li>
          </ul>
        </span>
      </>
    ),
  },
  {
    label: "Learning",
    value: "Golang and UI/UX Design",
  },
  {
    label: "Watching",
    value: (
      <a
        href="https://www.youtube.com/watch?v=hgzOsvrbYU8"
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent underline"
      >
        Synchronicity: Carl Jung’s Most Disturbing Theory About Reality{" "}
      </a>
    ),
  },
];

export default function NowSection() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8">
      <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-2 text-balance">
        Currently
      </h2>
      <p className="text-muted-foreground text-base sm:text-lg mb-8">
        What I&apos;m up to these days.
      </p>

      <div className="font-mono text-xs sm:text-sm text-muted-foreground mb-6">
        <span className="text-accent">$</span>
        <span className="ml-1.5">cat ~/now.txt</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {nowItems.map((item, i) => (
          <div
            key={i}
            className="bg-card border border-border/50 rounded-xl p-5 shadow-sm"
          >
            <p className="font-mono text-xs tracking-widest uppercase text-accent mb-1.5">
              {item.label}
            </p>
            <br />
            <div className="text-foreground text-sm sm:text-base leading-relaxed">
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
