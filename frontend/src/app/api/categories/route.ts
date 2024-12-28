import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await mongooseConnect();

    // Obtener todas las categorías con su estructura de padres
    const categories = await Category.find();
    const categoryParentMap = categories.reduce((map, category) => {
      // Buscar la raíz de la jerarquía (categoría padre más alta)
      let currentCategory = category;
      while (currentCategory.parent) {
        currentCategory = categories.find(
          (cat) => cat._id.toString() === currentCategory.parent.toString()
        );
      }
      map[category._id.toString()] = currentCategory._id.toString();
      return map;
    }, {});

    // Obtener todos los productos
    const products = await Product.find();

    // Agrupar productos por la categoría raíz
    const groupedProducts = products.reduce((acc, product) => {
      const parentCategoryId = categoryParentMap[product.category]; // Categoría raíz
      if (!acc[parentCategoryId]) acc[parentCategoryId] = [];
      acc[parentCategoryId].push(product); // Agregar producto a la categoría raíz
      return acc;
    }, {});

    // Preparar resultado final con nombres de las categorías padres
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
