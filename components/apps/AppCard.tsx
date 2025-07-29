"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Eye, ExternalLink, Heart } from "lucide-react";
import { formatDistanceToNow } from "@/lib/utils";

interface AppCardProps {
  app: {
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
  };
  showStats?: boolean;
  showActions?: boolean;
}

export function AppCard({ app, showStats = true, showActions = true }: AppCardProps) {
  const primaryUrl = app.liveUrl || app.appStoreUrl || app.playStoreUrl;
  const timeAgo = formatDistanceToNow(new Date(app.createdAt));

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {/* App Icon and Category */}
      <div className="relative">
        <div className="aspect-video relative bg-gray-100 dark:bg-gray-800">
          {app.screenshots[0] ? (
            <Image
              src={app.screenshots[0]}
              alt={`${app.name} screenshot`}
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src={app.iconUrl}
                alt={`${app.name} icon`}
                width={80}
                height={80}
                className="rounded-lg"
              />
            </div>
          )}
        </div>
        
        {/* App Icon Overlay */}
        <div className="absolute bottom-3 left-3 w-16 h-16 rounded-lg overflow-hidden border-2 border-white dark:border-gray-800 shadow-lg">
          <Image
            src={app.iconUrl}
            alt={`${app.name} icon`}
            fill
            className="object-cover"
          />
        </div>
        
        {/* Category Badge */}
        <Badge className="absolute top-3 right-3" variant="secondary">
          {app.category}
        </Badge>
      </div>

      <CardContent className="pt-6">
        {/* App Name and Description */}
        <div className="space-y-2">
          <h3 className="font-semibold text-lg line-clamp-1">
            <Link href={`/apps/${app._id}`} className="hover:underline">
              {app.name}
            </Link>
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {app.shortDescription}
          </p>
        </div>

        {/* Creator Info */}
        {app.user && (
          <div className="flex items-center gap-2 mt-3">
            <Avatar className="w-6 h-6">
              <AvatarImage src={app.user.avatar} />
              <AvatarFallback className="text-xs">
                {app.user.displayName.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              by {app.user.displayName}
            </span>
            <span className="text-sm text-gray-400">•</span>
            <span className="text-sm text-gray-400">{timeAgo} ago</span>
          </div>
        )}

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1 mt-3">
          {app.techStack.slice(0, 3).map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
          {app.techStack.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{app.techStack.length - 3}
            </Badge>
          )}
        </div>

        {/* Platforms */}
        <div className="flex flex-wrap gap-1 mt-2">
          {app.platforms.slice(0, 3).map((platform) => (
            <Badge key={platform} variant="secondary" className="text-xs">
              {platform}
            </Badge>
          ))}
        </div>
      </CardContent>

      {(showStats || showActions) && (
        <CardFooter className="border-t pt-3">
          <div className="flex items-center justify-between w-full">
            {/* Stats */}
            {showStats && (
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {app.views || 0}
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  {app.likes || 0}
                </span>
              </div>
            )}

            {/* Actions */}
            {showActions && primaryUrl && (
              <Button
                size="sm"
                variant="outline"
                asChild
              >
                <a
                  href={primaryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1"
                >
                  View App
                  <ExternalLink className="w-3 h-3" />
                </a>
              </Button>
            )}
          </div>
        </CardFooter>
      )}
    </Card>
  );
}