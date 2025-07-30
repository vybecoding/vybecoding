"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { AppSubmissionForm } from "@/components/apps/AppSubmissionForm";
import { ArrowLeft } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";

export default function AppSubmitPage() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get app ID from query params if editing
  const appId = searchParams.get("id") as Id<"apps"> | null;
  const appIdOrUndefined = appId || undefined;

  // Redirect to sign in if not authenticated
  React.useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in?redirect=/apps/submit");
    }
  }, [isLoaded, isSignedIn, router]);

  // Show loading while checking auth
  if (!isLoaded || !isSignedIn) {
    return (
      <div className="page-container nebula-background min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-6">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container nebula-background min-h-screen">
      {/* Nebula backgrounds */}
      <div className="nebula-middle"></div>
      <div className="nebula-bottom"></div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="btn btn-secondary mb-4 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          
          <h1 className="text-4xl font-light mb-4">
            <span className="gradient-text">
              {appIdOrUndefined ? "Edit App" : "Submit Your App"}
            </span>
          </h1>
          <p className="text-vybe-gray-300 text-xl max-w-3xl leading-relaxed">
            Share your creation with the VybeCoding community
          </p>
        </div>

        {/* Submission Form */}
        <AppSubmissionForm appId={appIdOrUndefined} />
      </div>
    </div>
  );
}