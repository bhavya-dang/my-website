// ... (existing code)

export function renderBlock(block) {
  switch (block.type) {
    case "heading_2":
      return (
        <h2 key={block.id} className="font-inter font-semibold text-2xl">
          {block.heading_2.rich_text.length > 0
            ? block.heading_2.rich_text[0].text.content
            : ""}
        </h2>
      );
    case "paragraph":
      return (
        <div
          key={block.id}
          className="mt-3 text-slate-800 dark:text-white dark:opacity-70"
        >
          {block.paragraph.rich_text.length > 0
            ? block.paragraph.rich_text.map((textSegment, index) => (
                <span key={index}>
                  {textSegment.text.link === null ? (
                    textSegment.text.content
                  ) : (
                    <a
                      className={
                        textSegment.text.link !== null
                          ? "underline dark:text-violet-600"
                          : ""
                      }
                      href={textSegment.text.link.url}
                    >
                      {textSegment.text.content}
                    </a>
                  )}
                </span>
              ))
            : "\n"}
        </div>
      );
    default:
      return null;
  }
}

// ... (existing code)
