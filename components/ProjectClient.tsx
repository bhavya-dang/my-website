/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { getTagColor } from "@/util/functions/index";
import type { Metadata } from "next";
import ImageCarousel from "@/components/Carousel";
// import { StickyScrollRevealDemo } from "./StickyScoll";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import {
  Search,
  X,
  LucideGithub,
  Globe,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import Image from "next/image";

export const revalidate = 0; // to prevent hard caching on dev time

export const metadata: Metadata = {
  title: "Projects",
  description: "Bhavya Dang's amazing projects",
};

export default function ProjectClient({ projects }: { projects: any[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(true);
  const [filterTags, setFilterTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fetchImages = async () => {
      try {
        timer = setTimeout(() => {
          setLoading(true);
        }, 5000);
        const response = await fetch("/api/images");
        const data = await response.json();
        setImages(data.projects);
      } catch (error) {
        console.error("Failed to fetch images:", error);
      } finally {
        clearTimeout(timer);
        setLoading(false);
      }
    };

    fetchImages();
    return () => {
      clearTimeout(timer);
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

  if (loading) {
    return (
      <section className={`m-auto mt-12 p-4 px-36 ${inter.className}`}>
        <div className="flex flex-col gap-8">
          <div className="w-full animate-pulse">
            <div className="flex items-center gap-4">
              <div className="h-12 w-48 bg-gray-300 rounded"></div>
              <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
              <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
            </div>
            <div className="h-6 w-96 bg-gray-300 rounded mt-4"></div>
            <div className="h-12 w-[45%] bg-gray-300 rounded-lg mt-4"></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mt-8">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="card min-h-[400px] bg-white/10 backdrop-filter backdrop-blur-lg shadow-md rounded-xl p-6 border-2 border-white/10 animate-pulse"
            >
              <div className="w-full h-64 bg-gray-300 rounded-lg mb-6"></div>
              <div className="space-y-6">
                <div className="h-8 w-3/4 bg-gray-300 rounded"></div>
                <div className="h-20 w-full bg-gray-300 rounded"></div>
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-6 w-20 bg-gray-300 rounded-full"
                      ></div>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <div className="h-6 w-24 bg-gray-300 rounded"></div>
                    <div className="h-6 w-24 bg-gray-300 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  const handleNext = () => {
    if (currentIndex < filteredProjects.length - 2) {
      setCurrentIndex(currentIndex + 2);
    } else {
      setCurrentIndex(0); // Loop back to start
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 2);
    } else {
      setCurrentIndex(filteredProjects.length - 2); // Loop to end
    }
  };

  return (
    <section className={`m-auto mt-12 p-4 px-36 ${inter.className}`}>
      <div className="flex flex-col gap-8">
        <div className="w-full">
          <div className="flex items-center gap-4">
            <h1 className="font-extrabold text-6xl text-slate-950 dark:text-white leading-tight">
              Projects
            </h1>
          </div>
          <p className="text-lg text-slate-700 dark:text-slate-300 mt-4 max-w-lg">
            I like to build things. Always up for learning something new.
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
      <div className="my-projects mt-4 relative overflow-hidden">
        {filteredProjects.length === 0 ? (
          <p className="mt-4">No projects found</p>
        ) : (
          <div className="relative">
            <div
              className="project-carousel flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 50}%)`,
              }}
            >
              {filteredProjects.map((project: any, index) => (
                <div className="w-1/2 flex-shrink-0 px-2" key={project.id}>
                  <div className="card bg-white/10 dark:bg-black dark:border-white/10 backdrop-filter backdrop-blur-lg shadow-md rounded-xl p-4 text-slate-800 dark:text-white border border-white/10 transition duration-300 ease-in-out">
                    {/* {images[index] && (
                      <Image
                        src={images[index]}
                        width={648}
                        height={294}
                        alt="Project Image"
                        className="w-full h-auto object-cover rounded-md"
                      />
                    )} */}
                    <div className="lg:flex lg:flex-col lg:justify-between">
                      <div>
                        <h1 className="text-xl font-semibold mt-3">
                          {project.properties.Name.title[0].plain_text}
                        </h1>
                        <p className="mt-3 text-slate-800 dark:text-slate-200">
                          {project.properties.Description.rich_text[0].text
                            .content
                            ? project.properties.Description.rich_text[0].text
                                .content
                            : ""}
                        </p>
                      </div>
                      <div className="details flex justify-between mt-5">
                        <p className="flex flex-1 flex-wrap gap-y-2">
                          {project.properties.Tags.multi_select.length !== 0 &&
                            project.properties.Tags.multi_select.map(
                              (tag: any, index: number) => (
                                <span
                                  key={index}
                                  className={`text-sm bg-black text-white bg-black dark:bg-white dark:text-black rounded-full px-2 py-1 mr-2`}
                                >
                                  {tag.name}
                                </span>
                              ),
                            )}
                        </p>
                        <p className="links flex items-center gap-2">
                          <span className="text-slate-800 dark:text-white hover:text-violet-500 py-1 px-2 font-medium">
                            <a
                              href={
                                project.properties["Github URL"].rich_text[0]
                                  .href
                              }
                              target="_blank"
                            >
                              <LucideGithub className="h-5 w-5" />
                            </a>
                          </span>
                          {project.properties["Demo URL"].rich_text.length !==
                            0 && (
                            <span className="text-slate-800 dark:text-white hover:text-violet-500 py-1 px-2 font-medium">
                              <a
                                href={
                                  project.properties["Demo URL"].rich_text[0]
                                    .href
                                }
                                target="_blank"
                              >
                                <Globe className="h-5 w-5" />
                              </a>
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleNext}
              className="absolute right-0 z-10 bg-black/20 hover:bg-black/40 text-white rounded-full p-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
      <div className="mt-4 flex items-center justify-center gap-y-4 lg:hidden">
        <ImageCarousel items={projects} />
      </div>
    </section>
  );
}
