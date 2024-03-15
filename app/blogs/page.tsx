/* eslint-disable @next/next/no-img-element */
import { getTagColor } from "@/util/functions/index";
import {
  getDatabase,
  getPageBySlug,
  getPageContent,
} from "@/util/notion/index";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import moment from "moment";
import Link from "next/link";
import type { Metadata } from "next";

export const revalidate = 0; // to prevent hard caching on dev time

export const metadata: Metadata = {
  title: "Bhavya Dang - Blogs",
  description: "Bhavya Dang's super awesome amazing fantastic marvelous blogs",
};

export default async function Blogs() {
  const databaseID = process.env.NOTION_BLOGS_DB_ID || ""; // Ensure databaseID is defined
  const databaseQuery = await getDatabase(
    databaseID,
    "Created At",
    "descending"
  );

  return (
    <section className="m-auto mt-10 p-4">
      <h2 className="font-inter font-bold text-4xl text-slate-950 dark:text-white">
        Blogs
      </h2>
      <div className="mt-4 flex w-full flex-wrap gap-y-4">
        {databaseQuery.results.map((blog: any) => (
          <div
            className="card min-h-full min-w-full bg-white/5 backdrop-filter backdrop-blur-lg shadow-xl drop-shadow-xl rounded-xl font-inter p-4 text-slate-800 dark:text-white flex flex-col"
            key={blog.id}
          >
            <div className="flex">
              {blog.properties["Files & media"].files[0]?.file.url && (
                <img
                  src={blog.properties["Files & media"].files[0].file.url}
                  alt="Blog Image"
                  className="w-1/5 h-auto object-cover rounded-md mr-5"
                />
              )}
              <div className="flex-1">
                <div className="flex justify-between ">
                  <h1 className="text-xl font-semibold">
                    <Link
                      href={`/blogs/${blog.properties.Slug.rich_text[0].plain_text}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {blog.properties.Name.title[0].plain_text}
                    </Link>
                  </h1>
                  <span className="dark:text-white text-black/50 dark:opacity-25 font-mono">
                    {moment(blog.properties["Created At"].date.start).format(
                      "MMMM DD, YYYY"
                    )}
                  </span>
                </div>
                <p className="mt-3 text-slate-800 dark:text-white dark:opacity-70">
                  {blog.properties.Description.rich_text.length > 0
                    ? blog.properties.Description.rich_text[0].text.content
                    : "No Desciption"}
                </p>
                <div className="details flex items-end justify-between mt-[4.5rem]">
                  <div>
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
          </div>
        ))}
      </div>
    </section>
  );
}
