"use client";

import { CartContext } from "@/context/CartContextProvider";
import Image from "next/image";
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
        <Image
          width={135}
          height={135}
          className="max-w-full max-h-full object-contain"
          src={images[0]}
          alt="Product Image"
        />
      </Link>
      <div className="mt-2">
        <Link href={url}>
          <h2 className="font-normal text-base truncate max-w-full">{title}</h2>
        </Link>
        <div className="flex items-center justify-between mt-[2px]">
          <div className="font-bold text-lg font-[Viga]">${price}</div>
          <button
            onClick={() => addProduct(_id)}
            className="PrimarySmallBtn inline-flex gap-1 items-center text-white"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
