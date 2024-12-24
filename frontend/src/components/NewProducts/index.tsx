"use client";

import { motion } from "framer-motion";
import ProductBox from "../ProductBox";

type ProductsType = {
  products: Array<Record<string, string>>;
  title?: string;
  titleStyles?: string | "black";
};

export default function NewProducts({
  products,
  title,
  titleStyles,
}: ProductsType) {
  return (
    <div className="flex justify-center">
      <div className="Center">
        <h2 className={titleStyles}>{title}</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-5 pt-5">
          {products?.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.25, delay: index * 0.025 }}
            >
              <ProductBox {...product} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
