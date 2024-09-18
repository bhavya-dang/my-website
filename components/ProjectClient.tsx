/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { getTagColor } from "@/util/functions/index";
import type { Metadata } from "next";
import ImageCarousel from "@/components/Carousel";
// import { StickyScrollRevealDemo } from "./StickyScoll";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import { Search, X } from "lucide-react";
import Image from "next/image";

export const revalidate = 0; // to prevent hard caching on dev time

export const metadata: Metadata = {
  title: "Bhavya Dang - Projects",
  description: "Bhavya Dang's amazing projects",
};

export default function ProjectClient({ projects }: { projects: any[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [filterTags, setFilterTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const handleSearchClick = () => {
    setShowSearch(!showSearch);
  };

  useEffect(() => {
    // Simulate data fetching delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Adjust the timeout to match your data fetching duration

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
        tag.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesTags =
      filterTags.length === 0 ||
      project.properties.Tags.multi_select.some((tag: any) =>
        filterTags.includes(tag.name)
      );

    return matchesSearchQuery && matchesTags;
  });

  if (loading) {
    return (
      <section className={`m-auto mt-8 p-4 ${inter.className}`}>
        <div className="flex flex-col md:flex-row justify-between">
          <h1 className="font-bold text-4xl text-slate-950 dark:text-white">
            Projects
          </h1>
          {/* search bar on large screens */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={handleSearchClick}
              className="p-2 rounded-full text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-neutral-800 transition-all ease-in-out delay-75 duration-100"
            >
              {showSearch ? (
                <X className="w-6 h-6" />
              ) : (
                <Search className="w-6 h-6" />
              )}
            </button>
            <div
              className={`transition-all duration-300 ${
                showSearch ? "max-w-[400px] opacity-100" : "max-w-0 opacity-0"
              } overflow-hidden`}
            >
              <input
                type="text"
                placeholder="Search projects"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`p-1 md:p-2 rounded-full text-base text-black w-auto focus:outline-none selection:bg-black selection:text-white`}
              />
            </div>
          </div>
        </div>
        <div className="hidden my-projects mt-4 lg:grid gap-4 lg:grid-cols-2 xl:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="card min-h-full min-w-full bg-white/10 backdrop-filter backdrop-blur-lg shadow-md rounded-xl p-4 text-slate-800 dark:text-white border-2 border-white/10 transition duration-300 ease-in-out animate-pulse"
            >
              <div className="w-full h-48 bg-gray-300 rounded-md mb-4"></div>
              <div className="space-y-4">
                <div className="w-3/4 h-6 bg-gray-300 rounded"></div>
                <div className="w-full h-4 bg-gray-300 rounded"></div>
                <div className="flex gap-2">
                  <div className="w-24 h-4 bg-gray-300 rounded"></div>
                  <div className="w-24 h-4 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-center gap-y-4 lg:hidden">
          <ImageCarousel items={projects} />
        </div>
      </section>
    );
  }

  // filteredProjects.map((p) => {
  //   console.log(p.properties["Image"].files[0]?.file.url);
  // });

  return (
    <section className={`m-auto mt-8 p-4 ${inter.className}`}>
      <div className="flex flex-col md:flex-row justify-between">
        <h1 className="font-bold text-4xl text-slate-950 dark:text-white">
          Projects
        </h1>
        {/* <StickyScrollRevealDemo /> */}
        {/* search bar on large screens */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={handleSearchClick}
            className="p-2 rounded-full text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-neutral-800 transition-all ease-in-out delay-75 duration-100"
          >
            {showSearch ? (
              <X className="w-6 h-6" />
            ) : (
              <Search className="w-6 h-6" />
            )}
          </button>
          <div
            className={`transition-all duration-300 ${
              showSearch ? "max-w-[400px] opacity-100" : "max-w-0 opacity-0"
            } overflow-hidden`}
          >
            <input
              type="text"
              placeholder="Search projects"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`p-1 md:p-2 rounded-full text-base text-black w-auto focus:outline-none selection:bg-black selection:text-white`}
            />
          </div>
        </div>
      </div>
      <div className="hidden my-projects mt-4 lg:grid gap-4 lg:grid-cols-2 xl:grid-cols-2">
        {filteredProjects.length === 0 ? (
          <p className="mt-4">No projects found</p>
        ) : (
          filteredProjects.map((project: any) => (
            <div
              className="card min-h-full min-w-full bg-white/10 backdrop-filter backdrop-blur-lg shadow-md rounded-xl p-4 text-slate-800 dark:text-white border-2 border-white/10 transition duration-300 ease-in-out"
              key={project.id}
            >
              {project.properties["Image"].files[0]?.file.url && (
                <Image
                  src={
                    project.properties["Image"].files[0].file.url ??
                    "http://placehold.co/648x294"
                  }
                  width={648}
                  height={294}
                  alt="Project Image"
                  className="w-full h-auto object-cover rounded-md"
                />
              )}
              <div className="lg:flex lg:flex-col lg:justify-between">
                <div>
                  <h1 className="text-xl font-semibold mt-3">
                    {project.properties.Name.title[0].plain_text}
                  </h1>
                  <p className="mt-3 text-slate-800 dark:text-slate-200">
                    {project.properties.Description.rich_text[0].text.content
                      ? project.properties.Description.rich_text[0].text.content
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
                            className={`text-sm text-white ${getTagColor(
                              tag.color
                            )} rounded-full px-2 py-1 mr-2`}
                          >
                            {tag.name}
                          </span>
                        )
                      )}
                  </p>
                  <p className="links flex items-center gap-2">
                    <span className="text-slate-800 dark:text-white hover:text-violet-500 py-1 px-2 font-medium">
                      <a
                        href={
                          project.properties["Github URL"].rich_text[0].href
                        }
                        target="_blank"
                      >
                        Github Repo
                      </a>
                    </span>
                    {project.properties["Demo URL"].rich_text.length !== 0 && (
                      <span className="text-slate-800 dark:text-white hover:text-violet-500 py-1 px-2 font-medium">
                        <a
                          href={
                            project.properties["Demo URL"].rich_text[0].href
                          }
                          target="_blank"
                        >
                          Live Demo
                        </a>
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="mt-4 flex items-center justify-center gap-y-4 lg:hidden">
        <ImageCarousel items={projects} />
      </div>
    </section>
  );
}
