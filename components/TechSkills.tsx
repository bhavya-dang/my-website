"use client";
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
import { motion } from "framer-motion";
import { useState } from "react";

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
  description?: string;
}

const skills: Skill[] = [
  // Languages
  {
    name: "TypeScript",
    icon: SiTypescript,
    level: 3,
    category: "languages",
    description: "Strong typing and modern JavaScript features",
  },
  {
    name: "JavaScript",
    icon: SiJavascript,
    level: 4,
    category: "languages",
    description: "Core language and modern ES6+ features",
  },
  {
    name: "Python",
    icon: SiPython,
    level: 2,
    category: "languages",
    description: "Data processing and automation",
  },
  {
    name: "Rust",
    icon: SiRust,
    level: 1,
    category: "languages",
    description: "Systems programming and performance",
  },
  {
    name: "Go",
    icon: SiGo,
    level: 2,
    category: "languages",
    description: "Concurrent programming and microservices",
  },

  // Frontend
  {
    name: "React",
    icon: SiReact,
    level: 4,
    category: "frontend",
    description: "Component-based UI development",
  },
  {
    name: "Next.js",
    icon: SiNextdotjs,
    level: 4,
    category: "frontend",
    description: "Full-stack React framework",
  },
  {
    name: "Vue.js",
    icon: SiVuedotjs,
    level: 3,
    category: "frontend",
    description: "Progressive JavaScript framework",
  },
  {
    name: "TailwindCSS",
    icon: SiTailwindcss,
    level: 4,
    category: "frontend",
    description: "Utility-first CSS framework",
  },
  {
    name: "DaisyUI",
    icon: SiDaisyui,
    level: 4,
    category: "frontend",
    description: "Tailwind CSS component library",
  },

  // Backend & Database
  {
    name: "Supabase",
    icon: SiSupabase,
    level: 3,
    category: "backend",
    description: "Open source Firebase alternative",
  },
  {
    name: "Firebase",
    icon: SiFirebase,
    level: 3,
    category: "backend",
    description: "Backend-as-a-Service platform",
  },
  {
    name: "Prisma",
    icon: SiPrisma,
    level: 3,
    category: "backend",
    description: "Modern database ORM",
  },
  {
    name: "Knex.js",
    icon: DiNodejs,
    level: 3,
    category: "backend",
    description: "SQL query builder",
  },

  // Databases
  {
    name: "MongoDB",
    icon: SiMongodb,
    level: 3,
    category: "database",
    description: "NoSQL document database",
  },
  {
    name: "MySQL",
    icon: SiMysql,
    level: 3,
    category: "database",
    description: "Relational database management",
  },
  {
    name: "Redis",
    icon: SiRedis,
    level: 3,
    category: "database",
    description: "In-memory data store",
  },
  {
    name: "Pinecone",
    icon: BiData,
    level: 2,
    category: "database",
    description: "Vector database for AI",
  },

  // DevOps
  {
    name: "Docker",
    icon: SiDocker,
    level: 3,
    category: "devops",
    description: "Containerization platform",
  },
  {
    name: "Git",
    icon: SiGit,
    level: 5,
    category: "devops",
    description: "Version control system",
  },
  {
    name: "Linux",
    icon: SiLinux,
    level: 4,
    category: "devops",
    description: "Operating system and shell",
  },

  // Design
  {
    name: "Figma",
    icon: SiFigma,
    level: 4,
    category: "design",
    description: "UI/UX design tool",
  },
  {
    name: "Premiere Pro",
    icon: SiAdobepremierepro,
    level: 3,
    category: "design",
    description: "Video editing software",
  },
  {
    name: "Photoshop",
    icon: SiAdobephotoshop,
    level: 3,
    category: "design",
    description: "Image editing software",
  },
];

const categories = [
  "frontend",
  "backend",
  "database",
  "devops",
  "languages",
  "design",
] as const;

export default function TechSkills() {
  const [selectedCategory, setSelectedCategory] = useState<
    (typeof categories)[number] | "all"
  >("all");

  const filteredSkills = skills.filter(
    (skill) => selectedCategory === "all" || skill.category === selectedCategory
  );

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

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === "all"
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${
                selectedCategory === category
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredSkills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative"
          >
            <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-[1.02]">
              <skill.icon className="w-6 h-6 text-slate-700 dark:text-slate-300 group-hover:text-violet-500 transition-colors" />
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">{skill.name}</span>
                  <span className="text-xs text-slate-600 dark:text-slate-400">
                    {skill.level}/5
                  </span>
                </div>
                <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-1.5 bg-violet-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(skill.level / 5) * 100}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
                {skill.description && (
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    {skill.description}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
