"use client";
import Image from "next/image";
import { useState } from "react";

export default function ProductImages({ images }: { images: string[] }) {
  const [imageIndex, setImageIndex] = useState<number>(0);

  const changeImage = (index: number) => setImageIndex(index);

  const changeImageByArrow = (direction: "next" | "prev") => {
    setImageIndex((prev) => {
      if (direction === "prev") {
        return prev > 0 ? prev - 1 : images.length - 1;
      }
      return prev < images.length - 1 ? prev + 1 : 0;
    });
  };

  return (
    <div>
      {/* Main Picture */}
      <div className="w-full flex items-center justify-center">
        {/* Left Arrow */}
        <button
          className="absolute shadow-md rounded-r-full left-0 border p-2 py-4 hover:text-blue-500 transition-transform"
          onClick={() => changeImageByArrow("prev")}
          aria-label="Previous image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>

        {/* Main Image */}
        <div className="flex-1 p-4 aspect-square max-w-full flex items-center justify-center">
          <Image
            width={268}
            height={268}
            className="w-full h-full object-contain"
            src={images[imageIndex]}
            alt={`Product Image ${imageIndex + 1}`}
          />
        </div>

        {/* Right Arrow */}
        <button
          className="absolute shadow-md rounded-l-full right-0 border p-2 py-4 hover:text-blue-500 transition-transform"
          onClick={() => changeImageByArrow("next")}
          aria-label="Next image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 19.5 15.75 12l-7.5-7.5"
            />
          </svg>
        </button>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(60px,1fr))] gap-4 mt-4">
        {images.map((image, index) => (
          <div
            key={image}
            className={`border flex items-center justify-center aspect-square p-1 cursor-pointer transition-transform ease-in-out ${
              imageIndex === index
                ? "border-blue-500 scale-110"
                : "hover:scale-110"
            }`}
            onClick={() => changeImage(index)}
            aria-label={`Image ${index + 1}`}
          >
            <Image
              height={60}
              width={60}
              className="w-full h-full object-contain"
              src={image}
              alt={`Product Thumbnail ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
