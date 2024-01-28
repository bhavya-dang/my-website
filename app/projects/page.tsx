import { notionColors } from "@/constants/index";
import { Client } from "@notionhq/client";

const notionSecret = process.env.NOTION_SECRET;
const notion = new Client({ auth: notionSecret });
const databaseID = process.env.NOTION_DB_ID;

export const revalidate = 0; // to prevent hard caching on dev time

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
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Bhavya Dang - Projects",
  description:
    "Bhavya Dang's super awesome amazing fantastic marvelous projects",
};

export default async function Project() {
  const query = await getDatabase();

  function getTagColor(tagColor: string) {
    for (const key in notionColors) {
      if (key === tagColor) {
        return "bg-[" + notionColors[key] + "]";
      }
    }
    return "bg-[" + notionColors.default + "]";
  }

  return (
    <section className="m-auto mt-10 p-4">
      <h2 className="font-semibold text-3xl text-slate-950 dark:text-white">
        Projects
      </h2>
      <div className="my-projects mt-4 flex flex-col flex-wrap gap-y-4 md:flex-row md:grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 aspect-w-1 aspect-h-1 md:gap-4">
        {query.results
          .slice(0, query.results.length - 1)
          .map((project: any) => (
            <div
              className="card min-h-full min-w-full bg-white/10 backdrop-filter backdrop-blur-lg shadow-md rounded-xl font-inter p-4 text-slate-800 dark:text-white my-project"
              key={project.id}
            >
              <h1 className="text-xl font-semibold">
                {project.properties.Name.title[0].plain_text}
              </h1>
              <p className="mt-3 text-slate-800 dark:text-slate-200">
                {project.properties.Description.rich_text[0].text.content
                  ? project.properties.Description.rich_text[0].text.content
                  : "No Desciption"}
              </p>
              <div className="details flex items-center justify-between mt-5 md:block xl:flex">
                <p className="md:grid md:grid-cols-2 md:gap-y-2 xl:flex ">
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
                  <span className="text-slate-800 dark:text-white hover:text-violet-500 py-1 px-2 font-inter font-medium">
                    <a
                      href={project.properties["Github URL"].rich_text[0].href}
                      target="_blank"
                    >
                      Github Repo
                    </a>
                  </span>
                  {project.properties["Demo URL"].rich_text.length !== 0 && (
                    <span className="text-slate-800 dark:text-white hover:text-violet-500 py-1 px-2 font-inter font-medium">
                      <a
                        href={project.properties["Demo URL"].rich_text[0].href}
                        target="_blank"
                      >
                        Live Demo
                      </a>
                    </span>
                  )}
                </p>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
