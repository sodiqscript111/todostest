"use client";
import React from "react";
import { cn } from "../lib/utils";

// It's good practice to have your image array outside the component
// so it doesn't get re-created on every render.
const defaultImages = [
  "https://i.ibb.co/WN08nCCh/Whats-App-Image-2025-07-06-at-14-24-34-27421a02.jpg",
  "https://i.ibb.co/xKPZVtGT/Whats-App-Image-2025-07-06-at-14-24-34-8fe47a0f.jpg",
  "https://i.ibb.co/S4pjXMzr/Whats-App-Image-2025-07-06-at-14-24-50-d6f8c1ef.jpg",
  "https://i.ibb.co/TxwVhTjt/Whats-App-Image-2025-07-06-at-14-24-37-161ad57c.jpg",
  "https://i.ibb.co/TDzYgSY0/Whats-App-Image-2025-07-06-at-14-24-47-9af0bf2b.jpg",
  "https://i.ibb.co/WNLvbtMX/Whats-App-Image-2025-07-06-at-14-24-46-b93a99f2.jpg",
  "https://i.ibb.co/S7Q7p95T/Whats-App-Image-2025-07-06-at-14-24-35-23a2f923.jpg",
  "https://i.ibb.co/9H3mhC2v/business-cards-791facf7936befec4c7b.png",
  "https://i.ibb.co/WSmLdfF/Latest-Work-010-31b6aac22e58ea04e9d5.png",
];

interface Props {
  images?: string[];
  className?: string;
}

export const OurWorksGrid: React.FC<Props> = ({
  images = defaultImages,
  className,
}) => {
  // Always limit to the first 9 images to ensure a clean 3x3 grid
  const gridImages = images.slice(0, 9);

  return (
    <section className={cn("bg-black w-full py-16 px-6 mt-20 md:mt-[400px]", className)}>
      <h1 className="text-7xl font-extrabold text-white text-center mb-12">
        Our Works
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-3 gap-4 md:gap-8">
        {gridImages.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Work image ${idx + 1}`}
            loading="lazy"
            className="w-full h-40 md:h-64 object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
          />
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <a
          href="/our-works" // Change this to your actual page URL
          className="px-8 py-3 rounded-full bg-white text-black font-semibold text-lg hover:bg-gray-200 transition-colors duration-200"
        >
          See More
        </a>
      </div>
    </section>
  );
};

export default OurWorksGrid;
