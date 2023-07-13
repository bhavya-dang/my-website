import { notionColors } from "@/constants";

export default async function Project() {
  //development
  // const data = await fetch("http:localhost:3000/api/notion/", {
  //   next: {
  //     revalidate: 0,
  //   },
  // });

  //production
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL || "";
  const data = await fetch(`${baseUrl}/api/notion/`, {
    next: {
      revalidate: 0,
    },
  });
  const query = await data.json();

  function getTagColor(tagColor: string) {
    for (const key in notionColors) {
      if (key === tagColor) {
        return "bg-[" + notionColors[key] + "]";
      }
    }
    return "bg-[" + notionColors.default + "]";
  }

  // console.log(getTagColor("purple"));

  return (
    <section className="m-auto mt-10 p-4">
      <h2 className="text-whitefont-inter font-semibold text-3xl md:text-blue">
        Projects
      </h2>
      <div className="my-projects mt-4 flex flex-col flex-wrap gap-y-4 md:flex-row md:grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 aspect-w-1 aspect-h-1 md:gap-4">
        {query.results.map((project: any) => (
          <div
            className="card min-h-full min-w-full bg-white/10 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl font-inter p-4 text-white my-project"
            key={project.id}
          >
            <h1 className="text-xl font-semibold">
              {project.properties.Name.title[0].plain_text}
            </h1>
            <p className="mt-3 text-white">
              {project.properties.Description.rich_text[0].text.content
                ? project.properties.Description.rich_text[0].text.content
                : "No Desciption"}
            </p>
            <div className="details flex items-center justify-between mt-4 md:block xl:flex">
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
                <span className="text-white hover:text-[#a29bfe] py-1 px-2 font-inter font-medium">
                  <a
                    href={project.properties["Github URL"].rich_text[0].href}
                    target="_blank"
                  >
                    Github Repo
                  </a>
                </span>
                {project.properties["Demo URL"].rich_text.length !== 0 && (
                  <span className="text-white hover:text-[#a29bfe] py-1 px-2 font-inter font-medium">
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
