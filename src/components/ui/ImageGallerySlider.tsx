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
      {/* Main Image */}
      <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200">
        <Image
          src={selectedImage}
          alt={title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
          className="object-cover"
        />
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider text-zinc-900 border border-zinc-200">
          Verified Service
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedImage(img)}
              className={`relative w-20 h-16 rounded-xl overflow-hidden border transition ${
                selectedImage === img
                  ? "border-zinc-950 ring-1 ring-zinc-950"
                  : "border-zinc-200 opacity-60 hover:opacity-100"
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
