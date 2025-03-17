import { Inter } from "next/font/google";
import {
  SiTypescript,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiPython,
  SiRust,
  SiGo,
  SiDocker,
  SiKubernetes,
  SiGit,
  SiLinux,
  SiFigma,
  SiAdobepremierepro,
  SiAdobephotoshop,
  SiSupabase,
  SiFirebase,
  SiMongodb,
  SiMysql,
  SiPrisma,
  SiVuedotjs,
  SiDaisyui,
  SiRedis,
} from "react-icons/si";
import { BiData } from "react-icons/bi";
import { DiNodejs } from "react-icons/di";

const inter = Inter({ subsets: ["latin"] });

interface Skill {
  name: string;
  icon: React.ElementType;
  level: number; // 1-5
  category:
    | "frontend"
    | "backend"
    | "devops"
    | "languages"
    | "design"
    | "database";
}

const skills: Skill[] = [
  // Languages
  { name: "TypeScript", icon: SiTypescript, level: 3, category: "languages" },
  { name: "JavaScript", icon: SiJavascript, level: 4, category: "languages" },
  { name: "Python", icon: SiPython, level: 2, category: "languages" },
  { name: "Rust", icon: SiRust, level: 1, category: "languages" },
  { name: "Go", icon: SiGo, level: 2, category: "languages" },

  // Frontend
  { name: "React", icon: SiReact, level: 4, category: "frontend" },
  { name: "Next.js", icon: SiNextdotjs, level: 4, category: "frontend" },
  { name: "Vue.js", icon: SiVuedotjs, level: 3, category: "frontend" },
  { name: "TailwindCSS", icon: SiTailwindcss, level: 4, category: "frontend" },
  { name: "DaisyUI", icon: SiDaisyui, level: 4, category: "frontend" },

  // Backend & Database
  { name: "Supabase", icon: SiSupabase, level: 3, category: "backend" },
  { name: "Firebase", icon: SiFirebase, level: 3, category: "backend" },
  { name: "Prisma", icon: SiPrisma, level: 3, category: "backend" },
  { name: "Knex.js", icon: DiNodejs, level: 3, category: "backend" },

  // Databases
  { name: "MongoDB", icon: SiMongodb, level: 3, category: "database" },
  { name: "MySQL", icon: SiMysql, level: 3, category: "database" },
  { name: "Redis", icon: SiRedis, level: 3, category: "database" },
  { name: "Pinecone", icon: BiData, level: 2, category: "database" },

  // DevOps
  { name: "Docker", icon: SiDocker, level: 3, category: "devops" },
  { name: "Git", icon: SiGit, level: 5, category: "devops" },
  { name: "Linux", icon: SiLinux, level: 4, category: "devops" },

  // Design
  { name: "Figma", icon: SiFigma, level: 4, category: "design" },
  {
    name: "Premiere Pro",
    icon: SiAdobepremierepro,
    level: 3,
    category: "design",
  },
  { name: "Photoshop", icon: SiAdobephotoshop, level: 3, category: "design" },
];

export default function TechSkills() {
  return (
    <section
      className={`m-auto mt-3 p-4 md:px-8 lg:px-16 xl:px-36 ${inter.className}`}
    >
      <div className="mb-8">
        <h1 className="font-extrabold text-4xl md:text-5xl lg:text-6xl text-slate-950 dark:text-white leading-tight">
          Skills.
        </h1>
        <p className="text-base md:text-lg text-slate-700 dark:text-slate-300 mt-2 md:mt-4">
          Technologies I work with and continuously learn.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          "frontend",
          "backend",
          "database",
          "devops",
          "languages",
          "design",
        ].map((category) => (
          <div key={category} className="space-y-4">
            <h2 className="text-xl font-semibold capitalize text-slate-900 dark:text-white">
              {category}
            </h2>
            <div className="space-y-3">
              {skills
                .filter((skill) => skill.category === category)
                .map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center gap-3 bg-white/5 p-3 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <skill.icon className="w-6 h-6 text-slate-700 dark:text-slate-300" />
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">
                          {skill.name}
                        </span>
                        <span className="text-xs text-slate-600 dark:text-slate-400">
                          {skill.level}/5
                        </span>
                      </div>
                      <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full">
                        <div
                          className="h-1.5 bg-violet-500 rounded-full transition-all duration-300"
                          style={{ width: `${(skill.level / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
