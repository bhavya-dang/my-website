/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

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
    const fetchImages = async () => {
      try {
        const response = await fetch("/api/images");
        const data = await response.json();
        setImages(data.gallery.sort(() => Math.random() - 0.5));
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
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = "unset";
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8">
      <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-2 text-balance">
        Art
      </h2>
      <p className="text-muted-foreground text-base sm:text-lg mb-8">
        I had a phase when I made a lot of art. Now I lost my powers &#x1f614;
      </p>

      <div className="font-mono text-xs sm:text-sm text-muted-foreground mb-6">
        <span className="text-accent">$</span>
        <span className="ml-1.5">ls -la gallery/</span>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="aspect-square bg-secondary rounded-lg animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {images.map((src, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer"
              onClick={() => openModal(src)}
            >
              <Image
                src={src}
                alt={`Gallery Image ${index + 1}`}
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                priority={index < 4}
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-border/50 rounded-lg pointer-events-none" />
            </div>
          ))}
        </div>
      )}

      <p className="mt-6 text-sm text-muted-foreground">
        Check out more on{" "}
        <a
          href="https://www.deviantart.com/syncox"
          className="text-accent hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          deviantart
        </a>
      </p>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm p-4 cursor-pointer"
          onClick={closeModal}
        >
          <div
            className="relative w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Full-size Gallery Image"
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg"
            />
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground p-2 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 transition-colors"
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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
    </div>
  );
}
