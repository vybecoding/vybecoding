"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Code, 
  BookOpen, 
  MessageSquare, 
  Heart, 
  Star, 
  GitCommit,
  Calendar,
  TrendingUp 
} from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";

interface ActivityItem {
  id: string;
  type: "app_submitted" | "guide_published" | "comment" | "like" | "star" | "profile_updated";
  title: string;
  description?: string;
  timestamp: number;
  metadata?: {
    appName?: string;
    guideName?: string;
    targetUser?: string;
    [key: string]: any;
  };
}

interface ProfileActivityFeedProps {
  userId: Id<"users">;
  limit?: number;
  showTitle?: boolean;
}

export function ProfileActivityFeed({ 
  userId, 
  limit = 10, 
  showTitle = true 
}: ProfileActivityFeedProps) {
  // TODO: Replace with actual data fetching from Convex
  // For now, using mock data to establish the component structure
  const activities: ActivityItem[] = [
    // Mock activities for demonstration
    {
      id: "1",
      type: "app_submitted",
      title: "Submitted new app",
      description: "TaskMaster Pro - A productivity app built with React and Node.js",
      timestamp: Date.now() - 86400000, // 1 day ago
      metadata: { appName: "TaskMaster Pro" }
    },
    {
      id: "2", 
      type: "guide_published",
      title: "Published a new guide",
      description: "How to Build Scalable APIs with Express.js and MongoDB",
      timestamp: Date.now() - 172800000, // 2 days ago
      metadata: { guideName: "Express.js API Guide" }
    },
    {
      id: "3",
      type: "profile_updated", 
      title: "Updated profile",
      description: "Added new skills and updated bio",
      timestamp: Date.now() - 259200000, // 3 days ago
    }
  ];

  const getActivityIcon = (type: ActivityItem["type"]) => {
    switch (type) {
      case "app_submitted":
        return <Code className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case "guide_published":
        return <BookOpen className="w-4 h-4 text-green-600 dark:text-green-400" />;
      case "comment":
        return <MessageSquare className="w-4 h-4 text-purple-600 dark:text-purple-400" />;
      case "like":
        return <Heart className="w-4 h-4 text-red-600 dark:text-red-400" />;
      case "star":
        return <Star className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />;
      case "profile_updated":
        return <GitCommit className="w-4 h-4 text-gray-600 dark:text-gray-400" />;
      default:
        return <TrendingUp className="w-4 h-4 text-gray-600 dark:text-gray-400" />;
    }
  };

  const getActivityColor = (type: ActivityItem["type"]) => {
    switch (type) {
      case "app_submitted":
        return "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800";
      case "guide_published":
        return "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800";
      case "comment":
        return "bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800";
      case "like":
        return "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800";
      case "star":
        return "bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800";
      default:
        return "bg-gray-50 border-gray-200 dark:bg-gray-800/50 dark:border-gray-700";
    }
  };

  const formatTimestamp = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    const weeks = Math.floor(diff / 604800000);
    
    if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else if (days < 7) {
      return `${days}d ago`;
    } else if (weeks < 4) {
      return `${weeks}w ago`;
    } else {
      return new Date(timestamp).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });
    }
  };

  if (activities.length === 0) {
    return (
      <Card className="p-6">
        {showTitle && (
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Recent Activity
          </h2>
        )}
        
        <div className="text-center py-8">
          <div className="text-gray-400 dark:text-gray-600 mb-2">
            <TrendingUp className="w-12 h-12 mx-auto mb-2" />
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            No recent activity. Start by submitting an app or publishing a guide!
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      {showTitle && (
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Recent Activity
          </h2>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {activities.length} activities
          </Badge>
        </div>
      )}

      <div className="space-y-4">
        {activities.slice(0, limit).map((activity, index) => (
          <div 
            key={activity.id}
            className={`p-4 rounded-lg border ${getActivityColor(activity.type)} ${
              index === 0 ? 'ring-2 ring-blue-500/20' : ''
            }`}
          >
            <div className="flex items-start gap-3">
              {/* Activity Icon */}
              <div className="flex-shrink-0 mt-0.5">
                {getActivityIcon(activity.type)}
              </div>

              {/* Activity Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {activity.title}
                    </h3>
                    
                    {activity.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {activity.description}
                      </p>
                    )}

                    {/* Activity Metadata */}
                    {activity.metadata && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {activity.metadata.appName && (
                          <Badge variant="outline" className="text-xs">
                            <Code className="w-3 h-3 mr-1" />
                            {activity.metadata.appName}
                          </Badge>
                        )}
                        {activity.metadata.guideName && (
                          <Badge variant="outline" className="text-xs">
                            <BookOpen className="w-3 h-3 mr-1" />
                            {activity.metadata.guideName}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex-shrink-0 ml-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatTimestamp(activity.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {activities.length > limit && (
        <div className="mt-4 text-center">
          <button className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
            View all activity →
          </button>
        </div>
      )}
    </Card>
  );
}