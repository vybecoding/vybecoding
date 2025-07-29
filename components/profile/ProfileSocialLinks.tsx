"use client";

import React from "react";
import { Github, Linkedin, Twitter, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProfileSocialLinksProps {
  github?: string;
  linkedin?: string;
  twitter?: string;
}

export function ProfileSocialLinks({ github, linkedin, twitter }: ProfileSocialLinksProps) {
  const links = [
    {
      name: "GitHub",
      url: github,
      icon: Github,
      color: "hover:text-gray-900 dark:hover:text-gray-100"
    },
    {
      name: "LinkedIn", 
      url: linkedin,
      icon: Linkedin,
      color: "hover:text-blue-600 dark:hover:text-blue-400"
    },
    {
      name: "Twitter",
      url: twitter, 
      icon: Twitter,
      color: "hover:text-blue-500 dark:hover:text-blue-300"
    }
  ].filter(link => link.url);

  if (links.length === 0) {
    return null;
  }

  const formatUrl = (url: string) => {
    if (!url) return "";
    
    // If it's already a full URL, return as is
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    
    // Handle platform-specific URL formatting
    if (url.includes("github.com") || url.includes("linkedin.com") || url.includes("twitter.com")) {
      return `https://${url}`;
    }
    
    // Default to HTTPS
    return `https://${url}`;
  };

  return (
    <div>
      <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
        Connect
      </h3>
      <div className="flex gap-2">
        {links.map((link) => {
          const Icon = link.icon;
          const formattedUrl = formatUrl(link.url!);
          
          return (
            <Button
              key={link.name}
              variant="outline"
              size="sm"
              asChild
              className={`flex items-center gap-2 ${link.color} transition-colors`}
            >
              <a
                href={formattedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Icon className="w-4 h-4" />
                {link.name}
                <ExternalLink className="w-3 h-3" />
              </a>
            </Button>
          );
        })}
      </div>
    </div>
  );
}