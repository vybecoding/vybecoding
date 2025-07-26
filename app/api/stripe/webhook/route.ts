import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      
      // TODO: Create user in Convex with Stripe customer ID
      console.log("Checkout completed:", session);
      break;
    }
    
    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      
      // TODO: Update subscription status in Convex
      console.log("Subscription updated:", subscription);
      break;
    }
    
    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      
      // TODO: Update subscription status to canceled in Convex
      console.log("Subscription deleted:", subscription);
      break;
    }
  }

  return new NextResponse(null, { status: 200 });
}