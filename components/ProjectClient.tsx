/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import ImageCarousel from "@/components/Carousel";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

const MAX_VISIBLE_TAGS = 3; // Show up to 3 tags initially

import {
  Search,
  X,
  LucideGithub,
  Globe,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
// import Image from "next/image";

export const revalidate = 0; // to prevent hard caching on dev time

export default function ProjectClient({ projects }: { projects: any[] }) {
  const [showAllTags, setShowAllTags] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showSearch, setShowSearch] = useState<boolean>(true);
  const [filterTags, setFilterTags] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    const handleEscKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSearchQuery("");
      }
    };

    window.addEventListener("keydown", handleEscKeyPress);

    return () => {
      window.removeEventListener("keydown", handleEscKeyPress);
    };
  }, []);

  const handleSearchClick = () => {
    setShowSearch(!showSearch);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredProjects = projects.filter((project) => {
    const matchesSearchQuery =
      project.properties.Name.title[0].plain_text
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      project.properties.Description.rich_text[0]?.text.content
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      project.properties.Tags.multi_select.some((tag: any) =>
        tag.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    return matchesSearchQuery;
  });

  const projectsPerPage = 6;
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const handleNext = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const currentProjects = filteredProjects.slice(
    currentPage * projectsPerPage,
    (currentPage + 1) * projectsPerPage,
  );

  return (
    <section className={`m-auto mt-12 p-4 px-36 ${inter.className}`}>
      <div className="flex flex-col gap-8">
        <div className="w-full">
          <div className="flex items-center gap-4">
            <h1 className="font-extrabold text-6xl text-slate-950 dark:text-white leading-tight">
              Projects.
            </h1>
          </div>
          <p className="text-lg text-slate-700 dark:text-slate-300 mt-4 max-w-lg">
            I like to build things. Always up for learning something new.
            Currently learning Rust, Go, and Redis.
          </p>
          <div className="flex items-center gap-4 w-full mt-4">
            <div className="relative flex-1 flex justify-between">
              <div className="w-[42%]">
                <input
                  type="text"
                  placeholder="Search projects"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg dark:bg-black border border-black/20 bg-white dark:border-white/20 text-black dark:placeholder-gray focus:outline-none focus:ring-2 focus:ring-black transition-all placeholder-black/40 dark:text-white/50"
                />
                <div className="absolute left-[40%] top-1/2 -translate-y-1/2 flex items-center gap-2 pr-3">
                  {searchQuery ? (
                    <X
                      className="h-4 w-4 text-gray-500 cursor-pointer"
                      onClick={() => setSearchQuery("")}
                    />
                  ) : (
                    <Search className="h-4 w-4 text-gray-500" />
                  )}
                </div>
              </div>
              <div className="flex gap-x-2">
                <ChevronLeft
                  className="w-10 h-10 bg-black rounded-full p-2 text-white dark:text-black dark:bg-white cursor-pointer"
                  onClick={handlePrev}
                />
                <ChevronRight
                  className="w-10 h-10 bg-black rounded-full p-2 text-white dark:text-black dark:bg-white cursor-pointer"
                  onClick={handleNext}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-projects mt-4 relative">
        {filteredProjects.length === 0 ? (
          <p className="mt-4">No projects found.</p>
        ) : loading ? (
          <div className="grid grid-cols-3 gap-4 mt-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="card dark:bg-white/10 border border-black/10 backdrop-filter backdrop-blur-lg shadow-md rounded-xl p-6 dark:border-2 dark:border-white/10 animate-pulse"
              >
                <div className="space-y-4">
                  <div className="h-8 w-3/4 dark:bg-white/50 bg-black/20 rounded"></div>
                  <div className="h-10 w-full dark:bg-white/50 bg-black/20 rounded"></div>
                  <div className="flex justify-between">
                    <div className="flex gap-2">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div
                          key={i}
                          className="h-6 w-20 dark:bg-white/50 bg-black/20 rounded-full"
                        ></div>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <div className="h-6 w-6 dark:bg-white/50 bg-black/20 rounded-full"></div>
                      <div className="h-6 w-6 dark:bg-white/50 bg-black/20 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {currentProjects.map((project: any) => (
              <div key={project.id} className="w-full">
                <div className="card bg-white/10 dark:bg-black dark:border-white/10 rounded-xl p-4 text-slate-800 dark:text-white border border-black/10 transition duration-300 ease-in-out h-full flex flex-col">
                  {/* Flex container ensures proper spacing */}
                  <div className="flex flex-col flex-grow">
                    <h1 className="text-xl font-semibold mt-3">
                      {project.properties.Name.title[0].plain_text}
                    </h1>
                    <p className="mt-3 text-slate-800 dark:text-slate-200">
                      {project.properties.Description.rich_text[0]?.text
                        .content || ""}
                    </p>
                  </div>

                  {/* Ensures badges and links stay at the bottom */}
                  <div className="mt-auto pt-4 flex flex-wrap justify-between items-center">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.properties.Tags.multi_select
                        .slice(
                          0,
                          showAllTags
                            ? project.properties.Tags.multi_select.length
                            : MAX_VISIBLE_TAGS,
                        )
                        .map((tag: any, index: number) => (
                          <span
                            key={index}
                            className="text-sm bg-black text-white dark:bg-white dark:text-black rounded-full px-2 py-1"
                          >
                            {tag.name}
                          </span>
                        ))}
                      {project.properties.Tags.multi_select.length >
                        MAX_VISIBLE_TAGS && (
                        <button
                          className="text-sm text-gray-400 hover:text-white"
                          onClick={() => setShowAllTags(!showAllTags)}
                        >
                          {showAllTags
                            ? ""
                            : `+${project.properties.Tags.multi_select.length - MAX_VISIBLE_TAGS} more`}
                        </button>
                      )}
                    </div>

                    {/* GitHub & Demo Links */}
                    <div className="flex items-center gap-2">
                      <a
                        href={
                          project.properties["Github URL"].rich_text[0].href
                        }
                        target="_blank"
                        className="text-slate-800 dark:text-white hover:text-violet-500 py-1 px-2 font-medium"
                      >
                        <LucideGithub className="h-5 w-5" />
                      </a>
                      {project.properties["Demo URL"].rich_text.length !==
                        0 && (
                        <a
                          href={
                            project.properties["Demo URL"].rich_text[0].href
                          }
                          target="_blank"
                          className="text-slate-800 dark:text-white hover:text-violet-500 py-1 px-2 font-medium"
                        >
                          <Globe className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* <div className="mt-4 flex items-center justify-center gap-y-4 lg:hidden">
        <ImageCarousel items={projects} />
      </div> */}
    </section>
  );
}
