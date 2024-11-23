"use client";

import axios from "axios";
import { useEffect, useState } from "react";

type CategoriesProps = {
  _id: string;
  name: string;
};

export default function CategoriesPage() {
  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [categories, setCategories] = useState<Array<CategoriesProps>>([]);

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
    await axios.post("/api/categories", { name, parentCategory });
    setName("");
    fetchCategories();
  }

  return (
    <div>
      <h1>Categories</h1>
      <form onSubmit={saveCategory}>
        <fieldset className="m-0">
          <legend>New category name</legend>
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
        <button type="submit" className="btn-primary">
          Save
        </button>
      </form>
      <table className="basic mt-4">
        <thead>
          <tr>
            <td>Category Name</td>
          </tr>
        </thead>
        <tbody>
          {categories &&
            categories.map((category) => (
              <tr key={category._id}>
                <td>{category.name}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
