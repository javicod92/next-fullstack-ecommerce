"use client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "../Loader";
import axios from "axios";
// import Image from "next/image";

type ProductsType = {
  _id?: string;
  title?: string;
  description?: string;
  price?: string;
  images?: Array<string>;
  category?: string;
  properties?: Record<string, string>;
};

type CategoryTypes = {
  _id: string;
  name: string;
  properties?: Array<{ name: string; values: string[] }>;
  parent: {
    name: string;
    properties: Array<{ name: string; values: string[] }>;
    _id: string;
  };
};

export default function NewProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
  category: existingCategory,
  properties: existingProperties,
}: ProductsType) {
  const [title, setTitle] = useState<string>(existingTitle || "");
  const [description, setDescription] = useState<string>(
    existingDescription || ""
  );
  const [category, setCategory] = useState<string>(existingCategory || "");
  const [productProperties, setProductProperties] = useState<
    Record<string, string>
  >(existingProperties || {});
  const [price, setPrice] = useState<string>(existingPrice || "");
  const [images, setImages] = useState(existingImages || []);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();
  const [categories, setCategories] = useState<Array<CategoryTypes>>([]);

  useEffect(() => {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = {
      title,
      description,
      price,
      images,
      category,
      properties: productProperties,
    };
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
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      const response = await axios.post("/api/upload", data);
      setImages((currentImages) => {
        console.log([...currentImages, ...response.data.urls]);
        return [...currentImages, ...response.data.urls];
      });
      setIsUploading(false);
    }
  }

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    e.dataTransfer.setData("draggedIndex", index.toString());
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Necesario para permitir el drop
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    const draggedIndex = parseInt(e.dataTransfer.getData("draggedIndex"), 10);

    // Evitar que un elemento sea soltado en sí mismo
    if (draggedIndex === index) return;

    // Crear un nuevo array con los elementos reordenados
    const updatedImages = [...images];
    const [draggedItem] = updatedImages.splice(draggedIndex, 1); // Remueve el elemento arrastrado
    updatedImages.splice(index, 0, draggedItem); // Inserta en la nueva posición

    setImages(updatedImages); // Actualiza el estado
  };

  const propertiesToFill = [];
  if (categories && category) {
    let catInfo = categories.find(({ _id }) => _id === category);
    if (catInfo?.properties) {
      propertiesToFill.push(...catInfo.properties);
    }
    while (catInfo?.parent?._id) {
      const parentCat = categories.find(
        ({ _id }) => _id === catInfo?.parent?._id
      );
      if (parentCat?.properties) {
        propertiesToFill.push(...parentCat.properties);
      }
      catInfo = parentCat;
    }
  }

  function setProductProp(propName: string, value: string) {
    setProductProperties((prev) => {
      const newProductProps = { ...prev };
      newProductProps[propName] = value;
      return newProductProps;
    });
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
        <legend>Category</legend>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Uncategorized</option>
          {categories &&
            categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>
      </fieldset>
      <fieldset className="flex flex-col gap-2">
        <legend>Properties</legend>
        {propertiesToFill.length > 0 ? (
          propertiesToFill.map((property) => (
            <div key={property.name} className="flex gap-1">
              <div>{property.name}: </div>
              <select
                className="!border !border-solid rounded-md"
                value={productProperties[property.name]}
                onChange={(e) => setProductProp(property.name, e.target.value)}
              >
                {property.values.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          ))
        ) : (
          <h2>No category properties</h2>
        )}
      </fieldset>
      <fieldset>
        <legend>Photos</legend>
        <div className="mb-2 flex flex-wrap gap-1">
          {images &&
            images.map((url, index) => (
              <div
                key={url}
                className="h-24"
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
              >
                <img src={url} alt="" className="rounded-lg" />
              </div>
            ))}
          {isUploading && (
            <div className="h-24 min-w-24 flex items-center justify-center">
              <Loader />
            </div>
          )}
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
              multiple
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
