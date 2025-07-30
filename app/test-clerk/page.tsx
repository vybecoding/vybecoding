'use client';

import { useUser, useAuth } from "@clerk/nextjs";

export default function TestClerkPage() {
  const { user, isLoaded: userLoaded } = useUser();
  const { isSignedIn, isLoaded: authLoaded } = useAuth();

  if (!userLoaded || !authLoaded) {
    return <div className="p-8 text-white">Loading Clerk...</div>;
  }

  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl mb-4">Clerk Test Page</h1>
      
      <div className="space-y-2">
        <p>Clerk Loaded: ✅</p>
        <p>Auth Status: {isSignedIn ? '✅ Signed In' : '❌ Not Signed In'}</p>
        {user && (
          <>
            <p>User ID: {user.id}</p>
            <p>Email: {user.primaryEmailAddress?.emailAddress}</p>
          </>
        )}
      </div>
      
      <div className="mt-8 space-x-4">
        <a href="/sign-in" className="px-4 py-2 bg-purple-600 text-white rounded">
          Go to Sign In
        </a>
        <a href="/sign-up" className="px-4 py-2 bg-purple-600 text-white rounded">
          Go to Sign Up
        </a>
      </div>
    </div>
  );
}