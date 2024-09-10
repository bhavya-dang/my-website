// lib/notion.ts (or another suitable location)
import { getDatabase } from "@/util/notion/index";

export async function fetchProjects() {
  const databaseID = process.env.NOTION_PROJECTS_DB_ID || "";
  const query = await getDatabase(databaseID);
  return query.results;
}
