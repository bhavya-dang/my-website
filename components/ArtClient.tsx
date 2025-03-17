/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import { Metadata } from "next";
const inter = Inter({ subsets: ["latin"] });

export const generateMetadata = (): Metadata => ({
  title: "Art",
  description: "Explore my art.",
});

export default function ArtClient() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedImage) {
        closeModal();
      }
    };

    if (selectedImage) {
      window.addEventListener("keydown", handleEscKey);
    }

    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [selectedImage]);

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
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = "unset"; // Re-enable scrolling
  };

  if (loading) {
    return (
      <>
        <section
          className={`m-auto mt-6 md:mt-12 p-4 md:px-8 lg:px-16 xl:px-36 ${inter.className}`}
        >
          <div className="mb-8">
            <h1 className="font-extrabold text-4xl md:text-5xl lg:text-6xl text-slate-950 dark:text-white leading-tight">
              Art.
            </h1>
            <p className="text-base md:text-lg text-slate-700 dark:text-slate-300 mt-2 md:mt-4">
              I had a phase when I made a lot of art. Now I lost my powers 😔
            </p>
          </div>
        </section>
        <section className="px-4 md:px-8 lg:px-16 xl:px-36 py-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 12 }).map((_, index) => (
              <div
                key={index}
                className="relative dark:bg-white/10 rounded-lg animate-pulse"
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
      <section
        className={`m-auto mt-6 md:mt-12 p-4 md:px-8 lg:px-16 xl:px-36 ${inter.className}`}
      >
        <div className="mb-8">
          <h1 className="font-extrabold text-4xl md:text-5xl lg:text-6xl text-slate-950 dark:text-white leading-tight">
            Art.
          </h1>
          <p className="text-base md:text-lg text-slate-700 dark:text-slate-300 mt-2 md:mt-4">
            I had a phase when I made a lot of art. Now I lost my powers 😔
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((src, index) => (
            <div
              key={index}
              className="relative w-full aspect-square overflow-hidden rounded-lg shadow-lg group cursor-pointer"
              onClick={() => openModal(src)}
            >
              <Image
                src={src}
                alt={`Gallery Image ${index + 1}`}
                className="object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-105"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                priority={index < 4} // Load first 4 images immediately
              />
            </div>
          ))}
        </div>
        <p className="mt-6 md:mt-8 mb-2 text-lg md:text-xl italic font-medium">
          Check out more on my{" "}
          <a
            href="https://www.deviantart.com/syncox"
            className="text-violet-500 hover:text-violet-600 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            deviantart
          </a>
        </p>
      </section>

      {/* Modal for full-sized image */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-8 cursor-pointer"
          onClick={closeModal}
        >
          <div
            className="relative w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Full-size Gallery Image"
              className="max-h-[90vh] max-w-[90vw] object-contain cursor-auto"
            />
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white/80 hover:text-white p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
