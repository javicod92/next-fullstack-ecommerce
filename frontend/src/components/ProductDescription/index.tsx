"use client";

import { CartContext } from "@/context/CartContextProvider";
import { useContext } from "react";

type ProductType = {
  _id: string;
  title: string;
  description: string;
  price: string;
};

export default function ProductDescription({
  product,
}: {
  product: ProductType;
}) {
  const { addProduct } = useContext(CartContext)!;

  const handleAddToCart = () => {
    addProduct(product._id);
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-semibold text-xl">{product.title}</h1>
      <p className="font-normal text-gray-700">{product.description}</p>
      <div className="font-bold text-2xl font-[Viga]">${product.price}</div>
      <button
        className="PrimarySmallBtnBlack flex gap-2 justify-center items-center"
        onClick={handleAddToCart}
        aria-label={`Add ${product.title} to cart`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-5 shrink-0"
          aria-hidden="true"
        >
          <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
        </svg>
        Add to Cart
      </button>
    </div>
  );
}
