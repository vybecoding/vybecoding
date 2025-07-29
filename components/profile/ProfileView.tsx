"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProfileSocialLinks } from "./ProfileSocialLinks";
import { ProfileStats } from "./ProfileStats";
import { MapPin, Calendar, Globe, Edit } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";

interface User {
  _id: Id<"users">;
  clerkId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  bio?: string;
  avatar?: string;
  location?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  skills?: string[];
  profileVisibility?: "public" | "private" | "members-only";
  isProfileComplete?: boolean;
  profileCompletedAt?: number;
  lastActiveAt?: number;
  createdAt: number;
}

interface ProfileViewProps {
  user: User;
  isOwnProfile?: boolean;
  onEditProfile?: () => void;
}

export function ProfileView({ user, isOwnProfile = false, onEditProfile }: ProfileViewProps) {
  const displayName = user.displayName || `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Anonymous User";
  const initials = displayName
    .split(" ")
    .map(name => name[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const joinDate = new Date(user.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long"
  });

  const lastActive = user.lastActiveAt 
    ? new Date(user.lastActiveAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      })
    : null;

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar Section */}
          <div className="flex flex-col items-center md:items-start">
            <Avatar className="w-32 h-32 mb-4">
              <AvatarImage src={user.avatar} alt={displayName} />
              <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
            </Avatar>
            
            {isOwnProfile && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onEditProfile}
                className="flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit Profile
              </Button>
            )}
          </div>

          {/* Profile Info */}
          <div className="flex-1 space-y-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {displayName}
              </h1>
              
              {user.bio && (
                <p className="text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
                  {user.bio}
                </p>
              )}
            </div>

            {/* Profile Details */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
              {user.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{user.location}</span>
                </div>
              )}
              
              {user.website && (
                <div className="flex items-center gap-1">
                  <Globe className="w-4 h-4" />
                  <a 
                    href={user.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Website
                  </a>
                </div>
              )}
              
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>Joined {joinDate}</span>
              </div>
              
              {lastActive && (
                <div className="flex items-center gap-1">
                  <span>Last active {lastActive}</span>
                </div>
              )}
            </div>

            {/* Skills */}
            {user.skills && user.skills.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Skills & Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {user.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Social Links */}
            <ProfileSocialLinks 
              github={user.github}
              linkedin={user.linkedin}
              twitter={user.twitter}
            />
          </div>
        </div>
      </Card>

      {/* Profile Stats */}
      <ProfileStats userId={user._id} />

      {/* Profile Completion Notice */}
      {isOwnProfile && !user.isProfileComplete && (
        <Card className="p-4 border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20">
          <div className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
            <span className="text-sm font-medium">
              Complete your profile to get discovered by other developers
            </span>
            <Button 
              variant="link" 
              size="sm" 
              onClick={onEditProfile}
              className="text-amber-700 dark:text-amber-300 p-0 h-auto"
            >
              Complete now →
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}