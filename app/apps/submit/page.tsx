"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/layout";
import { AppSubmissionForm } from "@/components/apps/AppSubmissionForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";

export default function AppSubmitPage() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get app ID from query params if editing
  const appId = searchParams.get("id") as Id<"apps"> | null;

  // Redirect to sign in if not authenticated
  React.useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in?redirect=/apps/submit");
    }
  }, [isLoaded, isSignedIn, router]);

  // Show loading while checking auth
  if (!isLoaded || !isSignedIn) {
    return (
      <Container className="py-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center gap-2 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {appId ? "Edit App" : "Submit Your App"}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Share your creation with the VybeCoding community
          </p>
        </div>

        {/* Submission Form */}
        <AppSubmissionForm appId={appId} />
      </div>
    </Container>
  );
}