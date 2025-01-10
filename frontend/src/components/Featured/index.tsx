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

  // Clone products for seamless looping
  const clonedProducts = [
    products[products.length - 1], // Last product at the start
    ...products,
    products[0], // First product at the end
  ];

  // Function to change the image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => prevIndex + 1);
    }, 5000);

    return () => clearInterval(interval);
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

  return (
    <div className="relative z-0 w-full">
      <div
        className={`flex ${
          isTransitioning ? "transition-transform duration-500" : ""
        }`}
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {clonedProducts.map((product, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <div className="flex justify-center bg-zinc-900 text-white py-[25px]">
              <div className="w-full h-[300px] absolute bg-gradient-to-b from-zinc-900 from-40% to-80% to-transparent top-full" />
              <div className="Center h-[535px] md:h-[300px]">
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
                      className="max-w-[400px] w-full h-auto max-h-[250px] object-contain md:max-w-full md:max-h-[300px]"
                      priority={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
