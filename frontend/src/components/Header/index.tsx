"use client";

import { CartContext } from "@/context/CartContextProvider";
import Link from "next/link";
import { useContext, useState } from "react";

export default function Header() {
  const { cartProducts } = useContext(CartContext)!;
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);

  return (
    <header className="bg-zinc-900 text-white flex justify-center fixed top-0 left-0 z-10 right-0 md:static">
      {/* The div below is the component center */}
      <div className="Center">
        <div className="flex justify-between">
          <Link onClick={() => setIsNavOpen(false)} href={"/"}>
            Ecommerce
          </Link>
          <nav
            className={
              (isNavOpen ? "left-0" : "-left-full") +
              " " +
              "flex flex-col absolute w-full h-screen transition-all ease-in-out duration-300 p-5 py-[50px] -z-10 bg-zinc-900 gap-4 md:flex-row md:static md:p-0 md:w-auto md:h-auto md:z-0"
            }
          >
            <Link onClick={() => setIsNavOpen(false)} href={"/"}>
              Home
            </Link>
            <Link onClick={() => setIsNavOpen(false)} href={"/products"}>
              All products
            </Link>
            <Link onClick={() => setIsNavOpen(false)} href={"/categories"}>
              Categories
            </Link>
            <Link onClick={() => setIsNavOpen(false)} href={"/account"}>
              Account
            </Link>
            <Link onClick={() => setIsNavOpen(false)} href={"/cart"}>
              Cart ({cartProducts.length})
            </Link>
          </nav>
          <div className="md:hidden leading-[0]">
            <button onClick={() => setIsNavOpen((prevState) => !prevState)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
