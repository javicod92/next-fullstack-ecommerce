"use client";

import { CartContext } from "@/context/CartContextProvider";
import Link from "next/link";
import { useContext } from "react";

export default function ProductBox({
  _id,
  title,
  description,
  price,
  images,
}: Record<string, string>) {
  const { addProduct } = useContext(CartContext)!;
  const url = "/product/" + _id;

  return (
    <div>
      <Link
        href={url}
        className="bg-[#fff] shadow-md rounded-md p-5 h-[150px] flex justify-center items-center transition-transform hover:scale-105"
      >
        <img className="max-w-full max-h-full" src={images[0]} alt="" />
      </Link>
      <div className="mt-2">
        <Link href={url}>
          <h2 className="font-normal text-base truncate max-w-full">{title}</h2>
        </Link>
        <div className="flex items-center justify-between mt-[2px]">
          <div className="font-bold text-lg">${price}</div>
          <button
            onClick={() => addProduct(_id)}
            className="PrimarySmallBtn inline-flex gap-1 items-center text-white"
          >
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-5 shrink-0"
            >
              <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
            </svg> */}
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
