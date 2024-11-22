"use client";

import { useState } from "react";

export default function CategoriesPage() {
  const [name, setName] = useState("");

  function saveCategory(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
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
        <button type="submit" className="btn-primary">
          Save
        </button>
      </form>
    </div>
  );
}
