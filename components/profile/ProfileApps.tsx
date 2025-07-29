"use client";

import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AppGrid } from "@/components/apps/AppGrid";
import { Id } from "@/convex/_generated/dataModel";
import { Code, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProfileAppsProps {
  userId: Id<"users">;
  isOwnProfile?: boolean;
}

export function ProfileApps({ userId, isOwnProfile = false }: ProfileAppsProps) {
  const router = useRouter();
  
  // Fetch user's approved apps
  const apps = useQuery(api.apps.getUserApps, { 
    userId, 
    status: "approved" 
  });

  const handleSubmitApp = () => {
    router.push("/apps/submit");
  };

  if (!apps || apps.length === 0) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Apps
          </h2>
        </div>
        
        <div className="text-center py-12">
          <div className="text-gray-400 dark:text-gray-600 mb-4">
            <Code className="w-12 h-12 mx-auto" />
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {isOwnProfile 
              ? "You haven't submitted any apps yet." 
              : "No apps submitted yet."}
          </p>
          {isOwnProfile && (
            <Button onClick={handleSubmitApp} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Submit Your First App
            </Button>
          )}
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Apps ({apps.length})
        </h2>
        {isOwnProfile && (
          <Button 
            size="sm" 
            onClick={handleSubmitApp}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Submit New App
          </Button>
        )}
      </div>
      
      <AppGrid 
        apps={apps} 
        showStats={true} 
        showActions={true}
        emptyMessage={isOwnProfile 
          ? "You haven't submitted any apps yet." 
          : "No apps submitted yet."}
      />
    </Card>
  );
}