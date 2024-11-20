import client from "@/lib/db";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

// export async function POST(request: Request) {
//   const data = await request.json();
//   return Response.json({ message: "Product successfully added", data });
// }

// export async function POST(request: Request) {
//   try {
//     await client.connect();
//     const data = await request.json();
//     const newProduct = new Product(data);
//     await newProduct.save();
//     return Response.json({
//       message: "Product successfully added",
//       data: newProduct,
//     });
//   } catch (error) {
//     console.log("Error adding product:", error);
//     return Response.json(
//       { message: "Failed to add product", error },
//       { status: 500 }
//     );
//   }
// }

export async function GET(request: NextRequest) {
  try {
    await mongooseConnect();
    if (request.nextUrl.searchParams.get("id")) {
      const product = await Product.findOne({
        _id: request.nextUrl.searchParams.get("id"),
      });
      return NextResponse.json(product);
    }
    const products = await Product.find();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to find product", error },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await mongooseConnect();
    const { title, description, price, images } = await request.json();
    const productDoc = await Product.create({
      title,
      description,
      price,
      images,
    });
    return NextResponse.json(
      { message: "Product successfully added", data: productDoc },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to add product", error },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await mongooseConnect();
    const { title, description, price, images, _id } = await request.json();
    const productDoc = await Product.updateOne(
      { _id },
      { title, description, price, images }
    );
    return NextResponse.json(
      { message: "Product successfully updated", data: productDoc },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update product", error },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    if (request.nextUrl.searchParams.get("id")) {
      await Product.deleteOne({ _id: request.nextUrl.searchParams.get("id") });
      return NextResponse.json(
        { message: "Product successfully deleted" },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { message: "Failed to delete product" },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete product", error },
      { status: 500 }
    );
  }
}
