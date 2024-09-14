import "server-only";

import { Client } from "@notionhq/client";
import { cache } from "react";
import {
  BlockObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
const notionSecret = process.env.NOTION_SECRET;
export const notionClient = new Client({ auth: notionSecret });

export const getDatabase = async (
  id: string,
  property = "Name",
  direction = "descending"
) => {
  if (!notionSecret || !id)
    throw new Error("Notion secret or database ID not found");
  const response = await notionClient.databases.query({
    database_id: id,
    sorts: [
      {
        property,
        direction: direction as "descending" | "ascending",
      },
    ],
    filter: {
      property: "Status",
      status: {
        equals: "Published",
      },
    },
  });
  return response;
};

export const getPageBySlug = cache((slug: string) => {
  return notionClient.databases
    .query({
      database_id: process.env.NOTION_BLOGS_DB_ID!,
      filter: {
        property: "Slug",
        rich_text: {
          equals: slug,
        },
      },
    })
    .then((res) => res.results[0] as PageObjectResponse | undefined);
});

export const getPageContent = cache((pageId: string) => {
  return notionClient.blocks.children
    .list({ block_id: pageId })
    .then((res) => res.results as BlockObjectResponse[]);
});

export async function fetchProjects() {
  const databaseID = process.env.NOTION_PROJECTS_DB_ID || "";
  const query = await getDatabase(databaseID);
  return query.results;
}

export async function fetchBlogs() {
  const databaseID = process.env.NOTION_BLOGS_DB_ID || ""; // Ensure databaseID is defined
  const databaseQuery = await getDatabase(
    databaseID,
    "Created At",
    "descending"
  );
  return databaseQuery.results;
}
