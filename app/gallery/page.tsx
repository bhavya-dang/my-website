/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // For modal

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
        setImages(data.gallery.sort(() => Math.random() - 0.5));
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

  const openModal = (src: string) => {
    setSelectedImage(src);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  if (loading) {
    return (
      <>
        <section className={`w-full pt-[1.25rem] px-7 ${inter.className}`}>
          <div className="mb-8">
            <h1
              className={`text-4xl font-bold text-left mb-3 ${inter.className} bg-clip-text text-transparent bg-gradient-to-b from-black to-black/[0.6] dark:from-neutral-50 dark:to-neutral-400 bg-opacity-50`}
            >
              Art Gallery
            </h1>
            <p className="text-2xl">Some of the fanarts I made</p>
          </div>
        </section>
        <section className="w-full px-4 py-2">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-fr grid-flow-dense">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="relative bg-black/50 rounded-lg animate-pulse"
                style={{ height: "200px" }}
              ></div>
            ))}
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className={`w-full py-5 px-7 ${inter.className}`}>
        <div className="mb-8">
          <h1
            className={`text-4xl font-bold text-left mb-3 ${inter.className} bg-clip-text text-transparent bg-gradient-to-b from-black to-black/[0.6] dark:from-neutral-50 dark:to-neutral-400 bg-opacity-50`}
          >
            Art Gallery
          </h1>
          <p className="text-2xl">Some of the fanarts I made</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-fr grid-flow-dense">
          {images.map((src, index) => (
            <div
              key={index}
              className="relative w-full h-64 overflow-hidden rounded-lg shadow-lg group" // Add group for hover effects
              onClick={() => openModal(src)} // Open modal on click
            >
              <Image
                src={src}
                alt={`Gallery Image ${index + 1}`}
                className="object-cover w-full h-full transform transition-transform duration-300 lg:hover:scale-105 cursor-pointer"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
        <p className="mt-5 mb-2 text-xl italic font-medium">
          Check out more on my{" "}
          <a
            href="https://www.deviantart.com/syncox"
            className="text-violet-500"
          >
            deviantart
          </a>
        </p>
      </section>

      {/* Modal for full-sized image */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex p-4 items-center justify-center bg-black bg-opacity-85"
          onClick={closeModal}
        >
          <div className="relative p-1 md:p-16 max-w-3xl w-full">
            <Image
              src={selectedImage}
              alt="Full-size Gallery Image"
              className="w-full h-screen object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
