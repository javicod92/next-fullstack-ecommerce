import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SK);

export function GET() {
  return NextResponse.json(
    { message: "GET method is not authorized" },
    { status: 400 }
  );
}

export async function POST(request: NextRequest) {
  try {
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
            currency: "usd",
            product_data: { name: productInfo.title },
            unit_amount: quantity * productInfo.price * 100,
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

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      customer_email: email,
      success_url: process.env.PUBLIC_URL + "/cart?success=1",
      cancel_url: process.env.PUBLIC_URL + "/cart?canceled=1",
      metadata: { orderId: orderDoc._id.toString() },
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error in posting data" },
      { status: 500 }
    );
  }
}
