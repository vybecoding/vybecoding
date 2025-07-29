"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { APP_STATUS, APP_STATUS_LABELS, APP_STATUS_COLORS } from "@/lib/constants/apps";
import { cn } from "@/lib/utils";

interface AppStatusBadgeProps {
  status: string;
  className?: string;
}

export function AppStatusBadge({ status, className }: AppStatusBadgeProps) {
  const label = APP_STATUS_LABELS[status as keyof typeof APP_STATUS_LABELS] || status;
  const color = APP_STATUS_COLORS[status as keyof typeof APP_STATUS_COLORS] || "gray";
  
  const colorClasses = {
    gray: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
    blue: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    yellow: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    green: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    red: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  };

  return (
    <Badge 
      variant="secondary"
      className={cn(
        colorClasses[color as keyof typeof colorClasses],
        className
      )}
    >
      {label}
    </Badge>
  );
}