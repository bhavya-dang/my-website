/* eslint-disable @next/next/no-img-element */
import { getPage, getBlocksFromPage } from "@/lib/notion/handlers";
import { renderBlock } from "@/lib/notion/renderBlock";
import moment from "moment";
import type { Metadata } from "next";

export const revalidate = 0; // to prevent hard caching on dev time
interface pageProps {
  params: {
    blogID: string;
  };
}

export const metadata: Metadata = {
  title: "Bhavya Dang - Blogs",
  description: "Bhavya Dang's super awesome amazing fantastic marvelous blogs",
};

interface NotionPageResponse {
  results: {
    properties?: {
      Name?: {
        title: Array<{ plain_text: string }>;
      };
      "Created At"?: {
        date: {
          start: string;
        };
      };
      Tags?: {
        multi_select: Array<{ name: string }>;
      };
    };
    // other properties...
  };
  // other properties...
}

export default async function Blogs({ params }: pageProps) {
  const pageQuery: any = await getPage(params.blogID);
  const blockQuery = await getBlocksFromPage(params.blogID);

  const blocks = blockQuery.results;
  const title = pageQuery.properties?.Name?.title[0]?.plain_text;
  const createdAt = pageQuery.properties["Created At"].date.start;
  const tags = pageQuery.properties.Tags.multi_select;

  return (
    <section className="m-auto mt-10 p-4 font-inter">
      <div>
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="text-sm mt-5 dark:text-white text-black/50 dark:opacity-25 font-mono">
          {moment(createdAt).format("MMMM DD, YYYY")}
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag: any, index: number) => (
            <span
              key={index}
              className="font-medium rounded-full px-2 py-1 text-xs dark:bg-white dark:text-black bg-black text-white"
            >
              {tag.name}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-16">{blocks.map((block) => renderBlock(block))}</div>
    </section>
  );
}
