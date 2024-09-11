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
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const revalidate = 0; // to prevent hard caching on dev time

export const metadata: Metadata = {
  title: "Bhavya Dang - Blogs",
  description: "Bhavya Dang's immaculate blogs",
};

export default async function Blogs() {
  const databaseID = process.env.NOTION_BLOGS_DB_ID || ""; // Ensure databaseID is defined
  const databaseQuery = await getDatabase(
    databaseID,
    "Created At",
    "descending"
  );

  return (
    <section className={`m-auto mt-10 p-4 ${inter.className}`}>
      <h1 className="font-inter font-bold text-4xl text-slate-950 dark:text-white">
        Blogs
      </h1>
      <div className="mt-4 flex w-full flex-wrap gap-y-4">
        {databaseQuery.results.map((blog: any) => (
          <div
            className="card min-h-full min-w-ful p-4 text-slate-800 dark:text-white flex flex-col"
            key={blog.id}
          >
            <div className="flex">
              {blog.properties["Files & media"].files[0]?.file.url && (
                <img
                  src={blog.properties["Files & media"].files[0].file.url}
                  alt="Blog Image"
                  className="w-1/5 h-auto object-cover rounded-md mr-5 aspect-square"
                />
              )}
              <div className="flex flex-col justify-between flex-1">
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
                  <p className="mt-3 text-slate-800 dark:text-white dark:opacity-70">
                    {blog.properties.Description.rich_text[0].text.content}
                  </p>
                )}

                <div
                  className={`details flex items-end md:items-center justify-between mt-[4.5rem] `}
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
          </div>
        ))}
      </div>
    </section>
  );
}
