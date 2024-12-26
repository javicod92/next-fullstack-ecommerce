import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SK as string, {
  apiVersion: "2024-12-18.acacia",
});

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

    const line_items = [];
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
            unit_amount: productInfo.price * 100, // Stripe expects the amount in cents
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
      success_url: `${process.env.PUBLIC_URL}/cart?success=1`,
      cancel_url: `${process.env.PUBLIC_URL}/cart?canceled=1`,
      metadata: { orderId: orderDoc._id.toString(), test: "ok" },
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in POST:", error);
      return NextResponse.json(
        { message: "Error in posting data", error: error.message },
        { status: 500 }
      );
    }
  }
}
