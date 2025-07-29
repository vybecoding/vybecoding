"use client";

import React from "react";
import { useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { ProfileView, ProfileActivityFeed, ProfileApps } from "@/components/profile";
import { Container } from "@/components/ui/layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UserX, Lock, ArrowLeft } from "lucide-react";

interface ProfilePageProps {
  params: Promise<{ userId: string }>;
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const { user: currentUser } = useUser();
  const router = useRouter();
  const [userId, setUserId] = React.useState<Id<"users"> | null>(null);

  // Parse userId from params (async in Next.js 15)
  React.useEffect(() => {
    params.then(resolvedParams => {
      setUserId(resolvedParams.userId as Id<"users">);
    });
  }, [params]);
  
  // Fetch the profile data
  const profileUser = useQuery(api.users.getUserPublicProfile, 
    userId ? { userId } : "skip"
  );

  // Check if this is the current user's own profile
  const isOwnProfile = currentUser && profileUser && currentUser.id === profileUser.clerkId;

  // Loading state
  if (!userId || profileUser === undefined) {
    return (
      <Container className="py-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            {/* Header skeleton */}
            <Card className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                <div className="flex-1 space-y-4">
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
              </div>
            </Card>
            
            {/* Stats skeleton */}
            <Card className="p-6">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </Container>
    );
  }

  // Profile not found or private
  if (profileUser === null) {
    return (
      <Container className="py-8">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="p-8">
            <div className="mb-4">
              <UserX className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Profile Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              This profile doesn't exist or is set to private.
            </p>
            <div className="flex gap-3 justify-center">
              <Button 
                variant="outline" 
                onClick={() => router.back()}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </Button>
              <Button onClick={() => router.push("/")}>
                Go Home
              </Button>
            </div>
          </Card>
        </div>
      </Container>
    );
  }

  // Check if profile is members-only and user is not authenticated
  if (profileUser.profileVisibility === "members-only" && !currentUser) {
    return (
      <Container className="py-8">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="p-8">
            <div className="mb-4">
              <Lock className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Members Only Profile
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              This profile is only visible to registered members. Please sign in to view it.
            </p>
            <div className="flex gap-3 justify-center">
              <Button 
                variant="outline" 
                onClick={() => router.back()}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </Button>
              <Button onClick={() => router.push("/sign-in")}>
                Sign In
              </Button>
            </div>
          </Card>
        </div>
      </Container>
    );
  }

  const handleEditProfile = () => {
    router.push("/profile/edit");
  };

  return (
    <Container className="py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => router.back()}
          className="flex items-center gap-2 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        {/* Profile View */}
        <ProfileView 
          user={profileUser}
          isOwnProfile={!!isOwnProfile}
          onEditProfile={handleEditProfile}
        />

        {/* Apps Section */}
        <ProfileApps 
          userId={profileUser._id}
          isOwnProfile={!!isOwnProfile}
        />

        {/* Activity Feed */}
        <ProfileActivityFeed userId={profileUser._id} />
      </div>
    </Container>
  );
}

// Note: Metadata generation would be handled by a server component wrapper
// For now, using basic metadata in layout.tsx