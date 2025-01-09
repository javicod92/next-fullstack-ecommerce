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
              <div>
                <div className="hidden relative md:block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                  <div
                    className={`${
                      cartProducts.length > 0 ? "flex" : "hidden"
                    } absolute -top-4 -right-4 w-6 h-6 bg-[#2e70ff] rounded-full text-white text-sm items-center justify-center`}
                  >
                    {cartProducts.length}
                  </div>
                </div>
                <div className="block md:hidden">
                  cart ({cartProducts.length})
                </div>
              </div>
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
