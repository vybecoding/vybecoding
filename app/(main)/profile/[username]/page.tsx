"use client";

import React from "react";
import { useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { Container } from "@/components/ui/layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UserX, Lock, ArrowLeft } from "lucide-react";
import { ProfileInfoTab } from "@/components/profile/ProfileInfoTab";
import { ProfileBookingTab } from "@/components/profile/ProfileBookingTab";

interface ProfilePageProps {
  params: Promise<{ username: string }>;
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const { user: currentUser } = useUser();
  const router = useRouter();
  const [username, setUsername] = React.useState<string | null>(null);
  const [activeTab, setActiveTab] = React.useState<"info" | "booking">("info");

  // Parse username from params (async in Next.js 15)
  React.useEffect(() => {
    params.then(resolvedParams => {
      setUsername(resolvedParams.username);
    });
  }, [params]);
  
  // Fetch the profile data by username
  const profileUser = useQuery(api.users.getUserByUsername, 
    username ? { username } : "skip"
  );

  // Check if this is the current user's own profile
  const isOwnProfile = currentUser && profileUser && currentUser.id === profileUser.clerkId;

  // Loading state
  if (!username || profileUser === undefined) {
    return (
      <div className="page-container nebula-background">
        <div className="nebula-middle"></div>
        <div className="nebula-bottom"></div>
        <div className="max-w-7xl mx-auto px-6 h-full flex flex-col relative z-10">
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
              </div>
            </div>
          </Container>
        </div>
      </div>
    );
  }

  // Profile not found or private
  if (profileUser === null) {
    return (
      <div className="page-container nebula-background">
        <div className="nebula-middle"></div>
        <div className="nebula-bottom"></div>
        <div className="max-w-7xl mx-auto px-6 h-full flex flex-col relative z-10">
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
        </div>
      </div>
    );
  }

  // Check if profile is members-only and user is not authenticated
  if (profileUser.profileVisibility === "members-only" && !currentUser) {
    return (
      <div className="page-container nebula-background">
        <div className="nebula-middle"></div>
        <div className="nebula-bottom"></div>
        <div className="max-w-7xl mx-auto px-6 h-full flex flex-col relative z-10">
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
        </div>
      </div>
    );
  }

  return (
    <div className="page-container nebula-background">
      <div className="nebula-middle"></div>
      <div className="nebula-bottom"></div>
      <div className="max-w-7xl mx-auto px-6 h-full flex flex-col relative z-10">
        {/* Profile Tabs Navigation */}
        <div className="flex gap-4 border-b border-vybe-gray-800 mb-6 justify-center">
          <button 
            onClick={() => setActiveTab('info')} 
            className={`profile-tab px-6 py-3 text-white font-medium rounded-lg transition-all hover:bg-vybe-gray-800 ${
              activeTab === 'info' ? 'active bg-vybe-gray-800' : ''
            }`}
          >
            Profile Info
          </button>
          <button 
            onClick={() => setActiveTab('booking')} 
            className={`profile-tab px-6 py-3 text-white font-medium rounded-lg transition-all hover:bg-vybe-gray-800 ${
              activeTab === 'booking' ? 'active bg-vybe-gray-800' : ''
            }`}
          >
            Book Session
          </button>
        </div>
        
        {/* Content for tabs */}
        <div className="profile-tab-contents flex-1">
          {activeTab === 'info' && (
            <ProfileInfoTab 
              user={profileUser}
              isOwnProfile={!!isOwnProfile}
            />
          )}
          {activeTab === 'booking' && (
            <ProfileBookingTab 
              user={profileUser}
            />
          )}
        </div>
      </div>
    </div>
  );
}