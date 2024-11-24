"use client";

import Popup from "@/components/PopUp";
import axios from "axios";
import { useEffect, useState } from "react";

type CategoriesProps = {
  _id: string;
  name: string;
  parent?: { name: string; _id: string };
};

type PropertiesProps = {
  name: string;
  values: string;
};

export default function CategoriesPage() {
  const [editedCategory, setEditedCategory] = useState<CategoriesProps | null>(
    null
  );
  const [categoryToDelete, setCategoryToDelete] =
    useState<CategoriesProps | null>(null);
  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState<string | undefined>("");
  const [categories, setCategories] = useState<Array<CategoriesProps>>([]);
  const [properties, setProperties] = useState<Array<PropertiesProps>>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  }

  async function saveCategory(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = { name, parentCategory };
    if (editedCategory) {
      await axios.put("/api/categories", { ...data, _id: editedCategory._id });
      setEditedCategory(null);
    } else {
      await axios.post("/api/categories", data);
    }
    setName("");
    fetchCategories();
  }

  function editCategory(category: CategoriesProps) {
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id);
  }

  function deleteCategory(category: CategoriesProps) {
    setCategoryToDelete(category);
  }

  async function confirmDelete() {
    if (categoryToDelete) {
      await axios.delete("/api/categories/?_id=" + categoryToDelete._id);
      setCategoryToDelete(null);
      fetchCategories();
    }
  }

  function addProperty() {
    setProperties((prev) => {
      return [...prev, { name: "", values: "" }];
    });
  }

  function handlePropertyNameChange(
    index: number,
    property: PropertiesProps,
    newName: string
  ) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  }

  function handlePropertyValueChange(
    index: number,
    property: PropertiesProps,
    newValues: string
  ) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].values = newValues;
      return properties;
    });
  }

  function removeProperty(indexToRemove: number) {
    setProperties((prev) => {
      return [...prev].filter((_, index) => {
        return index !== indexToRemove;
      });
    });
  }

  return (
    <div>
      <h1>Categories</h1>
      <form onSubmit={saveCategory}>
        <div>
          <fieldset className="m-0">
            <legend>
              {editedCategory
                ? `Edit category (${editedCategory?.name})`
                : "New category name"}
            </legend>
            <input
              type="text"
              placeholder="Category name"
              aria-label="category name"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />
          </fieldset>
          <select
            className="mt-1 py-2"
            value={parentCategory}
            onChange={(e) => setParentCategory(e.target.value)}
          >
            <option value="">No parent category</option>
            {categories &&
              categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        <fieldset className="mt-4">
          <legend className="block">Properties</legend>
          {properties &&
            properties.map((property, index) => (
              <div key={index} className="flex gap-1 mb-1">
                <div className="grow border flex px-2 rounded-lg">
                  <input
                    type="text"
                    placeholder="Property Name (example: color)"
                    value={property.name}
                    onChange={(e) =>
                      handlePropertyNameChange(index, property, e.target.value)
                    }
                  />
                </div>
                <div className="grow border flex px-2 rounded-lg">
                  <input
                    type="text"
                    placeholder="Values, comma separated"
                    value={property.values}
                    onChange={(e) =>
                      handlePropertyValueChange(index, property, e.target.value)
                    }
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeProperty(index)}
                  className="delete p-2 px-4 text-white rounded-lg"
                >
                  Remove
                </button>
              </div>
            ))}
          <button
            onClick={addProperty}
            type="button"
            className="btn-default text-sm mb-2"
          >
            Add new property
          </button>
        </fieldset>
        <button type="submit" className="btn-primary">
          Save
        </button>
      </form>
      <table className="basic mt-4">
        <thead>
          <tr>
            <td>Category Name</td>
            <td>Parent Category</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {categories &&
            categories.map((category) => (
              <tr key={category._id}>
                <td>{category.name}</td>
                <td>{category?.parent?.name}</td>
                <td>
                  <div className="flex gap-1 flex-wrap">
                    <button
                      onClick={() => editCategory(category)}
                      className="flex gap-1 edit p-1 text-sm items-center px-2 rounded-lg text-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => deleteCategory(category)}
                      className="flex gap-1 items-center text-sm delete p-1 px-2 rounded-lg text-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {categoryToDelete && (
        <Popup
          title="Delete Category"
          message={`Are you sure you want to delete "${categoryToDelete.name}"?`}
          onConfirm={confirmDelete}
          onCancel={() => setCategoryToDelete(null)}
        />
      )}
    </div>
  );
}
