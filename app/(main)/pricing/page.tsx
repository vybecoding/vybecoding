"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "$0",
    priceId: null,
    features: [
      "Basic AI assistance",
      "5 projects",
      "Community support",
      "Public showcases only",
    ],
  },
  {
    name: "Pro",
    price: "$29",
    priceId: "price_1234567890", // Replace with your actual Stripe price ID
    features: [
      "Advanced AI features",
      "Unlimited projects",
      "Priority support",
      "Private repositories",
      "Custom domains",
      "Team collaboration",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    priceId: null,
    features: [
      "Everything in Pro",
      "Custom AI models",
      "Dedicated support",
      "SLA guarantees",
      "Advanced security",
      "Custom integrations",
    ],
  },
];

export default function PricingPage() {
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (priceId: string | null) => {
    if (!priceId) return;
    
    setLoading(priceId);
    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceId }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-xl text-gray-600">
            Start free and upgrade as you grow
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 flex flex-col"
            >
              <h2 className="text-2xl font-bold mb-4">{plan.name}</h2>
              <p className="text-4xl font-bold mb-6">
                {plan.price}
                {plan.price !== "Custom" && (
                  <span className="text-base font-normal">/month</span>
                )}
              </p>
              
              <ul className="mb-8 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="mb-2 flex items-start">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <SignedIn>
                {plan.priceId ? (
                  <button
                    onClick={() => handleSubscribe(plan.priceId)}
                    disabled={loading === plan.priceId}
                    className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                  >
                    {loading === plan.priceId ? "Loading..." : "Subscribe"}
                  </button>
                ) : plan.name === "Enterprise" ? (
                  <Link
                    href="/contact"
                    className="w-full py-3 px-6 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition text-center block"
                  >
                    Contact Sales
                  </Link>
                ) : (
                  <button
                    disabled
                    className="w-full py-3 px-6 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed"
                  >
                    Current Plan
                  </button>
                )}
              </SignedIn>
              
              <SignedOut>
                <Link
                  href="/sign-up"
                  className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-center block"
                >
                  Sign Up
                </Link>
              </SignedOut>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}