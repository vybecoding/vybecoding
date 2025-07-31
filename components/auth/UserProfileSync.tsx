"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function UserProfileSync() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  
  // Query to check if user exists
  const existingUser = useQuery(
    api.users.getUser,
    user?.id ? { clerkId: user.id } : "skip"
  );
  
  // Mutation to create user
  const createUser = useMutation(api.users.createUser);
  
  useEffect(() => {
    async function syncUser() {
      // Only proceed if Clerk is loaded and we have a user
      if (!isLoaded || !user) return;
      
      // If we haven't checked yet, wait
      if (existingUser === undefined) return;
      
      // If user doesn't exist in Convex, create them
      if (existingUser === null) {
        try {
          await createUser({
            clerkId: user.id,
            email: user.emailAddresses[0]?.emailAddress || "",
            firstName: user.firstName || undefined,
            lastName: user.lastName || undefined,
          });
          
          // Show welcome message for new users
          toast.success("Welcome to VybeCoding! Complete your profile to get started.");
          
          // Redirect to profile edit page for new users
          setTimeout(() => {
            router.push("/profile/edit");
          }, 2000);
        } catch (error) {
          console.error("Error creating user profile:", error);
          toast.error("Failed to create profile. Please try again.");
        }
      } else if (!existingUser.isProfileComplete && !window.location.pathname.includes("/profile/edit")) {
        // If profile is incomplete and not already on edit page, suggest completion
        toast.info("Complete your profile to unlock all features!", {
          action: {
            label: "Complete Profile",
            onClick: () => router.push("/profile/edit"),
          },
          duration: 10000,
        });
      }
    }
    
    syncUser();
  }, [isLoaded, user, existingUser, createUser, router]);
  
  return null;
}