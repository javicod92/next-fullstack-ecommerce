"use client";
import { useState } from "react";

export default function ProductImages({ images }: { images: Array<string> }) {
  const [imageIndex, setImageIndex] = useState<number>(0);

  function setImage(index: number) {
    setImageIndex(index);
  }

  return (
    <div>
      {/* Main Picture */}
      <div className="w-full flex items-center justify-center">
        {/* Left Arrow */}
        <button
          className="border rounded-r p-2 py-10 hover:text-blue-500 transition-transform absolute left-0"
          onClick={() =>
            setImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))
          }
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
          <img
            className="w-full h-full object-contain"
            src={images?.[imageIndex]}
            alt="Product Image"
          />
        </div>

        {/* Right Arrow */}
        <button
          className="border p-2 py-10 rounded-l hover:text-blue-500 transition-transform absolute right-0"
          onClick={() =>
            setImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))
          }
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
            className={`border flex items-center justify-center aspect-square p-1 
            hover:scale-110 transition-transform ease-in-out cursor-pointer ${
              imageIndex === index ? "border-blue-500" : ""
            }`}
            onClick={() => setImage(index)}
          >
            <img
              className="w-full h-full object-contain"
              src={image}
              alt="Product Thumbnail"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
