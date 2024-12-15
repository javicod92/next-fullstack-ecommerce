import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await mongooseConnect();

  const { ids } = await request.json();
  const products = await Product.find({ _id: { $in: ids } });

  return NextResponse.json(products);
}
