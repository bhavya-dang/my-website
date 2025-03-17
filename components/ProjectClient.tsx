/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, TouchEvent } from "react";
import ImageCarousel from "@/components/Carousel";
import { Inter } from "next/font/google";
import {
  Search,
  X,
  LucideGithub,
  Globe,
  ChevronRight,
  ChevronLeft,
  MoreHorizontal,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
// import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });
const MAX_VISIBLE_TAGS = 2; // Show up to 3 tags initially

export const revalidate = 0; // to prevent hard caching on dev time

export default function ProjectClient({ projects }: { projects: any[] }) {
  const [showAllTags, setShowAllTags] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showSearch, setShowSearch] = useState<boolean>(true);
  const [filterTags, setFilterTags] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [openTooltips, setOpenTooltips] = useState<{ [key: string]: boolean }>(
    {}
  );

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

    return () => {
      clearTimeout(timer);
    };
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
        tag.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesSearchQuery;
  });

  // When searching, show all matching tags even if they were in tooltip
  const shouldShowAllTags = searchQuery.length > 0;
  const getVisibleTags = (tags: any[]) => {
    return shouldShowAllTags ? tags : tags.slice(0, MAX_VISIBLE_TAGS);
  };

  // filteredProjects.map((proj) => console.log(proj));

  const projectsPerPage = window.innerWidth < 768 ? 1 : 6;
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

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
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrev();
    }
  };

  const currentProjects = filteredProjects.slice(
    currentPage * projectsPerPage,
    (currentPage + 1) * projectsPerPage
  );

  const handleTooltipClick = (projectId: string) => {
    if (window.innerWidth < 768) {
      setOpenTooltips((prev) => ({
        ...prev,
        [projectId]: !prev[projectId],
      }));
    }
  };

  return (
    <TooltipProvider>
      <section
        className={`m-auto mt-6 md:mt-12 p-4 md:px-8 lg:px-16 xl:px-36 ${inter.className}`}
      >
        <div className="flex flex-col gap-4 md:gap-8">
          <div className="w-full">
            <div className="flex items-center gap-4">
              <h1 className="font-extrabold text-4xl md:text-5xl lg:text-6xl text-slate-950 dark:text-white leading-tight">
                Projects.
              </h1>
            </div>
            <p className="text-base md:text-lg text-slate-700 dark:text-slate-300 mt-2 md:mt-4 max-w-lg">
              I like to build things. Always up for learning something new.
              Currently learning{" "}
              <a
                className="hover:underline"
                href="https://www.rust-lang.org/https://www.rust-lang.org/"
              >
                Rust
              </a>
              {", "}
              <a className="hover:underline" href="https://go.dev/">
                Go
              </a>
              , and{" "}
              <a className="hover:underline" href="https://redis.io/">
                Redis
              </a>
              .
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full mt-4">
              <div className="relative flex-1 flex flex-col sm:flex-row justify-between w-full gap-4">
                {/* TODO: FIX SEARCH BAR */}
                {/* <div className="w-full sm:w-[42%] relative">
                  <input
                    type="text"
                    placeholder="Search projects"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg dark:bg-black border border-black/20 bg-white dark:border-white/20 text-black dark:placeholder-gray focus:outline-none focus:ring-2 focus:ring-black transition-all placeholder-black/40 dark:text-white/50"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    {searchQuery ? (
                      <X
                        className="h-4 w-4 text-gray-500 cursor-pointer"
                        onClick={() => setSearchQuery("")}
                      />
                    ) : (
                      <Search className="h-4 w-4 text-gray-500" />
                    )}
                  </div>
                </div> */}
                {/* Navigation buttons - Only show on desktop */}
                <div className="hidden md:flex gap-x-2 justify-end">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
              {Array.from({ length: projectsPerPage }).map((_, index) => (
                <div
                  key={index}
                  className="card dark:bg-white/10 border border-black/10 backdrop-filter backdrop-blur-lg shadow-md rounded-xl p-4 md:p-6 dark:border-2 dark:border-white/10 animate-pulse"
                >
                  <div className="space-y-4">
                    <div className="h-8 w-3/4 dark:bg-white/50 bg-black/20 rounded"></div>
                    <div className="h-10 w-full dark:bg-white/50 bg-black/20 rounded"></div>
                    <div className="flex flex-wrap justify-between gap-y-2">
                      <div className="flex flex-wrap gap-2">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <div
                            key={i}
                            className="h-6 w-16 sm:w-20 dark:bg-white/50 bg-black/20 rounded-full"
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
            <>
              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-6"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                {currentProjects.map((project: any) => (
                  <div key={project.id} className="w-full">
                    <div className="card bg-white/10 dark:bg-black dark:border-white/10 rounded-xl p-4 text-slate-800 dark:text-white border border-black/10 transition duration-300 ease-in-out h-full flex flex-col">
                      <div className="flex flex-col flex-grow">
                        <h1 className="text-lg md:text-xl font-semibold mt-3">
                          {project.properties.Name.title[0].plain_text}
                        </h1>
                        <p className="mt-3 text-sm md:text-base text-slate-800 dark:text-slate-200">
                          {project.properties.Description.rich_text[0]?.text
                            .content || ""}
                        </p>
                      </div>

                      <div className="mt-auto pt-4 flex flex-wrap justify-between items-center gap-y-3">
                        <div className="flex flex-wrap gap-2 items-center">
                          {getVisibleTags(
                            project.properties.Tags.multi_select
                          ).map((tag: any, index: number) => (
                            <span
                              key={index}
                              className="text-xs md:text-sm bg-black text-white dark:bg-white dark:text-black rounded-full px-2 py-1"
                            >
                              {tag.name}
                            </span>
                          ))}
                          {!shouldShowAllTags &&
                            project.properties.Tags.multi_select.length >
                              MAX_VISIBLE_TAGS && (
                              <Tooltip open={openTooltips[project.id]}>
                                <TooltipTrigger asChild>
                                  <button
                                    onClick={() =>
                                      handleTooltipClick(project.id)
                                    }
                                    className="text-xs md:text-sm bg-black text-white dark:bg-white dark:text-black rounded-full px-2 py-1 flex items-center gap-1"
                                  >
                                    <MoreHorizontal className="w-3 h-3" />
                                    {project.properties.Tags.multi_select
                                      .length - MAX_VISIBLE_TAGS}{" "}
                                    more
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent
                                  side="bottom"
                                  className="bg-black text-white dark:bg-white dark:text-black p-2 rounded-lg"
                                >
                                  <div className="flex flex-col gap-1">
                                    {project.properties.Tags.multi_select
                                      .slice(MAX_VISIBLE_TAGS)
                                      .map((tag: any, index: number) => (
                                        <span key={index}>{tag.name}</span>
                                      ))}
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                          <a
                            href={project.properties["Github URL"].url || ""}
                            target="_blank"
                            className="text-slate-800 dark:text-white hover:text-violet-500 py-1 px-2 font-medium"
                          >
                            <LucideGithub className="h-4 w-4 md:h-5 md:w-5" />
                          </a>
                          {project.properties["Demo URL"].url !== "" && (
                            <a
                              href={project.properties["Demo URL"].url || ""}
                              target="_blank"
                              className="text-slate-800 dark:text-white hover:text-violet-500 py-1 px-2 font-medium"
                            >
                              <Globe className="h-4 w-4 md:h-5 md:w-5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          {/* Mobile swipe indicator */}
          {!loading &&
            window.innerWidth < 768 &&
            filteredProjects.length > 1 && (
              <div className="flex justify-center mt-6 w-full max-w-[200px] mx-auto">
                <div className="w-full h-[3px] bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-black dark:bg-white transition-all duration-300 ease-in-out rounded-full"
                    style={{
                      width: `${((currentPage + 1) / totalPages) * 100}%`,
                    }}
                  />
                </div>
              </div>
            )}
        </div>
        {/* <div className="mt-4 flex items-center justify-center gap-y-4 lg:hidden">
          <ImageCarousel items={projects} />
        </div> */}
      </section>
    </TooltipProvider>
  );
}
