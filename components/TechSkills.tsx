"use client";

const skills = [
  { name: "TypeScript", level: 3, category: "languages" },
  { name: "JavaScript", level: 4, category: "languages" },
  { name: "Python", level: 2, category: "languages" },
  { name: "Go", level: 1, category: "languages" },
  { name: "React", level: 4, category: "frontend" },
  { name: "React Native", level: 2, category: "frontend" },
  { name: "Next.js", level: 3, category: "frontend" },
  { name: "Vue.js", level: 2, category: "frontend" },
  { name: "TailwindCSS", level: 4, category: "frontend" },
  { name: "DaisyUI", level: 4, category: "frontend" },
  { name: "Supabase", level: 3, category: "backend" },
  { name: "Firebase", level: 2, category: "backend" },
  { name: "Appwrite", level: 2, category: "backend" },
  { name: "Prisma", level: 1, category: "backend" },
  { name: "Knex.js", level: 3, category: "backend" },
  { name: "MongoDB", level: 3, category: "database" },
  { name: "MySQL", level: 3, category: "database" },
  { name: "Redis", level: 3, category: "database" },
  { name: "Pinecone", level: 1, category: "database" },
  { name: "Docker", level: 3, category: "devops" },
  { name: "Git", level: 3, category: "devops" },
  { name: "Linux", level: 3, category: "devops" },
  { name: "Figma", level: 4, category: "design" },
  { name: "Premiere Pro", level: 3, category: "design" },
  { name: "Photoshop", level: 3, category: "design" },
];

const categories = [
  "frontend",
  "backend",
  "database",
  "devops",
  "languages",
  "design",
] as const;

function Dot() {
  return <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />;
}

export default function TechSkills() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8">
      <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-2 text-balance">
        Skills
      </h2>
      <p className="text-muted-foreground text-base sm:text-lg mb-8">
        Technologies I work with.
      </p>

      <div className="rounded-xl border border-border/50 overflow-hidden">
        <div className="flex items-center gap-1.5 px-4 sm:px-5 py-2.5 border-b border-border/50 bg-secondary/30">
          <span className="font-mono text-xs sm:text-sm text-accent">$</span>
          <span className="font-mono text-xs sm:text-sm text-muted-foreground">
            neofetch --stack
          </span>
        </div>

        <div className="p-4 sm:p-6 space-y-4">
          {categories.map((cat) => {
            const items = skills.filter((s) => s.category === cat);
            return (
              <div
                key={cat}
                className="flex flex-col sm:flex-row gap-1 sm:gap-3"
              >
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider w-24 shrink-0 pt-0.5">
                  {cat}
                </span>
                <div className="flex flex-wrap gap-x-3 gap-y-1.5">
                  {items.map((skill) => (
                    <span
                      key={skill.name}
                      className="font-mono text-sm inline-flex items-center gap-1.5"
                    >
                      <Dot />
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
