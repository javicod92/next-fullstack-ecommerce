import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await mongooseConnect();

    // Obtaining all categories with their parent structure
    const categories = await Category.find();
    const categoryParentMap = categories.reduce((map, category) => {
      // Searching for the highest category
      let currentCategory = category;
      while (currentCategory.parent) {
        currentCategory = categories.find(
          (cat) => cat._id.toString() === currentCategory.parent.toString()
        );
      }
      map[category._id.toString()] = currentCategory._id.toString();
      return map;
    }, {});

    // Obtaining all products
    const products = await Product.find();

    // Agrupar productos por la categoría raíz
    const groupedProducts = products.reduce((acc, product) => {
      const parentCategoryId = categoryParentMap[product.category]; // Root category
      if (!acc[parentCategoryId]) acc[parentCategoryId] = [];
      acc[parentCategoryId].push(product); // Add product to root category
      return acc;
    }, {});

    // Prepare final results with parent category names
    const result = await Promise.all(
      Object.entries(groupedProducts).map(async ([parentId, products]) => {
        const parentCategory = await Category.findById(parentId).select("name");
        return {
          category: parentCategory?.name || "No Category Name", // Nombre de la categoría raíz
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
