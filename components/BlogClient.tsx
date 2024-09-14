/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import { getTagColor } from "@/util/functions/index";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import moment from "moment";
import Link from "next/link";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Search, X } from "lucide-react";
const inter = Inter({ subsets: ["latin"] });

export const revalidate = 0; // to prevent hard caching on dev time

export const metadata: Metadata = {
  title: "Bhavya Dang - Blogs",
  description: "Bhavya Dang's immaculate blogs",
};

export default function Blogs({ blogs }: { blogs: any[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [filterTags, setFilterTags] = useState<string[]>([]);

  const handleSearchClick = () => {
    setShowSearch(!showSearch);
  };

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearchQuery =
      blog.properties.Name.title[0].plain_text
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      blog.properties.Description.rich_text[0]?.text.content
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      blog.properties.Tags.multi_select.some((tag: any) =>
        tag.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesTags =
      filterTags.length === 0 ||
      blog.properties.Tags.multi_select.some((tag: any) =>
        filterTags.includes(tag.name)
      );

    return matchesSearchQuery && matchesTags;
  });

  return (
    <section className={`m-auto mt-6 p-4 ${inter.className}`}>
      <div className="flex justify-between">
        <h1 className="font-inter font-bold text-4xl text-slate-950 dark:text-white">
          Blogs
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
      <div className="mt-4 flex w-full flex-wrap gap-y-8 md:gap-y-4">
        {filteredBlogs.map((blog: any) => (
          <div
            className="card min-w-full p-4 bg-slate-100 md:bg-slate-200 dark:bg-[#0b0b0b] dark:md:bg-black text-slate-800 dark:text-white flex flex-col md:flex-row"
            key={blog.id}
          >
            {blog.properties["Files & media"].files[0]?.file.url && (
              <img
                src={blog.properties["Files & media"].files[0].file.url}
                alt="Blog Image"
                className="w-full md:w-1/5 h-auto object-cover rounded-md mr-5"
              />
            )}
            <div className="flex flex-col justify-between flex-1 mt-5 md:mt-0">
              <div className="blog-head flex flex-col justify-between ">
                <h1 className="text-xl font-semibold">
                  <Link
                    href={`/blogs/${blog.properties.Slug.rich_text[0].plain_text}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {blog.properties.Name.title[0].plain_text}
                  </Link>
                </h1>
                <span className="dark:text-white text-black/50 dark:opacity-25">
                  {moment(blog.properties["Created At"].date.start).format(
                    "MMMM DD, YYYY"
                  )}
                </span>
              </div>
              {blog.properties.Description.rich_text.length > 0 && (
                <p className="mt-4 md:mt-0 text-sm font-normal text-slate-700 dark:text-white dark:opacity-70">
                  {blog.properties.Description.rich_text[0].text.content}
                </p>
              )}

              <div
                className={`details flex items-end md:items-center justify-between mt-10 md:mt-[4.5rem] `}
              >
                <div className="flex flex-wrap flex-1 gap-y-2">
                  {blog.properties.Tags.multi_select.length !== 0 &&
                    blog.properties.Tags.multi_select.map(
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
                </div>
                {blog.properties["External URL"].url && (
                  <a
                    className="hover:opacity-80 transition ease-linear duration-200"
                    href={blog.properties["External URL"].url}
                    target="_blank"
                  >
                    <ExternalLinkIcon className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
