"use client";

import { CartContext } from "@/context/CartContextProvider";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";

export default function Featured({
  products,
}: {
  products: Array<Record<string, string>>;
}) {
  const { addProduct } = useContext(CartContext)!;
  const [activeIndex, setActiveIndex] = useState<number>(1); // Start at 1 for the first actual product
  const [isTransitioning, setIsTransitioning] = useState<boolean>(true);
  const transitionRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Clone products for seamless looping
  const clonedProducts = [
    products[products.length - 1], // Last product at the start
    ...products,
    products[0], // First product at the end
  ];

  // Function to start the interval
  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prevIndex) => prevIndex + 1);
    }, 5000);
  };

  // Function to clear the interval
  const clearInterval = () => {
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Start interval on mount
  useEffect(() => {
    startInterval();
    return () => clearInterval(); // Clear on unmount
  }, []);

  // Handle seamless looping
  useEffect(() => {
    if (activeIndex === clonedProducts.length - 1) {
      transitionRef.current = setTimeout(() => {
        setIsTransitioning(false); // Disable transition
        setActiveIndex(1); // Reset to the first actual product
      }, 500); // Match transition duration
    }

    if (activeIndex === 0) {
      transitionRef.current = setTimeout(() => {
        setIsTransitioning(false); // Disable transition
        setActiveIndex(clonedProducts.length - 2); // Reset to the last actual product
      }, 500);
    }

    return () => {
      if (transitionRef.current) {
        clearTimeout(transitionRef.current);
      }
    };
  }, [activeIndex, clonedProducts.length]);

  // Re-enable transitions after adjustment
  useEffect(() => {
    if (!isTransitioning) {
      const timeout = setTimeout(() => setIsTransitioning(true), 50); // Small delay to re-enable transitions
      return () => clearTimeout(timeout);
    }
  }, [isTransitioning]);

  function nextImage() {
    setActiveIndex((prevIndex) => {
      if (prevIndex < clonedProducts.length) {
        return prevIndex + 1;
      }
      return 1;
    });
  }

  return (
    <div
      className="relative w-full overflow-hidden group"
      onMouseEnter={clearInterval} // Activo cuando el cursor entra al contenedor principal
      onMouseLeave={startInterval} // Activo cuando el cursor sale del contenedor principal
    >
      <div
        className={`flex will-change-transform ${
          isTransitioning ? "transition-transform duration-500" : ""
        }`}
        style={{
          transform: `translateX(-${activeIndex * 100}%)`,
        }}
        style={{
          transform: `translateX(-${activeIndex * 100}%)`,
        }}
      >
        {clonedProducts.map((product, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <div className="flex h-[600px] md:h-[380px] justify-center bg-zinc-900 text-white py-[25px]">
              <div className="Center h-full">
                <div className="flex flex-col-reverse gap-10 md:grid md:grid-cols-2">
                  <div className="flex flex-col justify-center">
                    <h1 className="text-4xl sm:text-5xl">{product?.title}</h1>
                    <p className="text-[#aaa] mt-4">{product?.description}</p>
                    <div className="mt-6 gap-2 flex">
                      <Link
                        href={"/product/" + product._id}
                        className="OutlineBtn"
                      >
                        Read more
                      </Link>
                      <button
                        onClick={() => addProduct(product._id)}
                        className="DefaultBtn inline-flex gap-1 items-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-5 shrink-0"
                        >
                          <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                        </svg>
                        Add to cart
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <Image
                      src={product?.images[0]}
                      alt="Product"
                      width={500}
                      height={500}
                      className="w-auto h-full max-h-[250px] object-contain md:max-h-[300px]"
                      priority={index === activeIndex}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Background with degree */}
            <div className="w-full h-[300px] bg-gradient-to-b from-zinc-900 from-40% to-80% to-[#eee] top-full" />
          </div>
        ))}
      </div>

      {/* Pagination dots */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[300px] md:flex gap-4 z-10 hidden">
        {products.map((product, index) => (
          <div
            className="w-3 h-3 rounded-full ring-1 ring-gray-200 cursor-pointer flex items-center justify-center"
            key={index}
            onClick={() => setActiveIndex(index + 1)}
          >
            {product._id === clonedProducts[activeIndex]._id && (
              <div className="w-[6px] h-[6px] bg-gray-200 rounded-full"></div>
            )}
          </div>
        ))}
      </div>

      {/* Arrow Left */}
      <button
        className="w-12 h-16 border-zinc-200 border-l-0 border bg-white absolute top-[150px] left-0 shadow-md rounded-r-full hover:w-16 transition-all text-blue-600 flex items-center justify-center opacity-0 group-hover:opacity-100"
        onClick={() => setActiveIndex(activeIndex - 1)}
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

      {/* Arrow Right */}
      <button
        className="w-12 h-16 border-zinc-200 border-r-0 border bg-white absolute top-[150px] right-0 shadow-md rounded-l-full hover:w-16 transition-all text-blue-600 flex items-center justify-center opacity-0 group-hover:opacity-100"
        onClick={nextImage}
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
  );
}
