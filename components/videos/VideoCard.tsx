"use client";

import { useState } from "react";
import { Play, X } from "lucide-react";
import type { VideoCardData } from "@/types";

type VideoCardProps = VideoCardData;

const categoryColors = {
  tips: "bg-blue-100 text-blue-700",
  guide: "bg-emerald-100 text-emerald-700",
  vlog: "bg-purple-100 text-purple-700",
  food: "bg-orange-100 text-orange-700",
};

export function VideoCard({
  id,
  title,
  channelName,
  description,
  duration,
  category,
}: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const thumbnailUrl = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
  const embedUrl = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;

  return (
    <article className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {/* Video Container */}
      <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
        {isPlaying ? (
          <>
            <iframe
              src={embedUrl}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
            <button
              onClick={() => setIsPlaying(false)}
              className="absolute top-3 right-3 z-10 p-2 bg-black/70 hover:bg-black/90 text-white rounded-full transition-colors"
              aria-label="Close video"
            >
              <X className="h-4 w-4" />
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsPlaying(true)}
            className="w-full h-full relative"
            aria-label={`Play ${title}`}
          >
            {/* Thumbnail */}
            <img
              src={thumbnailUrl}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
              }}
            />

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
              <div className="w-16 h-16 flex items-center justify-center bg-red-600 rounded-full shadow-lg group-hover:scale-110 transition-transform">
                <Play className="h-8 w-8 text-white ml-1" fill="white" />
              </div>
            </div>

            {/* Badges */}
            <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
              <span className={`px-2.5 py-1 text-xs font-semibold rounded-full capitalize ${categoryColors[category]}`}>
                {category}
              </span>
              <span className="px-2.5 py-1 text-xs font-semibold bg-black/80 text-white rounded-full">
                {duration}
              </span>
            </div>
          </button>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-emerald-600 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-500 mb-2">{channelName}</p>
        <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
      </div>
    </article>
  );
}

interface VideoGridProps {
  videos: VideoCardData[];
  title?: string;
  subtitle?: string;
}

export function VideoGrid({
  videos,
  title = "Travel Videos",
  subtitle,
}: VideoGridProps) {
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <div className="mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {title}
            </h2>
            {subtitle && (
              <p className="text-lg text-gray-600 max-w-2xl">{subtitle}</p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {videos.map((video) => (
            <VideoCard key={video.id} {...video} />
          ))}
        </div>
      </div>
    </section>
  );
}
