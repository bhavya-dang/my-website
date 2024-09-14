/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

// CSS for Spinner
const spinnerStyles = {
  border: "8px solid #f3f3f3",
  borderTop: "8px solid #8B5CF6",
  borderRadius: "50%",
  width: "50px",
  height: "50px",
  animation: "spin 1s linear infinite",
};

// Keyframes for Spinner Animation
const keyframes = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  `;

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // For modal

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/api/images");
        const data = await response.json();
        setImages(data.sort(() => Math.random() - 0.5));
      } catch (error) {
        console.error("Failed to fetch images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const openModal = (src: string) => {
    setSelectedImage(src);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  if (loading) {
    return (
      <section className="w-full p-4">
        <style>{keyframes}</style> {/* Include keyframes for spinner */}
        <div className="flex justify-center items-center h-screen">
          <div style={spinnerStyles}></div>
        </div>
      </section>
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
              className="relative overflow-hidden rounded-lg shadow-lg group" // Add group for hover effects
              onClick={() => openModal(src)} // Open modal on click
            >
              {/* Image */}
              <img
                src={src}
                alt={`Gallery Image ${index + 1}`}
                className="object-cover w-full h-full transform transition-transform duration-300 lg:hover:scale-105 cursor-pointer"
                style={{ maxHeight: "300px" }}
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
            <img
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
