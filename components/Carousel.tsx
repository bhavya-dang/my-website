/* eslint-disable @next/next/no-img-element */
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { getTagColor } from "@/util/functions";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

type Project = {
  id: string;
  properties: {
    Image: {
      files: { file: { url: string } }[];
    };
    Name: {
      title: { plain_text: string }[];
    };
    Description: {
      rich_text: { text: { content: string } }[];
    };
    Tags: {
      multi_select: { name: string; color: string }[];
    };
    "Github URL": {
      rich_text: { href: string }[];
    };
    "Demo URL": {
      rich_text: { href: string }[];
    };
  };
};

interface ImageCarouselProps {
  items: Project[];
}
export default function ImageCarousel({ items }: ImageCarouselProps) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fetchImages = async () => {
      try {
        // Start the interval to show loading animation
        timer = setTimeout(() => {
          setLoading(true); // Ensure loading is true during the interval
        }, 5000); // Update loading state every 500ms
        const response = await fetch("/api/images");
        const data = await response.json();
        setImages(data.projects);
      } catch (error) {
        console.error("Failed to fetch images:", error);
      } finally {
        // Stop the interval and clear loading state
        clearTimeout(timer);
        setLoading(false);
      }
    };

    fetchImages();
    return () => {
      clearTimeout(timer); // Clear interval on component unmount
    };
  }, []);

  return (
    <div className="container">
      <Carousel
        showArrows={false}
        showIndicators={true}
        infiniteLoop={true}
        dynamicHeight={false}
        autoPlay={true}
        showStatus={false}
        interval={6000}
        swipeable={true}
        onClickItem={(index) => {
          const selectedItem = items[index]; // Use the correct item based on the index
          const demoUrl =
            selectedItem.properties["Demo URL"].rich_text.length !== 0
              ? selectedItem.properties["Demo URL"].rich_text[0].href
              : selectedItem.properties["Github URL"].rich_text[0].href;

          window.open(demoUrl);
        }}
        className="p-12"
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center"
          >
            <div className="mb-16 h-full overflow-visible">
              {images[index] && (
                <Image
                  src={images[index]}
                  width={648}
                  height={294}
                  alt="Project Image"
                  className="w-full h-auto object-cover rounded-md"
                />
              )}
            </div>
            <div className="mb-12">
              <h1 className="font-bold text-2xl text-black bg-clip-text text-transparent bg-gradient-to-b from-black to-black/[0.6] dark:from-neutral-50 dark:to-neutral-400 bg-opacity-50 mb-3">
                {item.properties.Name.title[0]?.plain_text ?? "No Title"}
              </h1>
              <p className="dark:text-white/85 text-[#0b0b0b] text-base">
                {item.properties.Description.rich_text[0]?.text?.content ??
                  "No description available"}
              </p>
              {/* <div className="details flex items-center justify-between mt-5 md:block xl:flex">
                <p className="md:grid md:grid-cols-2 md:gap-y-2 xl:flex ">
                  {item.properties.Tags.multi_select.length !== 0 &&
                    item.properties.Tags.multi_select.map((tag, index) => (
                      <span
                        key={index}
                        className={`text-sm text-white ${getTagColor(
                          tag.color
                        )} rounded-full px-2 py-1 mr-2`}
                      >
                        {tag.name}
                      </span>
                    ))}
                </p>
                <p className="links flex items-center gap-2">
                  <span className="text-slate-800 dark:text-white hover:text-violet-500 py-1 px-2 font-medium">
                    <a
                      href={
                        item.properties["Github URL"].rich_text[0]?.href ?? "#"
                      }
                      target="_blank"
                    >
                      Github Repo
                    </a>
                  </span>
                  {item.properties["Demo URL"].rich_text.length !== 0 && (
                    <span className="text-slate-800 dark:text-white hover:text-violet-500 py-1 px-2 font-medium">
                      <a
                        href={
                          item.properties["Demo URL"].rich_text[0]?.href ?? "#"
                        }
                        target="_blank"
                      >
                        Live Demo
                      </a>
                    </span>
                  )}
                </p>
              </div> */}
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
