import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await mongooseConnect();
    return NextResponse.json(await Order.find().sort({ createdAt: -1 }), {
      status: 200,
    });
  } catch (error) {
    NextResponse.json(
      { message: "Error in obtaining orders", error },
      { status: 500 }
    );
  }
}
