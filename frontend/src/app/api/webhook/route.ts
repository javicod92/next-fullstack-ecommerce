import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { NextRequest, NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SK);
const endpointSecret = process.env.STRIPE_ESK;

export async function POST(request: NextRequest) {
  try {
    await mongooseConnect();

    const signature = request.headers.get("stripe-signature");
    if (!signature) {
      console.error("Stripe signature missing");
      return NextResponse.json({ error: "Signature missing" }, { status: 400 });
    }

    let event;

    try {
      const body = await request.text();

      event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
    } catch (err: any) {
      console.log(`Webhook signature verification failed.`, err.message);
      return NextResponse.json(
        { error: "Webhook signature verification failed" },
        { status: 400 }
      );
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const data = event.data.object;
        const orderId = data.metadata.orderId;
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
    return NextResponse.json(
      { message: "Error in obtaining data", error },
      { status: 500 }
    );
  }
}
