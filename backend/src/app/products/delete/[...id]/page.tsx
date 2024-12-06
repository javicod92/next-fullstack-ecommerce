"use client";

import NotificationContext from "@/context/NotificationContext";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

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
  const { showNotification } = useContext(NotificationContext);

  useEffect(() => {
    axios.get("/api/products?id=" + id).then((response) => {
      setProductInfo(response.data);
    });
  }, [id]);

  function goBack() {
    router.push("/products");
  }

  async function deleteProduct() {
    try {
      await axios.delete("/api/products?id=" + id);
      goBack();
      showNotification({
        open: true,
        status: "success",
        msj: "Product successfully deleted",
      });
    } catch {
      showNotification({
        open: true,
        status: "error",
        msj: "Error in deleting the product",
      });
    }
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
