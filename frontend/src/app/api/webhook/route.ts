import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SK as string, {
  apiVersion: "2024-12-18.acacia",
});
const endpointSecret = process.env.STRIPE_ESK as string;

export async function POST(request: NextRequest) {
  try {
    await mongooseConnect();

    const signature = request.headers.get("stripe-signature");
    if (!signature) {
      console.error("Stripe signature missing");
      return NextResponse.json({ error: "Signature missing" }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
      const body = await request.text();
      event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      console.error("Webhook signature verification failed:", errorMessage);
      return NextResponse.json(
        { error: "Webhook signature verification failed" },
        { status: 400 }
      );
    }

    switch (event.type) {
      case "checkout.session.completed":
        const data = event.data.object as Stripe.Checkout.Session;
        const orderId = data.metadata?.orderId;
        const paid = data.payment_status === "paid";

        if (orderId && paid) {
          await Order.findByIdAndUpdate(orderId, {
            paid: true,
          });
        }
        break;
      default:
        console.log(`Unhandled event type ${event.type}.`);
    }

    return NextResponse.json("ok", { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Error in POST handler:", errorMessage);
    return NextResponse.json(
      { message: "Error in obtaining data", error: errorMessage },
      { status: 500 }
    );
  }
}
