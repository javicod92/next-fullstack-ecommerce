"use client";
import { FormEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function NewProduct() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = { title, description, price };
    try {
      await axios.post("/api/products", data);
      router.push("/products");
    } catch (error) {}
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>New Product</h1>
      <fieldset className="border">
        <legend>
          Product Name{" "}
          <span className="text-orange-800 font-medium text-lg">(*)</span>
        </legend>
        <input
          type="text"
          placeholder="Product Name (Required)"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
          required
        />
      </fieldset>
      <fieldset>
        <legend>
          Description{" "}
          <span className="text-orange-800 font-medium text-lg">(*)</span>
        </legend>
        <textarea
          placeholder="Description (Required)"
          className="h-[200px] resize-none"
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
          required
        ></textarea>
      </fieldset>
      <fieldset>
        <legend>
          Price $(USD){" "}
          <span className="text-orange-800 font-medium text-lg">(*)</span>
        </legend>
        <input
          type="number"
          step={"0.01"}
          min={0}
          placeholder="Price in $USD (Required)"
          value={price}
          onChange={(e) => setPrice(e.currentTarget.value)}
          required
        />
      </fieldset>
      <div>
        <p>IMPORTANT: Text fields marked with (*) must be filled in</p>
      </div>
      <button
        className={`${
          title && description && price ? "btn-primary" : "btn-disabled"
        } `}
        disabled={!(title && description && price)}
      >
        Save Changes
      </button>
    </form>
  );
}

/* TODO: Improve component by using Compound Component */
