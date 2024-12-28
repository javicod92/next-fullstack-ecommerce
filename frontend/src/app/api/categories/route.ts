import { NextResponse } from "next/server";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";
import { mongooseConnect } from "@/lib/mongoose";

export async function GET() {
  try {
    await mongooseConnect();

    // Obtain all categories
    const categories = await Category.find();

    // Map each category to its parent category (or to itself if it has no parent)
    const categoryParentMap = categories.reduce((map, category) => {
      map[category._id] = category.parent || category._id; // if the category has no parent, the parent is the category itself
      return map;
    }, {});

    // Products grouped by parent category
    const products = await Product.find();
    const groupedProducts = products.reduce((acc, product) => {
      const parentCategoryId = categoryParentMap[product.category]; // Search parent category
      if (!acc[parentCategoryId]) acc[parentCategoryId] = [];
      acc[parentCategoryId].push(product); // Add product to parent category
      return acc;
    }, {});

    // Replacing parent category IDs with their names
    const result = await Promise.all(
      Object.entries(groupedProducts).map(async ([parentId, products]) => {
        const parentCategory = await Category.findById(parentId).select("name");
        return {
          category: parentCategory?.name || "No Category Name", // Parent category name
          products,
        };
      })
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error in obtain categories" },
      { status: 500 }
    );
  }
}
