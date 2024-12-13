"use client";

import { createContext, SetStateAction, useState } from "react";

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

  function addProduct(productId: string) {
    setCartProducts((prev) => [...prev, productId]);
  }

  return (
    <CartContext.Provider value={{ cartProducts, addProduct }}>
      {children}
    </CartContext.Provider>
  );
}
