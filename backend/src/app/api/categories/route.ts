import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await mongooseConnect();
    return NextResponse.json(await Category.find(), { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error in obtaining data", error },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await mongooseConnect();
    const { name, parentCategory } = await request.json();
    const categoryDoc = await Category.create({ name, parent: parentCategory });
    return NextResponse.json(categoryDoc, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error saving changes", error },
      { status: 500 }
    );
  }
}
