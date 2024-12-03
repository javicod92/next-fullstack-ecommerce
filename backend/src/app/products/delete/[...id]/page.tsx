"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type ProductsType = {
  _id: string;
  title: string;
  description: string;
  price: string;
};

export default function DeleteProductPage() {
  const router = useRouter();
  const [productInfo, setProductInfo] = useState<ProductsType | null>(null);
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    axios.get("/api/products?id=" + id).then((response) => {
      setProductInfo(response.data);
    });
  }, [id]);

  function goBack() {
    router.push("/products");
  }

  async function deleteProduct() {
    await axios.delete("/api/products?id=" + id);
    goBack();
  }

  return (
    <div className="flex flex-col items-center">
      <h1>Do you really want to delete product {productInfo?.title}?</h1>
      <div className="flex gap-2">
        <button className="btn-red" onClick={deleteProduct}>
          Yes
        </button>
        <button className="btn-default" onClick={goBack}>
          No
        </button>
      </div>
    </div>
  );
}
