"use client";
import { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import Image from "next/image";
import { FaYoutube, FaPlay } from "react-icons/fa";

const inter = Inter({ subsets: ["latin"] });

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  viewCount: string;
}

export default function YouTubeSection() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("/api/youtube");
        const data = await response.json();
        setVideos(data.videos);
      } catch (error) {
        console.error("Failed to fetch videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatViewCount = (count: string) => {
    const num = parseInt(count);
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  if (loading) {
    return (
      <section
        className={`m-auto mt-12 p-4 md:px-8 lg:px-16 xl:px-36 ${inter.className}`}
      >
        <div className="mb-8">
          <h1 className="font-extrabold text-4xl md:text-5xl lg:text-6xl text-slate-950 dark:text-white leading-tight">
            Videos.
          </h1>
          <p className="text-base md:text-lg text-slate-700 dark:text-slate-300 mt-2 md:mt-4">
            Latest content from my{" "}
            <a
              href="https://youtube.com/@bhavyadangdev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-500 hover:text-violet-600 transition-colors"
            >
              YouTube channel
            </a>
            .
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden bg-white/5 animate-pulse"
            >
              <div className="aspect-video bg-gray-200 dark:bg-gray-700" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      className={`m-auto mt-40 p-4 md:px-8 lg:px-16 xl:px-36 ${inter.className}`}
    >
      <div className="mb-8">
        <h1 className="font-extrabold text-4xl md:text-5xl lg:text-6xl text-slate-950 dark:text-white leading-tight">
          Videos.
        </h1>
        <p className="text-base md:text-lg text-slate-700 dark:text-slate-300 mt-2 md:mt-4">
          Latest content from my{" "}
          <a
            href="https://youtube.com/@bhavyadangdev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-violet-500 hover:text-violet-600 transition-colors"
          >
            YouTube channel
          </a>
          .
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <a
            key={video.id}
            href={`https://youtube.com/watch?v=${video.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl overflow-hidden bg-white/5 hover:bg-white/10 transition-colors group"
          >
            <div className="relative aspect-video">
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-colors">
                <FaPlay className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-lg line-clamp-2 mb-2">
                {video.title}
              </h3>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <span>{formatViewCount(video.viewCount)} views</span>
                <span>•</span>
                <span>{formatDate(video.publishedAt)}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
      {/* <div className="mt-8 text-center">
        <a
          href="https://youtube.com/@bhavyadangdev"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-violet-500 hover:text-violet-600 transition-colors"
        >
          <FaYoutube className="w-6 h-6" />
          <span className="text-lg font-medium">Visit my channel</span>
        </a>
      </div> */}
    </section>
  );
}
