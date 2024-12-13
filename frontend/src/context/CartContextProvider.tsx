"use client";

import { createContext, SetStateAction, useState } from "react";

type ContextTypes = {
  cartProducts: Array<string>;
  setCartProducts: React.Dispatch<SetStateAction<Array<string>>>;
};

export const CartContext = createContext<ContextTypes | null>(null);

export default function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartProducts, setCartProducts] = useState<Array<string>>([]);

  return (
    <CartContext.Provider value={{ cartProducts, setCartProducts }}>
      {children}
    </CartContext.Provider>
  );
}
