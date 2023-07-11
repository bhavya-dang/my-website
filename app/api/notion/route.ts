import { Client } from "@notionhq/client";
import { NextResponse } from "next/server";

const notionSecret = process.env.NOTION_SECRET;
const notion = new Client({ auth: notionSecret });
const databaseID = process.env.NOTION_DB_ID;

const getDatabase = async () => {
  if (!notionSecret || !databaseID)
    throw new Error("Notion secret or database ID not found");
  const response = await notion.databases.query({
    database_id: databaseID,
    sorts: [
      {
        property: "Name",
        direction: "descending",
      },
    ],
  });
  return response;
};

export async function GET(req: Request) {
  const response = await getDatabase();
  return NextResponse.json(response);
}
