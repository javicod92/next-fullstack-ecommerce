"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type ProductsType = {
  _id?: string;
  title?: string;
  description?: string;
  price?: string;
  images?: string;
};

export default function NewProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images,
}: ProductsType) {
  const [title, setTitle] = useState<string>(existingTitle || "");
  const [description, setDescription] = useState<string>(
    existingDescription || ""
  );
  const [price, setPrice] = useState<string>(existingPrice || "");
  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = { title, description, price };
    try {
      if (_id) {
        // Update Product
        await axios.put("/api/products", { ...data, _id });
      } else {
        // Create Product
        await axios.post("/api/products", data);
      }
      router.push("/products");
    } catch (error) {}
  }

  async function uploadImages(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files && files.length > 0) {
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      const response = await axios.post("/api/upload", data);
      console.log(response.data);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
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
          aria-label="Product Title"
        />
      </fieldset>
      <fieldset>
        <legend>Photos</legend>
        <div className="mb-2">
          <label className="w-24 h-24 cursor-pointer bg-zinc-200 flex  items-center justify-center gap-1 text-sm text-zinc-800 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
              />
            </svg>
            <div>Upload</div>
            <input
              type="file"
              className="hidden"
              onChange={uploadImages}
              aria-label="Product Images"
            />
          </label>
        </div>
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
          aria-label="Product Description"
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
          aria-label="Product Price"
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
