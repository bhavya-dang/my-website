import { Client } from "@notionhq/client";

const notionSecret = process.env.NOTION_SECRET;
const notion = new Client({ auth: notionSecret });

export const getDatabase = async (
  id,
  property = "Name",
  direction = "descending"
) => {
  if (!notionSecret || !id)
    throw new Error("Notion secret or database ID not found");
  const response = await notion.databases.query({
    database_id: id,
    sorts: [
      {
        property,
        direction,
      },
    ],
  });
  return response;
};
