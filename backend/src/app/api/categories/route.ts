import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await mongooseConnect();
    return NextResponse.json(await Category.find().populate("parent"), {
      status: 200,
    });
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
    const { name, parentCategory, properties } = await request.json();
    const categoryData: {
      name: string;
      parent?: string;
      properties?: Array<Record<string, string>>;
    } = {
      name,
      parent: parentCategory || undefined,
      properties: properties || undefined,
    };

    const categoryDoc = await Category.create(categoryData);
    return NextResponse.json(categoryDoc, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error saving changes", error },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await mongooseConnect();
    const { name, parentCategory, properties, _id } = await request.json();

    const updateData: {
      name: string;
      parent?: string;
      properties?: Array<Record<string, string>>;
    } = {
      name,
      parent: parentCategory || undefined,
      properties: properties || undefined,
    };

    const categoryDoc = await Category.updateOne({ _id }, updateData);
    return NextResponse.json(categoryDoc, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error saving changes", error },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const _id = searchParams.get("_id");

    if (!_id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    await mongooseConnect();
    await Category.deleteOne({ _id });
    return NextResponse.json(
      { message: "Category successfully deleted" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting a category", error },
      { status: 500 }
    );
  }
}
