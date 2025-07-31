"use client";

import React, { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { ProfileEdit, ProfileView } from "@/components/profile";
import { Container } from "@/components/ui/layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Eye, Edit, User } from "lucide-react";

export default function ProfileEditPage() {
  const { user: clerkUser, isLoaded } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch current user profile
  const userProfile = useQuery(
    api.users.getUserProfile,
    clerkUser?.id ? { clerkId: clerkUser.id } : "skip"
  );

  // Mutation for updating profile
  const updateProfile = useMutation(api.users.updateUserProfile);

  // Redirect if not authenticated
  if (isLoaded && !clerkUser) {
    router.push("/sign-in");
    return null;
  }

  // Loading state
  if (!isLoaded || userProfile === undefined) {
    return (
      <Container className="py-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <Card className="p-6">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-6"></div>
              <div className="space-y-4">
                <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    );
  }

  // Handle case where user profile doesn't exist yet
  if (!userProfile) {
    toast({
      title: "Profile not found",
      description: "Unable to load your profile. Please try again.",
      variant: "destructive"
    });
    router.push("/dashboard");
    return null;
  }

  const handleSaveProfile = async (profileData: Partial<typeof userProfile>) => {
    if (!clerkUser?.id) return;

    setIsSaving(true);
    try {
      await updateProfile({
        clerkId: clerkUser.id,
        ...profileData
      });

      toast({
        title: "Profile updated successfully",
        description: "Your changes have been saved."
      });

      // Redirect to profile view using username
      const updatedUsername = profileData.username || userProfile.username;
      if (updatedUsername) {
        router.push(`/profile/${updatedUsername}`);
      } else {
        router.push('/dashboard/profile');
      }
    } catch (error) {
      console.error("Profile update error:", error);
      toast({
        title: "Failed to update profile",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  const handlePreviewToggle = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  return (
    <Container className="py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => router.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                Edit Profile
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Update your profile information and settings
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreviewToggle}
              className="flex items-center gap-2"
            >
              {isPreviewMode ? (
                <>
                  <Edit className="w-4 h-4" />
                  Edit
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" />
                  Preview
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Profile Completion Progress */}
        {!userProfile.isProfileComplete && (
          <Card className="p-4 mb-6 border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <div className="flex-1">
                <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                  Complete your profile to get discovered
                </p>
                <p className="text-xs text-amber-700 dark:text-amber-300">
                  Add a display name, bio, and skills to complete your profile
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Main Content */}
        <Tabs value={isPreviewMode ? "preview" : "edit"} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger 
              value="edit" 
              onClick={() => setIsPreviewMode(false)}
              className="flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              Edit Profile
            </TabsTrigger>
            <TabsTrigger 
              value="preview" 
              onClick={() => setIsPreviewMode(true)}
              className="flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              Preview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="edit" className="space-y-6">
            <ProfileEdit
              user={userProfile}
              onSave={handleSaveProfile}
              onCancel={handleCancel}
              isLoading={isSaving}
            />
          </TabsContent>

          <TabsContent value="preview" className="space-y-6">
            <div className="border rounded-lg p-1 bg-gray-50 dark:bg-gray-900">
              <div className="bg-white dark:bg-gray-800 rounded-md">
                <ProfileView
                  user={userProfile}
                  isOwnProfile={true}
                  onEditProfile={() => setIsPreviewMode(false)}
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                onClick={() => setIsPreviewMode(false)}
                className="flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Continue Editing
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Container>
  );
}