import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { name, email, city, postalCode, streetAdress, country, products } =
    await request.json();

  const uniqueIds = [...new Set(products)];

  await mongooseConnect();
  const productsInfo = await Product.find({ _id: { $in: uniqueIds } });

  let line_items = [];
  for (const productId of uniqueIds) {
    const productInfo = productsInfo.find(
      (p) => p._id.toString() === productId
    );
    const quantity =
      products.filter((id: string) => id === productId)?.length || 0;
    if (quantity > 0 && productInfo) {
      line_items.push({
        quantity,
        price_data: {
          currency: "USD",
          product_data: { name: productInfo.title },
          unit_amount: quantity * productInfo.price,
        },
      });
    }
  }

  const orderDoc = await Order.create({
    line_items,
    name,
    email,
    city,
    postalCode,
    streetAdress,
    country,
    paid: false,
  });

  return NextResponse.json(orderDoc, { status: 200 });
}
