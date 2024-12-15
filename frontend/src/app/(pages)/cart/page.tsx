"use client";

import { CartContext } from "@/context/CartContextProvider";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

export default function CartPage() {
  const { cartProducts, addProduct, removeProduct } = useContext(CartContext)!;
  const [products, setProducts] = useState<Array<Record<string, string>>>([]);
  let total = 0;

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    }
  }, [cartProducts]);

  function moreOfThisProduct(id: string) {
    addProduct(id);
  }

  function lessOfThisProduct(id: string) {
    removeProduct(id);
  }

  for (const productId of cartProducts) {
    const price = Number(products.find((p) => p._id === productId)?.price || 0);
    total += price;
  }

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
                      <td className="py-2 text-sm">
                        <div className="w-[100px] h-[100px] p-2 border shadow-md rounded-md flex items-center justify-center mb-2">
                          <img
                            className="max-w-[full] max-h-full"
                            src={product.images[0]}
                            alt={product.title}
                          />
                        </div>
                        <p>{product.title}</p>
                      </td>
                      <td className="p-4">
                        <div className="text-nowrap border rounded-lg overflow-hidden">
                          <button
                            className="DefaultSmallBtn"
                            onClick={() => lessOfThisProduct(product._id)}
                          >
                            -
                          </button>
                          <span className="px-2">
                            {
                              cartProducts.filter((id) => id === product._id)
                                .length
                            }
                          </span>
                          <button
                            className="DefaultSmallBtn"
                            onClick={() => moreOfThisProduct(product._id)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>
                        $
                        {cartProducts.filter((id) => id === product._id)
                          .length * Number(product.price)}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td>TOTAL</td>
                    <td></td>
                    <td>${total}</td>
                  </tr>
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
