"use client";

import NewProductsForm from "@/components/NewProductsForm";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type ProductsType = {
  _id: string;
  title: string;
  description: string;
  price: string;
};

export default function EditProductPage() {
  const [productInfo, setProductInfo] = useState<ProductsType | null>(null);
  const router = useParams();
  const { id } = router;

  useEffect(() => {
    axios.get("/api/products?id=" + id).then((response) => {
      setProductInfo(response.data);
    });
  }, [id]);

  return (
    <div className="">
      <h1>Edit Product</h1>
      {productInfo && <NewProductsForm {...productInfo} />}
    </div>
  );
}
