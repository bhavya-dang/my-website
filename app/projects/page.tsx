export default async function Project() {
  const data = await fetch("http://localhost:3000/api/notion", {
    next: {
      revalidate: 0,
    },
  });
  const query = await data.json();

  // query.results.map((project: any) => {
  //   console.log(project.properties["Demo URL"].rich_text[0].href);
  // });

  return (
    <section className="m-auto mt-10 p-4">
      <h2 className="text-white font-inter font-semibold text-3xl">Projects</h2>
      <div className="my-projects mt-4 flex flex-col flex-wrap gap-y-2">
        {query.results.map((project: any) => (
          <div
            className="card min-h-full min-w-full bg-white/10 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl font-inter p-4 text-white my-project"
            key={project.id}
          >
            <h1 className="text-xl">
              {project.properties.Name.title[0].plain_text}
            </h1>
            <p className="mt-3 text-white">
              {project.properties.Description.rich_text[0].text.content
                ? project.properties.Description.rich_text[0].text.content
                : "No Desciption"}
            </p>
            <div className="details flex items-center justify-between">
              <p className="mt-2">
                {project.properties.Tags.multi_select.length !== 0 &&
                  project.properties.Tags.multi_select.map(
                    (tag: any, index: number) => (
                      <span
                        key={index}
                        className={`text-sm text-white bg-[#a29bfe] rounded-md px-2 py-1 mr-2`}
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
                <span className="text-white hover:text-[#a29bfe] py-1 px-2 font-inter font-medium">
                  <a href={"//"} target="_blank">
                    Live Demo
                  </a>
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
