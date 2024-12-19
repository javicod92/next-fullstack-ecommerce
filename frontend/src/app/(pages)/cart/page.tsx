"use client";

import Form from "@/components/Form";
import { CartContext } from "@/context/CartContextProvider";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

type FormValues = Record<string, string>;

export default function CartPage() {
  const { cartProducts, addProduct, removeProduct } = useContext(CartContext)!;
  const [products, setProducts] = useState<Array<Record<string, string>>>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const isSuccessPage = searchParams.get("success") === "1";
  let total = 0;

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  async function goToPayment(formValues: FormValues) {
    const formData = { ...formValues, products: cartProducts };
    const response = await axios.post("/api/checkout", formData);

    if (response.data.url) {
      router.push(response.data.url);
    }
  }

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

  if (isSuccessPage) {
    return (
      <div className="flex justify-center">
        <div className="Center">
          <div className="bg-[#fff] rounded-md p-8 flex items-center gap-4">
            <div className="rounded-full border p-4 bg-lime-600 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={4}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="square"
                  strokeLinejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
            </div>
            <div>
              <h2>Thanks for your order</h2>
              <p>We will email you when your order will be sent.</p>
            </div>
          </div>
        </div>
      </div>
    );
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
            <Form
              className="bg-[#fff] rounded-md p-8 text-sm"
              title="Order information"
              onSubmitForm={goToPayment}
            >
              <div className="mt-4">
                <Form.Input
                  type="text"
                  name="name"
                  placeholder="Name"
                  required
                />
                <Form.Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
                <div className="flex gap-1">
                  <Form.Input
                    type="text"
                    name="city"
                    placeholder="City"
                    required
                  />
                  <Form.Input
                    type="number"
                    name="postalCode"
                    placeholder="Postal Code"
                    required
                  />
                </div>
                <Form.Input
                  type="text"
                  name="streetAdress"
                  placeholder="Street Adress"
                  required
                />
                <Form.Input
                  type="text"
                  name="country"
                  placeholder="Country"
                  required
                />
                <Form.Button
                  type="submit"
                  className="PrimarySmallBtnBlack w-full"
                >
                  Continue to payment
                </Form.Button>
              </div>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
}
