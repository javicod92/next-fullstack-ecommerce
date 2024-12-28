"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function Categories() {
  const [categories, setCategories] = useState<Array<Record<string, string>>>(
    []
  );

  // Obtaining all categories whith their respective products
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get("/api/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error in obtaining categories:", error);
      }
    }

    fetchCategories();
  }, []);

  console.log(categories);

  return (
    <div className="flex justify-center">
      <div className="Center">
        <h1 className="font-semibold">Categories</h1>
      </div>
    </div>
  );
}
