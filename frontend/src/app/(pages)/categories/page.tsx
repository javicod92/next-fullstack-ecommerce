"use client";

import ProductBox from "@/components/ProductBox";
import axios from "axios";
import { useEffect, useState } from "react";
import style from "./Categories.module.css";
import { motion } from "motion/react";

type CategoriesProps = {
  category: string;
  products: Array<Record<string, string>>;
};

export default function Categories() {
  const [categories, setCategories] = useState<Array<CategoriesProps>>([]);

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

  return (
    <div className="flex justify-center">
      <div className="Center mt-5 max-w-[1200px] w-full">
        <h1 className="font-semibold">Categories</h1>
        <div className="flex flex-col gap-5 mt-5">
          {categories.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.25, delay: index * 0.025 }}
            >
              <div
                className="p-5 bg-white shadow-md rounded-md"
                key={category.category}
              >
                <div className="border-b pb-2">
                  <h2 className="font-semibold text-blue-800">
                    {category.category}
                  </h2>
                </div>
                {/* Contenedor con scroll horizontal */}
                <div
                  className={`${style.scroll_container} flex gap-5 overflow-x-auto whitespace-nowrap p-2 mt-5`}
                >
                  {category.products.map((product, index) => (
                    <div className="w-full max-w-[175px] shrink-0" key={index}>
                      <ProductBox {...product} />
                    </div>
                  ))}
                </div>
                <div className="bg-zinc-200 p-2 rounded-md mt-5 font-semibold transition-colors hover:bg-black hover:text-white">
                  <button className="w-full">View All</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
