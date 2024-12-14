"use client";

import { createContext, useEffect, useState } from "react";

type ContextTypes = {
  cartProducts: Array<string>;
  addProduct(productId: string): void;
};

export const CartContext = createContext<ContextTypes | null>(null);

export default function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartProducts, setCartProducts] = useState<Array<string>>([]);

  useEffect(() => {
    //This useEffect verifies and ensures that code only runs in a client side, because localStorage only runs in client side
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCartProducts(JSON.parse(storedCart));
      }
    }
  }, []);

  useEffect(() => {
    if (cartProducts?.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);

  function addProduct(productId: string) {
    setCartProducts((prev) => [...prev, productId]);
  }

  return (
    <CartContext.Provider value={{ cartProducts, addProduct }}>
      {children}
    </CartContext.Provider>
  );
}
