"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";

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
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8">
      <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-2 text-balance">
        Videos
      </h2>
      <p className="text-muted-foreground text-base sm:text-lg mb-8">
        Latest content from my{" "}
        <a
          href="https://youtube.com/@bhavyadangdev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          YouTube channel
        </a>
        .
      </p>

      <div className="font-mono text-xs sm:text-sm text-muted-foreground mb-6">
        <span className="text-accent">$</span>
        <span className="ml-1.5">ls -la youtube/</span>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden bg-card border border-border/50 animate-pulse"
            >
              <div className="aspect-video bg-secondary" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-secondary rounded w-3/4" />
                <div className="h-3 bg-secondary rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((video) => (
            <a
              key={video.id}
              href={`https://youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl overflow-hidden bg-card border border-border/50 hover:shadow-md transition-all duration-200 group"
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
                  <FaPlay className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-sm line-clamp-2 mb-1">
                  {video.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{formatViewCount(video.viewCount)} views</span>
                  <span>&middot;</span>
                  <span>{formatDate(video.publishedAt)}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
