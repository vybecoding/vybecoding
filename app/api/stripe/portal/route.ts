import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // TODO: Get stripe customer ID from Convex
    // For now, we'll need to implement this after connecting Convex
    
    const { stripeCustomerId } = await req.json();

    if (!stripeCustomerId) {
      return new NextResponse("No Stripe customer found", { status: 400 });
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("[STRIPE_PORTAL_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}