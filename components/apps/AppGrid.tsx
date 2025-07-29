"use client";

import React from "react";
import { AppCard } from "./AppCard";
import { Loader2 } from "lucide-react";

interface AppGridProps {
  apps: Array<{
    _id: string;
    name: string;
    shortDescription: string;
    category: string;
    iconUrl: string;
    screenshots: string[];
    techStack: string[];
    platforms: string[];
    views?: number;
    likes?: number;
    createdAt: number;
    liveUrl?: string;
    appStoreUrl?: string;
    playStoreUrl?: string;
    user?: {
      displayName: string;
      avatar?: string;
    };
  }>;
  loading?: boolean;
  emptyMessage?: string;
  showStats?: boolean;
  showActions?: boolean;
}

export function AppGrid({ 
  apps, 
  loading = false, 
  emptyMessage = "No apps found",
  showStats = true,
  showActions = true
}: AppGridProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 dark:text-gray-400">Loading apps...</p>
        </div>
      </div>
    );
  }

  if (apps.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-600 dark:text-gray-400">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {apps.map((app) => (
        <AppCard 
          key={app._id} 
          app={app} 
          showStats={showStats}
          showActions={showActions}
        />
      ))}
    </div>
  );
}