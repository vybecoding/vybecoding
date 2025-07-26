"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Home() {
  const greeting = useQuery(api.hello.get);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="absolute top-4 right-4">
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
      
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">vybecoding.ai</h1>
        <p className="text-xl mb-4">
          {greeting ?? "Loading..."}
        </p>
        <p className="text-gray-600 mb-8">
          AI-powered development platform
        </p>
        
        <div className="flex gap-4 justify-center">
          <SignedOut>
            <Link
              href="/sign-in"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
            >
              Sign Up
            </Link>
          </SignedOut>
          <SignedIn>
            <Link
              href="/dashboard"
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Go to Dashboard
            </Link>
          </SignedIn>
        </div>
      </div>
    </main>
  );
}