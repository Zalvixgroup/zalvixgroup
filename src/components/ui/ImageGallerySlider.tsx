"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageGallerySliderProps {
  images: string[];
  title: string;
}

export function ImageGallerySlider({ images, title }: ImageGallerySliderProps) {
  const [selectedImage, setSelectedImage] = useState(
    images.length > 0
      ? images[0]
      : "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80"
  );

  return (
    <div className="space-y-3">
      {/* Main Big Image Preview */}
      <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm">
        <Image
          src={selectedImage}
          alt={title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
          className="object-cover transition duration-300"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Verified Doorstep Technician</span>
        </div>
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedImage(img)}
              className={`relative w-20 h-16 rounded-xl overflow-hidden border-2 flex-shrink-0 transition ${
                selectedImage === img
                  ? "border-blue-600 ring-2 ring-blue-600/30 scale-105"
                  : "border-slate-200 opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt={`${title} thumbnail ${idx + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
