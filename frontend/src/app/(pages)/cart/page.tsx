"use client";

import Form from "@/components/Form";
import Successfully from "@/components/Successfully";
import { CartContext } from "@/context/CartContextProvider";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

type FormValues = Record<string, string>;

export default function CartPage() {
  const { cartProducts, clearCart, addProduct, removeProduct } =
    useContext(CartContext)!;
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

  useEffect(() => {
    if (isSuccessPage) {
      clearCart();
    }
  }, []);

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
    const price = parseFloat(
      Number(products.find((p) => p._id === productId)?.price || 0).toFixed(2)
    );
    total += price;
  }
  total = parseFloat(total.toFixed(2)); // Formatear el total a dos decimales

  if (isSuccessPage) {
    return <Successfully />;
  }

  return (
    <div className="flex justify-center">
      <div className="Center">
        <div className="flex flex-col md:grid md:grid-cols-[1.2fr,.8fr] gap-4 mt-10 ">
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
                  {products.map((product) => {
                    const quantity = cartProducts.filter(
                      (id) => id === product._id
                    ).length;
                    const price = parseFloat(product.price).toFixed(2);
                    const subtotal = parseFloat(
                      (quantity * parseFloat(price)).toFixed(2)
                    );

                    return (
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
                          <div className="text-nowrap w-max border rounded-lg overflow-hidden">
                            <button
                              className="DefaultSmallBtn"
                              onClick={() => lessOfThisProduct(product._id)}
                            >
                              -
                            </button>
                            <span className="px-2">{quantity}</span>
                            <button
                              className="DefaultSmallBtn"
                              onClick={() => moreOfThisProduct(product._id)}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td>${subtotal}</td>
                      </tr>
                    );
                  })}
                  <tr>
                    <td>TOTAL</td>
                    <td></td>
                    <td>${total.toFixed(2)}</td>
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
