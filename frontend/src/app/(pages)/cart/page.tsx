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
          <div className="bg-[#fff] rounded-md p-8">
            <h2>Cart</h2>
            {!cartProducts?.length && <div>Your cart is empty</div>}
            {products?.length > 0 && (
              <table className="StyledTable">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td className="py-2">
                        <div className="w-[100px] h-[100px] p-2 border shadow-md rounded-md flex items-center justify-center">
                          <img
                            className="max-w-[full] max-h-full"
                            src={product.images[0]}
                            alt={product.title}
                          />
                        </div>
                        {product.title}
                      </td>
                      <td>
                        {cartProducts.filter((id) => id === product._id).length}
                      </td>
                      <td>
                        $
                        {cartProducts.filter((id) => id === product._id)
                          .length * Number(product.price)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          {!!cartProducts?.length && (
            <div className="bg-[#fff] rounded-md p-8">
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
