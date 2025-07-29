"use client";

import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, BookOpen, Users, Star, TrendingUp } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";

interface ProfileStatsProps {
  userId: Id<"users">;
}

interface StatItem {
  label: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export function ProfileStats({ userId }: ProfileStatsProps) {
  // Fetch app statistics
  const appStats = useQuery(api.apps.getUserAppStats, { userId });
  
  const stats: StatItem[] = [
    {
      label: "Apps Submitted",
      value: appStats?.approved || 0,
      icon: Code,
      color: "text-blue-600 dark:text-blue-400"
    },
    {
      label: "Guides Published", 
      value: 0, // TODO: Query from guides table
      icon: BookOpen,
      color: "text-green-600 dark:text-green-400"
    },
    {
      label: "Community Points",
      value: 0, // TODO: Calculate from interactions
      icon: Star,
      color: "text-yellow-600 dark:text-yellow-400"
    },
    {
      label: "Profile Views",
      value: 0, // TODO: Track profile views
      icon: TrendingUp,
      color: "text-purple-600 dark:text-purple-400"
    }
  ];

  const totalContributions = stats[0].value + stats[1].value;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Community Statistics
        </h2>
        {totalContributions > 0 && (
          <Badge variant="secondary" className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {totalContributions} contributions
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          
          return (
            <div key={stat.label} className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
              <div className={`flex justify-center mb-2 ${stat.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>

      {totalContributions === 0 && (
        <div className="mt-6 text-center py-8">
          <div className="text-gray-400 dark:text-gray-600 mb-2">
            <Code className="w-12 h-12 mx-auto mb-2" />
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            No contributions yet. Start by submitting your first app or guide!
          </p>
        </div>
      )}
    </Card>
  );
}

// Component for displaying activity timeline - placeholder for future implementation
export function ProfileActivityFeed({ userId }: { userId: Id<"users"> }) {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Recent Activity
      </h2>
      
      <div className="text-center py-8">
        <div className="text-gray-400 dark:text-gray-600 mb-2">
          <TrendingUp className="w-12 h-12 mx-auto mb-2" />
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Activity feed coming soon. Check back to see recent contributions and interactions.
        </p>
      </div>
    </Card>
  );
}