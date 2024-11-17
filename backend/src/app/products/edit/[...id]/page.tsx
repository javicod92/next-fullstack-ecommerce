"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function EditProductPage() {
  const router = useParams();
  const { id } = router;

  useEffect(() => {
    if (!id) return;

    axios.get("/api/products?id=" + id).then((response) => {
      console.log(response.data);
    });
  }, [id]);

  return <div className="">Edit Product form here</div>;
}
