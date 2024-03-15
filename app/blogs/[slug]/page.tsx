/* eslint-disable @next/next/no-img-element */
import {
  getPageBySlug,
  getPageContent,
  notionClient,
} from "@/util/notion/index";
import moment from "moment";
import type { Metadata } from "next";

// notion renderer code
import { NotionRenderer } from "@notion-render/client";
import hljsPlugin from "@notion-render/hljs-plugin";

export const revalidate = 0; // to prevent hard caching on dev time
interface pageProps {
  params: {
    // blogID: string;
    slug: string;
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
  };
}

export default async function Blogs({ params }: pageProps) {
  const pageQuery: any = await getPageBySlug(params.slug);

  const blockQuery = await getPageContent(pageQuery.id);

  const notionRenderer = new NotionRenderer({
    client: notionClient,
  });

  notionRenderer.use(hljsPlugin({}));
  const html = await notionRenderer.render(...blockQuery);

  const blocks = blockQuery;
  const title = pageQuery.properties?.Name?.title[0]?.plain_text;
  const createdAt = pageQuery.properties["Created At"].date.start;
  const tags = pageQuery.properties.Tags.multi_select;

  return (
    <section className="m-auto mt-10 ml-6 mr-6 font-inter text-lg">
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
      {/* <div className="mt-16">{blocks.map((block) => renderBlock(block))}</div> */}
      <div
        className="notion-content mt-12"
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
    </section>
  );
}
