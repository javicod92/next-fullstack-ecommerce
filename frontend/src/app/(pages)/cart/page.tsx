"use client";

import { CartContext } from "@/context/CartContextProvider";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

export default function CartPage() {
  const { cartProducts } = useContext(CartContext)!;
  const [products, setProducts] = useState<Array<Record<string, string>>>([]);

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    }
  }, [cartProducts]);

  return (
    <div className="flex justify-center">
      <div className="Center">
        <div className="grid grid-cols-[1.2fr,.8fr] gap-4 mt-10 ">
          <div className="bg-[#fff] rounded-[10px] p-8">
            {!cartProducts?.length && <div>Your cart is empty</div>}
            {products?.length > 0 && (
              <div>
                <h2>Cart</h2>
                {products.map((product) => (
                  <div key={product._id}>
                    {product.title}:{" "}
                    {cartProducts.filter((id) => id === product._id).length}
                  </div>
                ))}
              </div>
            )}
          </div>
          {!!cartProducts?.length && (
            <div className="bg-[#fff] rounded-[10px] p-8">
              <h2>Order information</h2>
              <input type="text" placeholder="Adress" />
              <input type="text" placeholder="Adress 2" />
              <button className="PrimarySmallBtnBlack w-full">
                Continue to payment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
