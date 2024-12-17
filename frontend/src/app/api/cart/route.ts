import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { ids } = await request.json();

  await mongooseConnect();
  const products = await Product.find({ _id: { $in: ids } });

  return NextResponse.json(products);
}
